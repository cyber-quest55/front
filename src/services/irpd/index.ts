// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

export async function getIrpds(props: API.GetIrpdParams, options?: { [key: string]: any }) {
  return request<{
    data: API.GetIrpdResponse;
  }>(`/v3/farms/${props.id}/irpds`, {
    method: 'GET',
  });
}

export async function getIrpdById(props: API.GetIrpdByIdParams, options?: { [key: string]: any }) {
  return request<{
    data: API.GetIrpdByIdResponse;
  }>(`/v3/farms/${props.farmId}/irpds/${props.irpdId}/`, {
    method: 'GET',
  });
}

export async function getIrpdHistory(
  props: API.GetIrpdHistoryParams,
  options?: { [key: string]: any },
) {
  return request<{
    data: API.GetIrpdHistoryResponse;
  }>(`/v3/farms/${props.farmId}/irpds/${props.irpdId}/history`, {
    method: 'GET',
    params: options,
  });
}

export async function getIrpdWaterConsumption(
  props: API.GetIrpdWaterConsumptionParams,
  options?: { [key: string]: any },
) {
  return request<API.GetIrpdWaterConsumptionResponse>(
    `/v4/farms/${props.farmId}/irpds/${props.irpdId}/water_consumption`,
    {
      method: 'GET',
      params: options,
    },
  );
}

export async function getIrpdEvents(
  props: API.GetIrpdEventsParams,
  options?: { [key: string]: any },
) {
  return request<{
    data: API.GetIrpdEventsResponse;
  }>(`/v3/reports/irpds/${props.irpdId}/irpd-list/`, {
    method: 'GET',
    params: options,
  });
}

export async function postIrpdConfig(
  props: API.PostIrpdConfigParams,
  options: APIModels.IrpdConfigPayload,
) {
  return request<{
    data: API.PostIrpdConfigResponse;
  }>(`/v3/farms/${props.farmId}/irpds/${props.irpdId}/configv5/`, {
    method: 'POST',
    data: options,
  });
}

export async function postIrpdConfigV4(
  props: API.PostIrpdConfigV4Params,
  options: APIModels.IrpdConfigPayloadV4,
) {
  return request<{
    data: API.PostIrpdConfigV4Response;
  }>(`/v3/farms/${props.farmId}/irpds/${props.irpdId}/config/`, {
    method: 'POST',
    data: options,
  });
}

export async function getEditIrpdDeviceTable(props: API.GetIrpdDevicesParams) {
  return request<{
    data: API.GetIrpdDevicesResponse;
  }>(`/v3/farms/${props.farmId}/irpds/devices`, {
    method: 'GET',
  });
}

export async function patchChangeIrpdRadio(props: API.PatchChangeIrpdRadioParams) {
  return request<{
    data: API.PatchChangeIrpdRadioResponse;
  }>(`/v3/farms/${props.farmId}/irpds/${props.irpdId}/swap/${props.irpdToSwapId}/`, {
    method: 'PATCH',
  });
}

export async function postChangeIrpdManualRadio(
  props: API.PostChangeIrpdManualRadioParams,
  options?: { radio_id: string },
) {
  return request<{
    data: API.PostChangeIrpdManualRadioResponse;
  }>(`/v3/farms/${props.farmId}/irpds/${props.irpdId}/edit_radio/`, {
    method: 'POST',
    data: options,
  });
}

export async function patchIrpd(props: API.PatchIrpdParams, options?: APIModels.IrpdPayload) {
  return request<{
    data: API.PatchIrpdResponse;
  }>(`/v3/farms/${props.farmId}/irpds/${props.irpdId}/`, {
    method: 'PATCH',
    data: options,
  });
}

export async function getEditIrpdHistory(
  props: API.GetEditIrpdHistoryParams,
  options?: { [key: string]: any },
) {
  return request<{
    data: API.GetIrpdHistoryResponse;
  }>(`/v3/farms/${props.farmId}/irpds/${props.irpdId}/configv5/`, {
    method: 'GET',
    params: options,
  });
}

export async function favoriteIrpdConfig(
  props: API.FavoriteIrpdConfigParams,
  options?: { [key: string]: any },
) {
  return request<{
    data: API.FavoriteIrpdConfigResponse;
  }>(`/v3/farms/${props.farmId}/irpds/${props.irpdId}/configv5/${props.configId}/`, {
    method: 'PATCH',
   data: options});
}

export async function createIrpd(
  props: API.CreateIrpdParams,
  options: APIModels.CreateIrpdPayload,
) {
  return request<{
    data: null;
  }>(`/farms/${props.farmId}/irpds/`, {
    method: 'POST',
    data: options,
  });
}
 
