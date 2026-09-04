import { createSlice } from '@reduxjs/toolkit';

import { MOCK_USER_ORDERS } from '@utils/mock';

import type { TUserOrdersState } from './types';

const initialState: TUserOrdersState = {
  orders: MOCK_USER_ORDERS,
};

export const userOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {},
  selectors: {
    getUserOrders: (state) => state.orders,
  },
});

export const { getUserOrders } = userOrdersSlice.selectors;
