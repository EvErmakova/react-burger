import type { TIngredientTab, TIngredientType, TOrderStatus } from '@utils/types';

const API_HOST = 'new-stellarburgers.education-services.ru';

export const API_URL = `https://${API_HOST}/api`;

export const FEED_SOCKET_URL = `wss://${API_HOST}/orders/all`;

export const USER_ORDERS_SOCKET_URL = `wss://${API_HOST}/orders`;

export const INVALID_TOKEN_MESSAGE = 'Invalid or missing token';

export const RECONNECT_DELAY = 3000;

export const DND_TYPES = {
  INGREDIENT: 'ingredient',
  CONSTRUCTOR_INGREDIENT: 'constructor-ingredient',
} as const;

export const INGREDIENT_TYPES = {
  BUN: 'bun',
  SAUCE: 'sauce',
  MAIN: 'main',
} satisfies Record<string, TIngredientType>;

export const INGREDIENT_TABS: TIngredientTab[] = [
  { value: INGREDIENT_TYPES.BUN, title: 'Булки' },
  { value: INGREDIENT_TYPES.SAUCE, title: 'Соусы' },
  { value: INGREDIENT_TYPES.MAIN, title: 'Начинки' },
];

export const ORDER_STATUSES = {
  CREATED: 'created',
  PENDING: 'pending',
  DONE: 'done',
} satisfies Record<string, TOrderStatus>;

export const ORDER_STATUS_LABELS: Record<TOrderStatus, string> = {
  [ORDER_STATUSES.CREATED]: 'Создан',
  [ORDER_STATUSES.PENDING]: 'Готовится',
  [ORDER_STATUSES.DONE]: 'Выполнен',
};

export const MAX_VISIBLE_INGREDIENTS = 6;

export const MAX_ORDERS_IN_COLUMN = 10;

export const MAX_ORDER_COLUMNS = 2;
