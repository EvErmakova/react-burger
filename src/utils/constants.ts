import type { TIngredientTab, TIngredientType } from '@utils/types';

export const BASE_URL = 'https://new-stellarburgers.education-services.ru/api';

export const DND_TYPES = {
  INGREDIENT: 'ingredient',
  CONSTRUCTOR_INGREDIENT: 'constructor-ingredient',
} as const;

export const INGREDIENT_TYPES = {
  BUN: 'bun',
  SAUCE: 'sauce',
  MAIN: 'main',
} satisfies Record<string, TIngredientType>;

export const INGREDIENT_TABS: TIngredientTab[] = [
  { value: INGREDIENT_TYPES.BUN, title: 'Булки' },
  { value: INGREDIENT_TYPES.SAUCE, title: 'Соусы' },
  { value: INGREDIENT_TYPES.MAIN, title: 'Начинки' },
];
