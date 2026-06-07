import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { memo } from 'react';

import styles from './card.module.css';

const Card = ({ ingredient, onClick }) => {
  const { image, name, price, count } = ingredient;
  return (
    <button type="button" className={styles.card} onClick={() => onClick(ingredient)}>
      <img src={image} className={`${styles.image} ml-4 mr-4 mb-2`} alt={name} />
      <p className={`${styles.price} text text_type_digits-default mb-2`}>
        {price}
        <CurrencyIcon type="primary" />
      </p>
      <p className={`${styles.name} text text_type_main-default`}>{name}</p>
      {count > 0 && <Counter count={count} size="default" />}
    </button>
  );
};

export default memo(Card);
