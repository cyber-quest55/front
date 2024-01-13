import moment from 'moment';

export function getDefaultIrpdContentConfig(irpd: any) {
  const latestConfig = irpd.latest_irpd_config_v5;
  const pauseTimeStatus1 =
    (irpd.latest_irpd_config_v5.content?.peak_time.start_hour_1 === 0 &&
      irpd.latest_irpd_config_v5.content?.peak_time.start_minute_1 === 0 &&
      irpd.latest_irpd_config_v5.content?.peak_time.stop_hour_1 === 0 &&
      irpd.latest_irpd_config_v5.content?.peak_time.stop_minute_1 === 0) ||
    irpd.latest_irpd_config_v5.content?.enable_peak_time?.enable === false
      ? false
      : true;

  const pauseTimeStatus2 =
    (latestConfig.content?.peak_time.start_hour_2 === 0 &&
      latestConfig.content?.peak_time.start_minute_2 === 0 &&
      latestConfig.content?.peak_time.stop_hour_2 === 0 &&
      latestConfig.content?.peak_time.stop_minute_2 === 0) ||
    pauseTimeStatus1 === false
      ? false
      : true;
  const pauseTimeStart1 = moment().set({
    hour: pauseTimeStatus1 ? latestConfig.content.peak_time.start_hour_1 : 0,
    minute: pauseTimeStatus1 ? latestConfig.content.peak_time.start_minute_1 : 0,
    second: 0,
    millisecond: 0,
  });
  const pauseTimeEnd1 = moment().set({
    hour: pauseTimeStatus1 ? latestConfig.content.peak_time.stop_hour_1 : 0,
    minute: pauseTimeStatus1 ? latestConfig.content.peak_time.end_minute_1 : 0,
    second: 0,
    millisecond: 0,
  });
  const pauseTimeStart2 = moment().set({
    hour: pauseTimeStatus1 ? latestConfig.content.peak_time.start_hour_2 : 0,
    minute: pauseTimeStatus1 ? latestConfig.content.peak_time.start_minute_2 : 0,
    second: 0,
    millisecond: 0,
  });

  const isPeakTime2Zero =
    latestConfig.content?.peak_time.start_hour_2 === 0 &&
    latestConfig.content?.peak_time.start_minute_2 === 0 &&
    latestConfig.content?.peak_time.stop_hour_2 === 0 &&
    latestConfig.content?.peak_time.stop_minute_2 === 0;

  const pauseTimeEnd2 = moment().set({
    hour: isPeakTime2Zero ? 0 : latestConfig.content.peak_time.stop_hour_2,
    minute: isPeakTime2Zero ? 1 : latestConfig.content.peak_time.stop_minute_2,
    second: 0,
    millisecond: 0,
  });

  const defaultPeakTimeConfig = {
    clear_device_memory: {
      clear_device_memory: 1,
    },
    datalogger_address: { address: irpd.base },
    enable_peak_time: { enable: pauseTimeStatus1 ? 1 : 0 },
    peak_time: {
      start_hour_1: pauseTimeStatus1 ? pauseTimeStart1.hour() : 0,
      start_minute_1: pauseTimeStatus1 ? pauseTimeStart1.minute() : 0,
      stop_hour_1: pauseTimeStatus1 ? pauseTimeEnd1.hour() : 0,
      stop_minute_1: pauseTimeStatus1 ? pauseTimeEnd1.minute() : 0,
      start_hour_2: pauseTimeStatus2 ? pauseTimeStart2.hour() : 0,
      start_minute_2: pauseTimeStatus2 ? pauseTimeStart2.minute() : 0,
      stop_hour_2: pauseTimeStatus2 ? pauseTimeEnd2.hour() : 0,
      stop_minute_2: pauseTimeStatus2 ? pauseTimeEnd2.minute() : 0,
      friday_enable: pauseTimeStatus1 ? latestConfig.content.peak_time.friday_enable : 0,
      monday_enable: pauseTimeStatus1 ? latestConfig.content.peak_time.monday_enable : 0,
      sunday_enable: pauseTimeStatus1 ? latestConfig.content.peak_time.sunday_enable : 0,
      tuesday_enable: pauseTimeStatus1 ? latestConfig.content.peak_time.tuesday_enable : 0,
      saturday_enable: pauseTimeStatus1 ? latestConfig.content.peak_time.saturday_enable : 0,
      thursday_enable: pauseTimeStatus1 ? latestConfig.content.peak_time.thursday_enable : 0,
      wednesday_enable: pauseTimeStatus1 ? latestConfig.content.peak_time.wednesday_enable : 0,
    },
    holidays: [] as any,
    clock: {
      second: moment().second(),
      minute: moment().minute(),
      hour: moment().hour(),
      day: moment().date(),
      month: moment().month() + 1,
      year: moment().year() - 2000,
    },
    pump_power_time: {
      minutes: parseInt(latestConfig.content?.pump_power_time?.minutes),
    },
    imanage_sensors: [
      {
        number_editing: 0,
        sensor_type: 4,
        max_value: latestConfig.content.imanage_sensors[0].max_value,
        min_value: 0,
      },
    ],
  };

  return defaultPeakTimeConfig;
}
