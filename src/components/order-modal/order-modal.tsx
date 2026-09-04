import { useNavigate, useParams } from 'react-router-dom';

import { Modal } from '@components/modal/modal';
import { OrderInfo } from '@components/order-info/order-info';
import { useOrder } from '@hooks/use-order/use-order';

import type { FC } from 'react';

export const OrderModal: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const orderState = useOrder(id);

  function handleClose(): void {
    navigate(-1);
  }

  return (
    <Modal
      title={
        orderState.order && (
          <span className="text text_type_digits-default">
            #{orderState.order.number}
          </span>
        )
      }
      onClose={handleClose}
    >
      <OrderInfo {...orderState} />
    </Modal>
  );
};
