# PulseDesk – Trainee Daily Reporting Platform

Centralize every trainee report, blocker, and daily update in one operational dashboard.

PulseDesk is an internal daily reporting platform for training teams. It gives trainees a structured way to submit daily progress reports and gives admins a single place to monitor submissions, review blockers, manage trainee accounts, and track day-to-day activity without relying on scattered private chats.

What is PulseDesk?

Modern training teams often manage daily updates through private messages, spreadsheets, or informal chat threads. This creates a fragmented workflow where managers must manually check who submitted, who missed their report, which trainees are blocked, and what each trainee worked on across different conversations.

PulseDesk turns that workflow into a centralized internal system:

Each trainee submits structured daily reports
Admins monitor all trainee activity from one dashboard
Blockers are visible immediately
Report history is searchable and reviewable
Trainee accounts can be managed from the admin area
Daily reporting follows one consistent format

Key Features

Role-based experience

Role        Description
Trainee     Creates, edits, and reviews their own daily reports
Admin       Reviews all reports, tracks blockers, and manages trainee accounts

Trainee dashboard

A trainee can quickly see:

Today’s report status
Recent submitted reports
Quick action to create or edit today’s report
Personal reporting history
Report details for previous days

Daily report submission

Each report captures the operational details a manager needs:

Report date
Start time
End time
Total working hours
Work completed
Blocker status
Blocker details
Next steps
Optional notes
Screenshot attachments

Reports are designed to give both a short daily summary and enough context for a manager to understand actual progress.

Report editing rules

PulseDesk supports controlled report editing:

Trainees can edit today’s report
Trainees can edit yesterday’s report
Older reports become read-only from the trainee side

This keeps the workflow flexible enough for real daily usage while protecting older reporting history from uncontrolled changes.

Admin dashboard

The admin dashboard provides a centralized operational overview:

Total trainees
Reports submitted today
Reports missing today
Reports with blockers
Trainee overview
Today’s blocker reports

The goal is to help the manager understand the current training status in seconds.

Admin report management

Admins can browse and inspect trainee reports across the team.

Supported report management capabilities include:

View all trainee reports
Search reports by trainee, date, or report content
Filter reports with blockers
Open detailed report views
Review trainee work and blocker context

Trainee account management

Admins can manage trainee accounts directly from the system.

Supported actions include:

Add trainee accounts
View trainee list
Edit trainee information
Activate trainees
Deactivate trainees

This gives the platform a basic internal administration layer instead of relying only on hardcoded users.

Tech Stack

Layer              Technology
UI framework       React 19 + TypeScript
Build tool         Vite 6
Routing            React Router
Styling            Tailwind CSS v4
Icons              Lucide React
Date utilities     date-fns
Animation          Motion
State management   React Context + local in-memory state
Data source        Mock-seeded frontend data

The current version does not use a real backend yet. Application state is held in React Context and resets when the page reloads.

Current Implementation Status

PulseDesk currently includes:

Frontend application shell
Login screen with role selection
Admin and trainee route separation
Trainee dashboard
Trainee report list
Trainee report detail page
Trainee report create/edit flow
Admin dashboard
Admin report management page
Admin trainee management page
Mock users and mock reports
Reusable UI components
TypeScript domain models

PulseDesk does not yet include:

Real authentication
Persistent database
Backend API
JWT/session handling
Server-side authorization
Real file storage
Production deployment configuration
Automated test suite

This means the repository should currently be treated as a high-quality product prototype and frontend foundation, not a finished production system.

Running Locally

Prerequisites: Node.js 18+

Install dependencies:

npm install

Start the development server on http://localhost:3000:

npm run dev

Type-check the project:

npm run lint

Build for production:

npm run build

Preview the production build:

npm run preview

Project Structure

src/
├── App.tsx                         Root routing and application entry composition
├── main.tsx                        React application bootstrap
├── types.ts                        Shared domain types: User, Report, roles, statuses
├── index.css                       Tailwind and global styles
├── context/
│   └── AppContext.tsx              Mock auth, users, reports, and app actions
├── components/
│   ├── Button.tsx                  Reusable button component
│   ├── Card.tsx                    Reusable card component
│   ├── Layout.tsx                  Authenticated app layout
│   └── Sidebar.tsx                 Role-aware navigation sidebar
└── pages/
    ├── Login.tsx                   Prototype login / role selection
    ├── trainee/
    │   ├── Dashboard.tsx           Trainee personal dashboard
    │   ├── ReportsList.tsx         Trainee report history
    │   ├── ReportDetail.tsx        Read-only report details
    │   └── ReportEdit.tsx          Create/edit report form
    └── admin/
        ├── Dashboard.tsx           Admin operational overview
        ├── ReportsManage.tsx       Admin report browsing and filtering
        └── TraineeManage.tsx       Admin trainee account management

Core Data Model

User

Represents an account in the system.

User
├── id
├── name
├── email
├── role
└── status

Supported roles:

ADMIN
TRAINEE

Supported statuses:

