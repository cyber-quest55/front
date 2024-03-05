import uniqid from 'uniqid';
import { getSocketBinds } from '../utils/formater/get-socket-binds';

export interface DevicePanelModelProps {
  result: {
    underMaintenance: boolean;
  };
  id: string;
  loading: boolean;
  error: any;
  loaded: boolean;
}

export const togglePivotMaintenance = (payload: { maintenance: boolean }) => {
  return {
    type: 'devicePanel/togglePivotMaintenance',
    payload: payload,
  };
};

export default {
  namespace: 'devicePanel',

  state: {
    result: {
      underMaintenance: false,
    },
    id: uniqid('wsk-'),
    loading: false,
    error: {},
    loaded: false,
  },

  effects: {
    *onInit({}, { put, select }: { put: any; select: any }) {
      const selectedDevice = yield select((state) => state.selectedDevice);
      const state = yield select((state) => state.devicePanel);

      const channels = [
        {
          title: `d@pivot@${selectedDevice.deviceId}`,
          id: state.id,
          binds: [
            {
              callback: ['devicePanel/wskUpdatePivotMaintenanceMode'],
              event: 'maintenance',
              id: state.id,
            },
          ],
        },
      ];

      yield getSocketBinds(channels, put, 'subscribe');
    },

    *onDestroy({ payload }, { put, select }: { put: any; select: any }) {
      const selectedDevice = payload;
      const state = yield select((state) => state.devicePanel);

      const channels = [
        {
          title: `d@pivot@${selectedDevice.deviceId}`,
          id: state.id,
          binds: [
            {
              callback: ['devicePanel/wskUpdatePivotMaintenanceMode'],
              event: 'maintenance',
              id: state.id,
            },
          ],
        },
      ];

      yield getSocketBinds(channels, put, 'unsubscribe');
    },

    *wskUpdatePivotMaintenanceMode(
      { payload }: { payload: any },
      { put }: { put: any; call: any; select: any },
    ) {
      yield put({ type: 'wskUpdatePivotMaintenanceModeSuccess', payload });
    },
  },

  reducers: {
    togglePivotMaintenance(
      state: DevicePanelModelProps,
      { payload }: { payload: { maintenance: boolean } },
    ) {
      return {
        ...state,
        result: {
          ...state.result,
          underMaintenance: payload.maintenance,
        },
        loading: false,
        loaded: true,
        error: {},
      };
    },

    wskUpdatePivotMaintenanceModeSuccess(
      state: DevicePanelModelProps,
      { payload }: { payload: { maintenance: boolean } },
    ) {
      return {
        ...state,
        result: {
          ...state.result,
          underMaintenance: payload.maintenance,
        },
        loading: false,
        loaded: true,
        error: {},
      };
    },
  },
};
