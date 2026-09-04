import { createSelector, createSlice } from '@reduxjs/toolkit';

import { ORDER_STATUSES } from '@utils/constants';
import { isDisplayableOrder } from '@utils/helpers';

import type { PayloadAction } from '@reduxjs/toolkit';

import type { TFeedResponse } from '@utils/types';

import type { TFeedState } from './types';

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoaded: false,
  error: null,
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    onOpen: (state) => {
      state.error = null;
    },
    onError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    onMessage: (state, action: PayloadAction<TFeedResponse>) => {
      const { success, orders, total, totalToday } = action.payload;

      if (!success) {
        state.error = 'Ответ сервера не success';
        return;
      }

      state.orders = orders.filter(isDisplayableOrder);
      state.total = total;
      state.totalToday = totalToday;
      state.isLoaded = true;
      state.error = null;
    },
  },
  selectors: {
    getFeedOrders: (state) => state.orders,
    getFeedTotal: (state) => state.total,
    getFeedTotalToday: (state) => state.totalToday,
    getFeedLoaded: (state) => state.isLoaded,
    getFeedError: (state) => state.error,
    getDoneOrders: createSelector(
      (state: TFeedState) => state.orders,
      (orders) => orders.filter((order) => order.status === ORDER_STATUSES.DONE)
    ),
    getPendingOrders: createSelector(
      (state: TFeedState) => state.orders,
      (orders) => orders.filter((order) => order.status !== ORDER_STATUSES.DONE)
    ),
  },
});

export const {
  getDoneOrders,
  getFeedError,
  getFeedLoaded,
  getFeedOrders,
  getFeedTotal,
  getFeedTotalToday,
  getPendingOrders,
} = feedSlice.selectors;
