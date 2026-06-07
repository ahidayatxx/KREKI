# Rencana Pengembangan Standar Data dan Metadata Dashboard KPI INA-CRC

**Status:** DRAFT
**Versi:** 1.0
**Tanggal:** 4 Desember 2025
**Pemilik:** Tim Manajemen Kinerja INA-CRC

---

## 1. Executive Summary

Dokumen ini merencanakan pengembangan standar data dan metadata yang komprehensif untuk Dashboard KPI INA-CRC. Rencana ini didasarkan pada analisis mendalam terhadap dashboard yang ada dan dokumen KPI strategis, dengan tujuan menciptakan sistem monitoring yang terstandardisasi, terintegrasi, dan scalable.

### 1.1 Konteks Analisis
- **Dashboard existing:** HTML-based dengan data statis/hardcoded
- **KPI strategis:** 149 indikator across 5 kategori utama
- **Sumber data:** Multiple sources (INA-CRR, sistem manual, laporan)
- **Kebutuhan:** Real-time monitoring, historical trends, predictive analytics

### 1.2 Tujuan Pengembangan
1. **Standardisasi:** Konsistensi definisi dan pengukuran KPI
2. **Interoperabilitas:** Integrasi dengan multiple sistem
3. **Quality Assurance:** Validasi data dan audit trail
4. **Scalability:** Dukungan untuk ekspansi dan penambahan KPI
5. **Real-time Processing:** Monitoring dan reporting secara real-time

---

## 2. Analisis Gap dan Kebutuhan

### 2.1 Dashboard Current State Analysis

#### Strengths:
- ✅ Desain UI/UX yang baik dan responsive
- ✅ Visualisasi yang komprehensif (charts, tables, cards)
- ✅ Kategorisasi KPI yang jelas (5 kategori strategis)
- ✅ Status indicators dan alerting system
- ✅ Multi-level detail views

#### Gaps Identified:
- ❌ Data statis/hardcoded, tidak terintegrasi dengan live systems
- ❌ Tidak ada standardisasi format data
- ❌ Tidak ada metadata management
- ❌ Tidak ada data validation dan quality controls
- ❌ Tidak ada audit trail untuk perubahan data
- ❌ Tidak ada API untuk data integration
- ❌ Tidak ada versioning untuk KPI definitions

### 2.2 KPI Landscape Analysis

Berdasarkan analisis dokumen KPI:
- **Total KPIs:** 149 indikator
- **Kategori Utama:** 5 kategori strategis
- **Level Hierarki:** 2 level (Strategis Level 1, Proses Level 2)
- **Sumber Data:** 15+ sumber berbeda
- **Frequency Reporting:** Daily, Weekly, Monthly, Quarterly, Annually

#### KPI Categories Breakdown:
1. **Koordinasi & Regulasi** (Bobot: 25%) - 37 KPIs
2. **Implementasi Uji Klinis** (Bobot: 30%) - 45 KPIs
3. **Manajemen Sistem & Data** (Bobot: 20%) - 30 KPIs
4. **Pembinaan Kapasitas** (Bobot: 15%) - 22 KPIs
5. **Dampak & Hasil** (Bobot: 10%) - 15 KPIs

---

## 3. Standar Data Framework

### 3.1 Data Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    INA-CRC KPI Dashboard                  │
├─────────────────────────────────────────────────────────────┤
│  Presentation Layer                                         │
│  ├── Real-time Dashboard                                   │
│  ├── Mobile View                                           │
│  ├── Export Reports                                        │
│  └── Alert System                                          │
├─────────────────────────────────────────────────────────────┤
│  Business Logic Layer                                      │
│  ├── KPI Calculation Engine                                │
│  ├── Data Validation Rules                                 │
│  ├── Aggregation & Roll-up                                 │
│  └── Trend Analysis                                        │
├─────────────────────────────────────────────────────────────┤
│  Data Integration Layer                                    │
│  ├── REST API Gateway                                      │
│  ├── Data Transformation Services                          │
│  ├── Scheduled Jobs                                        │
│  └── Event Processing                                      │
├─────────────────────────────────────────────────────────────┤
│  Data Storage Layer                                        │
│  ├── Operational Data Store                                │
│  ├── Historical Data Warehouse                             │
│  ├── Metadata Repository                                   │
│  └── Configuration Store                                   │
├─────────────────────────────────────────────────────────────┤
│  Data Sources                                              │
│  ├── INA-CRR System                                        │
│  ├── CRU Management Systems                                │
│  ├── Financial Systems                                     │
│  ├── HR Training Systems                                   │
│  ├── Manual Data Input                                     │
│  └── External APIs                                         │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Data Standards Definition

