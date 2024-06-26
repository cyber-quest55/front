import { CirclePivotProps } from '@/components/Devices/CirclePivot';
import { getPivotsWithInformations } from '@/services/pivot';
import { getPivotColor } from '@/utils/formater/get-pivot-color';
import { getPivotStatus } from '@/utils/formater/get-pivot-status';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import uniqid from 'uniqid';
import { getSocketBinds } from '../utils/formater/get-socket-binds';
import { formatDayJsDate } from '@/utils/formater/get-formated-date';

export type GetPivotInformationModelProps = {
  result: CirclePivotProps[];
  loading: boolean;
  loaded: boolean;
  error: any;
  id: string;
}

export const queryPivotInformation = (payload: API.GetPivotsInformationParam) => {
  return {
    type: 'pivotInformation/queryPivotInformation',
    payload: payload,
  };
};

export default {
  namespace: 'pivotInformation',

  state: {
    result: [],
    loaded: false,
    loading: true,
    error: {},
    id: uniqid('@PivotInformation_'),
  } as GetPivotInformationModelProps,

  effects: {
    *queryPivotInformation(
      { payload }: { payload: API.GetPivotsInformationParam },
      { call, put }: { call: any; put: any },
    ) {
      yield put({ type: 'queryPivotInformationStart' });
      try {
        const response: API.GetPivotsInformationResponse = yield call(
          getPivotsWithInformations,
          payload,
          payload.params,
        );
        yield put({ type: 'queryPivotInformationSuccess', payload: response });
        yield put({ type: 'onInit', payload: {} });
      } catch (error: any) {
        yield put({ type: 'queryPivotInformationError', payload: error });
      }
    },
    *setNewPivotInformation(
      { payload }: { payload: any },
      { put, select }: { put: any; select: any },
    ) {
      const { result }: GetPivotInformationModelProps = yield select(
        (state: any) => state.pivotInformation,
      );

      const index = result.findIndex((item) => item.id === payload.id);

      const newResult = [...result];

      newResult[index].statusText = getPivotStatus(
        payload.controllerstream_panel?.content?.irrigation_status?.irrigation_status,
      );

      newResult[index].deviceColor = getPivotColor(
        payload.controllerstream_panel?.content?.irrigation_status?.irrigation_status,
      );

      yield put({ type: 'setNewPivotInformationSuccess', payload: newResult });
    },
    // Web socket subscribers
    *onInit({}, { put, select }: { put: any; select: any }) {
      const state = yield select((state) => state.pivotInformation);
      const channels = state.result.map(r => ({
        title: `${process.env.NODE_ENV === 'development' ? 'd' : 'p'}@pivot@${r.id}`,
        id: state.id,
        binds: [
          {
            callback: ['pivotInformation/wsPivotControllerStreamPanelCallback'],
            event: 'ControllerStream_panel',
            id: state.id,
          },
          {
            callback: ['pivotInformation/wsPivotControllerStreamGpsCallback'],
            event: 'ControllerStream_gps',
            id: state.id,
          },
          {
            callback: ['pivotInformation/wsPivotControllerStreamPeriodicCallback'],
            event: 'ControllerStream_periodic',
            id: state.id,
          },
        ],
      }));
      yield getSocketBinds(channels, put, 'subscribe');
    },
    *onDestroy({}, { put, select }: { put: any; select: any }) {
      const state = yield select((state) => state.pivotInformation);
      const channels = state.result.map(r => ({
        title: `${process.env.NODE_ENV === 'development' ? 'd' : 'p'}@pivot@${r.id}`,
        id: state.id,
        binds: [
          {
            callback: ['pivotInformation/wsPivotControllerStreamPanelCallback'],
            event: 'ControllerStream_panel',
            id: state.id,
          },
          {
            callback: ['pivotInformation/wsPivotControllerStreamGpsCallback'],
            event: 'irpd_cControllerStream_gpsonfig',
            id: state.id,
          },
          {
            callback: ['pivotInformation/wsPivotControllerStreamPeriodicCallback'],
            event: 'ControllerStream_periodic',
            id: state.id,
          },
        ],
      }));
      yield getSocketBinds(channels, put, 'unsubscribe');
    },
    // Web socket callbacks
    *wsPivotControllerStreamPanelCallback(
      { payload }: { payload: WkModels.PivotControllerStreamPanel },
      { put }: { put: any; call: any; select: any },
    ) {
      yield put({ type: 'wsPivotControllerStreamPanelSuccess', payload });
    },
    *wsPivotControllerStreamGpsCallback(
      { payload }: { payload: WkModels.PivotControllerActionGps },
      { put }: { put: any; call: any; select: any },
    ) {
      yield put({ type: 'wsPivotControllerStreamGpsSuccess', payload });
    },
    *wsPivotControllerStreamPeriodicCallback(
      { payload }: { payload: WkModels.PivotControllerStreamPeriodic  },
      { put }: { put: any; call: any; select: any },
    ) {
      yield put({ type: 'wsPivotControllerStreamPeriodicSuccess', payload });
    }
  },

  reducers: {
    queryPivotInformationError(
      state: GetPivotInformationModelProps,
      { payload }: { payload: AxiosError },
    ) {
      return {
        ...state,
        error: payload.response?.data,
        loading: false,
      };
    },
    queryPivotInformationStart(state: GetPivotInformationModelProps) {
      return {
        ...state,
        loading: true,
      };
    },
    queryPivotInformationSuccess(
      state: GetPivotInformationModelProps,
      { payload }: { payload: API.GetPivotsInformationResponse },
    ) {
      const mapper: any[] = [];

      /**
       * Observações:
       * Validar o latestPanelStream
       * Validar latestGpsPosition linha 184, 196
       */
      for (let index = 0; index < payload.results.length; index++) {
        const item = payload.results[index];

        /** Props */
        let irrigationDirection = 1;
        let protocol: 'v4' | 'v5' = 'v5';
        let centerLat;
        let centerLng;
        let referencedLat;
        let referencedLng;
        let gpsLat;
        let gpsLong;
        let sectorAngle;
        let stopAngle;
        let type: 'sectorial' | 'central' = 'central';
        let deviceColor;
        let statusText = '';

        /** Invalid drawer pivot */
        if (item.automation_type === 0 || item.automation_type === 1) {
          if (item.protocol === 5) {
            if (
              !item.controllerstream_panel ||
              !item.controllerstream_gps ||
              !item.controllerconfig
            ) {
              continue;
            }
          } else if (!item.latest_panel_stream || !item.latest_gps_stream || !item.config) continue;
        }

        /** To define irrigationDirection */
        if (item.protocol === 5) {
          irrigationDirection =
            item.controllerstream_panel?.content?.current_irrigation_information?.direction;
        } else {
          irrigationDirection = item.latest_gps_stream
            ? item.latest_gps_stream.clockwise
            : item.latest_panel_stream?.clockwise;
        }

        /** To define the protocol */
        if (item.protocol < 5) {
          protocol = 'v4';
        } else {
          protocol = 'v5';
        }

        /** To define locations */
        if (item.protocol < 5) {
          const gpsPosition = item.latest_gps_stream?.position?.split(',');
          const centerPosition = item.config.center.split(',');
          const referencePosition = item.config.reference.split(',');
          centerLat = parseFloat(centerPosition[0]);
          centerLng = parseFloat(centerPosition[1]);
          referencedLat = parseFloat(referencePosition[0]);
          referencedLng = parseFloat(referencePosition[1]);
          gpsLat = parseFloat(gpsPosition[0]);
          gpsLong = parseFloat(gpsPosition[1]);
        } else {
          centerLat = parseFloat(
            item.controllerconfig.content?.pivot_positions?.latitude_center as any,
          );
          centerLng = parseFloat(
            item.controllerconfig.content?.pivot_positions?.longitude_center as any,
          );
          referencedLat = parseFloat(item.controllerconfig.content?.pivot_positions?.latitude_reference as any);
          referencedLng = parseFloat(item.controllerconfig.content?.pivot_positions?.longitude_reference as any);
          gpsLat = parseFloat(
            item.controllerstream_gps.content?.latitude_longitude_gps?.latitude_gps as any,
          );
          gpsLong = parseFloat(
            item.controllerstream_gps.content?.latitude_longitude_gps?.longitude_gps as any,
          );
        }

        stopAngle = (
          item.protocol === 5
            ? item.controllerstream_panel?.content.current_irrigation_information.stop_angle
            : item.irrigation_end_angle
        ) + item.reference_angle;

        if (item.config && item.config.setorial) {
          type = 'sectorial';
        } else if (item.controllerconfig?.content?.sector?.end_angle < 360) {
          type = 'sectorial';
        }

        if (type === 'sectorial') {
          sectorAngle = item.config?.sector_angle;
        }

        let endAngle = parseFloat(item.controllerconfig?.content?.sector?.end_angle as any);

        if (item.controllerstream_panel?.content?.irrigation_status?.irrigation_status) {
          deviceColor = getPivotColor(
            item.controllerstream_panel?.content?.irrigation_status?.irrigation_status,
          );
        }

        if (item.controllerstream_panel?.content?.irrigation_status?.irrigation_status) {
          statusText = getPivotStatus(
            item.controllerstream_panel?.content?.irrigation_status?.irrigation_status,
          );
        }

        // This section calculates the pluviometer measure to display on device box
        let pluviometerMeasure = 0;
        let isRaining = false;
        if (item.controllerstream_periodic) {
          if (
            item.controllerstream_periodic.content?.pluviometer_daily_measure?.daily_measure > 0 &&
            dayjs().diff(dayjs(item.controllerstream_periodic?.created), 'minutes') <= 70

          ) {
            isRaining = true;
          }
          pluviometerMeasure = item.controllerstream_periodic?.content?.pluviometer_daily_measure?.daily_measure;
        }
        
        // Calc current pivot angle
        let currentAngle = 0;
        try {
          const gpsDate = dayjs(item.controllerstream_gps.created);
          const panelDate = dayjs(item.controllerstream_panel.created);
          currentAngle = panelDate.isAfter(gpsDate)
            ? item.controllerstream_panel.current_angle
            : item.controllerstream_gps.current_angle;
        } catch (err) {}
       
        // Computed information about pivots
        mapper.push({
          id: item.id,
          irrigationDirection,
          protocol,
          centerLat: centerLat as number,
          centerLng: centerLng as number,
          gpsLat: gpsLat as number,
          gpsLong: gpsLong as number,
          referencedLat: referencedLat as number,
          referencedLng: referencedLng as number,
          referenceAngle: item.reference_angle,
          endAngle,
          stopAngle,
          type: type,
          dashed: false,
          lineColor: '#fff',
          deviceColor: deviceColor,
          sectorAngle: sectorAngle,
          hasMarker: true,
          irrigationStatus: item.controllerstream_panel?.content?.irrigation_status as any,
          lpmGpsStreamLng: 30,
          lpmGpsStreamLat: 30,
          zoom: 15,
          updated: formatDayJsDate(payload.results[index].updated),
          name: item.name,
          statusText: statusText,
          onSelect: () => null,
          mapHistory: item.map_history,
          pluviometerMeasure,
          isRaining,
          currentAngle: Math.round(currentAngle),
          controlRadio: item.control_radio_id,
          monitorRadio: item.monitor_radio_id,
        });
      }

      return {
        ...state,
        loading: false,
        loaded: true,
        result: mapper,
        error: {},
      };
    },
    setNewPivotInformationSuccess(
      state: GetPivotInformationModelProps,
      { payload }: { payload: any[] },
    ) {
      return {
        ...state,
        result: payload,
      };
    },
    // Websocket reducers
    wsPivotControllerStreamPanelSuccess(
      state: GetPivotInformationModelProps,
      { payload }: { payload: WkModels.PivotControllerStreamPanel },
    ) {
      const pivotIndex = state.result.findIndex(r => r.id === payload.equipment);

      if (pivotIndex >= 0) {
        const newResults = state.result.map((r, i) => {
          if (i === pivotIndex) return {
            ...r,
            deviceColor: getPivotColor(payload.content.irrigation_status.irrigation_status),
            statusText: getPivotStatus(payload.content.irrigation_status.irrigation_status),
            updated: new Date(payload.updated).toLocaleString(),
          }
          return r;
        });
    
        return {
          ...state,
          result: newResults,
        };
      }

      return state;
    },
    wsPivotControllerStreamGpsSuccess(
      state: GetPivotInformationModelProps,
      { payload }: { payload: WkModels.PivotControllerActionGps },
    ) {
      const pivotIndex = state.result.findIndex(r => r.id === payload.equipment);
      
      if (pivotIndex >= 0) {
        const newResults = state.result.map((r, i) => {
          if (i === pivotIndex) return {
            ...r,
            deviceColor: getPivotColor(payload.content.irrigation_status.irrigation_status),
            statusText: getPivotStatus(payload.content.irrigation_status.irrigation_status),
            currentAngle: Math.round(payload.content.current_angle.current_angle),
            updated: new Date(payload.updated).toLocaleString(),
          }
          return r;
        });
    
        return {
          ...state,
          result: newResults,
        };
      }

      return state;
    },
    wsPivotControllerStreamPeriodicSuccess(
      state: GetPivotInformationModelProps,
      { payload }: { payload: WkModels.PivotControllerStreamPeriodic },
    ) {
      const pivotIndex = state.result.findIndex(r => r.id === payload.equipment);

      if (pivotIndex >= 0) {
        const newResults = state.result.map((r, i) => {    
          if (i === pivotIndex) {
            // This section calculates the pluviometer measure to display on device box
            let isRaining = false;
            if (
              payload.content?.pluviometer_daily_measure?.daily_measure > 0 &&
              dayjs().diff(dayjs(payload.created), 'minutes') <= 70
            ) {
              isRaining = true;
            }
            
            return {
              ...r,
              isRaining,
              pluviometerMeasure: payload.content?.pluviometer_daily_measure?.daily_measure,

              updated: new Date(payload.updated).toLocaleString(),
            }
          }

          return r;
        });
    
        return {
          ...state,
          result: newResults,
        };
      }

      return state;
    }
  },
};
