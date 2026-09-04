import {
  Button,
  EmailInput,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

import { AuthLayout } from '@components/auth-layout/auth-layout';
import { useForm } from '@hooks/use-form/use-form';
import { loginUser } from '@services/auth/actions';
import { getAuthError, getAuthLoading } from '@services/auth/slice';
import { useAppDispatch, useAppSelector } from '@services/hooks';

import type { FC, FormEvent } from 'react';

export const Login: FC = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(getAuthLoading);
  const error = useAppSelector(getAuthError);

  const { values, handleChange } = useForm({ email: '', password: '' });

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(loginUser(values));
  };

  return (
    <AuthLayout
      title="Вход"
      onSubmit={handleSubmit}
      footer={
        <>
          <p className="text text_type_main-default text_color_inactive">
            Вы — новый пользователь? <Link to="/register">Зарегистрироваться</Link>
          </p>
          <p className="text text_type_main-default text_color_inactive">
            Забыли пароль? <Link to="/forgot-password">Восстановить пароль</Link>
          </p>
        </>
      }
    >
      <EmailInput
        name="email"
        placeholder="E-mail"
        value={values.email}
        onChange={handleChange}
      />
      <PasswordInput
        name="password"
        placeholder="Пароль"
        value={values.password}
        onChange={handleChange}
      />
      <Button htmlType="submit" type="primary" size="medium" disabled={isLoading}>
        Войти
      </Button>
      {error && (
        <p className="text text_type_main-default text_color_error mt-2">{error}</p>
      )}
    </AuthLayout>
  );
};
