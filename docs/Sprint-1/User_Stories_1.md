# User Stories  
**Course:** COSC 470 – Software Engineering Capstone  
**Instructor:** Prof. Mohamad Khajezade  
**Project:** Volunteer Management System – Red Cross  
**Version:** 1.0  

---

## User Story 1: Sign In to Volunteer Portal (OAuth2 + MFA)

**As a volunteer,**  
I want to securely sign in to the volunteer portal using **OAuth2** and **Multi-Factor Authentication (MFA)**,  
so that I can safely access my account and manage my volunteering activities.

### Tasks
1. Create a secure login interface with OAuth2 options (Google, Microsoft).  
2. Support email/password login for non-OAuth users.  
3. Integrate OAuth2 token exchange.  
4. Prompt for MFA after authentication (if enabled).  
5. Implement TOTP (Google Authenticator, Authy).  
6. Allow users to manage MFA in settings.  
7. Redirect to dashboard after login.  
8. Provide logout and session timeout.  

### Acceptance Criteria
- ✅ OAuth2 and email login both supported.  
- ✅ MFA required if enabled.  
- ✅ MFA setup and reset available.  
- ✅ Secure session handling.  
- ✅ Redirect to dashboard on success.  
- ✅ Clear feedback on failed login/MFA attempts.  

🔗 [Google Docs Source](https://docs.google.com/document/d/1WCp9-eExC5rPp-qDTA9qlYZRLwxoep-zlE9rsc6KMRE/edit?usp=sharing)

---

## User Story 2: Manage Personal Profile

**As a volunteer,**  
I want to manage my personal profile, including **skills**, **availability**, and **certifications**,  
so that my information stays accurate for matching with shifts.

### Tasks
1. View/edit profile information.  
2. Upload certification documents.  
3. Set and update availability.  
4. Validate certification expiry.  
5. Save and confirm profile updates.  

### Acceptance Criteria
- ✅ Profile editable.  
- ✅ Certifications uploadable and validated.  
- ✅ Availability updatable and used in shift matching.  

---

## User Story 3: Sign Up for Shifts or Join Waitlist

**As a volunteer,**  
I want to sign up for available shifts or join a waitlist,  
so that I can participate in volunteer opportunities.

### Tasks
1. Display available shifts filtered by skills/availability.  
2. Sign up for open shifts.  
3. Join the waitlist if the shift is full.  
4. Confirm signup or waitlist status.  
5. Auto-update shift capacity in real time.  

### Acceptance Criteria
- ✅ Volunteers can sign up for open shifts.  
- ✅ Waitlists function with notifications when spots open.  
- ✅ Shift capacity is accurate and updates in real time.  

---

## User Story 4: Receive Automated Shift Reminders

**As a volunteer,**  
I want to receive automated shift reminders,  
so that I don’t forget or miss my upcoming shifts.

### Tasks
1. Send email/in-app reminders at 48h and 2h before shift.  
2. Include shift details.  
3. Add confirm/cancel link in message.  

### Acceptance Criteria
- ✅ Reminders sent at correct intervals.  
- ✅ Messages contain accurate shift data.  
- ✅ Actionable links for confirming/canceling attendance.  

---

## User Story 5: Sync Shifts with Personal Calendar

**As a volunteer,**  
I want to sync my shifts with my personal calendar,  
so that I can manage my schedule better.

### Tasks
1. Generate calendar links (.ics or direct integration).  
2. Include shift time, location, and role.  
3. Auto-update calendar if shifts change.  

### Acceptance Criteria
- ✅ Calendar sync works with Google/Outlook.  
- ✅ Shift updates reflected in the calendar.  
- ✅ Events contain all necessary details.  

---

## User Story 6: Confirm or Cancel Attendance from Reminders

**As a volunteer,**  
I want to confirm or cancel my attendance directly from reminders,  
so that I can easily update my status if my plans change.

### Tasks
1. Add confirm/cancel links to reminder messages.  
2. Update volunteer status in backend.  
3. Notify supervisor if cancellation occurs less than 24h before shift.  
4. Reflect updated status on dashboard.  

### Acceptance Criteria
- ✅ Confirm/cancel functionality works from reminders.  
- ✅ Supervisor alerted if cancellation is late.  
- ✅ Dashboard updates immediately.  

---

## User Story 7: View Supervisor Feedback and Recognition

**As a volunteer,**  
I want to view feedback, recognition, and badges from my supervisors,  
so that I can stay motivated and track my performance.

### Tasks
1. Display feedback in the dashboard.  
2. Show earned badges with timestamp.  
3. Include supervisor name and date.  
4. Notify volunteers when new feedback is added.  

### Acceptance Criteria
- ✅ Feedback and badges visible in dashboard.  
- ✅ New entries notify user.  
- ✅ Entries are timestamped and read-only.  