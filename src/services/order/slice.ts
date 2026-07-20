import { createSlice } from '@reduxjs/toolkit';

import { createOrder } from './actions';

import type { TOrderState } from './types';

const initialState: TOrderState = {
  number: null,
  name: null,
  isLoading: false,
  error: null,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: () => initialState,
  },
  selectors: {
    getOrderNumber: (state) => state.number,
    getOrderLoading: (state) => state.isLoading,
    getOrderError: (state) => state.error,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.number = action.payload.order.number;
        state.name = action.payload.name;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
      });
  },
});

export const { clearOrder } = orderSlice.actions;

export const { getOrderNumber, getOrderLoading, getOrderError } = orderSlice.selectors;
