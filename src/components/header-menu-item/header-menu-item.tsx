import { NavLink } from 'react-router-dom';

import type { FC } from 'react';

import type { THeaderMenuItemProps } from './types';

import styles from './header-menu-item.module.css';

export const HeaderMenuItem: FC<THeaderMenuItemProps> = ({
  to,
  end,
  icon: Icon,
  text,
  className = '',
}) => {
  return (
    <NavLink to={to} end={end} className={`${styles.link} ${className}`}>
      {({ isActive }) => (
        <>
          <Icon type={isActive ? 'primary' : 'secondary'} />
          <p
            className={`text text_type_main-default ml-2 ${
              isActive ? 'text_color_primary' : 'text_color_inactive'
            }`}
          >
            {text}
          </p>
        </>
      )}
    </NavLink>
  );
};
