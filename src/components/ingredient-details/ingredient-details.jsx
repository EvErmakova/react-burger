import { useSelector } from 'react-redux';

import { selectIngredientDetails } from '@services/ingredient-details/slice';

import { NUTRITION } from './constants';

import styles from './ingredient-details.module.css';

export const IngredientDetails = () => {
  const ingredient = useSelector(selectIngredientDetails);

  if (!ingredient) {
    return null;
  }

  const { image_large, name } = ingredient;

  return (
    <>
      <img src={image_large} alt={name} className={`${styles.image} mb-4`} />
      <p className={`${styles.name} text text_type_main-medium mb-8`}>{name}</p>
      <ul className={styles.nutrition}>
        {NUTRITION.map(({ key, label }) => (
          <li key={key} className={`${styles.nutrient} text text_color_inactive`}>
            <span className="text text_type_main-default">{label}</span>
            <span className="text text_type_digits-default">{ingredient[key]}</span>
          </li>
        ))}
      </ul>
    </>
  );
};
