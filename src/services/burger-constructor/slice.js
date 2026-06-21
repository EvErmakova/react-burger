import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  bun: null,
  fillings: [],
};

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
    clearConstructor: () => initialState,
  },
  selectors: {
    selectConstructorBun: (state) => state.bun,
    selectConstructorFillings: (state) => state.fillings,
  },
});

export const burgerConstructorReducer = burgerConstructorSlice.reducer;

export const { addIngredient, removeIngredient, clearConstructor } =
  burgerConstructorSlice.actions;

export const { selectConstructorBun, selectConstructorFillings } =
  burgerConstructorSlice.selectors;
