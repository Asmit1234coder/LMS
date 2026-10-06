const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: '▤' },
  { id: 'books', label: 'Books', icon: '📖' },
  { id: 'issue-return', label: 'Issue / Return', icon: '⇄' },
  { id: 'members', label: 'Members', icon: '👥' },
];

export default function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-text">Library Management</div>
        <div className="sidebar-logo-sub">Administration System</div>
      </div>
      <nav className="sidebar-nav">
        <div className="nav-section-label">Navigation</div>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activePage === item.id ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
            aria-current={activePage === item.id ? 'page' : undefined}
          >
            <span className="nav-item-icon" aria-hidden="true">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
