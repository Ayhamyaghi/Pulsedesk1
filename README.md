# PulseDesk – Trainee Daily Reporting Platform

Centralize every trainee report, blocker, and daily update in one operational workspace.

PulseDesk is an internal daily reporting platform built for trainee programs and software training teams. It gives trainees a structured way to submit daily progress reports and gives admins a single place to monitor submissions, review blockers, manage trainee accounts, and understand day-to-day training activity without relying on scattered private chats.

The current repository is a frontend-first implementation built with React, TypeScript, Vite, React Router, Tailwind CSS, and mock in-memory state. It models the core operational flows for both Admin and Trainee personas and provides a clean foundation for a production backend, database persistence, secure authentication, and file storage.

---

## What is PulseDesk?

Training teams often manage daily updates through private messages, informal chat threads, or spreadsheets. That workflow becomes difficult to scale because reports are scattered, blockers are not visible in one place, and managers must manually check who submitted, who missed their report, and what each trainee worked on.

PulseDesk turns that workflow into one structured internal system:

- Trainees submit daily reports using one consistent format
- Admins monitor all trainee activity from a centralized dashboard
- Blockers are visible immediately
- Report history is searchable and reviewable
- Trainee accounts can be activated, deactivated, and managed
- Daily progress becomes easier to inspect, compare, and follow up on

PulseDesk is designed as an operational tool, not just a form submission screen. The long-term direction is to make trainee reporting traceable, searchable, auditable, and easy to connect with future roadmap, review, and performance workflows.

---

## Key Features

### Dual persona system

| Persona | Description |
|---|---|
| Trainee | Creates, edits, and reviews their own daily reports |
| Admin | Reviews all reports, monitors blockers, and manages trainee accounts |

---

### Trainee dashboard

The trainee dashboard gives each trainee a focused view of their own reporting activity.

A trainee can see:

- Current reporting status
- Recent reports
- Quick access to create today’s report
- Quick access to edit eligible reports
- Personal report history
- Report details from previous days

The trainee experience is intentionally scoped to the current user’s own data. Trainees do not see other trainees, admin dashboards, or global reporting information.

---

### Structured daily report submission

Each report captures the information a team leader needs for daily follow-up:

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

This structure gives reports enough detail to be operationally useful while keeping the submission flow simple enough for daily use.

---

### Controlled report editing

PulseDesk supports controlled editability for submitted reports.

Current behavior:

- Trainees can edit today’s report
- Trainees can edit yesterday’s report
- Older reports become read-only from the trainee side

This gives trainees reasonable flexibility for corrections while protecting historical reports from uncontrolled changes.

---

### Admin dashboard

The admin dashboard gives managers a high-level view of trainee reporting activity.

Admins can review:

- Total trainees
- Reports submitted today
- Reports missing today
- Reports with blockers
- Trainee overview
- Today’s blocker reports

The purpose of the admin dashboard is fast operational awareness. A manager should be able to open the dashboard and immediately understand the reporting status of the team.

---

### Admin report management

Admins can browse, search, and review reports across all trainees.

Supported capabilities include:

- View all trainee reports
- Search reports by trainee, date, or report content
- Filter reports by blocker status
- Open detailed report views
- Review trainee progress and blocker context

This centralizes daily review and removes the need to inspect separate conversations manually.

---

### Trainee account management

Admins can manage trainee accounts directly from the platform.

Supported capabilities include:

- View trainee accounts
- Add new trainees
- Edit trainee information
- Activate trainee accounts
- Deactivate trainee accounts

This creates a basic administration layer for internal team management.

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI framework | React 19 |
| Language | TypeScript 5.8 |
| Build tool | Vite 6 |
| Routing | React Router 7 |
| Styling | Tailwind CSS v4 |
| Icons | Lucide React |
| Date utilities | date-fns |
| Animation | Motion |
| State management | React Context + local state |
| Data source | Mock in-memory data |

The current implementation is frontend-only from a persistence perspective. Data is mock-seeded and stored in React state, which means application data resets when the page reloads.

---

## Current Implementation Status

PulseDesk currently includes:

- Frontend application shell
- Role-based navigation
- Prototype login with role selection
- Trainee dashboard
- Trainee report history
- Trainee report detail view
- Trainee report create/edit flow
- Admin dashboard
- Admin report management
- Admin trainee management
- Mock users
- Mock reports
- Reusable UI components
- TypeScript domain types
- Local in-memory state management

