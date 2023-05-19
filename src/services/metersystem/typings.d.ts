// @ts-ignore
/* eslint-disable */

declare namespace API {
  type GetMeterSystemParams = {
    id: string;
  };

  type GetMeterSystemResponse = {
    current: number;
    pageSize: number;
    total: number;
    list: Models.MeterSystem[];
  };
}
