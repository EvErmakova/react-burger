import { useParams } from 'react-router-dom';

import { OrderInfo } from '@components/order-info/order-info';
import { useOrder } from '@hooks/use-order/use-order';

import type { FC } from 'react';

import styles from './order.module.css';

export const Order: FC = () => {
  const { id } = useParams();
  const orderState = useOrder(id);

  return (
    <div className={styles.container}>
      {orderState.order && (
        <h1 className={`${styles.number} text text_type_digits-default`}>
          #{orderState.order.number}
        </h1>
      )}
      <OrderInfo {...orderState} />
    </div>
  );
};
