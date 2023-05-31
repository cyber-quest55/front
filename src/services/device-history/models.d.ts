declare namespace Models {
  /** Model of Irpd request */
  export type DeviceHistory = {
    count: number
    current_page: number
    next: string
    previous: any
    results: Array<{
      ControllerStream_panel: {
        id: number
        current_angle: number
        end_tower_pressure: number
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
          time_range_data: Array<{
            wet_hour: number
            pump_hour: number
            total_hour: number
            wet_minute: number
            endgun_hour: number
            pump_minute: number
            total_minute: number
            endgun_minute: number
            number_editing: number
            injection_pump_hour: number
            injection_pump_minute: number
          }>
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
          devices_current_status: {
            pump: number
            motor: number
            endgun: number
            irripump: number
            injection_pump: number
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
        content_hash: number
        created_by: any
        device: number
        equipment: number
      }
    }>
  }
  
}
