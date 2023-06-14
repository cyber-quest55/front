// @ts-ignore
/* eslint-disable */

declare namespace API {
  type GetIrpdParams = {
    id: string;
  };

  type GetIrpdResponse = {
    current: number;
    pageSize: number;
    total: number;
    list: Models.Irpd[];
  };

  type GetIrpdByIdParams = {
    farmId: string;
    irpdId: string;
  };

  type GetIrpdByIdResponse = Models.IrpdHistory;

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

  type GetIrpdWaterConsumptionResponse = {
    current: number;
    pageSize: number;
    total: number;
    list: Models.IrpdWaterConsumption[];
  };

  type GetIrpdEventsParams = {
    farmId: string;
    irpdId: string;
    params: any
  };

  type GetIrpdEventsResponse = {
    count: number
    current_page: number
    next: string
    previous: string
    results: Array<{
      id: number
      start_date: string
      end_date: string
      hour_p: number
      hour_hfp: number
      hour_r: number
      hour_total: number
      cumulative_volume: number
      created: string
      updated: string
      irpd: number
    }>
  }
}