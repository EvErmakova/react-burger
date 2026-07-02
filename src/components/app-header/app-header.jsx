import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from '@krgaa/react-developer-burger-ui-components';

import { HeaderMenuItem } from '@components/header-menu-item/header-menu-item';

import styles from './app-header.module.css';

export const AppHeader = () => {
  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <HeaderMenuItem to="/" icon={BurgerIcon} text="Конструктор" end />
          <HeaderMenuItem
            to="/feed"
            icon={ListIcon}
            text="Лента заказов"
            className="ml-10"
          />
        </div>
        <div className={styles.logo}>
          <Logo />
        </div>
        <HeaderMenuItem
          to="/profile"
          icon={ProfileIcon}
          text="Личный кабинет"
          className={styles.link_position_last}
        />
      </nav>
    </header>
  );
};
