import styles from './auth-layout.module.css';

export const AuthLayout = ({ title, onSubmit, children, footer }) => {
  return (
    <div className={styles.container}>
      <h1 className="text text_type_main-medium">{title}</h1>
      <form className={`${styles.form} mt-6`} onSubmit={onSubmit}>
        {children}
      </form>
      <div className={`${styles.footer} mt-20`}>{footer}</div>
    </div>
  );
};
