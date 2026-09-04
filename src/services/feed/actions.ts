import { createAction } from '@reduxjs/toolkit';

export const connectFeed = createAction<string>('feed/connect');

export const disconnectFeed = createAction('feed/disconnect');
