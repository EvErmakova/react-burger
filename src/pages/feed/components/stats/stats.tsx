import { getFeedOrders, getFeedTotal, getFeedTotalToday } from '@services/feed/slice';
import { useAppSelector } from '@services/hooks';
import { ORDER_STATUSES } from '@utils/constants';

import { OrderNumbers } from './components/order-numbers/order-numbers';
import { TotalCounter } from './components/total-counter/total-counter';

import type { FC } from 'react';

import styles from './stats.module.css';

export const Stats: FC = () => {
  const orders = useAppSelector(getFeedOrders);
  const total = useAppSelector(getFeedTotal);
  const totalToday = useAppSelector(getFeedTotalToday);

  const doneOrders = orders.filter((order) => order.status === ORDER_STATUSES.DONE);
  const pendingOrders = orders.filter((order) => order.status !== ORDER_STATUSES.DONE);

  return (
    <section className={styles.stats}>
      <div className={styles.boards}>
        <OrderNumbers title="Готовы" orders={doneOrders} isAccent />
        <OrderNumbers title="В работе" orders={pendingOrders} />
      </div>

      <TotalCounter title="Выполнено за все время" total={total} />
      <TotalCounter title="Выполнено за сегодня" total={totalToday} />
    </section>
  );
};