active
inactive

Report

Represents a trainee’s daily report.

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

The model is already structured for future backend persistence and can be mapped cleanly into database tables and API DTOs.

Main User Flows

Trainee flow

Login as trainee
↓
Open trainee dashboard
↓
Create today’s report
↓
Fill work summary, blockers, next steps, and screenshots
↓
Submit report
↓
Review report history
↓
Edit eligible reports when needed

Admin flow

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

Business Rules

PulseDesk currently models the following rules:

A trainee should submit one report per day
A report contains structured daily work information
Blocker details are required when blockers are selected
Screenshots are limited to a maximum of four
Trainees can edit today’s and yesterday’s reports
Older reports are treated as historical records
Admins can view all trainee reports
Trainees can only view their own reports
Admins can activate or deactivate trainee accounts

Important: these rules currently exist in the frontend prototype. In a production implementation, every rule must be enforced by the backend as the source of truth.

Recommended Backend Direction

PulseDesk is ready to be connected to a backend API.

A production implementation should use a clean layered architecture:

Controller
↓
Service
↓
Domain
↓
Repository
↓
Database

Recommended backend stack:

Layer              Suggested Technology
Backend language   Kotlin
Framework          Spring Boot
Security           Spring Security
Persistence        Spring Data JPA
Database           PostgreSQL
Migrations         Flyway
Authentication     JWT or secure session-based auth
File storage       Local storage for MVP, S3-compatible storage later
API docs           OpenAPI / Swagger

Recommended API Surface

Auth

POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/logout
GET  /api/v1/auth/me

Trainees

GET    /api/v1/trainees
POST   /api/v1/trainees
GET    /api/v1/trainees/{id}
PUT    /api/v1/trainees/{id}
PATCH  /api/v1/trainees/{id}/status

Reports

POST   /api/v1/reports
GET    /api/v1/reports/my
GET    /api/v1/reports
GET    /api/v1/reports/{id}
PUT    /api/v1/reports/{id}
DELETE /api/v1/reports/{id}

Files

POST   /api/v1/files/report-screenshots
GET    /api/v1/files/{id}
DELETE /api/v1/files/{id}

Recommended Database Model

users

id
full_name
email
password_hash
role
status
created_at
updated_at
last_login_at

reports

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

report_screenshots

id
report_id
storage_key
file_name
content_type
file_size
uploaded_at

audit_logs

id
actor_user_id
action
entity_type
entity_id
metadata
created_at

Audit logging is recommended because PulseDesk is an internal operational system where report edits, account changes, and admin actions should be traceable.

Security Notes

The current prototype is not production-secure because authentication and authorization are simulated on the client.

Before production use, PulseDesk must include:

Real email/password authentication
Password hashing
Secure session or JWT handling
Server-side role-based access control
Backend ownership checks for trainee reports
Admin-only access to trainee management APIs
Validation on every write operation
File upload validation
File size limits
Protected screenshot access
Rate limiting on authentication endpoints
Centralized error handling
Audit logs for sensitive operations

Frontend route protection should only improve user experience. It must not be treated as a security boundary.

Production Readiness Checklist

Before PulseDesk can be used as a real internal system, the following should be completed:

Replace mock login with real authentication
Add backend API integration
Add PostgreSQL persistence
Add database migrations
Enforce one report per trainee per date at database level
Enforce edit eligibility server-side
Add real file upload and storage
Add backend authorization checks
Add pagination for admin report lists
Add stronger filtering by date, trainee, and blocker status
Add loading and error states
Add frontend form validation consistency
Add backend validation
Add audit logging
Add automated tests
Add deployment configuration
Remove unused environment variables
Review dependency footprint
Add CI checks for type-checking and build

Recommended Next Steps

Phase 1 — Backend foundation

Create Spring Boot backend
Define User and Report entities
Add PostgreSQL and Flyway
Implement authentication
Implement role-based authorization
Implement report CRUD APIs
Implement trainee management APIs

Phase 2 — Frontend API integration

Replace mock AppContext actions with API services
Add typed request/response DTOs
Add authenticated route handling
Add loading states
Add error states
Add empty states
Add real file upload flow

Phase 3 — Operational hardening

Add audit logs
Add pagination
Add advanced filters
Add dashboard metrics from backend queries
Add server-side report uniqueness
Add production deployment pipeline

Phase 4 — Product expansion

Weekly report summaries
Monthly performance overview
Admin comments on reports
Report approval workflow
Notifications for missing reports
Blocker trend analysis
PDF / Excel export
Mobile-responsive improvements
Multi-team support

Roadmap

What’s next:

Backend API + database persistence
Real user authentication
Per-user authorization
Report screenshot upload storage
Admin report filters by date range and trainee
Audit log for report and account changes
Notification system for missing reports and blockers
PDF / Excel export for reporting
Analytics dashboard for trainee performance trends
Mobile-responsive layout improvements
Deployment-ready environment configuration

License

Internal project.

License can be added later depending on the intended distribution model.
