import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import {
  checkUserAuth,
  getUserData,
  loginUser,
  logoutUser,
  registerUser,
  updateUserData,
} from './actions';

import type { TAuthState } from './types';

const initialState: TAuthState = {
  user: null,
  isAuthChecked: false,
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  selectors: {
    getUser: (state) => state.user,
    getIsAuthenticated: (state) => Boolean(state.user),
    getIsAuthChecked: (state) => state.isAuthChecked,
    getAuthLoading: (state) => state.isLoading,
    getAuthError: (state) => state.error,
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addMatcher(isAnyOf(checkUserAuth.fulfilled, checkUserAuth.rejected), (state) => {
        state.isAuthChecked = true;
      })
      .addMatcher(
        isAnyOf(registerUser.fulfilled, loginUser.fulfilled),
        (state, action) => {
          state.isLoading = false;
          state.user = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(registerUser.pending, loginUser.pending, logoutUser.pending),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(registerUser.rejected, loginUser.rejected, logoutUser.rejected),
        (state, action) => {
          state.isLoading = false;
          state.error = action.error.message ?? null;
        }
      );
  },
});

export const {
  getAuthError,
  getAuthLoading,
  getIsAuthChecked,
  getIsAuthenticated,
  getUser,
} = authSlice.selectors;
