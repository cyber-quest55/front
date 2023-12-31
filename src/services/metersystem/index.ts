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
  }>(
    `/farms/${props.farmId}/metersystems/${props.meterId}/meter/${props.otherId}/lake-level/?date_start=2023-7-16&date_end=2023-8-16`,
    {
      method: 'GET',
    },
  );
}

export async function getMeterSystemTable(
  props: API.GetMeterSystemTableParams,
  options?: { [key: string]: any },
) {
  return request<{
    data: API.GetMeterSystemTableResponse;
  }>(
    `/farms/${props.farmId}/metersystems/${props.meterId}/meter/${props.otherId}/water-level-history/`,
    {
      method: 'GET',
    },
  );
}

export async function getMeterSystemSensors() {
  return request<{
    data: any;
  }>(`/sensors/`, {
    method: 'GET',
  });
}

export async function postMeterSystemConfig(
  props: API.PostMeterSystemConfigParams,
  options: APIModels.PostMeterSystemConfig,
) {
  return request<{
    data: any;
  }>(
    `/farms/${props.farmId}/metersystems/${props.meterSystemId}/meter/${props.iMeterId}/config/standard/`,
    {
      method: 'POST',
      data: options,
    },
  );
}

export async function patchIMeter(
  props: API.PatchIMeterParams,
  options: APIModels.PatchIMeter,
) {
  return request<{
    data: any;
  }>(
    `/farms/${props.farmId}/metersystems/${props.meterSystemId}/meter/${props.iMeterId}/`,
    {
      method: 'PATCH',
      data: options,
    },
  );
}

export async function patchMeterSystem(
  props: API.PatchMeterSystemParams,
  options: APIModels.PatchMeterSystem,
) {
  return request<{
    data: any;
  }>(
    `/farms/${props.farmId}/metersystems/${props.meterSystemId}/`,
    {
      method: 'PATCH',
      data: options,
    },
  );
}

export async function getEditMeterDeviceIManageTable(
  props: API.GetMeterDevicesParams,
  options?: { [key: string]: any },
) {
  return request<{
    data: API.GetMeterDevicesResponse;
  }>(`/farms/${props.farmId}/metersystems/${props.meterSystemId}/meter/devices`, {
    method: 'GET',
    params: options,
  });
}

export async function patchChangeIManageRadio(
  props: any,
  options?: { radio_id: string },
) {
  return request<{
    data: any;
  }>(`/farms/${props.farmId}/metersystems/${props.meterSystemId}/meter/${props.meterId}/swap/${props.newMeterId}/`, {
    method: 'PATCH',
    data: options,
  });
}

export async function patchChangeIManageManualRadio(
  props: any,
  options?: { radio_id: string },
) {
  return request<{
    data: any;
  }>(`/farms/${props.farmId}/metersystems/${props.meterSystemId}/meter/${props.meterId}/edit_radio/`, {
    method: 'POST',
    data: options,
  });
}