import {
  getDoneOrders,
  getFeedTotal,
  getFeedTotalToday,
  getPendingOrders,
} from '@services/feed/slice';
import { useAppSelector } from '@services/hooks';

import { OrderNumbers } from './components/order-numbers/order-numbers';
import { TotalCounter } from './components/total-counter/total-counter';

import type { FC } from 'react';

import styles from './stats.module.css';

export const Stats: FC = () => {
  const doneOrders = useAppSelector(getDoneOrders);
  const pendingOrders = useAppSelector(getPendingOrders);
  const total = useAppSelector(getFeedTotal);
  const totalToday = useAppSelector(getFeedTotalToday);

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
