declare namespace Models {
  /** Model of MeterSystem request */
  export type MeterSystem = {
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
 
  export type MeterSystemHistory = {
    count: number;
    current_page: number;
    next: string;
    previous: any;
    results: Array<{
      IMeterStream_event: {
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

  export type MeterSystemWaterLevel = {
    from: string;
    to: string;
    value: number;
  };

  export type MeterSystemTable = {
    count: number;
    current_page: number;
    next: string;
    previous: any;
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
}
