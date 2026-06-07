# SOP Manajemen Akses Pengguna INA-CRR
**ID:** INACRC-SOP-202
**Versi:** 1.0
**Tanggal Berlaku:** 1 Januari 2026
**Tanggal Tinjau:** 31 Desember 2026
**Disetujui oleh:** Kepala Tim Kerja INA-CRC

---

## 1. TUJUAN
Mendefinisikan level akses dan proses untuk memberikan, mengubah, atau mencabut hak akses ke sistem Indonesia Clinical Research Registry (INA-CRR) berdasarkan prinsip keamanan, kebutuhan pekerjaan, dan prinsip kebutuhan tahu (need-to-know principle).

## 2. RUANG LINGKUP
SOP ini berlaku untuk:
- Semua pengguna sistem INA-CRR (internal dan eksternal)
- System Administrator untuk manajemen akses
- Database Administrator untuk data access control
- Koordinator Unit Kerja untuk approval request
- Kepala Tim Kerja INA-CRC untuk final authorization
- IT Security Officer untuk monitoring dan audit

## 3. DEFINISI
- **Role-Based Access Control (RBAC)**: Sistem kontrol akses berdasarkan peran dan tanggung jawab pengguna
- **Privileged Access**: Akses dengan level tinggi untuk administrative functions
- **User Account**: Identitas digital untuk mengakses sistem INA-CRR
- **Access Rights**: Hak-hak spesifik untuk melakukan operasi tertentu dalam sistem
- **Authentication**: Proses verifikasi identitas pengguna
- **Authorization**: Proses pemberian izin akses ke resources tertentu
- **Audit Trail**: Catatan semua aktivitas akses dan perubahan dalam sistem

## 4. REFERENSI
- ISO 27001:2022 Information Security Management
- ISO 27002:2022 Code of Practice for Information Security Controls
- KMK Nomor 1458 Tahun 2023 tentang Tata Kelola Uji Klinis
- Peraturan Perlindungan Data Pribadi Indonesia
- NIST Cybersecurity Framework
- Best Practice Access Control Management

## 5. TANGGUNG JAWAB

| Peran | Tanggung Jawab |
|-------|----------------|
| **Kepala Tim Kerja INA-CRC** | Menyetujui kebijakan akses, menyetujui high-level access requests |
| **System Administrator** | Mengelola user accounts, implementing access controls, monitoring system security |
| **Database Administrator** | Mengelola database access, implementing data level controls |
| **IT Security Officer** | Monitoring compliance, security assessments, incident response |
| **Koordinator Unit Kerja** | Memverifikasi kebutuhan akses, approving unit-level requests |
| **User Manager** | Managing user lifecycle, access reviews, training coordination |

## 6. ROLES DAN ACCESS LEVELS

### 6.1 System Administrator Roles
| Role | Access Level | Primary Functions |
|-------|--------------|-------------------|
| **Super Admin** | Full | System configuration, user management, security settings |
| **Admin** | High | User account management, system monitoring, backup management |
| **Operator** | Medium | System operations, troubleshooting, routine maintenance |

### 6.2 Database Administrator Roles
| Role | Access Level | Primary Functions |
|-------|--------------|-------------------|
| **DB Admin** | Full | Database configuration, schema changes, performance tuning |
| **DB Operator** | High | Data maintenance, query optimization, backup operations |
| **Data Analyst** | Medium | Data query, reporting, analytics functions |

### 6.3 INA-CRC Staff Roles
| Role | Access Level | Primary Functions |
|-------|--------------|-------------------|
| **Director** | High | Strategic oversight, reports approval, high-level decisions |
| **Unit Coordinator** | High | Unit management, staff supervision, process approval |
| **Senior Officer** | Medium | Trial management, data validation, stakeholder communication |
| **Officer** | Medium | Data entry, routine operations, basic reporting |
| **Junior Officer** | Low | Basic data entry, document upload, information viewing |

### 6.4 External User Roles
| Role | Access Level | Primary Functions |
|-------|--------------|-------------------|
| **Principal Investigator** | Medium | Trial registration, data update, report generation |
| **CRU Administrator** | Medium | Site management, local data entry, status updates |
| **Study Coordinator** | Medium | Trial coordination, data management, communication |
| **Data Manager** | Low | Data entry, basic queries, report viewing |
| **Viewer** | Low | Read-only access untuk specific trials atau reports |

## 7. PROSEDUR MANAJEMEN AKSES

### 7.1 User Account Creation
**Waktu:** 2-5 hari kerja setelah request approval
1. **Requester**:
   - Mengisi User Access Request Form (Lampiran A):
     * Personal information (name, email, phone, employee ID)
     * Job title dan organizational unit
     * Business justification untuk access request
     * Specific role yang dibutuhkan
     * Required system modules dan functions
     * Sponsor/manager approval signature
     * Duration dari access requirement

   - Melengkapi requirements:
     * Valid employee identification atau contract
     * Background check result (jika required)
     * Training completion certificates
     * Confidentiality agreement signed
     * Security awareness training certificate

