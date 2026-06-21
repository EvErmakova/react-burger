import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { memo } from 'react';

import styles from './card.module.css';

const Card = ({ ingredient, type }) => {
  if (!ingredient) {
    return null;
  }

  const { name, image, price } = ingredient;
  const isLocked = type === 'top' || type === 'bottom';
  const isDraggable = !isLocked;

  function getText() {
    if (type === 'top') return `${name} (верх)`;
    if (type === 'bottom') return `${name} (низ)`;
    return name;
  }

  return (
    <div className={isDraggable ? styles.card_draggable : 'ml-8'}>
      {isDraggable && <DragIcon type="primary" />}
      <ConstructorElement
        type={type}
        text={getText()}
        thumbnail={image}
        price={price}
        isLocked={isLocked}
      />
    </div>
  );
};

export default memo(Card);
