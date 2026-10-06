import { useState } from 'react';
import { getBooks, setBooks, addActivity } from '../utils/storage';

function generateId(books) {
  const nums = books.map((b) => parseInt(b.id.replace('B', ''), 10)).filter(Boolean);
  const max = nums.length ? Math.max(...nums) : 0;
  return `B${String(max + 1).padStart(3, '0')}`;
}

const EMPTY_FORM = { title: '', author: '', category: '', isbn: '' };

export default function Books({ onDataChange }) {
  const [books, setLocalBooks] = useState(() => getBooks());
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  function save(updated) {
    setBooks(updated);
    setLocalBooks(updated);
    if (onDataChange) onDataChange();
  }

  function handleFieldChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  }

  function validate() {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Title is required';
    if (!form.author.trim()) errs.author = 'Author is required';
    if (!form.category.trim()) errs.category = 'Category is required';
    return errs;
  }

  function handleAddBook(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    const newBook = {
      id: generateId(books),
      title: form.title.trim(),
      author: form.author.trim(),
      category: form.category.trim(),
      isbn: form.isbn.trim() || '—',
      status: 'Available',
    };
    const updated = [...books, newBook];
    save(updated);
    addActivity(`Admin added "${newBook.title}"`);
    setForm(EMPTY_FORM);
    setShowForm(false);
  }

  function handleDelete(id) {
    const book = books.find((b) => b.id === id);
    if (book && book.status === 'Issued') {
      alert('Cannot delete a book that is currently issued. Return it first.');
      return;
    }
    if (!window.confirm(`Delete "${book?.title}"? This cannot be undone.`)) return;
    save(books.filter((b) => b.id !== id));
  }

  const filtered = books.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase()) ||
      b.category.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'All' || b.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Books</h1>
          <div className="page-subtitle">{books.length} books in collection</div>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm((v) => !v)}>
          {showForm ? 'Cancel' : '+ Add Book'}
        </button>
      </div>

      {/* Add Book Form */}
      {showForm && (
        <div className="add-form-panel">
          <div className="add-form-title">Add New Book</div>
          <form onSubmit={handleAddBook} noValidate>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="title">Title *</label>
                <input
                  id="title"
                  name="title"
                  className="form-control"
                  placeholder="Book title"
                  value={form.title}
                  onChange={handleFieldChange}
                />
                {errors.title && <span className="form-error">{errors.title}</span>}
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="author">Author *</label>
                <input
                  id="author"
                  name="author"
                  className="form-control"
                  placeholder="Author name"
                  value={form.author}
                  onChange={handleFieldChange}
                />
                {errors.author && <span className="form-error">{errors.author}</span>}
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="category">Category *</label>
                <input
                  id="category"
                  name="category"
                  className="form-control"
                  placeholder="e.g. Programming"
                  value={form.category}
                  onChange={handleFieldChange}
                />
                {errors.category && <span className="form-error">{errors.category}</span>}
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="isbn">ISBN</label>
                <input
                  id="isbn"
                  name="isbn"
                  className="form-control"
                  placeholder="Optional"
                  value={form.isbn}
                  onChange={handleFieldChange}
                />
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">Add Book</button>
              <button type="button" className="btn btn-secondary" onClick={() => { setShowForm(false); setForm(EMPTY_FORM); setErrors({}); }}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Search & Filter */}
      <div className="toolbar">
        <input
          type="search"
          id="book-search"
          className="form-control search-input"
          placeholder="Search by title, author, or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search books"
        />
        <select
          id="book-filter"
          className="form-control"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          aria-label="Filter by status"
          style={{ width: 'auto' }}
        >
          <option value="All">All Status</option>
          <option value="Available">Available</option>
          <option value="Issued">Issued</option>
        </select>
      </div>

      {/* Books Table */}
      <div className="panel">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Book ID</th>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>ISBN</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7}>
                    <div className="empty-state">
                      <div className="empty-state-title">No books found</div>
                      {search || filterStatus !== 'All' ? 'Try adjusting your search or filter.' : 'Add a book to get started.'}
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((book) => (
                  <tr key={book.id}>
                    <td style={{ color: 'var(--color-text-muted)', fontFamily: 'monospace' }}>{book.id}</td>
                    <td style={{ fontWeight: 500 }}>{book.title}</td>
                    <td style={{ color: 'var(--color-text-secondary)' }}>{book.author}</td>
                    <td style={{ color: 'var(--color-text-secondary)' }}>{book.category}</td>
                    <td style={{ color: 'var(--color-text-muted)', fontSize: '0.78rem' }}>{book.isbn}</td>
                    <td>
                      <span className={`badge ${book.status === 'Available' ? 'badge-available' : 'badge-issued'}`}>
                        {book.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(book.id)}
                        aria-label={`Delete ${book.title}`}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
