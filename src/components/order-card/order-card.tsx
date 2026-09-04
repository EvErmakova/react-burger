import { FormattedDate } from '@krgaa/react-developer-burger-ui-components';
import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Price } from '@components/price/price';
import { useAppSelector } from '@services/hooks';
import { getIngredients } from '@services/ingredients/slice';
import { ORDER_STATUSES, ORDER_STATUS_LABELS } from '@utils/constants';
import { getOrderPrice, resolveOrderIngredients } from '@utils/helpers';

import { IngredientIcons } from './components/ingredient-icons/ingredient-icons';

import type { FC } from 'react';

import type { TOrderCardProps } from './types';

import styles from './order-card.module.css';

export const OrderCard: FC<TOrderCardProps> = ({ order, to, showStatus = false }) => {
  const location = useLocation();
  const ingredients = useAppSelector(getIngredients);

  const orderIngredients = useMemo(
    () => resolveOrderIngredients(order.ingredients, ingredients),
    [order.ingredients, ingredients]
  );

  const price = useMemo(() => getOrderPrice(orderIngredients), [orderIngredients]);

  return (
    <Link
      to={to}
      state={{ backgroundLocation: location }}
      className={`${styles.card} p-6`}
    >
      <div className={`${styles.header} mb-6`}>
        <p className="text text_type_digits-default">#{order.number}</p>
        <FormattedDate
          date={new Date(order.createdAt)}
          className="text text_type_main-default text_color_inactive"
        />
      </div>

      <h2 className={`${styles.title} text text_type_main-medium`}>{order.name}</h2>

      {showStatus && (
        <p
          className={`text text_type_main-default ${order.status === ORDER_STATUSES.DONE ? 'text_color_success' : ''} mt-2`}
        >
          {ORDER_STATUS_LABELS[order.status]}
        </p>
      )}

      <div className={`${styles.footer} mt-6`}>
        <IngredientIcons ingredients={orderIngredients} />
        <Price price={String(price)} />
      </div>
    </Link>
  );
};
