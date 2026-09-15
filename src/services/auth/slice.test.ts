import { describe, expect, it } from 'vitest';

import {
  checkUserAuth,
  getUserData,
  loginUser,
  logoutUser,
  registerUser,
  updateUserData,
} from './actions';
import { authSlice } from './slice';

import type { TLoginForm, TRegisterForm, TUpdateUserForm, TUser } from '@utils/types';

import type { TAuthState } from './types';

const reducer = authSlice.reducer;

const initialState: TAuthState = {
  user: null,
  isAuthChecked: false,
  isLoading: false,
  error: null,
};

const user: TUser = {
  name: 'Jane Doe',
  email: 'test@example.com',
};

const registerForm: TRegisterForm = {
  name: 'Jane Doe',
  email: 'test@example.com',
  password: 'password',
};

const loginForm: TLoginForm = {
  email: 'test@example.com',
  password: 'password',
};

const updateForm: TUpdateUserForm = {
  name: 'New name',
  email: 'new@example.com',
  password: 'password',
};

describe('authSlice', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('registerUser', () => {
    it('pending: turns loading on and clears the error', () => {
      const state = reducer(
        { ...initialState, error: 'Something went wrong' },
        registerUser.pending('requestId', registerForm)
      );

      expect(state).toEqual({ ...initialState, isLoading: true });
    });

    it('fulfilled: stores the user and turns loading off', () => {
      const state = reducer(
        { ...initialState, isLoading: true },
        registerUser.fulfilled(user, 'requestId', registerForm)
      );

      expect(state).toEqual({ ...initialState, user });
    });

    it('rejected: stores the error and turns loading off', () => {
      const state = reducer(
        { ...initialState, isLoading: true },
        registerUser.rejected(
          new Error('Registration failed'),
          'requestId',
          registerForm
        )
      );

      expect(state).toEqual({ ...initialState, error: 'Registration failed' });
    });

    it('rejected: writes null when the error has no message', () => {
      const state = reducer(
        initialState,
        registerUser.rejected({ name: 'Error' } as Error, 'requestId', registerForm)
      );

      expect(state.error).toBeNull();
    });
  });

  describe('loginUser', () => {
    it('pending: turns loading on and clears the error', () => {
      const state = reducer(
        { ...initialState, error: 'Something went wrong' },
        loginUser.pending('requestId', loginForm)
      );

      expect(state).toEqual({ ...initialState, isLoading: true });
    });

    it('fulfilled: stores the user and turns loading off', () => {
      const state = reducer(
        { ...initialState, isLoading: true },
        loginUser.fulfilled(user, 'requestId', loginForm)
      );

      expect(state).toEqual({ ...initialState, user });
    });

    it('rejected: stores the error and turns loading off', () => {
      const state = reducer(
        { ...initialState, isLoading: true },
        loginUser.rejected(new Error('Invalid credentials'), 'requestId', loginForm)
      );

      expect(state).toEqual({ ...initialState, error: 'Invalid credentials' });
    });
  });

  describe('logoutUser', () => {
    it('pending: turns loading on and clears the error', () => {
      const state = reducer(
        { ...initialState, user, error: 'Something went wrong' },
        logoutUser.pending('requestId')
      );

      expect(state).toEqual({ ...initialState, user, isLoading: true });
    });

    it('fulfilled: clears the user, loading and error', () => {
      const state = reducer(
        { user, isAuthChecked: true, isLoading: true, error: 'Some error' },
        logoutUser.fulfilled(undefined, 'requestId')
      );

      expect(state).toEqual({ ...initialState, isAuthChecked: true });
    });

    it('rejected: stores the error and turns loading off', () => {
      const state = reducer(
        { ...initialState, user, isLoading: true },
        logoutUser.rejected(new Error('Logout failed'), 'requestId')
      );

      expect(state).toEqual({ ...initialState, user, error: 'Logout failed' });
    });
  });

  describe('getUserData', () => {
    it('fulfilled: stores the user', () => {
      const state = reducer(initialState, getUserData.fulfilled(user, 'requestId'));

      expect(state).toEqual({ ...initialState, user });
    });
  });

  describe('updateUserData', () => {
    it('fulfilled: updates the user', () => {
      const updatedUser: TUser = { name: 'New name', email: 'new@example.com' };

      const state = reducer(
        { ...initialState, user },
        updateUserData.fulfilled(updatedUser, 'requestId', updateForm)
      );

      expect(state).toEqual({ ...initialState, user: updatedUser });
    });
  });

  describe('checkUserAuth', () => {
    it('fulfilled: marks the auth check as done', () => {
      const state = reducer(
        initialState,
        checkUserAuth.fulfilled(undefined, 'requestId', undefined)
      );

      expect(state).toEqual({ ...initialState, isAuthChecked: true });
    });

    it('rejected: marks the auth check as done', () => {
      const state = reducer(
        initialState,
        checkUserAuth.rejected(new Error('Some error'), 'requestId', undefined)
      );

      expect(state).toEqual({ ...initialState, isAuthChecked: true });
    });
  });
});
