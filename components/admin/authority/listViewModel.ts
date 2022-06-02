import { action, makeObservable, observable } from "mobx";

type Authority = {
  id: string;
  name: string;
};

export class AdminAuthoorityListViewModel {
  data: Authority[] = [
    {
      id: "1",
      name: "test1",
    },
    {
      id: "2",
      name: "test2",
    },
    {
      id: "3",
      name: "test3",
    },
  ];

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
    this.data.push({
      id: Math.random().toString(),
      name: "xxxx",
    });
  }
}
