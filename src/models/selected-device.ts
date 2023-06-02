export interface SelectedDeviceModelProps {
  type: string;
  farmId: string;
  deviceId: string;
  open: boolean;
  error?: any;
}

export default {
  namespace: 'selectedDevice',

  state: {
    type: '',
    farmId: '',
    deviceId: '',
    open: false,
    error: {},
  },

  reducers: {
    setSelectedDevice(
      state: SelectedDeviceModelProps,
      { payload }: { payload: { type: string; farmId: string; deviceId: string } },
    ) {
      const { type, farmId, deviceId } = payload;

      return {
        ...state,
        type,
        farmId,
        deviceId,
        open: true,
      };
    },

    setDeviceClose() {
      return {
        type: '',
        farmId: '',
        deviceId: '',
        open: false,
        error: {},
      };
    },
  },
};
