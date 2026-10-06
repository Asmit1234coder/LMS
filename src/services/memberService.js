/**
 * memberService.js
 *
 * Frontend service functions used to encapsulate application data operations.
 * This is a frontend-only application with no backend or REST API.
 * All data is persisted to browser localStorage.
 */

const MEMBERS_KEY = 'library_members';

function generateId(members) {
  const nums = members
    .map((m) => parseInt(m.id.replace('M', ''), 10))
    .filter(Boolean);
  const max = nums.length ? Math.max(...nums) : 0;
  return `M${String(max + 1).padStart(3, '0')}`;
}

export function getMembers() {
  try {
    return JSON.parse(localStorage.getItem(MEMBERS_KEY)) || [];
  } catch {
    return [];
  }
}

export function addMember({ name, email, phone }) {
  const members = getMembers();
  const newMember = {
    id: generateId(members),
    name: name.trim(),
    email: email.trim(),
    phone: phone.trim(),
    booksIssued: 0,
    joinedAt: new Date().toISOString(),
  };
  const updated = [...members, newMember];
  localStorage.setItem(MEMBERS_KEY, JSON.stringify(updated));
  return newMember;
}

export function deleteMember(id) {
  const members = getMembers();
  const member = members.find((m) => m.id === id);
  if (!member) return { success: false, error: 'Member not found.' };
  if (member.booksIssued > 0) {
    return {
      success: false,
      error: `Cannot delete "${member.name}" — they have ${member.booksIssued} book(s) currently issued.`,
    };
  }
  const updated = members.filter((m) => m.id !== id);
  localStorage.setItem(MEMBERS_KEY, JSON.stringify(updated));
  return { success: true, member };
}

export function setMembers(members) {
  localStorage.setItem(MEMBERS_KEY, JSON.stringify(members));
}

export function updateMember(id, fields) {
  const members = getMembers();
  const updated = members.map((m) => (m.id === id ? { ...m, ...fields } : m));
  localStorage.setItem(MEMBERS_KEY, JSON.stringify(updated));
  return updated.find((m) => m.id === id);
}
