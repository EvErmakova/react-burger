import type { JSX } from 'react';

export type TProtectedRouteProps = {
  onlyUnAuth?: boolean;
  component: JSX.Element;
};
