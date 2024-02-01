// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

export async function getWeatherStationSummary(props: API.GetWeatherStationSummaryParams) {
  return request<{
    data: API.GetWeatherStationSummaryResponse;
  }>(`/farms/${props.farmId}/pivots/${props.pivotId}/weatherstation/`, {
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