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

  type PivotHistory = {
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
      id: number;
      username: string;
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
          note: string;
          command: number;
        };
        schedule_irrigation_parameters: Array<{
          mode: number;
          end_day: number;
          percent: number;
          end_hour: number;
          end_year: number;
          direction: number;
          end_month: number;
          start_day: number;
          start_now: boolean;
          stop_mode: number;
          end_minute: number;
          start_hour: number;
          start_year: number;
          stop_angle: number;
          start_month: number;
          start_minute: number;
          number_editing: number;
          schedule_rounds: number;
          start_on_a_date: boolean;
        }>;
      };
      end_date_forecast: any;
      operation_duration_forecast: any;
      angle_V5: boolean;
      created_by: number;
      device: number;
      equipment: number;
    };
    ControllerAction_stop?: {
      id: number;
      username: string;
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
      };
      end_date_forecast: any;
      operation_duration_forecast: any;
      angle_V5: boolean;
      created_by: number;
      device: number;
      equipment: number;
    };
  };

  type PivotHistoryOperation = {
    id: number;
    start_angle: number;
    end_angle: number;
    operation_note?: string;
    irrigation_mode: number;
    start_date: string;
    end_date: string;
    hour_p: number;
    hour_hfp: number;
    hour_r: number;
    hour_total: number;
    water_blade: number;
    created: string;
    updated: string;
    pivot: number;
  };

  type PivotListGpsStream = {
    id: number;
    current_angle: number;
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
    segment: number;
    water_blade: number;
  }>;
}

declare namespace WkModels {
  /* Start of central radio update clock WS */
  type MeterSystemStandardCallbackPayload  = {
    id: number;
    uuid: string;
    created_on_hardware: boolean;
    created: string;
    updated: string;
    arrived: string;
    message_status: number;
    message_error: string;
    message_packets: number[];
    message_subtype: string;
    content: {
      clock: {
        year: number;
        month: number;
        day: number;
        hour: number;
        minute: number;
        second: number;
      };
      holidays: [];
      peak_time: {
        stop_hour_1: number;
        stop_hour_2: number;
        start_hour_1: number;
        start_hour_2: number;
        friday_enable: number;
        monday_enable: number;
        stop_minute_1: number;
        stop_minute_2: number;
        sunday_enable: number;
        start_minute_1: number;
        start_minute_2: number;
        tuesday_enable: number;
        saturday_enable: number;
        thursday_enable: number;
        wednesday_enable: number;
      };
      pump_action: {
        enable: number;
      };
      imanage_sensors: {
        max_value: number;
        min_value: number;
        sensor_type: number;
        number_editing: number;
      }[];
      enable_peak_time: {
        enable: number;
      };
      rs485_data_write: {
        data: string;
        baud_rate: number;
        registers: string;
        slave_address: number;
        number_editing: number;
      }[];
      rs485_read_config: {
        protocol: number;
        baud_rate: number;
        registers: string;
        size_of_bytes: number;
        slave_address: number;
        function_field: number;
        number_editing: number;
      }[];
      datalogger_address: {
        address: string;
      };
      clear_device_memory: {
        clear_device_memory: number;
      };
      event_stream_indexes: {
        indexes: string;
      };
      periodic_stream_timer: {
        time: number;
      };
      periodic_stream_indexes: {
        indexes: string;
      };
    };
    graphic_max_value: number;
    flow_curve_equation: number[];
    sensor_offset: number;
    measure_scale: number;
    measure_unit: string;
    min_limit: number;
    max_limit: number;
    metersystem_name: string;
    imeter_name: string;
    position_imeter: string;
    pinned: boolean;
    name: string;
    created_by: null | any;
    device: number;
    equipment: number;
    sensor_process_controller_pair: number;
  };

