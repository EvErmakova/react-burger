import type { FC } from 'react';

import type { TModalOverlayProps } from './types';

import styles from './modal-overlay.module.css';

export const ModalOverlay: FC<TModalOverlayProps> = ({ onClick }) => {
  return <div className={styles.overlay} onClick={onClick} />;
};
