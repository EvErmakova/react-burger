import { Fragment, useCallback, useMemo, useRef, useState } from 'react';

import { IngredientDetails } from '@components/ingredient-details/ingredient-details';
import { Modal } from '@components/modal/modal';

import Card from './components/card/card';
import { Tabs } from './components/tabs/tabs';
import { INGREDIENT_TABS } from './constants';
import { getClosestTab, scrollToHeading } from './helpers';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = ({ ingredients }) => {
  const [activeTab, setActiveTab] = useState(INGREDIENT_TABS[0].value);
  const [selectedIngredient, setSelectedIngredient] = useState(null);

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

  const handleCardClick = useCallback((ingredient) => {
    setSelectedIngredient(ingredient);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedIngredient(null);
  }, []);

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

      {selectedIngredient && (
        <Modal title="Детали ингредиента" onClose={handleCloseModal}>
          <IngredientDetails ingredient={selectedIngredient} />
        </Modal>
      )}
    </section>
  );
};
