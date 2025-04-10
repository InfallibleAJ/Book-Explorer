import styles from "./CategoryButton.module.css";

const CategoryButton = ({ category, onClick }) => {
  return (
    <button className={styles.button} onClick={() => onClick(category)}>
      <svg
        className={styles.funnelIcon}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 4H20V6.172C20 6.702 19.789 7.211 19.414 7.586L15 12V19L9 21V12L4.586 7.586C4.211 7.211 4 6.702 4 6.172V4Z"
          stroke="#5E56E7"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <p className={styles.categoryText}>
        {category}
      </p>
      <span className={styles.arrow}>➔</span>
    </button>
  );
};

export default CategoryButton;