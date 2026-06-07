# KPI Manajemen Sistem dan Data (INACRC-SOP-201 hingga 203)
**Versi:** 1.0
**Tanggal:** 27 November 2025
**Pemilik:** Tim Manajemen Sistem & Data

---

## 📋 Executive Summary

KPI Manajemen Sistem dan Data mengukur performa, keamanan, dan kualitas dari Indonesia Clinical Research Registry (INA-CRR) serta sistem pendukung lainnya. KPI dirancang untuk memastikan ketersediaan sistem, integritas data, dan efisiensi operasional.

**Target Pencapaian Overall:** 90% KPI tercapai pada akhir 2026

---

## 🎯 KPI per Area Sistem

### SOP-201: Pengelolaan Data INA-CRR (Bobot: 35%)

| KPI | Definisi | Target 2025 | Target 2026 | Sumber Data | Frequency |
|-----|----------|--------------|--------------|-------------|-----------|
| Akurasi Data Entry | % data entry yang benar pada input pertama | 95% | 98% | Data Validation System | Harian |
| Kelengkapan Data | % field wajib yang terisi lengkap | 90% | 96% | Completeness Check | Mingguan |
| Waktu Update Data | Rata-rata waktu dari perubahan hingga update di sistem | ≤24 jam | ≤12 jam | Update Log | Harian |
| Volume Data Harian | Jumlah transaksi data per hari | 1,000 transaksi | 2,500 transaksi | Transaction Log | Harian |
| Kualitas Data Cleansing | Score kualitas proses data cleansing (scale 1-5) | 4.0 | 4.5 | QA Review | Mingguan |
| Jumlah Duplicate Records | Jumlah record duplikat yang terdeteksi | ≤1% dari total | ≤0.5% dari total | Duplicate Detection | Mingguan |
| Waktu Respon Query Database | Rata-rata waktu respon query kompleks | ≤5 detik | ≤3 detik | Performance Monitoring | Harian |
| Tingkat Kepatuhan Format Data | % data yang mengikuti format standar | 92% | 97% | Format Validation | Mingguan |

### SOP-202: Manajemen Akses Pengguna INA-CRR (Bobot: 30%)

| KPI | Definisi | Target 2025 | Target 2026 | Sumber Data | Frequency |
|-----|----------|--------------|--------------|-------------|-----------|
| Waktu Provisioning Akun | Rata-rata waktu dari request hingga akun aktif | ≤48 jam | ≤24 jam | Account Management System | Harian |
| Tingkat Kepatuhan Password Policy | % akun yang mengikuti password policy | 85% | 95% | Security Audit | Bulanan |
| Jumlah Akses Tak Wajar | % aktivitas akses yang mencurigakan | ≤2% dari total | ≤0.5% dari total | Security Monitoring | Harian |
| Waktu Respon Reset Password | Rata-rata waktu dari request hingga password reset | ≤1 jam | ≤30 menit | Help Desk System | Harian |
| Tingkat Multi-Factor Authentication (MFA) | % akun yang mengaktifkan MFA | 70% | 90% | MFA Adoption Tracking | Mingguan |
| Jumlah Failed Login Attempts | Rata-rata attempt gagal per hari | ≤5 per akun | ≤2 per akun | Authentication Log | Harian |
| Waktu Deprovisioning Akun | Rata-rata waktu dari termination request hingga akun non-aktif | ≤8 jam | ≤4 jam | Account Management | Harian |
| Kepatuhan Principle of Least Privilege | % akun dengan akses minimal yang diperlukan | 80% | 90% | Access Review | Triwulanan |

### SOP-203: Pemeliharaan dan Pembaruan Dashboard Kinerja (Bobot: 35%)

