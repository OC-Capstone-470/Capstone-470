# Software Architecture and Design  
**Version:** 0.1  
**Course:** COSC 470 – Software Engineering Capstone  
**Instructor:** Prof. Mohamad Khajezade  
**Project:** Volunteer Management System – Red Cross  

---

## Overview

This document outlines the core architectural components, chosen technologies, and their respective roles within the **MVC (Model–View–Controller)** framework for the Volunteer Management System (VMS).  

Each service in the system follows a **microservices-based design**, leveraging **FastAPI**, **PostgreSQL**, and **Redis** for asynchronous task handling and caching.  

---

## System Components and Technologies

| **Component** | **Chosen Technologies** | **MVC Role / Description** |
|----------------|--------------------------|-----------------------------|
| **Frontend** | React with Next.js, Tailwind CSS, React Query | **View** – Provides user interface and handles client-side logic. |
| **User Management Service** | FastAPI, PostgreSQL, `python-jose (OAuth2)`, Redis | **Controller:** FastAPI <br> **Model:** PostgreSQL, Redis <br> Handles authentication, user profiles, and access tokens. |
| **Scheduling and Matching Service** | FastAPI, PostgreSQL, Pandas/NumPy, Celery with Redis | **Controller:** FastAPI <br> **Model:** PostgreSQL, Redis <br> Automates shift scheduling and volunteer–shift matching using data analysis tools. |
| **Notification Service** | FastAPI, PostgreSQL, Amazon SES/SNS, Celery with Redis | **Controller:** FastAPI <br> **Model:** PostgreSQL, Redis <br> Manages email/SMS notifications for shift updates and alerts. |
| **Messaging and Feedback Service** | FastAPI, PostgreSQL, FastAPI WebSockets with Redis Pub/Sub, Celery with Redis | **Controller:** FastAPI + WebSockets <br> **Model:** PostgreSQL, Redis <br> Enables real-time communication and feedback between volunteers and staff. |
| **Reporting and Analytics Service** | FastAPI, PostgreSQL, Pandas/NumPy, Celery with Redis | **Controller:** FastAPI <br> **Model:** PostgreSQL, Redis <br> Provides statistical analysis and system usage reporting. |
| **Integration Service** | FastAPI, PostgreSQL, Google Auth, Outlook, Apple PKCE, LinkedIn API, Pandas, Celery with Redis | **Controller:** FastAPI <br> **Model:** PostgreSQL, Redis <br> Handles third-party integrations for authentication and data sync. |
| **Shared Redis Cache** | Redis | **Model Layer** – Shared caching for improved performance across services. |
| **API Gateway** | Nginx | **Routing Layer** – Manages incoming HTTP requests and routes them to respective microservices. |

---

## Architectural Notes

- The architecture follows **Microservices + MVC Hybrid** principles for modularity and scalability.  
- **Redis** is shared across multiple services for caching, Pub/Sub messaging, and Celery queue management.  
- **Nginx** acts as an API Gateway for request routing, load balancing, and service discovery.  
- **PostgreSQL** serves as the centralized relational database for persistent data.  
- **Celery** handles background task queues (e.g., notifications, analytics computation).  
- **Amazon SES/SNS** integrates for cloud-based notifications.  