#### 3.2.1 Core Data Entities

**A. KPI Definition Entity**
```json
{
  "kpi_id": "string (UUID)",
  "kpi_code": "string (INACRC-KPI-XXX)",
  "kpi_name": "string",
  "kpi_description": "text",
  "category": "enum [KOORDINASI, IMPLEMENTASI, SISTEM, KAPASITAS, DAMPAK]",
  "subcategory": "string",
  "level": "enum [STRATEGIC, OPERATIONAL]",
  "unit": "enum [PERCENTAGE, COUNT, DAYS, SCORE, CURRENCY]",
  "target_type": "enum [MINIMUM, MAXIMUM, EXACT, RANGE]",
  "target_value": "decimal",
  "weight": "decimal (0.0-1.0)",
  "frequency": "enum [DAILY, WEEKLY, MONTHLY, QUARTERLY, ANNUALLY]",
  "data_source": "array of strings",
  "calculation_method": "text",
  "created_date": "datetime",
  "updated_date": "datetime",
  "version": "integer",
  "status": "enum [ACTIVE, INACTIVE, DRAFT]"
}
```

**B. KPI Data Entity**
```json
{
  "kpi_data_id": "string (UUID)",
  "kpi_id": "string (UUID)",
  "period": "date (YYYY-MM-DD)",
  "actual_value": "decimal",
  "target_value": "decimal",
  "achievement_rate": "decimal",
  "trend": "enum [UP, DOWN, STABLE]",
  "trend_percentage": "decimal",
  "status": "enum [EXCELLENT, GOOD, WARNING, CRITICAL]",
  "data_quality_score": "decimal (0.0-1.0)",
  "source_system": "string",
  "raw_data": "json",
  "calculated_at": "datetime",
  "calculated_by": "string",
  "verified_at": "datetime",
  "verified_by": "string",
  "notes": "text"
}
```

**C. Organization Hierarchy Entity**
```json
{
  "org_id": "string (UUID)",
  "org_code": "string",
  "org_name": "string",
  "org_type": "enum [DIREKTORAT, DIVISI, SEKSI, UNIT, CRU]",
  "parent_org_id": "string (UUID)",
  "level": "integer",
  "responsible_person": "string",
  "contact_info": "json",
  "status": "enum [ACTIVE, INACTIVE]"
}
```

#### 3.2.2 Data Quality Standards

**A. Completeness Rules**
- Mandatory fields must be 100% complete
- Optional fields target 95% completeness
- Historical data retention: 5 years active, 10 years archive

**B. Accuracy Rules**
- Numerical precision: 4 decimal places
- Date format: ISO 8601 (YYYY-MM-DDTHH:mm:ssZ)
- Currency: IDR with 2 decimal places
- Percentage: 0.00-100.00 format

**C. Consistency Rules**
- Standardized naming conventions
- Consistent categorization across all KPIs
- Unified period definitions (Monthly = calendar month)

**D. Timeliness Rules**
- Real-time KPIs: < 5 minutes latency
- Daily KPIs: Available by 09:00 next day
- Monthly KPIs: Available by 3rd working day
- Quarterly KPIs: Available by 10th working day

### 3.3 Integration Standards

#### 3.3.1 API Standards

**RESTful API Conventions:**
- Base URL: `https://api.ina-crc.go.id/v1/`
- Authentication: OAuth 2.0 Bearer tokens
- Rate limiting: 1000 requests per minute
- Response format: JSON with standard envelope

**Standard Response Format:**
```json
{
  "success": boolean,
  "data": object|array,
  "metadata": {
    "timestamp": "datetime",
    "request_id": "string",
    "version": "string",
    "total_count": integer,
    "page": integer,
    "per_page": integer
  },
  "errors": array
}
```

