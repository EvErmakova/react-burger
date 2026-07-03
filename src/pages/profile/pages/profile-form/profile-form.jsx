import {
  Button,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';

import { updateUserData } from '@services/auth/actions';
import { getUser } from '@services/auth/slice';

import styles from './profile-form.module.css';

const HINT = 'В этом разделе вы можете изменить свои персональные данные';

export const ProfileForm = () => {
  const { setHint } = useOutletContext();
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setHint(HINT);
  }, [setHint]);

  useEffect(() => {
    setName(user?.name ?? '');
    setEmail(user?.email ?? '');
    setPassword('');
  }, [user]);

  const isChanged =
    name !== (user?.name ?? '') || email !== (user?.email ?? '') || password !== '';

  const handleReset = (e) => {
    e.preventDefault();
    setName(user?.name ?? '');
    setEmail(user?.email ?? '');
    setPassword('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserData({ name, email, password }));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
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
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <PasswordInput
        name="password"
        placeholder="Пароль"
        icon="EditIcon"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {isChanged && (
        <div className={styles.actions}>
          <Button htmlType="reset" type="secondary" size="medium">
            Отмена
          </Button>
          <Button htmlType="submit" type="primary" size="medium">
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );
};
