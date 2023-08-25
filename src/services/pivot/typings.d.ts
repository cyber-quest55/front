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

  type GetPivotsInformationResponse = APIModels.PivotInformation;

  type GetPivotByIdInformationParam = {
    farmId: string;
    pivotId: string;
  };

  type GetPivotByIdInformationResponse = APIModels.PivotByIdInformation;

  type GetPivotHistoryParams = {
    farmId: string;
    pivotId: string;
  };

  type GetPivotHistoryResponse = APIModels.PivotHistory;

  type GetPivotReportParams = {
    farmId: string;
    pivotId: string;
  };

  type GetPivotReportResponse = APIModels.PivotReport;
}
