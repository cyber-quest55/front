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
    params: options
  },);
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

/** POST /farms/${farmId}/pivots/${pivotId}/config/${configId} */
export async function favoritePivotConfig(
  props: API.FavoritePivotConfigParams,
  options?: { [key: string]: any },
) {

  return request<{
    data: API.FavoritePivotConfigResponse;
  }>(`/farms/${props.farmId}/pivots/${props.pivotId}/config/${props.configId}/`, {
    method: 'PATCH',
   data: options});
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
export async function patchChangeControlRadio(
  props: any,
  options?: { radio_id: string },
) {
  return request<{
    data: API.GetPivotHistoryResponse;
  }>(`/farms/${props.farmId}/pivots/${props.pivotId}/swap/${props.deviceId}/control/`, {
    method: 'PATCH',
    params: options,
  });
}

/** PATCH /farms/${farmId}/pivots/${pivotId}/${deviceId}/control/ */
export async function patchChangeControlManualRadio(
  props: any,
  options?: { [key: string]: any },
) {
  return request<{
    data: any;
  }>(`/farms/${props.farmId}/pivots/${props.pivotId}/control/`, {
    method: 'POST',
    data: options,
  });
}

/** PATCH /farms/${farmId}/pivots/${pivotId}/swap/${deviceId}/monitor/ */
export async function patchChangeMonitorRadio(
  props: any,
  options?: { [key: string]: any },
) {
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
export async function patchPivotGlobalConfig(
  props: API.GetEditPivotHistoryParams,
  options: any,
) {
  return request<{
    data: API.GetPivotHistoryResponse;
  }>(`/farms/${props.farmId}/pivots/${props.pivotId}/`, {
    method: 'PATCH',
    data: options,
  });
}