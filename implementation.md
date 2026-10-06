# Build a Complete Library Management System — React + DevOps Mini Project

You are acting as the **developer, UI designer, and DevOps engineer** for this project.

I need you to build a complete but intentionally simple **Library Management System** for a college mini project.

The primary purpose of this project is NOT to build a complex production-level library system. The purpose is to demonstrate a clean software-development workflow using:

- React
- JavaScript
- Git
- GitHub
- Jira
- Docker
- Jenkins
- Kubernetes

The application itself should remain simple and frontend-focused so that the project can be completed quickly.

---

# 1. VERY IMPORTANT — DESIGN PHILOSOPHY

The website must NOT look like an AI-generated template.

Do NOT create an "AI slop" website.

I specifically do NOT want:

- Gradients
- Purple/blue AI-style gradients
- Glassmorphism
- Excessive rounded cards
- Huge hero sections
- Excessive animations
- Glowing elements
- Neon colors
- Floating blobs
- Decorative abstract shapes
- Excessive shadows
- Excessive use of icons
- Fake dashboard visualizations
- Marketing-style landing page
- Giant typography
- Excessive whitespace
- Random illustrations
- AI-generated looking UI patterns
- Over-designed components

The website should look like a **real internal library management application built by a developer**.

Think of the visual style of a practical university/enterprise administration system.

The UI should be:

- Minimal
- Clean
- Professional
- Functional
- Structured
- Easy to understand
- Fast
- Desktop-first but responsive
- Suitable for a college project demonstration

Use a restrained color palette.

Prefer:

- White / off-white backgrounds
- Dark charcoal text
- One restrained primary accent color
- Light gray borders
- Subtle hover states

NO gradients anywhere.

Avoid excessive border radius. Use small or moderate radius only where appropriate.

Use borders and spacing to create hierarchy instead of shadows and visual effects.

---

# 2. TECHNOLOGY REQUIREMENTS

Build the application using:

- React
- JavaScript
- Vite
- CSS

Do NOT introduce unnecessary frameworks or libraries.

Do not use TypeScript.

Do not use Next.js.

Do not build a backend.

Do not use a database.

Use browser localStorage for persistence.

The project should run with:

```bash
npm install
npm run dev
```

and production build with:

```bash
npm run build
```

---

# 3. APPLICATION STRUCTURE

Create a small but complete Library Management System.

The main navigation should contain:

- Dashboard
- Books
- Issue / Return
- Members

A simple sidebar is preferred.

The overall layout should resemble a real administrative application.

Example structure:

```text
---------------------------------------------------
| Library Management | Dashboard | Books | Members |
---------------------------------------------------
|                                                   |
| Sidebar       Main Content                        |
|                                                   |
| Dashboard                                         |
|                                                   |
| Statistics                                        |
|                                                   |
| Books Table / Recent Activity                     |
|                                                   |
---------------------------------------------------
```

Do not create a landing page.

The application should open directly to the dashboard.

---

# 4. DASHBOARD

Create a clean dashboard containing:

### Statistics

- Total Books
- Available Books
- Issued Books
- Total Members

Use simple statistic blocks.

Do not make them huge colorful cards.

Below the statistics show:

### Recently Added Books

Columns:

- Book
- Author
- Category
- Status

Then show:

### Recent Activity

Examples:

```text
Rahul Sharma issued "Clean Code"
Priya Patel returned "Database System Concepts"
Amit added "Java Programming"
```

Keep everything compact and readable.

---

# 5. BOOK MANAGEMENT

Create a Books page.

Features:

- Display all books
- Search books
- Filter by status
- Add new book
- Delete book

Book fields:

```text
Book ID
Title
Author
Category
ISBN
Status
```

Statuses:

```text
Available
Issued
```

Create a simple "Add Book" form.

Do not create a complicated modal system unless it genuinely improves usability.

---

# 6. ISSUE / RETURN

Create an Issue / Return page.

Allow the user to:

### Issue a book

Select:

```text
Book
Member
Issue Date
Due Date
```

When issued:

```text
Book status = Issued
```

### Return a book

Show issued books with:

```text
Book
Member
Issue Date
Due Date
Return
```

When returned:

```text
Book status = Available
```

Update the dashboard statistics automatically.

---

# 7. MEMBERS

Create a Members page.

Fields:

```text
Member ID
Name
Email
Phone
Books Issued
```

Allow:

- Add member
- Delete member
- Search member

Keep this simple.

---

# 8. LOCAL STORAGE

Use localStorage so the application does not lose data when refreshed.

Store:

```text
books
members
transactions
```

Create sensible utility functions for reading/writing localStorage.

Seed the application with realistic sample data on first launch.

Example books:

