# Configuration Management Plan

**Version 01**  
**Date:** October 6, 2025  
**Location:** 1000 K. L. O. Rd, Kelowna, BC  
**Instructor:** Prof. Mohamad Khajezade  
**Course:** Software Engineering – Volunteer Management System

---

## Table of Contents

1. [Configuration Management System Structure](#configuration-management-system-structure)  
2. [Purpose](#purpose)  
3. [Scope](#scope)  
4. [Configuration Process](#configuration-process)  
5. [Software Versioning and Configuration Process](#software-versioning-and-configuration-process)  
6. [Implementing Organization Documentation Configuration Process](#implementing-organization-documentation-configuration-process)  
7. [Responsibility & Authority](#responsibility--authority)  
8. [Document and Information Types](#document-and-information-types)  
9. [Software Documentation](#software-documentation)  
10. [Software Development Process](#software-development-process)  
11. [Software Configuration Database](#software-configuration-database)  
12. [Project Management Support Information](#project-management-support-information)  
13. [Workload Breakdown Structure](#workload-breakdown-structure)  
14. [Collaboration Applications](#collaboration-applications)  
15. [GitHub Workflows](#git-hub-workflows)  
16. [Configuration Audits and Reviews](#configuration-audits-and-reviews)

---

## Configuration Management System Structure

### Purpose
The purpose of this Configuration Management Plan (CMP) is to establish processes and responsibilities for managing configurations, versions, and documentation of the **Volunteer Management System (VMS)** software project.  
The CMP ensures consistency, quality control, and traceability of all software artifacts developed by the Red Cross project team.

---

## Scope
This CMP applies to all configuration items (CIs) in the Volunteer Management System, including:

- Source code (frontend and backend)  
- API definitions and schema files  
- Database schema and migration scripts  
- Project documentation (architecture, design, requirements, and user manuals)  
- Testing scripts and datasets  
- Deployment configurations and Docker files  
- Continuous integration (CI/CD) workflows in GitHub  

> All team members must adhere to the version control and configuration standards defined herein.

---

## Configuration Process
The configuration process includes:

1. **Identification:** Each software component and documentation item is tagged as a Configuration Item (CI) and tracked in GitHub.  
2. **Version Control:** Changes are committed to GitHub using descriptive commit messages and branch naming conventions.  
3. **Change Control:** Pull requests (PRs) must be reviewed and approved by at least one peer or the Lead Developer before merging.  
4. **Status Accounting:** GitHub issue tracking and milestones record progress and version status.  
5. **Audit and Review:** Configuration audits are conducted before major releases to verify completeness, traceability, and compliance with standards.

---

## Software Versioning and Configuration Process

Versioning follows **Semantic Versioning (SemVer)**:

`MAJOR.MINOR.PATCH`

- **MAJOR:** Incompatible API or architecture changes  
- **MINOR:** Backward-compatible feature additions  
- **PATCH:** Backward-compatible bug fixes or optimizations  

**Example Branch Structure:**
- `main` – Stable production branch  
- `dev` – Active development branch  
- `feature/<feature-name>` – For new features  
- `bugfix/<issue-id>` – For bug corrections  
- `release/<version>` – Pre-release staging for QA and deployment  

**Merging into main requires:**
- All unit and integration tests passing  
- Peer code review approval  
- Updated documentation if applicable  

---

## Implementing Organization Documentation Configuration Process

All documentation (architecture diagrams, requirements, API specs, etc.) is stored in the `/docs` directory of the repository.

Each major revision is version-controlled and tagged.

- Documentation must be updated alongside code changes.  
- Use consistent naming and date-based versioning (e.g., `architecture_v1.1_2025-10-10.pdf`).  
- Architectural and design updates must be approved by the **Lead Design & Architecture** before merging.

---

## Responsibility & Authority

The roles and responsibilities within the Red Cross project are defined by the cooperative agreement between members based on their area of specialty.

### Product Owner – **Cade Dempsey**
- Ensures the software meets business goals and end-user needs.  
- Defines and prioritizes the product backlog.  
- Approves feature scope and acceptance criteria.  
- Communicates with stakeholders (professor, mock client).  
- Ensures development aligns with project vision.

### Associate Product Owner – **Liam Heckrodt**
- Supports the Product Owner in requirement clarification and quality review.  
- Maintains documentation and feature traceability.  
- Ensures backlog items reflect current stakeholder needs.  
- Reviews system demonstrations and validates deliverables.  
- Assists in defining user stories and acceptance tests.

### Scrum Master – **Kristina Cormier**
- Ensures Agile/Scrum principles are followed.  
- Facilitates sprint planning, retrospectives, and daily stand-ups.  
- Removes blockers and ensures timely communication.  
- Tracks sprint progress via GitHub Projects or Jira.  
- Monitors adherence to the CMP and process discipline.

### Associate Scrum Master – **Hayden Nikkel**
- Assists Scrum Master in team coordination and QA oversight.  
- Supports test planning and integration validation.  
- Oversees sprint documentation and retrospective summaries.  
- Ensures consistent communication between development and design teams.

### Lead Developer – **Alex Anthony**
- Responsible for implementation and technical execution.  
- Leads backend and frontend integration.  
- Oversees code quality, merges, and deployment scripts.  
- Conducts code reviews and performance optimization.  
- Coordinates with Lead Design/Architecture to ensure technical consistency.  
- Maintains CI/CD pipelines and release tagging.

---

## Document and Information Types

### Software Documentation
Includes:
- Requirements Specification (Volunteer Management System PDF)  
- Software Architecture and Design Document  
- API Reference and Data Model Documentation  
- UML Diagrams (Class, Sequence, Component)  
- User Manuals  

> All documents are stored in GitHub `/docs` and versioned.

---

## Software Development Process

Development follows an **Agile Scrum** framework with 2-week sprints.  
Each sprint includes planning, implementation, code review, testing, and retrospective stages.

---

## Software Configuration Database

**GitHub** acts as the **Configuration Management Database (CMDB)**, tracking:

- Commit history  
- Pull requests and merges  
- Branch status  
- Milestones and issues  

---

## Project Management Support Information

- **GitHub Issues & Projects:** Task tracking and Kanban boards  
- **Slack/Discord:** Team communication  
- **Notion/Google Docs:** Requirements and meeting notes repository  
- **CI/CD (GitHub Actions):** Continuous integration and deployment monitoring  

---

## Workload Breakdown Structure

Each sprint workload is divided into:
- **Frontend:** UI design, React component creation, API integration  
- **Backend:** API endpoints, database schema, logic  
- **Testing:** Unit, integration, and system testing  
- **Documentation:** Technical and user manual updates  

---

## Collaboration Applications

### Overview
Collaboration tools are used to coordinate communication, maintain visibility, and track changes in real time.

### GitHub
- Source code version control  
- Branch management and merging via pull requests  
- Automated build and test pipelines (CI/CD)  
- Wiki documentation  
- Issue tracking and milestone management  

---

## Git Hub Workflows

Automated workflows handle:
- Linting, building, and testing for each pull request  
- Automatic deployment to staging environments  
- Tagging releases and generating changelogs  
- Integration testing with external services (Twilio, SendGrid, Google/Outlook APIs)

---

## Configuration Audits and Reviews

Configuration audits will occur:
- At the end of each sprint (**minor review**)  
- Before major version releases (**full audit**)  

Audits ensure:
- Documentation is current  
- All source code is versioned and buildable  
- Environment configurations are consistent across development, testing, and production  
