import { getPivotById } from "@/services/pivot";

export interface GetPivotModelProps {
    result: API.getPivotByIdResponse;
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
            { payload }: { payload: API.getPivotByIdParam },
            { call, put }: { call: any, put: any }) {
            yield put({ type: 'queryPivotStart' });
            const { data } = yield call(getPivotById, payload.id);
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
            { payload }: { payload: API.getPivotByIdResponse }
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