| KPI | Definisi | Target 2025 | Target 2026 | Sumber Data | Frequency |
|-----|----------|--------------|--------------|-------------|-----------|
| Uptime Dashboard | % ketersediaan dashboard | 99% | 99.8% | System Monitoring | Harian |
| Waktu Loading Dashboard | Rata-rata waktu loading halaman pertama | ≤4 detik | ≤2 detik | Performance Monitoring | Harian |
| Jumlah Dashboard Users | Total pengguna aktif dashboard | 300 pengguna | 800 pengguna | User Analytics | Mingguan |
| Tingkat Adopsi Dashboard | % stakeholder yang menggunakan dashboard | 60% | 85% | Adoption Tracking | Mingguan |
| Akurasi Data Real-time | % data yang up-to-date dalam 5 menit | 85% | 95% | Real-time Monitoring | Harian |
| Jumlah Error per 1,000 Page Views | Rata-rata error rate | ≤2 | ≤1 | Error Tracking | Harian |
| Kepuasan Pengguna Dashboard | Score kepuasan pengguna (scale 1-5) | 4.0/5.0 | 4.6/5.0 | User Satisfaction Survey | Triwulanan |
| Waktu Refresh Data | Rata-rata waktu untuk refresh data di dashboard | ≤30 detik | ≤15 detik | Refresh Performance | Mingguan |
| Jumlah Custom Report Requests | Jumlah permintaan report kustom yang berhasil dipenuhi | 80% | 95% | Request Tracking | Bulanan |

---

## 📊 Metrik Agregat Sistem

### System Performance Index
- **Formula:** (Akurasi Data × Uptime × Kepatuhan Akses) / 3
- **Target 2025:** 85%
- **Target 2026:** 92%

### Data Quality Score
- **Formula:** (Kelengkapan × Akurasi × Konsistensi) / 3
- **Target 2025:** 87%
- **Target 2026:** 94%

### User Experience Index
- **Formula:** (Loading Time × Adopsi × Kepuasan) / 3
- **Target 2025:** 75%
- **Target 2026:** 88%

---

## 🎯 Target Pencapaian 2025-2026

### Q4 2025 (System Stabilization)
- System Performance Index: 75%
- Data Quality Score: 80%
- User Experience Index: 65%

### Q1 2026 (Optimization)
- System Performance Index: 82%
- Data Quality Score: 87%
- User Experience Index: 75%

### Q2 2026 (Enhancement)
- System Performance Index: 88%
- Data Quality Score: 91%
- User Experience Index: 82%

### Q3 2026 (Excellence)
- System Performance Index: 92%
- Data Quality Score: 94%
- User Experience Index: 88%

### Q4 2026 (Leadership)
- System Performance Index: 95%
- Data Quality Score: 96%
- User Experience Index: 92%

---

## 📋 Technical Metrics & SLA

### System Performance SLA
| Metric | SLA Target | Current | Trend | Alert Threshold |
|--------|--------------|----------|--------|-----------------|
| Database Response Time | <3 detik | 2.8s | Improving | >5 detik |
| Page Load Time | <4 detik | 3.7s | Improving | >8 detik |
| System Uptime | >99% | 98.7% | Stable | <95% |
| Data Sync Latency | <5 menit | 6.2m | Improving | >15 menit |
| Concurrent User Support | 500 users | 420 | Increasing | >450 users |

### Data Quality Metrics
| Metric | Target | Current | Trend | Action Required |
|--------|--------|----------|--------|----------------|
| Data Entry Accuracy | >95% | 93.2% | Improving | <90% |
| Field Completeness | >90% | 87.5% | Improving | <85% |
| Format Compliance | >92% | 89.3% | Improving | <85% |
| Duplicate Detection | <1% | 1.8% | Stable | >2% |
| Validation Pass Rate | >80% | 76.4% | Improving | <70% |

### Security Metrics
| Metric | Target | Current | Trend | Alert Threshold |
|--------|--------|----------|--------|-----------------|
| Failed Login Rate | <5% | 3.2% | Stable | >8% |
| MFA Adoption | >70% | 68.5% | Improving | <50% |
| Access Violations | <1% | 0.8% | Stable | >2% |
| Password Strength Score | >4.0 | 3.8 | Improving | <3.0 |
| Security Incident Response | <1 jam | 45m | Stable | >2 jam |

---

## 📋 Sumber Data & Metodologi

### Monitoring Tools
1. **Application Performance Monitoring (APM):** Real-time system performance
2. **Database Monitoring:** Query performance dan resource utilization
3. **User Analytics:** Behavior tracking dan usage patterns
4. **Security Information and Event Management (SIEM):** Security monitoring
5. **Data Quality Tools:** Automated validation dan cleansing
6. **Help Desk System:** Support ticket tracking

