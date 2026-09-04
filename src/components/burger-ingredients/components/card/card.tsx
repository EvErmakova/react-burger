import { Counter } from '@krgaa/react-developer-burger-ui-components';
import { memo, useRef } from 'react';
import { useDrag } from 'react-dnd';

import { Price } from '@components/price/price';
import { getIngredientCount } from '@services/burger-constructor/slice';
import { useAppSelector } from '@services/hooks';
import { DND_TYPES } from '@utils/constants';

import type { FC } from 'react';

import type { TIngredientCardProps } from './types';

import styles from './card.module.css';

const Card: FC<TIngredientCardProps> = ({ ingredient, onClick }) => {
  const { image, name, price } = ingredient;
  const count = useAppSelector((state) => getIngredientCount(state, ingredient._id));

  const cardRef = useRef<HTMLButtonElement>(null);

  const [{ isDragging }, dragRef] = useDrag({
    type: DND_TYPES.INGREDIENT,
    item: ingredient,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  dragRef(cardRef);

  return (
    <button
      ref={cardRef}
      type="button"
      className={`${styles.card} ${isDragging ? styles.dragging : ''}`}
      onClick={() => onClick(ingredient)}
    >
      <img src={image} className={`${styles.image} ml-4 mr-4 mb-2`} alt={name} />
      <Price price={String(price)} className={`${styles.price} mb-2`} />
      <p className={`${styles.name} text text_type_main-default`}>{name}</p>
      {count > 0 && <Counter extraClass={styles.counter} count={count} size="default" />}
    </button>
  );
};

export default memo(Card);
