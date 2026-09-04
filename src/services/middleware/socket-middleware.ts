import { RECONNECT_DELAY } from '@utils/constants';

import type { Middleware } from '@reduxjs/toolkit';

import type { TSocketActions } from './types';

export const socketMiddleware = <TResponse>(
  actions: TSocketActions<TResponse>
): Middleware => {
  return (store) => {
    let socket: WebSocket | null = null;
    let url = '';
    let isClosedByUser = false;
    let reconnectTimer: ReturnType<typeof setTimeout> | null = null;

    const clearReconnectTimer = (): void => {
      if (reconnectTimer) {
        clearTimeout(reconnectTimer);
        reconnectTimer = null;
      }
    };

    const open = (): void => {
      socket = new WebSocket(url);

      socket.onopen = (): void => {
        if (actions.onOpen) {
          store.dispatch(actions.onOpen());
        }
      };

      socket.onerror = (): void => {
        store.dispatch(actions.onError('Ошибка соединения'));
      };

      socket.onmessage = (event: MessageEvent<string>): void => {
        try {
          store.dispatch(actions.onMessage(JSON.parse(event.data) as TResponse));
        } catch {
          store.dispatch(actions.onError('Не удалось разобрать ответ сервера'));
        }
      };

      socket.onclose = (): void => {
        socket = null;

        if (actions.onClose) {
          store.dispatch(actions.onClose());
        }

        if (!isClosedByUser) {
          reconnectTimer = setTimeout(open, RECONNECT_DELAY);
        }
      };
    };

    const close = (): void => {
      isClosedByUser = true;
      clearReconnectTimer();

      if (socket) {
        socket.onopen = null;
        socket.onerror = null;
        socket.onmessage = null;
        socket.onclose = null;
        socket.close();
        socket = null;
      }
    };

    return (next) => (action) => {
      if (actions.connect.match(action)) {
        close();
        url = action.payload;
        isClosedByUser = false;
        open();
      }

      if (actions.disconnect.match(action)) {
        close();
      }

      return next(action);
    };
  };
};
