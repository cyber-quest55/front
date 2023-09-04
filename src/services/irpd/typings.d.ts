// @ts-ignore
/* eslint-disable */

declare namespace API {
  type GetIrpdParams = {
    id: number;
  };

  type GetIrpdResponse = Array<APIModels.Irpd>;

  type GetIrpdByIdParams = {
    farmId: number;
    irpdId: string;
  };

  type GetIrpdByIdResponse = APIModels.IrpdById;

  type GetIrpdHistoryParams = {
    farmId: number;
    irpdId: number;
    params: any;
  };

  type GetIrpdHistoryResponse = APIModels.IrpdHistory;

  type GetIrpdWaterConsumptionParams = {
    farmId: number;
    irpdId: numbber;
    waterId: number;
    params: any;
  };

  type GetIrpdWaterConsumptionResponse = Array<APIModels.IrpdWaterConsumption>;

  type GetIrpdEventsParams = {
    farmId: number;
    irpdId: string;
    params: any;
  };

  type GetIrpdEventsResponse = APIModels.IrpdEventsResponse;
}
