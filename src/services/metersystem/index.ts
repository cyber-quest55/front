// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

export async function getMeterSystem(
  props: API.GetMeterSystemParams,
  options?: { [key: string]: any },
) {
  return request<{
    data: API.GetMeterSystemResponse;
  }>(`/farms/${props.id}/metersystems`, {
    method: 'GET',
  });
}

export async function getMeterSystemById(props: API.GetMeterSystemByIdParams) {
  return request<{
    data: API.GetMeterSystemByIdResponse;
  }>(`/farms/${props.farmId}/metersystems/${props.meterId}/`, {
    method: 'GET',
  });
}

export async function getMeterSystemHistory(
  props: API.GetMeterSystemHistoryParams,
  options?: { [key: string]: any },
) {
  return request<{
    data: API.GetMeterSystemHistoryResponse;
  }>(`/farms/${props.farmId}/metersystems/${props.meterId}/history`, {
    method: 'GET',
  });
}

export async function getMeterSystemWaterLevel(
  props: API.GetMeterSystemWaterLevelParams,
  options?: { [key: string]: any },
) {
  return request<{
    data: API.GetMeterSystemWaterLevelResponse;
  }>(`/farms/${props.farmId}/metersystems/${props.meterId}/lake-level/`, {
    method: 'GET',
  });
}

export async function getMeterSystemTable(
  props: API.GetMeterSystemTableParams,
  options?: { [key: string]: any },
) {
  return request<{
    data: API.GetMeterSystemTableResponse;
  }>(`/farms/${props.farmId}/metersystems/${props.meterId}/water-level-history/`, {
    method: 'GET',
  });
}
