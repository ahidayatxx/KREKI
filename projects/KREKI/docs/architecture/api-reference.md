---
title: "API Reference"
description: "Unified API documentation for KREKI ecosystem services"
category: "architecture"
last_updated: 2025-01-07
---

# API Reference

This document serves as the unified API reference for the **Komunitas Relawan Emergensi Kesehatan Indonesia (KREKI)** digital ecosystem.

## Overview

### Philosophy & Sustainability

*"Aplikasi ini tidak boleh berhenti dalam satu pekerjaan hanya punyanya satu developer saja. Struktur aplikasinya harus dibakukan sehingga bisa berkelanjutan."*

As emphasized in our architectural planning, this API is designed to be **developer-agnostic**. Whether you are a vendor, an intern, or a volunteer, strictly adhering to these contracts ensures that the system remains maintainable long-term.

### Ecosystem Overview

The system is built on a **Microservices Architecture**. Clients (Mobile App, Web Dashboard) interact with these services via an API Gateway.

| Service | Base Path | Description |
|:--------|:----------|:-----------|
| **Auth Service** | /api/auth | Identity, SSO, and Role Management |
| **Emergency Core** | /api/emergency | Panic button, Geo-dispatching, Volunteer matching |
| **LMS Service** | /api/lms | Training modules, Quizzes, and Certification |
| **SATUSEHAT Bridge** | /api/satusehat | Integration with Kemenkes SATUSEHAT |

---

## Global Standards

### Authentication

All protected endpoints require a valid **JWT (JSON Web Token)** in the Authorization header.

- **Header Format:** `Authorization: Bearer <your_token>`
- **Token Expiry:**
  - Access Token: 24 hours
  - Refresh Token: 30 days

### Response Format

All API responses must follow this standard JSON envelope to ensure consistent parsing by client applications.

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "12345",
    "attribute": "value"
  },
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 50
  }
}
```

**Error Response (4xx/5xx):**
```json
{
  "success": false,
  "message": "Invalid credentials",
  "error": {
    "code": "AUTH_INVALID_CREDENTIALS",
    "details": "Password does not match records."
  }
}
```

### Versioning

To maintain backward compatibility, all APIs must be versioned in the URL path.

- **Pattern:** `/api/<service>/v<major_version>/<resource>`
- **Example:** `/api/satusehat/v1/fhir/Patient`

---

## Auth Service API

**Base URL:** `https://api.kreki.id/api/auth`

### Register User

Create a new user account (Public or Volunteer).

- **Endpoint:** `POST /register`
- **Body:**
```json
{
  "email": "volunteer@example.com",
  "phone": "+6281234567890",
  "password": "StrongPassword123!",
  "full_name": "John Doe",
  "role": "volunteer"
}
```
- **Role Options:** `public`, `volunteer`

### Login

Authenticate user and retrieve tokens.

- **Endpoint:** `POST /login`
- **Rate Limit:** 5 attempts per 15 minutes
- **Body:**
```json
{
  "email": "volunteer@example.com",
  "password": "StrongPassword123!"
}
```
- **Response:**
```json
{
  "success": true,
  "data": {
    "accessToken": "ey... (JWT)",
    "refreshToken": "ey... (JWT)",
    "user": {
      "id": "uuid-1234",
      "role": "volunteer"
    }
  }
}
```

### Get Current Profile

Retrieve the currently logged-in user's profile.

- **Endpoint:** `GET /me`
- **Headers:** `Authorization: Bearer <token>`

---

## Emergency Core Service API

**Base URL:** `https://api.kreki.id/api/emergency`
**SLA Target:** < 500ms response time (P95)

### Trigger Panic Button

Initiate an emergency request. This triggers the geospatial search algorithm.

- **Endpoint:** `POST /panic`
- **Body:**
```json
{
  "latitude": -6.2088,
  "longitude": 106.8456,
  "severity": "critical",
  "description": "Unconscious male, approx 50yo"
}
```
- **Severity Options:** `critical`, `urgent`

