# Library Management System

A simple, functional Library Management System built as a college mini-project to demonstrate a clean software development workflow using modern tools and DevOps practices.

## Overview

This project implements a frontend-only Library Management System using React and Vite. It covers book management, member management, and a complete issue/return workflow — all persisted in the browser's localStorage. The project is intentionally kept simple to focus on the development workflow rather than complex application features.

## Features

- **Dashboard** — Live statistics (total books, available, issued, members) with recent activity log
- **Book Management** — Add, search, filter, and delete books with status tracking
- **Member Management** — Add, search, and delete library members
- **Issue / Return** — Issue available books to members and process returns
- **Search & Filter** — Real-time search and status filtering across books and members
- **Local Storage** — All data persists in the browser — no backend required

## Technology Stack

| Area          | Technology                  |
|---------------|-----------------------------|
| Frontend      | React 18, JavaScript (ES6+) |
| Build Tool    | Vite 5                      |
| Styling       | Vanilla CSS                 |
| Persistence   | Browser localStorage        |
| Version Control | Git, GitHub               |
| Project Tracking | Jira                     |
| Containerization | Docker, Nginx            |
| CI/CD         | Jenkins                     |
| Orchestration | Kubernetes                  |

## Development Workflow

```
Jira (Task Planning)
      ↓
Development (React + Vite)
      ↓
Git (Incremental commits)
      ↓
GitHub (Remote repository)
      ↓
Jenkins (CI Pipeline)
      ↓
Docker (Containerization)
      ↓
Kubernetes (Orchestration)
```

## Local Setup

```bash
# Clone the repository
git clone https://github.com/Asmit1234coder/LMS.git
cd LMS

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`.

### Production Build

```bash
npm run build
```

## Docker

Build and run the application using Docker:

```bash
# Build the Docker image
docker build -t library-management-system .

# Run the container
docker run -d -p 8080:80 library-management-system
```

The application will be available at `http://localhost:8080`.

## Kubernetes

Deploy using the provided manifests:

```bash
# Apply all manifests
kubectl apply -f k8s/

# Check pod status
kubectl get pods

# Check service
kubectl get services
```

The application will be accessible at `http://<node-ip>:30080`.

## Project Structure

```
src/
├── components/
│   ├── Sidebar.jsx       # Navigation sidebar
│   ├── Header.jsx        # Top header bar
│   └── StatCard.jsx      # Dashboard stat block
│
├── pages/
│   ├── Dashboard.jsx     # Overview and statistics
│   ├── Books.jsx         # Book management
│   ├── IssueReturn.jsx   # Issue and return workflow
│   └── Members.jsx       # Member management
│
├── utils/
│   └── storage.js        # localStorage read/write utilities
│
├── data/
│   └── initialData.js    # Seed data for first launch
│
├── App.jsx               # Root component
├── main.jsx              # Entry point
└── index.css             # Global styles
```

## Jira Task Mapping

| Task   | Description                        |
|--------|------------------------------------|
| LIB-1  | Initialize React project           |
| LIB-2  | Create application layout          |
| LIB-3  | Build dashboard                    |
| LIB-4  | Implement book management          |
| LIB-5  | Implement member management        |
| LIB-6  | Implement issue and return         |
| LIB-7  | Add local storage persistence      |
| LIB-8  | Dockerize application              |
| LIB-9  | Configure Jenkins CI               |
| LIB-10 | Add Kubernetes configuration       |

## Observability — Grafana

The application uses **Grafana Cloud Frontend Observability** (via Grafana Faro Web SDK) to monitor frontend application health and user interactions.

This is a frontend-only application. These are frontend service operations and telemetry events, not backend REST APIs.

### What is Monitored
- **Frontend Errors**: JavaScript exceptions and unhandled promise rejections.
- **Page Performance**: Load times and resource timings.
- **Web Vitals**: Core Web Vitals like LCP, FID, and CLS.
- **Navigation**: Page view tracking.
- **Library Operation Events**: Custom telemetry for application logic.

### Custom Library Events Tracked
- `book_added`
- `book_deleted`
- `book_issued`
- `book_returned`
- `member_added`
- `member_deleted`

Events are strictly recorded **after** a successful operation. Sensitive data (like passwords, phone numbers, or emails) is intentionally excluded from these custom events.

### Local Configuration

To enable telemetry, you must configure the application with your Grafana Cloud Collector URL.
1. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
2. Open `.env` and set `VITE_GRAFANA_FARO_URL` to your Grafana Cloud Collector URL. You can optionally change `VITE_GRAFANA_APP_NAME` and `VITE_GRAFANA_APP_ENV`.

*Note: The application will continue to run perfectly fine even if the telemetry URL is not configured.*

### Verifying Telemetry in Grafana
Once you have supplied the Grafana configuration:
1. Start the React application (`npm run dev`).
2. Perform an action like issuing a book, returning a book, or adding a member.
3. Log into Grafana Cloud and navigate to **Frontend Observability**.
4. Check the **Overview** to see Web Vitals and Page Views.
5. Go to the **Events** explorer or **Logs** section to verify the custom telemetry events (e.g., `book_issued`) were received successfully.

---

*College Mini Project — React + DevOps Workflow Demonstration*
