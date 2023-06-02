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

  type GetDeviceReportParams = {
    id: string;
  };

  type GetDeviceReportResponse = {
    current: number;
    pageSize: number;
    total: number;
    list: Models.DeviceReport[];
  };
}
