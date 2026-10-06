import { useState } from 'react';
import { getMembers, addMember, deleteMember } from '../services/memberService';
import { trackMemberAdded, trackMemberDeleted } from '../observability/events';

const EMPTY_FORM = { name: '', email: '', phone: '' };

export default function Members({ onDataChange }) {
  const [members, setLocalMembers] = useState(() => getMembers());
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  function refresh() {
    setLocalMembers(getMembers());
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
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.phone.trim()) errs.phone = 'Phone is required';
    else if (!/^\d{10}$/.test(form.phone.trim())) errs.phone = 'Enter a valid 10-digit phone number';
    return errs;
  }

  function handleAddMember(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    const newMember = addMember(form);
    trackMemberAdded();
    
    setForm(EMPTY_FORM);
    setShowForm(false);
    showMessage(`Member "${newMember.name}" registered successfully.`);
    refresh();
  }

  function handleDelete(id) {
    const member = members.find((m) => m.id === id);
    if (!window.confirm(`Delete member "${member?.name}"? This cannot be undone.`)) return;
    
    const result = deleteMember(id);
    if (result.success) {
      trackMemberDeleted();
      showMessage('Member deleted successfully.');
      refresh();
    } else {
      alert(result.error);
    }
  }

  const filtered = members.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.email.toLowerCase().includes(search.toLowerCase()) ||
    m.phone.includes(search) ||
    m.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Members</h1>
          <div className="page-subtitle">Manage library members</div>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm((v) => !v)}>
          {showForm ? 'Cancel' : '+ Add Member'}
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
          <div className="add-form-title">Add New Member</div>
          <form onSubmit={handleAddMember} noValidate>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="name">Full Name *</label>
                <input
                  id="name" name="name" className="form-control"
                  placeholder="e.g. Rahul Sharma" value={form.name} onChange={handleFieldChange}
                />
                {errors.name && <span className="form-error">{errors.name}</span>}
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email *</label>
                <input
                  id="email" name="email" type="email" className="form-control"
                  placeholder="email@college.edu" value={form.email} onChange={handleFieldChange}
                />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="phone">Phone *</label>
                <input
                  id="phone" name="phone" type="tel" className="form-control"
                  placeholder="10-digit number" value={form.phone} onChange={handleFieldChange}
                />
                {errors.phone && <span className="form-error">{errors.phone}</span>}
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">Save Member</button>
              <button type="button" className="btn btn-secondary" onClick={() => { setShowForm(false); setForm(EMPTY_FORM); setErrors({}); }}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="toolbar">
        <input
          type="search"
          className="form-control search-input"
          placeholder="Search by ID, name, email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="panel">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Member ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Books Issued</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6}>
                    <div className="empty-state">
                      <div className="empty-state-title">No members found</div>
                      Try a different search or add a member.
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((member) => (
                  <tr key={member.id}>
                    <td style={{ color: 'var(--color-text-muted)', fontFamily: 'monospace' }}>{member.id}</td>
                    <td style={{ fontWeight: 500 }}>{member.name}</td>
                    <td className="text-secondary">{member.email}</td>
                    <td className="text-secondary">{member.phone}</td>
                    <td>
                      <span style={{
                        color: member.booksIssued > 0 ? 'var(--color-warning)' : 'var(--color-text-muted)',
                        fontWeight: member.booksIssued > 0 ? 600 : 400,
                      }}>
                        {member.booksIssued}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => handleDelete(member.id)}
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
