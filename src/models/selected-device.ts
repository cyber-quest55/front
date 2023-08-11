import { DeviceType } from '@/utils/enums';

export interface SelectedDeviceModelProps {
  type: string;
  farmId: string;
  deviceId: string;
  open: boolean;
  error?: any;
}

export default {
  namespace: 'selectedDevice',

  state: {
    type: '',
    farmId: '',
    deviceId: '',
    open: false,
    error: {},
  },

  effects: {
    *setSelectedDevice({ payload }: { payload: any }, { put }: { put: any }) {
      const { type, farmId, deviceId } = payload;

      yield put({ type: 'setSelectedDeviceDefinition', payload: { type, farmId, deviceId } });

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
          yield put({
            type: 'irpdWaterConsumption/queryIrpdWater',
            payload: { farmId, irpdId: deviceId, params: {} },
          });
          break;
        }
        case DeviceType.Meter: {
          yield put({
            type: 'meterSystemById/queryMeterSystemById',
            payload: { farmId, meterId: deviceId, params: {} },
          });
          yield put({
            type: 'meterSystemHistory/queryMeterSystemHistory',
            payload: { farmId, meterId: deviceId, params: {} },
          });
          yield put({
            type: 'meterSystemEvent/queryMeterSystemEvent',
            payload: { farmId, meterId: deviceId, params: {} },
          });
          break;
        }
      }
    },
  },

  reducers: {
    setSelectedDeviceDefinition(
      state: SelectedDeviceModelProps,
      { payload }: { payload: { type: string; farmId: string; deviceId: string } },
    ) {
      const { type, farmId, deviceId } = payload;

      return {
        ...state,
        type,
        farmId,
        deviceId,
        open: true,
      };
    },

    setDeviceClose() {
      return {
        type: '',
        farmId: '',
        deviceId: '',
        open: false,
        error: {},
      };
    },
  },
};
