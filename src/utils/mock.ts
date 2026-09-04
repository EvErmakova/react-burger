import { ORDER_STATUSES } from '@utils/constants';

import type { TOrder } from '@utils/types';

const BUN_KRATOR = '692889f16bf770001bfeb4cc';
const BUN_FLUORESCENT = '692889f16bf770001bfeb4cd';
const FILLET = '692889f16bf770001bfeb4ce';
const MOLLUSK = '692889f16bf770001bfeb4cf';
const METEORITE = '692889f16bf770001bfeb4d0';
const BIO_CUTLET = '692889f16bf770001bfeb4d1';
const SAUCE_SPICY = '692889f16bf770001bfeb4d2';
const SAUCE_SPACE = '692889f16bf770001bfeb4d3';
const SAUCE_GALACTIC = '692889f16bf770001bfeb4d4';
const SAUCE_SPIKES = '692889f16bf770001bfeb4d5';
const MINERAL_RINGS = '692889f16bf770001bfeb4d6';
const FALLENIAN_FRUITS = '692889f16bf770001bfeb4d7';
const ALPHA_SACCHARIDES = '692889f16bf770001bfeb4d8';
const EXO_PLANTAGO = '692889f16bf770001bfeb4d9';
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

export const MOCK_FEED_ORDERS: TOrder[] = [
  createOrder(
    34535,
    'Death Star Starship Main бургер',
    ORDER_STATUSES.PENDING,
    [BUN_FLUORESCENT, BUN_FLUORESCENT, FILLET, SAUCE_SPICY, MINERAL_RINGS],
    2
  ),
  createOrder(
    34534,
    'Interstellar бургер',
    ORDER_STATUSES.PENDING,
    [
      BUN_FLUORESCENT,
      BUN_FLUORESCENT,
      FILLET,
      SAUCE_SPICY,
      MINERAL_RINGS,
      SAUCE_GALACTIC,
      METEORITE,
      EXO_PLANTAGO,
      ASTEROID_CHEESE,
    ],
    5
  ),
  createOrder(
    34533,
    'Black Hole Singularity острый бургер',
    ORDER_STATUSES.DONE,
    [BUN_FLUORESCENT, BUN_FLUORESCENT, FILLET, SAUCE_GALACTIC, FALLENIAN_FRUITS],
    28
  ),
  createOrder(
    34532,
    'Supernova Infinity бургер',
    ORDER_STATUSES.DONE,
    [BUN_KRATOR, BUN_KRATOR, MOLLUSK, SAUCE_SPACE, ALPHA_SACCHARIDES],
    50
  ),
  createOrder(
    34530,
    'Interstellar традиционный-галактический бургер',
    ORDER_STATUSES.DONE,
    [BUN_KRATOR, BUN_KRATOR, BIO_CUTLET, SAUCE_GALACTIC],
    74
  ),
  createOrder(
    34527,
    'Space астероидный бургер',
    ORDER_STATUSES.DONE,
    [BUN_FLUORESCENT, BUN_FLUORESCENT, ASTEROID_CHEESE, SAUCE_SPIKES],
    99
  ),
  createOrder(
    34525,
    'Экзо-плантаго люминесцентный бургер',
    ORDER_STATUSES.DONE,
    [BUN_KRATOR, BUN_KRATOR, EXO_PLANTAGO, FILLET, SAUCE_SPACE],
    120
  ),
  createOrder(
    34538,
    'Метеоритный бургер',
    ORDER_STATUSES.PENDING,
    [BUN_KRATOR, BUN_KRATOR, METEORITE, SAUCE_SPICY],
    1
  ),
  createOrder(
    34541,
    'Фалленианский флюоресцентный бургер',
    ORDER_STATUSES.PENDING,
    [BUN_FLUORESCENT, BUN_FLUORESCENT, FALLENIAN_FRUITS, MINERAL_RINGS],
    1
  ),
  createOrder(
    34542,
    'Краторный минеральный бургер',
    ORDER_STATUSES.CREATED,
    [BUN_KRATOR, BUN_KRATOR, MINERAL_RINGS, SAUCE_SPIKES, BIO_CUTLET],
    1
  ),
];

export const MOCK_FEED_TOTAL = 28752;

export const MOCK_FEED_TOTAL_TODAY = 138;

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
