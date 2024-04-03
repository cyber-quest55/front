// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** GET /farms */
export async function getFarms() {
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

export async function pingFarmDevices(options: API.PingFarmDevicesParams) {
  return request<number>(`/v3/farms/${options.id}/mqtt/gn/`, {
    method: 'POST',
    data: options.body,
  })
}

export async function enablePivotReports(options: API.GetFarmFullParams) {
  return request<string>(`/v3/reports/farms/${options.id}/pivot-enable/`, {
    method: 'POST'
  });
}

export async function enableIrpdReports(options: API.GetFarmFullParams) {
  return request<string>(`/v3/reports/farms/${options.id}/irpd-enable/`, {
    method: 'POST'
  });
}

export async function recalculatePivotReports(options: API.GetFarmFullParams) {
  return request<string>(`/v3/reports/farms/${options.id}/pivot-recalculate/`, {
    method: 'POST'
  });
}

export async function recalculateIrpdReports(options: API.GetFarmFullParams) {
  return request<string>(`/v3/reports/farms/${options.id}/irpd-recalculate/`, {
    method: 'POST'
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

