// @ts-ignore
/* eslint-disable */

declare namespace API {
  type GetIrpdParams = {
    id: string;
  };

  type GetIrpdResponse =  Array<{
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
  }>

  type GetIrpdByIdParams = {
    farmId: string;
    irpdId: string;
  };

  type GetIrpdByIdResponse = {
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

  type GetIrpdHistoryParams = {
    farmId: string;
    irpdId: string;
    params: any;
  };

  type GetIrpdHistoryResponse = {
    count: number;
    current_page: number;
    next: string;
    previous: string;
    results: Array<{
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
          imanage_sensor_measure_value?: Array<{
            value: number;
            number_editing: number;
          }>;
          pump_hourmeter?: {
            hours: number;
            minutes: number;
          };
        };
        content_hash: number;
        created_by: any;
        device: number;
        irpd: number;
      };
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
          pump_action: {
            enable: number;
          };
        };
        created_by: number;
        device: number;
        irpd: number;
      };
    }>;
  };

  type GetIrpdWaterConsumptionParams = {
    farmId: string;
    irpdId: string;
    waterId: string;
  };

  type GetIrpdWaterConsumptionResponse = Array<{
    year: string;
    type: string;
    value: number;
  }>;

  type GetIrpdEventsParams = {
    farmId: string;
    irpdId: string;
    params: any;
  };

  type GetIrpdEventsResponse = {
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
}
