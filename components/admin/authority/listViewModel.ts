import { action, makeObservable, observable } from "mobx";
import { client } from "lib/client";
import { AuthoritiesDocument } from "lib/generated/graphql";

type Authority = {
  id: string;
  name: string;
};

export class AdminAuthoorityListViewModel {
  data: Authority[] = [];

  searchText: string = "";

  constructor() {
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
    const fetchResult = await client.query({
      query: AuthoritiesDocument,
      variables: {
        limit: 20,
        offset: 0,
        nameStartWith: this.searchText,
      },
    });
    if (fetchResult.errors) {
      throw new Error(fetchResult.errors.map(err => err.message).join(","));
    }
    if (fetchResult.error) {
      throw new Error(fetchResult.error.message);
    }

    const items = Array<Authority>();
    fetchResult.data.authorities?.results.forEach(item => {
      if (item) {
        items.push({
          id: item.id,
          name: item.name,
        });
      }
    });
    this.data = items;
  }
}
