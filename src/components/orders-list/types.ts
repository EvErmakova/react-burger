import type { TOrder } from '@utils/types';

export type TOrdersListProps = {
  orders: TOrder[];
  basePath: string;
  showStatus?: boolean;
  className?: string;
};
