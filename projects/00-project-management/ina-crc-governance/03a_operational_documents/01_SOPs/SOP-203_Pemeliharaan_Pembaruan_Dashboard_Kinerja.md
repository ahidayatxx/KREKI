# SOP Pemeliharaan dan Pembaruan Dashboard Kinerja
**ID:** INACRC-SOP-203
**Versi:** 1.0
**Tanggal Berlaku:** 1 Januari 2026
**Tanggal Tinjau:** 31 Desember 2026
**Disetujui oleh:** Kepala Tim Kerja INA-CRC

---

## 1. TUJUAN
Menetapkan jadwal dan prosedur untuk memperbarui data dan fungsionalitas dasbor monitoring kinerja INA-CRC untuk memastikan ketersediaan informasi real-time yang akurat, relevan, dan dapat diandalkan bagi pengambilan keputusan manajerial dan stakeholder eksternal.

## 2. RUANG LINGKUP
SOP ini berlaku untuk:
- Dashboard Kinerja INA-CRC (real-time dan historical)
- Tim Pengembangan Sistem INA-CRC
- Database Administrator dan Data Analyst
- Koordinator Unit Kerja (data providers)
- Management Team dan Decision Makers
- External Stakeholders yang mengakses dashboard

## 3. DEFINISI
- **Dashboard Kinerja**: Visualisasi data interaktif untuk monitoring KPI dan metrik kinerja
- **Real-time Data**: Data yang diperbarui secara otomatis saat terjadi perubahan
- **Data Refresh**: Proses memperbarui data dalam dashboard
- **Performance Metrics**: Indikator kuantitatif untuk mengukur kinerja
- **Key Performance Indicators (KPIs)**: Metrik strategis yang penting bagi organisasi
- **Data Visualization**: Representasi visual dari data untuk memudahkan interpretasi

## 4. REFERENSI
- Best Practice Dashboard Design Principles
- Data Visualization Guidelines (Edward Tufte)
- KMK Nomor 1458 Tahun 2023 tentang Tata Kelola Uji Klinis
- ISO 9001:2015 Quality Management System
- ITIL Service Operation Framework
- Business Intelligence Best Practices

## 5. TANGGUNG JAWAB

| Peran | Tanggung Jawab |
|-------|----------------|
| **Kepala Tim Kerja INA-CRC** | Menyetujui KPIs, menyetujui perubahan dashboard, menentukan priority requirements |
| **Dashboard Manager** | Mengelola dashboard development, maintenance, dan updates |
| **Data Analyst** | Mengembangkan visualisasi, menganalisis data trends, membuat reports |
| **Database Administrator** | Memastikan data availability, performance, dan security |
| **Koordinator Unit Kerja** | Menyediakan unit data, memvalidasi accuracy, memberikan feedback |
| **System Administrator** | Memelihara sistem infrastructure, performance monitoring, backup |

## 6. JENIS DASHBOARD DAN UPDATE SCHEDULE

### 6.1 Executive Dashboard
**Update Frequency:** Real-time (daily summary), Weekly detailed
**Target Audience:** Kepala Tim Kerja, Steering Committee, Management
**Key Metrics:**
- Total trials registered dan active
- Trial status distribution (recruiting, completed, terminated)
- Enrollment progress vs target
- Timeline adherence rate
- Budget utilization
- Stakeholder satisfaction scores

**Update Schedule:**
- **Real-time**: Trial registration and status changes
- **Daily**: Summary performance metrics at 18:00 WIB
- **Weekly**: Detailed analytics setiap hari Senin pukul 09:00 WIB
- **Monthly**: Comprehensive performance review pada minggu pertama

### 6.2 Operational Dashboard
**Update Frequency:** Real-time critical, Hourly operational
**Target Audience:** Koordinator Unit, Operations Team, CRU Staff
**Key Metrics:**
- Trial application processing times
- Ethics approval timelines
- Regulatory approval rates
- Site activation progress
- Data entry accuracy rates
- Issue resolution times