PulseDesk does not currently include:

- Real backend API integration
- Persistent database storage
- Production authentication
- Password handling
- JWT or session management
- Server-side authorization
- Real screenshot/file storage
- Server-side validation
- Audit logging
- Production deployment configuration
- Automated test suite

The repository should currently be treated as a strong frontend prototype and product foundation, not yet as a production-ready full-stack system.

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
```

---

## Project Structure

```text
src/
├── App.tsx                         # Root router and route definitions
├── main.tsx                        # React application bootstrap
├── types.ts                        # Shared domain types: User, Report, roles, statuses
├── index.css                       # Tailwind and global styles
├── context/
│   └── AppContext.tsx              # Mock auth, users, reports, and application actions
├── components/
│   ├── Button.tsx                  # Reusable button component
│   ├── Card.tsx                    # Reusable card component
│   ├── Layout.tsx                  # Authenticated application layout
│   └── Sidebar.tsx                 # Role-aware navigation sidebar
└── pages/
    ├── Login.tsx                   # Prototype login / role selection
    ├── trainee/
    │   ├── Dashboard.tsx           # Trainee personal dashboard
    │   ├── ReportsList.tsx         # Trainee report history
    │   ├── ReportDetail.tsx        # Read-only report details
    │   └── ReportEdit.tsx          # Create/edit report form
    └── admin/
        ├── Dashboard.tsx           # Admin operational overview
        ├── ReportsManage.tsx       # Admin report browsing and filtering
        └── TraineeManage.tsx       # Admin trainee account management
```

---

## Application Routes

### Public route

```text
/login
```

### Trainee routes

```text
/dashboard
/my-reports
/report/new
/report/:id
/report/:id/edit
```

### Admin routes

```text
/admin/dashboard
/admin/reports
/admin/trainees
```

### Routing behavior

- Unknown routes redirect to `/login`
- Root path redirects to `/dashboard`
- Authenticated pages are rendered inside the shared layout
- Navigation options are generated based on the selected role

In production, routing must be backed by real authentication and server-side authorization. Client-side route guards are not a security boundary.

---

## Core Domain Model

### User

Represents an account in the system.

```text
User
├── id
├── name
├── email
├── role
└── status
```

Supported roles:

```text
ADMIN
TRAINEE
```

Supported statuses:

```text
active
inactive
```

---

### Report

Represents a trainee’s daily report.

```text
Report
├── id
├── traineeId
├── traineeName
├── date
├── content
├── startTime
├── endTime
├── totalHours
├── workDone
├── hasBlockers
├── blockersDetails
├── nextSteps
├── notes
├── screenshots
├── status
├── createdAt
└── updatedAt
```

Supported report statuses:

```text
submitted
draft
```

The report model already anticipates future backend persistence and maps cleanly into database entities, API DTOs, and admin reporting queries.

---

## Main User Flows

### Trainee flow

```text
Login as trainee
    ↓
Open trainee dashboard
    ↓
Create today’s report
    ↓
Fill work summary, blocker details, next steps, and screenshots
    ↓
Submit report
    ↓
Review report history
    ↓
Edit eligible reports when needed
```

---

### Admin flow

```text
Login as admin
    ↓
Open admin dashboard
    ↓
Review today’s submission status
    ↓
Check reports with blockers
    ↓
Browse all reports
    ↓
Open report details
    ↓
Manage trainee accounts
```

---

## Business Rules

PulseDesk currently models the following business rules:

- A trainee should submit one report per day
- A report contains structured daily work information
- Blocker details are required when blockers are selected
- Screenshot uploads are capped at four files
- Trainees can edit today’s and yesterday’s reports
- Older reports are treated as historical records
- Admins can view reports across all trainees
- Trainees can only view their own reports
- Admins can activate or deactivate trainee accounts

Important: these rules currently exist in the frontend prototype. In production, every rule must be enforced by the backend as the source of truth.

---

## Frontend Architecture

The current frontend architecture is intentionally simple.

```text
React App
    ↓
React Router
    ↓
Shared Layout
    ↓
Role-based Pages
    ↓
AppContext State
    ↓
