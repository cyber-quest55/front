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
}
