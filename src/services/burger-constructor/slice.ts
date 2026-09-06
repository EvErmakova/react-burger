import { createSelector, createSlice, nanoid } from '@reduxjs/toolkit';

import { createOrder } from '@services/order/actions';

import type { PayloadAction } from '@reduxjs/toolkit';

import type { TConstructorIngredient, TIngredient } from '@utils/types';

import type { TBurgerConstructorState, TMoveIngredientPayload } from './types';

const initialState: TBurgerConstructorState = {
  bun: null,
  fillings: [],
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.fillings.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, uniqueId: nanoid() },
      }),
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.fillings = state.fillings.filter(
        (ingredient) => ingredient.uniqueId !== action.payload
      );
    },
    moveIngredient: (state, action: PayloadAction<TMoveIngredientPayload>) => {
      const { fromIndex, toIndex } = action.payload;

      if (fromIndex === toIndex) return;

      const movedIngredient = state.fillings[fromIndex];

      if (movedIngredient) {
        const newFillings = [...state.fillings];
        newFillings.splice(fromIndex, 1);
        newFillings.splice(toIndex, 0, movedIngredient);
        state.fillings = newFillings;
      }
    },
    clearConstructor: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(createOrder.fulfilled, () => initialState);
  },
  selectors: {
    getConstructorBun: (state) => state.bun,
    getConstructorFillings: (state) => state.fillings,
    getIngredientCount: createSelector(
      (state: TBurgerConstructorState) => state.bun,
      (state: TBurgerConstructorState) => state.fillings,
      (_state: TBurgerConstructorState, id: string) => id,
      (bun, fillings, id) => {
        const bunCount = bun?._id === id ? 2 : 0;
        const fillingsCount = fillings.filter(
          (ingredient) => ingredient._id === id
        ).length;
        return bunCount + fillingsCount;
      }
    ),
    getTotalPrice: createSelector(
      (state: TBurgerConstructorState) => state.bun,
      (state: TBurgerConstructorState) => state.fillings,
      (bun, fillings) => {
        const bunPrice = bun ? bun.price * 2 : 0;
        const fillingsPrice = fillings.reduce(
          (sum, ingredient) => sum + ingredient.price,
          0
        );
        return bunPrice + fillingsPrice;
      }
    ),
    getOrderIngredients: createSelector(
      (state: TBurgerConstructorState) => state.bun,
      (state: TBurgerConstructorState) => state.fillings,
      (bun, fillings) =>
        bun ? [bun._id, ...fillings.map((ingredient) => ingredient._id), bun._id] : []
    ),
  },
});

export const { addIngredient, removeIngredient, moveIngredient, clearConstructor } =
  burgerConstructorSlice.actions;

export const {
  getConstructorBun,
  getConstructorFillings,
  getIngredientCount,
  getTotalPrice,
  getOrderIngredients,
} = burgerConstructorSlice.selectors;
