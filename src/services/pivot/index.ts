// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** GET /farms/${farmId}/pivots/light */
export async function getPivots(data: API.GetPivotByFarmParam, options?: { [key: string]: any }) {
  return request<{
    data: API.GetPivotByFarmResponse;
  }>(`/farms/${data.id}/pivots/light/`, {
    method: 'GET',
  });
}

/** GET /farms/${farmId}/pivots/paginated */
export async function getPivotsWithInformations(
  data: API.GetPivotsInformationParam,
  options?: { [key: string]: any },
) {
  return request<{
    data: API.GetPivotsInformationResponse;
  }>(`farms/${data.id}/pivots/paginated/`, {
    method: 'GET',
  });
}

/** GET /farms/${farmId}/pivots/${pivotId} */
export async function getPivotById(
  data: API.GetPivotByIdInformationParam,
  options?: { [key: string]: any },
) {
  return request<{
    data: API.GetPivotByIdInformationResponse;
  }>(`farms/${data.farmId}/pivots/${data.pivotId}/`, {
    method: 'GET',
  });
}

/** GET /farms/${farmId}/history/device/ */
export async function getPivotHistory(
  props: API.GetPivotHistoryParams,
  options?: { [key: string]: any },
) {
  return request<{
    data: API.GetPivotHistoryResponse;
  }>(`/farms/${props.farmId}/pivots/${props.pivotId}/history/`, {
    method: 'GET',
    params: options,
  });
}

/** GET /farms/${farmId}/pivotReport/ */
export async function getPivotReports(
  props: API.GetPivotReportParams,
  options?: { [key: string]: any },
) {
  return request<{
    data: API.GetPivotByIdInformationResponse;
  }>(`/farms/${props.farmId}/pivots/${props.pivotId}/report/`, {
    method: 'GET',
    params: options,
  });
}

/** GET /farms/${farmId}/pivots/${pivotId}/config/?pinned=false */
export async function getEditPivotHistory(
  props: API.GetEditPivotHistoryParams,
  options?: { [key: string]: any },
) {
  return request<{
    data: API.GetPivotHistoryResponse;
  }>(`/farms/${props.farmId}/pivots/${props.pivotId}/config/`, {
    method: 'GET',
    params: options,
  });
}

/** GET /farms/${farmId}/pivots/${pivotId}/list */
export async function getPivotListOperation(
  props: API.GetEditPivotHistoryParams,
  options?: { [key: string]: any },
) {
  return request<{
    data: API.GetPivotHistoryOperationResponse;
  }>(`/reports/pivots/${props.pivotId}/list/`, {
    method: 'GET',
    params: options,
  });
}

/** GET /farms/${farmId}/pivots/${pivotId}/list */
export async function getPivotListGpsStream(
  props: API.GetEditPivotHistoryParams,
  options?: { [key: string]: any },
) {
  return request<{
    data: API.GetPivotListGpsStreamResponse;
  }>(`/reports/pivots/${props.pivotId}/list_gps_streams_v5/`, {
    method: 'GET',
    params: options,
  });
}

/** POST /farms/${farmId}/pivots/${pivotId}/config/${configId} */
export async function favoritePivotConfig(
  props: API.FavoritePivotConfigParams,
  options?: { [key: string]: any },
) {
  return request<{
    data: API.FavoritePivotConfigResponse;
  }>(`/farms/${props.farmId}/pivots/${props.pivotId}/config/${props.configId}/`, {
    method: 'PATCH',
    data: options,
  });
}

/** GET /farms/${farmId}/pivots/${pivotId}/devices/control/ */
export async function getEditPivotDeviceControlTable(
  props: API.GetEditPivotHistoryParams,
  options?: { [key: string]: any },
) {
  return request<{
    data: API.GetPivotHistoryResponse;
  }>(`/farms/${props.farmId}/pivots/${props.pivotId}/devices/control`, {
    method: 'GET',
    params: options,
  });
}

/** GET /farms/${farmId}/pivots/${pivotId}/devices/monitor/ */
export async function getEditPivotDeviceMonitorTable(
  props: API.GetEditPivotHistoryParams,
  options?: { [key: string]: any },
) {
  return request<{
    data: API.GetPivotHistoryResponse;
  }>(`/farms/${props.farmId}/pivots/${props.pivotId}/devices/monitor`, {
    method: 'GET',
    params: options,
  });
}

/** PATCH /farms/${farmId}/pivots/${pivotId}/swap/${deviceId}/control/ */
export async function patchChangeControlRadio(props: any, options?: { radio_id: string }) {
  return request<{
    data: API.GetPivotHistoryResponse;
  }>(`/farms/${props.farmId}/pivots/${props.pivotId}/swap/${props.deviceId}/control/`, {
    method: 'PATCH',
    params: options,
  });
}

