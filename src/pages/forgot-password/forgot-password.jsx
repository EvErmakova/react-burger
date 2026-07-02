import { Button, EmailInput } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { AuthLayout } from '@components/auth-layout/auth-layout';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
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
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button htmlType="submit" type="primary" size="medium">
        Восстановить
      </Button>
    </AuthLayout>
  );
};