```text
Clean Code
Java: The Complete Reference
Database System Concepts
Operating System Concepts
Computer Networks
Designing Data-Intensive Applications
```

Use realistic student/member names.

Do not use obviously fake AI-generated names everywhere.

---

# 9. COMPONENT STRUCTURE

Keep the React code reasonably organized.

Use a structure similar to:

```text
src/
├── components/
│   ├── Sidebar.jsx
│   ├── Header.jsx
│   ├── StatCard.jsx
│   ├── BookTable.jsx
│   └── Modal.jsx
│
├── pages/
│   ├── Dashboard.jsx
│   ├── Books.jsx
│   ├── IssueReturn.jsx
│   └── Members.jsx
│
├── utils/
│   └── storage.js
│
├── data/
│   └── initialData.js
│
├── App.jsx
├── main.jsx
└── index.css
```

Do not over-engineer.

---

# 10. UX REQUIREMENTS

The application should feel usable.

Implement:

- Search
- Basic filtering
- Empty states
- Form validation
- Confirmation before destructive actions
- Success/error feedback where useful
- Responsive layout

Do not add unnecessary animations.

Transitions should be subtle.

For example:

```css
transition: background-color 150ms ease;
```

is acceptable.

Large page transitions and fancy Framer Motion animations are NOT required.

---

# 11. ACCESSIBILITY

Use:

- Proper labels
- Semantic HTML
- Buttons instead of clickable divs
- Good contrast
- Keyboard-friendly forms

Do not rely only on icons.

For example, use:

```text
Add Book
```

rather than an unexplained "+" icon.

---

# 12. NO BACKEND

This is intentionally a frontend-only college mini project.

Do NOT waste time creating:

- Spring Boot
- Node backend
- Express
- MongoDB
- PostgreSQL
- Authentication
- JWT
- REST API

The data should be handled using localStorage.

---

# 13. GIT WORKFLOW — VERY IMPORTANT

Do NOT make one giant Git commit after completing everything.

I specifically want the GitHub repository to demonstrate incremental development.

First check whether Git is already initialized.

If not:

```bash
git init
```

Create a GitHub repository named:

```text
library-management-system
```

Then connect the local project to that repository.

Use meaningful commits throughout development.

Use commits approximately like:

```text
chore: initialize react project

feat: add application layout and navigation

feat: add library dashboard

feat: implement book management

feat: implement member management

feat: implement issue and return workflow

feat: add local storage persistence

style: refine library administration interface

chore: add docker configuration

ci: add jenkins pipeline

chore: add kubernetes manifests

docs: add project documentation
```

Push after meaningful milestones.

Do NOT push every tiny change.

Do NOT make one final commit containing the entire project.

---

# 14. GITHUB

Push the complete project to GitHub.

Repository:

```text
library-management-system
```

The repository should contain:

```text
src/
public/
Dockerfile
.dockerignore
Jenkinsfile
k8s/
README.md
package.json
vite.config.js
```

Do NOT commit:

```text
node_modules/
dist/
.env
```

Create an appropriate `.gitignore`.

---

# 15. DOCKER

After the application works, create a Docker setup.

Create:

```text
Dockerfile
.dockerignore
```

Use a multi-stage Docker build.

The final container should serve the React production build using Nginx.

The Docker image should be:

```text
library-management-system
```

It should work with:

```bash
docker build -t library-management-system .
```

and:

```bash
docker run -d -p 8080:80 library-management-system
```

Verify that:

```text
http://localhost:8080
```

loads the application.

Commit this separately:

```text
chore: add docker configuration
```

Push it to GitHub.

---

# 16. JENKINS

Create a Jenkins pipeline configuration.

Create:

```text
Jenkinsfile
```

The pipeline should demonstrate:

```text
Checkout
    ↓
Install Dependencies
    ↓
Build React Application
    ↓
Docker Build
```

Keep it simple.

Example stages:

```text
Checkout
Install
Build
Docker Build
```

Do not create an unnecessarily complicated CI/CD system.

Commit separately:

```text
ci: add jenkins pipeline
```

Push to GitHub.

---

# 17. KUBERNETES

Add basic Kubernetes configuration.

Create:

```text
k8s/
├── deployment.yaml
└── service.yaml
```

The Kubernetes Deployment should run the Dockerized library application.

Use:

```text
Deployment
Service
Pod
```

Keep replicas at:

```text
1
```

because this is a demonstration project.

The purpose is to demonstrate that Kubernetes can manage the application container.

The manifests should be simple and understandable.

Commit separately:

```text
chore: add kubernetes manifests
```

Push to GitHub.

---

# 18. README

Create a professional README explaining:

## Library Management System

### Overview

Briefly explain the project.

### Features

List:

- Dashboard
- Book management
- Member management
- Issue/Return
- Search
- Local storage

