// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUserParams = {};

  type CurrentUserResult = {
    profile: ProfileData;
  };

  type FindByUsernameOrEmailResponse = APIModels.FindAccountData[];

  type PostProfileResponse = APIModels.ProfileData;

  type PatchUserInfoResponse = Array<string>;

  type PostChangePasswordResponse = Array<string>;

}
