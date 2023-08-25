// @ts-ignore
/* eslint-disable */

declare namespace API {
  type GetMeterSystemParams = {
    id: number;
  };

  type GetMeterSystemResponse = Array<APIModels.MeterSystem>;

  type GetMeterSystemByIdParams = {
    farmId: string;
    meterId: string;
  };

  type GetMeterSystemByIdResponse = APIModels.MeterSystemById

  type GetMeterSystemHistoryParams = {
    farmId: string;
    meterId: string;
    params: any;
    otherId: string;
  };

  type GetMeterSystemHistoryResponse = APIModels.MeterSystemHistory

  type GetMeterSystemWaterLevelParams = {
    farmId: string;
    meterId: string;
    otherId: string;
    params: any;
  };

  type GetMeterSystemWaterLevelResponse = Array<APIModels.MeterSystemWaterLevel>;

  type GetMeterSystemTableParams = {
    farmId: string;
    meterId: string;
    otherId: string;
    params: any;
  };

  type GetMeterSystemTableResponse = APIModels.MeterSystemTable
}
