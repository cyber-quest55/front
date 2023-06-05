// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** GET /farms/${farmId}/pivots/light */
export async function getPivots(data: API.GetPivotByFarmParam, options?: { [key: string]: any }) {
  return request<{
    data: API.GetPivotByFarmResponse;
  }>(`${data.id}/pivots/light/`, {
    method: 'GET', 
  });
}
/** GET /farms/${farmId}/pivots/paginated */
export async function getPivotsWithInformations(data: API.GetPivotsInformationParam, options?: { [key: string]: any }) {
  return request<{
    data: API.GetPivotsInformationResponse;
  }>(`${data.id}/pivots/paginated/`, {
    method: 'GET', 
  });
}
/** GET /farms/${farmId}/pivots/${pivotId} */
export async function getPivotById(data: API.GetPivotByIdInformationParam, options?: { [key: string]: any }) {
  return request<{
    data: API.GetPivotByIdInformationResponse;
  }>(`${data.farmId}/pivots/${data.pivotId}/`, {
    method: 'GET', 
  });
}

