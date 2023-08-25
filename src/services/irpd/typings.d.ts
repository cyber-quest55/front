// @ts-ignore
/* eslint-disable */

declare namespace API {
  type GetIrpdParams = {
    id: number;
  };

  type GetIrpdResponse = Array<APIModels.Irpd>;

  type GetIrpdByIdParams = {
    farmId: string;
    irpdId: string;
  };

  type GetIrpdByIdResponse = APIModels.IrpdById;

  type GetIrpdHistoryParams = {
    farmId: string;
    irpdId: string;
    params: any;
  };

  type GetIrpdHistoryResponse = APIModels.IrpdHistory;

  type GetIrpdWaterConsumptionParams = {
    farmId: string;
    irpdId: string;
    waterId: string;
  };

  type GetIrpdWaterConsumptionResponse = Array<APIModels.IrpdWaterConsumption>;

  type GetIrpdEventsParams = {
    farmId: string;
    irpdId: string;
    params: any;
  };

  type GetIrpdEventsResponse = APIModels.IrpdEventsResponse;
}
