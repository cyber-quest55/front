// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

export async function getIrpds(props: API.GetIrpdParams, options?: { [key: string]: any }) {
  return request<{
    data: API.GetIrpdResponse;
  }>(`/farms/${props.id}/irpds`, {
    method: 'GET',
  });
}

export async function getIrpdById(props: API.GetIrpdByIdParams, options?: { [key: string]: any }) {
  return request<{
    data: API.GetIrpdByIdResponse;
  }>(`/farms/${props.farmId}/irpds/${props.irpdId}/`, {
    method: 'GET',
  });
}

export async function getIrpdHistory(
  props: API.GetIrpdHistoryParams,
  options?: { [key: string]: any },
) {
  return request<{
    data: API.GetIrpdHistoryResponse;
  }>(`/farms/${props.farmId}/irpds/${props.irpdId}/history`, {
    method: 'GET',
    params: options,
  });
}

export async function getIrpdWaterConsumption(
  props: API.GetIrpdWaterConsumptionParams,
  options?: { [key: string]: any },
) {
  return request<{
    data: API.GetIrpdWaterConsumptionResponse;
  }>(`/farms/${props.farmId}/irpds/${props.irpdId}/water-consumption/${props.waterId}/`, {
    method: 'GET',
  });
}

export async function getIrpdEvents(
  props: API.GetIrpdEventsParams,
  options?: { [key: string]: any },
) {
  return request<{
    data: API.GetIrpdEventsResponse;
  }>(`/farms/${props.farmId}/irpds/${props.irpdId}/irpd-list`, {
    method: 'GET',
  });
}
