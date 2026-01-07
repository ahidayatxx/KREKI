---
title: "Incident Management"
description: "Incident response procedures and severity classifications"
category: "governance"
last_updated: 2025-01-07
---

# Incident Management

This document defines the incident management procedures for KREKI information systems.

## Overview

### Incident Definition

An **incident** is an unplanned interruption to a service or reduction in quality of a service.

### Goals

1. **Minimize Impact:** Restore service as quickly as possible
2. **Learn:** Identify root causes and prevent recurrence
3. **Improve:** Continuously enhance system resilience

---

## Severity Classification

### SEV-1 - Critical

**Definition:** Emergency core service completely non-functional

**Examples:**
- Panic button not working
- Unable to dispatch volunteers
- Complete service outage

**Response SLA:**
- **Acknowledge:** < 5 minutes
- **Initial Response:** < 15 minutes
- **Resolution:** As fast as possible

**Notification:**
- Pager to all on-call engineers
- Email to Operations Committee
- SMS to CTO/Lead Architect

---

### SEV-2 - High

**Definition:** Significant degradation of critical service

**Examples:**
- Response time > 2x baseline
- Error rate > 10% for Emergency Core
- Partial service outage

**Response SLA:**
- **Acknowledge:** < 15 minutes
- **Initial Response:** < 1 hour
- **Resolution:** < 4 hours

**Notification:**
- Pager to on-call engineer
- Email to Operations Committee
- Slack #incidents channel

---

### SEV-3 - Medium

**Definition:** Minor degradation or non-critical service down

**Examples:**
- Non-critical feature not working
- Tier 2/3 service degraded
- UI issues not affecting core functionality

**Response SLA:**
- **Acknowledge:** < 1 hour
- **Initial Response:** < 4 hours
- **Resolution:** < 24 hours

**Notification:**
- Email to on-call engineer
- Slack #incidents channel

---

### SEV-4 - Low

**Definition:** Cosmetic issues or minor bugs

**Examples:**
- UI minor display issues
- Typos in content
- Non-urgent bugs

**Response SLA:**
- **Acknowledge:** Next business day
- **Resolution:** In next release cycle

**Notification:**
- Create GitHub issue

---

## Incident Response Process

### 1. Detection

**Monitoring Alerts:**
- Automated alerts from monitoring systems
- User reports via hotline/email
- Error rate spikes

**Immediate Actions:**
- Acknowledge alert
- Verify the issue
- Determine severity

---

### 2. Triage

**Assess:**
1. **Scope:** How many users affected?
2. **Impact:** What functionality is broken?
3. **Severity:** Assign SEV level
4. **Urgency:** Is this getting worse?

**Declare Incident:**
- If SEV-1 or SEV-2: Declare immediately
- Create incident channel: `#incident-[service]-[date]`
- Post incident status page

---

### 3. Response

**Assign Roles:**
- **Incident Commander:** Leads response, coordinates communication
- **Technical Lead:** Investigates and implements fix
- **Communications Lead:** Updates stakeholders

**Update Frequency:**
| Severity | Update Frequency |
|----------|-----------------|
| SEV-1 | Every 15 minutes |
| SEV-2 | Every 30 minutes |
| SEV-3 | Every hour |

**Status Updates Include:**
1. Current status
2. Impact assessment
3. Next steps
4. ETA for resolution (if known)

---

### 4. Resolution

**Before Closing:**
- [ ] Service is fully restored
- [ ] No ongoing errors
- [ ] Monitoring shows normal metrics
- [ ] Stakeholders notified

**Closing Incident:**
- Post final update
- Mark incident as resolved
- Schedule post-mortem

---

## Post-Mortem Process

### Purpose

The goal is **learning**, not blaming. Focus on systemic issues, not individual errors.

### When Required

- All SEV-1 incidents
- SEV-2 incidents with significant user impact
- Any incident requiring > 4 hours to resolve

### Post-Mortem Template

```markdown
# Incident Post-Mortem: [Incident Title]

**Date:** [Date of incident]
**Severity:** SEV-[X]
**Duration:** [Start time] - [End time]
**Downtime:** [Total duration]

## Summary
[Brief description of what happened]

## Impact
- [ ] Users affected
- [ ] Services affected
- [ ] Business impact

## Timeline
| Time | Event |
|------|-------|
| HH:MM | [Event 1] |
| HH:MM | [Event 2] |
| ... | ... |

## Root Cause Analysis
Use the **5 Whys** technique:

1. Why did the incident happen?
   - [Answer]
2. Why did [previous answer] happen?
   - [Answer]
3. Continue until systemic cause found

## Root Cause
[Identified root cause]

## Action Items
| # | Action | Owner | Due Date | Status |
|---|--------|-------|----------|--------|
| 1 | [Description] | [Name] | [Date] | [Open/Done] |
| 2 | [Description] | [Name] | [Date] | [Open/Done] |

## Lessons Learned
- What went well?
- What could be improved?
- What changes are needed?

## Follow-up
[Date for follow-up review]
```

### Post-Mortem Meeting

**Attendees:** Incident responders, Service Owners, Operations Committee

**Agenda:**
1. Review timeline
2. Discuss root cause
3. Identify action items
4. Assign owners and deadlines

**Output:** Completed post-mortem document posted to GitHub

---

## Communication

### Internal Communication

**Channels:**
- Slack: `#incidents` for all incidents
- Slack: `#incident-[name]` for specific incident
- Email: For SEV-1/2, email Operations Committee

### External Communication

**Status Page:** `status.kreki.id` (to be set up)

**When to Notify Public:**
| Severity | Public Notification |
|----------|---------------------|
| SEV-1 | Immediately |
| SEV-2 | Within 30 minutes |
| SEV-3 | As needed |
| SEV-4 | No notification |

**Public Update Format:**
```markdown
## [Service Name] - [Issue Summary]

**Status:** [Investigating|Identified|Monitoring|Resolved]
**Started:** [Time]
**Impact:** [Description]

### Latest Update
[Update text]

### Previous Updates
[Older updates]
```

---

## On-Call Procedures

### On-Call Responsibilities

**Primary On-Call:**
- Respond to alerts within SLA
- Lead incident response
- Escalate when needed

**Secondary On-Call:**
- Backup for primary
- Cover during primary's time off

### Escalation Path

1. **Primary On-Call** → Attempt to resolve
2. **Secondary On-Call** → If no response in 15 minutes
3. **DevOps Lead** → If SEV-1 or no resolution in 1 hour
4. **CTO/Lead Architect** → If critical, anytime

### On-Call Handoff

**During handoff:**
- Review ongoing issues
- Check monitoring dashboards
- Verify no unresolved incidents
- Update on-call calendar

---

## Incident Metrics

### Track Monthly

| Metric | Target | Current |
|--------|--------|---------|
| Total Incidents | < 10 | |
| SEV-1 Incidents | 0 | |
| Mean Time To Acknowledge (MTTA) | < 5 min (SEV-1) | |
| Mean Time To Resolve (MTTR) | < 1 hour (SEV-1) | |
| Post-Mortems Completed | 100% | |

### Quarterly Review

Review incident trends for:
- Recurring issues
- Common root causes
- Areas needing improvement

---

## Related Documentation

- [IT Governance Framework](./it-governance.md) - Governance structure
- [SLA/SLO Definition](./sla-slo.md) - Service level targets
- [System Architecture](../architecture/system-architecture.md) - System design

---

*Kembali ke [Governance](./index.md)*
