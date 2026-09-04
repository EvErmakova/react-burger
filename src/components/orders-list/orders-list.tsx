import { OrderCard } from '@components/order-card/order-card';

import type { FC } from 'react';

import type { TOrdersListProps } from './types';

import styles from './orders-list.module.css';

export const OrdersList: FC<TOrdersListProps> = ({
  orders,
  basePath,
  showStatus,
  className,
}) => {
  if (!orders.length) {
    return (
      <p className="text text_type_main-default text_color_inactive">
        Ждем вашего первого заказа!
      </p>
    );
  }

  return (
    <ul className={`${styles.list} ${className} custom-scroll pr-2`}>
      {orders.map((order) => (
        <li key={order._id}>
          <OrderCard
            order={order}
            to={`${basePath}/${order._id}`}
            showStatus={showStatus}
          />
        </li>
      ))}
    </ul>
  );
};
