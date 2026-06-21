import { combineReducers } from '@reduxjs/toolkit';

import { ingredientDetailsReducer } from './ingredient-details/slice';
import { ingredientsReducer } from './ingredients/slice';
import { orderReducer } from './order/slice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  ingredientDetails: ingredientDetailsReducer,
  order: orderReducer,
});
