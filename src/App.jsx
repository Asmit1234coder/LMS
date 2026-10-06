import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Books from './pages/Books';
import IssueReturn from './pages/IssueReturn';
import Members from './pages/Members';
import { isSeeded, markSeeded, setBooks, setMembers, setTransactions } from './utils/storage';
import { initialBooks, initialMembers, initialTransactions, initialActivity } from './data/initialData';

// Seed data on first launch
if (!isSeeded()) {
  setBooks(initialBooks);
  setMembers(initialMembers);
  setTransactions(initialTransactions);
  localStorage.setItem('lms_activity', JSON.stringify(initialActivity));
  markSeeded();
}

function renderPage(activePage, onDataChange) {
  switch (activePage) {
    case 'dashboard': return <Dashboard key={activePage} />;
    case 'books': return <Books onDataChange={onDataChange} />;
    case 'issue-return': return <IssueReturn onDataChange={onDataChange} />;
    case 'members': return <Members onDataChange={onDataChange} />;
    default: return <Dashboard />;
  }
}

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [, forceUpdate] = useState(0);

  function handleDataChange() {
    // Force Dashboard to re-render with fresh localStorage data when navigating back
    forceUpdate((n) => n + 1);
  }

  return (
    <div className="app-layout">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <div className="main-area">
        <Header activePage={activePage} />
        <main className="page-content">
          {renderPage(activePage, handleDataChange)}
        </main>
      </div>
    </div>
  );
}