/** PATCH /farms/${farmId}/pivots/${pivotId}/${deviceId}/control/ */
export async function patchChangeControlManualRadio(props: any, options?: { [key: string]: any }) {
  return request<{
    data: any;
  }>(`/farms/${props.farmId}/pivots/${props.pivotId}/control/`, {
    method: 'POST',
    data: options,
  });
}

/** PATCH /farms/${farmId}/pivots/${pivotId}/swap/${deviceId}/monitor/ */
export async function patchChangeMonitorRadio(props: any, options?: { [key: string]: any }) {
  return request<{
    data: API.GetPivotHistoryResponse;
  }>(`/farms/${props.farmId}/pivots/${props.pivotId}/swap/${props.deviceId}/monitor/`, {
    method: 'PATCH',
    params: options,
  });
}

/** POST /farms/${farmId}/pivots/${pivotId}/device/${deviceId}/config/ */
export async function postPivotConfig(
  props: API.PostPivotConfigParams,
  options: APIModels.PostPivotConfig,
) {
  return request<{
    data: API.GetPivotHistoryResponse;
  }>(`/farms/${props.farmId}/pivots/${props.pivotId}/device/${props.deviceId}/config/`, {
    method: 'POST',
    data: options,
  });
}

/** PATCH /farms/${farmId}/pivots/${pivotId} */
export async function patchPivotGlobalConfig(props: API.GetEditPivotHistoryParams, options: any) {
  return request<{
    data: API.GetPivotHistoryResponse;
  }>(`/farms/${props.farmId}/pivots/${props.pivotId}/`, {
    method: 'PATCH',
    data: options,
  });
}

/**  /farms/${farmID}/pivots/${pivotID}/device/${deviceID}/action/ */
export async function postSimpleIrrigation(
  props: { farmId: number; pivotId: number; deviceId: number },
  options: API.PostSimpleIrrigation,
) {
  return request<{
    data: API.GetPivotHistoryResponse;
  }>(`/farms/${props.farmId}/pivots/${props.pivotId}/device/${props.deviceId}/action/`, {
    method: 'POST',
    data: options,
  });
}

/**  /farms/${farmID}/pivots/${pivotID}/device/${deviceID}/action/ */
export async function getEstimatedTime(props: {}, options: API.GetEstimatedTimeParams) {
  return request<API.GetEstimatedTimeResponse>(`/estimated-time/`, {
    method: 'GET',
    params: options,
  });
}

export async function getLastSimpleIrrigation(
  props: { farmId: number; pivotId: number },
  options: {},
) {
  return request<API.GetLastSimpleIrrigation>(
    `/farms/${props.farmId}/pivots/${props.pivotId}/controlleraction/simple/latest/`,
    {
      method: 'GET',
      params: options,
    },
  );
}

export async function getLastScheduleIrrigation(
  props: { farmId: number; pivotId: number },
  options: {},
) {
  return request<API.GetLastScheduleIrrigation>(
    `/farms/${props.farmId}/pivots/${props.pivotId}/controlleraction/schedule/latest/`,
    {
      method: 'GET',
      params: options,
    },
  );
}

export async function getPressureComparison(
  props: { pivotId: number },
  options: {
    comparison_start_date: string;
    comparison_end_date: string;
    current_start_date: string;
    current_end_date: string;
  },
) {
  return request<API.GetLastSimpleIrrigation>(`/reports/pivots/${props.pivotId}/pressure_chart/`, {
    method: 'GET',
    params: options,
  });
}

export async function patchPivotMaintnanceMode(
  props: { farmId: number; pivotId: number },
  options: {
    maintenance: boolean;
  },
) {
  return request<{}>(`/farms/${props.farmId}/pivots/${props.pivotId}/maintenance/`, {
    method: 'PATCH',
    data: options,
  });
}

export async function getPivotMaintnanceMode(
  props: { farmId: number; pivotId: number },
  options: {},
) {
  return request<{ maintenance: boolean }>(
    `/farms/${props.farmId}/pivots/${props.pivotId}/maintenance/`,
    {
      method: 'GET',
      data: options,
    },
  );
}

export async function stopPivot(props: { farmId: number; pivotId: number }, options: {}) {
  return request<{ maintenance: boolean }>(
    `/farms/${props.farmId}/pivots/${props.pivotId}/actions/stop/`,
    {
      method: 'Post',
      data: options,
    },
  );
}
