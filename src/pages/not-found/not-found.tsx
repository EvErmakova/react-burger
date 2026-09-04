import { Link } from 'react-router-dom';

import type { FC } from 'react';

import styles from './not-found.module.css';

export const NotFound: FC = () => {
  return (
    <div className={styles.container}>
      <p className={`${styles.code} text text_type_digits-large mb-15`}>404</p>
      <h1 className="text text_type_main-medium mb-8">Страница не найдена</h1>
      <Link to="/" className="text text_type_main-default">
        Вернуться на главную
      </Link>
    </div>
  );
};
