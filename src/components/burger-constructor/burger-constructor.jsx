import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  addIngredient,
  clearConstructor,
  selectConstructorBun,
  selectConstructorFillings,
} from '@services/burger-constructor/slice';

import Card from './components/card/card';
import Total from './components/total/total';
import { DEFAULT_INGREDIENTS } from './constants';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const selectedBun = useSelector(selectConstructorBun);
  const selectedFillings = useSelector(selectConstructorFillings);

  useEffect(() => {
    dispatch(clearConstructor());
    DEFAULT_INGREDIENTS.forEach((ingredient) => dispatch(addIngredient(ingredient)));
  }, [dispatch]);

  const totalPrice = useMemo(
    () =>
      (selectedBun ? selectedBun.price * 2 : 0) +
      selectedFillings.reduce((sum, ingredient) => sum + ingredient.price, 0),
    [selectedBun, selectedFillings]
  );

  const orderIngredients = useMemo(
    () =>
      selectedBun
        ? [
            selectedBun._id,
            ...selectedFillings.map((ingredient) => ingredient._id),
            selectedBun._id,
          ]
        : [],
    [selectedBun, selectedFillings]
  );

  return (
    <section className={styles.burger_constructor}>
      <ul className={styles.ingredients}>
        <li>
          <Card ingredient={selectedBun} type="top" />
        </li>
        <li className={styles.fillings}>
          <ul className={`${styles.fillings_list} custom-scroll`}>
            {selectedFillings.map((ingredient) => (
              <li key={ingredient.uniqueId}>
                <Card ingredient={ingredient} />
              </li>
            ))}
          </ul>
        </li>
        <li>
          <Card ingredient={selectedBun} type="bottom" />
        </li>
      </ul>

      <Total totalPrice={totalPrice} orderIngredients={orderIngredients} />
    </section>
  );
};
