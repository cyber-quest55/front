import { CirclePivotProps } from "@/components/Devices/CirclePivot";
import { getPivotsWithInformations } from "@/services/pivot";
import { AxiosError } from "@umijs/max";

export interface GetPivotInformationModelProps {
    result: CirclePivotProps[];
    loading: boolean;
    loaded: boolean;
    error: any;
}

export default {
    namespace: 'pivotInformation',

    state: {
        result: [],
        loaded: false,
        loading: true,
        error: {}
    },

    effects: {
        *queryPivotInformation(
            { payload }: { payload: API.GetPivotInformationParam },
            { call, put }: { call: any, put: any }) {
                
            yield put({ type: 'queryPivotInformationStart' });
            try {
                const { data } = yield call(getPivotsWithInformations, payload, payload.params);
                yield put({ type: 'queryPivotInformationSuccess', payload: data });
            } catch (error: any) {
                yield put({ type: 'queryPivotInformationError', payload: error });
            }
        },
    },

    reducers: {
        queryPivotInformationError(
            state: GetPivotInformationModelProps,
            { payload }: { payload: AxiosError }
        ) {
            return {
                ...state,
                error: payload.response?.data,
                loading: false,
            };
        },

        queryPivotInformationStart(
            state: GetPivotInformationModelProps,
        ) {
            return {
                ...state,
                loading: true,
            };
        },

        queryPivotInformationSuccess(
            state: GetPivotInformationModelProps,
            { payload }: { payload: API.GetPivotInformationResponse }
        ) {
            const mapper: CirclePivotProps[] = [];

            /** 
             * Observações:
             * Validar o latestPanelStream
             * Validar latestGpsPosition linha 184, 196
             */
            for (let index = 0; index < payload.list.length; index++) {
                const item = payload.list[index];

                /** Props */
                let irrigationDirection = 1
                let protocol: 'v4' | 'v5' = 'v5'
                let centerLat;
                let centerLng;
                let referencedLat;
                let referencedLng;
                let gpsLat;
                let gpsLong;
                let sectorAngle;
                let stopAngle;
                let type: 'sectorial' | 'central' = 'central';

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
                    } else if (
                        !item.latest_panel_stream ||
                        !item.latest_gps_stream ||
                        !item.config
                    )
                        continue;
                }

                /** To define irrigationDirection */
                if (item.protocol === 5) {
                    irrigationDirection =
                        item.controllerstream_panel?.content?.current_irrigation_information
                            ?.direction;
                } else {
                    irrigationDirection = item.latest_gps_stream
                        ? item.latest_gps_stream.clockwise
                        : item.latest_panel_stream?.clockwise;
                }

                /** To define the protocol */
                if (item.protocol < 5) {
                    protocol = 'v4'
                } else {
                    protocol = 'v5'
                }

                /** To define locations */
                if (item.protocol < 5) {
                    const gpsPosition = item.latest_gps_stream?.position?.split(",");
                    const centerPosition = item.config.center.split(",");
                    const referencePosition = item.config.reference.split(",");
                    centerLat = parseFloat(centerPosition[0]).toFixed(6)
                    centerLng = parseFloat(centerPosition[1]).toFixed(6)
                    referencedLat = parseFloat(referencePosition[0]).toFixed(6)
                    referencedLng = parseFloat(referencePosition[1]).toFixed(6)
                    gpsLat = parseFloat(gpsPosition[0]).toFixed(6)
                    gpsLong = parseFloat(gpsPosition[1]).toFixed(6)
                } else {
                    centerLat = item.controllerconfig.content?.pivot_positions.latitude_center
                    centerLng = item.controllerconfig.content?.pivot_positions.longitude_center
                    referencedLat = item.controllerconfig.content?.pivot_positions.latitude_reference
                    referencedLng = item.controllerconfig.content?.pivot_positions.longitude_reference
                    gpsLat = item.controllerstream_gps.content?.latitude_longitude_gps?.latitude_gps
                    gpsLong = item.controllerstream_gps.content?.latitude_longitude_gps?.longitude_gps
                }

                stopAngle = (item.protocol === 5
                    ? item.controllerstream_panel?.content
                        .current_irrigation_information.stop_angle
                    : item.irrigation_end_angle) + item.reference_angle


                if (item.config && item.config.setorial) {
                    type = 'sectorial'
                } else if (item.controllerconfig?.content?.sector?.end_angle < 360) {
                    type = 'sectorial'
                }

                if (type === 'sectorial') {
                    sectorAngle = item.config?.sector_angle
                }

                let endAngle = item.controllerconfig?.content?.sector?.end_angle

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
                    pivotColor: '#f33',
                    sectorAngle: sectorAngle,
                    hasMarker: true,
                    irrigationStatus: item.controllerstream_panel?.content?.irrigation_status as any,
                    lpmGpsStreamLng: 30,
                    lpmGpsStreamLat: 30,
                    zoom: 15,
                    updated: new Date(payload.list[index].updated).toLocaleString(),
                })
            }

            return {
                ...state,
                loading: false,
                loaded: true,
                result: mapper,
                error: {}
            };
        },
    },
}; 