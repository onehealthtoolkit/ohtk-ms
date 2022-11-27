import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import {
  PlacesDocument,
  PlaceCreateDocument,
  PlaceUpdateDocument,
  GetPlaceDocument,
  PlaceDeleteDocument,
} from "lib/generated/graphql";
import { Place } from "lib/services/place/place";
import {
  DeleteResult,
  GetResult,
  IService,
  QueryResult,
  SaveResult,
} from "lib/services/interface";

export interface IPlaceService extends IService {
  fetchPlaces(
    limit: number,
    offset: number,
    searchText: string,
    force?: boolean
  ): Promise<QueryResult<Place[]>>;

  getPlace(id: number): Promise<GetResult<Place>>;

  createPlace(
    name: string,
    latitude: number,
    longitude: number,
    notificationTo: string,
    authorityId: number
  ): Promise<SaveResult<Place>>;

  updatePlace(
    id: number,
    name: string,
    latitude: number,
    longitude: number,
    notificationTo: string,
    authorityId: number
  ): Promise<SaveResult<Place>>;

  deletePlace(id: string): Promise<DeleteResult>;
}

export class PlaceService implements IPlaceService {
  client: ApolloClient<NormalizedCacheObject>;

  fetchPlacesQuery = {
    limit: 20,
    offset: 0,
    q: "",
    ordering: "name,asc",
  };

  constructor(client: ApolloClient<NormalizedCacheObject>) {
    this.client = client;
  }

  async fetchPlaces(
    limit: number,
    offset: number,
    searchText: string,
    force?: boolean
  ) {
    this.fetchPlacesQuery = {
      ...this.fetchPlacesQuery,
      limit,
      offset,
      q: searchText,
    };
    const fetchResult = await this.client.query({
      query: PlacesDocument,
      variables: this.fetchPlacesQuery,
      fetchPolicy: force ? "network-only" : "cache-first",
    });

    const items = Array<Place>();
    fetchResult.data.adminPlaceQuery?.results.forEach(item => {
      if (item) {
        items.push({
          id: item.id,
          name: item.name,
          latitude: 0,
          longitude: 0,
          notificationTo: "",
          authorityId: 0,
          authorityName: item.authority.name,
        });
      }
    });
    return {
      items,
      totalCount: fetchResult.data.adminPlaceQuery?.totalCount,
    };
  }

  async getPlace(id: number) {
    const getResult = await this.client.query({
      query: GetPlaceDocument,
      variables: {
        id,
      },
    });

    let data;
    const place = getResult.data.placeGet;
    if (place) {
      data = {
        id: place.id.toString(),
        name: place.name,
        latitude: parseFloat(place.location["coordinates"][1]),
        longitude: parseFloat(place.location["coordinates"][0]),
        notificationTo: place.notificationTo,
        authorityId: parseInt(place.authority.id),
        authorityName: place.authority.name,
      };
    }
    return {
      data,
    };
  }

  async createPlace(
    name: string,
    latitude: number,
    longitude: number,
    notificationTo: string,
    authorityId: number
  ): Promise<SaveResult<Place>> {
    const createResult = await this.client.mutate({
      mutation: PlaceCreateDocument,
      variables: {
        name,
        latitude,
        longitude,
        notificationTo,
        authorityId,
      },
      refetchQueries: [
        {
          query: PlacesDocument,
          variables: this.fetchPlacesQuery,
          fetchPolicy: "network-only",
        },
      ],
      awaitRefetchQueries: true,
    });

    if (createResult.errors) {
      return {
        success: false,
        message: createResult.errors.map(o => o.message).join(","),
      };
    }

    const result = createResult.data?.adminPlaceCreate?.result;
    switch (result?.__typename) {
      case "AdminPlaceCreateSuccess": {
        console.log("success", result);
        break;
      }
      case "AdminPlaceCreateProblem": {
        console.log("problem", result);
        const fields: any = {};
        // field validation errors, show specifiic error for each fields
        result.fields?.forEach(f => {
          fields[f.name] = f.message;
        });
        return {
          success: false,
          fields,
          message: result.message,
        };
      }
    }
    return {
      success: true,
    };
  }

  async updatePlace(
    id: number,
    name: string,
    latitude: number,
    longitude: number,
    notificationTo: string,
    authorityId: number
  ): Promise<SaveResult<Place>> {
    const updateResult = await this.client.mutate({
      mutation: PlaceUpdateDocument,
      variables: {
        id,
        name,
        latitude,
        longitude,
        notificationTo,
        authorityId,
      },
      refetchQueries: [
        {
          query: PlacesDocument,
          variables: this.fetchPlacesQuery,
          fetchPolicy: "network-only",
        },
      ],
      awaitRefetchQueries: true,
      update: (cache, result) => {
        const cacheItem = cache.readQuery({
          query: GetPlaceDocument,
          variables: { id },
        });
        const placeCache = cacheItem?.placeGet;
        if (placeCache) {
          const serverReturnValue = result.data?.adminPlaceUpdate?.result;
          if (serverReturnValue?.__typename === "AdminPlaceUpdateSuccess") {
            const newPlaceValue = serverReturnValue;
            cache.writeQuery({
              query: GetPlaceDocument,
              variables: { id },
              data: {
                __typename: "Query",
                placeGet: {
                  ...newPlaceValue,
                  __typename: "PlaceType",
                },
              },
            });
          }
        }
      },
    });

    if (updateResult.errors) {
      return {
        success: false,
        message: updateResult.errors.map(o => o.message).join(","),
      };
    }

    const result = updateResult.data?.adminPlaceUpdate?.result;
    switch (result?.__typename) {
      case "AdminPlaceUpdateSuccess": {
        console.log("success", result);
        break;
      }
      case "AdminPlaceUpdateProblem": {
        console.log("problem", result);
        const fields: any = {};
        result.fields?.forEach(f => {
          fields[f.name] = f.message;
        });

        return {
          success: false,
          fields,
          message: result.message,
        };
      }
    }
    return {
      success: true,
    };
  }

  async deletePlace(id: string) {
    const deleteResult = await this.client.mutate({
      mutation: PlaceDeleteDocument,
      variables: {
        id: parseInt(id),
      },
      refetchQueries: [
        {
          query: PlacesDocument,
          variables: this.fetchPlacesQuery,
          fetchPolicy: "network-only",
        },
      ],
      awaitRefetchQueries: true,
      update: cache => {
        cache.evict({
          id: cache.identify({
            __typename: "AdminPlaceQueryType",
            id: id,
          }),
        });
        cache.evict({
          id: cache.identify({
            __typename: "PlaceType",
            id: id,
          }),
        });
      },
    });

    return { error: deleteResult.errors?.map(o => o.message).join(",") };
  }
}
