import { useSelector } from 'react-redux';

import {
  selectConstructorBun,
  selectConstructorFillings,
} from '@services/burger-constructor/slice';

import Card from './components/card/card';
import Total from './components/total/total';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = () => {
  const selectedBun = useSelector(selectConstructorBun);
  const selectedFillings = useSelector(selectConstructorFillings);

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

      <Total />
    </section>
  );
};