### Data Collection Methods
- **Automated Monitoring:** Real-time tracking dari semua metrics
- **User Feedback:** Regular surveys dan feedback collection
- **System Audits:** Periodik security dan performance audits
- **Benchmark Testing:** Load testing dan performance testing
- **Error Tracking:** Comprehensive error logging dan analysis

---

## ⚠️ Critical Risk Areas

### Technical Risks
1. **System Downtime:** Unavailability yang menghentikan operasi
2. **Performance Degradation:** Waktu respons yang lambat mempengaruhi produktivitas
3. **Data Corruption:** Kerusakan atau kehilangan data
4. **Security Breach:** Akses tidak sah ke sistem atau data
5. **Capacity Issues:** Resource tidak mencukupi untuk load yang meningkat

### Operational Risks
1. **User Adoption Rendah:** Stakeholder tidak menggunakan sistem
2. **Data Quality Issues:** Input data tidak akurat atau tidak lengkap
3. **Poor User Experience:** Interface yang sulit digunakan
4. **Training Gaps:** Pengguna tidak memahami cara menggunakan sistem
5. **Integration Issues:** Tidak adanya integrasi dengan sistem lain

### Mitigation Strategies
1. **High Availability:** Redundant systems dan disaster recovery
2. **Performance Optimization:** Regular tuning dan capacity planning
3. **Data Backup:** Regular backup dengan retention yang memadai
4. **Security Hardening:** Multi-layered security controls
5. **User Training:** Comprehensive training dan support programs
6. **Continuous Monitoring:** 24/7 monitoring dengan alerting

---

## 📈 Continuous Improvement Framework

### Technical Optimization
- **Monthly Performance Review:** System metrics analysis dan optimization
- **Quarterly Capacity Planning:** Resource forecasting dan scaling
- **Annual Technology Refresh:** Hardware dan software updates
- **Continuous Integration/Deployment:** Automated deployment pipelines

### Data Quality Enhancement
- **Daily Data Validation:** Automated quality checks
- **Weekly Data Cleansing:** Regular data improvement
- **Monthly Quality Reports:** Comprehensive quality assessment
- **Annual Data Governance Review:** Policy dan procedure updates

### User Experience Improvement
- **Monthly UX Review:** User feedback analysis dan interface improvement
- **Quarterly Feature Enhancement:** New feature development
- **Annual System Overhaul:** Major system improvements
- **Continuous A/B Testing:** Interface optimization testing

---

## 🎯 Innovation & Future Development

### Technology Roadmap 2026-2027
1. **AI-Powered Data Validation:** Machine learning untuk otomatisasi quality check
2. **Advanced Analytics Dashboard:** Predictive analytics dan forecasting
3. **Mobile Application:** Mobile access untuk field users
4. **API Gateway:** Enhanced API untuk third-party integrations
5. **Blockchain for Data Integrity:** Distributed ledger untuk audit trail

### Performance Targets 2027
- **System Uptime:** 99.9%
- **Page Load Time:** <2 detik
- **Data Accuracy:** 99%
- **User Adoption:** 95%
- **Support Response Time:** <15 menit

---

## 📊 Success Metrics & Achievement Criteria

### Technical Excellence
- **Zero Critical Downtime:** Tidak ada downtime yang terencana >4 jam
- **Sub-Second Response Times:** 95% query di-respon <1 detik
- **100% Data Accuracy:** Zero critical data errors
- **99.9% Uptime:** High availability dengan automatic failover

### User Success
- **90% User Adoption:** 90% target users menggunakan sistem aktif
- **4.5+ Satisfaction Score:** Pengguna sangat puas dengan sistem
- **Self-Service Rate:** 80% issue resolved tanpa intervention help desk
- **Training Completion:** 100% user training completion rate

### Operational Excellence
- **Cost per Transaction:** 50% reduction dari baseline
- **Automation Rate:** 80% proses otomatis
- **Integration Coverage:** 90% stakeholder systems terintegrasi
- **Compliance Score:** 100% kepatuhan terhadap standar yang berlaku

---

*Riwayat Perubahan:*

| Versi | Tanggal | Perubahan | Disetujui |
|-------|---------|-----------|-----------|
| 1.0 | 27/11/2025 | Pembuatan KPI sistem & data awal | Kepala Manajemen Sistem |

---
*Disusun berdasarkan SOP-201 hingga SOP-203 INA-CRC*