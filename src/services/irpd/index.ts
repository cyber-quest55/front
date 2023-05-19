// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

 
/** GET /farms/${farmId}/irpdsystems/ */
export async function getIrpds(props: API.GetIrpdParams, options?: { [key: string]: any }) {
  return request<{
    data: API.GetFarmResponse;
  }>(`/farms/${props.id}/irpd`, {
    method: 'GET', 
  });
}
