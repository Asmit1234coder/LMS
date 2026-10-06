/**
 * bookService.js
 *
 * Frontend service functions used to encapsulate application data operations.
 * This is a frontend-only application with no backend or REST API.
 * All data is persisted to browser localStorage.
 */

const BOOKS_KEY = 'library_books';

function generateId(books) {
  const nums = books
    .map((b) => parseInt(b.id.replace('B', ''), 10))
    .filter(Boolean);
  const max = nums.length ? Math.max(...nums) : 0;
  return `B${String(max + 1).padStart(3, '0')}`;
}

export function getBooks() {
  try {
    return JSON.parse(localStorage.getItem(BOOKS_KEY)) || [];
  } catch {
    return [];
  }
}

export function addBook({ title, author, category, isbn }) {
  const books = getBooks();
  const newBook = {
    id: generateId(books),
    title: title.trim(),
    author: author.trim(),
    category: category.trim(),
    isbn: isbn?.trim() || '—',
    status: 'Available',
    addedAt: new Date().toISOString(),
  };
  const updated = [...books, newBook];
  localStorage.setItem(BOOKS_KEY, JSON.stringify(updated));
  return newBook;
}

export function updateBook(id, fields) {
  const books = getBooks();
  const updated = books.map((b) => (b.id === id ? { ...b, ...fields } : b));
  localStorage.setItem(BOOKS_KEY, JSON.stringify(updated));
  return updated.find((b) => b.id === id);
}

export function deleteBook(id) {
  const books = getBooks();
  const book = books.find((b) => b.id === id);
  if (!book) return { success: false, error: 'Book not found.' };
  if (book.status === 'Issued') {
    return { success: false, error: 'Cannot delete a book that is currently issued. Return it first.' };
  }
  const updated = books.filter((b) => b.id !== id);
  localStorage.setItem(BOOKS_KEY, JSON.stringify(updated));
  return { success: true, book };
}

export function setBooks(books) {
  localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
}
