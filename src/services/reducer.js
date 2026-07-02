import { combineSlices } from '@reduxjs/toolkit';

import { burgerConstructorSlice } from './burger-constructor/slice';
import { ingredientDetailsSlice } from './ingredient-details/slice';
import { ingredientsSlice } from './ingredients/slice';
import { orderSlice } from './order/slice';

export const rootReducer = combineSlices(
  ingredientsSlice,
  burgerConstructorSlice,
  ingredientDetailsSlice,
  orderSlice
);
