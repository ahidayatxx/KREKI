# KREKI Indonesia

**Komunitas Relawan Emergensi Kesehatan Indonesia - National Emergency Response Platform**

---

## Overview

KREKI (Komunitas Relawan Emergensi Kesehatan Indonesia) is Indonesia's national emergency response platform that connects victims of medical emergencies with nearby trained volunteers through the HELP 119 mobile application.

Our mission is to **save lives** by creating a nationwide network of certified emergency response volunteers, enabling rapid response to medical emergencies through technology-enabled community action.

[![License](https://img.shields.io/badge/License-Source%20Available-blue)](LICENSE)
[![GitHub](https://img.shields.io/badge/GitHub-kreki--indonesia-lightgrey)](https://github.com/kreki-indonesia)

---

## 🚀 Quick Links

- **GitHub Organization**: [github.com/kreki-indonesia](https://github.com/kreki-indonesia)
- **License Information**: See [LICENSE](./LICENSE)
- **Contact**: [Contact section below](#-contact)
- **Standards & Reference**: [Open repositories](#-repository-structure) available for adoption

---

## 📋 At a Glance

| Metric | Value |
|--------|-------|
| **Mission** | Save lives through technology-enabled community emergency response |
| **Platform** | HELP 119 mobile app connecting victims to nearby trained volunteers |
| **Coverage** | 34 Indonesian provinces, 15,000+ certified volunteers |
| **Open Source** | National standards available for adoption (CC BY 4.0, MIT, Apache 2.0) |

---

## 🎯 What We Do

### HELP 119 Platform

**HELP 119** is our flagship mobile application that:

- **Panic Button**: One-tap emergency alert to nearby volunteers
- **GPS Location**: Automatic location detection and routing
- **Real-Time Tracking**: Watch volunteer response in real-time
- **Skill Matching**: Connects with volunteers having the right skills (BHD, ACLS)
- **Multi-Role Support**: Victim, Volunteer, and Admin interfaces

### Volunteer Certification

KREKI provides nationally recognized certification programs:

- **Bantuan Hidup Dasar (BHD)**: Basic Life Support certification
- **Advanced Cardiac Life Support (ACLS)**: Advanced emergency care
- **Instructor Training**: Train-the-trainer certification

### National Standards

KREKI sets national standards for emergency services:

- Enterprise Architecture framework
- FHIR implementation guides for emergency response
- Security and privacy frameworks
- API specifications for interoperability

---

## 📁 Repository Structure

The `kreki-indonesia` GitHub organization contains three categories of repositories:

### 📚 Standards & Reference (Open Source)

National standards other organizations can adopt.

| Repository | Description | License |
|------------|-------------|---------|
| [ea-standards](./standards/ea-standards/) | TOGAF-based emergency services EA framework | CC BY 4.0 |
| [api-specifications](./standards/api-specifications/) | OpenAPI specs for emergency response APIs | MIT |
| [fhir-profiles](./standards/fhir-profiles/) | Emergency services FHIR implementation guides | Apache 2.0 |
| [security-framework](./standards/security-framework/) | Zero Trust security standards | MIT |
| [certification-framework](./standards/certification-framework/) | Volunteer competency certification | CC BY 4.0 |

### 🛠️ Platform Services (Source Available)

Core platform implementations (viewable source, licensed for use).

| Repository | Description | License |
|------------|-------------|---------|
| [help-119-mobile](./platform/help-119-mobile/) | Android & iOS mobile application | Source Available |
| [help-119-backend](./platform/help-119-backend/) | Core backend microservices | Source Available |
| [kreki-auth-service](./platform/kreki-auth-service/) | Multi-tenant authentication & SSO | Source Available |
| [kreki-emergency-core](./platform/kreki-emergency-core/) | Geo-dispatch engine | Source Available |
| [kreki-lms](./platform/kreki-lms/) | Learning Management System | Source Available |
| [satusehat-bridge](./platform/satusehat-bridge/) | SATUSEHAT integration wrapper | Source Available |

### 🏢 Organization-Specific (Private/Private)

Internal assets and configurations (restricted access).

| Repository | Description | Visibility |
|------------|-------------|------------|
| [kreki-branding](./org-specific/kreki-branding/) | Brand assets, design system | Private |
| [deployment-kreki](./org-specific/deployment-kreki/) | Production deployment configs | Private |
| [docs-portal](./org-specific/docs-portal/) | Public documentation source | Public |

---

## 🤝 Partnership Opportunities

KREKI offers partnership models for organizations:

### Community Tier (Free)

**For**: Non-profit healthcare organizations with <100 users

**Includes**:
- Access to platform standards
- Source code viewing
- Community forum support

### Professional Tier (Negotiated)

**For**: Non-profit healthcare organizations with >100 users

**Includes**:
- Full platform deployment
- Email support
- Training materials
- Certification program access

### Enterprise Tier (License Fee)

**For**: For-profit organizations of any size

**Includes**:
- Custom platform deployment
- Dedicated support
- Custom integrations
- SLA guarantee
- Priority feature requests

**Interested in partnering?** Contact: [partners@kreki.or.id](mailto:partners@kreki.or.id)

---

## 👥 For Developers

### Get Started

1. **Explore Standards**: Check out our [open standards](./standards/)
2. **Review Documentation**: Read the [EA Standards documentation](./standards/ea-standards/)
3. **Review Code**: Browse our [platform repositories](./platform/)
4. **Join Community**: Participate in [GitHub Discussions](https://github.com/kreki-indonesia/ea-standards/discussions)

### API Access

KREKI provides public APIs for integration:

- **Emergency Management**: Create and manage emergencies
- **Volunteer Dispatch**: Find and dispatch nearby volunteers
- **Location Services**: GPS-based volunteer matching
- **FHIR Integration**: Healthcare data exchange

**API Specifications**: See [api-specifications](./standards/api-specifications/) repository

### Contribute

We welcome contributions to our **standards repositories**:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a Pull Request

**Note**: Platform repositories are source-available but require a license agreement for modifications.

---

## 📊 Impact & Statistics

### Nationwide Presence

- **34 Provinces**: Coverage across all Indonesian provinces
- **15,000+ Volunteers**: Certified emergency responders
- **50+ Partners**: Healthcare organizations, hospitals, clinics
- **100,000+ Downloads**: HELP 119 mobile app installations

### Performance Metrics

- **Average Response Time**: <5 minutes (urban areas)
- **Survival Rate**: 2× improvement in cardiac arrest survival
- **Volunteer Retention**: 85% annual retention rate
- **User Satisfaction**: 4.7/5.0 average rating

---

## 🏆 Governance

KREKI is governed by a **Steering Committee** comprising:

- **KREKI Board**: Executive leadership
- **Technical Committee**: Architecture and standards oversight
- **Standards Oversight Committee**: Certification and compliance
- **Advisory Council**: Government, industry, and academia representatives

**Governance Documentation**: [See EA standards](./standards/ea-standards/)

---

## 🔒 Security & Compliance

KREKI maintains the highest standards for security and data protection:

- **Zero Trust Architecture**: Never trust, always verify
- **Data Encryption**: AES-256 at rest, TLS 1.3 in transit
- **Privacy Compliance**: UU PDP 2022 compliant
- **ISO 27001**: Information security management
- **Regular Audits**: Quarterly security assessments

**Security Policy**: [security-framework](./standards/security-framework/)

---

## 📜 Licensing

### Three-Tier Model

**Layer 1: Reference Standards** (Free, Open Source)
- CC BY 4.0, MIT, or Apache 2.0 licenses
- Anyone can view, use, and modify
- Attribution required

**Layer 2: Core Platform** (Source Available, Licensed)
- Source code is viewable
- Commercial use or deployment requires license
- Free for non-profit healthcare organizations

**Layer 3: KREKI Customizations** (Proprietary)
- KREKI-branded implementations
- Fully proprietary
- Available to KREKI and licensed partners only

**License Inquiries**: [licensing@kreki.or.id](mailto:licensing@kreki.or.id)

---

## 📞 Contact

### General Inquiries

- **Email**: [info@kreki.or.id](mailto:info@kreki.or.id)
- **GitHub**: [https://github.com/kreki-indonesia](https://github.com/kreki-indonesia)

### For Developers

- **GitHub**: [https://github.com/kreki-indonesia](https://github.com/kreki-indonesia)
- **Developer Support**: [dev-support@kreki.or.id](mailto:dev-support@kreki.or.id)
- **Documentation**: See repository README files

### For Partners

- **Partnership**: [partners@kreki.or.id](mailto:partners@kreki.or.id)
- **Licensing**: [licensing@kreki.or.id](mailto:licensing@kreki.or.id)

### For Volunteers

- **Certification**: [certify@kreki.or.id](mailto:certify@kreki.or.id)
- **Volunteer Coordination**: [volunteer@kreki.or.id](mailto:volunteer@kreki.or.id)

### Media & Press

- **Press Contact**: [press@kreki.or.id](mailto:press@kreki.or.id)

---

## 🙏 Acknowledgments

KREKI thanks our invaluable partners and supporters:

- **Kemenkes RI**: Ministry of Health, Republic of Indonesia
- **PSC 119**: National emergency response centers
- **SATUSEHAT**: National health data platform
- **Healthcare Partners**: Hospitals, clinics, and healthcare organizations
- **Volunteer Community**: Our certified volunteers nationwide
- **Open Source Community**: For invaluable tools and libraries

---

## 📈 Roadmap

### 2025 Priorities

- [ ] Q1: Expand to 50,000 volunteers
- [ ] Q2: Launch telemedicine integration
- [ ] Q3: Achieve national standards body recognition
- [ ] Q4: Regional expansion (ASEAN pilot)

### Long-Term Vision

**3-Year Goals**:
- 200,000+ certified volunteers
- Nationwide coverage (100% provinces)
- 200+ partner organizations
- 40% improvement in emergency survival rates
- Regional expansion to Southeast Asia

**5-Year Vision**:
- Become Indonesia's national emergency response platform
- Establish emergency services as a national standard
- Self-sustaining ecosystem model
- Global thought leadership in community emergency response

---

## 📄 License

```
KREKI Source Available License (KSAL)

Copyright (c) 2025 Komunitas Relawan Emergensi Kesehatan Indonesia (KREKI)

Individual repositories may have different licenses. See each repository's
LICENSE file for specific terms.

For general licensing inquiries:
Email: licensing@kreki.or.id
GitHub: https://github.com/kreki-indonesia
```

---

<div align="center">

**🚑 Saving Lives Through Technology-Enabled Community Action**

**🇮🇩 Melayani Indonesia dengan Hati dan Kompetensi**

[![GitHub](https://img.shields.io/badge/GitHub-kreki--indonesia-lightgrey)](https://github.com/kreki-indonesia)

*Work in Progress • Standards and repositories under active development*

</div>
