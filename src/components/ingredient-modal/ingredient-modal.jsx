import { useNavigate } from 'react-router-dom';

import { IngredientDetails } from '@components/ingredient-details/ingredient-details';
import { Modal } from '@components/modal/modal';

export const IngredientModal = () => {
  const navigate = useNavigate();

  function handleClose() {
    navigate(-1);
  }

  return (
    <Modal title="Детали ингредиента" onClose={handleClose}>
      <IngredientDetails />
    </Modal>
  );
};
