import { describe, expect, it } from 'vitest';

import { createOrder } from '@services/order/actions';

import {
  addIngredient,
  burgerConstructorSlice,
  clearConstructor,
  moveIngredient,
  removeIngredient,
} from './slice';

import type { TConstructorIngredient, TIngredient, TOrderResponse } from '@utils/types';

import type { TBurgerConstructorState } from './types';

const reducer = burgerConstructorSlice.reducer;

const initialState: TBurgerConstructorState = {
  bun: null,
  fillings: [],
};

const bun: TIngredient = {
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
};

const sauce: TIngredient = {
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
};

const main: TIngredient = {
  _id: 'main-1',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'main.png',
  image_mobile: 'main-mobile.png',
  image_large: 'main-large.png',
  __v: 0,
};

const withUniqueId = (
  ingredient: TIngredient,
  uniqueId: string
): TConstructorIngredient => ({ ...ingredient, uniqueId });

const orderResponse: TOrderResponse = {
  success: true,
  name: 'Краторный бургер',
  order: { number: 12345 },
};

describe('burgerConstructorSlice', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('addIngredient', () => {
    it('puts a bun into bun', () => {
      const state = reducer(initialState, addIngredient(bun));

      expect(state.bun).toMatchObject(bun);
      expect(state.fillings).toEqual([]);
    });

    it('replaces the previously chosen bun', () => {
      const otherBun: TIngredient = {
        ...bun,
        _id: 'bun-2',
        name: 'Флюоресцентная булка',
      };

      const state = reducer(
        { ...initialState, bun: withUniqueId(bun, 'unique-1') },
        addIngredient(otherBun)
      );

      expect(state.bun).toMatchObject(otherBun);
    });

    it('appends a filling to the end of the list', () => {
      const withSauce = reducer(initialState, addIngredient(sauce));
      const state = reducer(withSauce, addIngredient(main));

      expect(state.bun).toBeNull();
      expect(state.fillings).toHaveLength(2);
      expect(state.fillings[0]).toMatchObject(sauce);
      expect(state.fillings[1]).toMatchObject(main);
    });

    it('gives every filling its own uniqueId', () => {
      const withFirst = reducer(initialState, addIngredient(sauce));
      const state = reducer(withFirst, addIngredient(sauce));

      const [first, second] = state.fillings;

      expect(first?.uniqueId).toBeTruthy();
      expect(second?.uniqueId).toBeTruthy();
      expect(first?.uniqueId).not.toBe(second?.uniqueId);
    });
  });

  describe('removeIngredient', () => {
    it('removes a filling by uniqueId', () => {
      const state = reducer(
        {
          bun: withUniqueId(bun, 'bun-unique'),
          fillings: [withUniqueId(sauce, 'unique-1'), withUniqueId(main, 'unique-2')],
        },
        removeIngredient('unique-1')
      );

      expect(state.fillings).toEqual([withUniqueId(main, 'unique-2')]);
      expect(state.bun).toEqual(withUniqueId(bun, 'bun-unique'));
    });

    it('leaves the list untouched when the uniqueId is not found', () => {
      const fillings = [withUniqueId(sauce, 'unique-1')];

      const state = reducer({ ...initialState, fillings }, removeIngredient('unknown'));

      expect(state.fillings).toEqual(fillings);
    });
  });

  describe('moveIngredient', () => {
    it('moves a filling down', () => {
      const state = reducer(
        {
          ...initialState,
          fillings: [
            withUniqueId(sauce, 'unique-1'),
            withUniqueId(main, 'unique-2'),
            withUniqueId(main, 'unique-3'),
          ],
        },
        moveIngredient({ fromIndex: 0, toIndex: 2 })
      );

      expect(state.fillings.map((item) => item.uniqueId)).toEqual([
        'unique-2',
        'unique-3',
        'unique-1',
      ]);
    });

    it('moves a filling up', () => {
      const state = reducer(
        {
          ...initialState,
          fillings: [
            withUniqueId(sauce, 'unique-1'),
            withUniqueId(main, 'unique-2'),
            withUniqueId(main, 'unique-3'),
          ],
        },
        moveIngredient({ fromIndex: 2, toIndex: 0 })
      );

      expect(state.fillings.map((item) => item.uniqueId)).toEqual([
        'unique-3',
        'unique-1',
        'unique-2',
      ]);
    });

    it('does nothing when both indexes are the same', () => {
      const fillings = [withUniqueId(sauce, 'unique-1'), withUniqueId(main, 'unique-2')];

      const state = reducer(
        { ...initialState, fillings },
        moveIngredient({ fromIndex: 1, toIndex: 1 })
      );

      expect(state.fillings).toEqual(fillings);
    });

    it('does nothing when there is no filling at the index', () => {
      const fillings = [withUniqueId(sauce, 'unique-1')];

      const state = reducer(
        { ...initialState, fillings },
        moveIngredient({ fromIndex: 5, toIndex: 0 })
      );

      expect(state.fillings).toEqual(fillings);
    });
  });

  describe('clearConstructor', () => {
    it('resets the state to the initial one', () => {
      const state = reducer(
        {
          bun: withUniqueId(bun, 'bun-unique'),
          fillings: [withUniqueId(sauce, 'unique-1')],
        },
        clearConstructor()
      );

      expect(state).toEqual(initialState);
    });
  });

  describe('createOrder', () => {
    it('fulfilled: clears the constructor', () => {
      const state = reducer(
        {
          bun: withUniqueId(bun, 'bun-unique'),
          fillings: [withUniqueId(sauce, 'unique-1')],
        },
        createOrder.fulfilled(orderResponse, 'requestId', ['bun-1', 'sauce-1', 'bun-1'])
      );

      expect(state).toEqual(initialState);
    });
  });

  describe('selectors', () => {
    const state: TBurgerConstructorState = {
      bun: withUniqueId(bun, 'bun-unique'),
      fillings: [withUniqueId(sauce, 'unique-1'), withUniqueId(main, 'unique-2')],
    };

    it('getConstructorBun and getConstructorFillings return the constructor content', () => {
      expect(
        burgerConstructorSlice.selectors.getConstructorBun.unwrapped(state)
      ).toEqual(state.bun);
      expect(
        burgerConstructorSlice.selectors.getConstructorFillings.unwrapped(state)
      ).toEqual(state.fillings);
    });

    it('getIngredientCount counts the bun twice', () => {
      expect(
        burgerConstructorSlice.selectors.getIngredientCount.unwrapped(state, 'bun-1')
      ).toBe(2);
    });

    it('getIngredientCount counts repeated fillings', () => {
      const withTwoSauces: TBurgerConstructorState = {
        ...state,
        fillings: [...state.fillings, withUniqueId(sauce, 'unique-3')],
      };

      expect(
        burgerConstructorSlice.selectors.getIngredientCount.unwrapped(
          withTwoSauces,
          'sauce-1'
        )
      ).toBe(2);
    });

    it('getIngredientCount returns 0 for a missing ingredient', () => {
      expect(
        burgerConstructorSlice.selectors.getIngredientCount.unwrapped(state, 'unknown')
      ).toBe(0);
    });

    it('getTotalPrice sums two buns and the fillings', () => {
      expect(burgerConstructorSlice.selectors.getTotalPrice.unwrapped(state)).toBe(
        bun.price * 2 + sauce.price + main.price
      );
    });

    it('getTotalPrice counts only the fillings when there is no bun', () => {
      expect(
        burgerConstructorSlice.selectors.getTotalPrice.unwrapped({
          ...state,
          bun: null,
        })
      ).toBe(sauce.price + main.price);
    });

    it('getOrderIngredients wraps the fillings with buns', () => {
      expect(
        burgerConstructorSlice.selectors.getOrderIngredients.unwrapped(state)
      ).toEqual(['bun-1', 'sauce-1', 'main-1', 'bun-1']);
    });

    it('getOrderIngredients returns an empty array when there is no bun', () => {
      expect(
        burgerConstructorSlice.selectors.getOrderIngredients.unwrapped({
          ...state,
          bun: null,
        })
      ).toEqual([]);
    });
  });
});
