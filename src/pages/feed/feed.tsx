import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';

import { OrdersList } from '@components/orders-list/orders-list';
import { connectFeed, disconnectFeed } from '@services/feed/actions';
import { getFeedError, getFeedLoaded, getFeedOrders } from '@services/feed/slice';
import { useAppDispatch, useAppSelector } from '@services/hooks';
import { WS_FEED_URL } from '@utils/constants';

import { Stats } from './components/stats/stats';

import type { FC } from 'react';

import styles from './feed.module.css';

export const Feed: FC = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(getFeedOrders);
  const isLoaded = useAppSelector(getFeedLoaded);
  const error = useAppSelector(getFeedError);

  useEffect(() => {
    dispatch(connectFeed(WS_FEED_URL));

    return (): void => {
      dispatch(disconnectFeed());
    };
  }, [dispatch]);

  return (
    <>
      <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>

      {!isLoaded && !error && <Preloader />}

      {!isLoaded && error && (
        <p className="text text_type_main-default text_color_error">
          Не удалось загрузить ленту заказов: {error}
        </p>
      )}

      {isLoaded && (
        <div className={styles.main}>
          <section className={styles.orders}>
            <OrdersList orders={orders} basePath="/feed" />
          </section>
          <Stats />
        </div>
      )}
    </>
  );
};
