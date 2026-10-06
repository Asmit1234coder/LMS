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

## Observability with Grafana Cloud

To gain insights into application health and user behavior, this project is instrumented with **Grafana Faro Web SDK**.

### Why Grafana is Used
Grafana Cloud provides centralized observability. By using Grafana Faro, we can capture real user monitoring (RUM) data directly from the browser without needing a complex backend infrastructure. This helps monitor performance bottlenecks, track errors, and understand how users interact with the Library Management System.

### Monitored Metrics & Events
- **Default Telemetry**: Page/navigation tracking, browser performance metrics, Web Vitals (LCP, FID, CLS, etc.), JavaScript errors, and user sessions.
- **Custom Application Events**:
  - `book_added`: Triggered when a new book is successfully added to the catalog.
  - `book_issued`: Triggered when a book is successfully issued to a member.
  - `book_returned`: Triggered when a member successfully returns a book.
  - `member_added`: Triggered when a new member is successfully registered.

### Local Configuration
To send observability data to Grafana Cloud, you need a telemetry URL.
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Update the `VITE_GRAFANA_TELEMETRY_URL` in `.env` with your Grafana Cloud Collector URL (from the Frontend Observability integration settings).

*Note: The application will continue to function normally even if the telemetry URL is not configured.*

### Verifying Data in Grafana Cloud
1. Ensure your local app is running and the `.env` file is configured correctly.
2. Interact with the application (add books, members, issue books).
3. Log in to your Grafana Cloud account.
4. Navigate to **Frontend Observability**.
5. Check the overview dashboards for Web Vitals, Errors, and Sessions.
6. Check the **Logs** or **Events** explorer to see the custom events (`book_added`, etc.) appearing in real time.

---

*College Mini Project — React + DevOps Workflow Demonstration*
