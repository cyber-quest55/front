
type Bind = {
  callback: string[];
  event: string;
  id: string;
}

export type Channel = {
  title: string;
  id: string;
  binds: Bind[];
}

export function * getSocketBinds(channels: Channel[], put: any, type: "subscribe" | "unsubscribe"): string {
  let subscribeStr = type === "subscribe"? "socket/subscribe" : "socket/unsubscribe"
  let bindStr = type === "subscribe"? "socket/bind" : "socket/unbind"

  for (let i = 0; i < channels.length; i++) {
    const item = channels[i];
    yield put({ type: subscribeStr, payload: { channel: item.title, id: item.id } });

    for (let j = 0; j < item.binds.length; j++) {
      const bind = item.binds[j];
      yield put({
        type: bindStr,
        payload: {
          id: bind.id,
          callback: bind.callback,
          event: bind.event,
        },
      });
    }
  }
}
