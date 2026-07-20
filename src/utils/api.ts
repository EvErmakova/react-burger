import { BASE_URL } from '@utils/constants';

import type {
  TAuthResponse,
  TIngredient,
  TIngredientsResponse,
  TLoginForm,
  TOrderResponse,
  TRegisterForm,
  TRequestOptions,
  TServerResponse,
  TTokens,
  TUpdateUserForm,
  TUserResponse,
} from '@utils/types';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

const checkResponse = async <T>(res: Response): Promise<T> => {
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    return Promise.reject(new Error(data?.message || `Ошибка ${res.status}`));
  }
  return data;
};

const checkSuccess = <T extends { success: boolean }>(data: T): Promise<T> => {
  if (data?.success) {
    return Promise.resolve(data);
  }
  return Promise.reject(new Error('Ответ API не success'));
};

const request = <T extends { success: boolean }>(
  endpoint: string,
  options?: TRequestOptions
): Promise<T> =>
  fetch(`${BASE_URL}/${endpoint}`, options)
    .then((res) => checkResponse<T>(res))
    .then(checkSuccess);

export const getAccessToken = (): string | null =>
  localStorage.getItem(ACCESS_TOKEN_KEY);

export const getRefreshToken = (): string | null =>
  localStorage.getItem(REFRESH_TOKEN_KEY);

export const setTokens = ({ accessToken, refreshToken }: TTokens): void => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export const clearTokens = (): void => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const refreshToken = (): Promise<TServerResponse<TTokens>> =>
  request<TServerResponse<TTokens>>('auth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: getRefreshToken() }),
  });

export const requestWithRefresh = async <T extends { success: boolean }>(
  endpoint: string,
  options: TRequestOptions
): Promise<T> => {
  try {
    return await request<T>(endpoint, options);
  } catch (err) {
    if (err instanceof Error && err.message === 'jwt expired') {
      const refreshData = await refreshToken();
      setTokens(refreshData);
      return await request<T>(endpoint, {
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

export const getIngredients = (): Promise<TIngredient[]> =>
  request<TIngredientsResponse>('ingredients').then((data) => data.data);

export const getUser = (): Promise<TUserResponse> =>
  requestWithRefresh<TUserResponse>('auth/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: getAccessToken() ?? '',
    },
  });

export const updateUser = ({
  name,
  email,
  password,
}: TUpdateUserForm): Promise<TUserResponse> =>
  requestWithRefresh<TUserResponse>('auth/user', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: getAccessToken() ?? '',
    },
    body: JSON.stringify({ name, email, password }),
  });

export const createOrder = (ingredientIds: string[]): Promise<TOrderResponse> =>
  requestWithRefresh<TOrderResponse>('orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: getAccessToken() ?? '',
    },
    body: JSON.stringify({ ingredients: ingredientIds }),
  });

export const register = ({
  email,
  password,
  name,
}: TRegisterForm): Promise<TAuthResponse> =>
  request<TAuthResponse>('auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, name }),
  });

export const login = ({ email, password }: TLoginForm): Promise<TAuthResponse> =>
  request<TAuthResponse>('auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

export const logout = (): Promise<TServerResponse<Record<string, never>>> =>
  request('auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: getRefreshToken() }),
  });

export const forgotPassword = ({
  email,
}: {
  email: string;
}): Promise<TServerResponse<Record<string, never>>> =>
  request('password-reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

export const resetPassword = ({
  password,
  token,
}: {
  password: string;
  token: string;
}): Promise<TServerResponse<Record<string, never>>> =>
  request('password-reset/reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, token }),
  });
