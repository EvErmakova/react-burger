import styles from './placeholder.module.css';

export const Placeholder = ({ type, text, isHover }) => {
  return (
    <div
      className={`${styles.placeholder} ${type ? styles[type] : ''} ${isHover ? styles.is_hover : ''} ml-8`}
    >
      <p className={`${styles.text} text text_type_main-default`}>{text}</p>
    </div>
  );
};
