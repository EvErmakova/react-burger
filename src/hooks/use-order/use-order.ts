import { useEffect, useMemo, useState } from 'react';

import { getFeedOrders } from '@services/feed/slice';
import { useAppSelector } from '@services/hooks';
import { getUserOrders } from '@services/user-orders/slice';
import { getOrderById } from '@utils/api';

import type { TOrder } from '@utils/types';

import type { TUseOrder } from './types';

export const useOrder = (id?: string): TUseOrder => {
  const feedOrders = useAppSelector(getFeedOrders);
  const userOrders = useAppSelector(getUserOrders);

  const [fetchedOrder, setFetchedOrder] = useState<TOrder | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const knownOrder = useMemo(
    () => [...feedOrders, ...userOrders].find((order) => order._id === id) ?? null,
    [feedOrders, userOrders, id]
  );

  useEffect(() => {
    if (!id || knownOrder) {
      return;
    }

    let isActual = true;

    setIsLoading(true);
    setError(null);

    getOrderById(id)
      .then((data) => {
        if (isActual) {
          setFetchedOrder(data.order);
        }
      })
      .catch((err: Error) => {
        if (isActual) {
          setError(err.message);
        }
      })
      .finally(() => {
        if (isActual) {
          setIsLoading(false);
        }
      });

    return (): void => {
      isActual = false;
    };
  }, [id, knownOrder]);

  return { order: knownOrder ?? fetchedOrder, isLoading, error };
};
