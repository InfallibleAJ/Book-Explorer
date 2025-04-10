import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCategories } from "../../api/gutendex";
import CategoryButton from "../../components/CategoryButton/CategoryButton";
import styles from "./CategoriesPage.module.css";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
      setLoading(false);
    };

    loadCategories();
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/books?topic=${encodeURIComponent(category)}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Guten Quest</h1>
        <h2 className={styles.subtitle}>Select Category</h2>
      </div>

      {loading ? (
        <div className={styles.categoriesGrid}>
          <p>Loading categories...</p>
        </div>) : (
        <div className={styles.categoriesGrid}>
          {categories.map((category) => (
            <CategoryButton
              key={category}
              category={category}
              onClick={handleCategoryClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
