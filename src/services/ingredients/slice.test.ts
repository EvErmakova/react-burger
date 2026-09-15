import { describe, expect, it } from 'vitest';

import { fetchIngredients } from './actions';
import { ingredientsSlice } from './slice';

import type { TIngredient } from '@utils/types';

import type { TIngredientsState } from './types';

const reducer = ingredientsSlice.reducer;

const initialState: TIngredientsState = {
  items: [],
  isLoading: true,
  error: null,
};

const ingredients: TIngredient[] = [
  {
    _id: 'bun-1',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'bun.png',
    image_mobile: 'bun-mobile.png',
    image_large: 'bun-large.png',
    __v: 0,
  },
  {
    _id: 'sauce-1',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'sauce.png',
    image_mobile: 'sauce-mobile.png',
    image_large: 'sauce-large.png',
    __v: 0,
  },
];

describe('ingredientsSlice', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('fetchIngredients', () => {
    it('pending: turns loading on and clears the error', () => {
      const state = reducer(
        { items: ingredients, isLoading: false, error: 'Failed to load' },
        fetchIngredients.pending('requestId')
      );

      expect(state).toEqual({ items: ingredients, isLoading: true, error: null });
    });

    it('fulfilled: stores the ingredients and turns loading off', () => {
      const state = reducer(
        initialState,
        fetchIngredients.fulfilled(ingredients, 'requestId')
      );

      expect(state).toEqual({ items: ingredients, isLoading: false, error: null });
    });

    it('rejected: stores the error and turns loading off', () => {
      const state = reducer(
        initialState,
        fetchIngredients.rejected(new Error('Failed to load'), 'requestId')
      );

      expect(state).toEqual({ items: [], isLoading: false, error: 'Failed to load' });
    });

    it('rejected: writes null when the error has no message', () => {
      const state = reducer(
        initialState,
        fetchIngredients.rejected({ name: 'Error' } as Error, 'requestId')
      );

      expect(state).toEqual({ items: [], isLoading: false, error: null });
    });
  });

  describe('selectors', () => {
    const state: TIngredientsState = {
      items: ingredients,
      isLoading: false,
      error: 'Failed to load',
    };

    it('return the state fields', () => {
      expect(ingredientsSlice.selectors.getIngredients.unwrapped(state)).toEqual(
        ingredients
      );
      expect(ingredientsSlice.selectors.getIngredientsLoading.unwrapped(state)).toBe(
        false
      );
      expect(ingredientsSlice.selectors.getIngredientsError.unwrapped(state)).toBe(
        'Failed to load'
      );
    });
  });
});
