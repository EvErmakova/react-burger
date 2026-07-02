import {
  Button,
  EmailInput,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { AuthLayout } from '@components/auth-layout/auth-layout';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
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
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <PasswordInput
        name="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button htmlType="submit" type="primary" size="medium">
        Войти
      </Button>
    </AuthLayout>
  );
};
