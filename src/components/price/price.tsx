import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import type { FC } from 'react';

import type { TPriceProps } from './types';

import styles from './price.module.css';

export const Price: FC<TPriceProps> = ({ price, size = 'default', className = '' }) => (
  <p
    className={`${styles.price} ${size === 'medium' ? styles.medium : ''} text text_type_digits-${size} ${className}`}
  >
    {price}
    <CurrencyIcon type="primary" />
  </p>
);
