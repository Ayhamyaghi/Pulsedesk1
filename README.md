# PulseDesk – Trainee Daily Reporting Platform

Centralize every trainee report, blocker, and daily update in one operational dashboard.

PulseDesk is an internal daily reporting platform for training teams. It gives trainees a structured way to submit daily progress reports and gives admins a single place to monitor submissions, review blockers, manage trainee accounts, and track day-to-day activity without relying on scattered private chats.

---

## What is PulseDesk?

Modern training teams often manage daily updates through private messages, spreadsheets, or informal chat threads. This creates a fragmented workflow where managers must manually check who submitted, who missed their report, which trainees are blocked, and what each trainee worked on across different conversations.

PulseDesk turns that workflow into a centralized internal system:

- Trainees submit structured daily reports
- Admins monitor all trainee activity from one dashboard
- Blockers are visible immediately
- Report history is searchable and reviewable
- Trainee accounts can be managed from the admin area
- Daily reporting follows one consistent format

The current repository is a frontend-first prototype that models the main product flows using React, TypeScript, Vite, Tailwind CSS, React Router, and mock in-memory data.

---

## Key Features

### Role-based experience

| Role | Description |
|---|---|
| Trainee | Creates, edits, and reviews their own daily reports |
| Admin | Reviews all reports, tracks blockers, and manages trainee accounts |

---

### Trainee dashboard

A trainee can quickly see:

- Today’s report status
- Recent submitted reports
- Quick action to create or edit today’s report
- Personal reporting history
- Report details for previous days

---

### Daily report submission

Each report captures the operational details a manager needs:

- Report date
- Start time
- End time
- Total working hours
- Work completed
- Blocker status
- Blocker details
- Next steps
- Optional notes
- Screenshot attachments

Reports are designed to give both a short daily summary and enough context for a manager to understand actual progress.

---

### Report editing rules

PulseDesk supports controlled report editing:

- Trainees can edit today’s report
- Trainees can edit yesterday’s report
- Older reports become read-only from the trainee side

This keeps the workflow flexible enough for real daily usage while protecting older reporting history from uncontrolled changes.

---

### Admin dashboard

The admin dashboard provides a centralized operational overview:

- Total trainees
- Reports submitted today
- Reports missing today
- Reports with blockers
- Trainee overview
- Today’s blocker reports

The goal is to help the manager understand the current training status in seconds.

---

### Admin report management

Admins can browse and inspect trainee reports across the team.

Supported report management capabilities include:

- View all trainee reports
- Search reports by trainee, date, or report content
- Filter reports with blockers
- Open detailed report views
- Review trainee work and blocker context

---

### Trainee account management

Admins can manage trainee accounts directly from the system.

Supported actions include:

- Add trainee accounts
- View trainee list
- Edit trainee information
- Activate trainees
- Deactivate trainees

This gives the platform a basic internal administration layer instead of relying only on hardcoded users.

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI framework | React 19 + TypeScript |
| Build tool | Vite 6 |
| Routing | React Router |
| Styling | Tailwind CSS v4 |
| Icons | Lucide React |
| Date utilities | date-fns |
| Animation | Motion |
| State management | React Context + local in-memory state |
| Data source | Mock-seeded frontend data |

The current version does not use a real backend yet. Application state is held in React Context and resets when the page reloads.

---

## Current Implementation Status

PulseDesk currently includes:

- Frontend application shell
- Login screen with role selection
- Admin and trainee route separation
- Trainee dashboard
- Trainee report list
- Trainee report detail page
- Trainee report create/edit flow
- Admin dashboard
- Admin report management page
- Admin trainee management page
- Mock users and mock reports
- Reusable UI components
- TypeScript domain models

PulseDesk does not yet include:

- Real authentication
- Persistent database
- Backend API
- JWT/session handling
- Server-side authorization
- Real file storage
- Production deployment configuration
- Automated test suite

This means the repository should currently be treated as a high-quality product prototype and frontend foundation, not a finished production system.

---

## Running Locally

Prerequisites: Node.js 18+

```bash
# Install dependencies
npm install

# Start the development server on http://localhost:3000
npm run dev

# Type-check the project
npm run lint

# Build for production
npm run build

# Preview the production build
npm run preview
