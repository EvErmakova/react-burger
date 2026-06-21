import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';

import {
  addIngredient,
  selectConstructorBun,
  selectConstructorFillings,
} from '@services/burger-constructor/slice';
import { DND_TYPES, INGREDIENT_TYPES } from '@utils/constants';

import Card from './components/card/card';
import { Placeholder } from './components/placeholder/placeholder';
import Total from './components/total/total';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const selectedBun = useSelector(selectConstructorBun);
  const selectedFillings = useSelector(selectConstructorFillings);

  const [{ isBunHover, isFillingHover }, dropRef] = useDrop({
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

  return (
    <section className={styles.burger_constructor}>
      <ul className={styles.ingredients} ref={dropRef}>
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
