import { CheckMarkIcon, Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';

import {
  selectOrderError,
  selectOrderLoading,
  selectOrderNumber,
} from '@services/order/slice';

import styles from './order-details.module.css';

export const OrderDetails = () => {
  const orderNumber = useSelector(selectOrderNumber);
  const isLoading = useSelector(selectOrderLoading);
  const error = useSelector(selectOrderError);

  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return (
      <p className="text text_type_main-medium">Не удалось оформить заказ: {error}</p>
    );
  }

  return (
    <>
      <p className={`${styles.number} text text_type_digits-large mt-4 mb-8`}>
        {orderNumber}
      </p>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <div className={`${styles.checkmark} mb-15`}>
        <CheckMarkIcon type="primary" className={styles.checkmark_icon} />
      </div>
      <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive mb-15">
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );
};
