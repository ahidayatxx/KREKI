---
title: "SLA & SLO Definition"
description: "Service level agreements and objectives for KREKI services"
category: "governance"
last_updated: 2025-01-07
---

# SLA & SLO Definition

This document defines the Service Level Objectives (SLOs) and Service Level Agreements (SLAs) for all KREKI information systems.

## Overview

### Definitions

- **SLO (Service Level Objective):** Target value for a service level metric
- **SLA (Service Level Agreement):** Formal commitment to SLOs with stakeholders
- **Error Budget:** Allowable amount of downtime/errors before actions are triggered

### Service Tiers

Services are classified into three tiers based on criticality to KREKI's mission:

| Tier | Name | Impact | Example Services |
|------|------|--------|-----------------|
| **Tier 1** | Mission Critical | Life-threatening impact if down | Emergency Core |
| **Tier 2** | Business Critical | Significant operational impact | Auth Service, Volunteer Service |
| **Tier 3** | Operational | Manageable impact | LMS, CMS, Reporting |

---

## Tier 1 - Mission Critical Services

### Services
- **Emergency Core Service** - Panic button, volunteer dispatch

### SLOs

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Availability** | 99.9% | Uptime over rolling 30-day period |
| **Response Time** | < 500ms (P95) | API response time at 95th percentile |
| **RTO** | 15 minutes | Recovery Time Objective |
| **RPO** | 5 minutes | Recovery Point Objective |

### Error Budget

| Period | Allowable Downtime |
|--------|-------------------|
| Per Month | 43.2 minutes |
| Per Quarter | 129.6 minutes |
| Per Year | 8.76 hours |

### Error Budget Policy

| Budget Consumed | Action |
|----------------|--------|
| < 50% | Normal operations |
| 50% - 75% | Freeze new features, focus on stability |
| > 75% | Emergency mode, hotfixes only |

### Monitoring

**Critical Alerts (Pager):**
- Service down
- Error rate > 5%
- Response time > 1s (P95)
- Database connection failures

**Warning Alerts (Email):**
- Response time > 500ms (P95)
| Error rate > 1% |
| CPU > 70% |
| Memory > 80%

---

## Tier 2 - Business Critical Services

### Services
- **Auth Service (KREKI ID)** - Authentication and authorization
- **Volunteer Service** - Volunteer profiles and availability
- **SATUSEHAT Bridge** - External integration

### SLOs

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Availability** | 99.5% | Uptime over rolling 30-day period |
| **Response Time** | < 1s (P95) | API response time at 95th percentile |
| **RTO** | 1 hour | Recovery Time Objective |
| **RPO** | 15 minutes | Recovery Point Objective |

### Error Budget

| Period | Allowable Downtime |
|--------|-------------------|
| Per Month | 3.6 hours |
| Per Quarter | 10.8 hours |
| Per Year | 43.8 hours |

### Error Budget Policy

| Budget Consumed | Action |
|----------------|--------|
| < 50% | Normal operations |
| > 50% | Review deployment practices, slow feature rollout |

### Monitoring

**Critical Alerts (Pager):**
- Service down
- Error rate > 10%
| Authentication failures > 5% |

**Warning Alerts (Email):**
| Response time > 1s (P95) |
| Error rate > 2% |
| CPU > 80% |

---

## Tier 3 - Operational Services

### Services
- **LMS Service** - Learning management system
- **Content Service** - News and static content
- **Notification Service** - Push notifications, email

### SLOs

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Availability** | 99% | Uptime over rolling 30-day period |
| **Response Time** | < 2s (P95) | API response time at 95th percentile |
| **RTO** | 4 hours | Recovery Time Objective |
| **RPO** | 1 hour | Recovery Point Objective |

### Error Budget

| Period | Allowable Downtime |
|--------|-------------------|
| Per Month | 7.2 hours |
| Per Quarter | 21.6 hours |
| Per Year | 87.6 hours |

### Monitoring

**Warning Alerts (Email):**
- Service down
- Error rate > 5%
- Response time > 2s (P95)

---

## Maintenance Windows

### Planned Maintenance

| Tier | Maintenance Window | Notice Required |
|------|-------------------|-----------------|
| Tier 1 | 00:00-02:00 WIB, Sunday | 7 days |
| Tier 2 | 00:00-04:00 WIB, Sunday | 3 days |
| Tier 3 | Any time, with notice | 24 hours |

### Emergency Maintenance

For critical security patches or SEV-1 incidents:

| Tier | Max Notice | Max Duration |
|------|-----------|--------------|
| Tier 1 | Immediate | As needed |
| Tier 2 | 1 hour | 2 hours |
| Tier 3 | 4 hours | 4 hours |

---

## Performance Baselines

### Emergency Core Service

| Operation | Target (P50) | Target (P95) | Target (P99) |
|-----------|-------------|--------------|--------------|
| Panic Button | 100ms | 300ms | 500ms |
| Find Volunteers | 200ms | 500ms | 1s |
| Update Status | 50ms | 100ms | 200ms |

### Auth Service

| Operation | Target (P50) | Target (P95) | Target (P99) |
|-----------|-------------|--------------|--------------|
| Login | 100ms | 300ms | 500ms |
| Token Refresh | 50ms | 100ms | 200ms |
| Get Profile | 50ms | 100ms | 150ms |

### LMS Service

| Operation | Target (P50) | Target (P95) | Target (P99) |
|-----------|-------------|--------------|--------------|
| List Courses | 100ms | 300ms | 500ms |
| Get Course | 150ms | 400ms | 800ms |
| Submit Quiz | 200ms | 500ms | 1s |

---

## Reporting

### Monthly SLA Report

Each month, generate an SLA report including:

1. **Availability** per service
2. **Incident Summary** (number, severity, MTTR)
3. **Performance Metrics** vs targets
4. **Error Budget Status**
5. **Action Items** if budget exceeded

### SLA Breach Process

If an SLO is breached:

1. **Immediate:** Notify Operations Committee
2. **Within 24h:** Initial RCA (Root Cause Analysis)
3. **Within 7 days:** Full RCA and action plan
4. **Within 30 days:** Implement fixes
5. **Quarterly:** Review for trends

---

## Related Documentation

- [IT Governance Framework](./it-governance.md) - Complete governance framework
- [Incident Management](./incident-management.md) - Incident procedures
- [System Architecture](../architecture/system-architecture.md) - Service architecture

---

*Kembali ke [Governance](./index.md)*
