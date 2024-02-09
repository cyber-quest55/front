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

  type PostIrpdConfigParams = {
    farmId: number;
    irpdId: string;
  };

  type PostIrpdConfigResponse = APIModels.IrpdConfig;

  type PostIrpdConfigV4Params = {
    farmId: number;
    irpdId: string;
  };

  type PostIrpdConfigV4Response = APIModels.IrpdConfigV4;

  type GetIrpdDevicesParams = { farmId: string };

  type GetIrpdDevicesResponse = Array<APIModels.IrpdDevice>;

  type PatchChangeIrpdRadioParams = { farmId: number; irpdId: string; irpdToSwapId: string };

  type PatchChangeIrpdRadioResponse = { radio_id: number; };

  type PostChangeIrpdManualRadioParams = { farmId: number; irpdId: string; };

  type PostChangeIrpdManualRadioResponse = { radio_id: number; };

  type PatchIrpdParams = { farmId: number; irpdId: string; };

  type PatchIrpdResponse = APIModels.Irpd;

  type GetEditIrpdHistoryParams = {
    farmId: number;
    irpdId: string;
  };

  type GetIrpdHistoryResponse = {
    count: number;
    current_page: number;
    next: string;
    previous: any;
    results: Array<APIModels.IrpdHistory>
  }

  type FavoriteIrpdConfigParams = {
    configId: number;
    farmId: number;
    irpdId: string;
  };

  type FavoriteIrpdConfigResponse = APIModels.IrpdSystem;

  type CreateIrpdParams = {
    farmId: string;
  };

}
