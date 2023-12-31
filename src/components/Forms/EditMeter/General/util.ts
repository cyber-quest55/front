import moment from 'moment';

export function numPad(n: number, zerosBefore: number) {
  let zerosString = '';

  for (let i = 0; i < zerosBefore; i++) {
    zerosString += '0';
  }

  return (zerosString + n).slice(-zerosBefore);
}

export function getDefaultPeakTimeConfig(latestConfig: any) {
  const pauseTimeStatus1 = latestConfig.content.enable_peak_time.enable === 1;
  const pauseTimeStatus2 =
    (latestConfig.content?.peak_time.start_hour_1 === 0 &&
      latestConfig.content?.peak_time.start_minute_1 === 0 &&
      latestConfig.content?.peak_time.stop_hour_2 === 0 &&
      latestConfig.content?.peak_time.end_minute_2 === 0) ||
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
    latestConfig.content?.peak_time.end_minute_2 === 0;

  const pauseTimeEnd2 = moment().set({
    hour: isPeakTime2Zero ? 0 : latestConfig.content.peak_time.stop_hour_2,
    minute: isPeakTime2Zero ? 1 : latestConfig.content.peak_time.end_minute_2,
    second: 0,
    millisecond: 0,
  });

  const defaultPeakTimeConfig = {
    enable_peak_time: {
      enable: pauseTimeStatus1 ? 1 : 0,
    },
    peak_time: {
      start_hour_1: pauseTimeStatus1 ? parseInt(`${numPad(pauseTimeStart1.hour(), 2)}`) : 0,
      start_minute_1: pauseTimeStatus1 ? parseInt(`${numPad(pauseTimeStart1.minutes(), 2)}`) : 0,
      stop_hour_1: pauseTimeStatus1 ? parseInt(`${numPad(pauseTimeEnd1.hour(), 2)}`) : 0,
      stop_minute_1: pauseTimeStatus1 ? parseInt(`${numPad(pauseTimeEnd1.minutes(), 2)}`) : 0,
      start_hour_2: pauseTimeStatus2 ? parseInt(`${numPad(pauseTimeStart2.hour(), 2)}`) : 0,
      start_minute_2: pauseTimeStatus2 ? parseInt(`${numPad(pauseTimeStart2.minutes(), 2)}`) : 0,
      stop_hour_2: pauseTimeStatus2 ? parseInt(`${numPad(pauseTimeEnd2.hour(), 2)}`) : 0,
      stop_minute_2: pauseTimeStatus2 ? parseInt(`${numPad(pauseTimeEnd2.minutes(), 2)}`) : 0,
      sunday_enable: pauseTimeStatus1 ? latestConfig.content.peak_time.sunday_enable : 0,
      monday_enable: pauseTimeStatus1 ? latestConfig.content.peak_time.monday_enable : 0,
      tuesday_enable: pauseTimeStatus1 ? latestConfig.content.peak_time.tuesday_enable : 0,
      wednesday_enable: pauseTimeStatus1 ? latestConfig.content.peak_time.wednesday_enable : 0,
      thursday_enable: pauseTimeStatus1 ? latestConfig.content.peak_time.thursday_enable : 0,
      friday_enable: pauseTimeStatus1 ? latestConfig.content.peak_time.friday_enable : 0,
      saturday_enable: pauseTimeStatus1 ? latestConfig.content.peak_time.saturday_enable : 0,
    },
    periodic_stream_timer: {
      time: 60,
    },
    clock: {
      second: moment().second(),
      minute: moment().minute(),
      hour: moment().hour(),
      day: moment().date(),
      month: moment().month() + 1,
      year: moment().year() - 2000,
    },
  };

  return defaultPeakTimeConfig;
}
