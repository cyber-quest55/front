// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

export async function getMeterSystem(
  props: API.GetMeterSystemParams,
  options?: { [key: string]: any },
) {
  return request<{
    data: API.GetMeterSystemResponse;
  }>(`/v3/farms/${props.id}/metersystems`, {
    method: 'GET',
  });
}

export async function getMeterSystemById(props: API.GetMeterSystemByIdParams) {
  return request<{
    data: API.GetMeterSystemByIdResponse;
  }>(`/v3/farms/${props.farmId}/metersystems/${props.meterId}/`, {
    method: 'GET',
  });
}

export async function getMeterSystemHistory(
  props: API.GetMeterSystemHistoryParams,
  options?: { [key: string]: any },
) {
  return request<{
    data: API.GetMeterSystemHistoryResponse;
  }>(`/v3/farms/${props.farmId}/metersystems/${props.meterId}/history`, {
    method: 'GET',
  });
}

export async function getMeterSystemWaterLevel(
  props: API.GetMeterSystemWaterLevelParams,
  options?: { [key: string]: any },
) {
  return request<API.GetMeterSystemWaterLevelResponse>(
    `/v3/farms/${props.farmId}/metersystems/${props.meterId}/meter/${props.otherId}/lake-level/`,
    {
      method: 'GET',
      params: options,
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
    `/v3/farms/${props.farmId}/metersystems/${props.meterId}/meter/${props.otherId}/water-level-history/`,
    {
      method: 'GET',
      params: options,
    },
  );
}

export async function getMeterSystemSensors() {
  return request<{
    data: API.GetMeterSystemSensorsResponse;
  }>(`/sensors/`, {
    method: 'GET',
  });
}

export async function postMeterSystemConfig(
  props: API.PostMeterSystemConfigParams,
  options: APIModels.MeterConfig,
) {
  return request<{
    data: API.PostMeterSystemConfigResponse;
  }>(
    `/v3/farms/${props.farmId}/metersystems/${props.meterSystemId}/meter/${props.meterId}/config/standard/`,
    {
      method: 'POST',
      data: options,
    },
  );
}

export async function patchMeter(props: API.PatchMeterParams, options: APIModels.PatchMeter) {
  return request<{
    data: API.PatchMeterResponse;
  }>(`/v3/farms/${props.farmId}/metersystems/${props.meterSystemId}/meter/${props.meterId}/`, {
    method: 'PATCH',
    data: options,
  });
}

export async function patchMeterSystem(
  props: API.PatchMeterSystemParams,
  options: APIModels.PatchMeterSystem,
) {
  return request<{
    data: API.PatchMeterSystemResponse;
  }>(`/v3/farms/${props.farmId}/metersystems/${props.meterSystemId}/`, {
    method: 'PATCH',
    data: options,
  });
}

export async function getEditMeterDeviceIManageTable(
  props: API.GetMeterDevicesParams,
  options?: { [key: string]: any },
) {
  return request<{
    data: API.GetMeterDevicesResponse;
  }>(`/v3/farms/${props.farmId}/metersystems/${props.meterSystemId}/meter/devices`, {
    method: 'GET',
    params: options,
  });
}

export async function patchChangeIManageRadio(
  props: {
    farmId: number;
    meterSystemId: number;
    meterId: number;
    newMeterId: number;
  },
  options?: { radio_id: string },
) {
  return request<{
    data: { radio_id: string };
  }>(
    `/v3/farms/${props.farmId}/metersystems/${props.meterSystemId}/meter/${props.meterId}/swap/${props.newMeterId}/`,
    {
      method: 'PATCH',
      data: options,
    },
  );
}

export async function patchChangeIManageManualRadio(
  props: {
    farmId: number;
    meterSystemId: number;
    meterId: number;
  },
  options?: { radio_id: string },
) {
  return request<{
    data: { radio_id: string };
  }>(
    `/v3/farms/${props.farmId}/metersystems/${props.meterSystemId}/meter/${props.meterId}/edit_radio/`,
    {
      method: 'POST',
      data: options,
    },
  );
}

export async function getEditMeterHistory(
  props: API.GetEditMeterHistoryParams,
  options?: { [key: string]: any },
) {
  return request<{
    data: API.GetMeterHistoryResponse;
  }>(`/v3/farms/${props.farmId}/metersystems/${props.meterSystemId}/meter/${props.meterId}/config/`, {
    method: 'GET',
    params: options,
  });
}

export async function favoriteMeterConfig(
  props: API.FavoriteMeterConfigParams,
  options?: { [key: string]: any },
) {
  return request<{
    data: API.FavoriteMeterConfigResponse;
  }>(
    `/v3/farms/${props.farmId}/metersystems/${props.meterSystemId}/meter/${props.meterId}/config/${props.configId}/`,
    {
      method: 'PATCH',
      data: options,
    },
  );
}