  type IrpdStandardCallbackPayload  = {
    id: number;
    created_by: null | any;
    uuid: string;
    created_on_hardware: boolean;
    created: string;
    updated: string;
    arrived: string;
    message_status: number;
    message_error: string;
    message_packets: number[];
    message_subtype: string;
    content: {
      clock: {
        day: number;
        month: number;
        year: number;
        hour: number;
        minute: number;
        second: number;
      };
      holidays: {
        day: number;
        month: number;
        number_editing: number;
      }[];
      peak_time: {
        stop_hour_1: number;
        stop_hour_2: number;
        start_hour_1: number;
        start_hour_2: number;
        friday_enable: number;
        monday_enable: number;
        stop_minute_1: number;
        stop_minute_2: number;
        sunday_enable: number;
        start_minute_1: number;
        start_minute_2: number;
        tuesday_enable: number;
        saturday_enable: number;
        thursday_enable: number;
        wednesday_enable: number;
      };
      imanage_sensors: {
        max_value: number;
        min_value: number;
        sensor_type: number;
        number_editing: number;
      }[];
      pump_power_time: {
        minutes: number;
      };
      enable_peak_time: {
        enable: number;
      };
      datalogger_address: {
        address: string;
      };
      clear_device_memory: {
        clear_device_memory: number;
      };
      event_stream_indexes: {
        indexes: string;
      };
      periodic_stream_timer: {
        time: number;
      };
      periodic_stream_indexes: {
        indexes: string;
      };
    };
    monthly_water_limit: number;
    has_pressure_sensor: boolean;
    name_irpd_on_config: string;
    flow: number;
    position: null | any;
    potency: number;
    pinned: boolean;
    name: string;
    kwh_peak: string;
    kwh_out_of_peak: string;
    kwh_reduced: string;
    device: number;
    irpd: number;
  };

  type IrpdConfigCallbackPayload  = any
  
  type PivotStandardCallbackPayload  = {
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
    message_packets: number[];
    message_subtype: string;
    content: {
      autoreversion_command: {
        command: number;
      };
      simple_irrigation_index_vector: {
        vector: string;
      };
      schedule_irrigation_index_vector: {
        vector: string;
      };
      segment_irrigation_index_vector: {
        vector: string;
      };
      pivot_config_index_vector: {
        vector: string;
      };
      panel_stream_index_vector: {
        vector: string;
      };
      gps_stream_index_vector: {
        vector: string;
      };
      periodic_stream_index_vector: {
        vector: string;
      };
      periodic_timer: {
        minutes: number;
      };
      periodic_offset: {
        seconds: number;
      };
      radio_addresses: {
        datalogger_address: string;
        gps_address: string;
        pump_address: string;
        pluviometer_address: string;
      };
    };
    pinned: boolean;
    name: string;
    group_uuid: string;
    segments_crop: any[];
    kwh_peak: string;
    kwh_out_of_peak: string;
    kwh_reduced: string;
    injection_pump: boolean;
    name_pivot_on_config: string;
    brand_model: string;
    panel_type: number;
    potency: number;
    created_by: null | any;
    device: number;
    equipment: number;
  };

  type PivotConfigCallbackPayload  = {
    id: number;
    username: string;
    sector_angle: null | number;
    uuid: string;
    arrived: string;
    created: string;
    updated: string;
    manual: boolean;
    radius: number;
    flow: number;
    speed: number;
    total_radius: number;
    area: number;
    center: string;
    reference: string;
    setorial: boolean;
    end_reference: string;
    image_maps_url: string;
    reversion: boolean;
    endgun: number;
    extra: boolean;
    rtc: string;
    pump_time: number;
    power_time: number;
    power_range_max: number;
    power_range_min: number;
    hour_range_max: string;
    hour_range_min: string;
    kwh_peak: string;
    kwh_out_of_peak: string;
    kwh_reduced: string;
    sent: boolean;
    delivered: boolean;
    received: boolean;
    pump_delivered: boolean;
    gps_delivered: boolean;
    image_url: null | string;
    pinned: boolean;
    name: string;
    user: number;
    pivot: number;
  };
  /* End of central radio update clock WS */

