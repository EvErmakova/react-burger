import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { ModalOverlay } from '@components/modal-overlay/modal-overlay';

import type { FC } from 'react';

import type { TModalProps } from './types';

import styles from './modal.module.css';

const modalRoot = document.getElementById('modals');

export const Modal: FC<TModalProps> = ({ title, onClose, children }) => {
  useEffect(() => {
    const handleEsc = (evt: KeyboardEvent): void => {
      if (evt.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc);
    document.body.classList.add('modal-open');

    return (): void => {
      document.removeEventListener('keydown', handleEsc);
      document.body.classList.remove('modal-open');
    };
  }, [onClose]);

  if (!modalRoot) {
    return null;
  }

  return createPortal(
    <>
      <ModalOverlay onClick={onClose} />
      <div className={styles.modal}>
        <div className={styles.header}>
          {title && (
            <h2 className={`${styles.title} text text_type_main-large`}>{title}</h2>
          )}
          <button
            className={styles.close}
            type="button"
            aria-label="Закрыть"
            onClick={onClose}
          >
            <CloseIcon type="primary" />
          </button>
        </div>
        <div className={`${styles.body} custom-scroll`}>{children}</div>
      </div>
    </>,
    modalRoot
  );
};
