import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

import type { FC } from 'react';

import type { TProfileOutletContext } from '@pages/profile/types';

const HINT = 'В этом разделе вы можете просмотреть свою историю заказов';

export const ProfileOrders: FC = () => {
  const { setHint } = useOutletContext<TProfileOutletContext>();

  useEffect(() => {
    setHint(HINT);
  }, [setHint]);

  return <p className="text text_type_main-medium">Страница находится в разработке</p>;
};
