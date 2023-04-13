import { getFarms } from "@/services/farm";

export interface GetFarmModelProps {
    result: API.GetFarmResponse;
    loading: boolean;
    loaded: boolean;
    selectedFarm: Models.Farm;
}

export default {
    namespace: 'farm',

    state: {
        result: {},
        loaded: false,
        loading: true,
        selectedFarm: {}
    },

    effects: {
        *queryFarm(
            { payload }: { payload: any },
            { call, put }: { call: any, put: any }) {
            yield put({ type: 'queryFarmStart' });
            const { data } = yield call(getFarms, payload);
            yield put({ type: 'queryFarmSuccess', payload: { data, id: payload.id } });
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
            { payload }: { payload: {data: API.GetFarmResponse, id: string }}) {
            return {
                ...state,
                loading: false,
                loaded: true,
                selectedFarm: payload.data.list?.find(item => item.id === parseInt(payload.id)),
                result: payload.data,
            };
        },
        setSelectedFarm(
            state: GetFarmModelProps,
            { payload }: { payload: Models.Farm }) {
            return {
                ...state,
                selectedFarm: payload,
            };
        },
    },
}; 