import { BASE_URL } from '@utils/constants';

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

export const getIngredients = () => request('ingredients').then((data) => data.data);

export const createOrder = (ingredientIds) =>
  request('orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ingredients: ingredientIds }),
  });