#### 3.3.2 Data Exchange Standards

**A. File Formats**
- Primary: JSON (API responses)
- Batch import: CSV (UTF-8, comma-delimited)
- Archive: Parquet (for big data analytics)
- Export: Excel (.xlsx) for user consumption

**B. Data Encryption**
- Transmission: TLS 1.3
- Storage: AES-256 encryption at rest
- PII data: Field-level encryption
- Key management: HSM-backed key rotation

---

## 4. Metadata Framework

### 4.1 Metadata Architecture

#### 4.1.1 Metadata Types

**A. Business Metadata**
- KPI definitions and business rules
- Data ownership and stewardship
- Business glossary and terminology
- Data lineage and transformation rules

**B. Technical Metadata**
- Database schemas and data models
- API specifications and interfaces
- Data formats and encoding standards
- System integration patterns

**C. Operational Metadata**
- Data freshness and update schedules
- Data quality metrics and validation results
- Access logs and usage statistics
- System performance metrics

**D. Governance Metadata**
- Data classification and sensitivity levels
- Retention policies and archival schedules
- Compliance and audit requirements
- Data privacy and security controls

### 4.2 Metadata Schema

#### 4.2.1 Data Asset Metadata

```json
{
  "asset_id": "string (UUID)",
  "asset_name": "string",
  "asset_type": "enum [KPI, DATASET, API, REPORT, DASHBOARD]",
  "description": "text",
  "owner": "string",
  "steward": "string",
  "classification": "enum [PUBLIC, INTERNAL, RESTRICTED, CONFIDENTIAL]",
  "sensitivity": "enum [LOW, MEDIUM, HIGH, CRITICAL]",
  "created_date": "datetime",
  "last_modified": "datetime",
  "version": "string",
  "tags": ["string"],
  "business_terms": ["string"],
  "quality_score": "decimal (0.0-1.0)",
  "lineage": {
    "upstream": ["string"],
    "downstream": ["string"],
    "transformations": ["string"]
  },
  "access_control": {
    "read_roles": ["string"],
    "write_roles": ["string"],
    "admin_roles": ["string"]
  }
}
```

#### 4.2.2 KPI Metadata

```json
{
  "kpi_metadata_id": "string (UUID)",
  "kpi_id": "string (UUID)",
  "business_definition": {
    "purpose": "text",
    "business_question": "text",
    "success_criteria": "text",
    "limitations": "text"
  },
  "data_definition": {
    "numerator": "text",
    "denominator": "text",
    "exclusions": "text",
    "inclusions": "text"
  },
  "calculation_logic": {
    "formula": "text",
    "algorithm": "text",
    "parameters": "json",
    "dependencies": ["string"]
  },
  "quality_definition": {
    "validation_rules": ["string"],
    "quality_thresholds": "json",
    "anomaly_detection": "json"
  },
  "governance": {
    "approval_workflow": "string",
    "review_frequency": "string",
    "change_management": "json",
    "audit_requirements": ["string"]
  }
}
```

### 4.3 Metadata Management

#### 4.3.1 Metadata Lifecycle

1. **Creation:** Automatic capture during data asset creation
2. **Validation:** Business rules validation and approval workflow
3. **Publication:** Metadata repository publishing and search indexing
4. **Maintenance:** Regular updates and version control
5. **Retirement:** Archival and disposal procedures

#### 4.3.2 Metadata Quality

**Completeness Metrics:**
- Mandatory fields: 100% complete
- Optional fields: 90% complete
- Documentation: 85% complete

**Accuracy Metrics:**
- Definition accuracy: 100%
- Contact information accuracy: 95%
- Classification accuracy: 100%

**Currency Metrics:**
- Metadata freshness: < 30 days old
- Update frequency: Real-time for operational, quarterly for strategic

---

## 5. Implementation Roadmap

### 5.1 Phase 1: Foundation (Q1 2026 - 3 months)

#### Sprint 1-2: Infrastructure Setup
- [ ] Database infrastructure provisioning
- [ ] API gateway setup and configuration
- [ ] Metadata repository implementation
- [ ] Development and testing environments

