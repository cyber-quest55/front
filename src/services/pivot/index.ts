// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** GET /farms/${pivotId}/pivots/light */
export async function getPivotById(id: string, options?: { [key: string]: any }) {
  return request<{
    data: API.gerFarmsResponse;
  }>(`farms/${id}/pivots/light/`, {
    method: 'GET',
    ...(options || {}),
  });
}
