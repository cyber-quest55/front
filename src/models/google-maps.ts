
export interface GetGoogleMapsProps { 
    loading: boolean;
    loaded: boolean;
    error: any;
}

export default {
    namespace: 'googleMaps',

    state: {
        loaded: false,
        loading: true,
        error: {}
    },

    effects: {
    },

    reducers: {
        queryGoogleMapsError(
            state: GetGoogleMapsProps,
            { payload }: { payload: Error }
        ) {
            return {
                ...state,
                loading: false,
                error: payload
            };
        },
        queryGoogleMapsStart(
            state: GetGoogleMapsProps) {
            return {
                ...state,
                loading: true,
            };
        },
        queryGoogleMapsSuccess(
            state: GetGoogleMapsProps,
            { }) {
            return {
                ...state,
                loading: false,
                loaded: true,
                error: {}
            };
        },
    },
}; 