import { combineSlices } from '@reduxjs/toolkit';

import { authSlice } from './auth/slice';
import { burgerConstructorSlice } from './burger-constructor/slice';
import { feedSlice } from './feed/slice';
import { ingredientsSlice } from './ingredients/slice';
import { orderSlice } from './order/slice';
import { userOrdersSlice } from './user-orders/slice';

export const rootReducer = combineSlices(
  authSlice,
  burgerConstructorSlice,
  feedSlice,
  ingredientsSlice,
  orderSlice,
  userOrdersSlice
);
