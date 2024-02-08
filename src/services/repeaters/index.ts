// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** GET /v3/farms/${farmId}/repeaters/ */
export async function getRepeaters(props: API.GetRepeaterParams, options?: { [key: string]: any }) {
  return request<{
    data: API.GetFarmResponse;
  }>(`/v3/farms/${props.id}/repeaters`, {
    method: 'GET',
  });
}

export async function getRepeaterById(props: API.GetRepeaterByIdParams) {
  return request<{
    data: API.GetRepeaterByIdResponse;
  }>(`/v3/farms/${props.farmId}/repeaters/${props.repeaterId}/`, {
    method: 'GET',
  });
}

export async function patchRepeaterConfig(
  props: API.PatchRepeaterConfigParams,
  options: APIModels.RepeaterConfig,
) {
  return request<{
    data: API.PatchRepeaterConfigResponse;
  }>(`/v3/farms/${props.farmId}/repeaters/${props.repeaterId}/`, {
    method: 'PATCH',
    data: options,
  });
}

export async function getEditRepeaterDeviceTable(props: API.GetRepeaterDevicesParams) {
  return request<{
    data: API.GetMeterDevicesResponse;
  }>(`/v3/farms/${props.farmId}/repeaters/devices`, {
    method: 'GET',
  });
}

export async function patchChangeRepeaterRadio(props: API.PatchChangeRepeaterRadioParams) {
  return request<{
    data: API.PatchChangeRepeaterRadioResponse;
  }>(`/v3/farms/${props.farmId}/repeaters/${props.repeaterId}/swap/${props.repeaterToSwapId}/`, {
    method: 'PATCH',
  });
}

export async function postChangeRepeaterManualRadio(
  props: API.PostChangeRepeaterManualRadioParams,
  options?: { radio_id: string },
) {
  return request<{
    data: API.PostChangeRepeaterManualRadioResponse;
  }>(`/v3/farms/${props.farmId}/repeaters/${props.repeaterId}/edit_radio/`, {
    method: 'POST',
    data: options,
  });
}
