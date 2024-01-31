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