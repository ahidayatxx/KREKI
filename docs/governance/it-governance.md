---
title: "IT Governance Framework"
description: "Complete IT governance framework for KREKI information systems"
category: "governance"
last_updated: 2025-01-07
---

# IT Governance Framework

Based on analysis of KREKI documentation, this framework addresses the governance gaps in the current system while building on existing strengths.

## Context

### Existing Strengths
- Clearly defined microservices architecture
- Good technical documentation (Architecture Blueprint, Engineering Handbook)
- Structured development SOP and contribution guide
- Open collaboration model (vendors, interns, volunteers)

### Governance Gaps to Address
1. No formal governance structure (RACI, governance roles)
2. No defined SLA/SLO
3. No incident management procedures
4. No disaster recovery strategy
5. No comprehensive monitoring framework
6. No data privacy policies
7. No performance metrics/KPIs
8. No formal change management process

---

## 1. IT Governance Structure

### 1.1 Technical Board

**Purpose:** Strategic decision-making for architecture and technology.

**Composition:**
- Chair: CTO/Lead Architect KREKI
- Members: 1-2 tech partner representatives, 1 academic representative

**Responsibilities:**
- Approve system architecture and major changes
- Establish technology and security standards
- Review system performance quarterly

### 1.2 Operations Committee

**Purpose:** Daily operational coordination and incident handling.

**Composition:**
- DevOps Lead, Service Owner per service, On-call Engineer

**Responsibilities:**
- Monitor SLA and system performance
- Coordinate incident handling
- Schedule maintenance

### 1.3 RACI Matrix

| Activity | Technical Board | Operations Committee | Service Owner | Developer |
|----------|----------------|---------------------|---------------|-----------|
| New Architecture | A | C | R | I |
| Critical Changes | A | R | C | I |
| Routine Maintenance | I | A | R | C |
| Incident Response | I | R | A | C |

**Legend:** A = Accountable, R = Responsible, C = Consulted, I = Informed

---

## 2. Service Level Objectives (SLOs) & SLAs

### 2.1 Service Classification by Criticality

#### Tier 1 - Mission Critical (Emergency Core)
- **Availability:** 99.9% (max 43 minutes downtime/month)
- **Response Time:** < 500ms (P95)
- **Recovery Time Objective (RTO):** 15 minutes
- **Recovery Point Objective (RPO):** 5 minutes

#### Tier 2 - Business Critical (Auth Service)
- **Availability:** 99.5% (max 3.6 hours downtime/month)
- **Response Time:** < 1s (P95)
- **RTO:** 1 hour
- **RPO:** 15 minutes

#### Tier 3 - Operational (LMS, CMS)
- **Availability:** 99% (max 7.2 hours downtime/month)
- **Response Time:** < 2s (P95)
- **RTO:** 4 hours
- **RPO:** 1 hour

### 2.2 Error Budget Policy
- If error budget consumed > 50%: Freeze new features, focus on stability
- If error budget consumed > 75%: Emergency mode, hotfixes only

See [SLA/SLO Definition](./sla-slo.md) for complete details.

---

## 3. Incident Management

### 3.1 Severity Classification

| Severity | Definition | Example | Response Time |
|----------|-----------|---------|---------------|
| **SEV-1** | Emergency core non-functional | Panic button not working | < 15 minutes |
| **SEV-2** | Significant degradation | Response time > 2x normal | < 1 hour |
| **SEV-3** | Minor degradation | Non-critical feature down | < 4 hours |
| **SEV-4** | Cosmetic issue | UI minor bug | Next business day |

### 3.2 Incident Response Procedure

1. **Detection:** Alert → On-call engineer notified
2. **Triage:** Assess severity → Declare incident
3. **Response:** Mitigation → Resolution
4. **Post-Mortem:** Root cause analysis → Action items

**Post-Mortem Template:**
- Timeline of events
- Root cause (5 Whys)
- Impact analysis
- Action items with owner and deadline

See [Incident Management](./incident-management.md) for complete procedures.

---

## 4. Change Management

### 4.1 Change Classification

**High-Risk Changes:**
- Database schema migration
- Core algorithm changes (e.g., geo-dispatch)
- Infrastructure changes
- **Require:** 2 approvers, maintenance window

**Medium-Risk Changes:**
- Non-breaking API changes
- New non-critical features
- **Require:** 1 approver

**Low-Risk Changes:**
- Non-critical bug fixes
- Content updates
- **Require:** Self-approved after review

### 4.2 Change Request Process
1. Submit change proposal with impact analysis
2. Review by Operations Committee (for high-risk)
3. Schedule change (prefer maintenance window: 00:00-04:00)
4. Execute with rollback plan ready
5. Post-change verification

---

## 5. Monitoring & Observability

### 5.1 Four Golden Signals (Google SRE)

1. **Latency:** Response time per endpoint
2. **Traffic:** Requests per second
3. **Errors:** Error rate (4xx, 5xx)
4. **Saturation:** CPU, memory, disk usage

