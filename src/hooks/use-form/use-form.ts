import { useState } from 'react';

import type { ChangeEvent } from 'react';

import type { TUseForm } from './types';

export const useForm = <T extends Record<string, string>>(
  inputValues: T
): TUseForm<T> => {
  const [values, setValues] = useState<T>(inputValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return { values, handleChange, setValues };
};
