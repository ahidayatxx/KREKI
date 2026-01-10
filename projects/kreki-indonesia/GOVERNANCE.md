# KREKI GitHub Organization Governance

**Governance structure and decision-making for the kreki-indonesia GitHub organization**

---

## Overview

The kreki-indonesia GitHub organization is governed by KREKI (Komunitas Relawan Emergensi Kesehatan Indonesia), a non-profit organization dedicated to saving lives through technology-enabled community emergency response.

This document defines the governance structure, roles, responsibilities, and decision-making processes for the GitHub organization.

---

## 🏢 Organization Structure

### KREKI Legal Entity

KREKI is a registered non-profit organization in Indonesia:

- **Legal Name**: Komunitas Relawan Emergensi Kesehatan Indonesia (KREKI)
- **Founded**: 2020
- **Status**: Non-profit (Non-Governmental Organization)
- **Headquarters**: Jakarta, Indonesia

### GitHub Organization

**GitHub Handle**: `kreki-indonesia`

**Organization Purpose**:
- Develop and maintain national emergency response standards
- Provide open source reference implementations
- Operate the HELP 119 platform
- Foster community engagement

---

## 👥 Governance Bodies

### 1. Steering Committee

**Purpose**: Ultimate decision-making authority for the GitHub organization

**Composition** (15 members):
- **KREKI Board** (3): Ketua Umum, Sekjen, Bendahara
- **Executive Committee** (4): CTO, COO, CFO, CMO
- **Technical Committee** (3): Lead Architect, Security Lead, Data Architect
- **Standards Oversight Committee** (2): Standards Chair, Compliance Lead
- **Advisory Council** (3): Government, Industry, Academia

**Responsibilities**:
- Approve major architectural decisions
- Approve new repositories
- Approve licensing models
- Approve partnerships and collaborations
- Review and approve annual roadmap
- Budget and resource allocation

**Decision Making**: 2/3 majority vote required

**Meeting Frequency**: Quarterly

### 2. Technical Committee

**Purpose**: Technical governance and architecture oversight

**Composition** (5-7 members):
- Lead Architect (Chair)
- Security Lead
- Data Architect
- Platform Engineering Lead
- Community Technical Representative
- (Optional) Industry advisors

**Responsibilities**:
- Approve all technical standards before publication
- Review architecture proposals
- Approve major platform changes
- Ensure technical quality and consistency
- Review and approve RFCs (Request for Comments)
- Technical risk assessment

**Decision Making**: Simple majority vote

**Meeting Frequency**: Monthly

### 3. Standards Oversight Committee

**Purpose**: Standards development and certification management

**Composition** (3-5 members):
- Standards Chair (Head)
- Certification Program Manager
- Compliance Lead
- Healthcare Domain Expert
- Community Representative

**Responsibilities**:
- Manage standards development process
- Review and approve standard proposals
- Ensure stakeholder representation
- Coordinate with external standards bodies (Kemenkes, BSN, etc.)
- Certification program oversight
- Quality assurance for standards

**Decision Making**: Simple majority vote

**Meeting Frequency**: Monthly (quarterly for major reviews)

### 4. Repository Maintainers

**Purpose**: Day-to-day repository management and contribution review

**Composition**: Appointed per repository

**Responsibilities**:
- Review and merge Pull Requests
- Ensure code quality and documentation
- Respond to issues and questions
- Maintain repository health
- Enforce contribution guidelines
- Report to Technical Committee

**Appointment**: Appointed by Technical Committee

**Term**: 1 year, renewable

---

## 🔄 Decision-Making Process

### Types of Decisions

#### Level 1: Operational Decisions

**Examples**:
- Bug fixes
- Documentation improvements
- Minor feature additions
- Code refactoring

**Authority**: Repository Maintainers

**Process**:
1. Maintainer reviews PR/issue
2. Makes decision
3. Implements change
4. Documents decision (if significant)

#### Level 2: Technical Decisions

**Examples**:
- New features
- Architecture changes
- API design changes
- Standards updates

**Authority**: Technical Committee

**Process**:
1. RFC (Request for Comments) submitted
2. Technical Committee reviews
3. Community feedback period (2 weeks)
4. Technical Committee votes
5. Decision implemented
6. Change communicated

#### Level 3: Strategic Decisions

**Examples**:
- New repositories
- Licensing changes
- Major platform changes
- Partnerships and collaborations
- Budget allocation

**Authority**: Steering Committee

**Process**:
1. Proposal submitted to Steering Committee
2. Committee reviews and discusses
3. External consultation (if needed)
4. Committee votes (2/3 majority)
5. Decision implemented
6. Change announced to community

### RFC (Request for Comments) Process

**When to Submit an RFC**:
- New technical features
- Architecture changes
- API modifications
- Standards proposals
- Breaking changes

**RFC Template**:

```markdown
# RFC: [Title]

**Status**: Proposed | In Review | Approved | Rejected | Implemented
**Author**: @username
**Created**: YYYY-MM-DD
**RFC Issue**: #123

## Summary
Brief summary of the proposal.

## Motivation
Why is this change needed? What problem does it solve?

## Proposed Solution
Detailed description of the proposed solution.

## Alternatives Considered
What alternatives were considered? Why were they rejected?

## Impact Analysis
- Breaking changes?
- Migration path?
- Performance impact?
- Security implications?

## Unresolved Questions
What questions remain?

## Implementation Plan
How will this be implemented?
```

**RFC Process**:
1. **Submit**: Create RFC issue/discussion
2. **Review**: Technical Committee reviews (2 weeks)
3. **Feedback**: Community provides feedback
4. **Revision**: Author addresses feedback
5. **Decision**: Technical Committee votes
6. **Implement**: Approved RFCs implemented
7. **Track**: RFC status updated

