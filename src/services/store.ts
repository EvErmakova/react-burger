import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from './reducer';

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
