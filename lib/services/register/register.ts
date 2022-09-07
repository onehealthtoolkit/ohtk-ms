import { Me } from "../profile/me";

export type RegisterSuccess = {
  success: true;
  me: Me;
  tokenAuth: {
    token: string;
    refreshToken: string;
  };
};

export type RegisterFailure = {
  success: false;
  message: string;
};

export type RegisterResult = RegisterSuccess | RegisterFailure;

export type CheckInvitationCodeSuccess = {
  success: true;
  code: string;
  authorityId: number;
  authorityName: string;
};

export type CheckInvitationCodeFailure = {
  success: false;
  message: string;
};

export type CheckInvitationCodeResult =
  | CheckInvitationCodeSuccess
  | CheckInvitationCodeFailure;
