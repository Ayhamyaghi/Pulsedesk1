# PulseDesk

PulseDesk is an internal trainee reporting and operational visibility platform designed for Folowise-style training environments where daily progress tracking, blocker visibility, and trainee accountability need to be centralized, structured, and easy to review.

The current repository represents a high-fidelity frontend prototype built with React, Vite, TypeScript, React Router, Tailwind CSS, and local in-memory state. It models the core product flows for both Trainee and Admin roles and establishes the functional foundation for a future production-grade implementation backed by a secure API, persistent database, authentication layer, and file storage.

PulseDesk is intended to replace fragmented daily report submissions through private chats with a single internal system that provides a consistent reporting format, role-based dashboards, report history, blocker tracking, and trainee account management.

---

## Product Context

In many internship and trainee programs, daily updates are submitted manually through messaging tools. This creates predictable operational problems:

- Reports are scattered across multiple private conversations.
- Managers spend unnecessary time checking who submitted and who did not.
- There is no consistent reporting structure.
- Blockers are not visible in one place.
- Historical progress is difficult to review per trainee.
- Trainee account and status management is not centralized.

PulseDesk solves this by introducing a structured daily reporting workflow where trainees submit reports through a dedicated interface and admins review activity through centralized dashboards.

---

## Current Implementation Status

This repository is currently a frontend-first prototype.

It includes:

- Role-based UI flows for Admin and Trainee users.
- Mock authentication via role selection.
- In-memory application state using React Context.
- Mock trainee and report data.
- Daily report creation and editing flows.
- Admin report browsing and filtering.
- Trainee account activation/deactivation.
- Responsive dashboard-style interface.
- Tailwind-based design system primitives.

It does not currently include:

- Real backend API integration.
- Persistent database storage.
- Production authentication.
- JWT/session handling.
- Real file upload storage.
- Server-side validation.
- Audit logging.
- Authorization enforcement at API level.
- Deployment configuration for production environments.

The repository should therefore be treated as a product prototype and frontend architecture baseline, not yet as a production-ready full-stack system.

---

## Technology Stack

### Frontend

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS v4
- date-fns
- lucide-react
- motion

### Local State

- React Context API
- useState-based in-memory state
- Mock users and mock reports

### Build Tooling

- Vite
- TypeScript compiler checks
- Tailwind Vite plugin

---

## Repository Structure

```text
.
├── architecture.md
├── spec.md
├── README.md
├── package.json
├── vite.config.ts
├── tsconfig.json
├── index.html
└── src
    ├── App.tsx
    ├── main.tsx
    ├── index.css
    ├── types.ts
    ├── components
    │   ├── Button.tsx
    │   ├── Card.tsx
    │   ├── Layout.tsx
    │   └── Sidebar.tsx
    ├── context
    │   └── AppContext.tsx
    └── pages
        ├── Login.tsx
        ├── trainee
        │   ├── Dashboard.tsx
        │   ├── ReportsList.tsx
        │   ├── ReportDetail.tsx
        │   └── ReportEdit.tsx
        └── admin
            ├── Dashboard.tsx
            ├── ReportsManage.tsx
            └── TraineeManage.tsx
