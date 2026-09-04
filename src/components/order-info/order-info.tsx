import { FormattedDate, Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useMemo } from 'react';

import { IngredientIcon } from '@components/ingredient-icon/ingredient-icon';
import { Price } from '@components/price/price';
import { useAppSelector } from '@services/hooks';
import { getIngredients } from '@services/ingredients/slice';
import { ORDER_STATUSES, ORDER_STATUS_LABELS } from '@utils/constants';
import {
  countOrderIngredients,
  getOrderPrice,
  resolveOrderIngredients,
} from '@utils/helpers';

import type { FC } from 'react';

import type { TOrderInfoProps } from './types';

import styles from './order-info.module.css';

export const OrderInfo: FC<TOrderInfoProps> = ({ order, isLoading, error }) => {
  const ingredients = useAppSelector(getIngredients);

  const orderIngredients = useMemo(
    () => resolveOrderIngredients(order?.ingredients ?? [], ingredients),
    [order, ingredients]
  );

  const countedIngredients = useMemo(
    () => countOrderIngredients(orderIngredients),
    [orderIngredients]
  );

  const price = useMemo(() => getOrderPrice(orderIngredients), [orderIngredients]);

  if (isLoading) {
    return <Preloader />;
  }

  if (error || !order) {
    return (
      <p className={`${styles.error} text text_type_main-default`}>
        {error ? `Не удалось загрузить заказ: ${error}` : 'Заказ не найден'}
      </p>
    );
  }

  return (
    <>
      <h2 className="text text_type_main-medium mt-5">{order.name}</h2>

      <p
        className={`text text_type_main-default ${order.status === ORDER_STATUSES.DONE ? 'text_color_success' : ''} mt-2 mb-15`}
      >
        {ORDER_STATUS_LABELS[order.status]}
      </p>

      <h3 className={`${styles.subtitle} text text_type_main-medium`}>Состав:</h3>

      <ul className={`${styles.ingredients} custom-scroll pr-6`}>
        {countedIngredients.map(({ ingredient, count }) => (
          <li key={ingredient._id} className={styles.ingredient}>
            <IngredientIcon ingredient={ingredient} />
            <p className="text text_type_main-default">{ingredient.name}</p>
            <Price price={`${count} x ${ingredient.price}`} />
          </li>
        ))}
      </ul>

      <div className={`${styles.footer} mt-10`}>
        <FormattedDate
          date={new Date(order.createdAt)}
          className="text text_type_main-default text_color_inactive"
        />
        <Price price={String(price)} />
      </div>
    </>
  );
};
