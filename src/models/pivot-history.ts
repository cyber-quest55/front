import { getPivotHistory } from '@/services/pivot';
import { AxiosError } from 'axios';

import uniqid from 'uniqid';
import { SelectedDeviceModelProps } from './selected-device';
import { getPivotHistoryFmt, getPivotBadgeStatus } from '../utils/formater/get-pivot-history';
import { getSocketBinds } from '../utils/formater/get-socket-binds';

export interface GetPivotHistoryModelProps {
  result: any;
  loading: boolean;
  loaded: boolean;
  error: any;
  id: string;
}

export const queryPivotHistory = (payload: {
  path: { deviceId: number; farmId: number };
  params: any;
}) => {
  return {
    type: 'pivotHistory/queryPivotHistory',
    payload: payload,
  };
};

export default {
  namespace: 'pivotHistory',

  state: {
    result: { data: [], count: 0, currentPage: 1 },
    loaded: false,
    loading: true,
    error: {},
    id: uniqid('wsk-'),
  } as GetPivotHistoryModelProps,

  effects: {
    *onInit({}, { put, select }: { put: any; select: any }) {
      const selectedDevice: SelectedDeviceModelProps = yield select(
        (state: any) => state.selectedDevice
      );
      const state: GetPivotHistoryModelProps = yield select(
        (state: any) => state.pivotHistory
      );

      const channels = [
        {
          title: `d@farm@${selectedDevice.farmId}`,
          id: state.id,
          binds: [
            {
              callback: ['terst'],
              event: 'CentralStream',
              id: state.id,
            },
          ],
        },
        {
          title: `d@pivot@${selectedDevice.deviceId}`,
          id: state.id,
          binds: [
            {
              callback: ['terst'],
              event: 'maintenance',
              id: state.id,
            },
            {
              callback: ['pivotHistory/wskUpdateActionSimple'],
              event: 'ControllerAction_simple',
              id: state.id,
            },
            {
              callback: ['pivotHistory/wskUpdateActionSchedule'],
              event: 'ControllerAction_schedule',
              id: state.id,
            },
            {
              callback: ['pivotHistory/wskUpdateActionSegment'],
              event: 'ControllerAction_segment',
              id: state.id,
            },
            {
              callback: ['pivotHistory/wskUpdateActionStop'],
              event: 'ControllerAction_stop',
              id: state.id,
            },
            {
              callback: ['pivotHistory/wskUpdateActionPanel'],
              event: 'ControllerStream_panel',
              id: state.id,
            },
            {
              callback: ['pivotHistory/wskUpdateActionGps'],
              event: 'ControllerStream_gps',
              id: state.id,
            },

          ],
        },
      ];

      yield getSocketBinds(channels, put, 'subscribe');
    },

    *onDestroy({ payload }, { put, select }: { put: any; select: any }) {
      const selectedDevice = payload;
      const state = yield select((state) => state.pivotHistory);

      const channels = [
        {
          title: `d@farm@${selectedDevice.farmId}`,
          id: state.id,
          binds: [
            {
              callback: ['terst'],
              event: 'CentralStream',
              id: state.id,
            },
          ],
        },
        {
          title: `d@pivot@${selectedDevice.deviceId}`,
          id: state.id,
          binds: [
            {
              callback: ['terst'],
              event: 'maintenance',
              id: state.id,
            },
            {
              callback: ['terst'],
              event: 'ControllerAction_simple',
              id: state.id,
            },
            {
              callback: ['terst'],
              event: 'ControllerAction_schedule',
              id: state.id,
            },
            {
              callback: ['terst'],
              event: 'ControllerAction_segment',
              id: state.id,
            },
            {
              callback: ['terst'],
              event: 'ControllerAction_stop',
              id: state.id,
            },
            {
              callback: ['terst'],
              event: 'ControllerStream_panel',
              id: state.id,
            },
            {
              callback: ['terst'],
              event: 'ControllerStream_gps',
              id: state.id,
            },
            {
              callback: ['terst'],
              event: 'pivot_action',
              id: state.id,
            },
            {
              callback: ['terst'],
              event: 'pivot_action_vri_deliverer',
              id: state.id,
            },
            {
              callback: ['terst'],
              event: 'painel_stream',
              id: state.id,
            },
            {
              callback: ['terst'],
              event: 'gps_stream',
              id: state.id,
            },
          ],
        },
      ];

      yield getSocketBinds(channels, put, 'unsubscribe');
    },

    *queryPivotHistory({ payload }: { payload: any }, { call, put }: { call: any; put: any }) {
      yield put({ type: 'queryPivotHistoryStart' });
      try {
        const response: API.GetPivotHistoryResponse = yield call(
          getPivotHistory,
          payload.path,
          payload.params,
        );

        yield put({ type: 'queryPivotHistorySuccess', payload: response });
      } catch (error: any) {
        yield put({ type: 'queryPivotHistoryError', payload: error });
      }
    },

    *wskUpdateActionStop(
      { payload }: { payload: WkModels.PivotControllerActionStop },
      { put }: { put: any; call: any; select: any },
    ) {
      yield put({ type: 'wskUpdateActionStopSuccess', payload });
    },

    *wskUpdateActionPanel(
      { payload }: { payload: WkModels.PivotControllerActionStop },
      { put }: { put: any; call: any; select: any },
    ) {
      yield put({ type: 'wskUpdateActionPanelSuccess', payload });
    },

    *wskUpdateActionGps(
      { payload }: { payload: WkModels.PivotControllerActionStop },
      { put }: { put: any; call: any; select: any },
    ) {
      yield put({ type: 'wskUpdateActionGpsSuccess', payload });
    },

    *wskUpdateActionSchedule(
      { payload }: { payload: WkModels.PivotControllerActionStop },
      { put }: { put: any; call: any; select: any },
    ) {
      yield put({ type: 'wskUpdateActionScheduleSuccess', payload });
    },

    *wskUpdateActionSimple(
      { payload }: { payload: WkModels.PivotControllerActionStop },
      { put }: { put: any; call: any; select: any },
    ) {
      yield put({ type: 'wskUpdateActionSimpleSuccess', payload });
    },

    *wskUpdateActionSegment(
      { payload }: { payload: WkModels.PivotControllerActionStop },
      { put }: { put: any; call: any; select: any },
    ) {
      yield put({ type: 'wskUpdateActionSegmentSuccess', payload });
    },
  },

  reducers: {
    queryPivotHistoryError(state: GetPivotHistoryModelProps, { payload }: { payload: AxiosError }) {
      return {
        ...state,
        error: payload.response?.data,
        loading: false,
      };
    },

    queryPivotHistoryStart(state: GetPivotHistoryModelProps) {
      return {
        ...state,
        loading: true,
      };
    },

    queryPivotHistorySuccess(
      state: GetPivotHistoryModelProps,
      { payload }: { payload: API.GetPivotHistoryResponse },
    ) {
      const mapped = getPivotHistoryFmt(payload.results);

      return {
        ...state,
        loading: false,
        loaded: true,
        result: {
          data: mapped,
          count: payload.count,
          currentPage: payload.current_page,
        },
        error: {},
      };
    },

    wskUpdateActionStopSuccess(
      state: GetPivotHistoryModelProps,
      { payload }: { payload: WkModels.PivotControllerActionStop },
    ) {
      const newValue = [...state?.result?.data];
      const newValueFmt = getPivotHistoryFmt([{ ControllerStream_panel: payload }]);

      newValue.pop();
      newValue.unshift({...newValueFmt[0], here: 'adsad'});

      return {
        ...state,
        result: {
          data: newValue.map((item, ind) => ({ ...item, key: ind })),
          count: payload.count,
          currentPage: payload.current_page,
        },
      };
    },

    wskUpdateActionPanelSuccess(
      state: GetPivotHistoryModelProps,
      { payload }: { payload: WkModels.PivotControllerActionStop },
    ) {
      const newValue = [...state?.result?.data];
      const newValueFmt = getPivotHistoryFmt([{ ControllerStream_panel: payload }]);

      newValue.pop();
      newValue.unshift({...newValueFmt[0] });

      return {
        ...state,
        result: {
          data: newValue.map((item, ind) => ({ ...item, key: ind })),
          count: payload.count,
          currentPage: payload.current_page,
        },
      };
    },

    wskUpdateActionGpsSuccess(
      state: GetPivotHistoryModelProps,
      { payload }: { payload: WkModels.PivotControllerActionStop },
    ) {
      const newValue = [...state?.result?.data];
      const newValueFmt = getPivotHistoryFmt([{ ControllerStream_gps: payload }]);

      newValue.pop();
      newValue.unshift({...newValueFmt[0] });

      return {
        ...state,
        result: {
          data: newValue.map((item, ind) => ({ ...item, key: ind })),
          count: payload.count,
          currentPage: payload.current_page,
        },
      };
    },

    wskUpdateActionScheduleSuccess(
      state: GetPivotHistoryModelProps,
      { payload }: { payload: WkModels.PivotControllerActionStop },
    ) {
      const newValue = [...state?.result?.data];
      const newValueFmt = getPivotHistoryFmt([{ ControllerAction_schedule: payload }]);
      const indexFound = newValue.findIndex(item => item.id === payload.id)

      if(indexFound >= 0) {
        newValue[indexFound] = {...newValue[indexFound], badgeStatus: getPivotBadgeStatus(payload.message_status)};
      } else {
        newValue.pop();
        newValue.unshift({ ...newValueFmt[0] });
      }


      return {
        ...state,
        result: {
          data: newValue.map((item, ind) => ({ ...item, key: ind })),
          count: payload.count,
          currentPage: payload.current_page,
        },
      };
    },

    wskUpdateActionSimpleSuccess(
      state: GetPivotHistoryModelProps,
      { payload }: { payload: WkModels.PivotControllerActionStop },
    ) {
      const newValue = [...state?.result?.data];
      const newValueFmt = getPivotHistoryFmt([{ ControllerAction_simple: payload }]);
      const indexFound = newValue.findIndex(item => item.id === payload.id)

      if(indexFound >= 0) {
        newValue[indexFound] = {...newValue[indexFound], badgeStatus: getPivotBadgeStatus(payload.message_status)};
      } else {
        newValue.pop();
        newValue.unshift({ ...newValueFmt[0] });
      }

      return {
        ...state,
        result: {
          data: newValue.map((item, ind) => ({ ...item, key: ind })),
          count: payload.count,
          currentPage: payload.current_page,
        },
      };
    },

    wskUpdateActionSegmentSuccess(
      state: GetPivotHistoryModelProps,
      { payload }: { payload: WkModels.PivotControllerActionStop },
    ) {
      const newValue = [...state?.result?.data];
      const newValueFmt = getPivotHistoryFmt([{ ControllerAction_segment: payload }]);
      const indexFound = newValue.findIndex(item => item.id === payload.id)

      if(indexFound >= 0) {
        newValue[indexFound] = {...newValue[indexFound], badgeStatus: getPivotBadgeStatus(payload.message_status)};
      } else {
        newValue.pop();
        newValue.unshift({ ...newValueFmt[0] });
      }

      return {
        ...state,
        result: {
          data: newValue.map((item, ind) => ({ ...item, key: ind })),
          count: payload.count,
          currentPage: payload.current_page,
        },
      };
    },
  },
};
