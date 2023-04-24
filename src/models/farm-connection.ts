import { getFarmConnection } from "@/services/farm";
import { AxiosError } from "@umijs/max";

export interface GetFarmConnectionModelProps {
    result: API.GetFarmConnectionResponse;
    loading: boolean;
    loaded: boolean;
    error: any;
}

export default {
    namespace: 'farmConnection',

    state: {
        result: {},
        loaded: false,
        loading: true,
        error: {}
    },

    effects: {
        *queryFarmConnection(
            { payload }: { payload: API.GetFarmConnectionParams },
            { call, put }: { call: any, put: any }) {
            yield put({ type: 'queryFarmConnectionStart' });

            try{
                const { data } = yield call(getFarmConnection, payload.id);
                yield put({ type: 'queryFarmConnectionSuccess', payload: data });
            } catch (error) {
                yield put({ type: 'queryFarmConnectionError', payload: error });
            }
        },
    },

    reducers: {
        queryFarmConnectionError(
            state: GetFarmConnectionModelProps,
            { payload }: { payload: AxiosError }
        )  { 
            return {
                ...state,
                loading: false,
                error: payload
            };
        },
        queryFarmConnectionStart(
            state: GetFarmConnectionModelProps) { 
            return {
                ...state,
                loading: true,
            };
        },
        queryFarmConnectionSuccess(
            state: GetFarmConnectionModelProps,
            { payload }: { payload: API.GetFarmConnectionParams }) { 
            return {
                ...state,
                loading: false,
                loaded: true,
                result: payload,
                error: {}
            };
        },
    },
}; 