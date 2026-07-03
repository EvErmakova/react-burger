import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { AuthLayout } from '@components/auth-layout/auth-layout';
import { registerUser } from '@services/auth/actions';
import { getAuthError, getAuthLoading } from '@services/auth/slice';

export const Register = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getAuthLoading);
  const error = useSelector(getAuthError);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }));
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
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
      <Button htmlType="submit" type="primary" size="medium" disabled={isLoading}>
        Зарегистрироваться
      </Button>
      {error && (
        <p className="text text_type_main-default text_color_error mt-2">{error}</p>
      )}
    </AuthLayout>
  );
};
