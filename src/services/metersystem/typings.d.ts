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


  type PostMeterSystemConfigParams = {
    farmId: number;
    meterSystemId: string;
    iMeterId: string;
  };

  type PatchIMeterParams = {
    farmId: number;
    meterSystemId: string;
    iMeterId: string;
  };

  type PatchMeterSystemParams = {
    farmId: number;
    meterSystemId: string;
  };

  type GetMeterDevicesParams = {
    farmId: number;
    meterSystemId: string;
  };

  type GetMeterDevicesResponse = Array<{
      id: number;
      name: string;
      imeter_device: {
        id: number;
        created: string;
        updated: string;
        radio_id: string;
        taken: null | string;
      };
  }>
}
