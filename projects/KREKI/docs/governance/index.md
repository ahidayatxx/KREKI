---
title: "Tata Kelola IT"
description: "Framework tata kelola, SLA, dan manajemen insiden sistem informasi KREKI"
category: "governance"
last_updated: 2025-01-07
---

# Tata Kelola Sistem Informasi

Framework tata kelola IT KREKI dirancang untuk menjamin keberlanjutan sistem, availability layanan mission-critical, dan compliance dengan regulasi kesehatan Indonesia.

## Dokumen

| Dokumen | Deskripsi |
|---------|-----------|
| [IT Governance Framework](./it-governance.md) | Framework lengkap struktur tata kelola, RACI matrix, dan change management |
| [SLA & SLO Definition](./sla-slo.md) | Service level agreements berdasarkan tier layanan |
| [Incident Management](./incident-management.md) | Prosedur respon insiden dan post-mortem |

## Overview

### Struktur Tata Kelola

- **Dewan Teknis (Technical Board)** - Pengambilan keputusan strategis arsitektur dan teknologi
- **Komite Operasional (Operations Committee)** - Koordinasi operasional dan penanganan insiden

### Klasifikasi Layanan

| Tier | Layanan | Availability | RTO | RPO |
|------|---------|--------------|-----|-----|
| **Tier 1** | Emergency Core | 99.9% | 15 min | 5 min |
| **Tier 2** | Auth Service | 99.5% | 1 hour | 15 min |
| **Tier 3** | LMS, CMS | 99% | 4 hours | 1 hour |

### Severitas Insiden

| Severitas | Response Time | Contoh |
|-----------|---------------|--------|
| **SEV-1** | < 15 menit | Panic button tidak bekerja |
| **SEV-2** | < 1 jam | Response time > 2x normal |
| **SEV-3** | < 4 jam | Fitur non-critical down |
| **SEV-4** | Next business day | UI minor bug |

## Quick Links

- [Architecture Documentation](../architecture/)
- [Contributing Guide](../contributing/)
- [Engineering Handbook](../../engineering/handbook.md)

## Support

- **On-call Engineer:** available 24/7 untuk SEV-1 incidents
- **Email:** it-support@kreki.or.id
- **Emergency:** 08888-119-119

---

*Lihat [IT Governance Framework](./it-governance.md) untuk detail lengkap.*
