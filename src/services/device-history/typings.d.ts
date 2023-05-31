// @ts-ignore
/* eslint-disable */

declare namespace API {
  type GetDeviceHistoryParams = {
    id: string;
  };

  type GetDeviceHistoryResponse = {
    current: number;
    pageSize: number;
    total: number;
    list: Models.DeviceHistory;
  };
}
