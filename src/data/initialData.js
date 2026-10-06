// Initial seed data for the Library Management System

export const initialBooks = [
  {
    id: 'B001',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    category: 'Software Engineering',
    isbn: '978-0132350884',
    status: 'Issued',
  },
  {
    id: 'B002',
    title: 'Java: The Complete Reference',
    author: 'Herbert Schildt',
    category: 'Programming',
    isbn: '978-1260440232',
    status: 'Available',
  },
  {
    id: 'B003',
    title: 'Database System Concepts',
    author: 'Abraham Silberschatz',
    category: 'Databases',
    isbn: '978-0078022159',
    status: 'Available',
  },
  {
    id: 'B004',
    title: 'Operating System Concepts',
    author: 'Abraham Silberschatz',
    category: 'Operating Systems',
    isbn: '978-1118063330',
    status: 'Issued',
  },
  {
    id: 'B005',
    title: 'Computer Networks',
    author: 'Andrew S. Tanenbaum',
    category: 'Networking',
    isbn: '978-0132126953',
    status: 'Available',
  },
  {
    id: 'B006',
    title: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    category: 'Software Engineering',
    isbn: '978-1449373320',
    status: 'Available',
  },
  {
    id: 'B007',
    title: 'Introduction to Algorithms',
    author: 'Thomas H. Cormen',
    category: 'Algorithms',
    isbn: '978-0262033848',
    status: 'Available',
  },
  {
    id: 'B008',
    title: 'The Pragmatic Programmer',
    author: 'David Thomas',
    category: 'Software Engineering',
    isbn: '978-0135957059',
    status: 'Available',
  },
];

export const initialMembers = [
  {
    id: 'M001',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@college.edu',
    phone: '9876543210',
    booksIssued: 1,
  },
  {
    id: 'M002',
    name: 'Priya Patel',
    email: 'priya.patel@college.edu',
    phone: '9845021345',
    booksIssued: 0,
  },
  {
    id: 'M003',
    name: 'Amit Kumar',
    email: 'amit.kumar@college.edu',
    phone: '9734512678',
    booksIssued: 1,
  },
  {
    id: 'M004',
    name: 'Sneha Reddy',
    email: 'sneha.reddy@college.edu',
    phone: '9654321098',
    booksIssued: 0,
  },
  {
    id: 'M005',
    name: 'Vikram Singh',
    email: 'vikram.singh@college.edu',
    phone: '9543210987',
    booksIssued: 0,
  },
];

export const initialTransactions = [
  {
    id: 'T001',
    bookId: 'B001',
    bookTitle: 'Clean Code',
    memberId: 'M001',
    memberName: 'Rahul Sharma',
    issueDate: '2026-09-20',
    dueDate: '2026-10-04',
    status: 'Issued',
  },
  {
    id: 'T002',
    bookId: 'B004',
    bookTitle: 'Operating System Concepts',
    memberId: 'M003',
    memberName: 'Amit Kumar',
    issueDate: '2026-09-25',
    dueDate: '2026-10-09',
    status: 'Issued',
  },
];

export const initialActivity = [
  {
    id: 1,
    message: 'Rahul Sharma issued "Clean Code"',
    timestamp: '2026-09-20T10:30:00.000Z',
  },
  {
    id: 2,
    message: 'Amit Kumar issued "Operating System Concepts"',
    timestamp: '2026-09-25T14:15:00.000Z',
  },
  {
    id: 3,
    message: 'Priya Patel returned "Database System Concepts"',
    timestamp: '2026-09-28T09:00:00.000Z',
  },
  {
    id: 4,
    message: 'Admin added "Designing Data-Intensive Applications"',
    timestamp: '2026-09-30T11:00:00.000Z',
  },
];
