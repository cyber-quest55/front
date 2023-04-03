import { getFarms } from "@/services/farm";

export interface GetFarmModelProps {
    result: API.GetFarmResponse;
    loading: boolean;
    loaded: boolean;
    selectedFarm: number;
}

export default {
    namespace: 'farm',

    state: {
        result: {},
        loaded: false,
        loading: true,
        selectedFarm: 0
    },

    effects: {
        *queryFarm(
            { payload }: { payload: API.GetFarmsParams },
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
            { payload }: { payload: API.GetFarmResponse }) { 
            return {
                ...state,
                loading: false,
                loaded: true,
                selectedFarm: payload.list[0]?.id,
                result: payload,
            };
        },
        setSelectedFarm(
            state: GetFarmModelProps,
            { payload }: { payload: number}) { 
            return {
                ...state, 
                selectedFarm: payload, 
            };
        },
    },
}; 