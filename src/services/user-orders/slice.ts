import { createSelector, createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

import type { TUserOrdersResponse } from '@utils/types';

import type { TUserOrdersState } from './types';

const initialState: TUserOrdersState = {
  orders: [],
  isLoaded: false,
  error: null,
};

export const userOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {
    onOpen: (state) => {
      state.error = null;
    },
    onError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    onMessage: (state, action: PayloadAction<TUserOrdersResponse>) => {
      if (!('orders' in action.payload)) {
        state.error = action.payload.message;
        return;
      }

      state.orders = action.payload.orders;
      state.isLoaded = true;
      state.error = null;
    },
  },
  selectors: {
    getUserOrdersLoaded: (state) => state.isLoaded,
    getUserOrdersError: (state) => state.error,
    getUserOrders: createSelector(
      (state: TUserOrdersState) => state.orders,
      (orders) =>
        [...orders].sort(
          (first, second) => Date.parse(second.createdAt) - Date.parse(first.createdAt)
        )
    ),
  },
});

export const { getUserOrders, getUserOrdersError, getUserOrdersLoaded } =
  userOrdersSlice.selectors;
