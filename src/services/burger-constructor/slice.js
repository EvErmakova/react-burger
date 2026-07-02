import { createSelector, createSlice, nanoid } from '@reduxjs/toolkit';

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
    getConstructorBun: (state) => state.bun,
    getConstructorFillings: (state) => state.fillings,
    getIngredientCount: createSelector(
      (state) => state.bun,
      (state) => state.fillings,
      (_state, id) => id,
      (bun, fillings, id) => {
        const bunCount = bun?._id === id ? 2 : 0;
        const fillingsCount = fillings.filter(
          (ingredient) => ingredient._id === id
        ).length;
        return bunCount + fillingsCount;
      }
    ),
    getTotalPrice: createSelector(
      (state) => state.bun,
      (state) => state.fillings,
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
      (state) => state.bun,
      (state) => state.fillings,
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