2. **Koordinator Unit Kerja**:
   - Review access request:
     * Verify business justification appropriateness
     * Confirm role assignment accuracy
     * Check untuk conflicts of interest
     * Validate training completion
     * Ensure compliance dengan principle of least privilege

   - Approve atau reject request:
     * Approved: Forward ke System Administrator
     * Rejected: Return ke requester dengan clear justification
     * Partial: Modify request scope dan return untuk consideration

3. **System Administrator**:
   - Create user account:
     * Generate unique username based on naming convention
     * Create initial strong password (temporary)
     * Assign appropriate role dengan defined access rights
     * Set account expiration date sesuai request
     * Configure MFA (Multi-Factor Authentication)

   - Setup security settings:
     * Account lockout policy (failed attempts threshold)
     * Password complexity requirements
     * Session timeout settings
     * Access time restrictions (jika applicable)
     * Location-based access restrictions (jika applicable)

   - Notification dan onboarding:
     * Send account credentials ke requester melalui secure channel
     * Schedule user training session
     * Provide access policy documentation
     * Set up initial system introduction
     * Record account creation dalam audit log

### 7.2 Access Rights Assignment
**Waktu:** 1-2 hari kerja setelah account creation
1. **System Administrator**:
   - Implement role-based access control:
     * Assign role sesuai approved request
     * Configure specific permissions untuk role tersebut
     * Set data access scope (trials, sites, time periods)
     * Configure function permissions (read, write, delete, admin)
     * Set up reporting access levels

   - Test access configuration:
     * Verify role assignment works correctly
     * Test data access restrictions
     * Validate function permissions
     * Check audit trail functionality
     * Document access matrix dalam access database

2. **Database Administrator**:
   - Configure database-level access:
     * Create database user dengan specific permissions
     * Set up schema access controls
     * Configure row-level security (jika needed)
     * Set up data masking untuk sensitive information
     * Create audit triggers untuk data access monitoring

### 7.3 Access Modification
**Waktu:** 1-3 hari kerja setelah change request
1. **User Manager**:
   - Identify need untuk access modification:
     * Job role change atau promotion
     * Project assignment change
     * Organizational restructuring
     * Security incident response
     * Periodic access review findings

   - Process modification request:
     * Submit Access Change Request Form (Lampiran B)
     * Provide justification untuk changes
     * Get appropriate approvals
     * Document modification reasons
     * Plan transition period

2. **System Administrator**:
   - Implement access modifications:
     * Modify user role assignment
     * Add atau remove specific permissions
     * Update data access scope
     * Configure new security settings
     * Update audit logging configuration

   - Verify modification effectiveness:
     * Test new access rights
     * Confirm old access rights removed
     * Verify audit trail captures changes
     * Document modification details
     * Communicate changes ke user

### 7.4 Access Termination
**Waktu:** Segera (1 hari kerja) setelah termination request
1. **User Manager**:
   - Initiate access termination:
     * Employee resignation atau termination
     * Contract completion atau non-renewal
     * Role change yang eliminates need
     * Security incident atau policy violation
     * Periodic review findings

   - Process termination request:
     * Submit Access Termination Form (Lampiran C)
     * Specify termination effective date
     * List all systems dan data access to be terminated
     * Plan data handover atau archival requirements
     * Get management approval

2. **System Administrator**:
   - Execute access termination:
     * Disable user account immediately
     * Revoke all system access rights
     * Remove dari group memberships
     * Invalidate session tokens dan certificates
     * Archive user account data

   - Post-termination procedures:
     * Generate access termination report
     * Update audit logs dengan termination details
     * Notify system administrators semua affected systems
     * Archive user data sesuai retention policy
     * Verify complete access revocation

### 7.5 Privileged Access Management
**Waktu:** Ongoing dengan periodic review
1. **System Administrator**:
   - Manage privileged access:
     * Maintain least-privilege principle
     * Use just-in-time access untuk critical systems
     * Implement time-bound access untuk temporary needs
     * Require multi-person approval untuk high-risk operations
     * Monitor privileged access usage intensively

2. **IT Security Officer**:
   - Privileged access monitoring:
     * Real-time monitoring dari privileged account activities
     * Alert system untuk suspicious behavior
     * Regular audit dari privileged access logs
     * Compliance check dengan security policies
     * Investigation dari unusual access patterns

### 7.6 Emergency Access Procedures
**Waktu:** Immediate response untuk critical situations
1. **Incident Response Team**:
   - Activate emergency access:
     * Identify critical system access needs
     * Implement temporary emergency procedures
     * Document all emergency access granted
     * Set time limits untuk emergency access
     * Ensure proper documentation dan justification

2. **System Administrator**:
   - Grant emergency access:
     * Create temporary privileged access
     * Implement additional monitoring untuk emergency access
     * Set up automatic access expiration
     * Document emergency access reasons dan duration
     * Escalate ke management untuk critical situations

