import { User } from "lib/services/user";
import { IUserService } from "lib/services/user/userService";
import { SaveResult } from "lib/services/interface";
import { UserViewModel } from "./userViewModel";

export class UserUpdateViewModel extends UserViewModel {
  id: string;
  constructor(id: string, userService: IUserService) {
    super(userService);
    this.id = id;
    this.fetch();
  }

  async fetch() {
    this.isLoading = true;
    const data = await (await this.userService.getUser(this.id)).data;
    if (data) {
      this.authorityId = data.authorityId!;
      this.username = data.username;
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.email = data.email;
    }
    this.isLoading = false;
  }

  public _save(): Promise<SaveResult<User>> {
    return this.userService.updateUser(
      this.id,
      this.authorityId,
      this.username,
      this.firstName,
      this.lastName,
      this.email,
      this.telephone
    );
  }
}
