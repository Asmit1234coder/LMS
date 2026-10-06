/**
 * circulationService.js
 *
 * Frontend service functions used to encapsulate application data operations.
 * This is a frontend-only application with no backend or REST API.
 * All data is persisted to browser localStorage.
 *
 * Handles book issue and return workflows.
 */

import { getBooks, setBooks } from './bookService';
import { getMembers, setMembers } from './memberService';

const TRANSACTIONS_KEY = 'library_transactions';
const ACTIVITY_KEY = 'library_activity';

function generateTxId(transactions) {
  const nums = transactions
    .map((t) => parseInt(t.id.replace('T', ''), 10))
    .filter(Boolean);
  const max = nums.length ? Math.max(...nums) : 0;
  return `T${String(max + 1).padStart(3, '0')}`;
}

export function getTransactions() {
  try {
    return JSON.parse(localStorage.getItem(TRANSACTIONS_KEY)) || [];
  } catch {
    return [];
  }
}

export function setTransactions(transactions) {
  localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
}

export function getIssuedBooks() {
  return getTransactions().filter((t) => t.status === 'Issued');
}

export function issueBook({ bookId, memberId, issueDate, dueDate }) {
  const books = getBooks();
  const members = getMembers();
  const transactions = getTransactions();

  const book = books.find((b) => b.id === bookId);
  const member = members.find((m) => m.id === memberId);

  if (!book) return { success: false, error: 'Book not found.' };
  if (!member) return { success: false, error: 'Member not found.' };
  if (book.status === 'Issued') return { success: false, error: 'This book is already issued.' };

  const tx = {
    id: generateTxId(transactions),
    bookId: book.id,
    bookTitle: book.title,
    bookCategory: book.category,
    memberId: member.id,
    memberName: member.name,
    issueDate,
    dueDate,
    status: 'Issued',
  };

  setBooks(books.map((b) => (b.id === bookId ? { ...b, status: 'Issued' } : b)));
  setMembers(members.map((m) => (m.id === memberId ? { ...m, booksIssued: m.booksIssued + 1 } : m)));
  setTransactions([...transactions, tx]);
  addActivityEntry(`${member.name} issued "${book.title}"`);

  return { success: true, transaction: tx, book, member };
}

export function returnBook(txId) {
  const books = getBooks();
  const members = getMembers();
  const transactions = getTransactions();

  const tx = transactions.find((t) => t.id === txId);
  if (!tx) return { success: false, error: 'Transaction not found.' };
  if (tx.status === 'Returned') return { success: false, error: 'This book has already been returned.' };

  setBooks(books.map((b) => (b.id === tx.bookId ? { ...b, status: 'Available' } : b)));
  setMembers(
    members.map((m) =>
      m.id === tx.memberId ? { ...m, booksIssued: Math.max(0, m.booksIssued - 1) } : m
    )
  );
  setTransactions(
    transactions.map((t) =>
      t.id === txId ? { ...t, status: 'Returned', returnDate: new Date().toISOString().split('T')[0] } : t
    )
  );
  addActivityEntry(`${tx.memberName} returned "${tx.bookTitle}"`);

  return { success: true, transaction: tx };
}

export function getActivity() {
  try {
    return JSON.parse(localStorage.getItem(ACTIVITY_KEY)) || [];
  } catch {
    return [];
  }
}

export function addActivityEntry(message) {
  const activity = getActivity();
  const entry = {
    id: Date.now(),
    message,
    timestamp: new Date().toISOString(),
  };
  const updated = [entry, ...activity].slice(0, 30);
  localStorage.setItem(ACTIVITY_KEY, JSON.stringify(updated));
}
