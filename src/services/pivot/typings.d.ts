// @ts-ignore
/* eslint-disable */

declare namespace API {
  type GetPivotByFarmParam = {
    id: number;
  };

  type GetPivotByFarmResponse =  {
    current: number;
    pageSize: number;
    total: number;
    list: Models.Pivot[];
  };

  type GetPivotsInformationParam = { 
    id: number; 
    params: any
  }

  type GetPivotsInformationResponse = { 
    current: number;
    pageSize: number;
    total: number;
    list: Models.PivotInformation[];
  }

  type GetPivotByIdInformationParam = { 
    farmId: string; 
    pivotId: string;
  }

  type GetPivotByIdInformationResponse = { 
    current: number;
    pageSize: number;
    total: number;
    list: Models.PivotInformation;
  }
}
