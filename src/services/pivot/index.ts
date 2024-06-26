// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** GET /v3/farms/${farmId}/pivots/light */
export async function getPivots(data: API.GetPivotByFarmParam, options?: { [key: string]: any }) {
  return request<{
    data: API.GetPivotByFarmResponse;
  }>(`/v3/farms/${data.id}/pivots/light/`, {
    method: 'GET',
  });
}

/** GET /v3/farms/${farmId}/pivots/paginated */
export async function getPivotsWithInformations(
  data: API.GetPivotsInformationParam,
  options?: { [key: string]: any },
) {
  return request<{
    data: API.GetPivotsInformationResponse;
  }>(`/v3/farms/${data.id}/pivots/paginated/`, {
    method: 'GET',
  });
}

/** GET /v3/farms/${farmId}/pivots/${pivotId} */
export async function getPivotById(
  data: API.GetPivotByIdInformationParam,
  options?: { [key: string]: any },
) {
  return request<{
    data: API.GetPivotByIdInformationResponse;
  }>(`/v3/farms/${data.farmId}/pivots/${data.pivotId}/`, {
    method: 'GET',
  });
}

/** GET /v3/farms/${farmId}/history/device/ */
export async function getPivotHistory(
  props: API.GetPivotHistoryParams,
  options?: { [key: string]: any },
) {
  return request<{
    data: API.GetPivotHistoryResponse;
  }>(`/v3/farms/${props.farmId}/pivots/${props.deviceId}/history/`, {
    method: 'GET',
    params: options,
  });
}

/** GET /v3/farms/${farmId}/pivotReport/ */
export async function getPivotReports(
  props: API.GetPivotReportParams,
  options?: { [key: string]: any },
) {
  return request<{
    data: API.GetPivotByIdInformationResponse;
  }>(`/v4/reports/farms/${props.farmId}/pivots/${props.pivotId}/`, {
    method: 'GET',
    params: options,
  });
}

/** GET /v3/farms/${farmId}/pivots/${pivotId}/config/?pinned=false */
export async function getEditPivotHistory(
  props: API.GetEditPivotHistoryParams,
  options?: { [key: string]: any },
) {
  return request<{
    data: API.GetPivotHistoryResponse;
  }>(`/v3/farms/${props.farmId}/pivots/${props.pivotId}/config/`, {
    method: 'GET',
    params: options,
  });
}

/** GET /v3/farms/${farmId}/pivots/${pivotId}/list */
export async function getPivotListOperation(
  props: API.GetEditPivotHistoryParams,
  options?: { [key: string]: any },
) {
  return request<{
    data: API.GetPivotHistoryOperationResponse;
  }>(`/v3/reports/pivots/${props.pivotId}/list/`, {
    method: 'GET',
    params: options,
  });
}

/** GET /v3/farms/${farmId}/pivots/${pivotId}/list */
export async function getPivotListGpsStream(
  props: API.GetEditPivotHistoryParams,
  options?: { [key: string]: any },
) {
  return request<{
    data: API.GetPivotListGpsStreamResponse;
  }>(`/v3/reports/pivots/${props.pivotId}/list_gps_streams_v5/`, {
    method: 'GET',
    params: options,
  });
}

/** POST /v3/farms/${farmId}/pivots/${pivotId}/config/${configId} */
export async function favoritePivotConfig(
  props: API.FavoritePivotConfigParams,
  options?: { [key: string]: any },
) {
  return request<{
    data: API.FavoritePivotConfigResponse;
  }>(`/v3/farms/${props.farmId}/pivots/${props.pivotId}/config/${props.configId}/`, {
    method: 'PATCH',
    data: options,
  });
}

/** GET /v3/farms/${farmId}/pivots/${pivotId}/devices/control/ */
export async function getEditPivotDeviceControlTable(
  props: API.GetEditPivotHistoryParams,
  options?: { [key: string]: any },
) {
  return request<{
    data: API.GetPivotHistoryResponse;
  }>(`/v3/farms/${props.farmId}/pivots/${props.pivotId}/devices/control`, {
    method: 'GET',
    params: options,
  });
}

/** GET /v3/farms/${farmId}/pivots/${pivotId}/devices/monitor/ */
export async function getEditPivotDeviceMonitorTable(
  props: API.GetEditPivotHistoryParams,
  options?: { [key: string]: any },
) {
  return request<{
    data: API.GetPivotHistoryResponse;
  }>(`/v3/farms/${props.farmId}/pivots/${props.pivotId}/devices/monitor`, {
    method: 'GET',
    params: options,
  });
}

/** PATCH /v3/farms/${farmId}/pivots/${pivotId}/swap/${deviceId}/control/ */
export async function patchChangeControlRadio(props: any, options?: { radio_id: string }) {
  return request<{
    data: API.GetPivotHistoryResponse;
  }>(`/v3/farms/${props.farmId}/pivots/${props.pivotId}/swap/${props.deviceId}/control/`, {
    method: 'PATCH',
    params: options,
  });
}

/** PATCH /v3/farms/${farmId}/pivots/${pivotId}/${deviceId}/control/ */
export async function patchChangeControlManualRadio(props: any, options?: { [key: string]: any }) {
  return request<{
    data: any;
  }>(`/v3/farms/${props.farmId}/pivots/${props.pivotId}/control/`, {
    method: 'POST',
    data: options,
  });
}

