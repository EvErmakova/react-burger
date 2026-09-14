import type { TIngredient, TUser } from '../src/utils/types';

const IMAGE =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1" height="1"%3E%3C/svg%3E';

export const BUN: TIngredient = {
  _id: 'bun-1',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: IMAGE,
  image_mobile: IMAGE,
  image_large: IMAGE,
  __v: 0,
};

export const SAUCE: TIngredient = {
  _id: 'sauce-1',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: IMAGE,
  image_mobile: IMAGE,
  image_large: IMAGE,
  __v: 0,
};

export const MAIN: TIngredient = {
  _id: 'main-1',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: IMAGE,
  image_mobile: IMAGE,
  image_large: IMAGE,
  __v: 0,
};

export const INGREDIENTS: TIngredient[] = [BUN, SAUCE, MAIN];

export const USER: TUser = {
  name: 'Jane Doe',
  email: 'jane@example.com',
};

export const ORDER_NUMBER = 12345;
