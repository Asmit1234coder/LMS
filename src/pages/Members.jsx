import { useState } from 'react';
import { getMembers, setMembers, addActivity } from '../utils/storage';

function generateId(members) {
  const nums = members.map((m) => parseInt(m.id.replace('M', ''), 10)).filter(Boolean);
  const max = nums.length ? Math.max(...nums) : 0;
  return `M${String(max + 1).padStart(3, '0')}`;
}

const EMPTY_FORM = { name: '', email: '', phone: '' };

export default function Members({ onDataChange }) {
  const [members, setLocalMembers] = useState(() => getMembers());
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  function save(updated) {
    setMembers(updated);
    setLocalMembers(updated);
    if (onDataChange) onDataChange();
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
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.phone.trim()) errs.phone = 'Phone is required';
    else if (!/^\d{10}$/.test(form.phone.trim())) errs.phone = 'Enter a valid 10-digit phone number';
    return errs;
  }

  function handleAddMember(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    const newMember = {
      id: generateId(members),
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      booksIssued: 0,
    };
    const updated = [...members, newMember];
    save(updated);
    addActivity(`Admin added member "${newMember.name}"`);
    setForm(EMPTY_FORM);
    setShowForm(false);
  }

  function handleDelete(id) {
    const member = members.find((m) => m.id === id);
    if (member && member.booksIssued > 0) {
      alert(`Cannot delete "${member.name}" — they have ${member.booksIssued} book(s) currently issued.`);
      return;
    }
    if (!window.confirm(`Delete member "${member?.name}"? This cannot be undone.`)) return;
    save(members.filter((m) => m.id !== id));
  }

  const filtered = members.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.email.toLowerCase().includes(search.toLowerCase()) ||
    m.phone.includes(search)
  );

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Members</h1>
          <div className="page-subtitle">{members.length} registered members</div>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm((v) => !v)}>
          {showForm ? 'Cancel' : '+ Add Member'}
        </button>
      </div>

      {/* Add Member Form */}
      {showForm && (
        <div className="add-form-panel">
          <div className="add-form-title">Add New Member</div>
          <form onSubmit={handleAddMember} noValidate>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="name">Full Name *</label>
                <input
                  id="name"
                  name="name"
                  className="form-control"
                  placeholder="e.g. Rahul Sharma"
                  value={form.name}
                  onChange={handleFieldChange}
                />
                {errors.name && <span className="form-error">{errors.name}</span>}
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="email@college.edu"
                  value={form.email}
                  onChange={handleFieldChange}
                />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="phone">Phone *</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="form-control"
                  placeholder="10-digit number"
                  value={form.phone}
                  onChange={handleFieldChange}
                />
                {errors.phone && <span className="form-error">{errors.phone}</span>}
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">Add Member</button>
              <button type="button" className="btn btn-secondary" onClick={() => { setShowForm(false); setForm(EMPTY_FORM); setErrors({}); }}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Search */}
      <div className="toolbar">
        <input
          type="search"
          id="member-search"
          className="form-control search-input"
          placeholder="Search by name, email, or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search members"
        />
      </div>

      {/* Members Table */}
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
                      {search ? 'Try a different search.' : 'Add a member to get started.'}
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((member) => (
                  <tr key={member.id}>
                    <td style={{ color: 'var(--color-text-muted)', fontFamily: 'monospace' }}>{member.id}</td>
                    <td style={{ fontWeight: 500 }}>{member.name}</td>
                    <td style={{ color: 'var(--color-text-secondary)' }}>{member.email}</td>
                    <td style={{ color: 'var(--color-text-secondary)' }}>{member.phone}</td>
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
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(member.id)}
                        aria-label={`Delete member ${member.name}`}
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
