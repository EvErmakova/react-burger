import type { FC } from 'react';

import type { TPlaceholderProps } from './types';

import styles from './placeholder.module.css';

export const Placeholder: FC<TPlaceholderProps> = ({ type, text, isHover }) => {
  return (
    <div
      className={`${styles.placeholder} ${type ? styles[type] : ''} ${isHover ? styles.is_hover : ''} ml-8`}
    >
      <p className="text text_type_main-default">{text}</p>
    </div>
  );
};
