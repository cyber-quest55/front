import { DeviceType } from '@/utils/enum/device-type';
import dayjs from 'dayjs';

const takeLatest = { type: 'takeLatest' };

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
    *setSelectedDevice(
      { payload }: { payload: SelectedType },
      { put, select }: { put: any; select: any },
    ) {
      const { type, farmId, deviceId, otherProps } = payload;

      const selectedDevice = yield select((state) => state.selectedDevice);

      /** Para o button de modo manutenção */
      if (selectedDevice.open && selectedDevice.type === DeviceType.Pivot) {
        yield put({ type: 'devicePanel/onDestroy', payload: selectedDevice });
      }

      // Irpd history destroy if select device change
      if (selectedDevice.open && selectedDevice.type === DeviceType.Pump) {
        yield put({ type: 'irpdHistory/onDestroy', payload: selectedDevice });
      }

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
            payload: {
              farmId,
              pivotId: deviceId,
              params: {
                gps: true,
                central: true,
                page: 0,
                date_start: dayjs().subtract(1, 'month'),
                date_end: dayjs(),
              },
            },
          });
          yield put({
            type: 'pivotById/queryPivotById',
            payload: { farmId, pivotId: deviceId, params: {} },
          });
          yield put({
            type: 'devicePanel/onInit',
            payload: {},
          });
          yield put({
            type: 'pivotHistory/onInit',
            payload: {},
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
          break;
        }
        case DeviceType.Meter: {
          yield put({
            type: 'meterSystemById/queryMeterSystemById',
            payload: { farmId, meterId: deviceId, params: {} },
          });
          break;
        }
      }
    },

    setDeviceClose: [
      function* ({}, { put, select }: { put: any; select: any }) {
        const selectedDevice = yield select((state) => state.selectedDevice);
        const { type } = selectedDevice;

        if (selectedDevice.open === false) {
          return;
        }

        switch (type) {
          case DeviceType.Pivot: {
            yield put({ type: 'devicePanel/onDestroy', payload: selectedDevice });
            break;
          }
          case DeviceType.Pump: {
            break;
          }
          case DeviceType.Meter: {
            break;
          }
        }

        yield put({ type: 'setDeviceCloseSuccess', payload: {} });
      },
      takeLatest,
    ],
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

    setDeviceCloseSuccess() {
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
