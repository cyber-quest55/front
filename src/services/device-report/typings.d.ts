// @ts-ignore
/* eslint-disable */

declare namespace API {
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