Mock Users + Mock Reports
```

### Current state boundary

`AppContext` currently owns:

- Current user
- User list
- Report list
- Login/logout behavior
- Report creation
- Report updates
- Trainee creation
- Trainee activation/deactivation

This is acceptable for a prototype, but it should not remain the production data boundary.

For production, `AppContext` should become thinner and delegate server-state concerns to:

- API clients
- Query/cache layer
- Auth provider
- Typed request/response models
- Centralized error handling

Recommended client-side server-state option:

```text
TanStack Query
```

Recommended future frontend structure:

```text
src/
├── app/
│   ├── router/
│   └── providers/
├── features/
│   ├── auth/
│   ├── reports/
│   ├── trainees/
│   └── dashboard/
├── shared/
│   ├── api/
│   ├── components/
│   ├── hooks/
│   ├── types/
│   └── utils/
└── styles/
```

This keeps feature logic isolated and prevents the application from becoming page-driven and tightly coupled as the product grows.

---

## Recommended Backend Direction

PulseDesk is ready to be connected to a production backend.

Recommended stack:

| Layer | Suggested Technology |
|---|---|
| Backend language | Kotlin |
| Framework | Spring Boot |
| Security | Spring Security |
| Persistence | Spring Data JPA |
| Database | PostgreSQL |
| Migrations | Flyway |
| Authentication | JWT or secure session-based authentication |
| File storage | Local storage for MVP, S3-compatible storage later |
| API documentation | OpenAPI / Swagger |

Recommended backend architecture:

```text
Controller
    ↓
Service
    ↓
Domain
    ↓
Repository
    ↓
