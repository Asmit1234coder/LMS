import StatCard from '../components/StatCard';
import { getBooks, getMembers, getTransactions, getActivity } from '../utils/storage';

function formatTime(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
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

  const recentBooks = [...books].slice(-5).reverse();
  const activeTransactions = transactions.filter((t) => t.status === 'Issued');

  return (
    <div>
      {/* Statistics */}
      <div className="stat-grid">
        <StatCard label="Total Books" value={totalBooks} note="In collection" />
        <StatCard label="Available" value={availableBooks} note="Ready to issue" />
        <StatCard label="Issued" value={issuedBooks} note="Currently borrowed" />
        <StatCard label="Total Members" value={totalMembers} note="Registered" />
      </div>

      <div className="dashboard-grid">
        {/* Recently Added Books */}
        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">Recently Added Books</span>
          </div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Book</th>
                  <th>Author</th>
                  <th>Category</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBooks.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="empty-state">No books added yet.</td>
                  </tr>
                ) : (
                  recentBooks.map((book) => (
                    <tr key={book.id}>
                      <td>{book.title}</td>
                      <td style={{ color: 'var(--color-text-secondary)' }}>{book.author}</td>
                      <td style={{ color: 'var(--color-text-secondary)' }}>{book.category}</td>
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
              {activity.slice(0, 8).map((item) => (
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

      {/* Active Transactions */}
      {activeTransactions.length > 0 && (
        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">Currently Issued Books</span>
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
                {activeTransactions.map((t) => (
                  <tr key={t.id}>
                    <td>{t.bookTitle}</td>
                    <td>{t.memberName}</td>
                    <td style={{ color: 'var(--color-text-secondary)' }}>{t.issueDate}</td>
                    <td style={{ color: 'var(--color-text-secondary)' }}>{t.dueDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
