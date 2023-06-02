declare namespace Models {
  /** Model of DeviceHistory request */
  export type DeviceHistory = {
    count: number;
    current_page: number;
    next: string;
    previous: any;
    results: Array<{
      ControllerStream_panel: {
        id: number;
        current_angle: number;
        end_tower_pressure: number;
        uuid: string;
        created_on_hardware: boolean;
        created: string;
        updated: string;
        arrived: string;
        message_status: number;
        message_error: string;
        message_packets: Array<number>;
        message_subtype: string;
        content: {
          operation_time: {
            wet_hour: number;
            pump_hour: number;
            total_hour: number;
            wet_minute: number;
            endgun_hour: number;
            pump_minute: number;
            total_minute: number;
            endgun_minute: number;
            injection_pump_hour: number;
            injection_pump_minutes: number;
          };
          center_pressure: {
            center_pressure: number;
          };
          current_segment: {
            current_segment: number;
          };
          time_range_data: Array<{
            wet_hour: number;
            pump_hour: number;
            total_hour: number;
            wet_minute: number;
            endgun_hour: number;
            pump_minute: number;
            total_minute: number;
            endgun_minute: number;
            number_editing: number;
            injection_pump_hour: number;
            injection_pump_minute: number;
          }>;
          voltage_measure: {
            voltage_measure: number;
          };
          current_schedule: {
            current_schedule: number;
          };
          irrigation_status: {
            irrigation_type: number;
            irrigation_status: number;
          };
          devices_current_status: {
            pump: number;
            motor: number;
            endgun: number;
            irripump: number;
            injection_pump: number;
          };
          current_irrigation_information: {
            mode: number;
            direction: number;
            stop_mode: number;
            stop_angle: number;
            total_round: number;
            current_round: number;
            irrigation_percent: number;
            rain_meter_percent: number;
          };
        };
        content_hash: number;
        created_by: any;
        device: number;
        equipment: number;
      };
    }>;
  };

  /** Model of DeviceReport request */
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
