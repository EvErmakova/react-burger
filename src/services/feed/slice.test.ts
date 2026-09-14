import { describe, expect, it } from 'vitest';

import { feedSlice } from './slice';

import type { TFeedResponse, TOrder } from '@utils/types';

import type { TFeedState } from './types';

const reducer = feedSlice.reducer;
const { onError, onMessage, onOpen } = feedSlice.actions;

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoaded: false,
  error: null,
};

const doneOrder: TOrder = {
  _id: 'order-1',
  ingredients: ['bun-1', 'sauce-1'],
  status: 'done',
  name: 'Краторный бургер',
  createdAt: '2024-05-01T10:00:00.000Z',
  updatedAt: '2024-05-01T10:01:00.000Z',
  number: 1,
};

const pendingOrder: TOrder = {
  ...doneOrder,
  _id: 'order-2',
  status: 'pending',
  name: 'Флюоресцентный бургер',
  createdAt: '2024-05-02T10:00:00.000Z',
  number: 2,
};

const createdOrder: TOrder = {
  ...doneOrder,
  _id: 'order-3',
  status: 'created',
  name: 'Space бургер',
  createdAt: '2024-05-03T10:00:00.000Z',
  number: 3,
};

const feedResponse: TFeedResponse = {
  success: true,
  orders: [doneOrder, pendingOrder],
  total: 100,
  totalToday: 10,
};

describe('feedSlice', () => {
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
    it('stores the orders and the counters', () => {
      const state = reducer(initialState, onMessage(feedResponse));

      expect(state).toEqual({
        orders: [doneOrder, pendingOrder],
        total: 100,
        totalToday: 10,
        isLoaded: true,
        error: null,
      });
    });

    it('clears a previously received error', () => {
      const state = reducer(
        { ...initialState, error: 'Socket error' },
        onMessage(feedResponse)
      );

      expect(state.error).toBeNull();
    });

    it('filters out malformed orders', () => {
      const state = reducer(
        initialState,
        onMessage({
          ...feedResponse,
          orders: [
            doneOrder,
            { ...pendingOrder, status: 'broken' } as unknown as TOrder,
          ],
        })
      );

      expect(state.orders).toEqual([doneOrder]);
    });

    it('writes an error and keeps the orders on success: false', () => {
      const state = reducer(
        initialState,
        onMessage({ ...feedResponse, success: false })
      );

      expect(state).toEqual({ ...initialState, error: 'Ответ сервера не success' });
    });
  });

  describe('selectors', () => {
    const state: TFeedState = {
      orders: [doneOrder, pendingOrder, createdOrder],
      total: 100,
      totalToday: 10,
      isLoaded: true,
      error: 'Socket error',
    };

    it('return the state fields', () => {
      expect(feedSlice.selectors.getFeedOrders.unwrapped(state)).toEqual(state.orders);
      expect(feedSlice.selectors.getFeedTotal.unwrapped(state)).toBe(100);
      expect(feedSlice.selectors.getFeedTotalToday.unwrapped(state)).toBe(10);
      expect(feedSlice.selectors.getFeedLoaded.unwrapped(state)).toBe(true);
      expect(feedSlice.selectors.getFeedError.unwrapped(state)).toBe('Socket error');
    });

    it('getDoneOrders returns only the done orders', () => {
      expect(feedSlice.selectors.getDoneOrders.unwrapped(state)).toEqual([doneOrder]);
    });

    it('getPendingOrders returns every order that is not done', () => {
      expect(feedSlice.selectors.getPendingOrders.unwrapped(state)).toEqual([
        pendingOrder,
        createdOrder,
      ]);
    });
  });
});
