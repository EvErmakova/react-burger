import { Input, PasswordInput } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import styles from './profile-form.module.css';

export const ProfileForm = () => {
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        type="text"
        name="name"
        placeholder="Имя"
        icon="EditIcon"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        type="text"
        name="login"
        placeholder="Логин"
        icon="EditIcon"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
      />
      <PasswordInput
        name="password"
        placeholder="Пароль"
        icon="EditIcon"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </form>
  );
};
