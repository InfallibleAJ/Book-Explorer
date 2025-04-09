import axios from "axios";
import { API_BASE_URL } from "./proxy";

const gutendexApi = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchCategories = async () => {
  try {
    const response = await gutendexApi.get("/books?mime_type=image%2F");
    const books = response.data.results;

    // Extract unique subjects and bookshelves
    const categories = new Set();
    books.forEach((book) => {
      if (book.subjects) {
        book.subjects.forEach((subject) => categories.add(subject));
      }
      if (book.bookshelves) {
        book.bookshelves.forEach((shelf) => categories.add(shelf));
      }
    });

    return Array.from(categories).sort();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const fetchBooks = async (topic, search = "", page = 1) => {
  try {
    const params = {
      topic,
      search,
      page,
      mime_type: "image/",
    };

    const response = await gutendexApi.get("/books", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    return { count: 0, next: null, previous: null, results: [] };
  }
};

export const getBookFileUrl = (book) => {
  if (!book.formats) return null;

  // Check for preferred formats in order
  if (book.formats["text/html"]) {
    return book.formats["text/html"];
  }
  if (book.formats["application/pdf"]) {
    return book.formats["application/pdf"];
  }
  if (book.formats["text/plain"]) {
    return book.formats["text/plain"];
  }

  // Handle zip files (bonus point solution)
  const textFormats = Object.entries(book.formats).find(
    ([key]) => key.startsWith("text/") && !key.endsWith(".zip")
  );

  return textFormats ? textFormats[1] : null;
};
