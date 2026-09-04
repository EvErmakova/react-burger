import type { TOrder } from '@utils/types';

export type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};
