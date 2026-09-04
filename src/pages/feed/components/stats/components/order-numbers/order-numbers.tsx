import type { FC } from 'react';

import type { TOrderNumbersProps } from './types';

import styles from './order-numbers.module.css';

export const OrderNumbers: FC<TOrderNumbersProps> = ({ title, orders, isAccent }) => {
  return (
    <div className={styles.column}>
      <h3 className={`${styles.title} text text_type_main-medium`}>{title}:</h3>
      <ul className={styles.numbers}>
        {orders.map((order) => (
          <li
            key={order._id}
            className={`text text_type_digits-default ${isAccent ? 'text_color_success' : ''}`}
          >
            {order.number}
          </li>
        ))}
      </ul>
    </div>
  );
};
