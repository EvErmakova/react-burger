import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const HINT = 'В этом разделе вы можете просмотреть свою историю заказов';

export const ProfileOrders = () => {
  const { setHint } = useOutletContext();

  useEffect(() => {
    setHint(HINT);
  }, [setHint]);

  return <p className="text text_type_main-medium">Страница находится в разработке</p>;
};
