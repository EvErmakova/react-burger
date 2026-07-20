import type { TConstructorIngredient } from '@utils/types';

export type TBurgerConstructorState = {
  bun: TConstructorIngredient | null;
  fillings: TConstructorIngredient[];
};

export type TMoveIngredientPayload = {
  fromIndex: number;
  toIndex: number;
};
