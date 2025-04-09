import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCategories } from "../../api/gutendex";
import CategoryButton from "../../components/CategoryButton/CategoryButton";
import Header from "../../components/Header/Header";
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
      <Header title="Book Explorer" />

      <div className={styles.content}>
        <h2 className={styles.subtitle}>Select a Category</h2>

        {loading ? (
          <p>Loading categories...</p>
        ) : (
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
    </div>
  );
};

export default CategoriesPage;
