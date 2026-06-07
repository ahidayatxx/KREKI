# SOP Pengelolaan Data pada Indonesia Clinical Research Registry (INA-CRR)
**ID:** INACRC-SOP-201
**Versi:** 1.0
**Tanggal Berlaku:** 1 Januari 2026
**Tanggal Tinjau:** 31 Desember 2026
**Disetujui oleh:** Kepala Tim Kerja INA-CRC

---

## 1. TUJUAN
Menetapkan prosedur untuk entri data, validasi, pembaruan, dan pencadangan data pada sistem Indonesia Clinical Research Registry (INA-CRR) untuk memastikan integritas, keamanan, dan ketersediaan data uji klinis nasional yang akurat dan terkini.

## 2. RUANG LINGKUP
SOP ini berlaku untuk:
- Tim Manajemen Sistem INA-CRC
- Database Administrator INA-CRR
- Data Entry Operators dan Validators
- Principal Investigator dan CRU staff
- Quality Assurance Team
- System Administrator dan IT Support
- External stakeholders yang mengakses data INA-CRR

## 3. DEFINISI
- **INA-CRR**: Indonesia Clinical Research Registry, sistem registrasi nasional uji klinis
- **Data Entry**: Proses input data ke sistem INA-CRR
- **Data Validation**: Proses verifikasi accuracy dan completeness data
- **Data Update**: Proses perubahan atau koreksi data yang sudah ada
- **Data Backup**: Proses pencadangan data untuk disaster recovery
- **Data Integrity**: Kehandalan dan konsistensi data selama lifecycle-nya
- **Data Security**: Proteksi data terhadap akses tidak sah atau modifikasi

## 4. REFERENSI
- WHO International Clinical Trials Registry Platform (ICTRP) Requirements
- ICH-GCP E6(R2) Guidelines Section 8.2
- KMK Nomor 1458 Tahun 2023 tentang Tata Kelola Uji Klinis
- ISO 27001 Information Security Management
- ISO 9001:2015 Quality Management System
- Peraturan Perlindungan Data Pribadi Indonesia

## 5. TANGGUNG JAWAB

| Peran | Tanggung Jawab |
|-------|----------------|
| **Kepala Tim Kerja INA-CRC** | Menyetujui prosedur data management, menyetujui kebijakan akses data |
| **Database Administrator** | Mengelola database INA-CRR, memantau performance, melakukan maintenance |
| **Data Entry Operator** | Melakukan input data dengan accuracy, mengikuti SOP dan guidelines |
| **Data Validator** | Memvalidasi data yang telah diinput, mengidentifikasi errors |
| **Quality Assurance** | Melakukan audit data, memverifikasi compliance dengan SOP |
| **System Administrator** | Mengelola sistem infrastructure, security, dan backup systems |
| **CRU Data Coordinator** | Menyiapkan data dari CRU untuk submission ke INA-CRR |

## 6. PROSEDUR

### 6.1 Registrasi Awal Clinical Trial
**Waktu:** 1-3 hari kerja setelah ethical approval
1. **Data Entry Operator**:
   - Membuat new trial record di INA-CRR:
     * Generate Trial Registration Number (TRN): INA-CRR-2026-XXXX
     * Input basic trial information:
       - Trial title dan scientific title
       - Protocol number dan version
       - Principal Investigator dan contact information
       - Sponsor dan funding information
       - Trial phase dan design
       - Target enrollment dan timeline

   - Upload mandatory documents:
     * Trial protocol (approved version)
     * Informed consent template
     * Ethical approval document
     * Investigator's brochure (jika available)
     * Clinical Trial Agreement (CTA)

   - Set initial trial status: "Recruiting" atau "Pre-Recruitment"

