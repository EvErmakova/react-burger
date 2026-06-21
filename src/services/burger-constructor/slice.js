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
    moveIngredient: (state, action) => {
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
  selectors: {
    selectConstructorBun: (state) => state.bun,
    selectConstructorFillings: (state) => state.fillings,
    selectIngredientCount: (state, id) => {
      const bunCount = state.bun?._id === id ? 2 : 0;
      const fillingsCount = state.fillings.filter(
        (ingredient) => ingredient._id === id
      ).length;
      return bunCount + fillingsCount;
    },
  },
});

export const burgerConstructorReducer = burgerConstructorSlice.reducer;

export const { addIngredient, removeIngredient, moveIngredient, clearConstructor } =
  burgerConstructorSlice.actions;

export const { selectConstructorBun, selectConstructorFillings, selectIngredientCount } =
  burgerConstructorSlice.selectors;
