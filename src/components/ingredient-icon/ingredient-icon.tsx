import type { FC } from 'react';

import type { TIngredientIconProps } from './types';

import styles from './ingredient-icon.module.css';

export const IngredientIcon: FC<TIngredientIconProps> = ({ ingredient, count }) => (
  <div className={styles.icon}>
    <img src={ingredient.image_mobile} alt={ingredient.name} className={styles.image} />
    {!!count && (
      <span className={`${styles.counter} text text_type_main-default`}>+{count}</span>
    )}
  </div>
);
