import {
  Button,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';

import { useForm } from '@hooks/use-form';
import { updateUserData } from '@services/auth/actions';
import { getUser } from '@services/auth/slice';

import styles from './profile-form.module.css';

const HINT = 'В этом разделе вы можете изменить свои персональные данные';

export const ProfileForm = () => {
  const { setHint } = useOutletContext();
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  const { values, handleChange, setValues } = useForm({
    name: user?.name ?? '',
    email: user?.email ?? '',
    password: '',
  });

  useEffect(() => {
    setHint(HINT);
  }, [setHint]);

  useEffect(() => {
    setValues({ name: user?.name ?? '', email: user?.email ?? '', password: '' });
  }, [user, setValues]);

  const isChanged =
    values.name !== (user?.name ?? '') ||
    values.email !== (user?.email ?? '') ||
    values.password !== '';

  const handleReset = (e) => {
    e.preventDefault();
    setValues({ name: user?.name ?? '', email: user?.email ?? '', password: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserData(values));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
      <Input
        type="text"
        name="name"
        placeholder="Имя"
        icon="EditIcon"
        value={values.name}
        onChange={handleChange}
      />
      <Input
        type="text"
        name="email"
        placeholder="Логин"
        icon="EditIcon"
        value={values.email}
        onChange={handleChange}
      />
      <PasswordInput
        name="password"
        placeholder="Пароль"
        icon="EditIcon"
        value={values.password}
        onChange={handleChange}
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
