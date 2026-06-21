import { Button, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { memo, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Modal } from '@components/modal/modal';
import { OrderDetails } from '@components/order-details/order-details';
import { useModal } from '@hooks/use-modal';
import {
  selectConstructorBun,
  selectConstructorFillings,
} from '@services/burger-constructor/slice';
import { createOrder } from '@services/order/actions';
import { clearOrder } from '@services/order/slice';

import styles from './total.module.css';

const Total = () => {
  const dispatch = useDispatch();
  const { isModalOpen, openModal, closeModal } = useModal();

  const selectedBun = useSelector(selectConstructorBun);
  const selectedFillings = useSelector(selectConstructorFillings);

  const totalPrice = useMemo(
    () =>
      (selectedBun ? selectedBun.price * 2 : 0) +
      selectedFillings.reduce((sum, ingredient) => sum + ingredient.price, 0),
    [selectedBun, selectedFillings]
  );

  const orderIngredients = useMemo(
    () =>
      selectedBun
        ? [
            selectedBun._id,
            ...selectedFillings.map((ingredient) => ingredient._id),
            selectedBun._id,
          ]
        : [],
    [selectedBun, selectedFillings]
  );

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
