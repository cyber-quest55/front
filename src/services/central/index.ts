// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** GET /farms/${farmId}/ */
export async function getCentral(props: API.GetCentralParams, options?: { [key: string]: any }) {
  return request<{
    data: API.GetCentralResponse;
  }>(`/farms/${props.id}/central`, {
    method: 'GET',
  });
}
