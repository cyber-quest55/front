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

  type GetPivotReportParams = {
    id: string;
  };

  type GetPivotReportResponse = {
    current: number;
    pageSize: number;
    total: number;
    list: Models.PivotReport[];
  };
}
