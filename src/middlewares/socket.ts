import { Socket } from 'socket.io-client';

const channelMap: { [id: string]: string } = {};

type Params = {
  dispatch: any;
}

export const socketMiddleware = (socket: Socket) => (params: Params) => (next: any) => (action: any) => {
  const { dispatch } = params;
  const { type, payload } = action;

  switch (type) {
    case 'socket/connect': {
      socket.connect();
      socket.on('connect', () => {});
      socket.on('disconnect', () => {});
      break;
    }

    case 'socket/subscribe': {
      socket.emit('subscribe', { channel: payload.channel });
      channelMap[payload.id] = payload.channel;
      break;
    }

    case 'socket/unsubscribe': {
      socket.emit('unsubscribe', { channel: payload.channel });
      delete channelMap[payload.id];
      break;
    }

    case 'socket/bind': {
      const cnh = channelMap[payload.id];
      socket.on(`${cnh}_${payload.event}`, (data: any) => {
        payload.callback?.map(item => dispatch({ type: item, payload: data }));
      });
      break;
    }

    case 'socket/unbind': {
      const cnh2 = channelMap[payload.id];
      socket.off(`${cnh2}_${payload.event}`);
      break;
    }

    case 'socket/disconnect': {
      socket.disconnect();
      break;
    }

    default: {
        break;
    }
  }

  return next(action);
};
