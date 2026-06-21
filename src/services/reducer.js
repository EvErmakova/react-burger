import { combineReducers } from '@reduxjs/toolkit';

import { burgerConstructorReducer } from './burger-constructor/slice';
import { ingredientDetailsReducer } from './ingredient-details/slice';
import { ingredientsReducer } from './ingredients/slice';
import { orderReducer } from './order/slice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredientDetails: ingredientDetailsReducer,
  order: orderReducer,
});
