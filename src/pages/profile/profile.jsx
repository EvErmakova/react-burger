import { Outlet, useLocation } from 'react-router-dom';

import { ProfileNavigation } from './components/profile-navigation/profile-navigation';

import styles from './profile.module.css';

export const Profile = () => {
  const location = useLocation();
  const isOrders = location.pathname.startsWith('/profile/orders');

  const handleLogout = () => {
    // TODO: очистка сессии будет добавлена вместе с авторизацией
  };

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <ProfileNavigation onLogout={handleLogout} />
        <p
          className={`${styles.hint} text text_type_main-default text_color_inactive mt-20`}
        >
          {isOrders
            ? 'В этом разделе вы можете просмотреть свою историю заказов'
            : 'В этом разделе вы можете изменить свои персональные данные'}
        </p>
      </nav>
      <Outlet />
    </div>
  );
};
