// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

export async function getWeatherStationSummary(props: API.GetWeatherStationSummaryParams) {
  return request<{
    data: API.GetWeatherStationSummaryResponse;
  }>(`/farms/${props.farmId}/pivots/${props.pivotId}/weatherstation/summary/`, {
    method: 'GET',
  });
}

export async function getWeatherStation(props: API.GetWeatherStationParams) {
  return request<{
    data: API.GetWeatherStationResponse;
  }>(`/farms/${props.farmId}/pivots/${props.pivotId}/weatherstation/`, {
    method: 'GET',
  });
}

export async function getWeatherForecast(props: API.GetWeatherForecastParams) {
  return request<{
    data: API.GetWeatherForecastResponse;
  }>(`/farms/${props.farmId}/pivots/${props.pivotId}/weatherforecast/`, {
    method: 'GET',
  });
}

export async function getWeatherStationCharts(props: API.GetWeatherStationChartsParams) {
  return request<{
    data: API.GetWeatherStationChartsResponse;
  }>(`/farms/${props.farmId}/pivots/${props.pivotId}/weatherstation/charts/?period=${props.period}`, {
    method: 'GET',
  });
}