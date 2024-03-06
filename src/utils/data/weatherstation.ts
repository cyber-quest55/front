import moment from 'moment';
import { IntlShape } from 'react-intl';

export const isNotNull = (value: string | number | undefined) =>
  value !== null && value !== undefined;

export const toOneDecimalPlace = (temperature: number | undefined) => temperature?.toFixed(1);

export const dateTimestampToString = (time: number) => {
  return moment.unix(time).format("DD/MM/YYYY");
};

export const dateTimestampToHourString = (time: number) => {
  return moment.unix(time).format("dddd HH") + "h";
};

export const dayNameFromTimestamp = (time: number) => {
  return moment.unix(time).format("ddd");
};

export const windDirectionStringByAngle = (deg: number | undefined, intl: IntlShape) => {
  if (deg === undefined) return '-';
  if (deg >= 337.5 || deg < 22.5)
    return intl.formatMessage({
      id: 'component.weatherstation.winddirection.north',
    });
  if (deg >= 22.5 && deg < 67.5)
    return intl.formatMessage({
      id: 'component.weatherstation.winddirection.northeast',
    });
  if (deg >= 67.5 && deg < 112.5)
    return intl.formatMessage({
      id: 'component.weatherstation.winddirection.east',
    });
  if (deg >= 112.5 && deg < 157.5)
    return intl.formatMessage({
      id: 'component.weatherstation.winddirection.southeast',
    });
  if (deg >= 157.5 && deg < 202.5)
    return intl.formatMessage({
      id: 'component.weatherstation.winddirection.south',
    });
  if (deg >= 202.5 && deg < 247.5)
    return intl.formatMessage({
      id: 'component.weatherstation.winddirection.southwest',
    });
  if (deg >= 247.5 && deg < 292.5)
    return intl.formatMessage({
      id: 'component.weatherstation.winddirection.west',
    });
  if (deg >= 292.5 && deg < 337.5)
    return intl.formatMessage({
      id: 'component.weatherstation.winddirection.northwest',
    });
  return '-';
};

export const FIVE_MIN_TIMEOUT = 300000;
