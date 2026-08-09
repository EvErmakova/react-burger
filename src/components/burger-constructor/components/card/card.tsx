import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { memo, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { moveIngredient, removeIngredient } from '@services/burger-constructor/slice';
import { useAppDispatch } from '@services/hooks';
import { DND_TYPES } from '@utils/constants';

import type { FC } from 'react';

import type { TCardProps, TDragItem } from './types';

import styles from './card.module.css';

const Card: FC<TCardProps> = ({ ingredient, index, type }) => {
  const dispatch = useAppDispatch();
  const cardRef = useRef<HTMLDivElement>(null);

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

  const [, dropRef] = useDrop<TDragItem>({
    accept: DND_TYPES.CONSTRUCTOR_INGREDIENT,
    hover: (item) => {
      if (item.index === undefined || index === undefined) {
        return;
      }
      dispatch(moveIngredient({ fromIndex: item.index, toIndex: index }));

      item.index = index;
    },
  });

  if (isDraggable) {
    dragRef(dropRef(cardRef));
  }

  if (!ingredient) {
    return null;
  }

  const { name, image, price, uniqueId } = ingredient;

  function getText(): string {
    if (type === 'top') return `${name} (верх)`;
    if (type === 'bottom') return `${name} (низ)`;
    return name;
  }

  const handleClose = (): void => {
    dispatch(removeIngredient(uniqueId));
  };

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
