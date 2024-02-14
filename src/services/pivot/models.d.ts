declare namespace APIModels {
  type PivotByFarm = {
    id: number;
    automation_type: number;
    farm: number;
    name: string;
    protocol: number;
  };

  type PivotInformation = {
    id: number;
    config: any;
    controllerconfig: {
      id: number;
      gps_config: number;
      pump_config: number;
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
        clock: {
          day: number;
          hour: number;
          year: number;
          month: number;
          minute: number;
          second: number;
        };
        sector: {
          end_angle: number;
          start_angle: number;
        };
        holidays: Array<{
          day: number;
          month: number;
          number_editing: number;
        }>;
        language: {
          language: number;
        };
        segments: Array<{
          angle_end: number;
          angle_start: number;
          number_editing: number;
        }>;
        mm_to_stop?: {
          value: number;
        };
        pause_time: {
          enable_friday: number;
          enable_monday: number;
          enable_sunday: number;
          enable_tuesday: number;
          enable_saturday: number;
          enable_thursday: number;
          enable_wednesday: number;
          end_pause_time_hour_1: number;
          end_pause_time_hour_2: number;
          end_pause_time_minute_1: number;
          end_pause_time_minute_2: number;
          start_pause_time_hour_1: number;
          start_pause_time_hour_2: number;
          start_pause_time_minute_1: number;
          start_pause_time_minute_2: number;
        };
        endgun_mode: {
          endgun_mode: number;
        };
        power_delay: {
          power_delay: number;
        };
        endgun_angles: Array<{
          end_angle: number;
          start_angle: number;
          number_editing: number;
        }>;
        pivot_positions: {
          latitude_center: number;
          north_reference: any;
          longitude_center: number;
          latitude_reference: number;
          longitude_reference: number;
        };
        pressure_config: {
          pump_time_out: number;
          pump_press_delay: number;
          read_pressure_by: number;
          sensor_scale_end: number;
          pump_press_switch: number;
          pump_soft_start_time: number;
          press_sensor_max_range: number;
          press_sensor_min_range: number;
        };
        pivot_parameters: {
          speed: number;
          flow_rate: number;
          radius_last: number;
          irrigated_area: number;
        };
        pluviometer_scale?: {
          mm: number;
        };
        pause_time_command: {
          pause_time_command: number;
        };
        pluviometer_enable?: {
          enable: number;
        };
        voltage_limit_enable: {
          voltage_limit_enable: number;
        };
        autoreversion_command: {
          command: number;
        };
        pluviometer_stop_mode?: {
          stop_mode: number;
        };
        voltage_configurations: {
          stable_time: number;
          maximum_voltage: number;
          minimum_voltage: number;
          voltage_reference: number;
        };
        autoreversion_configurations: {
          mode: number;
          time: number;
        };
      };
      pinned: boolean;
      name: string;
      group_uuid: string;
      segments_crop: Array<{
        name?: string;
        segment_type?: string;
        number_editing: number;
        crop_plant_date: any;
        crop_harvest_date: any;
      }>;
      kwh_peak: string;
      kwh_out_of_peak: string;
      kwh_reduced: string;
      injection_pump: boolean;
      name_pivot_on_config: string;
      brand_model: string;
      panel_type: number;
      potency: number;
      created_by: number;
      device: number;
      equipment: number;
    };
    latest_panel_stream: any;
    latest_gps_stream: any;
    latest_pluviometer_stream: any;
    controllerstream_panel: {
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
    controllerstream_gps: {
      id: number;
      current_angle: any;
      end_tower_pressure: number;
      content: {
        current_angle: {
          current_angle: number;
        };
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
        pluviometer_total?: {
          total_measure: number;
        };
        end_tower_pressure: {
          end_tower_pressure: number;
        };
        devices_current_status: {
          pump: number;
          motor: number;
          endgun: number;
          irripump: number;
          injection_pump: number;
        };
        latitude_longitude_gps: {
          altitude: number;
          latitude_gps: number;
          longitude_gps: number;
        };
        irrigation_remaining_time: {
          hours: number;
          minutes: number;
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
      uuid: string;
      created_on_hardware: boolean;
      created: string;
      updated: string;
      arrived: string;
      message_status: number;
      message_error: string;
      message_packets: Array<number>;
      message_subtype: string;
      content_hash: number;
      created_by: any;
      device: number;
      equipment: number;
    };
    controllerstream_periodic?: {
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
      content: any;
      content_hash: number;
      created_by: any;
      device: number;
      equipment: number;
    };
    irrigation_end_angle: any;
    image: string;
    map_history: Array<number>;
    base_radio_id: string;
    monitor_radio_id: string;
    control_radio_id: string;
    pump_radio_id?: string;
    reference_angle: number;
    permission_level: number;
    name: string;
    potency: number;
    brand_model: string;
    automation_type: number;
    panel_type: number;
    communication_type: number;
    protocol: number;
    pluviometer: boolean;
    maintenance: boolean;
    form_status: boolean;
    first_operation_date: string;
    created: string;
    updated: string;
    linear_report_time_minutes: number;
    regenerate_reports: boolean;
    farm: number;
    base: number;
    monitor: number;
    control: number;
    pump?: number;
  };

  type PivotByIdInformation = {
    id: number;
    config: any;
    controllerconfig: Controllerconfig;
    latest_panel_stream: any;
    latest_gps_stream: any;
    latest_pluviometer_stream: any;
    controllerstream_panel: ControllerstreamPanel;
    controllerstream_gps: ControllerstreamGps;
    controllerstream_periodic: any;
    irrigation_end_angle: any;
    image: string;
    map_history: number[];
    base_radio_id: string;
    monitor_radio_id: string;
    control_radio_id: string;
    pump_radio_id: any;
    reference_angle: number;
    permission_level: number;
    name: string;
    potency: number;
    brand_model: string;
    automation_type: number;
    panel_type: number;
    protocol: number;
    pluviometer: boolean;
    maintenance: boolean;
    form_status: boolean;
    first_operation_date: Date;
    created: Date;
    updated: Date;
    linear_report_time_minutes: number;
    regenerate_reports: boolean;
    farm: number;
    base: number;
    monitor: number;
    control: number;
    pump: any;
  };

  type PivotHistory =  {
    CentralStream?: {
      id: number;
      created: string;
      updated: string;
      status: number;
      uuid: string;
      farm: number;
    };
    ControllerStream_panel?: {
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
    ControllerStream_gps?: {
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
        current_angle: {
          current_angle: number;
        };
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
        pluviometer_total: {
          total_measure: number;
        };
        end_tower_pressure: {
          end_tower_pressure: number;
        };
        devices_current_status: {
          pump: number;
          motor: number;
          endgun: number;
          irripump: number;
          injection_pump: number;
        };
        latitude_longitude_gps: {
          altitude: number;
          latitude_gps: number;
          longitude_gps: number;
        };
        irrigation_remaining_time: {
          hours: number;
          minutes: number;
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
    ControllerAction_simple?: {
      id: number;
      username: any;
      current_angle: number;
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
        irrigation_status: {
          irrigation_type: number;
          irrigation_status: number;
        };
        autoreversion_command: {
          command: number;
        };
        injection_pump_command: {
          command: number;
        };
        simple_irrigation_parameters: {
          mode: number;
          rounds: number;
          percent: number;
          start_day: number;
          stop_mode: number;
          start_hour: number;
          start_mode: number;
          start_year: number;
          stop_angle: number;
          start_month: number;
          start_minute: number;
        };
      };
      end_date_forecast: any;
      operation_duration_forecast: any;
      angle_V5: boolean;
      created_by: any;
      device: number;
      equipment: number;
    };
    ControllerAction_schedule?: {
      id: number
      username: string
      current_angle: number
      uuid: string
      created_on_hardware: boolean
      created: string
      updated: string
      arrived: string
      message_status: number
      message_error: string
      message_packets: Array<number>
      message_subtype: string
      content: {
        irrigation_status: {
          irrigation_type: number
          irrigation_status: number
        }
        autoreversion_command: {
          command: number
        }
        injection_pump_command: {
          note: string
          command: number
        }
        schedule_irrigation_parameters: Array<{
          mode: number
          end_day: number
          percent: number
          end_hour: number
          end_year: number
          direction: number
          end_month: number
          start_day: number
          start_now: boolean
          stop_mode: number
          end_minute: number
          start_hour: number
          start_year: number
          stop_angle: number
          start_month: number
          start_minute: number
          number_editing: number
          schedule_rounds: number
          start_on_a_date: boolean
        }>
      }
      end_date_forecast: any
      operation_duration_forecast: any
      angle_V5: boolean
      created_by: number
      device: number
      equipment: number
    };
    ControllerAction_stop?: {
      id: number
      username: string
      current_angle: number
      uuid: string
      created_on_hardware: boolean
      created: string
      updated: string
      arrived: string
      message_status: number
      message_error: string
      message_packets: Array<number>
      message_subtype: string
      content: {
        irrigation_status: {
          irrigation_type: number
          irrigation_status: number
        }
      }
      end_date_forecast: any
      operation_duration_forecast: any
      angle_V5: boolean
      created_by: number
      device: number
      equipment: number
    }
  };

  type PivotHistoryOperation = {
    id: number
    start_angle: number
    end_angle: number
    operation_note?: string
    irrigation_mode: number
    start_date: string
    end_date: string
    hour_p: number
    hour_hfp: number
    hour_r: number
    hour_total: number
    water_blade: number
    created: string
    updated: string
    pivot: number
  }

  type PivotListGpsStream = {
    id: number
    current_angle: number
    end_tower_pressure: number
    content: {
      current_angle: {
        current_angle: number
      }
      operation_time: {
        wet_hour: number
        pump_hour: number
        total_hour: number
        wet_minute: number
        endgun_hour: number
        pump_minute: number
        total_minute: number
        endgun_minute: number
        injection_pump_hour: number
        injection_pump_minutes: number
      }
      center_pressure: {
        center_pressure: number
      }
      current_segment: {
        current_segment: number
      }
      voltage_measure: {
        voltage_measure: number
      }
      current_schedule: {
        current_schedule: number
      }
      irrigation_status: {
        irrigation_type: number
        irrigation_status: number
      }
      pluviometer_total: {
        total_measure: number
      }
      end_tower_pressure: {
        end_tower_pressure: number
      }
      devices_current_status: {
        pump: number
        motor: number
        endgun: number
        irripump: number
        injection_pump: number
      }
      latitude_longitude_gps: {
        altitude: number
        latitude_gps: number
        longitude_gps: number
      }
      irrigation_remaining_time: {
        hours: number
        minutes: number
      }
      current_irrigation_information: {
        mode: number
        direction: number
        stop_mode: number
        stop_angle: number
        total_round: number
        current_round: number
        irrigation_percent: number
        rain_meter_percent: number
      }
    }
    uuid: string
    created_on_hardware: boolean
    created: string
    updated: string
    arrived: string
    message_status: number
    message_error: string
    message_packets: Array<number>
    message_subtype: string
    content_hash: number
    created_by: any
    device: number
    equipment: number
  }
  
  type PivotReport = {
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

  type PostPivotConfig = {
    message_subtype: string;
    equipment: number;
    segments_crop: Array<{
      number_editing: number;
      name: string;
      segment_type: string;
      crop_plant_date: string;
      crop_harvest_date: string;
    }>;
    kwh_peak: number;
    kwh_out_of_peak: number;
    kwh_reduced: number;
    injection_pump: boolean;
    name_pivot_on_config: string;
    brand_model: string;
    panel_type: string;
    potency: string;
    content: {
      pivot_parameters: {
        radius_last: number;
        flow_rate: number;
        speed: number;
        irrigated_area: number;
      };
      clock: {
        day: number;
        month: number;
        year: number;
        hour: number;
        minute: number;
      };
      voltage_limit_enable: {
        voltage_limit_enable: number;
      };
      voltage_configurations: {
        minimum_voltage: number;
        maximum_voltage: number;
        stable_time: number;
        voltage_reference: number;
      };
      language: {
        language: number;
      };
      pressure_config: {
        read_pressure_by: number;
        pump_time_out: number;
        pump_press_switch: number;
        pump_press_delay: number;
        pump_soft_start_time: number;
        press_sensor_max_range: number;
        press_sensor_min_range: number;
        sensor_scale_end: number;
      };
      autoreversion_configurations: {
        mode: number;
        time: number;
      };
      autoreversion_command: {
        command: number;
      };
      pause_time: {
        enable_friday: number;
        enable_monday: number;
        enable_sunday: number;
        enable_tuesday: number;
        enable_saturday: number;
        enable_thursday: number;
        enable_wednesday: number;
        start_pause_time_hour_1: number;
        start_pause_time_minute_1: number;
        end_pause_time_hour_1: number;
        end_pause_time_minute_1: number;
        start_pause_time_hour_2: number;
        start_pause_time_minute_2: number;
        end_pause_time_hour_2: number;
        end_pause_time_minute_2: number;
      };
      pause_time_command: {
        pause_time_command: number;
      };
      power_delay: {
        power_delay: number;
      };
      sector: {
        start_angle: number;
        end_angle: number;
      };
      segments: Array<{
        number_editing: number;
        angle_start: number;
        angle_end: number;
      }>;
      pivot_positions: {
        latitude_center: number;
        longitude_center: number;
        north_reference: number;
        latitude_reference: number;
        longitude_reference: number;
      };
      endgun_mode: {
        endgun_mode: number;
      };
      endgun_angles: Array<{
        end_angle: number;
        start_angle: number;
        number_editing: number;
      }>;
      pluviometer_enable: {
        enable: number;
      };
      pluviometer_stop_mode: {
        stop_mode: number;
      };
      mm_to_stop: {
        value: number;
      };
      pluviometer_scale: {
        mm: number;
      };
    };
  };

  type CreateLinearPivotMonitorPayload = {
    name: string;
    monitor: string;
    base: string;
    automation_type: number;
    brand_model: string;
    protocol: string;
    flowRate: number;
    pivotLength: number;
    pivotSpeed: number;
  };

  type CreatePivotPayload = {
    name: string;
    potency: number;
    communication_type: number;
    base: string | null;
    control: string;
    monitor: string;
    automation_type: number;
    panel_type: number;
    brand_model: string;
    pluviometer: boolean;
    pump: string | null;
    protocol: string;
  };

  type CreatePivotMonitorPayload = {
    name: string;
    potency: number;
    monitor: string;
    base: string;
    automation_type: number;
    brand_model: string;
    pump: string | null;
    protocol: string;
  };
  type WaterBySegment = Array<{
    segment: number
    water_blade: number
  }>
  
}
