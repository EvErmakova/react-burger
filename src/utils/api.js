import { BASE_URL } from '@utils/constants';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

const checkResponse = (res) => {
  if (!res.ok) {
    return Promise.reject(new Error(`Ошибка ${res.status}`));
  }
  return res.json();
};

const checkSuccess = (data) => {
  if (data?.success) {
    return data;
  }
  return Promise.reject(new Error('Ответ API не success'));
};

const request = (endpoint, options) =>
  fetch(`${BASE_URL}/${endpoint}`, options).then(checkResponse).then(checkSuccess);

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);

export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY);

export const setTokens = ({ accessToken, refreshToken }) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export const clearTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const refreshToken = () =>
  request('auth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: getRefreshToken() }),
  });

export const requestWithRefresh = async (endpoint, options) => {
  try {
    return await request(endpoint, options);
  } catch (err) {
    if (err?.message === 'jwt expired') {
      const refreshData = await refreshToken();
      setTokens(refreshData);
      return await request(endpoint, {
        ...options,
        headers: {
          ...options.headers,
          authorization: refreshData.accessToken,
        },
      });
    }
    return Promise.reject(err);
  }
};

export const getIngredients = () => request('ingredients').then((data) => data.data);

export const getUser = () =>
  requestWithRefresh('auth/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: getAccessToken(),
    },
  });

export const updateUser = ({ name, email, password }) =>
  requestWithRefresh('auth/user', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: getAccessToken(),
    },
    body: JSON.stringify({ name, email, password }),
  });

export const createOrder = (ingredientIds) =>
  requestWithRefresh('orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: getAccessToken(),
    },
    body: JSON.stringify({ ingredients: ingredientIds }),
  });

export const register = ({ email, password, name }) =>
  request('auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, name }),
  });

export const login = ({ email, password }) =>
  request('auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

export const logout = () =>
  request('auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: getRefreshToken() }),
  });

export const forgotPassword = ({ email }) =>
  request('password-reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

export const resetPassword = ({ password, token }) =>
  request('password-reset/reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, token }),
  });
