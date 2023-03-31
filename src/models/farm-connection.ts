import { getFarms } from "@/services/farm";

export interface GetFarmModelProps {
    result: API.gerFarmsResponse;
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
            { payload }: { payload: API.getFarmsParams },
            { call, put }: { call: any, put: any }) {
            yield put({ type: 'queryFarmConnectionStart' });
            const { data } = yield call(getFarms, payload);
            yield put({ type: 'queryFarmConnectionSuccess', payload: data });
        },
    },

    reducers: {
        queryFarmConnectionStart(
            state: GetFarmModelProps) { 
            return {
                ...state,
                loading: true,
            };
        },
        queryFarmConnectionSuccess(
            state: GetFarmModelProps,
            { payload }: { payload: API.gerFarmsResponse }) { 
            return {
                ...state,
                loading: false,
                loaded: true,
                result: payload,
            };
        },
    },
}; 