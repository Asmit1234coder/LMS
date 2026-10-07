const PAGE_TITLES = {
  dashboard: 'Dashboard',
  books: 'Books',
  'issue-return': 'Issue / Return',
  members: 'Members',
};

export default function Header({ activePage }) {
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <header className="header">
      <span className="header-title">{PAGE_TITLES[activePage] || 'Library Management'}</span>
      <div className="header-spacer" />
      <div className="header-date-badge">
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="1" y="3" width="14" height="12" rx="2"/>
          <path d="M1 7h14M5 1v4M11 1v4"/>
        </svg>
        {dateStr}
      </div>
    </header>
  );
}
