import { AdminAuthorityListViewModel } from "components/admin/authority/listViewModel";
import { Authority, IAuthorityService } from "lib/services/authority";
import { PolygonData } from "lib/services/authority/authority";
import {
  QueryResult,
  GetResult,
  SaveResult,
  DeleteResult,
} from "lib/services/interface";

export const data: Array<Authority> = [
  {
    id: "1",
    code: "code1",
    name: "name1",
  },
  {
    id: "2",
    code: "code2",
    name: "name2",
  },
];

describe("Authority ListViewModel", () => {
  class AuthorityService implements IAuthorityService {
    lookupAuthorityInheritsDownFirst(
      authorityId: string
    ): Promise<Authority[]> {
      console.log(authorityId);
      throw new Error("Method not implemented.");
    }
    lookupAuthorityInheritsDown(authorityId: string): Promise<Authority[]> {
      console.log(authorityId);
      throw new Error("Method not implemented.");
    }
    async lookupAuthorities(
      limit: number,
      offset: number,
      searchText: string
    ): Promise<QueryResult<Authority[]>> {
      console.log(limit, offset);
      return {
        items: data.filter(it => it.name.includes(searchText)),
        totalCount: data.length,
      };
    }

    async fetchAuthorities(
      limit: number,
      offset: number,
      searchText: string
    ): Promise<QueryResult<Authority[]>> {
      console.log(limit, offset);

      return {
        items: data.filter(it => it.name.includes(searchText)),
        totalCount: data.length,
      };
    }

    getAuthority(id: string): Promise<GetResult<Authority>> {
      console.log(id);

      throw new Error("Method not implemented.");
    }

    createAuthority(
      code: string,
      name: string
    ): Promise<SaveResult<Authority>> {
      console.log(code, name);
      throw new Error("Method not implemented.");
    }

    updateAuthority(
      id: string,
      code: string,
      name: string
    ): Promise<SaveResult<Authority>> {
      console.log(id, code, name);

      throw new Error("Method not implemented.");
    }

    updateAuthorityArea(
      id: string,
      code: string,
      name: string,
      area: PolygonData | undefined
    ): Promise<SaveResult<Authority>> {
      console.log(id, code, name, area);

      throw new Error("Method not implemented.");
    }

    deleteAuthority(id: string): Promise<DeleteResult> {
      console.log(id);

      throw new Error("Method not implemented.");
    }
  }

  it("fetch success", async () => {
    const viewModel = new AdminAuthorityListViewModel(new AuthorityService());
    await viewModel.setSearchValue("name1");
    expect(viewModel.data.length).toEqual(1);
  });

  it("fetch not found", async () => {
    const viewModel = new AdminAuthorityListViewModel(new AuthorityService());
    await viewModel.setSearchValue("name3");
    expect(viewModel.data.length).toEqual(0);
  });
});
