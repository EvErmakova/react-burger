import { ORDER_STATUSES } from '@utils/constants';

import type { TOrder } from '@utils/types';

const BUN_KRATOR = '692889f16bf770001bfeb4cc';
const BUN_FLUORESCENT = '692889f16bf770001bfeb4cd';
const MOLLUSK = '692889f16bf770001bfeb4cf';
const SAUCE_SPICY = '692889f16bf770001bfeb4d2';
const SAUCE_SPACE = '692889f16bf770001bfeb4d3';
const ASTEROID_CHEESE = '692889f16bf770001bfeb4da';

const hoursAgo = (hours: number): string =>
  new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();

const createOrder = (
  number: number,
  name: string,
  status: TOrder['status'],
  ingredients: string[],
  hours: number
): TOrder => ({
  _id: `mock-${number}`,
  number,
  name,
  status,
  ingredients,
  createdAt: hoursAgo(hours),
  updatedAt: hoursAgo(hours),
});

export const MOCK_USER_ORDERS: TOrder[] = [
  createOrder(
    103219,
    'Флюоресцентный бургер',
    ORDER_STATUSES.DONE,
    [BUN_FLUORESCENT, BUN_FLUORESCENT],
    20
  ),
  createOrder(
    103218,
    'Флюоресцентный бургер',
    ORDER_STATUSES.DONE,
    [BUN_FLUORESCENT, BUN_FLUORESCENT],
    22
  ),
  createOrder(
    102269,
    'Space флюоресцентный бургер',
    ORDER_STATUSES.DONE,
    [BUN_FLUORESCENT, BUN_FLUORESCENT, SAUCE_SPACE],
    528
  ),
  createOrder(
    102268,
    'Астероидный краторный бургер',
    ORDER_STATUSES.PENDING,
    [BUN_KRATOR, BUN_KRATOR, ASTEROID_CHEESE, SAUCE_SPICY, MOLLUSK],
    530
  ),
];
