declare namespace Models {
  /** Model of Irpd request */
  export type DeviceReport = {
    pivot_id: number;
    start_date: string;
    end_date: string;
    actions_count: {
      by_web: number;
      by_panel: number;
      not_executed: number;
    };
    unexpected_stops: {
      lack_of_pressure: number;
      energy_blackot: number;
      misalignment: number;
      power_surge: number;
    };
    hours_count: {
      total_hours: number;
      wet_total_hours: number;
      dry_total_hours: number;
    };
    energy_consumption: {
      ponta: {
        hours: number;
        kwh_value: number;
        kwh_consumption: number;
        total: number;
      };
      fora_de_ponta: {
        hours: number;
        kwh_value: number;
        kwh_consumption: number;
        total: number;
      };
      reduzido: {
        hours: number;
        kwh_value: number;
        kwh_consumption: number;
        total: number;
      };
    };
    flow: {
      value_m3: number;
      total_m3h: number;
    };
    water_blade: {
      average: number;
      by_angle: Array<number>;
    };
    voltage_min: Array<number>;
    voltage_med: Array<number>;
    voltage_max: Array<number>;
    voltage_array: Array<{
      date: string;
      temp_voltage: number;
      voltage: number;
    }>;
    latest_pressure_array_by_angle: any;
    first_pressure_array_by_angle: any;
    misalignment_array: Array<any>;
    start_pivot_report_aggregate: number;
  };
}
