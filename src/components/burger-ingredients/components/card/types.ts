import type { TIngredient } from '@utils/types';

export type TIngredientCardProps = {
  ingredient: TIngredient;
  onClick: (ingredient: TIngredient) => void;
};
