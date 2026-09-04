import { Button, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { memo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Modal } from '@components/modal/modal';
import { OrderDetails } from '@components/order-details/order-details';
import { useModal } from '@hooks/use-modal/use-modal';
import { getIsAuthenticated } from '@services/auth/slice';
import { getOrderIngredients, getTotalPrice } from '@services/burger-constructor/slice';
import { useAppDispatch, useAppSelector } from '@services/hooks';
import { createOrder } from '@services/order/actions';
import { clearOrder } from '@services/order/slice';

import type { FC } from 'react';

import styles from './total.module.css';

const Total: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isModalOpen, openModal, closeModal } = useModal();

  const isAuthenticated = useAppSelector(getIsAuthenticated);
  const totalPrice = useAppSelector(getTotalPrice);
  const orderIngredients = useAppSelector(getOrderIngredients);

  const handleOrder = (): void => {
    if (!orderIngredients.length) {
      return;
    }
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location } });
      return;
    }
    dispatch(createOrder(orderIngredients));
    openModal();
  };

  const handleClose = (): void => {
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
        htmlType="button"
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
