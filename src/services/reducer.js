import { combineSlices } from '@reduxjs/toolkit';

import { burgerConstructorSlice } from './burger-constructor/slice';
import { ingredientsSlice } from './ingredients/slice';
import { orderSlice } from './order/slice';

export const rootReducer = combineSlices(
  ingredientsSlice,
  burgerConstructorSlice,
  orderSlice
);
