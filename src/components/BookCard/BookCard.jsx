import styles from "./BookCard.module.css";

const BookCard = ({ book, onClick }) => {
  const authors =
    book.authors?.map((author) => author.name).join(", ") || "Unknown Author";

  return (
    <div className={styles.card} onClick={() => onClick(book)}>
      <div className={styles.imageContainer}>
        {book.formats["image/jpeg"] ? (
          <img
            src={book.formats["image/jpeg"]}
            alt={book.title}
            className={styles.image}
          />
        ) : (
          <div className={styles.placeholder}>No Cover</div>
        )}
      </div>
      <div className={styles.details}>
        <p className={styles.title}>{book.title}</p>
        <p className={styles.author}>By {authors}</p>
      </div>
    </div>
  );
};

export default BookCard;