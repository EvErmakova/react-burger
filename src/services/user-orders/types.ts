import type { TOrder } from '@utils/types';

export type TUserOrdersState = {
  orders: TOrder[];
  isLoaded: boolean;
  error: string | null;
};
