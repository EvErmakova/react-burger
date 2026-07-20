import { combineSlices } from '@reduxjs/toolkit';

import { authSlice } from './auth/slice';
import { burgerConstructorSlice } from './burger-constructor/slice';
import { ingredientsSlice } from './ingredients/slice';
import { orderSlice } from './order/slice';

export const rootReducer = combineSlices(
  authSlice,
  burgerConstructorSlice,
  ingredientsSlice,
  orderSlice
);
