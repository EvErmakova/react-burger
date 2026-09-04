import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

import { AuthLayout } from '@components/auth-layout/auth-layout';
import { useForm } from '@hooks/use-form/use-form';
import { registerUser } from '@services/auth/actions';
import { getAuthError, getAuthLoading } from '@services/auth/slice';
import { useAppDispatch, useAppSelector } from '@services/hooks';

import type { FC, FormEvent } from 'react';

export const Register: FC = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(getAuthLoading);
  const error = useAppSelector(getAuthError);

  const { values, handleChange } = useForm({ name: '', email: '', password: '' });

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(registerUser(values));
  };

  return (
    <AuthLayout
      title="Регистрация"
      onSubmit={handleSubmit}
      footer={
        <p className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы? <Link to="/login">Войти</Link>
        </p>
      }
    >
      <Input
        type="text"
        name="name"
        placeholder="Имя"
        value={values.name}
        onChange={handleChange}
      />
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
        Зарегистрироваться
      </Button>
      {error && (
        <p className="text text_type_main-default text_color_error mt-2">{error}</p>
      )}
    </AuthLayout>
  );
};
