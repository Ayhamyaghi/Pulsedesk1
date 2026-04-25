# PulseDesk - Product Specification

## 1. Overview
PulseDesk is an internal web-based daily reporting system for Folowise trainees and management.

The system is designed to replace scattered daily report submissions sent through private chats and move them into one centralized internal platform.

The first version of PulseDesk focuses on:
- daily trainee reporting
- admin monitoring
- blocker visibility
- trainee account management

This product is intended to be usable internally from day one as a real operational tool.

---

## 2. Problem Statement
Currently, trainees send their daily reports individually through private chat tools. This creates several operational problems:

- there is no unified report template
- reports are scattered across separate conversations
- management must review each trainee individually
- it is difficult to track who submitted and who did not
- it is difficult to review historical reports for one trainee
- blockers are not visible in one centralized place

This wastes management time and makes daily follow-up inefficient.

---

## 3. Goals
The goals of PulseDesk V1 are:

- provide one unified daily report format for all trainees
- reduce manager review time through a centralized dashboard
- allow admin to quickly see:
  - who submitted
  - who did not submit
  - which reports contain blockers
- allow trainees to manage and review their own reports
- allow admin to manage trainee accounts
- provide a clean foundation for future expansion

---

## 4. Non-Goals
The following are explicitly out of scope for V1:

- mobile application
- weekly summary reports
- monthly summary reports
- Google login
- notifications
- email invitations
- analytics and performance scoring
- PDF / Excel export
- comments / approval workflow on reports

---

## 5. Users and Roles

### 5.1 Trainee
A trainee can:
- self-register
- log in
- view own dashboard
- create a daily report
- edit eligible reports
- view own report history
- view own report details

### 5.2 Admin
There is only one admin in the system, representing the manager.

The admin can:
- log in
- access the admin dashboard
- browse all trainee reports
- filter reports
- view any trainee report details
- add trainee accounts manually
- edit trainee name and email
- activate or deactivate trainee accounts

---

## 6. Core User Flows

### 6.1 Trainee Registration
1. trainee opens registration page
2. trainee enters full name, email, and password
3. account is created with pending or inactive status
4. admin later activates the account

### 6.2 Trainee Login
1. trainee logs in using email and password
2. if account is active, trainee accesses trainee area
3. if account is pending or inactive, access is restricted accordingly

### 6.3 Create Daily Report
1. trainee opens create report page
2. trainee selects or confirms report date
3. trainee fills report data
4. trainee uploads 1 to 4 screenshots
5. trainee saves report
6. report appears in trainee history and admin views

### 6.4 Edit Daily Report
1. trainee opens report details or report list
2. trainee edits only allowed reports
3. trainee saves changes
4. updated report appears in all relevant views

### 6.5 Admin Monitoring
1. admin opens admin dashboard
2. admin sees summary stats for the day
3. admin reviews submitted and not submitted trainees
4. admin checks blocker reports
5. admin opens full report details when needed

### 6.6 Admin Trainee Management
1. admin opens trainee management page
2. admin can add trainee
3. admin can edit trainee info
4. admin can activate or deactivate trainee

---

## 7. Functional Requirements

### 7.1 Authentication
- system must support email and password login
- system must support trainee self-registration
- system must support role-based access:
  - trainee area
  - admin area

### 7.2 Trainee Reporting
Each report must include:
- report date
- start time
- end time
- total hours
- work done
- has blockers (true / false)
- blocker details (required only if has blockers is true)
- next steps
- notes (optional)
- screenshots (minimum 1, maximum 4)

### 7.3 Trainee Dashboard
The trainee dashboard must show:
- current date
- today’s report status
- action to create or edit today’s report
- recent reports list

### 7.4 My Reports
The trainee reports page must:
- list trainee reports
- support basic search/filter
- allow viewing report details
- allow editing only when eligible

### 7.5 Admin Dashboard
The admin dashboard must show:
- total trainees
- reports submitted today
- reports not submitted today
- reports with blockers today
- trainee overview list
- blocker report section for today

### 7.6 Admin Reports
The admin reports page must:
- show all trainee reports
- support filtering by trainee
- support filtering by date/date range
- support filtering by blocker presence
- support filtering by submitted status
- allow viewing report details

### 7.7 Trainee Management
The trainee management page must:
- list trainees
- show current status
- allow adding trainee
- allow editing trainee basic info
- allow activation/deactivation

---

## 8. Business Rules

### 8.1 Report Uniqueness
A trainee cannot create more than one report for the same date.

### 8.2 Editable Reports
A trainee can edit:
- today’s report
- yesterday’s report

### 8.3 Historical Reports
A trainee may create a report for a past date, as long as no report already exists for that same date.

### 8.4 Blocker Logic
- blocker details field must only appear when has blockers is true
- blocker details are not required when has blockers is false

### 8.5 Screenshot Rules
- each report must have at least 1 screenshot
- each report can contain at most 4 screenshots

### 8.6 Admin Count
The system has one admin only in V1.

### 8.7 Account Status
Trainee account statuses:
- PENDING
- ACTIVE
- INACTIVE

Only active trainees should fully access trainee reporting features.

---

## 9. Screens / Pages

### Trainee Area
- Register Page
- Login Page
- Trainee Dashboard
- Create Report Page
- Edit Report Page
- My Reports Page
- Report Details Page

### Admin Area
- Admin Dashboard
- Admin Reports Page
- Admin Report Details Page
- Trainee Management Page

---

## 10. Data Model (High Level)

### User
- id
- fullName
- email
- passwordHash
- role
- status
- createdAt
- updatedAt

### Report
- id
- traineeId
- reportDate
- startTime
- endTime
- totalHours
- workDone
- hasBlockers
- blockerDetails
- nextSteps
- notes
- createdAt
- updatedAt

### ReportImage
- id
- reportId
- filePath
- fileName
- uploadedAt

---

## 11. Success Criteria
PulseDesk V1 is successful if:

- all trainees can submit reports using one unified format
- admin can monitor all trainees from one dashboard
- admin can easily identify missing submissions
- admin can quickly find blocker reports
- trainees can review and manage their own report history
- manager review effort is significantly reduced compared to private chat workflows

---

## 12. Assumptions and Open Questions

### Assumptions
- the first version is web-only
- the first version is internal-only
- one admin is sufficient for V1
- screenshots are stored in a local storage approach initially
- backend is Kotlin + Spring Boot
- frontend is Next.js

### Open Questions
- should pending trainees be allowed to log in with limited access or be blocked completely?
- should admin be able to reset trainee passwords in V1 or later?
- should report details include created/updated timestamps visibly in V1?