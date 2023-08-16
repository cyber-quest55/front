// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** GET /farms */
export async function getFarms(options?: API.GetFarmsParams) {
  return request<{
    data: API.GetFarmResponse;
  }>('/farms', {
    method: 'GET',
  });
}

/** GET /farms/${farmId}/central_panel/status/ */
export async function getFarmConnection(
  props: API.GetFarmConnectionParams,
  options?: { [key: string]: any },
) {
  return request<{
    data: API.GetFarmConnectionResponse;
  }>(`/farms/${props.id}/central_panel/status`, {
    method: 'GET',
  });
}
