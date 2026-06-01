import { Counter, CurrencyIcon, Tab } from '@krgaa/react-developer-burger-ui-components';
import { Fragment, useMemo, useState } from 'react';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = ({ ingredients }) => {
  const [activeTab, setActiveTab] = useState('bun');

  const tabs = useMemo(() => {
    const getIngredientsByType = (type) =>
      ingredients.filter((ingredient) => ingredient.type === type);

    return [
      { value: 'bun', title: 'Булки', ingredients: getIngredientsByType('bun') },
      { value: 'sauce', title: 'Соусы', ingredients: getIngredientsByType('sauce') },
      { value: 'main', title: 'Начинки', ingredients: getIngredientsByType('main') },
    ];
  }, [ingredients]);

  return (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={styles.menu}>
          {tabs.map((tab) => (
            <li key={tab.value}>
              <Tab
                value={tab.value}
                active={tab.value === activeTab}
                onClick={() => {
                  setActiveTab(tab.value);
                }}
              >
                {tab.title}
              </Tab>
            </li>
          ))}
        </ul>
      </nav>

      <div className={`${styles.wrapper} custom-scroll mt-10 mb-10`}>
        {tabs.map((tab) => (
          <Fragment key={tab.value}>
            <h2 className="text text_type_main-medium mb-6">{tab.title}</h2>
            <ul className={styles.list}>
              {tab.ingredients.map((ingredient) => (
                <li key={ingredient._id} className={styles.item}>
                  <img
                    src={ingredient.image}
                    className={`${styles.image} ml-4 mr-4 mb-2`}
                    alt={ingredient.name}
                  />
                  <p className={`${styles.price} text text_type_digits-default mb-2`}>
                    {ingredient.price}
                    <CurrencyIcon type="primary" />
                  </p>
                  <p className={`${styles.name} text text_type_main-default`}>
                    {ingredient.name}
                  </p>
                  {ingredient.count > 0 && (
                    <Counter count={ingredient.count} size="default" />
                  )}
                </li>
              ))}
            </ul>
          </Fragment>
        ))}
      </div>
    </section>
  );
};
