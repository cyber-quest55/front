// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** GET /farms/${farmId}/repeaters/ */
export async function getRepeaters(props: API.GetRepeaterParams, options?: { [key: string]: any }) {
  return request<{
    data: API.GetFarmResponse;
  }>(`/farms/${props.id}/repeaters`, {
    method: 'GET',
  });
}
