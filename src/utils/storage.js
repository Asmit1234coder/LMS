// Utility functions for localStorage read/write

const KEYS = {
  BOOKS: 'lms_books',
  MEMBERS: 'lms_members',
  TRANSACTIONS: 'lms_transactions',
  ACTIVITY: 'lms_activity',
  SEEDED: 'lms_seeded',
};

export function getBooks() {
  try {
    return JSON.parse(localStorage.getItem(KEYS.BOOKS)) || [];
  } catch {
    return [];
  }
}

export function setBooks(books) {
  localStorage.setItem(KEYS.BOOKS, JSON.stringify(books));
}

export function getMembers() {
  try {
    return JSON.parse(localStorage.getItem(KEYS.MEMBERS)) || [];
  } catch {
    return [];
  }
}

export function setMembers(members) {
  localStorage.setItem(KEYS.MEMBERS, JSON.stringify(members));
}

export function getTransactions() {
  try {
    return JSON.parse(localStorage.getItem(KEYS.TRANSACTIONS)) || [];
  } catch {
    return [];
  }
}

export function setTransactions(transactions) {
  localStorage.setItem(KEYS.TRANSACTIONS, JSON.stringify(transactions));
}

export function getActivity() {
  try {
    return JSON.parse(localStorage.getItem(KEYS.ACTIVITY)) || [];
  } catch {
    return [];
  }
}

export function addActivity(message) {
  const activity = getActivity();
  const entry = {
    id: Date.now(),
    message,
    timestamp: new Date().toISOString(),
  };
  const updated = [entry, ...activity].slice(0, 20); // keep latest 20
  localStorage.setItem(KEYS.ACTIVITY, JSON.stringify(updated));
}

export function isSeeded() {
  return localStorage.getItem(KEYS.SEEDED) === 'true';
}

export function markSeeded() {
  localStorage.setItem(KEYS.SEEDED, 'true');
}
