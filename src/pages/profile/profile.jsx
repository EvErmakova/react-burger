import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { ProfileNavigation } from './components/profile-navigation/profile-navigation';

import styles from './profile.module.css';

export const Profile = () => {
  const [hint, setHint] = useState('');

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <ProfileNavigation hint={hint} />
      </nav>
      <Outlet context={{ setHint }} />
    </div>
  );
};
