import { action, makeObservable, observable } from "mobx";
import { client } from "lib/client";
import { ApolloError } from "@apollo/client";
import { InvitationCodesDocument } from "lib/generated/graphql";
import { BaseViewModel } from "lib/baseViewModel";

type InvitationCode = {
  id: string;
  code: string;
};

export class InvitaionCodeViewModel extends BaseViewModel {
  data: InvitationCode[] = [];

  searchText: string = "";

  constructor() {
    super();
    makeObservable(this, {
      data: observable,
      searchText: observable,
      setSearchText: action,
      clearSearchText: action,
      fetch: action,
    });
  }

  setSearchText(value: string) {
    this.searchText = value;
  }

  clearSearchText() {
    this.searchText = "";
  }

  async fetch(): Promise<void> {
    try {
      const fetchResult = await client.query({
        query: InvitationCodesDocument,
        variables: {
          limit: 20,
          offset: 0,
          nameStartWith: this.searchText,
        },
        errorPolicy: "all",
      });

      const items = Array<InvitationCode>();
      fetchResult.data.adminCategoryQuery?.results.forEach(item => {
        if (item) {
          items.push({
            id: item.id,
            code: item.name,
          });
        }
      });
      this.data = items;
      this.setErrorMessage(undefined);
    } catch (e) {
      let message: string | undefined;
      const errorResult = e as ApolloError;

      if (errorResult.networkError) {
        message = errorResult.networkError.message;
      } else if (
        errorResult.graphQLErrors &&
        errorResult.graphQLErrors.length > 0
      ) {
        message = errorResult.graphQLErrors.map(err => err.message).join(",");
      } else if (
        errorResult.clientErrors &&
        errorResult.clientErrors.length > 0
      ) {
        message = errorResult.clientErrors.map(err => err.message).join(",");
      }
      this.setErrorMessage(message);
    }
  }
}