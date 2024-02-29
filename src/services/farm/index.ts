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

export async function updatedBase(
  props: {
    id: string,
  },
  body?: {
    equipment_id: number,
    radio_id: string
  },
)  {
  return request<{ data: any }>(`/v3/farms/${props.id}/base/`, {
    method: 'POST',
    data: body
  });
}

export async function updateFarm(options: API.UpdateFarmParams) {
  return request<API.GetFarmFullResponse>(`/v3/farms/${options.id}/`, {
    method: 'PATCH',
    data: options.body,
  });
}

export async function getFarmById(props: API.GetFarmFullParams) {
  return request<API.GetFarmFullResponse>(`/v3/farms/${props.id}/`, {
    method: 'GET',
  });
}

export async function saveFarmUsers(props: API.SaveFarmUsersParams) {
  return request<API.SaveFarmUsersResponse>(`/v3/farms/${props.id}/users/`, {
    method: 'POST',
    data: props.body,
  });
}


export async function getFarmUsers(props: API.GetFarmFullParams) {
  return request<API.GetFarmUsersResponse>(`/v3/farms/${props.id}/users/`, {
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

