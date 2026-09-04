import type { TCountedIngredient, TIngredient } from '@utils/types';

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
