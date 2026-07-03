import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { loginUser, logoutUser, registerUser } from './actions';

const initialState = {
  user: null,
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
    getAuthLoading: (state) => state.isLoading,
    getAuthError: (state) => state.error,
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.fulfilled, () => initialState)
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
          state.error = action.error.message;
        }
      );
  },
});

export const { getUser, getIsAuthenticated, getAuthLoading, getAuthError } =
  authSlice.selectors;
