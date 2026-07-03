import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  clearTokens,
  login as loginApi,
  logout as logoutApi,
  register as registerApi,
  setTokens,
} from '@utils/api';

export const registerUser = createAsyncThunk('auth/register', async (form) => {
  const data = await registerApi(form);
  setTokens(data);
  return data.user;
});

export const loginUser = createAsyncThunk('auth/login', async (form) => {
  const data = await loginApi(form);
  setTokens(data);
  return data.user;
});

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  await logoutApi();
  clearTokens();
});
