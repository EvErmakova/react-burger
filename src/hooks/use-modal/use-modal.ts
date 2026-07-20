import { useCallback, useState } from 'react';

import type { TUseModal } from './types';

export const useModal = (): TUseModal => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback((): void => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback((): void => {
    setIsModalOpen(false);
  }, []);

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
};
