import { useMemo } from 'react';

import { Card } from './components/card/card';
import { Total } from './components/total/total';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = ({ ingredients }) => {
  const selectedBun = useMemo(
    () => ingredients.find((ingredient) => ingredient.type === 'bun'),
    [ingredients]
  );

  const selectedIngredients = useMemo(
    () => ingredients.filter((ingredient) => ingredient.type !== 'bun'),
    [ingredients]
  );

  const totalPrice = useMemo(
    () => ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0),
    [ingredients]
  );

  return (
    <section className={styles.burger_constructor}>
      <ul className={styles.ingredients}>
        <li>
          <Card ingredient={selectedBun} type="top" />
        </li>
        <li className={styles.fillings}>
          <ul className={`${styles.fillings_list} custom-scroll`}>
            {selectedIngredients.map((ingredient) => (
              <li key={ingredient._id}>
                <Card ingredient={ingredient} />
              </li>
            ))}
          </ul>
        </li>
        <li>
          <Card ingredient={selectedBun} type="bottom" />
        </li>
      </ul>

      <Total totalPrice={totalPrice} />
    </section>
  );
};
