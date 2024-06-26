declare namespace APIModels {
  type Irpd = {
    id: number;
    latest_irpd_stream: any;
    latest_irpd_pressure_stream: any;
    latest_irpd_config: any;
    latest_irpd_stream_v5_event: {
      id: number;
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
        pump_hourmeter: {
          hours: number;
          minutes: number;
        };
        pump_last_start_time?: {
          start_day: number;
          start_hour: number;
          start_year: number;
          start_month: number;
          start_minutes: number;
        };
        imanage_master_status: {
          status: number;
        };
      };
      content_hash?: number;
      created_by: any;
      device: number;
      irpd: number;
    };
    latest_irpd_stream_v5_periodic: {
      id: number;
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
        pump_last_start_time?: {
          start_day: number;
          start_hour: number;
          start_year: number;
          start_month: number;
          start_minutes: number;
        };
        imanage_master_status: {
          status: number;
        };
        imanage_sensor_measure_value: Array<{
          value: number;
          number_editing: number;
        }>;
      };
      content_hash?: number;
      created_by: any;
      device: number;
      irpd: number;
    };
    latest_irpd_config_v5: {
      id: number;
      created_by: {
        username: string;
        email: string;
        first_name: string;
        last_name: string;
        id: number;
        profile_id: number;
        pending: boolean;
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
      content: {
        clock: {
          day: number;
          hour: number;
          year: number;
          month: number;
          minute: number;
          second: number;
        };
        holidays: Array<{
          day: number;
          month: number;
          number_editing: number;
        }>;
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
        imanage_sensors: Array<{
          max_value: number;
          min_value: number;
          sensor_type: number;
          number_editing: number;
        }>;
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
      position: string;
      potency: number;
      pinned: boolean;
      name: string;
      device: number;
      irpd: number;
    };
    image: string;
    base: string;
    pump: string;
    permission_level: number;
    name: string;
    potency: number;
    flow: number;
    position: string;
    protocol: number;
    created: string;
    updated: string;
    regenerate_reports: boolean;
    farm: number;
  };

  type IrpdById = {
    id: number;
    latest_irpd_stream: any;
    latest_irpd_pressure_stream: any;
    latest_irpd_config: any;
    latest_irpd_stream_v5_event: {
      id: number;
      total_flow: number;
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
        pump_hourmeter: {
          hours: number;
          minutes: number;
        };
        imanage_master_status: {
          status: number;
        };
      };
      content_hash: any;
      created_by: any;
      device: number;
      irpd: number;
    };
    latest_irpd_stream_v5_periodic: {
      id: number;
      total_flow: number;
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
        imanage_master_status: {
          status: number;
        };
        imanage_sensor_measure_value: Array<{
          value: number;
          number_editing: number;
        }>;
      };
      content_hash: any;
      created_by: any;
      device: number;
      irpd: number;
    };
    latest_irpd_config_v5: {
      id: number;
      created_by: {
        username: string;
        email: string;
        first_name: string;
        last_name: string;
        id: number;
        profile_id: number;
        pending: boolean;
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
      content: {
        clock: {
          day: number;
          hour: number;
          year: number;
          month: number;
          minute: number;
          second: number;
        };
        holidays: Array<{
          day: number;
          month: number;
          number_editing: number;
        }>;
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
        imanage_sensors: Array<{
          max_value: number;
          min_value: number;
          sensor_type: number;
          number_editing: number;
        }>;
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
      position: string;
      potency: number;
      pinned: boolean;
      name: string;
      kwh_peak: string;
      kwh_out_of_peak: string;
      kwh_reduced: string;
      device: number;
      irpd: number;
    };
    image: string;
    base: string;
    pump: string;
    permission_level: number;
    name: string;
    potency: number;
    flow: number;
    position: string;
    protocol: number;
    created: string;
    updated: string;
    regenerate_reports: boolean;
    farm: number;
  };

  type IrpdHistoryEventPayload = {
    WsEvent?: WsIrpdModels.IrpdControllerEvent;
    WsSchedule?: WsIrpdModels.IrpdControllerSchedule;
    WsPeriodic?: WsIrpdModels.IrpdCoontrollerPeriodic;
    WsSimple?: WsIrpdModels.IrpdControllerSimple;
    WsCentral?: WsIrpdModels.IrpdControllerCentralStream;
  }

  type IrpdHistoryListItem = {
    id: number;
    username: string;
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
      pump_action: {
        enable: number; // 0, 1
      };
    };
    created_by?: number | null;
    device: any;
    irpd: number;
    key?: string;
    origin?: string;
    command?: string;
  }

  // IRPD has 2 main flags (central and periodic) if informed it will return a complete list
  type IrpdHistoryCompleteListItem = {
    irpd_action_v5?: {
      id: number;
      username: string;
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
        pump_action?: {
          enable: number;
        };
        pump_schedule?: {
          stop_day: number;
          start_day: number;
          stop_hour: number;
          stop_year: number;
          start_hour: number;
          start_year: number;
          stop_month: number;
          start_month: number;
          stop_minute: number;
          start_minute: number;
        };
        pump_schedule_enable?: {
          enable: number;
        };
      };
      created_by: number;
      device: number;
      irpd: number;
    };
    irpd_stream_v5?: {
      id: number;
      total_flow: number;
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
        pump_last_start_time: {
          start_day: number;
          start_hour: number;
          start_year: number;
          start_month: number;
          start_minutes: number;
        };
        imanage_master_status: {
          status: number;
        };
        imanage_sensor_measure_value: Array<{
          value: number;
          number_editing: number;
        }>;
      };
      content_hash: number;
      created_by: any;
      device: number;
      irpd: number;
    };
    CentralStream?: {
      id: number;
      created: string;
      updated: string;
      status: number;
      uuid: string;
      farm: number;
    };
    IrpdStreamV5_periodic?: {
      id: number;
      total_flow: number;
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
        pump_last_start_time: {
          start_hour: number;
          start_minutes: number;
          start_day: number;
          start_month: number;
          start_year: number;
        };
        imanage_master_status: {
          status: number;
        };
        imanage_sensor_measure_value: Array<{
          number_editing: number;
          value: number;
        }>;
      };
      content_hash: number;
      created_by: any;
      device: number;
      irpd: number;
    };
    IrpdActionV5_schedule?: {
      id: number;
      username: string;
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
        pump_schedule_enable: {
          enable: number;
        };
        pump_schedule: {
          start_year: number;
          start_month: number;
          start_day: number;
          start_hour: number;
          start_minute: number;
          stop_year: number;
          stop_month: number;
          stop_day: number;
          stop_hour: number;
          stop_minute: number;
        }
      }
      created_by: number;
      device: number;
      irpd: number;
    };
    IrpdStreamV5_event?: {
      id: number;
      uuid: string;
      arrived: string;
      device: any;
      created_on_hardware: boolean;
      message_status: number;
      message_subtype?: string;
      message_packets: Array<number>;
      message_error: string;
      content: {
        pump_hourmeter: {
          hours: number;
          minutes: number;
        };
        pump_last_start_time: {
          start_day: number;
          start_hour: number;
          start_year: number;
          start_month: number;
          start_minutes: number;
        };
        imanage_master_status: {
          status: number;
        };
      };
      irpd: number;
      created: string;
      updated: string;
      created_by?: number;
    };
    IrpdActionV5_simple?: {
      id: number;
      username: string;
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
        pump_action: {
          enable: number;
        }
      }
      created_by: number;
      device: number;
      irpd: number;
    };
  };

  type IrpdCompleteHistory = {
    count: number;
    current_page: number;
    next: string;
    previous: string;
    results: IrpdHistoryCompleteListItem[];
  };

  type IrpdWaterConsumption = {
    from: string;
    to: string;
    value: number;
    hours_value: number;
    volume_value: number;
    type: number;
  };

  type IrpdEventsResponse = {
    count: number;
    current_page: number;
    next: string;
    previous: string;
    results: Array<{
      id: number;
      start_date: string;
      end_date: string;
      hour_p: number;
      hour_hfp: number;
      hour_r: number;
      hour_total: number;
      cumulative_volume: number;
      created: string;
      updated: string;
      irpd: number;
    }>;
  };

  type IrpdConfigPayload = {
    content: {
      clear_device_memory: {
        clear_device_memory: number;
      };
      datalogger_address: {
        address: string;
      };
      enable_peak_time: {
        enable: number;
      };
      peak_time: {
        start_hour_1: number;
        start_minute_1: number;
        stop_hour_1: number;
        stop_minute_1: number;
        start_hour_2: number;
        start_minute_2: number;
        stop_hour_2: number;
        stop_minute_2: number;
        friday_enable: number;
        monday_enable: number;
        sunday_enable: number;
        tuesday_enable: number;
        saturday_enable: number;
        thursday_enable: number;
        wednesday_enable: number;
      };
      holidays: [];
      clock: {
        second: number;
        minute: number;
        hour: number;
        day: number;
        month: number;
        year: number;
      };
      pump_power_time: {
        minutes: number;
      };
      imanage_sensors: Array<{
        number_editing: number;
        sensor_type: number;
        max_value: number;
        min_value: number;
      }>;
    };
    monthly_water_limit: number;
    has_pressure_sensor: boolean;
    name_irpd_on_config: string;
    flow: number;
    position: string;
    potency: number;
    kwh_peak: number;
    kwh_out_of_peak: number;
    kwh_reduced: number;
  };

  type IrpdConfig = {
    id: number;
    created_by: {
      username: string;
      email: string;
      first_name: string;
      last_name: string;
      id: number;
      profile_id: number;
      pending: boolean;
    };
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
      clear_device_memory: {
        clear_device_memory: number;
      };
      datalogger_address: {
        address: string;
      };
      enable_peak_time: {
        enable: number;
      };
      peak_time: {
        start_hour_1: number;
        start_minute_1: number;
        stop_hour_1: number;
        stop_minute_1: number;
        start_hour_2: number;
        start_minute_2: number;
        stop_hour_2: number;
        stop_minute_2: number;
        friday_enable: number;
        monday_enable: number;
        sunday_enable: number;
        tuesday_enable: number;
        saturday_enable: number;
        thursday_enable: number;
        wednesday_enable: number;
      };
      holidays: {
        day: number;
        month: number;
        number_editing: number;
      }[];
      clock: {
        second: number;
        minute: number;
        hour: number;
        day: number;
        month: number;
        year: number;
      };
      pump_power_time: {
        minutes: number;
      };
      imanage_sensors: {
        number_editing: number;
        sensor_type: number;
        max_value: number;
        min_value: number;
      }[];
      periodic_stream_indexes: {
        indexes: string;
      };
      event_stream_indexes: {
        indexes: string;
      };
      periodic_stream_timer: {
        time: number;
      };
    };
    monthly_water_limit: number;
    has_pressure_sensor: boolean;
    name_irpd_on_config: string;
    flow: number;
    position: string;
    potency: number;
    pinned: boolean;
    name: string;
    kwh_peak: string;
    kwh_out_of_peak: string;
    kwh_reduced: string;
    device: number;
    irpd: number;
  };

  type IrpdDevice = {
    id: number;
    name: string;
    pump: {
      id: number;
      created: string;
      updated: string;
      radio_id: string;
      taken: null | string; // Assuming taken can be either null or a string
    };
  };

  type IrpdPayload = {
    name: string;
    potency: number;
    position: string;
    flow: number;
  };

  type IrpdConfigPayloadV4 = {
    monthly_water_limit: number;
    hour_range_max: string;
    hour_range_min: string;
    rtc: string;
    energy_time: number;
  };

  type IrpdConfigV4 = {
    id: number;
    uuid: string;
    arrived: string;
    created: string;
    updated: string;
    hour_range_max: string;
    hour_range_min: string;
    rtc: string;
    energy_time: number;
    sent: boolean;
    delivered: boolean;
    manual: boolean;
    monthly_water_limit: number;
    user: any;
    irpd: number;
  };

  type CreateIrpdPayload = {
    name: string;
    base: string;
    pump: string;
    potency: number;
    flow: string;
    position: string;
    protocol: number;
  };
}
declare namespace WsIrpdModels {
  /* Start of irpd history history WS */
  type RawIrpdControllerEvent = {
    id: number;
    uuid: string;
    arrived: string;
    device: any;
    created_on_hardware: boolean;
    message_status: number;
    message_subtype?: string;
    message_packets: Array<number>;
    message_error: string;
    content: {
      pump_hourmeter: {
        hours: number;
        minutes: number;
      };
      pump_last_start_time: {
        start_day: number;
        start_hour: number;
        start_year: number;
        start_month: number;
        start_minutes: number;
      };
      imanage_master_status: {
        status: number;
      };
    };
    irpd: number;
    created: string;
    updated: string;
    created_by?: number;  
  };

