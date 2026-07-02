import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';

import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { fetchIngredients } from '@services/ingredients/actions';
import { getIngredientsError, getIngredientsLoading } from '@services/ingredients/slice';

import styles from './home.module.css';

export const Home = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIngredientsLoading);
  const error = useSelector(getIngredientsError);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <>
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      {isLoading && <Preloader />}
      {error && (
        <p className={`${styles.error} text text_type_main-default pl-5`}>
          Не удалось загрузить ингредиенты: {error}
        </p>
      )}
      {!isLoading && !error && (
        <DndProvider backend={HTML5Backend}>
          <main className={`${styles.main} pl-5 pr-5 pb-10`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </main>
        </DndProvider>
      )}
    </>
  );
};
