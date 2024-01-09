// @ts-ignore
/* eslint-disable */

declare namespace API {
  type GetPivotByFarmParam = {
    id: number;
  };

  type GetPivotByFarmResponse = Array<APIModels.PivotByFarm>;

  type GetPivotsInformationParam = {
    id: number;
    params: any;
  };

  type GetPivotsInformationResponse = {
    count: number;
    current_page: number;
    next: string;
    previous: any;
    results: Array<APIModels.PivotInformation>;
  };

  type GetPivotByIdInformationParam = {
    farmId: number;
    pivotId: string;
  };

  type GetPivotByIdInformationResponse = APIModels.PivotByIdInformation;

  type GetPivotHistoryParams = {
    farmId: number;
    pivotId: string;
  };

  type GetPivotHistoryResponse = {
    count: number;
    current_page: number;
    next: string;
    previous: any;
    results: Array<APIModels.PivotHistory>
  }

  type GetPivotHistoryOperationResponse = {
    count: number;
    current_page: number;
    next: string;
    previous: any;
    results: Array<APIModels.PivotHistoryOperation>
  }

  type GetPivotListGpsStreamResponse = {
    count: number;
    current_page: number;
    next: string;
    previous: any;
    results: Array<APIModels.PivotListGpsStream>
  }

  type GetPivotReportParams = {
    farmId: number;
    pivotId: string;
  };

  type GetEditPivotHistoryParams = {
    farmId?: number;
    pivotId: string;
  };

  type FavoritePivotConfigParams = {
    farmId: string;
    pivotId: string;
    configId: string;
  };

  type GetPivotReportResponse = APIModels.PivotReport;

  type FavoritePivotConfigResponse = APIModels.PivotReport;

  type PostPivotConfigParams = {
    farmId: number;
    pivotId: string;
    deviceId: string;
  };
}

