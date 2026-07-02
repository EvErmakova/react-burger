import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';

import { AppHeader } from '@components/app-header/app-header';
import { IngredientModal } from '@components/ingredient-modal/ingredient-modal';
import { Home } from '@pages/home/home';
import { Ingredient } from '@pages/ingredient/ingredient';
import { fetchIngredients } from '@services/ingredients/actions';
import { getIngredientsError, getIngredientsLoading } from '@services/ingredients/slice';

import styles from './app.module.css';

export const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIngredientsLoading);
  const error = useSelector(getIngredientsError);

  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />

      <main className={`${styles.main} pl-5 pr-5 pb-10`}>
        {isLoading && <Preloader />}
        {error && (
          <p className={`${styles.error} mt-10 text text_type_main-default`}>
            Не удалось загрузить ингредиенты: {error}
          </p>
        )}

        {!isLoading && !error && (
          <>
            <Routes location={backgroundLocation || location}>
              <Route path="/" element={<Home />} />
              <Route path="/ingredients/:id" element={<Ingredient />} />
            </Routes>

            {backgroundLocation && (
              <Routes>
                <Route path="/ingredients/:id" element={<IngredientModal />} />
              </Routes>
            )}
          </>
        )}
      </main>
    </div>
  );
};