  type PivotControllerActionStop = {
    id: number;
    username: string;
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
    };
    end_date_forecast: any;
    operation_duration_forecast: any;
    angle_V5: boolean;
    created_by: number;
    device: number;
    equipment: number;
  };

  type PivotControllerActionGps = {
    id: number;
    current_angle: number;
    end_tower_pressure: number;
    content: {
      latitude_longitude_gps: {
        latitude_gps: number;
        longitude_gps: number;
        altitude: number;
      };
      current_angle: {
        current_angle: number;
      };
      center_pressure: {
        center_pressure: number;
      };
      current_irrigation_information: {
        rain_meter_percent: number;
        irrigation_percent: number;
        mode: number;
        direction: number;
        stop_mode: number;
        stop_angle: number;
        current_round: number;
        total_round: number;
      };
      irrigation_remaining_time: {
        hours: number;
        minutes: number;
      };
      voltage_measure: {
        voltage_measure: number;
      };
      end_tower_pressure: {
        end_tower_pressure: number;
      };
      irrigation_status: {
        irrigation_type: number;
        irrigation_status: number;
      };
      operation_time: {
        total_hour: number;
        total_minute: number;
        wet_hour: number;
        wet_minute: number;
        endgun_hour: number;
        endgun_minute: number;
        pump_hour: number;
        pump_minute: number;
        injection_pump_hour: number;
        injection_pump_minutes: number;
      };
      current_schedule: {
        current_schedule: number;
      };
      current_segment: {
        current_segment: number;
      };
      pluviometer_total: {
        total_measure: number;
      };
      devices_current_status: {
        motor: number;
        pump: number;
        endgun: number;
        injection_pump: number;
        irripump: number;
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

  type PivotControllerActionPanel = {
    id: number;
    current_angle: number;
    end_tower_pressure: number;
    content: {
      latitude_longitude_gps: {
        latitude_gps: number;
        longitude_gps: number;
        altitude: number;
      };
      current_angle: {
        current_angle: number;
      };
      center_pressure: {
        center_pressure: number;
      };
      current_irrigation_information: {
        rain_meter_percent: number;
        irrigation_percent: number;
        mode: number;
        direction: number;
        stop_mode: number;
        stop_angle: number;
        current_round: number;
        total_round: number;
      };
      irrigation_remaining_time: {
        hours: number;
        minutes: number;
      };
      voltage_measure: {
        voltage_measure: number;
      };
      end_tower_pressure: {
        end_tower_pressure: number;
      };
      irrigation_status: {
        irrigation_type: number;
        irrigation_status: number;
      };
      operation_time: {
        total_hour: number;
        total_minute: number;
        wet_hour: number;
        wet_minute: number;
        endgun_hour: number;
        endgun_minute: number;
        pump_hour: number;
        pump_minute: number;
        injection_pump_hour: number;
        injection_pump_minutes: number;
      };
      current_schedule: {
        current_schedule: number;
      };
      current_segment: {
        current_segment: number;
      };
      pluviometer_total: {
        total_measure: number;
      };
      devices_current_status: {
        motor: number;
        pump: number;
        endgun: number;
        injection_pump: number;
        irripump: number;
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

  type PivotControllerActionSchedule = {
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
      injection_pump_command: {
        command: number
        note: string
      }
      autoreversion_command: {
        command: number
      }
      schedule_irrigation_parameters: Array<{
        number_editing: number
        mode: number
        percent: number
        millimeter: number
        start_now: boolean
        start_on_a_date: boolean
        start_day: number
        start_month: number
        start_year: number
        start_hour: number
        start_minute: number
        end_day: number
        end_month: number
        end_year: number
        end_hour: number
        end_minute: number
        direction: number
        stop_mode: number
        stop_angle: number
        schedule_rounds: number
      }>
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

  type PivotControllerActionSimple = {
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
      injection_pump_command: {
        command: number
        note: string
      }
      autoreversion_command: {
        command: number
      }
      simple_irrigation_parameters: {
        mode: number
        percent: number
        stop_mode: number
        stop_angle: number
        rounds: number
        start_mode: number
        start_year: number
        start_month: number
        start_day: number
        start_hour: number
        start_minute: number
      }
      irrigation_status: {
        irrigation_status: number
        irrigation_type: number
      }
    }
    end_date_forecast: string
    operation_duration_forecast: number
    angle_V5: boolean
    created_by: number
    device: number
    equipment: number
  }

  type PivotControllerActionSegment = {
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
      injection_pump_command: {
        command: number
        note: string
      }
      autoreversion_command: {
        command: number
      }
      segment_irrigation_parameters: {
        start_mode: number
        end_mode: number
        rounds: number
        start_time_day: number
        start_time_month: number
        start_time_year: number
        start_time_hour: number
        start_time_minute: number
        end_time_day: number
        end_time_month: number
        end_time_year: number
        end_time_hour: number
        end_time_minute: number
        stop_angle: number
      }
      segment_modes: Array<{
        number_editing: number
        percent_forward: number
        percent_reverse: number
        mode_forward: number
        mode_reverse: number
      }>
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

}