### Find Nearby Volunteers

**Internal/Admin Use.** Geospatial query to find volunteers within a specific radius.

- **Endpoint:** `GET /nearby`
- **Query Params:**
  - `lat`: Latitude
  - `lng`: Longitude
  - `radius`: Radius in meters (default: 2000)
- **Logic:** Uses PostGIS ST_DWithin to find volunteers with `status='available'`

### Respond to Emergency

Volunteer accepts an emergency assignment.

- **Endpoint:** `PUT /:id/respond`
- **Body:**
```json
{
  "action": "accept",
  "eta_minutes": 10
}
```
- **Action Options:** `accept`, `reject`

---

## LMS (Learning Management System) API

**Base URL:** `https://api.kreki.id/api/lms`

### List Courses

Get a list of available training modules (e.g., BHD, Disaster Management).

- **Endpoint:** `GET /courses`
- **Response:**
```json
{
  "data": [
    {
      "id": "course-001",
      "title": "Bantuan Hidup Dasar (BHD)",
      "duration_hours": 4,
      "level": "beginner"
    }
  ]
}
```

### Submit Quiz

Submit answers for a course assessment.

- **Endpoint:** `POST /quiz/:id/submit`
- **Body:**
```json
{
  "answers": [
    { "question_id": 1, "selected_option": "A" },
    { "question_id": 2, "selected_option": "C" }
  ]
}
```

### Get Certificate

Retrieve digital certificate data for a completed course.

- **Endpoint:** `GET /certificate/:id`
- **Response:**
```json
{
  "certificate_id": "CERT-2025-001234",
  "user_name": "Dr. John Doe",
  "course_name": "Bantuan Hidup Dasar (BHD)",
  "valid_until": "2027-01-07",
  "qr_code_url": "https://lms.kreki.id/verify/CERT-2025-001234"
}
```

---

## Data Models & Schemas

For detailed database schemas and service-specific data models, see [Microservices Design](./microservices-design.md).

### User Object

| Field | Type | Description |
|:-------|:------|:------------|
| id | UUID | Primary Key |
| email | Varchar | Unique, Indexed |
| role | Enum | `public`, `volunteer`, `admin` |
| verified | Boolean | KYC Status |

### Emergency Request Object

| Field | Type | Description |
|:-------|:------|:------------|
| id | UUID | Primary Key |
| location | Geometry | PostGIS Point (4326) |
| status | Enum | `pending`, `assigned`, `responding`, `completed` |
| created_at | Timestamp | UTC Time |

---

## Best Practices & Governance

### Security

- **No Sensitive Data in URLs:** Never pass tokens or PII (Personally Identifiable Information) in URL parameters. Use Headers or Body
- **Input Validation:** All inputs must be validated on the backend. Do not trust frontend validation
- **SQL Injection Prevention:** Use parameterized queries or ORMs (Sequelize/TypeORM/GORM)

### Performance (N+1 Problem)

- When fetching lists (e.g., `GET /courses`), ensure the backend does not execute a separate SQL query for every item in the list. Use JOIN or Eager Loading.

### Idempotency

- **POST** requests should create resources
- **PUT** requests should update resources and be idempotent (repeating the request yields the same result)
- **Retry Logic:** Clients should implement exponential backoff for 5xx errors, but **not** for 4xx errors

### Documentation Maintenance

- Every new endpoint **MUST** include Swagger/OpenAPI annotations in the code before merging (as per [Contribution Guide](../contributing/contribution-guide.md))
- **Handover Standard:** No feature is considered "Done" until its API documentation is updated

---

## Related Documentation

- [Microservices Design](./microservices-design.md) - Service architecture and data models
- [System Architecture](./system-architecture.md) - High-level system design
- [Contribution Guide](../contributing/contribution-guide.md) - Development guidelines

---

*Kembali ke [Architecture](./index.md)*
