import styles from "./CategoryButton.module.css";

const CategoryButton = ({ category, onClick }) => {
  return (
    <button className={styles.button} onClick={() => onClick(category)}>
      {category}
    </button>
  );
};

export default CategoryButton;
