import { getPivots } from "@/services/pivot";

export interface GetPivotModelProps {
    result: API.GetPivotByFarmResponse;
    loading: boolean;
    loaded: boolean;
}

export default {
    namespace: 'pivot',

    state: {
        result: {},
        loaded: false,
        loading: true
    },

    effects: {
        *queryPivot(
            { payload }: { payload: API.GetPivotByFarmParam },
            { call, put }: { call: any, put: any }) {
            yield put({ type: 'queryPivotStart' });
            
            const { data } = yield call(getPivots, payload);
            yield put({ type: 'queryPivotSuccess', payload: data });
        },
    },

    reducers: {
        queryPivotStart(
            state: GetPivotModelProps,
        ) {
            return {
                ...state,
                loading: true,
            };
        },
        queryPivotSuccess(
            state: GetPivotModelProps,
            { payload }: { payload: API.GetPivotByFarmResponse }
        ) {
            return {
                ...state,
                loading: false,
                loaded: true,
                result: payload,
            };
        },
    },
}; 