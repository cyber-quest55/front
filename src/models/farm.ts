import { getFarms } from "@/services/farm";

export interface GetFarmModelProps {
    result: API.gerFarmsResponse;
    loading: boolean;
    loaded: boolean;
}

export default {
    namespace: 'farm',

    state: {
        result: {},
        loaded: false,
        loading: true
    },

    effects: {
        *queryFarm(
            { payload }: { payload: API.getFarmsParams },
            { call, put }: { call: any, put: any }) {
            yield put({ type: 'queryFarmStart' });
            const { data } = yield call(getFarms, payload);
            yield put({ type: 'queryFarmSuccess', payload: data });
        },
    },

    reducers: {
        queryFarmStart(
            state: GetFarmModelProps) { 
            return {
                ...state,
                loading: true,
            };
        },
        queryFarmSuccess(
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