**Update Schedule:**
- **Real-time**: Critical operational events
- **Hourly**: Processing queue status dan performance
- **Daily**: End-of-day operational summary
- **Weekly**: Operational efficiency analysis

### 6.3 Stakeholder Dashboard
**Update Frequency:** Weekly, Monthly as requested
**Target Audience:** Sponsors, CRU Partners, Government Agencies
**Key Metrics:**
- Trial opportunities by therapeutic area
- Site capability assessments
- Regulatory approval trends
- Collaboration opportunities
- Performance benchmarks
- Success stories dan achievements

**Update Schedule:**
- **Weekly**: Trial opportunity updates
- **Monthly**: Comprehensive stakeholder metrics
- **Quarterly**: Industry benchmark analysis
- **Annually**: Year-in-review performance summary

### 6.4 Quality Dashboard
**Update Frequency:** Daily for critical, Weekly for comprehensive
**Target Audience:** Quality Assurance, Compliance Team, Auditors
**Key Metrics:**
- Data accuracy rates
- Protocol compliance scores
- Audit findings and resolutions
- Training completion rates
- Documentation completeness
- Corrective action effectiveness

**Update Schedule:**
- **Daily**: Critical quality metrics
- **Weekly**: Comprehensive quality assessment
- **Monthly**: Quality trend analysis
- **Quarterly**: Quality improvement initiatives

## 7. PROSEDUR PEMELIHARAAN DASHBOARD

### 7.1 Data Collection and Validation
**Waktu:** Daily automated, Weekly manual validation
1. **Database Administrator**:
   - Automated data collection:
     * Extract data dari INA-CRR database menggunakan scheduled queries
     * Transform data sesuai dashboard requirements
     * Load data ke dashboard data warehouse
     * Validate data completeness dan integrity
     * Generate data validation reports

   - Data quality checks:
     * Completeness check untuk mandatory fields
     * Accuracy validation against source systems
     * Consistency check antar related metrics
     * Timeliness verification untuk data refresh
     * Duplicate detection dan removal

2. **Koordinator Unit Kerja**:
   - Manual data validation:
     * Review automated data collection results
     * Validate business rules compliance
     * Identify anomalies atau outliers
     * Confirm accuracy dari calculated metrics
     * Provide feedback pada data issues

### 7.2 Dashboard Refresh Procedures
**Waktu:** Sesuai schedule untuk setiap dashboard type
1. **System Administrator**:
   - Automated refresh execution:
     * Execute data refresh scripts sesuai schedule
     * Monitor refresh process untuk completion
     * Verify data integrity post-refresh
     * Check dashboard functionality after refresh
     * Generate refresh success/failure reports

   - Manual refresh procedures:
     * Execute manual refresh untuk critical updates
     * Handle failed automated refresh processes
     * Implement emergency refresh untuk urgent needs
     * Document all manual refresh activities
     * Analyze root causes dari refresh failures

### 7.3 Performance Monitoring
**Waktu:** Continuous monitoring, Weekly analysis
1. **System Administrator**:
   - Real-time monitoring:
     * Monitor dashboard response times
     * Track database query performance
     * Monitor system resource utilization
     * Check untuk error rates dan failures
     * Alert system untuk performance degradation

2. **Dashboard Manager**:
   - Performance analysis:
     * Analyze user experience metrics
     * Track dashboard adoption rates
     * Monitor data accuracy feedback
     * Analyze feature usage patterns
     * Identify improvement opportunities

### 7.4 Update dan Enhancement Procedures
**Waktu:** Monthly maintenance, Quarterly enhancements
1. **Dashboard Manager**:
   - Regular maintenance:
     * Update data sources untuk new requirements
     * Modify visualizations untuk improved clarity
     * Add new metrics sesuai business needs
     * Remove obsolete atau unused elements
     * Optimize performance bottlenecks

2. **Development Team**:
   - System enhancements:
     * Implement new visualization techniques
     * Add advanced analytics capabilities
     * Improve user interface dan experience
     * Integrate dengan additional data sources
     * Develop mobile responsive features

