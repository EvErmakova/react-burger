import { Fragment, useCallback, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { getIngredients } from '@services/ingredients/slice';
import { INGREDIENT_TABS } from '@utils/constants';

import Card from './components/card/card';
import { Tabs } from './components/tabs/tabs';
import { getClosestTab, scrollToHeading } from './helpers';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = () => {
  const ingredients = useSelector(getIngredients);
  const location = useLocation();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(INGREDIENT_TABS[0].value);

  const containerRef = useRef(null);
  const headingRefs = useRef({});

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
    scrollToHeading(containerRef.current, headingRefs.current[tab]);
  }

  function handleScroll() {
    if (containerRef.current) {
      setActiveTab(getClosestTab(containerRef.current, headingRefs.current));
    }
  }

  const handleCardClick = useCallback(
    (ingredient) => {
      navigate(`/ingredients/${ingredient._id}`, {
        state: { backgroundLocation: location },
      });
    },
    [navigate, location]
  );

  return (
    <section className={styles.burger_ingredients}>
      <Tabs activeTab={activeTab} onTabChange={handleTabChange} />

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className={`${styles.wrapper} custom-scroll mt-10`}
      >
        {ingredientsByType.map((tab) => (
          <Fragment key={tab.value}>
            <h2
              ref={(node) => {
                headingRefs.current[tab.value] = node;
              }}
              className="text text_type_main-medium mb-6"
            >
              {tab.title}
            </h2>
            <ul className={styles.list}>
              {tab.ingredients.map((ingredient) => (
                <li key={ingredient._id} className={styles.item}>
                  <Card ingredient={ingredient} onClick={handleCardClick} />
                </li>
              ))}
            </ul>
          </Fragment>
        ))}
      </div>
    </section>
  );
};
