// @ts-ignore
/* eslint-disable */

declare namespace API {
  type GetMeterSystemParams = {
    id: number;
  };

  type GetMeterSystemResponse = Array<APIModels.MeterSystem>;

  type GetMeterSystemByIdParams = {
    farmId: number;
    meterId: number;
  };

  type GetMeterSystemByIdResponse = APIModels.MeterSystemById

  type GetMeterSystemHistoryParams = {
    farmId: number;
    meterId: number;
    params: any;
    otherId: number;
  };

  type GetMeterSystemHistoryResponse = APIModels.MeterSystemHistory

  type GetMeterSystemWaterLevelParams = {
    farmId: number;
    meterId: number;
    otherId: number;
    params: any;
  };

  type GetMeterSystemWaterLevelResponse = Array<APIModels.MeterSystemWaterLevel>;

  type GetMeterSystemTableParams = {
    farmId: number;
    meterId: string;
    otherId: string;
    params: any;
  };

  type GetMeterSystemTableResponse = APIModels.MeterSystemTable
}
