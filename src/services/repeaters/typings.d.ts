// @ts-ignore
/* eslint-disable */

declare namespace API {
  type GetRepeaterParams = {
    id: number;
  };

  type GetRepeaterResponse = Array<APIModels.Repeater>

  type GetRepeaterByIdParams = {
    farmId: number;
    repeaterId: number;
  };

  type GetRepeaterByIdResponse = APIModels.RepeaterById;

  type PatchRepeaterConfigParams = {
    farmId: number;
    repeaterId: number;
  };

  type PatchRepeaterConfigResponse = APIModels.RepeaterById;

  type GetRepeaterDevicesParams = {
    farmId: number;
  };
  
  type GetRepeaterDevicesResponse = Array<APIModels.RepeaterDevice>;

  type PatchChangeRepeaterRadioParams = {
    farmId: number;
    repeaterId: number;
    repeaterToSwapId: number;
  };

  type PatchChangeRepeaterRadioResponse = {
    radio_id: string;
  };

  type PostChangeRepeaterManualRadioParams = {
    farmId: number;
    repeaterId: number;
  };

  type PostChangeRepeaterManualRadioResponse = {
    radio_id: string;
  };

}
