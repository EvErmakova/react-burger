import { Button, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { Modal } from '@components/modal/modal';
import { OrderDetails } from '@components/order-details/order-details';
import { useModal } from '@hooks/use-modal';
import { getIsAuthenticated } from '@services/auth/slice';
import { getOrderIngredients, getTotalPrice } from '@services/burger-constructor/slice';
import { createOrder } from '@services/order/actions';
import { clearOrder } from '@services/order/slice';

import styles from './total.module.css';

const Total = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isModalOpen, openModal, closeModal } = useModal();

  const isAuthenticated = useSelector(getIsAuthenticated);
  const totalPrice = useSelector(getTotalPrice);
  const orderIngredients = useSelector(getOrderIngredients);

  const handleOrder = () => {
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