## 8. SECURITY CONTROLS DAN COMPLIANCE

### 8.1 Authentication Controls
- **Strong Passwords**: Minimum 12 characters dengan complexity requirements
- **Multi-Factor Authentication**: Required untuk all privileged access
- **Password Expiration**: 90-day maximum password age
- **Account Lockout**: Lock after 5 failed attempts untuk 30 minutes
- **Session Management**: Automatic timeout setelah 15 minutes inactivity

### 8.2 Authorization Controls
- **Principle of Least Privilege**: Minimum access necessary untuk job function
- **Separation of Duties**: Critical functions require multiple approvals
- **Access Reviews**: Quarterly review dari user access rights
- **Access Certification**: Annual certification dari access appropriateness
- **Time-Bound Access**: Access expires setelah defined period

### 8.3 Audit dan Monitoring
- **Comprehensive Logging**: All access attempts dan actions logged
- **Real-time Monitoring**: Continuous monitoring untuk suspicious activities
- **Regular Audits**: Monthly access compliance audits
- **Incident Response**: Procedures untuk security incident handling
- **Compliance Reporting**: Regular reports ke management dan regulators

## 9. USER TRAINING DAN AWARENESS

### 9.1 Initial Training
- **System Orientation**: Basic system navigation dan functionality
- **Security Awareness**: Security policies dan best practices
- **Access Rights**: Understanding role limitations dan responsibilities
- **Data Protection**: Proper handling dari sensitive data
- **Incident Reporting**: Procedures untuk reporting security issues

### 9.2 Ongoing Training
- **Annual Refresher**: Updates pada policies dan procedures
- **Security Updates**: New threats dan mitigation techniques
- **Role-Specific Training**: Advanced training untuk privileged users
- **Compliance Training**: Regulatory requirements updates
- **Best Practices**: Sharing dari lessons learned dan improvements

## 10. DOKUMEN TERKAIT
- User Access Request Form (Lampiran A)
- Access Change Request Form (Lampiran B)
- Access Termination Form (Lampiran C)
- Access Matrix dan Role Definitions (Lampiran D)
- Security Policy Framework (Lampiran E)
- SOP-201: Pengelolaan Data INA-CRR
- SOP-203: Pemeliharaan dan Pembaruan Dasbor Kinerja

## 11. PEMANTAUAN DAN EVALUASI

### 11.1 Key Performance Indicators
- Access request processing time: ≤ 3 days kerja
- User compliance rate: ≥ 95%
- Security incident rate: ≤ 2 incidents per tahun
- Access review completion: 100% on schedule
- User satisfaction: ≥ 4.0 dari 5.0

### 11.2 Monitoring Schedule
- **Daily**: Access monitoring, security alerts, failed login attempts
- **Weekly**: Access request processing, account maintenance reviews
- **Monthly**: Security compliance reports, access right reviews
- **Quarterly**: Privileged access reviews, security assessments
- **Annually**: Full access audit, policy review, training assessment

### 11.3 Evaluation Criteria
- Effectiveness dari access controls
- Compliance dengan security policies
- User satisfaction dengan access procedures
- Security incident response effectiveness
- Audit findings dan remediation success

## 12. RISK MANAGEMENT

### 12.1 Access Risks
- **Unauthorized Access**: Users accessing data di luar authority
- **Excessive Access**: Users having more access than necessary
- **Stale Accounts**: Active accounts untuk former employees
- **Privilege Escalation**: Unauthorized privilege increases
- **Password Compromise**: Weak atau stolen credentials

### 12.2 Mitigation Strategies
- **Strong Authentication**: Multi-factor authentication requirements
- **Regular Reviews**: Periodic access reviews dan certifications
- **Automated Controls**: System-enforced access restrictions
- **Monitoring**: Continuous security monitoring dan alerting
- **Training**: Regular security awareness dan compliance training

### 12.3 Incident Response
- **Detection**: Automated detection untuk suspicious access patterns
- **Response**: Immediate response protocols untuk security incidents
- **Containment**: Procedures untuk containing access violations
- **Investigation**: Forensic investigation untuk access breaches
- **Remediation**: Corrective actions untuk prevent future incidents

## 13. LAMPIRAN

### Lampiran A: User Access Request Form Template
### Lampiran B: Access Change Request Form Template
### Lampiran C: Access Termination Form Template
### Lampiran D: Access Matrix dan Role Definitions
### Lampiran E: Security Policy Framework
### Lampiran F: User Training Curriculum
### Lampiran G: Access Review Checklist
### Lampiran H: Alur Proses Manajemen Akses Pengguna (Flowchart)

---

**Riwayat Perubahan:**

| Versi | Tanggal | Perubahan | Disetujui |
|-------|---------|-----------|-----------|
| 1.0 | 01/01/2026 | Pembuatan SOP awal | Kepala Tim Kerja INA-CRC |

---
*Disusun berdasarkan Standar Operasional Prosedur INA-CRC*