---

## 📋 Roles and Permissions

### GitHub Organization Roles

| Role | Permissions | Who |
|------|-------------|-----|
| **Owner** | Full control, admin settings | KREKI Board members |
| **Admin** | Manage teams, repos, settings | CTO, COO |
| **Maintainer** | Write access, manage issues/repos | Technical Committee, Maintainers |
| **Member** | Read/write access to assigned repos | Contributors, Partners |
| **Outside Collaborator** | Submit PRs, comment on issues | Public contributors |

### Repository Access Levels

| Access Level | Read | Issues | PR | Write | Admin |
|--------------|-----|--------|-----|-------|-------|
| **Public** | ✅ | ✅ | ✅ | ❌ | ❌ |
| **Contributor** | ✅ | ✅ | ✅ | ❌ | ❌ |
| **Maintainer** | ✅ | ✅ | ✅ | ✅ | ❌ |
| **Admin** | ✅ | ✅ | ✅ | ✅ | ✅ |

### Team Structure

```
kreki-indonesia/
├── Owners (3)
│   └── KREKI Board
├── Admins (5)
│   ├── Technical Committee
│   └── Operations Team
├── Maintainers (per repository)
│   ├── ea-standards-maintainers
│   ├── help-119-backend-maintainers
│   └── ...
└── Members (contributors, partners)
    ├── community-contributors
    ├── partner-developers
    └── kreki-staff
```

---

## 🤝 Community Engagement

### Advisory Council

**Purpose**: Provide external perspective and expertise

**Composition**:
- **Government Representative**: Kemenkes, BSSN
- **Industry Expert**: Healthcare technology
- **Academic Representative**: Medical education, research
- **Community Representative**: Volunteer, patient advocate

**Responsibilities**:
- Provide strategic guidance
- Share industry insights
- Advocate for KREKI
- Connect with external stakeholders

**Term**: 2 years, renewable

### Public Consultation

**When**:
- Major standards changes
- Breaking platform changes
- Licensing modifications
- Governance changes

**Process**:
1. Publish proposal for public comment
2. 30-day comment period
3. Review and address feedback
4. Publish final decision with rationale

### Community Meetings

**Monthly Town Hall**:
- Open to all contributors and partners
- Updates on progress and roadmap
- Q&A session
- Recorded and published

**Annual Summit**:
- In-person/virtual gathering
- Presentations on achievements
- Workshops and training
- Networking and collaboration

---

## ✅ Compliance and Accountability

### Code of Conduct

KREKI maintains a [Code of Conduct](CODE_OF_CONDUCT.md) that applies to:

- GitHub interactions
- Community forums
- Events and meetings
- All public communication

**Enforcement**: Code of Conduct Committee (appointed by Steering Committee)

### Transparency

**Public Information**:
- Meeting minutes (redacted if needed)
- Decisions and rationale
- Roadmap and progress
- Financial reports (annual)
- Impact metrics (quarterly)

**Confidential Information**:
- Personal data
- Security vulnerabilities (until fixed)
- Commercial partnerships (until announced)
- Legal matters

### Conflict of Interest

**Policy**: All governance members must disclose conflicts of interest

**Examples**:
- Employment by competitor organizations
- Financial interests in related companies
- Family relationships with other members
- Previous contributions to competing projects

**Resolution**:
- Recuse from decisions where conflict exists
- Disclose conflict to committee
- Document recusal in meeting minutes

---

## 📊 Performance and Accountability

### KPIs for Governance

**Effectiveness Metrics**:
- RFC decision time < 30 days
- PR review time < 7 days
- Community satisfaction > 4.0/5.0
- Contributor retention rate > 80%

**Transparency Metrics**:
- Meeting minutes published within 7 days
- Public consultation rate (major decisions)
- Community meeting attendance

**Quality Metrics**:
- Code review coverage 100%
- Documentation completeness > 95%
- Test coverage > 80%

### Annual Review

**Process**:
1. Self-assessment by each committee
2. External review (every 3 years)
3. Community feedback survey
4. Performance report published
5. Governance improvements identified
6. Changes implemented

---

## 🔄 Amendment Process

### Governance Changes

**Process**:
1. Proposal submitted to Steering Committee
2. Public consultation (30 days)
3. Committee reviews feedback
4. Vote (2/3 majority)
5. Changes implemented
6. Community notified

**Minor Changes**:
- Process improvements
- Role clarifications
- Administrative updates

**Major Changes**:
- Structure changes
- New committees
- Voting threshold changes
- Role additions/removals

---

## 📞 Contact

### Governance Questions

- **General Governance**: governance@kreki.or.id
- **Technical Committee**: tech-committee@kreki.or.id
- **Standards Committee**: standards@kreki.or.id

### Appeals

**Appeals Process**:
1. Submit appeal in writing to Steering Committee
2. Committee reviews appeal
3. Decision within 30 days
4. Final and binding

**Appeal Contact**: appeals@kreki.or.id

---

## 📜 Legal

### Authority

This governance structure is established by:

- KREKI Articles of Association
- KREKI Board resolutions
- GitHub organization settings

### Jurisdiction

This governance operates under the laws of the Republic of Indonesia.

---

## 📝 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-01-09 | Initial governance structure |

---

**Last Updated**: January 9, 2025

**Next Review**: January 2026

**Maintained By**: KREKI Steering Committee

---

## 🔗 Related Documents

- [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guidelines
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) - Code of conduct
- [README.md](README.md) - Organization overview
- [LICENSE](LICENSE) - Licensing guide