### Technology Stack

```text
React
JavaScript
Vite
Git
GitHub
Jira
Docker
Jenkins
Kubernetes
```

### Development Workflow

Show:

```text
Jira
 ↓
Development
 ↓
Git
 ↓
GitHub
 ↓
Jenkins
 ↓
Docker
 ↓
Kubernetes
```

### Local Setup

Explain:

```bash
npm install
npm run dev
```

### Docker

Explain:

```bash
docker build -t library-management-system .
docker run -p 8080:80 library-management-system
```

### Kubernetes

Explain basic commands:

```bash
kubectl apply -f k8s/
kubectl get pods
kubectl get services
```

---

# 19. JIRA

I will manually create/use the Jira project, but structure the development so it maps naturally to Jira tasks.

Suggested tasks:

```text
LIB-1 — Initialize React project

LIB-2 — Create application layout

LIB-3 — Build dashboard

LIB-4 — Implement book management

LIB-5 — Implement member management

LIB-6 — Implement issue and return

LIB-7 — Add local storage

LIB-8 — Dockerize application

LIB-9 — Configure Jenkins CI

LIB-10 — Add Kubernetes configuration
```

The Git commits should correspond reasonably to these tasks.

---

# 20. DEVELOPMENT ORDER

Follow this exact order.

### Phase 1

Initialize React/Vite project.

Verify:

```bash
npm run dev
```

Then commit and push.

### Phase 2

Build:

- Layout
- Sidebar
- Header
- Navigation

Commit and push.

### Phase 3

Build dashboard.

Commit and push.

### Phase 4

Build Books functionality.

Commit and push.

### Phase 5

Build Members functionality.

Commit and push.

### Phase 6

Build Issue/Return functionality.

Commit and push.

### Phase 7

Add localStorage.

Test refresh/persistence.

Commit and push.

### Phase 8

Polish UI.

Commit and push.

### Phase 9

Add Docker.

Test Docker locally.

Commit and push.

### Phase 10

Add Jenkinsfile.

Commit and push.

### Phase 11

Add Kubernetes manifests.

Commit and push.

### Phase 12

Update README.

Final commit and push.

---

# 21. TESTING

Before considering the project complete, manually test:

### Books

- Add book
- Search book
- Delete book
- Filter books

### Members

- Add member
- Search member
- Delete member

### Issue/Return

- Issue available book
- Verify status changes to Issued
- Return book
- Verify status changes to Available

### Persistence

Refresh browser.

Verify data remains.

### Production

Run:

```bash
npm run build
```

It must succeed.

### Docker

Run:

```bash
docker build -t library-management-system .
docker run -d -p 8080:80 library-management-system
```

Verify the application works.

---

# 22. IMPORTANT — DO NOT STOP AFTER WRITING CODE

You are not only generating files.

You should actually:

1. Create the project.
2. Implement the application.
3. Run it.
4. Fix build/runtime errors.
5. Test the important functionality.
6. Initialize Git.
7. Create/connect the GitHub repository if possible.
8. Make incremental commits.
9. Push the commits to GitHub.
10. Add Docker configuration.
11. Add Jenkinsfile.
12. Add Kubernetes manifests.
13. Push those changes as separate commits.
14. Verify the final GitHub repository.

Do not simply tell me what commands I should run.

Actually perform the available actions.

If GitHub authentication or permission requires my interaction, stop at that point and tell me exactly what I need to do, then continue once access is available.

---

# 23. IMPORTANT — DO NOT OVERBUILD

This is a college mini project.

Prioritize:

```text
Working application
>
Clean UI
>
Correct Git history
>
Docker
>
Jenkins
>
Kubernetes
>
Extra features
```

Do not spend time implementing unnecessary features.

Do not add authentication.

Do not add a backend.

Do not add a database.

Do not add AI features.

Do not add charts unless they genuinely improve the dashboard.

Do not add unnecessary dependencies.

---

# 24. FINAL QUALITY CHECK

Before finishing, verify:

- [ ] React application works
- [ ] Dashboard works
- [ ] Books work
- [ ] Members work
- [ ] Issue/Return works
- [ ] Search works
- [ ] localStorage works
- [ ] No gradients
- [ ] No AI-looking UI
- [ ] UI is minimal and professional
- [ ] npm run build succeeds
- [ ] Docker build succeeds
- [ ] Docker container runs
- [ ] Jenkinsfile exists
- [ ] Kubernetes manifests exist
- [ ] README exists
- [ ] Git history contains multiple meaningful commits
- [ ] Changes are pushed to GitHub

The final project should look like a **small, thoughtfully engineered college software project**, not an AI-generated showcase website.

Start by inspecting the current workspace and then execute the project step-by-step. Do not skip directly to generating all files at once.