import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { memo, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';

import { moveIngredient, removeIngredient } from '@services/burger-constructor/slice';
import { DND_TYPES } from '@utils/constants';

import styles from './card.module.css';

const Card = ({ ingredient, index, type }) => {
  const dispatch = useDispatch();
  const cardRef = useRef(null);

  const isLocked = type === 'top' || type === 'bottom';
  const isDraggable = !isLocked;

  const [{ isDragging }, dragRef] = useDrag({
    type: DND_TYPES.CONSTRUCTOR_INGREDIENT,
    item: () => ({ index }),
    canDrag: isDraggable,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: DND_TYPES.CONSTRUCTOR_INGREDIENT,
    hover: (ingredient) => {
      dispatch(moveIngredient({ fromIndex: ingredient.index, toIndex: index }));

      ingredient.index = index;
    },
  });

  if (isDraggable) {
    dragRef(dropRef(cardRef));
  }

  if (!ingredient) {
    return null;
  }

  const { name, image, price, uniqueId } = ingredient;

  function getText() {
    if (type === 'top') return `${name} (верх)`;
    if (type === 'bottom') return `${name} (низ)`;
    return name;
  }

  const handleClose = () => dispatch(removeIngredient(uniqueId));

  return (
    <div
      ref={isDraggable ? cardRef : null}
      className={`${isDraggable ? styles.card_draggable : 'ml-8'} ${isDragging ? styles.card_dragging : ''}`}
    >
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