#### Sprint 3-4: Core Data Models
- [ ] KPI definition data model implementation
- [ ] Data validation framework development
- [ ] Basic API endpoints for KPI management
- [ ] Metadata capture automation

#### Sprint 5-6: Integration Layer
- [ ] INA-CRR system integration
- [ ] Data transformation services
- [ ] Scheduled data processing jobs
- [ ] Initial data quality monitoring

**Deliverables Phase 1:**
- ✅ Core data models implemented
- ✅ Basic API framework operational
- ✅ Metadata repository populated
- ✅ INA-CRR integration complete

### 5.2 Phase 2: Data Integration (Q2 2026 - 3 months)

#### Sprint 7-8: System Integrations
- [ ] CRU management systems integration
- [ ] Financial systems data extraction
- [ ] HR training systems connectivity
- [ ] Manual data input interfaces

#### Sprint 9-10: Advanced Features
- [ ] Real-time data processing
- [ ] Advanced data validation rules
- [ ] Anomaly detection algorithms
- [ ] Automated alerting system

#### Sprint 11-12: Quality Assurance
- [ ] Data quality dashboard
- [ ] Audit trail implementation
- [ ] Performance optimization
- [ ] Security testing and hardening

**Deliverables Phase 2:**
- ✅ All major systems integrated
- ✅ Real-time processing operational
- ✅ Data quality monitoring active
- ✅ Security controls implemented

### 5.3 Phase 3: Analytics & Intelligence (Q3 2026 - 3 months)

#### Sprint 13-14: Advanced Analytics
- [ ] Trend analysis algorithms
- [ ] Predictive modeling capabilities
- [ ] What-if analysis features
- [ ] Benchmarking functionality

#### Sprint 15-16: User Experience
- [ ] Enhanced dashboard features
- [ ] Mobile-responsive design
- [ ] Custom report builder
- [ ] Personalization features

#### Sprint 17-18: Governance & Compliance
- [ ] Advanced governance features
- [ ] Compliance reporting automation
- [ ] Audit preparation tools
- [ ] Data lineage visualization

**Deliverables Phase 3:**
- ✅ Advanced analytics operational
- ✅ Enhanced user experience
- ✅ Governance features complete
- ✅ Full compliance capabilities

### 5.4 Phase 4: Optimization & Scale (Q4 2026 - 3 months)

#### Sprint 19-20: Performance Optimization
- [ ] System performance tuning
- [ ] Database optimization
- [ ] Caching strategies implementation
- [ ] Load balancing enhancements

#### Sprint 21-22: Enterprise Features
- [ ] Multi-tenant capabilities
- [ ] Advanced security features
- [ ] Disaster recovery implementation
- [ ] Business continuity planning

#### Sprint 23-24: Knowledge Transfer
- [ ] Documentation completion
- [ ] Training program development
- [ ] Knowledge base creation
- [ ] Handover preparation

**Deliverables Phase 4:**
- ✅ Optimized production system
- ✅ Enterprise-grade features
- ✅ Complete documentation
- ✅ Trained operations team

---

## 6. Technical Specifications

### 6.1 Technology Stack

#### 6.1.1 Backend Technologies
- **Runtime:** Node.js 18+ / Python 3.11+
- **Framework:** Express.js / FastAPI
- **Database:** PostgreSQL 14+ (OLTP), ClickHouse (Analytics)
- **Cache:** Redis 7+
- **Queue:** RabbitMQ / Apache Kafka
- **Search:** Elasticsearch 8+

#### 6.1.2 Frontend Technologies
- **Framework:** React 18+ with TypeScript
- **State Management:** Redux Toolkit / Zustand
- **Charts:** Chart.js 4+ / D3.js
- **UI Library:** Material-UI / Ant Design
- **Build Tool:** Vite / Webpack 5

#### 6.1.3 Infrastructure & DevOps
- **Container:** Docker + Kubernetes
- **CI/CD:** GitLab CI / GitHub Actions
- **Monitoring:** Prometheus + Grafana
- **Logging:** ELK Stack
- **Cloud:** AWS / GovCloud Indonesia

### 6.2 Data Architecture Patterns

