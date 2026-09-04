import { useNavigate } from 'react-router-dom';

import { IngredientDetails } from '@components/ingredient-details/ingredient-details';
import { Modal } from '@components/modal/modal';

import type { FC } from 'react';

export const IngredientModal: FC = () => {
  const navigate = useNavigate();

  function handleClose(): void {
    navigate(-1);
  }

  return (
    <Modal title="Детали ингредиента" onClose={handleClose}>
      <IngredientDetails />
    </Modal>
  );
};
