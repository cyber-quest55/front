// @ts-ignore
/* eslint-disable */

declare namespace API {
  type GetRepeaterParams = {
    id: string;
  };

  type GetRepeaterResponse = {
    current: number;
    pageSize: number;
    total: number;
    list: Models.Repeater[];
  };
}
