import { createListenerMiddleware } from '@reduxjs/toolkit';

import { getUserOrdersSocketUrl, refreshToken, setTokens } from '@utils/api';
import { INVALID_TOKEN_MESSAGE } from '@utils/constants';

import { connectUserOrders, disconnectUserOrders } from './actions';
import { userOrdersSlice } from './slice';

export const userOrdersListener = createListenerMiddleware();

userOrdersListener.startListening({
  actionCreator: userOrdersSlice.actions.onMessage,
  effect: async (action, listenerApi) => {
    const { payload } = action;

    if ('orders' in payload || payload.message !== INVALID_TOKEN_MESSAGE) {
      return;
    }

    listenerApi.cancelActiveListeners();
    listenerApi.dispatch(disconnectUserOrders());

    try {
      const tokens = await refreshToken();
      setTokens(tokens);
      listenerApi.dispatch(
        connectUserOrders(getUserOrdersSocketUrl(tokens.accessToken))
      );
    } catch (err) {
      listenerApi.dispatch(
        userOrdersSlice.actions.onError(
          err instanceof Error ? err.message : 'Не удалось обновить токен'
        )
      );
    }
  },
});
