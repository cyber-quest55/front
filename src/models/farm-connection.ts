import { getFarmConnection } from "@/services/farm";

export interface GetFarmConnectionModelProps {
    result: API.GetFarmConnectionResponse;
    loading: boolean;
    loaded: boolean;
}

export default {
    namespace: 'farmConnection',

    state: {
        result: {},
        loaded: false,
        loading: true
    },

    effects: {
        *queryFarmConnection(
            { payload }: { payload: API.GetFarmConnectionParams },
            { call, put }: { call: any, put: any }) {
            yield put({ type: 'queryFarmConnectionStart' });
            const { data } = yield call(getFarmConnection, payload);
            yield put({ type: 'queryFarmConnectionSuccess', payload: data });
        },
    },

    reducers: {
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
            };
        },
    },
}; 