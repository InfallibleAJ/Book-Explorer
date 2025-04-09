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
        <h3 className={styles.title}>{book.title}</h3>
        <p className={styles.author}>{authors}</p>
      </div>
    </div>
  );
};

export default BookCard;
