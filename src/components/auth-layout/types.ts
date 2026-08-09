import type { FormEventHandler, ReactNode } from 'react';

export type TAuthLayoutProps = {
  title: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
  children: ReactNode;
  footer: ReactNode;
};
