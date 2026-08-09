import type { ReactNode } from 'react';

export type TNavigationItemProps = {
  to?: string;
  end?: boolean;
  onClick?: () => void;
  children: ReactNode;
};
