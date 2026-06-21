import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { memo } from 'react';
import { useDispatch } from 'react-redux';

import { removeIngredient } from '@services/burger-constructor/slice';

import styles from './card.module.css';

const Card = ({ ingredient, type }) => {
  const dispatch = useDispatch();

  if (!ingredient) {
    return null;
  }

  const { name, image, price, uniqueId } = ingredient;
  const isLocked = type === 'top' || type === 'bottom';
  const isDraggable = !isLocked;

  function getText() {
    if (type === 'top') return `${name} (верх)`;
    if (type === 'bottom') return `${name} (низ)`;
    return name;
  }

  const handleClose = () => dispatch(removeIngredient(uniqueId));

  return (
    <div className={isDraggable ? styles.card_draggable : 'ml-8'}>
      {isDraggable && <DragIcon type="primary" />}
      <ConstructorElement
        type={type}
        text={getText()}
        thumbnail={image}
        price={price}
        isLocked={isLocked}
        handleClose={isDraggable ? handleClose : undefined}
      />
    </div>
  );
};

export default memo(Card);
