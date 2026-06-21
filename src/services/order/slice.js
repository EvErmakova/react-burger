import { createSlice } from '@reduxjs/toolkit';

import { createOrder } from './actions';

const initialState = {
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
    selectOrderNumber: (state) => state.number,
    selectOrderLoading: (state) => state.isLoading,
    selectOrderError: (state) => state.error,
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
        state.error = action.error.message;
      });
  },
});

export const { clearOrder } = orderSlice.actions;

export const { selectOrderNumber, selectOrderLoading, selectOrderError } =
  orderSlice.selectors;
