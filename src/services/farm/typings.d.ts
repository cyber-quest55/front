// @ts-ignore
/* eslint-disable */

declare namespace API {
  type GetFarmsParams = {};

  type GetFarmResponse = Array<APIModels.Farm>;

  type GetFarmConnectionParams = {
    id: string;
  };

  type GetFarmConnectionResponse = APIModels.FarmConnection;

  type GetFarmFullParams = { id: string };

  type GetFarmFullResponse = APIModels.FarmFull;
  
}
