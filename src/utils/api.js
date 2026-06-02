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

export const getIngredients = () =>
  fetch(`${BASE_URL}/ingredients`)
    .then(checkResponse)
    .then(checkSuccess)
    .then((data) => data.data);
