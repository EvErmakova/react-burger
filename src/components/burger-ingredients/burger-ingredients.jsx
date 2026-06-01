import { Fragment, useMemo, useState } from 'react';

import { Card } from './components/card/card';
import { Tabs } from './components/tabs/tabs';
import { INGREDIENT_TABS } from './constants';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = ({ ingredients }) => {
  const [activeTab, setActiveTab] = useState(INGREDIENT_TABS[0].value);

  const ingredientsByType = useMemo(
    () =>
      INGREDIENT_TABS.map((tab) => ({
        ...tab,
        ingredients: ingredients.filter((ingredient) => ingredient.type === tab.value),
      })),
    [ingredients]
  );

  function handleTabChange(tab) {
    setActiveTab(tab);
  }

  return (
    <section className={styles.burger_ingredients}>
      <Tabs activeTab={activeTab} onTabChange={handleTabChange} />

      <div className={`${styles.wrapper} custom-scroll mt-10`}>
        {ingredientsByType.map((tab) => (
          <Fragment key={tab.value}>
            <h2 className="text text_type_main-medium mb-6">{tab.title}</h2>
            <ul className={styles.list}>
              {tab.ingredients.map((ingredient) => (
                <li key={ingredient._id} className={styles.item}>
                  <Card ingredient={ingredient} />
                </li>
              ))}
            </ul>
          </Fragment>
        ))}
      </div>
    </section>
  );
};
