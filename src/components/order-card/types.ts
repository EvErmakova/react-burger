import type { TOrder } from '@utils/types';

export type TOrderCardProps = {
  order: TOrder;
  to: string;
  showStatus?: boolean;
};
