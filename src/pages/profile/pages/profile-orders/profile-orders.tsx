import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

import { OrdersList } from '@components/orders-list/orders-list';
import { useAppSelector } from '@services/hooks';
import { getUserOrders } from '@services/user-orders/slice';

import type { FC } from 'react';

import type { TProfileOutletContext } from '@pages/profile/types';

import styles from './profile-orders.module.css';

const HINT = 'В этом разделе вы можете просмотреть свою историю заказов';

export const ProfileOrders: FC = () => {
  const { setHint } = useOutletContext<TProfileOutletContext>();
  const orders = useAppSelector(getUserOrders);

  useEffect(() => {
    setHint(HINT);
  }, [setHint]);

  return (
    <OrdersList
      className={styles.list}
      orders={orders}
      basePath="/profile/orders"
      showStatus
    />
  );
};
