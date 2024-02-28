// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUserParams = {};

  type GetUserPermissionsParams = {
    farmId: string;
    id: number;
  };

  type CurrentUserResult = {
    profile: ProfileData;
  };

  type GetUserPermissionsResponse = APIModels.UserPermissionData[];

  type GetUserRoleResponse = {
    is_admin: boolean
  };

  type FindByUsernameOrEmailResponse = APIModels.FindAccountData[];

  type PostProfileResponse = APIModels.ProfileData;

  type PatchUserInfoResponse = Array<string>;

  type PostChangePasswordResponse = Array<string>;

}
