import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Books from './pages/Books';
import IssueReturn from './pages/IssueReturn';
import Members from './pages/Members';
import { setBooks } from './services/bookService';
import { setMembers } from './services/memberService';
import { setTransactions, addActivityEntry } from './services/circulationService';
import { initialBooks, initialMembers, initialTransactions, initialActivity } from './data/initialData';

const SEEDED_KEY = 'library_seeded';
const ACTIVITY_KEY = 'library_activity';

// Seed data on first launch using the new localStorage keys
if (localStorage.getItem(SEEDED_KEY) !== 'true') {
  setBooks(initialBooks);
  setMembers(initialMembers);
  setTransactions(initialTransactions);
  localStorage.setItem(ACTIVITY_KEY, JSON.stringify(initialActivity));
  localStorage.setItem(SEEDED_KEY, 'true');
}

function renderPage(activePage, onDataChange) {
  switch (activePage) {
    case 'dashboard': return <Dashboard key={activePage} />;
    case 'books': return <Books onDataChange={onDataChange} />;
    case 'issue-return': return <IssueReturn onDataChange={onDataChange} />;
    case 'members': return <Members onDataChange={onDataChange} />;
    default: return <Dashboard key={activePage} />;
  }
}

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [, forceUpdate] = useState(0);

  function handleDataChange() {
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