### 6.2 Data Entry Procedures
**Waktu:** 1-2 hari kerja per trial
1. **Data Entry Operator**:
   - Mengikuti Data Entry Guidelines (Lampiran A):
     * Input fields sesuai data source dan validation rules
     * Follow standard formats untuk dates, numbers, dan codes
     * Use dropdown menus atau standardized values
     * Complete semua mandatory fields sebelum save
     * Verify data accuracy sebelum submission

   - Quality checks saat entry:
     * Cross-check dengan source documents
     * Verify logical consistency antar fields
     * Check untuk duplicate entries
     * Validate format compliance
     * Ensure completeness dari required information

### 6.3 Data Validation Procedures
**Waktu:** 1-3 hari kerja setelah data entry
1. **Data Validator**:
   - Melakukan comprehensive validation:
     * **Completeness Check**: All required fields terisi
     * **Accuracy Check**: Data sesuai dengan source documents
     * **Consistency Check**: Data konsisten antar sections
     * **Logic Check**: Data combinations make logical sense
     * **Format Check**: Data follows standardized formats

   - Menggunakan Validation Rules (Lampiran B):
     * Field-level validation (format, range, uniqueness)
     * Record-level validation (logic, completeness)
     * Cross-record validation (duplicates, consistency)
     * System-level validation (integrity, security)

   - Document validation results:
     * Validation Report dengan identified issues
     * Correction requests dengan clear descriptions
     * Approval/rejection recommendation
     * Quality score dan compliance rating

### 6.4 Data Update Procedures
**Waktu:** 1-5 hari kerja tergantung pada complexity
1. **CRU Data Coordinator**:
   - Mengidentifikasi need untuk data updates:
     * Trial status changes (recruitment, completion, termination)
     * Protocol amendments atau version updates
     * Site changes atau investigator changes
     * Enrollment updates dan milestones
     * Adverse event reports atau safety updates

   - Menyiapkan update documentation:
     * Change request form (Lampiran C)
     * Supporting documents untuk changes
     * Justification untuk modifications
     * Impact assessment untuk existing data

2. **Data Entry Operator**:
   - Melakukan data updates sesuai approved changes:
     * Modify existing fields dengan proper versioning
     * Add new information atau append records
     * Upload updated documents atau versions
     * Maintain audit trail untuk semua changes
     * Apply change controls untuk critical data

   - Quality assurance untuk updates:
     * Verify changes sesuai change request
     * Validate updated data accuracy
     * Check untuk data integrity issues
     * Ensure proper documentation
     * Test system functionality after updates

### 6.5 Data Maintenance dan Quality Assurance
**Waktu:** Ongoing dan periodic
1. **Database Administrator**:
   - Melakukan regular database maintenance:
     * Index optimization untuk query performance
     * Data consistency checks dan repairs
     * Archive old data sesuai retention policy
     * System performance monitoring
     * Storage capacity management

2. **Quality Assurance**:
   - Melakukan periodic data quality audits:
     * Random sampling dari records untuk accuracy check
     * Compliance audit terhadap SOP requirements
     * Data completeness assessment
     * User access dan security audit
     * Backup dan recovery testing

   - Generate Data Quality Reports:
     * Data accuracy rates dan error frequencies
     * Timeliness dari data entry dan updates
     * System performance metrics
     * User compliance rates
     * Improvement recommendations

### 6.6 Data Backup Procedures
**Waktu:** Daily, weekly, dan sesuai schedule
1. **System Administrator**:
   - Melakukan backup procedures:
     * **Daily Backup**: Incremental backup dari perubahan hari itu
     * **Weekly Backup**: Full backup dari seluruh database
     * **Monthly Backup**: Full backup dengan archiving
     * **Quarterly Backup**: Off-site backup untuk disaster recovery

   - Backup validation procedures:
     * Verify backup completion dan integrity
     * Test restore procedures regularly
     * Maintain backup logs dan documentation
     * Monitor storage capacity dan performance
     * Update disaster recovery plan secara berkala

   - Backup storage requirements:
     * Primary backup: Local secure storage
     * Secondary backup: Off-site secure facility
     * Tertiary backup: Cloud-based storage
     * Encryption untuk semua backup data
     * Access control dan monitoring

