import { useState, useCallback, useEffect } from "react";
import styles from "./SearchBar.module.css";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debouncedOnSearch = useCallback(
    debounce((newQuery) => {
      onSearch(newQuery);
    }, 300),
    [onSearch]
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedOnSearch(value);
  };

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={handleChange}
        className={styles.input}
      />
    </div>
  );
};

export default SearchBar;