import { createSlice, nanoid } from '@reduxjs/toolkit';

import { DEFAULT_INGREDIENTS } from '@components/burger-constructor/constants';

const emptyState = {
  bun: null,
  fillings: [],
};

const initialState = DEFAULT_INGREDIENTS.reduce(
  (state, ingredient) => {
    if (ingredient.type === 'bun') {
      state.bun = ingredient;
    } else {
      state.fillings.push({ ...ingredient, uniqueId: nanoid() });
    }
    return state;
  },
  { bun: null, fillings: [] }
);

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.fillings.push(action.payload);
        }
      },
      prepare: (ingredient) => ({
        payload: { ...ingredient, uniqueId: nanoid() },
      }),
    },
    removeIngredient: (state, action) => {
      state.fillings = state.fillings.filter(
        (ingredient) => ingredient.uniqueId !== action.payload
      );
    },
    clearConstructor: () => emptyState,
  },
  selectors: {
    selectConstructorBun: (state) => state.bun,
    selectConstructorFillings: (state) => state.fillings,
    selectIngredientCount: (state, id) => {
      const bunCount = state.bun?._id === id ? 1 : 0;
      const fillingsCount = state.fillings.filter(
        (ingredient) => ingredient._id === id
      ).length;
      return bunCount + fillingsCount;
    },
  },
});

export const burgerConstructorReducer = burgerConstructorSlice.reducer;

export const { addIngredient, removeIngredient, clearConstructor } =
  burgerConstructorSlice.actions;

export const { selectConstructorBun, selectConstructorFillings, selectIngredientCount } =
  burgerConstructorSlice.selectors;
