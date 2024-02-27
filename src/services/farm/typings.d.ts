// @ts-ignore
/* eslint-disable */

declare namespace API {
  type GetFarmsParams = {};

  type GetFarmResponse = Array<APIModels.Farm>;

  type GetFarmUsersResponse = APIModels.FarmUser[];

  type SaveFarmUsersResponse = {
    id: number;
    users: APIModels.FarmUser[];
  };

  type GetFarmConnectionParams = {
    id: string;
  };

  type GetFarmConnectionResponse = APIModels.FarmConnection;

  type GetFarmFullParams = { id: string };

  type SaveFarmUsersParams = {
    id: string,
    body: {
      administrator: boolean;
      username: string;
      username_or_email: string;
    }
  };

  type GetFarmFullResponse = APIModels.FarmFull;
  
}
