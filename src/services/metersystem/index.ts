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

export async function getMeterSystemHistory(
  props: API.GetMeterSystemHistoryParams,
  options?: { [key: string]: any },
) {
  return request<{
    data: Models.MeterSystemHistory;
  }>(`/farms/${props.farmId}/meter/${props.meterId}/history`, {
    method: 'GET',
  });
}

export async function getMeterSystemWaterLevel(
  props: API.GetMeterSystemWaterLevelParams,
  options?: { [key: string]: any },
) {
  return request<{
    data: Models.MeterSystemWaterLevel;
  }>(`/farms/${props.farmId}/meter/${props.meterId}/lake-level/`, {
    method: 'GET',
  });
}

export async function getMeterSystemTable(
  props: API.GetMeterSystemTableParams,
  options?: { [key: string]: any },
) {
  return request<{
    data: Models.MeterSystemTable;
  }>(`/farms/${props.farmId}/meter/${props.meterId}/water-level-history/`, {
    method: 'GET',
  });
}

export async function getMeterSystemById(
  props: API.GetMeterSystemByIdParams,
  options?: { [key: string]: any },
) {
  return request<{
    data: Models.MeterSystem;
  }>(`/farms/${props.farmId}/metersystems/${props.meterId}`, {
    method: 'GET',
  });
}
