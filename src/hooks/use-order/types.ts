import type { TOrder } from '@utils/types';

export type TUseOrder = {
  order: TOrder | null;
  isLoading: boolean;
  error: string | null;
};