Database
```

The backend should own all business rules, authorization checks, data integrity constraints, and audit-sensitive operations.

---

## Recommended API Surface

### Auth

```text
POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/logout
GET  /api/v1/auth/me
```

---

### Trainees

```text
GET    /api/v1/trainees
POST   /api/v1/trainees
GET    /api/v1/trainees/{id}
PUT    /api/v1/trainees/{id}
PATCH  /api/v1/trainees/{id}/status
```

---

### Reports

```text
POST   /api/v1/reports
GET    /api/v1/reports/my
GET    /api/v1/reports
GET    /api/v1/reports/{id}
PUT    /api/v1/reports/{id}
DELETE /api/v1/reports/{id}
```

---

### Files

```text
POST   /api/v1/files/report-screenshots
GET    /api/v1/files/{id}
DELETE /api/v1/files/{id}
```

---

## Recommended Database Model

### users

```text
id
full_name
email
password_hash
role
status
created_at
updated_at
last_login_at
```

---

### reports

```text
id
trainee_id
report_date
start_time
end_time
total_minutes
work_done
has_blockers
blocker_details
next_steps
notes
status
created_at
updated_at
```

Recommended constraint:

```text
UNIQUE (trainee_id, report_date)
```

This prevents duplicate daily reports even if the frontend fails or the API is called directly.

---

### report_screenshots

```text
id
report_id
storage_key
file_name
content_type
file_size
uploaded_at
```

---

### audit_logs

```text
id
actor_user_id
action
entity_type
entity_id
metadata
created_at
```

Audit logging is strongly recommended because PulseDesk is an internal operational platform where report edits, account changes, and admin actions should be traceable.

---

## Security Considerations

The current frontend prototype is not production-secure because authentication and authorization are simulated on the client.

Before production use, PulseDesk must include:

- Real email/password authentication
- Strong password hashing
- Secure session or JWT handling
- Server-side role-based access control
- Backend ownership checks for trainee reports
- Admin-only access to trainee management APIs
- Validation on every write operation
- File upload validation
- File size limits
- MIME type validation
- Protected screenshot access
- Rate limiting on authentication endpoints
- Centralized error handling
- Audit logging for sensitive operations

Frontend route protection should only improve user experience. It must never be treated as the security boundary.

---

## Validation Rules

Validation should exist on both the client and server, with the server as the final authority.

Recommended report validation:

- `reportDate` is required
- `startTime` is required
- `endTime` is required
- `totalMinutes` must be positive
- `workDone` is required
- `nextSteps` is required
- `blockerDetails` is required when `hasBlockers` is true
- Screenshot count must respect the configured min/max rules
- A trainee cannot create duplicate reports for the same date
- Report edit eligibility must be enforced server-side

Recommended account validation:

- Email must be unique
- Email must be valid
- Name must not be empty
- Role must be controlled by the backend
- Status transitions must be authorized

---

## Known Technical Gaps

### Authentication

Current behavior:

- User selects Admin or Trainee from the login screen
- No credentials are verified

Required production behavior:

- Real login with email and password
- Password hashing
- Token or session lifecycle
- Authenticated `/me` endpoint
- Proper logout behavior

---

### Authorization

Current behavior:

- UI changes based on selected role

Required production behavior:

- Backend authorization per endpoint
- Ownership checks for trainee reports
- Admin-only access to global report and trainee APIs
- Proper `401 Unauthorized` and `403 Forbidden` responses

---

### Persistence

Current behavior:

- State is stored in memory
- Data resets on refresh

Required production behavior:

- PostgreSQL persistence
- Migration-managed schema
- Transactional service layer
- Repository-level query boundaries

---

### File upload

Current behavior:

- Screenshots are held as frontend data

Required production behavior:

- Multipart upload endpoint
- Object storage or controlled local storage
- File metadata stored in database
- File access controlled by role and ownership

---

### Observability

Current behavior:

- No production observability layer

Required production behavior:

- Structured logs
- Request correlation IDs
- Error tracking
- Audit logs
- Basic operational metrics

---

## Testing Strategy

The current repository does not include an automated test suite.

A production-grade implementation should include the following.

### Frontend tests

Recommended coverage:

- Component tests for reusable UI components
- Page-level tests for trainee flows
- Page-level tests for admin flows
- Form validation tests
- Route protection tests
- API integration tests using mocked handlers

Recommended tools:

- Vitest
- React Testing Library
- MSW
- Playwright

---

### Backend tests

Recommended coverage:

- Unit tests for service-layer business rules
- Repository tests with a real PostgreSQL-compatible environment
- Controller/API contract tests
- Security tests for role-based access
- File upload tests
- Migration validation tests

Recommended tools:

- JUnit 5
- Spring Boot Test
- Testcontainers
- MockMvc or WebTestClient
- ArchUnit

---

## Production Readiness Checklist

Before PulseDesk can be used as a real internal system, the following should be completed:

- Replace mock login with real authentication
- Add backend API integration
- Add PostgreSQL persistence
- Add database migrations
- Enforce one report per trainee per date at database level
- Enforce edit eligibility server-side
- Add real file upload and storage
- Add backend authorization checks
- Add pagination for admin report lists
- Add filtering by date range, trainee, and blocker status
- Add loading states
- Add error states
- Add empty states
- Add frontend validation consistency
- Add backend validation
- Add audit logging
- Add automated tests
- Add CI checks for type-checking and build
- Add deployment configuration
- Review environment variables
- Review dependency footprint

---

## Recommended Next Steps

### Phase 1 — Backend foundation

- Create Spring Boot backend
- Define User and Report entities
- Configure PostgreSQL
- Add Flyway migrations
- Implement authentication
- Implement role-based authorization
- Implement report CRUD APIs
- Implement trainee management APIs

---

### Phase 2 — Frontend API integration

- Replace mock AppContext actions with API services
- Add typed request and response DTOs
- Add authenticated route handling
- Add loading states
- Add error states
- Add empty states
- Add real file upload flow

---

### Phase 3 — Operational hardening

- Add audit logs
- Add pagination
- Add advanced filters
- Add dashboard metrics from backend queries
- Add server-side report uniqueness
- Add structured error responses
- Add production logging

---

### Phase 4 — Product expansion

- Weekly summaries
- Monthly performance overview
- Admin comments on reports
- Report approval workflow
- Notifications for missing reports
- Notifications for blockers
- PDF export
- Excel export
- Blocker trend analysis
- Trainee performance timelines
- Multi-team support

---

## Roadmap

What is next:

- Backend API and database persistence
- Real user authentication
- Per-user authorization
- Report screenshot upload storage
- Admin report filters by date range and trainee
- Audit log for report and account changes
- Notification system for missing reports and blockers
- PDF and Excel export for reporting
- Analytics dashboard for trainee performance trends
- Mobile-responsive layout improvements
- Deployment-ready environment configuration

---

## Engineering Philosophy

PulseDesk should be treated as an operational reporting system, not just a CRUD interface.

The architecture should prioritize:

- Clear domain boundaries
- Server-side business rule enforcement
- Strong authorization
- Data integrity
- Traceability
- Auditability
- Maintainable feature modules
- Predictable API contracts
- Clean UI flows
- Low-friction daily usage
- Scalability without premature complexity

The prototype already communicates the product direction clearly. The next engineering milestone is to preserve the simplicity of the user experience while replacing mock state and client-only rules with a secure backend, persistent storage, typed API contracts, and production-grade operational controls.

---

## License

Internal project.

A formal license can be added later depending on the intended distribution model.
