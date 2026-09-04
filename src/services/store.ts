import { configureStore } from '@reduxjs/toolkit';

import { connectFeed, disconnectFeed } from './feed/actions';
import { feedSlice } from './feed/slice';
import { socketMiddleware } from './middleware/socket-middleware';
import { rootReducer } from './reducer';

import type { TFeedResponse } from '@utils/types';

const feedSocketMiddleware = socketMiddleware<TFeedResponse>({
  connect: connectFeed,
  disconnect: disconnectFeed,
  onOpen: feedSlice.actions.onOpen,
  onError: feedSlice.actions.onError,
  onMessage: feedSlice.actions.onMessage,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(feedSocketMiddleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
