// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

 
/** GET /farms/${farmId}/metersystems/ */
export async function getMeterSystem(props: API.GetMeterSystemParams, options?: { [key: string]: any }) {
  return request<{
    data: API.GetFarmResponse;
  }>(`/farms/${props.id}/metersystems`, {
    method: 'GET', 
  });
}
