// @ts-ignore
/* eslint-disable */

declare namespace API {
  type GetPivotByFarmParam = {
    id: number
  };

  type GetPivotByFarmResponse =  {
    current: number;
    pageSize: number;
    total: number;
    list: Models.Pivot[];
  };
}
