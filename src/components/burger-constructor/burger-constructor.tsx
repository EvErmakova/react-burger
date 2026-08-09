import { useRef } from 'react';
import { useDrop } from 'react-dnd';

import {
  addIngredient,
  getConstructorBun,
  getConstructorFillings,
} from '@services/burger-constructor/slice';
import { useAppDispatch, useAppSelector } from '@services/hooks';
import { DND_TYPES, INGREDIENT_TYPES } from '@utils/constants';

import Card from './components/card/card';
import { Placeholder } from './components/placeholder/placeholder';
import Total from './components/total/total';

import type { FC } from 'react';

import type { TIngredient } from '@utils/types';

import type { TDropCollectedProps } from './types';

import styles from './burger-constructor.module.css';

export const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  const selectedBun = useAppSelector(getConstructorBun);
  const selectedFillings = useAppSelector(getConstructorFillings);

  const containerRef = useRef<HTMLUListElement>(null);

  const [{ isBunHover, isFillingHover }, dropRef] = useDrop<
    TIngredient,
    unknown,
    TDropCollectedProps
  >({
    accept: DND_TYPES.INGREDIENT,
    drop: (ingredient) => dispatch(addIngredient(ingredient)),
    collect: (monitor) => {
      const isOver = monitor.isOver();
      const isBun = monitor.getItem()?.type === INGREDIENT_TYPES.BUN;

      return {
        isBunHover: isOver && isBun,
        isFillingHover: isOver && !isBun,
      };
    },
  });

  dropRef(containerRef);

  return (
    <section className={styles.burger_constructor}>
      <ul className={styles.ingredients} ref={containerRef}>
        <li>
          {selectedBun ? (
            <Card ingredient={selectedBun} type="top" />
          ) : (
            <Placeholder type="top" text="Выберите булки" isHover={isBunHover} />
          )}
        </li>
        <li className={styles.fillings}>
          {selectedFillings.length > 0 ? (
            <ul className={`${styles.fillings_list} custom-scroll`}>
              {selectedFillings.map((ingredient, index) => (
                <li key={ingredient.uniqueId}>
                  <Card ingredient={ingredient} index={index} />
                </li>
              ))}
            </ul>
          ) : (
            <Placeholder text="Выберите начинку" isHover={isFillingHover} />
          )}
        </li>
        <li>
          {selectedBun ? (
            <Card ingredient={selectedBun} type="bottom" />
          ) : (
            <Placeholder type="bottom" text="Выберите булки" isHover={isBunHover} />
          )}
        </li>
      </ul>

      <Total />
    </section>
  );
};
