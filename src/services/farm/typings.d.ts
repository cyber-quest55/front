// @ts-ignore
/* eslint-disable */

declare namespace API {
  type GetFarmsParams = {};

  type GetFarmResponse = {
    current: number;
    pageSize: number;
    total: number;
    list: Models.Farm[]
  };

  type GetFarmConnectionParams = {
    id: string;
  };

  type GetFarmConnectionResponse = Models.FarmConnection;

}
