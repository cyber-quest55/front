// @ts-ignore
/* eslint-disable */

declare namespace API {
  type GetPivotByFarmParam = {
    id: number;
  };

  type GetPivotByFarmResponse = Array<APIModels.PivotByFarm>;

  type GetPivotsInformationParam = {
    id: number;
    params: any;
  };

  type GetPivotsInformationResponse = {
    count: number;
    current_page: number;
    next: string;
    previous: any;
    results: Array<APIModels.PivotInformation>;
  };

  type GetPivotByIdInformationParam = {
    farmId: number;
    pivotId: string;
  };

  type GetPivotByIdInformationResponse = APIModels.PivotByIdInformation;

  type GetPivotHistoryParams = {
    farmId: number;
    pivotId: string;
  };

  type GetPivotHistoryResponse = {
    count: number;
    current_page: number;
    next: string;
    previous: any;
    results: Array<APIModels.PivotHistory>;
  };

  type GetPivotHistoryOperationResponse = {
    count: number;
    current_page: number;
    next: string;
    previous: any;
    results: Array<APIModels.PivotHistoryOperation>;
  };

  type GetPivotListGpsStreamResponse = {
    count: number;
    current_page: number;
    next: string;
    previous: any;
    results: Array<APIModels.PivotListGpsStream>;
  };

  type GetPivotReportParams = {
    farmId: number;
    pivotId: string;
  };

  type GetEditPivotHistoryParams = {
    farmId?: number;
    pivotId: string;
  };

  type FavoritePivotConfigParams = {
    farmId: string;
    pivotId: string;
    configId: string;
  };

  type GetPivotReportResponse = APIModels.PivotReport;

  type FavoritePivotConfigResponse = APIModels.PivotReport;

  type PostPivotConfigParams = {
    farmId: number;
    pivotId: string;
    deviceId: string;
  };

  type PostSimpleIrrigation =
    | {
        message_subtype: string;
        equipment: number;
        end_date_forecast: string;
        operation_duration_forecast: number;
        content: {
          injection_pump_command: {
            command: number;
            note: string;
          };
          autoreversion_command: {
            command: number;
          };
          simple_irrigation_parameters: {
            mode: number;
            percent: number;
            stop_mode: number;
            stop_angle: number;
            rounds: number;
            start_modenumber;
            start_year: number;
            start_month: number;
            start_day: number;
            start_hour: number;
            start_minute: number;
          };
          irrigation_status: {
            irrigation_status: number;
            irrigation_type: number;
          };
        };
      }
    | {
        message_subtype: string;
        equipment: number;
        content: {
          injection_pump_command: {
            command: number;
            note: string;
          };
          autoreversion_command: {
            command: number;
          };
          schedule_irrigation_parameters: Array<{
            number_editing: number;
            mode: number;
            percent: number;
            millimeter: number;
            start_now: boolean;
            start_on_a_date: boolean;
            start_day: number;
            start_month: number;
            start_year: number;
            start_hour: number;
            start_minute: number;
            end_day: number;
            end_month: number;
            end_year: number;
            end_hour: number;
            end_minute: number;
            direction: number;
            stop_mode: number;
            stop_angle: number;
            schedule_rounds: number;
          }>;
          irrigation_status: {
            irrigation_type: number;
            irrigation_status: number;
          };
        };
      };

  type GetEstimatedTimeParams = {
    last_tower_distance: number;
    last_tower_speed: number;
    pivot_speed: number;
    direction: boolean;
    start_angle: number;
    end_angle: number;
    sector_angle: number;
    pause_time_weekdays: string;
    pause_time_1: string;
    pause_time_2: string;
    farm_timezone: string;
    irrigation_start_date: string;
    rounds: number;
    wet: boolean;
  };

  type GetEstimatedTimeResponse = { raw_duration: number; total_duration: number };

  type GetLastSimpleIrrigation = {
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
    end_date_forecast: string;
    operation_duration_forecast: number;
    angle_V5: boolean;
    created_by: number;
    device: number;
    equipment: number;
  };

  type GetLastScheduleIrrigation = {
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
        millimeter: number
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
  }

  type GetLastSegmentedIrrigation = {
    message_subtype: string
    equipment: number
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
  }

  type GetWaterBySegment = APIModels.WaterBySegment;
}
