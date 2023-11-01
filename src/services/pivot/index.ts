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
    data: API.GetPivotsInformationResponse;
  }>(`/farms/${props.farmId}/pivots/${props.pivotId}/history/`, {
    method: 'GET',
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

/** POST /farms/${farmId}/pivots/${pivotId}/config/${configId} */
export async function favoritePivotConfig(
  props: API.FavoritePivotConfigParams,
  options?: { [key: string]: any },
) {

  return request<{
    data: API.FavoritePivotConfigResponse;
  }>(`/farms/${props.farmId}/pivots/${props.pivotId}/config/${props.configId}`, {
    method: 'PATCH',
   data: options});
}
