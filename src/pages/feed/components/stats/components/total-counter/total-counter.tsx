import type { FC } from 'react';

import type { TTotalCounterProps } from './types';

import styles from './total-counter.module.css';

export const TotalCounter: FC<TTotalCounterProps> = ({ title, total }) => {
  return (
    <div className={styles.counter}>
      <h3 className={`${styles.title} text text_type_main-medium`}>{title}:</h3>
      <p className={`${styles.total} text text_type_digits-large`}>
        {total.toLocaleString('ru-RU')}
      </p>
    </div>
  );
};
