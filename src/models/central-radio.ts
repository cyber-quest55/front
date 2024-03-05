import { getSocketBinds } from '../utils/formater/get-socket-binds';


export default {
  namespace: 'centralRadio',
  state: {

  },
  effects: {
    //  Subscribe to websockets
    *onInit({}, { put, select }: { put: any; select: any }) {
      const state = yield select((state) => state.farmById);
      console.log('[here with state]', state)

      const channels = [
        {
          title: `d@pivot@${787}`,
          id: state.id,
          binds: [
            {
              callback: ['terst'],
              event: 'ControllerConfig_standard',
              id: state.id,
            },
            {
              callback: ['terst'],
              event: 'pivot_config',
              id: state.id,
            },
          ],
        },
        {
          title: `d@irpd@${345}`,
          id: state.id,
          binds: [
            {
              callback: ['terst'],
              event: 'IrpdConfigV5_standard',
              id: state.id,
            },
            {
              callback: ['terst'],
              event: 'irpd_config',
              id: state.id,
            },
          ],
        },
        {
          title: `d@imeter@${432}`,
          id: state.id,
          binds: [
            {
              callback: ['terst'],
              event: 'IMeterConfig_standard',
              id: state.id,
            },
          ],
        },
      ];

      yield getSocketBinds(channels, put, 'subscribe');
    },
    // Unsubscribe to websockets
    *onDestroy({ payload }, { put, select }: { put: any; select: any }) {
      const state = yield select((state) => state.farmById);

      const channels = [
        {
          title: `d@pivot@${787}`,
          id: state.id,
          binds: [
            {
              callback: ['terst'],
              event: 'ControllerConfig_standard',
              id: state.id,
            },
            {
              callback: ['terst'],
              event: 'pivot_config',
              id: state.id,
            },
          ],
        },
        {
          title: `d@irpd@${345}`,
          id: state.id,
          binds: [
            {
              callback: ['terst'],
              event: 'IrpdConfigV5_standard',
              id: state.id,
            },
            {
              callback: ['terst'],
              event: 'irpd_config',
              id: state.id,
            },
          ],
        },
        {
          title: `d@imeter@${432}`,
          id: state.id,
          binds: [
            {
              callback: ['terst'],
              event: 'IMeterConfig_standard',
              id: state.id,
            },
          ],
        },
      ];

      yield getSocketBinds(channels, put, 'unsubscribe');
    },
  }
}