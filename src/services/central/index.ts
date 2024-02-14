// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** GET /v3/farms/${farmId}/ */
export async function getCentral(props: API.GetCentralParams, options?: { [key: string]: any }) {
  return request<{
    data: API.GetCentralResponse;
  }>(`/v3/farms/${props.id}/central`, {
    method: 'GET',
  });
}
