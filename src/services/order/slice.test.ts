import { describe, expect, it } from 'vitest';

import { createOrder } from './actions';
import { clearOrder, orderSlice } from './slice';

import type { TOrderResponse } from '@utils/types';

import type { TOrderState } from './types';

const reducer = orderSlice.reducer;

const initialState: TOrderState = {
  number: null,
  name: null,
  isLoading: false,
  error: null,
};

const ingredientIds = ['bun-1', 'sauce-1', 'bun-1'];

const orderResponse: TOrderResponse = {
  success: true,
  name: 'Краторный бургер',
  order: { number: 12345 },
};

describe('orderSlice', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('clearOrder', () => {
    it('resets the state to the initial one', () => {
      const state = reducer(
        {
          number: 12345,
          name: 'Краторный бургер',
          isLoading: false,
          error: 'Some error',
        },
        clearOrder()
      );

      expect(state).toEqual(initialState);
    });
  });

  describe('createOrder', () => {
    it('pending: turns loading on and clears the error', () => {
      const state = reducer(
        { ...initialState, error: 'Failed to place the order' },
        createOrder.pending('requestId', ingredientIds)
      );

      expect(state).toEqual({ ...initialState, isLoading: true });
    });

    it('fulfilled: stores the order number and name', () => {
      const state = reducer(
        { ...initialState, isLoading: true },
        createOrder.fulfilled(orderResponse, 'requestId', ingredientIds)
      );

      expect(state).toEqual({
        number: 12345,
        name: 'Краторный бургер',
        isLoading: false,
        error: null,
      });
    });

    it('rejected: stores the error and turns loading off', () => {
      const state = reducer(
        { ...initialState, isLoading: true },
        createOrder.rejected(
          new Error('Failed to place the order'),
          'requestId',
          ingredientIds
        )
      );

      expect(state).toEqual({ ...initialState, error: 'Failed to place the order' });
    });

    it('rejected: writes null when the error has no message', () => {
      const state = reducer(
        { ...initialState, isLoading: true },
        createOrder.rejected({ name: 'Error' } as Error, 'requestId', ingredientIds)
      );

      expect(state).toEqual(initialState);
    });
  });

  describe('selectors', () => {
    const state: TOrderState = {
      number: 12345,
      name: 'Краторный бургер',
      isLoading: true,
      error: 'Failed to place the order',
    };

    it('return the state fields', () => {
      expect(orderSlice.selectors.getOrderNumber.unwrapped(state)).toBe(12345);
      expect(orderSlice.selectors.getOrderLoading.unwrapped(state)).toBe(true);
      expect(orderSlice.selectors.getOrderError.unwrapped(state)).toBe(
        'Failed to place the order'
      );
    });
  });
});
