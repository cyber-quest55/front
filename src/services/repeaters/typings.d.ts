// @ts-ignore
/* eslint-disable */

declare namespace API {
  type GetRepeaterParams = {
    id: string;
  };

  type GetRepeaterResponse = Array< {
    id: number;
    repeater: {
      id: number;
      type: string;
      created: string;
      updated: string;
      radio_id: string;
      taken: any;
    };
    type: string;
    name: string;
    position: string;
    created: string;
    updated: string;
    energy_type?: string;
    farm: number;
    base: number;
  }>
}
