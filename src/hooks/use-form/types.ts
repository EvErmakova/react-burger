import type { ChangeEvent, Dispatch, SetStateAction } from 'react';

export type TUseForm<T> = {
  values: T;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  setValues: Dispatch<SetStateAction<T>>;
};
