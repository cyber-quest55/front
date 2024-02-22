declare namespace APIModels {
  type MeterSystem = {
    id: number;
    imeter_set: Array<{
      id: number;
      latest_event_stream: {
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
          imanage_master_status: {
            status: number;
          };
        };
        flow: number;
        offset_applied: boolean;
        content_hash: number;
        created_by: any;
        device: number;
        equipment: number;
      };
      latest_periodic_stream: {
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
          imanage_master_status: {
            status: number;
          };
          imanage_sensor_measure_value: Array<{
            value: number;
            number_editing: number;
          }>;
        };
        flow: number;
        offset_applied: boolean;
        content_hash: number;
        created_by: any;
        device: number;
        equipment: number;
      };
      latest_config: {
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
          sensor_rule: Array<{
            rule: number;
            value_1: number;
            value_2: number;
            number_editing: number;
          }>;
          imanage_sensors: Array<{
            max_value: number;
            min_value: number;
            sensor_type: number;
            number_editing: number;
          }>;
          enable_peak_time: {
            enable: number;
          };
          datalogger_address: {
            address: string;
          };
          clear_device_memory: {
            clear_device_memory: number;
          };
          imeter_power_source: {
            power_source: number;
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
        flow_curve_equation: Array<number>;
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
        created_by: number;
        device: number;
        equipment: number;
        sensor_process_controller_pair: number;
      };
      base: {
        id: number;
        type: string;
        created: string;
        updated: string;
        radio_id: string;
        taken: any;
      };
      name: string;
      position: string;
      local_actuation: boolean;
      protocol: string;
      function: string;
      created: string;
      updated: string;
      sensor_process_controller_pair: number;
      meter_system: number;
      imeter_device: number;
      remote_control: Array<any>;
    }>;
    permission_level: number;
    name: string;
    position: string;
    created: string;
    updated: string;
    farm: number;
    base: number;
  };

  type MeterSystemById = {
    id: number;
    imeter_set: Array<{
      id: number;
      latest_event_stream: {
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
          imanage_master_status: {
            status: number;
          };
        };
        flow: number;
        offset_applied: boolean;
        content_hash: number;
        created_by: any;
        device: number;
        equipment: number;
      };
      latest_periodic_stream: {
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
          imanage_master_status: {
            status: number;
          };
          imanage_sensor_measure_value: Array<{
            value: number;
            number_editing: number;
          }>;
        };
        flow: number;
        offset_applied: boolean;
        content_hash: number;
        created_by: any;
        device: number;
        equipment: number;
      };
      latest_config: {
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
          sensor_rule: Array<{
            rule: number;
            value_1: number;
            value_2: number;
            number_editing: number;
          }>;
          imanage_sensors: Array<{
            max_value: number;
            min_value: number;
            sensor_type: number;
            number_editing: number;
          }>;
          enable_peak_time: {
            enable: number;
          };
          datalogger_address: {
            address: string;
          };
          clear_device_memory: {
            clear_device_memory: number;
          };
          imeter_power_source: {
            power_source: number;
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
        flow_curve_equation: Array<number>;
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
        created_by: number;
        device: number;
        equipment: number;
        sensor_process_controller_pair: number;
      };
      base: {
        id: number;
        type: string;
        created: string;
        updated: string;
        radio_id: string;
        taken: any;
      };
      name: string;
      position: string;
      local_actuation: boolean;
      protocol: string;
      function: string;
      created: string;
      updated: string;
      sensor_process_controller_pair: {
        id: number;
        available: boolean;
        data_write: any;
        created: string;
        updated: string;
        sensor: number;
        process_controller: any;
      };
      meter_system: {
        id: number;
        name: string;
        position: string;
        created: string;
        updated: string;
        farm: number;
        base: number;
      };
      imeter_device: {
        id: number;
        created: string;
        updated: string;
        radio_id: string;
        taken: any;
      };
      remote_control: Array<any>;
    }>;
    permission_level: number;
    name: string;
    position: string;
    created: string;
    updated: string;
    farm: number;
    base: number;
  };

  type MeterSystemHistory = {
    count: number;
    current_page: number;
    next: string;
    previous: string;
    results: Array<{
      CentralStream?: {
        id: number;
        created: string;
        updated: string;
        status: number;
        uuid: string;
        farm: number;
      };
      IMeterStream_event?: {
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
          imanage_master_status: {
            status: number;
          };
        };
        flow: number;
        offset_applied: boolean;
        content_hash: number;
        created_by: any;
        device: number;
        equipment: number;
      };
    }>;
  };

  type MeterSystemWaterLevel = {
    from: string;
    to: string;
    value: number;
  };

  type MeterSystemTable = {
    count: number;
    current_page: number;
    next: string;
    previous: string;
    results: Array<{
      created: string;
      content: {
        imanage_master_status: {
          status: number;
        };
        imanage_sensor_measure_value: Array<{
          value: number;
          number_editing: number;
        }>;
      };
      flow: number;
    }>;
  };

  type MeterConfig = {
    content: {
      clock: {
        second: number;
        minute: number;
        hour: number;
        day: number;
        month: number;
        year: number;
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
        sunday_enable: number;
        monday_enable: number;
        tuesday_enable: number;
        wednesday_enable: number;
        thursday_enable: number;
        friday_enable: number;
        saturday_enable: number;
      };
      periodic_stream_timer: {
        time: number;
      };
    };
    graphic_max_value: number;
    sensor_offset: number;
    flow_curve_equation: [number, number, number];
    measure_scale: string;
    measure_unit: string;
    min_limit: number;
    max_limit: number;
    metersystem_name: string;
    imeter_name: string;
    position_imeter: string;
    sensor_process_controller_pair: string;
  };

  type PatchMeterSystem = {
    name: string;
  };

  type PatchMeter = {
    name: string;
    position: string;
    sensor_process_controller_pair: number;
  };

  type MeterHistory = {
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
      clock: {
        day: number;
        hour: number;
        year: number;
        month: number;
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
      sensor_rule: {
        rule: number;
        value_1: number;
        value_2: number;
        number_editing: number;
      }[];
      imanage_sensors: {
        max_value: number;
        min_value: number;
        sensor_type: number;
        number_editing: number;
      }[];
      enable_peak_time: {
        enable: number;
      };
      datalogger_address: {
        address: string;
      };
      clear_device_memory: {
        clear_device_memory: number;
      };
      imeter_power_source: {
        power_source: number;
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
    device: number;
    equipment: number;
    sensor_process_controller_pair: number;
  };

  type MeterSystemSensor = {
    id: number;
    available: boolean;
    data_write: {
      rs485_data_write: {
        data: string;
        baud_rate: number;
        registers: string;
        slave_address: number;
        number_editing: number;
      }[];
    } | null;
    created: string;
    updated: string;
    sensor: {
      id: number;
      name: string;
      sensor_config: {
        imanage_sensors: {
          max_value: number;
          min_value: number;
          sensor_type: number;
          number_editing: number;
        }[];
      };
      measurement_decimal_places: number;
      created: string;
      updated: string;
    };
    process_controller: {
      id: number;
      name: string;
      controller_config: {
        rs485_read_config: {
          protocol: number;
          baud_rate: number;
          registers: string;
          size_of_bytes: number;
          slave_address: number;
          function_field: number;
          number_editing: number;
        }[];
      };
      created: string;
      updated: string;
    } | null;
  };

  type Meter = {
    id: number;
    latest_event_stream: {
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
        pump_hourmeter?: {
          hours: number;
          minutes: number;
        };
        imanage_master_status?: {
          status: number;
        };
      };
      flow: number;
      offset_applied: boolean;
      content_hash: number;
      created_by: null;
      device: number;
      equipment: number;
    };
    latest_periodic_stream: {
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
        imanage_master_status?: {
          status: number;
        };
        imanage_sensor_measure_value?: {
          value: number;
          number_editing: number;
        }[];
      };
      flow: number;
      offset_applied: boolean;
      content_hash: number;
      created_by: null;
      device: number;
      equipment: number;
    };
    latest_config: {
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
          day: number;
          hour: number;
          year: number;
          month: number;
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
        sensor_rule: {
          rule: number;
          value_1: number;
          value_2: number;
          number_editing: number;
        }[];
        imanage_sensors: {
          max_value: number;
          min_value: number;
          sensor_type: number;
          number_editing: number;
        }[];
        enable_peak_time: {
          enable: number;
        };
        datalogger_address: {
          address: string;
        };
        clear_device_memory: {
          clear_device_memory: number;
        };
        imeter_power_source: {
          power_source: number;
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
      created_by: number;
      device: number;
      equipment: number;
      sensor_process_controller_pair: number;
    };
    base: {
      id: number;
      type: string;
      created: string;
      updated: string;
      radio_id: string;
      taken: null;
    };
    name: string;
    position: string;
    local_actuation: boolean;
    protocol: string;
    function: string;
    created: string;
    updated: string;
    sensor_process_controller_pair: {
      id: number;
      available: boolean;
      data_write: null;
      created: string;
      updated: string;
      sensor: number;
      process_controller: null;
    };
    meter_system: {
      id: number;
      name: string;
      position: string;
      created: string;
      updated: string;
      farm: number;
      base: number;
    };
    imeter_device: {
      id: number;
      created: string;
      updated: string;
      radio_id: string;
      taken: null;
    };
    remote_control: any[]; // You may define a type for remote_control if needed
  };

  type CreateMeterSystemPayload = {
    name: string;
    position: string;
    imeter_device: string;
    base: string;
    local_actuation: boolean;
    protocol: string;
    function: string;
    sensor_id: number;
  };
}
