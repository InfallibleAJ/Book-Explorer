import styles from "./Header.module.css";

const Header = ({ title, onBack }) => {
  return (
    <header className={styles.header}>
      {onBack && (
        <button className={styles.backButton} onClick={onBack}>
          &#x2190;
        </button>
      )}
      <p className={styles.title}>{title}</p>
    </header>
  );
};

export default Header;
