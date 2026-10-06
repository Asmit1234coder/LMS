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
      <span className="header-meta">{dateStr}</span>
    </header>
  );
}
