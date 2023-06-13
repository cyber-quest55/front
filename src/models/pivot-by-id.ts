import { CirclePivotProps } from '@/components/Devices/CirclePivot';
import { getPivotById } from '@/services/pivot';
import { getPivotColor } from '@/utils/get-pivot-color';
import { getPivotStatus } from '@/utils/get-pivot-status';
import { AxiosError } from 'axios';

export interface GetPivotByIdModelProps {
  unformated: Models.PivotInformation;
  result: CirclePivotProps;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export default {
  namespace: 'pivotById',

  state: {
    result: {},
    unformated: {},
    loaded: false,
    loading: true,
    error: {},
  },

  effects: {
    *queryPivotById(
      { payload }: { payload: API.GetPivotByIdInformationParam },
      { call, put }: { call: any; put: any },
    ) {
      yield put({ type: 'queryPivotByIdStart' });
      try {
        const { data } = yield call(getPivotById, payload);
        yield put({ type: 'queryPivotByIdSuccess', payload: data });
      } catch (error: any) {
        yield put({ type: 'queryPivotByIdError', payload: error });
      }
    },
  },

  reducers: {
    queryPivotByIdError(state: GetPivotByIdModelProps, { payload }: { payload: AxiosError }) {
      return {
        ...state,
        error: payload.response?.data,
        loading: false,
      };
    },

    queryPivotByIdStart(state: GetPivotByIdModelProps) {
      return {
        ...state,
        loading: true,
      };
    },

    queryPivotByIdSuccess(
      state: GetPivotByIdModelProps,
      { payload }: { payload: Models.PivotInformation },
    ) {
      const item = payload;

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
      let pivotColor;
      let statusText = '';

      /** Invalid drawer pivot */
      if (item?.automation_type === 0 || item?.automation_type === 1) {
        if (item.protocol === 5) {
          if (
            !item.controllerstream_panel ||
            !item.controllerstream_gps ||
            !item.controllerconfig
          ) {
            return {};
          }
        } else if (!item.latest_panel_stream || !item.latest_gps_stream || !item.config) return {};
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
        centerLat = parseFloat(centerPosition[0]).toFixed(6);
        centerLng = parseFloat(centerPosition[1]).toFixed(6);
        referencedLat = parseFloat(referencePosition[0]).toFixed(6);
        referencedLng = parseFloat(referencePosition[1]).toFixed(6);
        gpsLat = parseFloat(gpsPosition[0]).toFixed(6);
        gpsLong = parseFloat(gpsPosition[1]).toFixed(6);
      } else {
        centerLat = item.controllerconfig.content?.pivot_positions.latitude_center;
        centerLng = item.controllerconfig.content?.pivot_positions.longitude_center;
        referencedLat = item.controllerconfig.content?.pivot_positions.latitude_reference;
        referencedLng = item.controllerconfig.content?.pivot_positions.longitude_reference;
        gpsLat = item.controllerstream_gps.content?.latitude_longitude_gps?.latitude_gps;
        gpsLong = item.controllerstream_gps.content?.latitude_longitude_gps?.longitude_gps;
      }

      stopAngle =
        (item.protocol === 5
          ? item.controllerstream_panel?.content.current_irrigation_information.stop_angle
          : item.irrigation_end_angle) + item.reference_angle;

      if (item.config && item.config.setorial) {
        type = 'sectorial';
      } else if (item.controllerconfig?.content?.sector?.end_angle < 360) {
        type = 'sectorial';
      }

      if (type === 'sectorial') {
        sectorAngle = item.config?.sector_angle;
      }

      let endAngle = item.controllerconfig?.content?.sector?.end_angle;

      if (item.controllerstream_panel?.content?.irrigation_status?.irrigation_status) {
        pivotColor = getPivotColor(
          item.controllerstream_panel?.content?.irrigation_status?.irrigation_status,
        );
        statusText = getPivotStatus(
          item.controllerstream_panel?.content?.irrigation_status?.irrigation_status,
        );
      }

      const mapper = {
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
        pivotColor: pivotColor,
        sectorAngle: sectorAngle,
        hasMarker: true,
        irrigationStatus: item.controllerstream_panel?.content?.irrigation_status as any,
        lpmGpsStreamLng: 30,
        lpmGpsStreamLat: 30,
        zoom: 15,
        updated: new Date(item.updated).toLocaleString(),
        name: item.name,
        statusText: statusText,
        onSelect: () => null,
      };

      return {
        ...state,
        loading: false,
        loaded: true,
        pivotInformation: payload,
        result: mapper,
        error: {},
      };
    },

    setNewPivotByIdSuccess(state: GetPivotByIdModelProps, { payload }: { payload: any[] }) {
      return {
        ...state,
        result: payload,
      };
    },
  },
};