#### 6.2.1 Data Ingestion Patterns

**A. Real-time Ingestion**
```python
# Event-driven data processing
@data_ingestion.route('/kpi-data', methods=['POST'])
def process_kpi_data():
    # Validate incoming data
    validation_result = validate_kpi_data(request.json)
    if not validation_result.is_valid:
        return error_response(validation_result.errors)

    # Store raw data
    raw_id = store_raw_data(request.json)

    # Trigger calculation pipeline
    calculate_kpi_values.delay(raw_id)

    return success_response({"processing_id": raw_id})
```

**B. Batch Processing**
```python
# Scheduled batch processing for large datasets
@celery.task
def process_batch_kpi_data():
    # Extract data from source systems
    sources = get_active_data_sources()

    for source in sources:
        raw_data = extract_data(source)
        transformed_data = transform_kpi_data(raw_data)
        validate_and_store(transformed_data)

    # Run aggregations and calculations
    run_kpi_calculations()

    # Update dashboard cache
    refresh_dashboard_cache()
```

#### 6.2.2 Data Validation Framework

```python
class KPIDataValidator:
    def __init__(self, kpi_definition):
        self.kpi_definition = kpi_definition
        self.validation_rules = self._load_validation_rules()

    def validate(self, data_point):
        errors = []

        # Range validation
        if not self._validate_range(data_point.value):
            errors.append("Value out of valid range")

        # Type validation
        if not self._validate_type(data_point.value):
            errors.append("Invalid data type")

        # Business rule validation
        business_errors = self._validate_business_rules(data_point)
        errors.extend(business_errors)

        return ValidationResult(
            is_valid=len(errors) == 0,
            errors=errors,
            quality_score=self._calculate_quality_score(data_point)
        )
```

### 6.3 Security Architecture

#### 6.3.1 Authentication & Authorization
- **Identity Provider:** Active Directory / SSO
- **Authentication:** OAuth 2.0 + OpenID Connect
- **Authorization:** RBAC with fine-grained permissions
- **Session Management:** JWT tokens with refresh mechanism

#### 6.3.2 Data Security
- **Encryption:** AES-256 at rest, TLS 1.3 in transit
- **Data Masking:** Dynamic masking for PII data
- **Audit Logging:** Comprehensive audit trail
- **Access Control:** Attribute-based access control (ABAC)

---

## 7. Governance & Compliance

### 7.1 Data Governance Framework

#### 7.1.1 Roles & Responsibilities

**A. Data Steward**
- Owns KPI definitions and business rules
- Ensures data quality and accuracy
- Approves changes to KPI calculations
- Acts as primary contact for data issues

**B. Data Custodian**
- Manages technical infrastructure
- Implements security controls
- Ensures system availability
- Handles backup and recovery

**C. Data Owner**
- Has authority over data assets
- Approves access requests
- Defines retention policies
- Ensures compliance with regulations

#### 7.1.2 Data Quality Management

**Quality Dimensions:**
- **Completeness:** All required data present
- **Accuracy:** Data correctly represents reality
- **Consistency:** Data consistent across systems
- **Timeliness:** Data available when needed
- **Validity:** Data conforms to defined rules
- **Uniqueness:** No duplicate records

**Quality Metrics:**
```json
{
  "quality_score": 0.95,
  "dimensions": {
    "completeness": 0.98,
    "accuracy": 0.97,
    "consistency": 0.94,
    "timeliness": 0.96,
    "validity": 0.99,
    "uniqueness": 1.0
  },
  "issues": [
    {
      "type": "missing_data",
      "field": "target_value",
      "count": 15,
      "severity": "medium"
    }
  ]
}
```

### 7.2 Compliance Requirements

#### 7.2.1 Regulatory Compliance
- **Kemenkes Regulations:** Health data management standards
- **BPOM Guidelines:** Clinical trial data requirements
- **ISO Standards:** ISO 27001 (Information Security)
- **Government Standards:** SPBE (Sistem Pemerintahan Berbasis Elektronik)

#### 7.2.2 Data Privacy
- **PII Protection:** Personal Identifiable Information encryption
- **Data Minimization:** Collect only necessary data
- **Consent Management:** Explicit consent for data processing
- **Right to Erasure:** Data deletion capabilities

