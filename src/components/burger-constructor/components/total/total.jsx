import { Button, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import styles from './total.module.css';

export const Total = ({ totalPrice }) => {
  function handleOrderClick() {
    console.log('Оформить заказ');
  }

  return (
    <div className={styles.total}>
      <p className={`${styles.price} text text_type_digits-medium`}>
        {totalPrice}
        <CurrencyIcon type="primary" className={styles.currency_icon} />
      </p>
      <Button onClick={handleOrderClick} size="large" type="primary">
        Оформить заказ
      </Button>
    </div>
  );
};
