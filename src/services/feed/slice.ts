import { createSlice } from '@reduxjs/toolkit';

import { MOCK_FEED_ORDERS, MOCK_FEED_TOTAL, MOCK_FEED_TOTAL_TODAY } from '@utils/mock';

import type { TFeedState } from './types';

const initialState: TFeedState = {
  orders: MOCK_FEED_ORDERS,
  total: MOCK_FEED_TOTAL,
  totalToday: MOCK_FEED_TOTAL_TODAY,
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getFeedOrders: (state) => state.orders,
    getFeedTotal: (state) => state.total,
    getFeedTotalToday: (state) => state.totalToday,
  },
});

export const { getFeedOrders, getFeedTotal, getFeedTotalToday } = feedSlice.selectors;
