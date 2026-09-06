import { IngredientIcon } from '@components/ingredient-icon/ingredient-icon';
import { MAX_VISIBLE_INGREDIENTS } from '@utils/constants';

import type { FC } from 'react';

import type { TIngredientIconsProps } from './types';

import styles from './ingredient-icons.module.css';

export const IngredientIcons: FC<TIngredientIconsProps> = ({ ingredients }) => {
  const visibleIngredients = ingredients.slice(0, MAX_VISIBLE_INGREDIENTS);
  const hiddenCount = ingredients.length - visibleIngredients.length;

  return (
    <ul className={styles.icons}>
      {visibleIngredients.map((ingredient, index) => {
        const isLast = index === visibleIngredients.length - 1;
        const count = isLast && hiddenCount > 0 ? hiddenCount : undefined;

        return (
          <li
            key={`${ingredient._id}-${index}`}
            className={styles.item}
            style={{ zIndex: visibleIngredients.length - index }}
          >
            <IngredientIcon ingredient={ingredient} count={count} />
          </li>
        );
      })}
    </ul>
  );
};
