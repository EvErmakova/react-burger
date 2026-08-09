import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from '@krgaa/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

import { HeaderMenuItem } from '@components/header-menu-item/header-menu-item';

import type { FC } from 'react';

import styles from './app-header.module.css';

export const AppHeader: FC = () => {
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
        <Link to="/" className={styles.logo}>
          <Logo />
        </Link>
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
