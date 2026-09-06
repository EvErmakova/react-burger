import { MAX_ORDERS_IN_COLUMN, MAX_ORDER_COLUMNS } from '@utils/constants';

import type { TOrder } from '@utils/types';

export const splitIntoColumns = (orders: TOrder[]): TOrder[][] =>
  Array.from({ length: MAX_ORDER_COLUMNS }, (_, index) =>
    orders.slice(index * MAX_ORDERS_IN_COLUMN, (index + 1) * MAX_ORDERS_IN_COLUMN)
  ).filter((column) => column.length > 0);
