import { createAction } from '@reduxjs/toolkit';

export const connectUserOrders = createAction<string>('userOrders/connect');

export const disconnectUserOrders = createAction('userOrders/disconnect');
