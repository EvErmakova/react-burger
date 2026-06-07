import { Button, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { memo, useState } from 'react';

import { Modal } from '@components/modal/modal';
import { OrderDetails } from '@components/order-details/order-details';

import styles from './total.module.css';

const Total = ({ totalPrice }) => {
  const orderNumber = '034536';
  const [isOrderOpen, setIsOrderOpen] = useState(false);

  function handleOrderClick() {
    setIsOrderOpen(true);
  }

  function handleCloseOrder() {
    setIsOrderOpen(false);
  }

  return (
    <div className={styles.total}>
      <p className={`${styles.price} text text_type_digits-medium`}>
        {totalPrice}
        <CurrencyIcon type="primary" className={styles.currency_icon} />
      </p>
      <Button onClick={handleOrderClick} size="large" type="primary">
        Оформить заказ
      </Button>

      {isOrderOpen && (
        <Modal onClose={handleCloseOrder}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
    </div>
  );
};

export default memo(Total);
