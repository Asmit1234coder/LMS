import { useState } from 'react';
import { getBooks, addBook, deleteBook } from '../services/bookService';
import { trackBookAdded, trackBookDeleted } from '../observability/events';

const EMPTY_FORM = { title: '', author: '', category: '', isbn: '' };

export default function Books({ onDataChange }) {
  const [books, setLocalBooks] = useState(() => getBooks());
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  function refresh() {
    setLocalBooks(getBooks());
    if (onDataChange) onDataChange();
  }

  function showMessage(msg) {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
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

    const newBook = addBook(form);
    trackBookAdded(newBook);
    
    setForm(EMPTY_FORM);
    setShowForm(false);
    showMessage(`Book "${newBook.title}" added successfully.`);
    refresh();
  }

  function handleDelete(id) {
    const book = books.find((b) => b.id === id);
    if (!window.confirm(`Delete "${book?.title}"? This cannot be undone.`)) return;
    
    const result = deleteBook(id);
    if (result.success) {
      trackBookDeleted(result.book);
      showMessage(`Book deleted successfully.`);
      refresh();
    } else {
      alert(result.error);
    }
  }

  const filtered = books.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase()) ||
      b.category.toLowerCase().includes(search.toLowerCase()) ||
      b.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'All' || b.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Books</h1>
          <div className="page-subtitle">Manage library collection</div>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm((v) => !v)}>
          {showForm ? 'Cancel' : '+ Add Book'}
        </button>
      </div>

      {message && (
        <div style={{
          background: 'var(--color-success-light)',
          border: '1px solid #bbf7d0',
          padding: '10px 14px',
          marginBottom: '16px',
          fontSize: '0.85rem',
          color: 'var(--color-success)',
          borderRadius: 'var(--radius-sm)'
        }}>
          {message}
        </div>
      )}

      {showForm && (
        <div className="add-form-panel">
          <div className="add-form-title">Add New Book</div>
          <form onSubmit={handleAddBook} noValidate>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="title">Title *</label>
                <input
                  id="title" name="title" className="form-control"
                  placeholder="Book title" value={form.title} onChange={handleFieldChange}
                />
                {errors.title && <span className="form-error">{errors.title}</span>}
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="author">Author *</label>
                <input
                  id="author" name="author" className="form-control"
                  placeholder="Author name" value={form.author} onChange={handleFieldChange}
                />
                {errors.author && <span className="form-error">{errors.author}</span>}
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="category">Category *</label>
                <input
                  id="category" name="category" className="form-control"
                  placeholder="e.g. Programming" value={form.category} onChange={handleFieldChange}
                />
                {errors.category && <span className="form-error">{errors.category}</span>}
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="isbn">ISBN</label>
                <input
                  id="isbn" name="isbn" className="form-control"
                  placeholder="Optional" value={form.isbn} onChange={handleFieldChange}
                />
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">Save Book</button>
              <button type="button" className="btn btn-secondary" onClick={() => { setShowForm(false); setForm(EMPTY_FORM); setErrors({}); }}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="toolbar">
        <input
          type="search"
          className="form-control search-input"
          placeholder="Search by ID, title, author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="form-control"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{ width: 'auto' }}
        >
          <option value="All">All Status</option>
          <option value="Available">Available</option>
          <option value="Issued">Issued</option>
        </select>
      </div>

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
                      Try changing your search or add a new book.
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((book) => (
                  <tr key={book.id}>
                    <td style={{ color: 'var(--color-text-muted)', fontFamily: 'monospace' }}>{book.id}</td>
                    <td style={{ fontWeight: 500 }}>{book.title}</td>
                    <td className="text-secondary">{book.author}</td>
                    <td className="text-secondary">{book.category}</td>
                    <td style={{ color: 'var(--color-text-muted)', fontSize: '0.78rem' }}>{book.isbn}</td>
                    <td>
                      <span className={`badge ${book.status === 'Available' ? 'badge-available' : 'badge-issued'}`}>
                        {book.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => handleDelete(book.id)}
                        style={{ color: 'var(--color-danger)' }}
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