---

## 8. Risk Management

### 8.1 Technical Risks

#### 8.1.1 Data Integration Risks
- **Risk:** Poor data quality from source systems
- **Mitigation:** Comprehensive data validation and cleansing
- **Monitoring:** Real-time data quality dashboard
- **Contingency:** Manual override and correction procedures

#### 8.1.2 System Performance Risks
- **Risk:** Poor dashboard performance with large datasets
- **Mitigation:** Efficient data modeling and caching strategies
- **Monitoring:** Performance metrics and alerting
- **Contingency:** Read replicas and load balancing

#### 8.1.3 Security Risks
- **Risk:** Unauthorized access to sensitive KPI data
- **Mitigation:** Multi-layer security controls and encryption
- **Monitoring:** Security incident monitoring and response
- **Contingency:** Incident response procedures and backup systems

### 8.2 Business Risks

#### 8.2.1 Adoption Risks
- **Risk:** Low user adoption of new dashboard
- **Mitigation:** User-centered design and comprehensive training
- **Monitoring:** Usage analytics and feedback collection
- **Contingency:** Phased rollout and change management

#### 8.2.2 Data Accuracy Risks
- **Risk:** Incorrect KPI calculations leading to wrong decisions
- **Mitigation:** Rigorous testing and validation processes
- **Monitoring:** Audit trails and verification procedures
- **Contingency:** Manual verification and escalation procedures

---

## 9. Success Metrics

### 9.1 Technical Success Metrics

#### 9.1.1 System Performance
- **Dashboard Load Time:** < 3 seconds
- **API Response Time:** < 500ms (95th percentile)
- **System Uptime:** > 99.5%
- **Data Processing Latency:** < 5 minutes for real-time KPIs

#### 9.1.2 Data Quality
- **Data Accuracy:** > 98%
- **Data Completeness:** > 95%
- **Data Timeliness:** 100% within SLA
- **Validation Error Rate:** < 1%

### 9.2 Business Success Metrics

#### 9.2.1 User Adoption
- **Active Users:** > 80% of target users
- **Daily Active Users:** > 60% of total users
- **User Satisfaction:** > 4.0/5.0 score
- **Support Tickets:** < 5 tickets per week

#### 9.2.2 Business Impact
- **Decision Making Speed:** 50% faster KPI access
- **Data-Driven Decisions:** 80% of strategic decisions use dashboard data
- **Cost Savings:** 30% reduction in manual reporting effort
- **Compliance Score:** 100% audit readiness

---

## 10. Conclusion

Pengembangan standar data dan metadata untuk Dashboard KPI INA-CRC merupakan transformasi fundamental dari static reporting menjadi intelligent analytics platform. Rencana ini menyediakan:

### 10.1 Key Benefits
1. **Single Source of Truth:** Centralized, trusted data repository
2. **Real-time Insights:** Immediate visibility into performance metrics
3. **Data Governance:** Comprehensive metadata and quality management
4. **Scalability:** Foundation for future analytics capabilities
5. **Compliance:** Full audit trail and regulatory compliance

### 10.2 Critical Success Factors
1. **Executive Sponsorship:** Strong leadership support and budget allocation
2. **Change Management:** Comprehensive training and communication program
3. **Phased Implementation:** Iterative development with regular feedback
4. **Quality Focus:** Rigorous testing and validation processes
5. **Technical Excellence:** Modern technology stack and best practices

### 10.3 Next Steps
1. **Immediate:** Secure project approval and budget allocation
2. **Week 1-2:** Form core implementation team and secure resources
3. **Week 3-4:** Detailed technical design and vendor selection
4. **Week 5-6:** Begin Phase 1 implementation - Infrastructure setup
5. **Month 2:** Begin core data model development and integration

---

**Document Control:**
- **Version:** 1.0
- **Next Review:** Q1 2026 (Phase 1 completion)
- **Approval Required:** INA-CRC Steering Committee
- **Distribution:** Project Team, Steering Committee, Technical Team

**Prepared by:**
Tim Manajemen Kinerja INA-CRC
Date: 4 December 2025