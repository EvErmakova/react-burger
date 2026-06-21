import { Button, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { memo } from 'react';
import { useDispatch } from 'react-redux';

import { Modal } from '@components/modal/modal';
import { OrderDetails } from '@components/order-details/order-details';
import { useModal } from '@hooks/use-modal';
import { createOrder } from '@services/order/actions';
import { clearOrder } from '@services/order/slice';

import styles from './total.module.css';

const Total = ({ totalPrice, orderIngredients }) => {
  const dispatch = useDispatch();
  const { isModalOpen, openModal, closeModal } = useModal();

  const handleOrder = () => {
    if (!orderIngredients.length) {
      return;
    }
    dispatch(createOrder(orderIngredients));
    openModal();
  };

  const handleClose = () => {
    closeModal();
    dispatch(clearOrder());
  };

  return (
    <div className={styles.total}>
      <p className={`${styles.price} text text_type_digits-medium`}>
        {totalPrice}
        <CurrencyIcon type="primary" className={styles.currency_icon} />
      </p>
      <Button
        onClick={handleOrder}
        size="large"
        type="primary"
        disabled={!orderIngredients.length}
      >
        Оформить заказ
      </Button>

      {isModalOpen && (
        <Modal onClose={handleClose}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
};

export default memo(Total);
