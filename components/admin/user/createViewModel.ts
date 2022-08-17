import { User } from "lib/services/user";
import { SaveResult } from "lib/services/interface";
import { UserViewModel } from "./userViewModel";

export class UserCreateViewModel extends UserViewModel {
  public _save(): Promise<SaveResult<User>> {
    return this.userService.createUser(
      this.authorityId,
      this.username,
      "",
      this.firstName,
      this.lastName,
      this.email,
      this.telephone,
      this.role
    );
  }
}
