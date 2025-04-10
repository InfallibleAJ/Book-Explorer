import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchBooks, getBookFileUrl } from "../../api/gutendex";
import BookCard from "../../components/BookCard/BookCard";
import Header from "../../components/Header/Header";
import SearchBar from "../../components/SearchBar/SearchBar";
import Spinner from "../../components/Spinner/Spinner";
import styles from "./BooksPage.module.css";

const BooksPage = () => {
  const [searchParams] = useSearchParams();
  const topic = searchParams.get("topic") || "";
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);
      const data = await fetchBooks(
        topic,
        searchQuery.trim(), // Trim whitespace
        1
      );
      setBooks(data.results);
      setHasMore(data.next !== null);
      setLoading(false);
    };

    loadBooks();
  }, [topic, searchQuery]);

  const loadMoreBooks = async () => {
    const nextPage = page + 1;
    const data = await fetchBooks(topic, searchQuery, nextPage);

    setBooks((prev) => [...prev, ...data.results]);
    setHasMore(data.next !== null);
    setPage(nextPage);
  };
  const handleSearch = (query) => {
    setSearchQuery(query);
    // Reset to page 1 when search changes
    setPage(1);
  };

  const handleBookClick = (book) => {
    const url = getBookFileUrl(book);

    if (url) {
      window.open(url, "_blank");
    } else {
      alert("No viewable version available");
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <Header title={topic} onBack={handleBack} />
      </div>

      <div className={styles.content}>
        <div className={styles.searchBarContainer}>
          <SearchBar onSearch={handleSearch} />
        </div>

        {loading ? (
          <div className={styles.loading}>
            <Spinner />
          </div>
        ) : books.length === 0 ? (
          <p className={styles.noResults}>No books found for this category.</p>
        ) : (
          <div className={styles.bookContainer}>
            <InfiniteScroll
              dataLength={books.length}
              next={loadMoreBooks}
              hasMore={hasMore}
              loader={<Spinner />}
              className={styles.booksGrid}
            >
              {books.map((book) => (
                <BookCard key={book.id} book={book} onClick={handleBookClick} />
              ))}
            </InfiniteScroll>
          </div>
        )}
      </div>
    </div>
  );
};

export default BooksPage;