### 7.5 Testing dan Validation
**Waktu:** Before production deployment
1. **Quality Assurance**:
   - Functional testing:
     * Verify all dashboard components work correctly
     * Test data accuracy dan consistency
     * Validate calculations dan aggregations
     * Check filter dan interaction functionality
     * Test performance under load conditions

   - User acceptance testing:
     * Review dashboard dengan actual users
     * Validate business logic dan calculations
     * Assess usability dan user experience
     * Collect feedback untuk improvements
     * Document testing results dan approval

### 7.6 Release dan Deployment
**Waktu:** Scheduled maintenance windows
1. **System Administrator**:
   - Deployment procedures:
     * Schedule maintenance window dengan user communication
     * Backup current dashboard configuration
     * Deploy new version ke staging environment
     * Perform smoke testing untuk critical functionality
     * Deploy ke production environment
     * Monitor post-deployment performance

   - Post-deployment activities:
     * Validate dashboard functionality
     * Confirm data accuracy dan completeness
     * Monitor system performance dan stability
     * Communicate changes ke stakeholders
     * Document deployment details dan outcomes

## 8. DATA VISUALIZATION STANDARDS

### 8.1 Chart Types dan Usage
- **Line Charts**: Time series data untuk trend analysis
- **Bar Charts**: Comparisons antar categories atau time periods
- **Pie Charts**: Proportion dan percentage distributions
- **Scatter Plots**: Correlation analysis antar variables
- **Heat Maps**: Density analysis dan pattern identification
- **Gauges**: KPI progress towards targets

### 8.2 Design Principles
- **Clarity**: Clear, unambiguous visualizations
- **Accuracy**: True representation dari underlying data
- **Consistency**: Standardized colors, fonts, dan layouts
- **Interactivity**: User-driven filtering dan drill-down capabilities
- **Accessibility**: Color-blind friendly, readable fonts
- **Responsiveness**: Optimized untuk various screen sizes

### 8.3 Color Standards
- **Primary Colors**: INA-CRC brand colors (blue, green)
- **Status Indicators**: Green (good), Yellow (caution), Red (critical)
- **Data Series**: Distinct colors untuk different data series
- **Background**: Light colors untuk better readability
- **Text**: High contrast untuk accessibility

## 9. KPI METRICS DAN TARGETS

### 9.1 Trial Registration Metrics
| KPI | Target | Data Source | Update Frequency |
|-----|--------|-------------|------------------|
| New Trials Registered | 5 per bulan | INA-CRR Database | Real-time |
| Registration Processing Time | ≤ 3 days | System Logs | Daily |
| Registration Accuracy Rate | ≥ 99% | Quality Audit | Weekly |
| Trial Activation Rate | 85% per bulan | Operations Data | Weekly |

### 9.2 Operational Efficiency Metrics
| KPI | Target | Data Source | Update Frequency |
|-----|--------|-------------|------------------|
| Average Approval Time | ≤ 60 days | Regulatory Data | Weekly |
| Site Activation Time | ≤ 30 days | Site Data | Weekly |
| Issue Resolution Time | ≤ 5 days | Issue Tracker | Daily |
| Customer Satisfaction | ≥ 4.5/5.0 | Surveys | Monthly |

### 9.3 Quality Compliance Metrics
| KPI | Target | Data Source | Update Frequency |
|-----|--------|-------------|------------------|
| Data Accuracy Rate | ≥ 99.5% | Quality Audit | Weekly |
| Compliance Score | ≥ 95% | Compliance Audit | Monthly |
| Training Completion | 100% staff | HR System | Monthly |
| Audit Pass Rate | 100% | Audit Results | Quarterly |

## 10. USER TRAINING DAN SUPPORT

### 10.1 Initial Training
- **Dashboard Navigation**: Basic navigation dan functionality
- **Data Interpretation**: Understanding charts dan metrics
- **Filtering dan Analysis**: Advanced filtering capabilities
- **Export dan Reporting**: Export functionality dan report generation
- **Troubleshooting**: Common issues dan resolution

