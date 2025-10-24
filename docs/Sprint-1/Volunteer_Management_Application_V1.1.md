# Volunteer Management Application  
**Course:** COSC 470 – Software Engineering Capstone  
**Instructor:** Prof. Mohamad Khajezade  
**Project:** Volunteer Management System – Red Cross  
**Version:** 1.0  

---

## 1. Executive Summary

This project aims to develop a **Volunteer Management Application** that streamlines **recruitment, scheduling, communication, reporting, and recognition**.  
The system reduces administrative overhead while improving volunteer engagement and retention.

The platform supports **three levels of access**:  
- **Admins** (Head Office / Managers)  
- **Coordinators** (Regional Leads / Supervisors)  
- **Volunteers** (Individual Members)

Each role includes tailored permissions and responsibilities.  
The application will be **mobile-first**, **secure**, and **integrated** with external systems such as calendars (Google/Outlook/Apple), messaging channels (SMS, email, push), and reporting tools.

---

## 2. User Access Levels

### Admin (Head Office / Managers)

**Responsibilities:**
- Strategic oversight  
- Compliance tracking  
- Reporting and communication management  

**Capabilities:**
- Full CRUD access to users, programs, and shifts  
- Configure automated reminders and notifications  
- Generate dashboards and compliance reports  
- Monitor training and certification validity  
- Customize communication templates (SMS, email)  

---

### Coordinator / Supervisor (Regional Leads)

**Responsibilities:**
- Regional scheduling and volunteer supervision  
- Communication and feedback  

**Capabilities:**
- Post and edit shifts or events  
- Approve/reject volunteer sign-ups  
- Send targeted notifications to volunteers  
- Track attendance and record performance notes  
- Mark notes as **Private** (internal use only) or **Shared** (visible to volunteers)  
- View dashboards for volunteer availability and coverage gaps  

---

### Volunteer (Individual Members)

**Responsibilities:**
- Participate in shifts  
- Keep availability updated  
- Respond to reminders and feedback  

**Capabilities:**
- Manage personal profile (skills, availability, certifications)  
- Sign up for available shifts or join waitlists  
- Receive automated shift reminders (48h & 2h before start)  
- Sync shifts with personal calendar  
- Confirm or cancel attendance from reminders  
- View supervisor feedback, recognition notes, and earned badges  

---

## 3. Cross-Level Features

- **Automated Shift Reminders:** Configurable by Admins; default notifications at 48h and 2h.  
- **Availability Management:** Volunteers declare recurring or one-time availability.  
- **Shift Notifications:** Targeted alerts for shifts that match volunteer availability.  
- **Waitlist System:** Automatically promotes volunteers when spots open.  
- **Supervisor Notes:** Feedback linked to specific shifts; visibility can be private or shared.  
- **Secure Messaging Hub:** Enables real-time communication between Coordinators and Volunteers.  
- **Recognition System:** Badges, certificates, and milestones to reward participation.  
- **Data Security:** Role-based permissions, 2FA, encryption, and compliance with **GDPR/PIPEDA**.  

---

## 4. Example Workflow

1. Volunteer sets weekly availability in their profile.  
2. Coordinator posts a new shift (time, role, location).  
3. System matches volunteers based on availability and sends targeted notifications.  
4. Volunteer accepts the shift in one click (or joins waitlist if full).  
5. System schedules automated reminders (48h and 2h before shift).  
6. Volunteer confirms attendance through reminders.  
7. Coordinator records attendance and adds performance notes.  
8. Volunteer views shared feedback and recognition in the app.  
9. Admin generates reports on volunteer activity (regional or global).  

---

## 5. Technical Requirements

| **Layer** | **Technology Stack** |
|------------|-----------------------|
| **Frontend** | React / Next.js (mobile-first responsive web app) |
| **Backend** | Microservices architecture with RBAC (Role-Based Access Control) |
| **Database** | PostgreSQL or MySQL (relational) + Redis (caching layer) |
| **Notifications** | SMS (Twilio), Email (SendGrid), Push (Firebase) |
| **Integrations** | Calendar APIs (Google/Outlook/Apple), LinkedIn badges, CSV/Excel exports |
| **Security** | OAuth2 authentication, 2FA, audit logging, encrypted storage |

---

## 6. Reporting & Analytics

### Admin Dashboards
- Volunteer hours per region or project  
- Volunteer retention rates  
- Demographic and geographic distribution  
- Training and compliance tracking  

### Coordinator Dashboards
- Local volunteer availability vs. shifts filled  
- Attendance and participation logs  
- Shift coverage gaps  

---

🔗 [Google Docs Source](https://docs.google.com/document/d/15Z9d-zTQDlV7cS3hbxhKjK6Ij_HaRaduY9Pob1hNnh0/edit?usp=sharing)