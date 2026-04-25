# PulseDesk - Architecture

## 1. Overview

PulseDesk is a full-stack web application built with:

- Frontend: Next.js (React)
- Backend: Kotlin + Spring Boot
- Database: PostgreSQL
- Storage: Local / Cloud (for report screenshots)

The system follows a clean separation between frontend and backend, using REST APIs for communication.

---

## 2. High-Level Architecture

Frontend (Next.js)
        ↓
REST API (HTTP)
        ↓
Backend (Spring Boot)
        ↓
Database (PostgreSQL)
        ↓
File Storage (Images)

---

## 3. Frontend Architecture (Next.js)

### Structure
- pages/
  - auth/
  - trainee/
  - admin/
- components/
- hooks/
- services/ (API calls)
- context/ (auth + global state)

### Responsibilities
- UI rendering
- form validation (basic)
- API integration
- role-based routing
- state management (auth + user)

---

## 4. Backend Architecture (Spring Boot)

Follows Clean Architecture:

- Controller Layer
- Service Layer
- Domain Layer
- Repository Layer

### Layers

#### Controller
- expose REST endpoints
- validate requests
- return responses

#### Service
- business logic
- enforce rules
- coordinate between layers

#### Domain
- core models
- business rules

#### Repository
- database access (Spring Data JPA)

---

## 5. Core Modules

### Auth Module
- login
- register
- role handling (ADMIN / TRAINEE)
- JWT (later stage)

### User Module
- create trainee
- update trainee
- activate/deactivate
- list trainees

### Report Module
- create report
- update report
- get reports
- filter reports
- enforce business rules

### File Module
- upload screenshots
- link images to reports

---

## 6. Database Design (Conceptual)

### User Table
- id
- full_name
- email
- password_hash
- role (ADMIN / TRAINEE)
- status (PENDING / ACTIVE / INACTIVE)
- created_at

### Report Table
- id
- trainee_id (FK)
- report_date
- start_time
- end_time
- total_hours
- work_done
- has_blockers
- blocker_details
- next_steps
- notes
- created_at
- updated_at

### Report Images Table
- id
- report_id (FK)
- file_path
- uploaded_at

---

## 7. API Design (High Level)

### Auth
- POST /auth/register
- POST /auth/login

### Trainee
- GET /trainees
- POST /trainees
- PUT /trainees/{id}
- PATCH /trainees/{id}/status

### Reports
- POST /reports
- PUT /reports/{id}
- GET /reports/my
- GET /reports
- GET /reports/{id}

### Files
- POST /files/upload

---

## 8. Business Rules Enforcement

Handled in Service Layer:

- one report per day
- editable only today + yesterday
- blocker required only if enabled
- screenshot min/max validation

---

## 9. Security (Phase 1)

- role-based access:
  - ADMIN routes
  - TRAINEE routes
- basic auth (no JWT yet in UI version)
- backend ready for JWT integration later

---

## 10. Future Improvements

- JWT authentication
- cloud storage (S3)
- pagination + advanced filters
- analytics dashboard
- notifications
- mobile app

---

## 11. Deployment Plan (Next Step)

- push frontend to GitHub
- push backend to GitHub
- deploy backend (Railway / Render)
- deploy frontend (Vercel)
- connect both via API base URL