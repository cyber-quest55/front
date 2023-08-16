// @ts-ignore
/* eslint-disable */

declare namespace API {
  type GetFarmsParams = {};

  type GetFarmResponse = Array<{
    id: number
    name: string
    timezone: string
    is_administrator: boolean
    payment_status: number
  }>

  type GetFarmConnectionParams = {
    id: string;
  };

  type GetFarmConnectionResponse = {
    is_online: boolean;
  };
}
