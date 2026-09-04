import { configureStore } from '@reduxjs/toolkit';

import { connectFeed, disconnectFeed } from './feed/actions';
import { feedSlice } from './feed/slice';
import { socketMiddleware } from './middleware/socket-middleware';
import { rootReducer } from './reducer';
import { connectUserOrders, disconnectUserOrders } from './user-orders/actions';
import { userOrdersListener } from './user-orders/listeners';
import { userOrdersSlice } from './user-orders/slice';

import type { TFeedResponse, TUserOrdersResponse } from '@utils/types';

const feedSocketMiddleware = socketMiddleware<TFeedResponse>({
  connect: connectFeed,
  disconnect: disconnectFeed,
  onOpen: feedSlice.actions.onOpen,
  onError: feedSlice.actions.onError,
  onMessage: feedSlice.actions.onMessage,
});

const userOrdersSocketMiddleware = socketMiddleware<TUserOrdersResponse>({
  connect: connectUserOrders,
  disconnect: disconnectUserOrders,
  onOpen: userOrdersSlice.actions.onOpen,
  onError: userOrdersSlice.actions.onError,
  onMessage: userOrdersSlice.actions.onMessage,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(userOrdersListener.middleware)
      .concat(feedSocketMiddleware, userOrdersSocketMiddleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
