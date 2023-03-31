// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** GET /farms */
export async function getFarms(options?: { [key: string]: any }) {
  return request<{
    data: API.gerFarmsResponse;
  }>('/farms', {
    method: 'GET',
    ...(options || {}),
  });
}

/** GET /farms/${farmId}/central_panel/status/ */
export async function getFarmConnection(props: API.getFarmConnectionParams, options?: { [key: string]: any }) {
  return request<{
    data: API.gerFarmsResponse;
  }>(`/farms/${props.id}/central_panel/status`, {
    method: 'GET',
    ...(options || {}),
  });
}
