// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

 
export async function getIrpds(props: API.GetIrpdParams, options?: { [key: string]: any }) {
  return request<{
    data: API.GetIrpdResponse;
  }>(`/farms/${props.id}/irpd`, {
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

export async function getIrpdHistory(props: API.GetIrpdHistoryParams, options?: { [key: string]: any }) {
  return request<{
    data: Models.IrpdHistory;
  }>(`/farms/${props.farmId}/irpds/${props.irpdId}/`, {
    method: 'GET', 
  });
}

export async function getIrpdWaterConsumption(props: API.GetIrpdWaterConsumptionParams, options?: { [key: string]: any }) {
  return request<{
    data: Models.IrpdWaterConsumption[];
  }>(`/farms/${props.farmId}/irpds/${props.irpdId}/`, {
    method: 'GET', 
  });
}

export async function getIrpdTable(props: API.GetIrpdTableParams, options?: { [key: string]: any }) {
  return request<{
    data: Models.IrpdTable;
  }>(`/farms/${props.farmId}/irpds/${props.irpdId}/`, {
    method: 'GET', 
  });
}

