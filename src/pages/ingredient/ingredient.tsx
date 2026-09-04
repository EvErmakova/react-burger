import { IngredientDetails } from '@components/ingredient-details/ingredient-details';

import type { FC } from 'react';

import styles from './ingredient.module.css';

export const Ingredient: FC = () => {
  return (
    <div className={styles.container}>
      <h1 className="text text_type_main-large mb-8">Детали ингредиента</h1>
      <IngredientDetails />
    </div>
  );
};
