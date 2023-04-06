declare namespace Models {

    type Controllerconfig = {
        id: number;
        gps_config: number;
        pump_config: number;
        uuid: string;
        created_on_hardware: boolean;
        created: Date;
        updated: Date;
        arrived: Date;
        message_status: number;
        message_error: string;
        message_packets: number[];
        message_subtype: string;
        content: ControllerconfigContent;
        pinned: boolean;
        name: string;
        group_uuid: any | string;
        segments_crop: SegmentsCrop[];
        kwh_peak: string;
        kwh_out_of_peak: string;
        kwh_reduced: string;
        injection_pump: boolean;
        name_pivot_on_config: string;
        brand_model: string;
        panel_type: number;
        potency: number;
        created_by: number | any;
        device: number;
        equipment: number;
    }

    type ControllerconfigContent = {
        clock: Clock;
        sector: Sector;
        holidays: Holiday[];
        language: Language;
        segments: Segment[];
        mm_to_stop?: MmToStop;
        pause_time: { [key: string]: number };
        endgun_mode: EndgunMode;
        power_delay: PowerDelay;
        rs485_config?: Rs485Config[];
        endgun_angles: EndgunAngle[];
        rs485_baudrate?: MmToStop;
        pivot_positions: PivotPositions;
        pressure_config: PressureConfig;
        radio_addresses?: RadioAddresses;
        pivot_parameters: PivotParameters;
        time_range_config?: { [key: string]: number }[];
        pause_time_command: PauseTimeCommand;
        pluviometer_enable?: PluviometerEnable;
        voltage_limit_enable: VoltageLimitEnable;
        autoreversion_command: AutoreversionCommand;
        pluviometer_stop_mode?: PluviometerStopMode;
        voltage_configurations: VoltageConfigurations;
        autoreversion_configurations: AutoreversionConfigurations;
    }

    type AutoreversionCommand = {
        command: number;
    }

    type AutoreversionConfigurations = {
        mode: number;
        time: number;
    }

    type Clock = {
        day: number;
        hour: number;
        year: number;
        month: number;
        minute: number;
        second?: number;
    }

    type EndgunAngle = {
        end_angle: number;
        start_angle: number;
        number_editing: number;
    }

    type EndgunMode = {
        endgun_mode: number;
    }

    type Holiday = {
        day: number;
        month: number;
        number_editing: number;
    }

    type Language = {
        language: number;
    }

    type MmToStop = {
        value: number;
    }

    type PauseTimeCommand = {
        pause_time_command: number;
    }

    type PivotParameters = {
        speed: number;
        flow_rate: number;
        radius_last: number;
        irrigated_area: number;
    }

    type PivotPositions = {
        latitude_center: number;
        north_reference: number;
        longitude_center: number;
        latitude_reference: number;
        longitude_reference: number;
    }

    type PluviometerEnable = {
        enable: number;
    }

    type PluviometerStopMode = {
        stop_mode: number;
    }

    type PowerDelay = {
        power_delay: number;
    }

    type PressureConfig = {
        pump_time_out: number;
        pump_press_delay: number;
        read_pressure_by: number;
        sensor_scale_end: number;
        pump_press_switch: number;
        pump_soft_start_time: number;
        press_sensor_max_range: number;
        press_sensor_min_range: number;
    }

    type RadioAddresses = {
        gps_address: string;
        pump_address: string;
        datalogger_address: string;
        pluviometer_address: string;
    }

    type Rs485Config = {
        protocol: number;
        registers: number;
        size_of_bytes: number;
        slave_address: number;
        function_field: number;
        number_editing: number;
    }

    type Sector = {
        end_angle: number;
        start_angle: number;
    }

    type Segment = {
        angle_end: number;
        angle_start: number;
        number_editing: number;
    }

    type VoltageConfigurations = {
        stable_time: number;
        maximum_voltage: number;
        minimum_voltage: number;
        voltage_reference: number;
    }

    type VoltageLimitEnable = {
        voltage_limit_enable: number;
    }

    type SegmentsCrop = {
        name: string;
        number_editing: number;
        crop_plant_date: any;
        crop_harvest_date: any;
    }

    type ControllerstreamGps = {
        id: number;
        current_angle: number;
        end_tower_pressure: number;
        content: ControllerstreamGpsContent;
        uuid: string;
        created_on_hardware: boolean;
        created: Date;
        updated: Date;
        arrived: Date;
        message_status: number;
        message_error: string;
        message_packets: number[];
        message_subtype: string;
        content_hash: number;
        created_by: any;
        device: number;
        equipment: number;
    }

    type ControllerstreamGpsContent = {
        current_angle: CurrentAngle;
        operation_time: { [key: string]: number };
        center_pressure: CenterPressure;
        current_segment: CurrentSegment;
        voltage_measure: VoltageMeasure;
        current_schedule: CurrentSchedule;
        irrigation_status: IrrigationStatus;
        end_tower_pressure: EndTowerPressure;
        devices_current_status: DevicesCurrentStatus;
        latitude_longitude_gps: LatitudeLongitudeGps;
        irrigation_remaining_time: IrrigationRemainingTime;
        current_irrigation_information: CurrentIrrigationInformation;
    }

    type CenterPressure = {
        center_pressure: number;
    }

    type CurrentAngle = {
        current_angle: number;
    }

    type CurrentIrrigationInformation = {
        mode: number;
        direction: number;
        stop_mode: number;
        stop_angle: number;
        total_round: number;
        current_round: number;
        irrigation_percent: number;
        rain_meter_percent: number;
    }

    type CurrentSchedule = {
        current_schedule: number;
    }

    type CurrentSegment = {
        current_segment: number;
    }

    type DevicesCurrentStatus = {
        pump: number;
        motor: number;
        endgun: number;
        irripump: number;
        injection_pump: number;
    }

    type EndTowerPressure = {
        end_tower_pressure: number;
    }

    type IrrigationRemainingTime = {
        hours: number;
        minutes: number;
    }

    type IrrigationStatus = {
        irrigation_type: number;
        irrigation_status: number;
    }

    type LatitudeLongitudeGps = {
        altitude: number;
        latitude_gps: number;
        longitude_gps: number;
    }

    type VoltageMeasure = {
        voltage_measure: number;
    }

    type ControllerstreamPanel = {
        id: number;
        current_angle: number;
        end_tower_pressure: number;
        uuid: string;
        created_on_hardware: boolean;
        created: Date;
        updated: Date;
        arrived: Date;
        message_status: number;
        message_error: string;
        message_packets: number[];
        message_subtype: string;
        content: ControllerstreamPanelContent;
        content_hash: number;
        created_by: any;
        device: number;
        equipment: number;
    }

    type ControllerstreamPanelContent = {
        operation_time: { [key: string]: number };
        center_pressure: CenterPressure;
        current_segment: CurrentSegment;
        time_range_data: { [key: string]: number }[];
        voltage_measure: VoltageMeasure;
        current_schedule: CurrentSchedule;
        irrigation_status: IrrigationStatus;
        devices_current_status: DevicesCurrentStatus;
        current_irrigation_information: CurrentIrrigationInformation;
    }

}