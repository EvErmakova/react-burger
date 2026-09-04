import type { TConstructorIngredient } from '@utils/types';

export type TCardProps = {
  ingredient: TConstructorIngredient;
  index?: number;
  type?: 'top' | 'bottom';
};

export type TDragItem = {
  index?: number;
};
