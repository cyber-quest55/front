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

export async function getRepeaterById(props: API.GetRepeaterByIdParams) {
  return request<{
    data: API.GetRepeaterByIdResponse;
  }>(`/farms/${props.farmId}/repeaters/${props.repeaterId}/`, {
    method: 'GET',
  });
}

export async function patchRepeaterConfig(
  props: API.PatchRepeaterConfigParams,
  options: APIModels.RepeaterConfig,
) {
  return request<{
    data: API.PatchRepeaterConfigResponse;
  }>(`/farms/${props.farmId}/repeaters/${props.repeaterId}/`, {
    method: 'PATCH',
    data: options,
  });
}

export async function getEditRepeaterDeviceTable(props: API.GetRepeaterDevicesParams) {
  return request<{
    data: API.GetMeterDevicesResponse;
  }>(`/farms/${props.farmId}/repeaters/devices`, {
    method: 'GET',
  });
}

export async function patchChangeRepeaterRadio(props: API.PatchChangeRepeaterRadioParams) {
  return request<{
    data: API.PatchChangeRepeaterRadioResponse;
  }>(`/farms/${props.farmId}/repeaters/${props.repeaterId}/swap/${props.repeaterToSwapId}/`, {
    method: 'PATCH',
  });
}

export async function postChangeRepeaterManualRadio(
  props: API.PostChangeRepeaterManualRadioParams,
  options?: { radio_id: string },
) {
  return request<{
    data: API.PostChangeRepeaterManualRadioResponse;
  }>(`/farms/${props.farmId}/repeaters/${props.repeaterId}/edit_radio/`, {
    method: 'POST',
    data: options,
  });
}

export async function createRepeater(
  props: API.CreateRepeaterParams,
  options: APIModels.CreateRepeaterPayload,
) {
  return request<{
    data: null;
  }>(`/farms/${props.farmId}/repeaters/`, {
    method: 'POST',
    data: options,
  });
}