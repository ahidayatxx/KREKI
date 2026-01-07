---
title: "Microservices Design"
description: "Detailed specifications for each microservice in KREKI system"
category: "architecture"
last_updated: 2025-01-07
---

# Microservices Design

This document provides detailed specifications for each microservice in the KREKI ecosystem.

## Service Overview

| Service | Tier | Database | Tech Stack | Scale |
|---------|------|----------|------------|-------|
| **Auth Service** | Tier 2 | PostgreSQL | Node.js / Go | 2+ instances |
| **Emergency Core** | Tier 1 | PostgreSQL + PostGIS | Node.js / Go | 2+ instances + HA |
| **LMS Service** | Tier 3 | PostgreSQL | PHP / Python | 1+ instance |
| **Volunteer Service** | Tier 2 | PostgreSQL + PostGIS | Node.js / Go | 2+ instances |
| **Notification Service** | Tier 3 | - | Node.js / Go | 1+ instance |
| **Content Service** | Tier 3 | PostgreSQL | Node.js / Go | 1+ instance |
| **SATUSEHAT Bridge** | Tier 2 | - | Node.js / Go | 2+ instances |

## Auth Service (KREKI ID)

### Purpose
Single Sign-On (SSO) and identity management for all KREKI digital platforms.

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | User registration |
| POST | `/api/auth/login` | User login with JWT |
| POST | `/api/auth/logout` | User logout |
| GET | `/api/auth/me` | Get current user profile |
| PUT | `/api/auth/me` | Update user profile |
| POST | `/api/auth/refresh` | Refresh JWT token |

### Data Model

```sql
-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL, -- 'public', 'volunteer', 'admin'
    full_name VARCHAR(255),
    verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Roles & Permissions
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT
);

CREATE TABLE permissions (
    id SERIAL PRIMARY KEY,
    role_id INTEGER REFERENCES roles(id),
    resource VARCHAR(100) NOT NULL,
    action VARCHAR(50) NOT NULL, -- 'create', 'read', 'update', 'delete'
    granted BOOLEAN DEFAULT true
);
```

### Requirements
- JWT token expiration: 24 hours (access), 30 days (refresh)
- Password requirements: min 8 chars, 1 uppercase, 1 number
- Rate limiting: 5 login attempts per 15 minutes per IP

---

## Emergency Core Service

### Purpose
Handle panic button requests, find nearest volunteers, and track response times.

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/emergency/panic` | Trigger panic button |
| GET | `/api/emergency/active` | Get active emergencies |
| PUT | `/api/emergency/:id/respond` | Volunteer responds to emergency |
| PUT | `/api/emergency/:id/complete` | Mark emergency as complete |
| GET | `/api/emergency/nearby` | Find nearby volunteers (GIS query) |

### Geo-Location Algorithm

```sql
-- Find volunteers within radius
SELECT
    v.id,
    v.full_name,
    v.skills,
    v.status,
    ST_Distance(
        v.location::geography,
        ST_MakePoint($1, $2)::geography
    ) AS distance_meters
FROM volunteers v
WHERE v.status = 'available'
  AND ST_DWithin(
    v.location::geography,
    ST_MakePoint($1, $2)::geography,
    $3  -- radius in meters
  )
ORDER BY distance_meters ASC
LIMIT 20;
```

### Data Model

```sql
-- Emergency requests
CREATE TABLE emergency_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    requester_id UUID REFERENCES users(id),
    location GEOGRAPHY(POINT, 4326) NOT NULL,
    severity VARCHAR(20) DEFAULT 'critical', -- 'critical', 'urgent', 'normal'
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'assigned', 'responding', 'completed'
    created_at TIMESTAMP DEFAULT NOW(),
    assigned_at TIMESTAMP,
    completed_at TIMESTAMP
);

-- Response tracking
CREATE TABLE emergency_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    emergency_id UUID REFERENCES emergency_requests(id),
    volunteer_id UUID REFERENCES users(id),
    accepted_at TIMESTAMP DEFAULT NOW(),
    arrived_at TIMESTAMP,
    completed_at TIMESTAMP
);
```

### SLA Requirements
- Response time P95: < 500ms for panic button API
- Volunteer matching: < 5 seconds
- Notification delivery: < 10 seconds

---

## LMS Service

### Purpose
Manage training modules, assessments, and certifications.

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/lms/courses` | List available courses |
| GET | `/api/lms/courses/:id` | Get course details |
| POST | `/api/lms/enroll` | Enroll in course |
| GET | `/api/lms/progress` | Get user progress |
| POST | `/api/lms/quiz/:id/submit` | Submit quiz |
| GET | `/api/lms/certificate/:id` | Get certificate |

### Certificate Generation

```javascript
// Certificate data structure
{
  certificate_id: "CERT-2025-001234",
  user_name: "Dr. John Doe",
  course_name: "Bantuan Hidup Dasar (BHD)",
  completion_date: "2025-01-07",
  instructor_name: "Dr. Jane Smith",
  valid_until: "2027-01-07",
  qr_code: "https://lms.kreki.id/verify/CERT-2025-001234"
}
```

---

## Notification Service

### Purpose
Send notifications via multiple channels (FCM, WhatsApp, Email).

### Channels

| Channel | Use Case | Priority |
|---------|----------|----------|
| **FCM Push** | Emergency alerts, volunteer dispatch | Critical |
| **WhatsApp** | Emergency coordination, broadcast | High |
| **Email** | Certificates, reports, summaries | Normal |

### Queue System

Use message queue for reliable delivery:

```
Emergency Notification → Critical Queue → FCM + WhatsApp
Course Update → Normal Queue → Email
```

---

## SATUSEHAT Bridge

### Purpose
Wrapper for Kemenkes SATUSEHAT API to prevent external changes from breaking internal systems.

### FHIR Resources

| Resource | Description |
|----------|-------------|
| `Patient` | Patient/victim demographic data |
| `Practitioner` | Volunteer healthcare worker data |
| `Observation` | Emergency response observations |
| `Location` | Emergency location data |

### API Versioning

```
/api/satusehat/v1/fhir/Patient/:id
/api/satusehat/v2/fhir/Patient/:id
```

Maintain backward compatibility by versioning the bridge API.

---

## Related Documentation

- [System Architecture](./system-architecture.md) - High-level architecture
- [SLA & SLO Definition](../governance/sla-slo.md) - Service tier requirements
- [Incident Management](../governance/incident-management.md) - Emergency procedures

---

*Kembali ke [Architecture](./index.md)*