### 10.2 Ongoing Support
- **User Manual**: Comprehensive documentation
- **Video Tutorials**: Step-by-step video guides
- **Help Desk**: Dedicated support team
- **Regular Updates**: Communication tentang new features
- **Best Practices**: Tips untuk effective dashboard usage

## 11. DOKUMEN TERKAIT
- Dashboard Configuration Documentation (Lampiran A)
- Data Quality Validation Procedures (Lampiran B)
- Performance Monitoring Templates (Lampiran C)
- User Training Materials (Lampiran D)
- KPI Definition Handbook (Lampiran E)
- SOP-201: Pengelolaan Data INA-CRR
- SOP-202: Manajemen Akses Pengguna INA-CRR

## 12. PEMANTAUAN DAN EVALUASI

### 12.1 Key Performance Indicators
- Dashboard availability: ≥ 99.5%
- Data accuracy rate: ≥ 99.5%
- User satisfaction: ≥ 4.0/5.0
- Refresh success rate: ≥ 99%
- Performance response time: ≤ 3 seconds

### 12.2 Monitoring Schedule
- **Continuous**: System performance dan availability monitoring
- **Daily**: Data refresh success checks
- **Weekly**: Dashboard usage dan performance analysis
- **Monthly**: User feedback collection dan analysis
- **Quarterly**: Comprehensive dashboard effectiveness review

### 12.3 Evaluation Criteria
- Data accuracy dan completeness
- User adoption dan satisfaction
- Performance dan reliability
- Business value dan decision support effectiveness
- Cost-effectiveness dari maintenance operations

## 13. RISK MANAGEMENT

### 13.1 Technical Risks
- **Data Quality Issues**: Inaccurate atau incomplete data
- **System Downtime**: Dashboard unavailability
- **Performance Degradation**: Slow response times
- **Security Breaches**: Unauthorized data access
- **Integration Failures**: Data source connectivity issues

### 13.2 Business Risks
- **Wrong Decisions**: Based pada inaccurate dashboard data
- **User Adoption**: Low usage atau user frustration
- **Compliance Issues**: Non-compliance dengan reporting requirements
- **Reputation Damage**: Poor stakeholder experience
- **Resource Waste**: Inefficient dashboard maintenance

### 13.3 Mitigation Strategies
- **Data Validation**: Comprehensive quality checks dan validation
- **Redundancy**: Backup systems dan failover procedures
- **Performance Monitoring**: Continuous monitoring dan optimization
- **Security Controls**: Access controls dan encryption
- **User Feedback**: Regular user input dan improvement cycles

## 14. CONTINUOUS IMPROVEMENT

### 14.1 User Feedback Loop
- **Surveys**: Regular user satisfaction surveys
- **Usage Analytics**: Dashboard usage pattern analysis
- **Focus Groups**: User feedback sessions
- **Suggestion Box**: Anonymous feedback mechanism
- **Performance Metrics**: Track user engagement metrics

### 14.2 Best Practice Updates
- **Industry Trends**: Keep updated dengan BI best practices
- **Technology Updates**: Adopt new visualization technologies
- **User Experience**: Continuously improve UX design
- **Performance Optimization**: Regular performance tuning
- **Innovation**: Explore new analytics capabilities

## 15. LAMPIRAN

### Lampiran A: Dashboard Configuration Documentation
### Lampiran B: Data Quality Validation Procedures
### Lampiran C: Performance Monitoring Templates
### Lampiran D: User Training Materials
### Lampiran E: KPI Definition Handbook
### Lampiran F: Dashboard Maintenance Schedule
### Lampiran G: Incident Response Procedures
### Lampiran H: Alur Proses Pemeliharaan Dashboard Kinerja (Flowchart)

---

**Riwayat Perubahan:**

| Versi | Tanggal | Perubahan | Disetujui |
|-------|---------|-----------|-----------|
| 1.0 | 01/01/2026 | Pembuatan SOP awal | Kepala Tim Kerja INA-CRC |

---
*Disusun berdasarkan Standar Operasional Prosedur INA-CRC*