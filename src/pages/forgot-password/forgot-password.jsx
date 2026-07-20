import { Button, EmailInput } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { AuthLayout } from '@components/auth-layout/auth-layout';
import { useForm } from '@hooks/use-form/use-form';
import { forgotPassword } from '@utils/api';

export const ForgotPassword = () => {
  const navigate = useNavigate();

  const { values, handleChange } = useForm({ email: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    forgotPassword({ email: values.email })
      .then(() => {
        localStorage.setItem('resetPasswordAllowed', 'true');
        navigate('/reset-password');
      })
      .catch((err) => {
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
      <EmailInput
        name="email"
        placeholder="Укажите e-mail"
        value={values.email}
        onChange={handleChange}
      />
      <Button htmlType="submit" type="primary" size="medium" disabled={isLoading}>
        Восстановить
      </Button>
      {error && (
        <p className="text text_type_main-default text_color_error mt-2">{error}</p>
      )}
    </AuthLayout>
  );
};
