import { NavLink } from 'react-router-dom';

import type { FC } from 'react';

import type { TNavigationItemProps } from './types';

import styles from './navigation-item.module.css';

export const NavigationItem: FC<TNavigationItemProps> = ({
  to,
  end,
  onClick,
  children,
}) => {
  const getLinkClass = ({ isActive }: { isActive: boolean }): string =>
    `${styles.link} text text_type_main-medium ${isActive ? 'text_color_primary' : 'text_color_inactive'}`;

  if (to) {
    return (
      <NavLink to={to} end={end} className={getLinkClass}>
        {children}
      </NavLink>
    );
  }

  return (
    <button
      type="button"
      className={`${styles.link} text text_type_main-medium text_color_inactive`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