### 6.7 Data Access dan Security
**Waktu:** Ongoing dengan regular monitoring
1. **System Administrator**:
   - Mengimplementasikan access control:
     * Role-based access control (RBAC) system
     * User authentication dengan strong passwords
     * Two-factor authentication untuk critical access
     * Session timeout dan automatic logoff
     * Regular access review dan audit

   - Data security measures:
     * Data encryption untuk sensitive information
     * Secure network protocols untuk data transmission
     * Firewall dan intrusion detection systems
     * Regular security vulnerability assessments
     * Incident response procedures untuk security breaches

2. **Database Administrator**:
   - Monitor data access patterns:
     * Login attempts dan user activity logs
     * Data access frequencies dan patterns
     * Unusual access attempts atau anomalies
     * System performance indicators
     * Error rates dan system alerts

### 6.8 Data Reporting dan Analytics
**Waktu:** Sesuai request dan scheduled reporting
1. **Data Analyst**:
   - Generate standard reports:
     * Trial registration statistics
     * Enrollment progress reports
     * Trial status summaries
     * Performance metrics dashboards
     * Compliance dan quality reports

   - Custom data requests:
     * Ad-hoc data analysis requests
     * Research data extraction requests
     * Regulatory reporting requirements
     * Stakeholder information requests
     * Academic collaboration data requests

   - Data visualization dashboards:
     * Real-time trial status monitoring
     * Enrollment trend analysis
     * Performance metrics visualization
     * Geographic distribution maps
     * Regulatory compliance tracking

## 7. DATA STANDARDS DAN FORMATS

### 7.1 Trial Identification
- **Trial Registration Number**: INA-CRR-YYYY-NNNN format
- **Protocol Number**: Standard format dengan version control
- **Secondary ID**: ClinicalTrials.gov identifier atau international registry numbers
- **Universal Trial Number (UTN)**: WHO-assigned unique trial identifier

### 7.2 Date dan Time Formats
- **Date**: YYYY-MM-DD (ISO 8601 standard)
- **Time**: HH:MM:SS (24-hour format, local timezone)
- **DateTime**: YYYY-MM-DDTHH:MM:SS (ISO 8601 with timezone)
- **Duration**: Days, months, years dengan proper formatting

### 7.3 Coding Standards
- **ICD-10**: International Classification of Diseases
- **MedDRA**: Medical Dictionary for Regulatory Activities
- **WHO Drug**: WHO Drug Dictionary untuk medicinal products
- **LOINC**: Logical Observation Identifiers Names and Codes
- **SNOMED CT**: Systematized Nomenclature of Medicine

### 7.4 Document Formats
- **Protocol**: PDF dengan digital signatures
- **Informed Consent**: PDF dengan version control
- **Regulatory Documents**: PDF/A format untuk long-term preservation
- **Images**: DICOM format untuk medical images
- **Data Files**: CSV, XML, atau JSON format dengan proper validation

## 8. DATA QUALITY METRICS

### 8.1 Accuracy Metrics
- **Data Entry Accuracy**: Percentage dari correct entries
- **Validation Success Rate**: Percentage records passing validation
- **Correction Rate**: Frequency dari data corrections
- **Audit Pass Rate**: Compliance dengan quality standards

### 8.2 Completeness Metrics
- **Mandatory Field Completion**: Percentage required fields terisi
- **Document Upload Rate**: Percentage trials dengan complete documents
- **Update Completeness**: Percentage updates dengan complete information
- **Data Set Completeness**: Coverage dari expected data elements

### 8.3 Timeliness Metrics
- **Entry Timeliness**: Average time dari event ke data entry
- **Validation Timeliness**: Average time dari entry ke validation
- **Update Timeliness**: Average time dari change ke update
- **Backup Timeliness**: Compliance dengan backup schedule

