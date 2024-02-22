// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** GET /farms */
export async function getFarms(options?: API.GetFarmsParams) {
  return request<{
    data: API.GetFarmResponse;
  }>('/v3/farms', {
    method: 'GET',
  });
}

export async function getFarmById(props: API.GetFarmFullParams) {
  return request<API.GetFarmFullResponse>(`/v3/farms/${props.id}/`, {
    method: 'GET',
  });
}

/** GET /v3/farms/${farmId}/central_panel/status/ */
export async function getFarmConnection(
  props: API.GetFarmConnectionParams,
  options?: { [key: string]: any },
) {
  return request<{
    data: API.GetFarmConnectionResponse;
  }>(`/v3/farms/${props.id}/central_panel/status`, {
    method: 'GET',
  });
}

export async function createFarm(
  props: {},
  body?: { [key: string]: any },
) {
  return request<{
    data: API.GetFarmConnectionResponse;
  }>(`/v3/farms`, {
    method: 'POST',
    data: body
  });
}

