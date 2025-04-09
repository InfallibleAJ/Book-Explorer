import styles from "./Header.module.css";

const Header = ({ title, onBack }) => {
  return (
    <header className={styles.header}>
      {onBack && (
        <button className={styles.backButton} onClick={onBack}>
          &larr;
        </button>
      )}
      <h1 className={styles.title}>{title}</h1>
    </header>
  );
};

export default Header;
