import { setBackendSubDomain } from "lib/client";
import { IAuthService } from "lib/services/auth";
import { IRegisterService } from "lib/services/register/registerService";
import { Store } from "lib/store";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { ServerOption } from "../signin/viewModel";

export enum RegisterState {
  invitation,
  detail,
}

export class RegisterViewModel {
  _invitationCode: string = "";
  _username: string = "";
  _firstName: string = "";
  _lastName: string = "";
  _email: string = "";
  _telephone: string = "";
  _address: string = "";
  _authorityName: string = "";

  fieldErrors: { [key: string]: string } = {};

  submitError: string = "";

  isSubmitting: boolean = false;

  isLoading: boolean = false;

  state: RegisterState = RegisterState.invitation;
  serverOptions: ServerOption[] = [];

  constructor(
    readonly store: Store,
    readonly authService: IAuthService,
    readonly registerService: IRegisterService,
    tenantApiEndpoint: string
  ) {
    makeObservable(this, {
      _authorityName: observable,
      authorityName: computed,
      _invitationCode: observable,
      invitationCode: computed,
      _username: observable,
      username: computed,
      _firstName: observable,
      firstName: computed,
      _lastName: observable,
      lastName: computed,
      _email: observable,
      email: computed,
      _telephone: observable,
      telephone: computed,
      _address: observable,
      address: computed,
      fieldErrors: observable,
      submitError: observable,
      checkInvitationCode: action,
      register: action,
      validateCheckInviteCode: action,
      validateRegister: action,
      isValid: computed,
      fetchTenant: action,
      state: observable,
      serverOptions: observable,
    });

    this.fetchTenant(tenantApiEndpoint);
  }

  async fetchTenant(tenantApiEndpoint: string) {
    this.isLoading = true;
    try {
      const response = await fetch(tenantApiEndpoint);
      if (response.ok) {
        const data = (await response.json()) as { tenants: ServerOption[] };
        runInAction(() => {
          this.serverOptions = data.tenants;
        });
      }
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  public get authorityName(): string {
    return this._authorityName;
  }
  public set authorityName(value: string) {
    this._authorityName = value;
  }

  public get invitationCode(): string {
    return this._invitationCode;
  }
  public set invitationCode(value: string) {
    this._invitationCode = value;
    delete this.fieldErrors["invitationCode"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  public get username(): string {
    return this._username;
  }
  public set username(value: string) {
    this._username = value;
    delete this.fieldErrors["username"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  public get firstName(): string {
    return this._firstName;
  }
  public set firstName(value: string) {
    this._firstName = value;
    delete this.fieldErrors["firstName"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  public get lastName(): string {
    return this._lastName;
  }
  public set lastName(value: string) {
    this._lastName = value;
    delete this.fieldErrors["lastName"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  public get email(): string {
    return this._email;
  }
  public set email(value: string) {
    this._email = value;
    delete this.fieldErrors["username"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  public get telephone(): string {
    return this._telephone;
  }
  public set telephone(value: string) {
    this._telephone = value;
    delete this.fieldErrors["telephone"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  public get address(): string {
    return this._address;
  }
  public set address(value: string) {
    this._address = value;
    delete this.fieldErrors["address"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  public get isValid(): boolean {
    return Object.keys(this.fieldErrors).length === 0;
  }

  public async checkInvitationCode() {
    this.isSubmitting = true;
    if (this.validateCheckInviteCode()) {
      const result = await this.registerService.checkInvitationCode(
        this.invitationCode
      );
      this.isSubmitting = false;
      if (result.success) {
        runInAction(() => {
          this.state = RegisterState.detail;
          this.authorityName = result.authorityName;
        });
        return true;
      } else {
        runInAction(() => {
          this.submitError = result.message;
        });
        return false;
      }
    }
    this.isSubmitting = false;
    return false;
  }

  public async register() {
    this.isSubmitting = true;
    if (this.validateRegister()) {
      const result = await this.registerService.registerUser(
        this.invitationCode,
        this.username,
        this.firstName,
        this.lastName,
        this.email,
        this.telephone,
        this.address
      );
      this.isSubmitting = false;
      if (result.success) {
        const success = await this.authService.refreshToken(
          result.tokenAuth.refreshToken
        );
        if (success) {
          runInAction(() => {
            this.store.register(result.me);
          });
          return true;
        }
      } else {
        runInAction(() => {
          this.submitError = result.message;
        });
        return false;
      }
    }
    this.isSubmitting = false;
    return false;
  }

  validateCheckInviteCode(): boolean {
    let isValid = true;
    if (this._invitationCode.length === 0) {
      isValid = false;
      this.fieldErrors["invitationCode"] = "this field is required";
    }

    return isValid;
  }

  validateRegister(): boolean {
    let isValid = true;
    if (this.username.length === 0) {
      isValid = false;
      this.fieldErrors["username"] = "this field is required";
    }

    if (this.firstName.length === 0) {
      isValid = false;
      this.fieldErrors["firstName"] = "this field is required";
    }

    if (this.lastName.length === 0) {
      isValid = false;
      this.fieldErrors["lastName"] = "this field is required";
    }

    if (this.email.length === 0) {
      isValid = false;
      this.fieldErrors["email"] = "this field is required";
    }

    return isValid;
  }

  changeServer(subDomainName: string) {
    setBackendSubDomain(subDomainName);
  }
}