## 9. DOKUMEN TERKAIT
- Data Entry Guidelines (Lampiran A)
- Data Validation Rules (Lampiran B)
- Change Request Form Template (Lampiran C)
- Data Backup and Recovery Procedures (Lampiran D)
- System Security Policy (Lampiran E)
- SOP-202: Manajemen Akses Pengguna INA-CRR

## 10. PEMANTAUAN DAN EVALUASI

### 10.1 Key Performance Indicators
- Data accuracy rate: ≥ 99.5%
- Data entry timeliness: ≤ 3 days dari source document
- System uptime: ≥ 99.9%
- Data validation success rate: ≥ 95%
- User satisfaction: ≥ 4.5 dari 5.0

### 10.2 Monitoring Schedule
- **Daily**: System monitoring, backup verification, error tracking
- **Weekly**: Data quality reports, performance metrics review
- **Monthly**: Comprehensive data audits, security assessments
- **Quarterly**: System performance evaluation, capacity planning
- **Annually**: Full system audit, disaster recovery testing

### 10.3 Evaluation Criteria
- Data integrity dan accuracy levels
- System performance dan reliability
- User compliance dengan procedures
- Security dan access control effectiveness
- Backup dan recovery effectiveness

## 11. RISK MANAGEMENT

### 11.1 Data Quality Risks
- **Data Entry Errors**: Mistakes dalam input data
- **Incomplete Data**: Missing atau partial information
- **Inconsistent Data**: Conflicting information antar records
- **Outdated Data**: Information yang tidak current

### 11.2 System Risks
- **System Downtime**: Unavailability dari INA-CRR system
- **Data Corruption**: Damage atau loss dari data integrity
- **Security Breaches**: Unauthorized access atau data theft
- **Capacity Issues**: Insufficient storage atau processing capacity

### 11.3 Operational Risks
- **User Errors**: Mistakes oleh system users
- **Process Failures**: Breakdowns dalam established procedures
- **Resource Constraints**: Limited staff atau technical resources
- **External Threats**: Cyber attacks atau natural disasters

## 12. BUSINESS CONTINUITY DAN DISASTER RECOVERY

### 12.1 Backup Procedures
- **Real-time Replication**: Continuous data synchronization
- **Scheduled Backups**: Regular backup sesuai retention schedule
- **Off-site Storage**: Secure off-site backup facilities
- **Cloud Backup**: Redundant cloud-based backup solutions

### 12.2 Recovery Procedures
- **Recovery Time Objective (RTO)**: Target untuk system restoration
- **Recovery Point Objective (RPO)**: Maximum acceptable data loss
- **Failover Systems**: Alternative systems untuk critical functions
- **Communication Plan**: Procedures untuk stakeholder communication

### 12.3 Testing Procedures
- **Monthly**: Backup verification tests
- **Quarterly**: Partial system recovery tests
- **Annually**: Full disaster recovery simulation
- **Regular**: Security breach response drills

## 13. LAMPIRAN

### Lampiran A: Data Entry Guidelines dan Field Specifications
### Lampiran B: Data Validation Rules dan Quality Check Procedures
### Lampiran C: Change Request Form Template
### Lampiran D: Data Backup dan Recovery Procedures
### Lampiran E: System Security Policy dan Access Control Matrix
### Lampiran F: Data Quality Report Template
### Lampiran G: User Training dan Competency Assessment
### Lampiran H: Alur Proses Pengelolaan Data INA-CRR (Flowchart)

---

**Riwayat Perubahan:**

| Versi | Tanggal | Perubahan | Disetujui |
|-------|---------|-----------|-----------|
| 1.0 | 01/01/2026 | Pembuatan SOP awal | Kepala Tim Kerja INA-CRC |

---
*Disusun berdasarkan Standar Operasional Prosedur INA-CRC*