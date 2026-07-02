import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';

import { AppHeader } from '@components/app-header/app-header';
import { IngredientModal } from '@components/ingredient-modal/ingredient-modal';
import { Feed } from '@pages/feed/feed';
import { ForgotPassword } from '@pages/forgot-password/forgot-password';
import { Home } from '@pages/home/home';
import { Ingredient } from '@pages/ingredient/ingredient';
import { Login } from '@pages/login/login';
import { NotFound } from '@pages/not-found/not-found';
import { ProfileOrders } from '@pages/profile-orders/profile-orders';
import { ProfileForm } from '@pages/profile/components/profile-form/profile-form';
import { Profile } from '@pages/profile/profile';
import { Register } from '@pages/register/register';
import { ResetPassword } from '@pages/reset-password/reset-password';
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
          <p className={`${styles.error} text text_type_main-default mt-10`}>
            Не удалось загрузить ингредиенты: {error}
          </p>
        )}

        {!isLoading && !error && (
          <>
            <Routes location={backgroundLocation || location}>
              <Route path="/" element={<Home />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/profile" element={<Profile />}>
                <Route index element={<ProfileForm />} />
                <Route path="orders" element={<ProfileOrders />} />
              </Route>
              <Route path="/ingredients/:id" element={<Ingredient />} />
              <Route path="*" element={<NotFound />} />
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
