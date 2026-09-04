import { OrdersList } from '@components/orders-list/orders-list';
import { getFeedOrders } from '@services/feed/slice';
import { useAppSelector } from '@services/hooks';

import { Stats } from './components/stats/stats';

import type { FC } from 'react';

import styles from './feed.module.css';

export const Feed: FC = () => {
  const orders = useAppSelector(getFeedOrders);

  return (
    <>
      <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
      <div className={styles.main}>
        <section className={styles.orders}>
          <OrdersList orders={orders} basePath="/feed" />
        </section>
        <Stats />
      </div>
    </>
  );
};
