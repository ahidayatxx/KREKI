---
title: "KREKI Engineering Handbook"
description: "Technical ecosystem blueprint and engineering practices"
category: "engineering"
last_updated: 2025-01-07
---

# KREKI Engineering Handbook

## Introduction

**Komunitas Relawan Emergensi Kesehatan Indonesia (KREKI)** is building a digital ecosystem to save lives through the **HELP 119** application, volunteer management system, and learning platform.

This repository is not the application code, but contains **Master Blueprints**, **Governance Standards**, and **Technology Roadmaps** for all KREKI digital initiatives. The goal is to ensure system *sustainability* amidst the dynamics of developer team turnover and resource constraints.

### Technical Vision

*"To build a modular, resilient, and technology-agnostic emergency information system that can be developed collaboratively by volunteers and professionals."*

---

## Strategic Problem & Solution

### Challenges

- **Developer Turnover:** Developers often change (vendor/volunteers), causing *knowledge loss*.
- **Monolithic Legacy:** Old monolithic systems are hard to maintain and total *down* if one feature fails.
- **Funding Constraints:** Dependence on funding cycles makes long-term *maintenance* difficult.

### Strategic Solution: "Microservices & Open Collaboration"

We adopt **Microservices** architecture. The system is split into small, independent services.

**Benefits:**
- Intern students or volunteers can work on one small part (e.g., Certificate feature) without needing to understand/breaking core features (e.g., Panic Button)
- Servers can be scaled according to specific service needs
- Easier onboarding for new contributors

---

## Document Structure

Please study the following detailed documents before contributing:

| Document | Description | Target Audience |
|----------|-------------|-----------------|
| [Architecture Blueprint](../docs/architecture/system-architecture.md) | Microservices technical design, Tech Stack, Data Flow Diagrams | CTO, Architect, Lead Dev |
| [Contribution Guide](../docs/contributing/contribution-guide.md) | Coding SOP, Git flow, API documentation rules | Developer, Interns |
| [Governance Framework](../docs/governance/it-governance.md) | IT governance, SLA, incident management | Ops, DevOps, Management |

---

## Ecosystem Overview

The KREKI system consists of the following interconnected modules:

### 1. Auth Service (KREKI ID)
Single sign-on gateway for Volunteers and Public.

### 2. Emergency Core
The brain of HELP 119 system (Panic button, Geo-dispatching).

### 3. LMS (Learning Management System)
Bantuan Hidup Dasar (BHD) training module.

### 4. Integration Bridge
Data bridge to **SATUSEHAT (Kemenkes)** and PSC 119.

---

## Contact & Community

If you are a developer, university, or technology company wanting to contribute (CSR):

- **Email:** it-support@kreki.or.id
- **Security Issues:** security@kreki.or.id
- **General:** sekretariat.kreki@gmail.com

---

## Related Documentation

- [System Architecture](../docs/architecture/system-architecture.md)
- [Governance Framework](../docs/governance/it-governance.md)
- [Contributing Guide](../docs/contributing/contribution-guide.md)

---

*Kembali ke [Documentation Index](../docs/)*
