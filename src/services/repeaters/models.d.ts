declare namespace APIModels {
  type Repeater = {
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
  };

  type RepeaterById = {
    id: number;
    type: string;
    base_radio_id: string;
    repeater_radio_id: string;
    name: string;
    position: string;
    created: string;
    updated: string;
    energy_type: string;
    farm: number;
    base: number;
    repeater: number;
  };

  type RepeaterConfig = {
    name: string;
    position: string;
    energy_type: string;
  };

  type RepeaterDevice = {
    id: number;
    name: string;
    repeater: {
      id: number;
      created: string;
      updated: string;
      radio_id: string;
      taken: any;
    };
  };
}
