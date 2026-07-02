import {
  Button,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { AuthLayout } from '@components/auth-layout/auth-layout';

export const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');

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
      <PasswordInput
        name="password"
        placeholder="Введите новый пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        type="text"
        name="code"
        placeholder="Введите код из письма"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <Button htmlType="submit" type="primary" size="medium">
        Сохранить
      </Button>
    </AuthLayout>
  );
};
