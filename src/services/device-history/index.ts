// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

 
/** GET /farms/${farmId}/history/device/ */
export async function getDeviceHistory(props: API.GetDeviceHistoryParams, options?: { [key: string]: any }) {
  return request<{
    data: API.GetFarmResponse;
  }>(`/farms/${props.id}/history/device`, {
    method: 'GET', 
  });
}
