import {
  Button,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import { AuthLayout } from '@components/auth-layout/auth-layout';
import { useForm } from '@hooks/use-form/use-form';
import { resetPassword } from '@utils/api';

import type { FC, FormEvent } from 'react';

export const ResetPassword: FC = () => {
  const navigate = useNavigate();

  const { values, handleChange } = useForm({ password: '', code: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isResetPasswordAllowed = localStorage.getItem('resetPasswordAllowed') === 'true';

  if (!isResetPasswordAllowed) {
    return <Navigate to="/forgot-password" replace />;
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    resetPassword({ password: values.password, token: values.code })
      .then(() => {
        localStorage.removeItem('resetPasswordAllowed');
        navigate('/login');
      })
      .catch((err: Error) => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <AuthLayout
      title="Восстановление пароля"
      onSubmit={handleSubmit}
      footer={
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль? <Link to="/login">Войти</Link>
        </p>
      }
    >
      <PasswordInput
        name="password"
        placeholder="Введите новый пароль"
        value={values.password}
        onChange={handleChange}
      />
      <Input
        type="text"
        name="code"
        placeholder="Введите код из письма"
        value={values.code}
        onChange={handleChange}
      />
      <Button htmlType="submit" type="primary" size="medium" disabled={isLoading}>
        Сохранить
      </Button>
      {error && (
        <p className="text text_type_main-default text_color_error mt-2">{error}</p>
      )}
    </AuthLayout>
  );
};