/** PATCH /v3/farms/${farmId}/pivots/${pivotId}/swap/${deviceId}/monitor/ */
export async function patchChangeMonitorRadio(props: any, options?: { [key: string]: any }) {
  return request<{
    data: API.GetPivotHistoryResponse;
  }>(`/v3/farms/${props.farmId}/pivots/${props.pivotId}/swap/${props.deviceId}/monitor/`, {
    method: 'PATCH',
    params: options,
  });
}

/** POST /v3/farms/${farmId}/pivots/${pivotId}/device/${deviceId}/config/ */
export async function postPivotConfig(
  props: API.PostPivotConfigParams,
  options: APIModels.PostPivotConfig,
) {
  return request<{
    data: API.GetPivotHistoryResponse;
  }>(`/v3/farms/${props.farmId}/pivots/${props.pivotId}/device/${props.deviceId}/config/`, {
    method: 'POST',
    data: options,
  });
}

/** PATCH /v3/farms/${farmId}/pivots/${pivotId} */
export async function patchPivotGlobalConfig(props: API.GetEditPivotHistoryParams, options: any) {
  return request<{
    data: API.GetPivotHistoryResponse;
  }>(`/v3/farms/${props.farmId}/pivots/${props.pivotId}/`, {
    method: 'PATCH',
    data: options,
  });
}

export async function createPivot(
  props: API.CreatePivotParams,
  options: APIModels.CreatePivotPayload,
) {
  return request<{
    data: APIModels.PivotByIdInformation;
  }>(`/farms/${props.farmId}/pivots/`, {
    method: 'POST',
    data: options,
  });
}

export async function createPivotMonitor(
  props: API.CreatePivotMonitorParams,
  options: APIModels.CreatePivotMonitorPayload,
) {
  return request<{
    data: null;
  }>(`/farms/${props.farmId}/pivots/`, {
    method: 'POST',
    data: options,
  });
}

/**  /v3/farms/${farmID}/pivots/${pivotID}/device/${deviceID}/action/ */
export async function postSimpleIrrigation(
  props: { farmId: number; pivotId: number; deviceId: number },
  options: API.PostSimpleIrrigation,
) {
  return request<{
    data: API.GetPivotHistoryResponse;
  }>(`/v3/farms/${props.farmId}/pivots/${props.pivotId}/device/${props.deviceId}/action/`, {
    method: 'POST',
    data: options,
  });
}

export async function createLinearPivotMonitor(
  props: API.CreateLinearPivotMonitorParams,
  options: APIModels.CreateLinearPivotMonitorPayload,
) {
  return request<{
    data: null;
  }>(`/farms/${props.farmId}/pivots/`, {
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
    `/v3/farms/${props.farmId}/pivots/${props.pivotId}/controlleraction/simple/latest/`,
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
    `/v3/farms/${props.farmId}/pivots/${props.pivotId}/controlleraction/schedule/latest/`,
    {
      method: 'GET',
      params: options,
    },
  );
}

export async function getLastSegmentIrrigation(
  props: { farmId: number; pivotId: number },
  options: {},
) {
  return request<API.GetLastSegmentedIrrigation>(
    `/v3/farms/${props.farmId}/pivots/${props.pivotId}/controlleraction/segment/latest/`,
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
  return request<API.GetLastSimpleIrrigation>(
    `/v3/reports/pivots/${props.pivotId}/pressure_chart/`,
    {
      method: 'GET',
      params: options,
    },
  );
}

export async function patchPivotMaintnanceMode(
  props: { farmId: number; pivotId: number },
  options: {
    maintenance: boolean;
  },
) {
  return request<{}>(`/v3/farms/${props.farmId}/pivots/${props.pivotId}/maintenance/`, {
    method: 'PATCH',
    data: options,
  });
}

export async function getPivotMaintnanceMode(
  props: { farmId: number; pivotId: number },
  options: {},
) {
  return request<{ maintenance: boolean }>(
    `/v3/farms/${props.farmId}/pivots/${props.pivotId}/maintenance/`,
    {
      method: 'GET',
      data: options,
    },
  );
}

export async function getDeviceIsOnline(props: { deviceId: number }, options: {}) {
  return request<{ is_online: boolean }>(`/v3/devices/${props.deviceId}/is-online/`, {
    method: 'GET',
    data: options,
  });
}

export async function stopPivot(props: { farmId: number; pivotId: number }, options: {}) {
  return request<{ maintenance: boolean }>(
    `/v3/farms/${props.farmId}/pivots/${props.pivotId}/actions/stop/`,
    {
      method: 'Post',
      data: options,
    },
  );
}

export async function getPivotWaterConsumptionBySegment(props: { pivotId: number }, options: {}) {
  return request<API.GetWaterBySegment>(
    `/v3/reports/pivots/${props.pivotId}/pivot_water_consumption_by_segment/`,
    {
      method: 'GET',
    },
  );
}

export async function getPivotExcelReport(
  props: { pivotId: number },
  options: {
    date_start: string;
    date_end: string;
    kwh_value_p: number;
    kwh_value_hfp: number;
    kwh_value_r: number;
  },
) {
  return request<any>(`/v3/reports/pivots/${props.pivotId}/excel/`, {
    method: 'GET',
    params: options,
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // Tipo de conteúdo do Excel
    },
    responseType: 'blob'
  });
}




export async function getPivotUnspectedStops(props: { farmId: number, pivotId: number; }, options: { start_date: string, end_date: string }) {
  return request<{message: string, data: any[]}>(
    `/v4/reports/farms/${props.farmId}/pivots/${props.pivotId}/unexpected_stops`,
    {
      method: 'GET',
      params: options
    },
  );
}