### 5.2 Alerting Strategy

**Critical Alerts (Pager):**
- Emergency service down
- Error rate > 5%
- Response time > 2x baseline

**Warning Alerts (Email):**
- Disk usage > 80%
- Memory usage > 85%
- Queue length growing

### 5.3 Tool Recommendations
- **Metrics:** Prometheus + Grafana
- **Logs:** ELK Stack or Loki
- **Tracing:** Jaeger for distributed tracing
- **Uptime:** UptimeRobot or external ping service

---

## 6. Disaster Recovery & Business Continuity

### 6.1 Backup Strategy

| Data Type | Frequency | Retention | Location |
|-----------|-----------|-----------|----------|
| Database | Hourly | 30 days | Off-site (different region) |
| Application logs | Daily | 90 days | Cloud storage |
| Configurations | Per change | 1 year | Git repository |

### 6.2 High Availability Setup

**Emergency Core Service:**
- Multi-AZ deployment (min 2 availability zones)
- Auto-scaling min 2 instances
- Load balancer with health checks
- Read replica for failover

**Auth Service:**
- Multi-instance deployment
- Redis cluster for session storage

### 6.3 DR Testing
- **Tabletop exercise:** Every 6 months
- **Simulation drill:** Yearly

---

## 7. Security & Compliance

### 7.1 Data Privacy Framework

**Data Classification:**
- **Highly Sensitive:** Health data (compliance required)
- **Sensitive:** Personal information (PII)
- **Internal:** Internal operational data
- **Public:** Public information

**Controls:**
- Encryption at rest and in transit
- Access logging (who accessed what data)
- Data retention policy
- Right to erasure mechanism

### 7.2 Security Practices

**Mandatory:**
- Regular security scans (OWASP ZAP, npm audit)
- Penetration testing yearly
- Vulnerability patching within 30 days
- Secret management (HashiCorp Vault or AWS Secrets Manager)

### 7.3 Healthcare Compliance

**Regulations to consider:**
- **UU Perlindungan Data Pribadi (PDP Law 2022)**: Mandatory for Indonesian organizations
- **Health data handling guidelines**: Kemenkes regulations
- **SATUSEHAT integration compliance**: FHIR standards

---

## 8. Knowledge Management

### 8.1 Documentation Strategy

**Required Docs per Service:**
1. **README.md:** Setup, run, environment variables
2. **API.md:** Complete API documentation (Swagger)
3. **RUNBOOK.md:** Operational procedures
4. **ARCHITECTURE.md:** Service-specific design

**Knowledge Transfer Process:**
- Video recording mandatory before handoff
- Pair programming sessions for critical components
- Updated documentation before payment/certificate release

### 8.2 Knowledge Base Structure

```
docs/
├── governance/
│   ├── it-governance.md (this file)
│   ├── sla-slo.md
│   └── incident-management.md
├── operations/
│   ├── monitoring-setup.md
│   ├── backup-procedures.md
│   └── disaster-recovery.md
├── security/
│   ├── data-classification.md
│   └── security-checklist.md
└── services/
    ├── auth-service/
    ├── emergency-service/
    └── lms-service/
```

---

## 9. Performance Management

### 9.1 Key Performance Indicators (KPIs)

**System KPIs:**
- Availability percentage per tier
- Mean Time To Recovery (MTTR)
- Mean Time Between Failures (MTBF)
- Deployment frequency

**Development KPIs:**
- Lead time for changes
- Change failure rate
- Code review turnaround time

### 9.2 Reporting
- **Weekly:** Operations report to technical team
- **Monthly:** Performance report to board
- **Quarterly:** Strategic review with stakeholders

---

## 10. Capacity Planning

### 10.1 Scaling Strategy

**Emergency Core Service:**
- Auto-scaling based on CPU > 70%
- Predictive scaling before expected events (e.g., disaster season)
- Load testing quarterly

**Cost Optimization:**
- Right-sizing instances
- Scheduled scaling for non-critical services
- Reserved instances for predictable workloads

---

## Implementation Roadmap

### Phase 1 - Critical (Months 1-2)
1. Establish Technical Board and Operations Committee
2. Define and communicate SLOs/SLAs
3. Setup basic monitoring (uptime, basic metrics)
4. Create incident response procedures

### Phase 2 - High Priority (Months 3-4)
1. Implement change management process
2. Setup backup strategy
3. Create security policies
4. Establish documentation standards

### Phase 3 - Medium Priority (Months 5-6)
1. Implement comprehensive monitoring
2. High availability setup for critical services
3. Create DR plan and testing
4. Establish knowledge base

---

## Related Documentation

- [SLA/SLO Definition](./sla-slo.md) - Detailed service level definitions
- [Incident Management](./incident-management.md) - Incident response procedures
- [System Architecture](../architecture/system-architecture.md) - Technical architecture

---

*Kembali ke [Governance](./index.md)*
