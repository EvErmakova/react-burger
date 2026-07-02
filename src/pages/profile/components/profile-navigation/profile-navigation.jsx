import { NavigationItem } from './components/navigation-item/navigation-item';

import styles from './profile-navigation.module.css';

export const ProfileNavigation = ({ onLogout }) => {
  return (
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
        <NavigationItem onClick={onLogout}>Выход</NavigationItem>
      </li>
    </ul>
  );
};
