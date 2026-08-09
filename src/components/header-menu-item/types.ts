import type { JSX } from 'react';

type TIconType = 'primary' | 'secondary' | 'error' | 'success' | 'disabled';

export type TIcon = (props: { type: TIconType; className?: string }) => JSX.Element;

export type THeaderMenuItemProps = {
  to: string;
  end?: boolean;
  icon: TIcon;
  text: string;
  className?: string;
};
