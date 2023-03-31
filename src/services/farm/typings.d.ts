// @ts-ignore
/* eslint-disable */

declare namespace API {
  type getFarmsParams = {};

  type gerFarmsResponse = {
    current: number;
    pageSize: number;
    total: number;
    list: Models.Farm[]
  };

  type getFarmConnectionParams = {
    id: string;
  };

  type getFarmConnectionResponse = Models.FarmConnection;

}
