// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** GET /farms/${farmId}/ */
export async function getCentral(props: API.GetIrpdParams, options?: { [key: string]: any }) {
  return request<{
    data: API.GetFarmResponse;
  }>(`/farms/${props.id}/central`, {
    method: 'GET',
  });
}
