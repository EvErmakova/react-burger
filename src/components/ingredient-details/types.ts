import type { TIngredient } from '@utils/types';

export type TNutrientKey = keyof Pick<
  TIngredient,
  'calories' | 'proteins' | 'fat' | 'carbohydrates'
>;

export type TNutrient = {
  key: TNutrientKey;
  label: string;
};
