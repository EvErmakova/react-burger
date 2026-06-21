import { createAsyncThunk } from '@reduxjs/toolkit';

import { createOrder as createOrderApi } from '@utils/api';

export const createOrder = createAsyncThunk(
  'order/create',
  async (ingredientIds) => await createOrderApi(ingredientIds)
);
