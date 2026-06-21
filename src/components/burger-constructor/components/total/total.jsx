import { Button, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { memo } from 'react';

import { Modal } from '@components/modal/modal';
import { OrderDetails } from '@components/order-details/order-details';
import { useModal } from '@hooks/use-modal';

import styles from './total.module.css';

const Total = ({ totalPrice }) => {
  const orderNumber = '034536';
  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <div className={styles.total}>
      <p className={`${styles.price} text text_type_digits-medium`}>
        {totalPrice}
        <CurrencyIcon type="primary" className={styles.currency_icon} />
      </p>
      <Button onClick={openModal} size="large" type="primary">
        Оформить заказ
      </Button>

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
    </div>
  );
};

export default memo(Total);
