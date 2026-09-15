import { describe, expect, it } from 'vitest';

import { userOrdersSlice } from './slice';

import type { TOrder, TUserOrdersResponse } from '@utils/types';

import type { TUserOrdersState } from './types';

const reducer = userOrdersSlice.reducer;
const { onError, onMessage, onOpen } = userOrdersSlice.actions;

const initialState: TUserOrdersState = {
  orders: [],
  isLoaded: false,
  error: null,
};

const olderOrder: TOrder = {
  _id: 'order-1',
  ingredients: ['bun-1', 'sauce-1'],
  status: 'done',
  name: 'Краторный бургер',
  createdAt: '2024-05-01T10:00:00.000Z',
  updatedAt: '2024-05-01T10:01:00.000Z',
  number: 1,
};

const newerOrder: TOrder = {
  ...olderOrder,
  _id: 'order-2',
  status: 'pending',
  name: 'Флюоресцентный бургер',
  createdAt: '2024-05-03T10:00:00.000Z',
  number: 2,
};

const ordersResponse: TUserOrdersResponse = {
  success: true,
  orders: [olderOrder, newerOrder],
  total: 2,
  totalToday: 1,
};

describe('userOrdersSlice', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('onOpen', () => {
    it('clears the error', () => {
      const state = reducer({ ...initialState, error: 'Connection lost' }, onOpen());

      expect(state).toEqual(initialState);
    });
  });

  describe('onError', () => {
    it('stores the error text', () => {
      const state = reducer(initialState, onError('Socket error'));

      expect(state).toEqual({ ...initialState, error: 'Socket error' });
    });
  });

  describe('onMessage', () => {
    it('stores the user orders', () => {
      const state = reducer(initialState, onMessage(ordersResponse));

      expect(state).toEqual({
        orders: [olderOrder, newerOrder],
        isLoaded: true,
        error: null,
      });
    });

    it('clears a previously received error', () => {
      const state = reducer(
        { ...initialState, error: 'Socket error' },
        onMessage(ordersResponse)
      );

      expect(state.error).toBeNull();
    });

    it('filters out malformed orders', () => {
      const state = reducer(
        initialState,
        onMessage({
          ...ordersResponse,
          orders: [olderOrder, { ...newerOrder, number: '2' } as unknown as TOrder],
        })
      );

      expect(state.orders).toEqual([olderOrder]);
    });

    it('stores the message and keeps the orders on an error response', () => {
      const state = reducer(
        { ...initialState, orders: [olderOrder], isLoaded: true },
        onMessage({ success: false, message: 'Invalid or missing token' })
      );

      expect(state).toEqual({
        orders: [olderOrder],
        isLoaded: true,
        error: 'Invalid or missing token',
      });
    });
  });

  describe('selectors', () => {
    const state: TUserOrdersState = {
      orders: [olderOrder, newerOrder],
      isLoaded: true,
      error: 'Socket error',
    };

    it('return the state fields', () => {
      expect(userOrdersSlice.selectors.getUserOrdersLoaded.unwrapped(state)).toBe(true);
      expect(userOrdersSlice.selectors.getUserOrdersError.unwrapped(state)).toBe(
        'Socket error'
      );
    });

    it('getUserOrders sorts the orders from newest to oldest', () => {
      expect(userOrdersSlice.selectors.getUserOrders.unwrapped(state)).toEqual([
        newerOrder,
        olderOrder,
      ]);
    });

    it('getUserOrders does not mutate the source array', () => {
      userOrdersSlice.selectors.getUserOrders.unwrapped(state);

      expect(state.orders).toEqual([olderOrder, newerOrder]);
    });
  });
});
