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

  type GetPivotInformationParam = { 
    id: number; 
    params: any
  }

  type GetPivotInformationResponse = { 
    current: number;
    pageSize: number;
    total: number;
    list: Models.PivotInformation[];
  }
}
