import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { ProfileNavigation } from './components/profile-navigation/profile-navigation';

import type { FC } from 'react';

import styles from './profile.module.css';

export const Profile: FC = () => {
  const [hint, setHint] = useState('');

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <ProfileNavigation hint={hint} />
      </nav>
      <div className={styles.content}>
        <Outlet context={{ setHint }} />
      </div>
    </div>
  );
};
