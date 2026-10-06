import { useState } from 'react';
import { getBooks } from '../services/bookService';
import { getMembers } from '../services/memberService';
import { getTransactions, issueBook, returnBook, getIssuedBooks } from '../services/circulationService';
import { trackBookIssued, trackBookReturned } from '../observability/events';

function today() {
  return new Date().toISOString().split('T')[0];
}

function dueDate() {
  const d = new Date();
  d.setDate(d.getDate() + 14);
  return d.toISOString().split('T')[0];
}

const EMPTY_ISSUE = { bookId: '', memberId: '', issueDate: today(), dueDate: dueDate() };

export default function IssueReturn({ onDataChange }) {
  const [tab, setTab] = useState('issue');
  const [books, setLocalBooks] = useState(() => getBooks());
  const [members, setLocalMembers] = useState(() => getMembers());
  const [transactions, setLocalTransactions] = useState(() => getTransactions());
  const [form, setForm] = useState(EMPTY_ISSUE);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  function refresh() {
    setLocalBooks(getBooks());
    setLocalMembers(getMembers());
    setLocalTransactions(getTransactions());
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

  function validateIssue() {
    const errs = {};
    if (!form.bookId) errs.bookId = 'Select a book';
    if (!form.memberId) errs.memberId = 'Select a member';
    if (!form.issueDate) errs.issueDate = 'Select issue date';
    if (!form.dueDate) errs.dueDate = 'Select due date';
    return errs;
  }

  function handleIssue(e) {
    e.preventDefault();
    const errs = validateIssue();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    const result = issueBook(form);
    
    if (result.success) {
      trackBookIssued(result.transaction);
      setForm(EMPTY_ISSUE);
      showMessage(`"${result.book.title}" successfully issued to ${result.member.name}.`);
      refresh();
    } else {
      setErrors({ bookId: result.error });
    }
  }

  function handleReturn(txId) {
    const tx = transactions.find((t) => t.id === txId);
    if (!window.confirm(`Return "${tx.bookTitle}" from ${tx.memberName}?`)) return;

    const result = returnBook(txId);
    
    if (result.success) {
      trackBookReturned(result.transaction);
      showMessage(`"${tx.bookTitle}" returned successfully.`);
      refresh();
    } else {
      alert(result.error);
    }
  }

  const availableBooks = books.filter((b) => b.status === 'Available');
  const activeTransactions = transactions.filter((t) => t.status === 'Issued');

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Issue / Return</h1>
          <div className="page-subtitle">Manage book circulation</div>
        </div>
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

      <div className="tabs">
        <button
          className={`tab-btn ${tab === 'issue' ? 'active' : ''}`}
          onClick={() => setTab('issue')}
        >
          Issue Book
        </button>
        <button
          className={`tab-btn ${tab === 'return' ? 'active' : ''}`}
          onClick={() => setTab('return')}
        >
          Return Book
        </button>
      </div>

      {tab === 'issue' && (
        <div className="add-form-panel">
          <div className="add-form-title">Issue a Book</div>
          <form onSubmit={handleIssue} noValidate>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="bookId">Book *</label>
                <select
                  id="bookId" name="bookId" className="form-control"
                  value={form.bookId} onChange={handleFieldChange}
                >
                  <option value="">— Select a book —</option>
                  {availableBooks.map((b) => (
                    <option key={b.id} value={b.id}>{b.id} — {b.title}</option>
                  ))}
                </select>
                {errors.bookId && <span className="form-error">{errors.bookId}</span>}
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="memberId">Member *</label>
                <select
                  id="memberId" name="memberId" className="form-control"
                  value={form.memberId} onChange={handleFieldChange}
                >
                  <option value="">— Select a member —</option>
                  {members.map((m) => (
                    <option key={m.id} value={m.id}>{m.id} — {m.name}</option>
                  ))}
                </select>
                {errors.memberId && <span className="form-error">{errors.memberId}</span>}
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="issueDate">Issue Date *</label>
                <input
                  id="issueDate" name="issueDate" type="date" className="form-control"
                  value={form.issueDate} onChange={handleFieldChange}
                />
                {errors.issueDate && <span className="form-error">{errors.issueDate}</span>}
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="dueDate">Due Date *</label>
                <input
                  id="dueDate" name="dueDate" type="date" className="form-control"
                  value={form.dueDate} onChange={handleFieldChange}
                />
                {errors.dueDate && <span className="form-error">{errors.dueDate}</span>}
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">Issue Book</button>
            </div>
          </form>
          {availableBooks.length === 0 && (
            <div className="empty-state" style={{ padding: '20px 0 0 0' }}>
              No books currently available for issuing.
            </div>
          )}
        </div>
      )}

      {tab === 'return' && (
        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">Currently Issued Books</span>
            <span className="panel-count">{activeTransactions.length}</span>
          </div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Tx ID</th>
                  <th>Book</th>
                  <th>Member</th>
                  <th>Issue Date</th>
                  <th>Due Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {activeTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={6}>
                      <div className="empty-state">
                        <div className="empty-state-title">No books currently issued</div>
                        Issue a book from the Issue tab.
                      </div>
                    </td>
                  </tr>
                ) : (
                  activeTransactions.map((tx) => {
                    const isOverdue = new Date(tx.dueDate) < new Date();
                    return (
                      <tr key={tx.id}>
                        <td style={{ color: 'var(--color-text-muted)', fontFamily: 'monospace' }}>{tx.id}</td>
                        <td style={{ fontWeight: 500 }}>{tx.bookTitle}</td>
                        <td className="text-secondary">{tx.memberName}</td>
                        <td className="text-secondary">{tx.issueDate}</td>
                        <td style={{ color: isOverdue ? 'var(--color-danger)' : 'var(--color-text-secondary)' }}>
                          {tx.dueDate}
                          {isOverdue && <span className="overdue-tag">Overdue</span>}
                        </td>
                        <td>
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => handleReturn(tx.id)}
                          >
                            Return Book
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
