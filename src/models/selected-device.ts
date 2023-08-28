import { DeviceType } from '@/utils/enums';
import { queryIrpdWater } from './irpd-water-consumption';

export interface SelectedDeviceModelProps {
  type: string;
  farmId: number;
  deviceId: number;
  open: boolean;
  otherProps: any;
  error?: any;
}

export type SelectedType = {
  type: DeviceType;
  farmId: number;
  deviceId: number;
  otherProps: any;
};

export const setSelectedDevice = (payload: SelectedType) => {
  return {
    type: 'selectedDevice/setSelectedDevice',
    payload: payload,
  };
};

export const setDeviceClose = () => {
  return {
    type: 'selectedDevice/setDeviceClose',
    payload: {},
  };
};

export default {
  namespace: 'selectedDevice',

  state: {
    type: '',
    farmId: 0,
    deviceId: 0,
    open: false,
    otherProps: {},
    error: {},
  },

  effects: {
    *setSelectedDevice({ payload }: { payload: SelectedType }, { put }: { put: any }) {
      console.log('chegou aqui')
      const { type, farmId, deviceId, otherProps } = payload;
      console.log('otherProps', otherProps)
      yield put({
        type: 'setSelectedDeviceDefinition',
        payload: { type, farmId, deviceId, otherProps },
      });

      switch (type) {
        case DeviceType.Pivot: {
          yield put({
            type: 'pivotReport/queryPivotReport',
            payload: { farmId, pivotId: deviceId, params: {} },
          });
          yield put({
            type: 'pivotHistory/queryPivotHistory',
            payload: { farmId, pivotId: deviceId, params: {} },
          });
          yield put({
            type: 'pivotById/queryPivotById',
            payload: { farmId, pivotId: deviceId, params: {} },
          });
          break;
        }
        case DeviceType.Pump: {
          yield put({
            type: 'irpdById/queryIrpdById',
            payload: { farmId, irpdId: deviceId, params: {} },
          });
          yield put({
            type: 'irpdHistory/queryIrpdHistory',
            payload: { farmId, irpdId: deviceId, params: { current: 0, pageSize: 15 } },
          });

          yield put({
            type: 'irpdEvents/queryIrpdEvents',
            payload: { farmId, irpdId: deviceId, params: {} },
          });

          yield put(queryIrpdWater({
            farmId,
            irpdId: deviceId,
            waterId: otherProps?.waterId,
            params: otherProps?.params,
          }));

          break;
        }
        case DeviceType.Meter: {
          yield put({
            type: 'meterSystemById/queryMeterSystemById',
            payload: { farmId, meterId: deviceId, params: {} },
          });
          yield put({
            type: 'meterSystemHistory/queryMeterSystemHistory',
            payload: { farmId, meterId: deviceId, params: {}, otherId: otherProps.imeterSetId },
          });
          yield put({
            type: 'meterSystemEvent/queryMeterSystemEvent',
            payload: { farmId, meterId: deviceId, params: {}, otherId: otherProps.imeterSetId },
          });
          break;
        }
      }
    },
  },

  reducers: {
    setSelectedDeviceDefinition(
      state: SelectedDeviceModelProps,
      { payload }: { payload: { type: string; farmId: number; deviceId: string; otherProps: any } },
    ) {
      const { type, farmId, deviceId, otherProps } = payload;

      return {
        ...state,
        type,
        farmId,
        deviceId,
        otherProps,
        open: true,
      };
    },

    setDeviceClose() {
      return {
        type: '',
        farmId: '',
        deviceId: '',
        open: false,
        otherProps: {},
        error: {},
      };
    },
  },
};