  type RawIrpdPressureStream = {
    id: number;
    irpd: number;
    uuid: string;
    arrived: string;
    created: string;
    payload: string;
    pressure: number;
    frame_id: number;
    device: string;
  };

  type IrpdControllerEvent = {
    data: RawIrpdControllerEvent;
  };

  type IrpdControllerSchedule = {
    data: {
      id: number;
      username: string;
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
        pump_schedule_enable: {
          enable: number;
        };
        pump_schedule: {
          start_year: number;
          start_month: number;
          start_day: number;
          start_hour: number;
          start_minute: number;
          stop_year: number;
          stop_month: number;
          stop_day: number;
          stop_hour: number;
          stop_minute: number;
        }
      }
      created_by: number;
      device: number;
      irpd: number;
    }
  };
  
  type IrpdControllerSimple = {
    data: {
      id: number;
      username: string;
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
        pump_action: {
          enable: number;
        }
      }
      created_by: number;
      device: number;
      irpd: number;
    };
  };
  
  type IrpdControllerCentralStream = {
    data: {
      id: number;
      created: string;
      updated: string;
      status: number;
      uuid: string;
      farm: number;
    };
  };

  type RawIrpdCoontrollerPeriodic = {
    id: number;
    total_flow: number;
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
      pump_last_start_time: {
        start_hour: number;
        start_minutes: number;
        start_day: number;
        start_month: number;
        start_year: number;
      };
      imanage_master_status: {
        status: number;
      };
      imanage_sensor_measure_value: Array<{
        number_editing: number;
        value: number;
      }>;
    };
    content_hash: number;
    created_by: any;
    device: number;
    irpd: number;
  };

  type IrpdCoontrollerPeriodic = {
    data: RawIrpdCoontrollerPeriodic;
  };
  /* End of irpd history history WS */

  /* Start of central radio update clock WS */
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
  /* End of central radio update clock WS */
}