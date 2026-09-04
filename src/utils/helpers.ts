import { ORDER_STATUSES } from '@utils/constants';

import type {
  TCountedIngredient,
  TIngredient,
  TOrder,
  TOrderStatus,
} from '@utils/types';

export const resolveOrderIngredients = (
  ids: string[],
  ingredients: TIngredient[]
): TIngredient[] =>
  ids
    .map((id) => ingredients.find((ingredient) => ingredient._id === id))
    .filter((ingredient): ingredient is TIngredient => Boolean(ingredient));

export const countOrderIngredients = (
  ingredients: TIngredient[]
): TCountedIngredient[] => {
  const counted = new Map<string, TCountedIngredient>();

  ingredients.forEach((ingredient) => {
    const item = counted.get(ingredient._id);

    if (item) {
      item.count += 1;
      return;
    }

    counted.set(ingredient._id, { ingredient, count: 1 });
  });

  return [...counted.values()];
};

export const getOrderPrice = (ingredients: TIngredient[]): number =>
  ingredients.reduce((total, ingredient) => total + ingredient.price, 0);

const ORDER_STATUS_VALUES: string[] = Object.values(ORDER_STATUSES);

const isOrderStatus = (value: unknown): value is TOrderStatus =>
  typeof value === 'string' && ORDER_STATUS_VALUES.includes(value);

export const isDisplayableOrder = (value: unknown): value is TOrder => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const order = value as Partial<TOrder>;

  return (
    typeof order._id === 'string' &&
    order._id.length > 0 &&
    typeof order.number === 'number' &&
    typeof order.name === 'string' &&
    order.name.length > 0 &&
    isOrderStatus(order.status) &&
    Array.isArray(order.ingredients) &&
    order.ingredients.every((id) => typeof id === 'string') &&
    typeof order.createdAt === 'string' &&
    !Number.isNaN(Date.parse(order.createdAt))
  );
};
