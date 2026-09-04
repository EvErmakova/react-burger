import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import { AppHeader } from '@components/app-header/app-header';
import { IngredientModal } from '@components/ingredient-modal/ingredient-modal';
import { OrderModal } from '@components/order-modal/order-modal';
import { ProtectedRoute } from '@components/protected-route/protected-route';
import { Feed } from '@pages/feed/feed';
import { ForgotPassword } from '@pages/forgot-password/forgot-password';
import { Home } from '@pages/home/home';
import { Ingredient } from '@pages/ingredient/ingredient';
import { Login } from '@pages/login/login';
import { NotFound } from '@pages/not-found/not-found';
import { Order } from '@pages/order/order';
import { ProfileForm } from '@pages/profile/pages/profile-form/profile-form';
import { ProfileOrders } from '@pages/profile/pages/profile-orders/profile-orders';
import { Profile } from '@pages/profile/profile';
import { Register } from '@pages/register/register';
import { ResetPassword } from '@pages/reset-password/reset-password';
import { checkUserAuth } from '@services/auth/actions';
import { useAppDispatch, useAppSelector } from '@services/hooks';
import { fetchIngredients } from '@services/ingredients/actions';
import { getIngredientsError, getIngredientsLoading } from '@services/ingredients/slice';

import type { FC } from 'react';

import styles from './app.module.css';

export const App: FC = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(getIngredientsLoading);
  const error = useAppSelector(getIngredientsError);

  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />

      <main className={`${styles.main} pl-5 pr-5 pb-10`}>
        {isLoading && <Preloader />}
        {error && (
          <p className="text text_type_main-default text_color_error mt-10">
            Не удалось загрузить ингредиенты: {error}
          </p>
        )}

        {!isLoading && !error && (
          <>
            <Routes location={backgroundLocation || location}>
              <Route path="/" element={<Home />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/feed/:id" element={<Order />} />
              <Route
                path="/login"
                element={<ProtectedRoute onlyUnAuth component={<Login />} />}
              />
              <Route
                path="/register"
                element={<ProtectedRoute onlyUnAuth component={<Register />} />}
              />
              <Route
                path="/forgot-password"
                element={<ProtectedRoute onlyUnAuth component={<ForgotPassword />} />}
              />
              <Route
                path="/reset-password"
                element={<ProtectedRoute onlyUnAuth component={<ResetPassword />} />}
              />
              <Route
                path="/profile"
                element={<ProtectedRoute component={<Profile />} />}
              >
                <Route index element={<ProfileForm />} />
                <Route path="orders" element={<ProfileOrders />} />
              </Route>
              <Route
                path="/profile/orders/:id"
                element={<ProtectedRoute component={<Order />} />}
              />
              <Route path="/ingredients/:id" element={<Ingredient />} />
              <Route path="*" element={<NotFound />} />
            </Routes>

            {backgroundLocation && (
              <Routes>
                <Route path="/ingredients/:id" element={<IngredientModal />} />
                <Route path="/feed/:id" element={<OrderModal />} />
                <Route
                  path="/profile/orders/:id"
                  element={<ProtectedRoute component={<OrderModal />} />}
                />
              </Routes>
            )}
          </>
        )}
      </main>
    </div>
  );
};
