declare namespace Models {
  /** Model of Farm */
  type Pivot = {
    id: number;
    automation_type: number;
    farm: number;
    name: string;
    protocol: number;
  }; 

  type PivotInformation = {  
      id:                         number;
      config:                     any;
      controllerconfig:           Controllerconfig;
      latest_panel_stream:        any;
      latest_gps_stream:          any;
      latest_pluviometer_stream:  any;
      controllerstream_panel:     ControllerstreamPanel;
      controllerstream_gps:       ControllerstreamGps;
      controllerstream_periodic:  any;
      irrigation_end_angle:       any;
      image:                      string;
      map_history:                number[];
      base_radio_id:              string;
      monitor_radio_id:           string;
      control_radio_id:           string;
      pump_radio_id:              any;
      reference_angle:            number;
      permission_level:           number;
      name:                       string;
      potency:                    number;
      brand_model:                string;
      automation_type:            number;
      panel_type:                 number;
      protocol:                   number;
      pluviometer:                boolean;
      maintenance:                boolean;
      form_status:                boolean;
      first_operation_date:       Date;
      created:                    Date;
      updated:                    Date;
      linear_report_time_minutes: number;
      regenerate_reports:         boolean;
      farm:                       number;
      base:                       number;
      monitor:                    number;
      control:                    number;
      pump:                       any; 
  }
}
