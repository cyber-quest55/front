// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** GET /farms/${farmId}/pivots/light */
export async function getPivots(data: API.GetPivotByFarmParam, options?: { [key: string]: any }) {
  return request<{
    data: API.GetPivotByFarmResponse;
  }>(`farms/${data.id}/pivots/light/`, {
    method: 'GET',
    ...(options || {}),
  });
}

export async function getPivotsWithInformations(data: API.GetPivotInformationParam, options?: { [key: string]: any }) {
  return request<{
    data: API.GetPivotByFarmResponse;
  }>(`farms/${data.id}/pivots/paginated/`, {
    method: 'GET',
    ...(options || {}),
  });
}
