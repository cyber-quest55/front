// @ts-ignore
/* eslint-disable */

declare namespace API {
  type GetIrpdParams = {
    id: string;
  };

  type GetIrpdResponse = {
    current: number;
    pageSize: number;
    total: number;
    list: Models.Irpd[];
  };

  type GetIrpdByIdParams = {
    farmId: string;
    irpdId: string;
  };

  type GetIrpdByIdResponse =  Models.IrpdHistory

  type GetIrpdHistoryParams = {
    farmId: string;
    irpdId: string;
    params: any;
  };

  type GetIrpdHistoryResponse = {
    current: number;
    pageSize: number;
    total: number;
    list: Models.IrpdHistory;
  };

  type GetIrpdWaterConsumptionParams = {
    farmId: string;
    irpdId: string;
    waterId: string;
  };

  type GetIrpdWaterConsumptionResponse = {
    current: number;
    pageSize: number;
    total: number;
    list: Models.IrpdWaterConsumption[];
  };

  type GetIrpdTableParams = {
    farmId: string;
    irpdId: string;
  };

  type GetIrpdTableResponse = {
    current: number;
    pageSize: number;
    total: number;
    list: Models.IrpdTable[];
  };
}
 