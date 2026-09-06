import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

import { OrdersList } from '@components/orders-list/orders-list';
import { useAppDispatch, useAppSelector } from '@services/hooks';
import { connectUserOrders, disconnectUserOrders } from '@services/user-orders/actions';
import {
  getUserOrders,
  getUserOrdersError,
  getUserOrdersLoaded,
} from '@services/user-orders/slice';
import { getAccessToken, getUserOrdersSocketUrl } from '@utils/api';

import type { FC } from 'react';

import type { TProfileOutletContext } from '@pages/profile/types';

import styles from './profile-orders.module.css';

const HINT = 'В этом разделе вы можете просмотреть свою историю заказов';

export const ProfileOrders: FC = () => {
  const { setHint } = useOutletContext<TProfileOutletContext>();
  const dispatch = useAppDispatch();

  const orders = useAppSelector(getUserOrders);
  const isLoaded = useAppSelector(getUserOrdersLoaded);
  const error = useAppSelector(getUserOrdersError);

  useEffect(() => {
    setHint(HINT);
  }, [setHint]);

  useEffect(() => {
    const token = getAccessToken();

    if (token) {
      dispatch(connectUserOrders(getUserOrdersSocketUrl(token)));
    }

    return (): void => {
      dispatch(disconnectUserOrders());
    };
  }, [dispatch]);

  if (!isLoaded && error) {
    return (
      <p className="text text_type_main-default text_color_error">
        Не удалось загрузить историю заказов: {error}
      </p>
    );
  }

  if (!isLoaded) {
    return <Preloader />;
  }

  return (
    <OrdersList
      className={styles.list}
      orders={orders}
      basePath="/profile/orders"
      showStatus
    />
  );
};
