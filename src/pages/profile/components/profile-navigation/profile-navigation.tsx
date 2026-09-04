import { logoutUser } from '@services/auth/actions';
import { useAppDispatch } from '@services/hooks';

import { NavigationItem } from './components/navigation-item/navigation-item';

import type { FC } from 'react';

import type { TProfileNavigationProps } from './types';

import styles from './profile-navigation.module.css';

export const ProfileNavigation: FC<TProfileNavigationProps> = ({ hint }) => {
  const dispatch = useAppDispatch();

  const handleLogout = (): void => {
    dispatch(logoutUser());
  };

  return (
    <>
      <ul className={styles.menu}>
        <li>
          <NavigationItem to="/profile" end>
            Профиль
          </NavigationItem>
        </li>
        <li>
          <NavigationItem to="/profile/orders">История заказов</NavigationItem>
        </li>
        <li>
          <NavigationItem onClick={handleLogout}>Выход</NavigationItem>
        </li>
      </ul>

      <p
        className={`${styles.hint} text text_type_main-default text_color_inactive mt-20`}
      >
        {hint}
      </p>
    </>
  );
};
