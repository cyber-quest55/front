// @ts-ignore
/* eslint-disable */

declare namespace API {
  type GetMeterSystemParams = {
    id: string;
  };

  type GetMeterSystemResponse = {
    current: number;
    pageSize: number;
    total: number;
    list: Models.MeterSystem[];
  };

  type GetMeterSystemByIdParams = { 
    farmId: string;
    meterId: string;
  }

  type GetMeterSystemByIdResponse = {
    current: number;
    pageSize: number;
    total: number;
    list: Models.MeterSystem;
  };

  type GetMeterSystemHistoryParams = { 
    farmId: string;
    meterId: string;
  }

  type GetMeterSystemHistoryResponse = {
    current: number;
    pageSize: number;
    total: number;
    list: Models.MeterSystemHistory[];
  }; 

  type GetMeterSystemWaterLevelParams = { 
    farmId: string;
    meterId: string;
  }

  type GetMeterSystemWaterLevelResponse = {
    current: number;
    pageSize: number;
    total: number;
    list: Models.MeterSystemWaterLevel[];
  }; 

  type GetMeterSystemTableParams = { 
    farmId: string;
    meterId: string;
  }

  type GetMeterSystemTableResponse = {
    current: number;
    pageSize: number;
    total: number;
    list: Models.MeterSystemWaterLevel[];
  }; 
}
