---
title: "Arsitektur Sistem"
description: "Desain arsitektur microservices dan teknologi stack sistem KREKI"
category: "architecture"
last_updated: 2025-01-07
---

# Arsitektur Sistem Informasi

Sistem KREKI menggunakan arsitektur **Microservices** yang dirancang untuk modularitas, scalability, dan resilience. Setiap layanan berjalan dalam container (Docker) dan berkomunikasi melalui RESTful API.

## Dokumen

| Dokumen | Deskripsi |
|---------|-----------|
| [System Architecture](./system-architecture.md) | Desain teknis lengkap dengan diagram microservices |
| [Microservices Design](./microservices-design.md) | Detail setiap microservice dan teknologi stack |

## Overview

### Microservices

```
┌─────────────────────────────────────────────────────────┐
│                    Infrastructure Layer                  │
│              (Docker Swarm / Kubernetes)                │
├─────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────────────────────────┐ │
│  │ API Gateway  │──│         Core Services            │ │
│  │   (Kong)     │  │  ┌──────┐ ┌─────────┐ ┌────────┐ │ │
│  └──────────────┘  │  │ Auth │ │Emergency│ │Volunteer│ │ │
│                    │  └──────┘ └─────────┘ └────────┘ │ │
│                    ├──────────────────────────────────┤ │
│                    │      Support Services             │ │
│                    │  ┌─────┐ ┌─────────┐ ┌─────────┐ │ │
│                    │  │ LMS │ │Notif.   │ │  CMS    │ │ │
│                    │  └─────┘ └─────────┘ └─────────┘ │ │
│                    ├──────────────────────────────────┤ │
│                    │   External Integrations          │ │
│                    │  ┌─────────────────────────────┐ │ │
│                    │  │   SATUSEHAT Bridge          │ │ │
│                    │  └─────────────────────────────┘ │ │
│                    └──────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### Core Services

| Service | Deskripsi | Tech Stack | Database |
|---------|-----------|------------|----------|
| **Auth Service** | KREKI ID, SSO, role management | Node.js / Go | PostgreSQL |
| **Emergency Core** | Panic button, geo-dispatching | Node.js / Go | PostgreSQL + PostGIS |
| **LMS Service** | Training modules, certificates | PHP / Python | PostgreSQL |
| **Integration Bridge** | SATUSEHAT wrapper | Node.js / Go | - |

### Design Principles

1. **Database per Service** - Tidak ada query lintas database
2. **Stateless** - Tidak ada state user di memory
3. **API First** - OpenAPI spec sebelum coding
4. **Containerized** - Semua aplikasi dalam Docker

### Tech Stack

| Komponen | Teknologi |
|----------|-----------|
| API Gateway | Kong / NGINX |
| Database | PostgreSQL + PostGIS |
| Caching | Redis |
| Message Broker | RabbitMQ / Kafka |
| Container | Docker |

## Quick Links

- [Governance Documentation](../governance/)
- [Contributing Guide](../contributing/)
- [Engineering Handbook](../../engineering/handbook.md)

---

*Lihat [System Architecture](./system-architecture.md) untuk detail lengkap.*
