import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  clearTokens,
  getAccessToken,
  getUser as getUserApi,
  login as loginApi,
  logout as logoutApi,
  register as registerApi,
  setTokens,
  updateUser as updateUserApi,
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

export const getUserData = createAsyncThunk('auth/getUser', async () => {
  const data = await getUserApi();
  return data.user;
});

export const updateUserData = createAsyncThunk('auth/updateUser', async (form) => {
  const data = await updateUserApi(form);
  return data.user;
});

export const checkUserAuth = createAsyncThunk(
  'auth/checkUser',
  async (_, { dispatch }) => {
    if (!getAccessToken()) {
      return;
    }
    try {
      await dispatch(getUserData()).unwrap();
    } catch {
      clearTokens();
    }
  }
);
