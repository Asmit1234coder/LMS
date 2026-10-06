import { getBooks } from '../services/bookService';
import { getMembers } from '../services/memberService';
import { getTransactions, getActivity } from '../services/circulationService';

function formatTime(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function getStorageHealth() {
  try {
    localStorage.setItem('__health_check__', '1');
    localStorage.removeItem('__health_check__');
    return 'Healthy';
  } catch {
    return 'Error';
  }
}

export default function Dashboard() {
  const books = getBooks();
  const members = getMembers();
  const transactions = getTransactions();
  const activity = getActivity();

  const totalBooks = books.length;
  const availableBooks = books.filter((b) => b.status === 'Available').length;
  const issuedBooks = books.filter((b) => b.status === 'Issued').length;
  const totalMembers = members.length;

  const recentBooks = [...books].reverse().slice(0, 6);
  const activeTransactions = transactions.filter((t) => t.status === 'Issued');
  const storageHealth = getStorageHealth();

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Library Overview</h1>
          <div className="page-subtitle">Summary of current collection and activity</div>
        </div>
      </div>

      {/* Statistics Row */}
      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-label">Total Books</div>
          <div className="stat-value">{totalBooks}</div>
          <div className="stat-note">In collection</div>
        </div>
        <div className="stat-card stat-card--available">
          <div className="stat-label">Available</div>
          <div className="stat-value">{availableBooks}</div>
          <div className="stat-note">Ready to issue</div>
        </div>
        <div className="stat-card stat-card--issued">
          <div className="stat-label">Issued</div>
          <div className="stat-value">{issuedBooks}</div>
          <div className="stat-note">Currently borrowed</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Members</div>
          <div className="stat-value">{totalMembers}</div>
          <div className="stat-note">Registered</div>
        </div>
      </div>

      {/* Main grid: recent books + activity */}
      <div className="dashboard-grid">
        {/* Recent Books */}
        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">Recently Added Books</span>
          </div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Category</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBooks.length === 0 ? (
                  <tr>
                    <td colSpan={4}>
                      <div className="empty-state">No books in collection yet.</div>
                    </td>
                  </tr>
                ) : (
                  recentBooks.map((book) => (
                    <tr key={book.id}>
                      <td style={{ fontWeight: 500 }}>{book.title}</td>
                      <td className="text-secondary">{book.author}</td>
                      <td className="text-secondary">{book.category}</td>
                      <td>
                        <span className={`badge ${book.status === 'Available' ? 'badge-available' : 'badge-issued'}`}>
                          {book.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">Recent Activity</span>
          </div>
          {activity.length === 0 ? (
            <div className="empty-state">No activity recorded yet.</div>
          ) : (
            <ul className="activity-list">
              {activity.slice(0, 10).map((item) => (
                <li key={item.id} className="activity-item">
                  <span className="activity-dot" aria-hidden="true" />
                  <span className="activity-message">{item.message}</span>
                  <span className="activity-time">{formatTime(item.timestamp)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Currently Issued */}
      {activeTransactions.length > 0 && (
        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">Currently Issued Books</span>
            <span className="panel-count">{activeTransactions.length}</span>
          </div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Book</th>
                  <th>Member</th>
                  <th>Issue Date</th>
                  <th>Due Date</th>
                </tr>
              </thead>
              <tbody>
                {activeTransactions.map((t) => {
                  const isOverdue = new Date(t.dueDate) < new Date();
                  return (
                    <tr key={t.id}>
                      <td style={{ fontWeight: 500 }}>{t.bookTitle}</td>
                      <td className="text-secondary">{t.memberName}</td>
                      <td className="text-secondary">{t.issueDate}</td>
                      <td style={{ color: isOverdue ? 'var(--color-danger)' : 'var(--color-text-secondary)' }}>
                        {t.dueDate}
                        {isOverdue && <span className="overdue-tag">Overdue</span>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Application Health */}
      <div className="panel">
        <div className="panel-header">
          <span className="panel-title">Application Health</span>
        </div>
        <table>
          <tbody>
            <tr>
              <td className="health-category">Storage</td>
              <td className="health-label">Local storage</td>
              <td>
                <span className={`badge ${storageHealth === 'Healthy' ? 'badge-available' : 'badge-issued'}`}>
                  {storageHealth}
                </span>
              </td>
            </tr>
            <tr>
              <td className="health-category">Application</td>
              <td className="health-label">Running</td>
              <td><span className="badge badge-available">Healthy</span></td>
            </tr>
            <tr>
              <td className="health-category">Records</td>
              <td className="health-label">Books</td>
              <td className="text-secondary">{totalBooks}</td>
            </tr>
            <tr>
              <td className="health-category" />
              <td className="health-label">Members</td>
              <td className="text-secondary">{totalMembers}</td>
            </tr>
            <tr>
              <td className="health-category" />
              <td className="health-label">Active Issues</td>
              <td className="text-secondary">{issuedBooks}</td>
            </tr>
          </tbody>
        </table>
        <div className="health-note">
          Observability: External monitoring via Grafana Cloud Frontend Observability (Grafana Faro).
          Configure <code>VITE_GRAFANA_FARO_URL</code> to enable telemetry.
        </div>
      </div>
    </div>
  );
}
