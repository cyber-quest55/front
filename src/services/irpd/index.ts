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
    params: options,
  });
}

export async function getIrpdEvents(
  props: API.GetIrpdEventsParams,
  options?: { [key: string]: any },
) {
  console.log("options", options)
  return request<{
    data: API.GetIrpdEventsResponse;
  }>(`/reports/irpds/${props.irpdId}/irpd-list/`, {
    method: 'GET',
    params: options

  });
}

export async function patchIrpdConfig(
  props: API.PatchIrpdConfigParams,
  options: APIModels.IrpdConfigPayload,
) {
  return request<{
    data: API.PatchIrpdConfigResponse;

  }>(`/farms/${props.farmId}/irpds/${props.irpdId}/configv5/`, {
    method: 'POST',
    data: options,
  });
}

export async function getEditIrpdDeviceTable(props: API.GetIrpdDevicesParams) {
  return request<{
    data: API.GetIrpdDevicesResponse;
  }>(`/farms/${props.farmId}/irpds/devices`, {
    method: 'GET',
  });
}

export async function patchChangeIrpdRadio(props: API.PatchChangeIrpdRadioParams) {
  return request<{
    data: API.PatchChangeIrpdRadioResponse;
  }>(`/farms/${props.farmId}/irpds/${props.irpdId}/swap/${props.irpdToSwapId}/`, {
    method: 'PATCH',
  });
}

export async function postChangeIrpdManualRadio(
  props: API.PostChangeIrpdManualRadioParams,
  options?: { radio_id: string },
) {
  return request<{
    data: API.PostChangeIrpdManualRadioResponse;
  }>(`/farms/${props.farmId}/irpds/${props.irpdId}/edit_radio/`, {
    method: 'POST',
    data: options,
  });
}

export async function patchIrpd(
  props: API.PatchIrpdParams,
  options?: APIModels.IrpdPayload,
) {
  return request<{
    data: API.PatchIrpdResponse;
  }>(`/farms/${props.farmId}/irpds/${props.irpdId}/`, {
    method: 'PATCH',
    data: options,
  });
}