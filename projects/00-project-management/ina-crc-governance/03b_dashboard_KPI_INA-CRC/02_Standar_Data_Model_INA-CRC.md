# Standar Data Model INA-CRC Dashboard KPI

**Status:** DRAFT
**Versi:** 1.0
**Tanggal:** 4 Desember 2025
**Pemilik:** Tim Data Architecture INA-CRC

---

## 1. Overview

Dokumen ini mendefinisikan standar data model komprehensif untuk Dashboard KPI INA-CRC. Model ini dirancang untuk mendukung 149 indikator KPI across 5 kategori strategis dengan memastikan konsistensi, integritas, dan skalabilitas data.

### 1.1 Design Principles
1. **Normalization:** Menghindari redundansi data dan memastikan konsistensi
2. **Scalability:** Dapat menangani pertumbuhan data dan kompleksitas bisnis
3. **Performance:** Dioptimalkan untuk query dan reporting yang cepat
4. **Auditability:** Mendukung audit trail dan tracking perubahan
5. **Extensibility:** Mudah ditambahkan KPI baru tanpa mengubah struktur existing

### 1.2 Architecture Overview
```
┌─────────────────────────────────────────────────────────────┐
│                    Application Layer                        │
├─────────────────────────────────────────────────────────────┤
│                    Business Logic Layer                     │
│  ├── KPI Calculation Engine                                │
│  ├── Data Validation Services                              │
│  ├── Aggregation & Roll-up                                 │
│  └── Business Rules Engine                                 │
├─────────────────────────────────────────────────────────────┤
│                    Data Access Layer                        │
│  ├── ORM / Query Builder                                   │
│  ├── Caching Layer                                         │
│  ├── API Gateway                                           │
│  └── Data Transformation                                   │
├─────────────────────────────────────────────────────────────┤
│                    Data Storage Layer                       │
│  ├── OLTP Database (Transactional)                         │
│  │   ├── Master Data                                       │
│  │   ├── Transaction Data                                  │
│  │   ├── Configuration Data                                │
│  │   └── Metadata Repository                               │
│  ├── OLAP Database (Analytical)                            │
│  │   ├── Aggregated Data                                   │
│  │   ├── Historical Trends                                 │
│  │   └── Pre-calculated Metrics                            │
│  └── Data Lake                                             │
│      ├── Raw Data Ingestion                                │
│      ├── Semi-structured Data                              │
│      └── Archive Storage                                   │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Core Data Model

### 2.1 Master Data Models

#### 2.1.1 Organization Hierarchy

**Table: organizations**
```sql
CREATE TABLE organizations (
    org_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_code VARCHAR(20) UNIQUE NOT NULL,
    org_name VARCHAR(200) NOT NULL,
    org_name_id VARCHAR(200),
    org_type VARCHAR(50) NOT NULL, -- DIREKTORAT, DIVISI, SEKSI, UNIT, CRU
    parent_org_id UUID REFERENCES organizations(org_id),
    hierarchy_level INTEGER NOT NULL,
    hierarchy_path TEXT, -- /1/2/3/ format for easy querying
    responsible_person_id UUID REFERENCES persons(person_id),
    description TEXT,
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    address TEXT,
    province VARCHAR(100),
    city VARCHAR(100),
    postal_code VARCHAR(10),
    is_active BOOLEAN DEFAULT true,
    effective_date DATE DEFAULT CURRENT_DATE,
    expiry_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES users(user_id),
    updated_by UUID REFERENCES users(user_id),

    CONSTRAINT chk_org_type CHECK (org_type IN ('DIREKTORAT', 'DIVISI', 'SEKSI', 'UNIT', 'CRU', 'EXTERNAL')),
    CONSTRAINT chk_hierarchy_level CHECK (hierarchy_level > 0),
    CONSTRAINT chk_dates CHECK (expiry_date IS NULL OR expiry_date > effective_date)
);

-- Indexes for performance
CREATE INDEX idx_organizations_org_code ON organizations(org_code);
CREATE INDEX idx_organizations_org_type ON organizations(org_type);
CREATE INDEX idx_organizations_parent_org_id ON organizations(parent_org_id);
CREATE INDEX idx_organizations_hierarchy_path ON organizations USING GIN(to_tsvector('id', hierarchy_path));
CREATE INDEX idx_organizations_is_active ON organizations(is_active);
```

#### 2.1.2 Persons Directory

**Table: persons**
```sql
CREATE TABLE persons (
    person_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id VARCHAR(50) UNIQUE,
    nik VARCHAR(20) UNIQUE,
    full_name VARCHAR(255) NOT NULL,
    title VARCHAR(100),
    position VARCHAR(200),
    org_id UUID REFERENCES organizations(org_id),
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(50),
    mobile VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    CONSTRAINT chk_dates CHECK (end_date IS NULL OR end_date > start_date)
);

CREATE INDEX idx_persons_employee_id ON persons(employee_id);
CREATE INDEX idx_persons_org_id ON persons(org_id);
CREATE INDEX idx_persons_is_active ON persons(is_active);
CREATE INDEX idx_persons_full_name ON persons USING GIN(to_tsvector('id', full_name));
```

#### 2.1.3 KPI Definition Framework

**Table: kpi_categories**
```sql
CREATE TABLE kpi_categories (
    category_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_code VARCHAR(20) UNIQUE NOT NULL,
    category_name VARCHAR(200) NOT NULL,
    category_name_id VARCHAR(200),
    description TEXT,
    parent_category_id UUID REFERENCES kpi_categories(category_id),
    level INTEGER NOT NULL DEFAULT 1,
    weight DECIMAL(5,2) DEFAULT 0.0, -- Bobot dalam perhitungan overall
    display_order INTEGER DEFAULT 0,
    color_code VARCHAR(7), -- Hex color code for UI
    icon_name VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_weight CHECK (weight >= 0 AND weight <= 100),
    CONSTRAINT chk_level CHECK (level > 0)
);

CREATE INDEX idx_kpi_categories_category_code ON kpi_categories(category_code);
CREATE INDEX idx_kpi_categories_parent_id ON kpi_categories(parent_category_id);
CREATE INDEX idx_kpi_categories_is_active ON kpi_categories(is_active);
```

**Table: kpi_definitions**
```sql
CREATE TABLE kpi_definitions (
    kpi_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    kpi_code VARCHAR(30) UNIQUE NOT NULL,
    kpi_name VARCHAR(500) NOT NULL,
    kpi_name_id VARCHAR(500),
    category_id UUID NOT NULL REFERENCES kpi_categories(category_id),
    subcategory VARCHAR(200),
    description TEXT,
    description_id TEXT,
    business_question TEXT, -- What business question does this KPI answer?
    success_criteria TEXT,
    level VARCHAR(20) NOT NULL, -- STRATEGIC, OPERATIONAL
    unit VARCHAR(30) NOT NULL, -- PERCENTAGE, COUNT, DAYS, SCORE, CURRENCY, RATIO
    target_type VARCHAR(20) NOT NULL, -- MINIMUM, MAXIMUM, EXACT, RANGE
    baseline_value DECIMAL(15,4),
    target_value_2025 DECIMAL(15,4),
    target_value_2026 DECIMAL(15,4),
    target_value_2027 DECIMAL(15,4),
    target_value_2028 DECIMAL(15,4),
    target_value_2029 DECIMAL(15,4),
    weight DECIMAL(5,2) DEFAULT 0.0, -- Bobot dalam kategori
    frequency VARCHAR(20) NOT NULL, -- DAILY, WEEKLY, MONTHLY, QUARTERLY, ANNUALLY
    data_sources JSONB, -- Array of source system configurations
    calculation_method TEXT,
    formula TEXT,
    numerator_definition TEXT,
    denominator_definition TEXT,
    inclusions TEXT,
    exclusions TEXT,
    validation_rules JSONB,
    data_quality_threshold DECIMAL(5,2) DEFAULT 0.95,
    responsible_org_id UUID REFERENCES organizations(org_id),
    accountable_person_id UUID REFERENCES persons(person_id),
    approval_workflow JSONB,
    is_mandatory BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    effective_date DATE DEFAULT CURRENT_DATE,
    expiry_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES users(user_id),
    updated_by UUID REFERENCES users(user_id),

    CONSTRAINT chk_kpi_code_format CHECK (kpi_code ~ '^INACRC-KPI-\d{3}$'),
    CONSTRAINT chk_level CHECK (level IN ('STRATEGIC', 'OPERATIONAL')),
    CONSTRAINT chk_unit CHECK (unit IN ('PERCENTAGE', 'COUNT', 'DAYS', 'SCORE', 'CURRENCY', 'RATIO', 'HOURS', 'MINUTES')),
    CONSTRAINT chk_target_type CHECK (target_type IN ('MINIMUM', 'MAXIMUM', 'EXACT', 'RANGE')),
    CONSTRAINT chk_frequency CHECK (frequency IN ('DAILY', 'WEEKLY', 'MONTHLY', 'QUARTERLY', 'ANNUALLY')),
    CONSTRAINT chk_weight CHECK (weight >= 0 AND weight <= 100),
    CONSTRAINT chk_dates CHECK (expiry_date IS NULL OR expiry_date > effective_date)
);

-- Comprehensive indexes
CREATE INDEX idx_kpi_definitions_kpi_code ON kpi_definitions(kpi_code);
CREATE INDEX idx_kpi_definitions_category_id ON kpi_definitions(category_id);
CREATE INDEX idx_kpi_definitions_level ON kpi_definitions(level);
CREATE INDEX idx_kpi_definitions_frequency ON kpi_definitions(frequency);
CREATE INDEX idx_kpi_definitions_is_active ON kpi_definitions(is_active);
CREATE INDEX idx_kpi_definitions_responsible_org ON kpi_definitions(responsible_org_id);
CREATE INDEX idx_kpi_definitions_fulltext ON kpi_definitions USING GIN(to_tsvector('id', kpi_name || ' ' || COALESCE(description, '')));
CREATE INDEX idx_kpi_definitions_data_sources ON kpi_definitions USING GIN(data_sources);
```

### 2.2 Transactional Data Models

#### 2.2.1 KPI Data Points

**Table: kpi_data_points**
```sql
CREATE TABLE kpi_data_points (
    data_point_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    kpi_id UUID NOT NULL REFERENCES kpi_definitions(kpi_id),
    org_id UUID REFERENCES organizations(org_id), -- For organizational breakdown
    period_type VARCHAR(20) NOT NULL, -- DAILY, WEEKLY, MONTHLY, QUARTERLY, ANNUAL
    period_start_date DATE NOT NULL,
    period_end_date DATE NOT NULL,
    actual_value DECIMAL(20,4) NOT NULL,
    target_value DECIMAL(20,4),
    achievement_rate DECIMAL(10,4), -- actual/target * 100
    variance DECIMAL(20,4), -- actual - target
    variance_percentage DECIMAL(10,4),
    trend VARCHAR(20), -- UP, DOWN, STABLE, UNKNOWN
    trend_percentage DECIMAL(10,4),
    status VARCHAR(20) NOT NULL, -- EXCELLENT, GOOD, WARNING, CRITICAL, UNKNOWN
    status_score DECIMAL(5,4), -- Numerical representation of status
    data_quality_score DECIMAL(5,4) DEFAULT 1.0,
    source_system VARCHAR(100),
    source_reference VARCHAR(255), -- Reference number in source system
    raw_data JSONB, -- Original data from source system
    calculation_log JSONB, -- Detailed calculation steps
    confidence_level VARCHAR(20) DEFAULT 'HIGH', -- HIGH, MEDIUM, LOW
    notes TEXT,
    attachments JSONB, -- Array of supporting documents
    calculated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    calculated_by UUID REFERENCES users(user_id),
    verified_at TIMESTAMP WITH TIME ZONE,
    verified_by UUID REFERENCES users(user_id),
    approved_at TIMESTAMP WITH TIME ZONE,
    approved_by UUID REFERENCES users(user_id),
    published_at TIMESTAMP WITH TIME ZONE,
    published_by UUID REFERENCES users(user_id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_period_dates CHECK (period_end_date >= period_start_date),
    CONSTRAINT chk_period_type CHECK (period_type IN ('DAILY', 'WEEKLY', 'MONTHLY', 'QUARTERLY', 'ANNUAL')),
    CONSTRAINT chk_status CHECK (status IN ('EXCELLENT', 'GOOD', 'WARNING', 'CRITICAL', 'UNKNOWN')),
    CONSTRAINT chk_trend CHECK (trend IN ('UP', 'DOWN', 'STABLE', 'UNKNOWN')),
    CONSTRAINT chk_confidence_level CHECK (confidence_level IN ('HIGH', 'MEDIUM', 'LOW')),
    CONSTRAINT chk_quality_score CHECK (data_quality_score >= 0 AND data_quality_score <= 1),
    CONSTRAINT chk_unique_period UNIQUE(kpi_id, org_id, period_type, period_start_date)
);

-- Critical indexes for performance
CREATE INDEX idx_kpi_data_points_kpi_id ON kpi_data_points(kpi_id);
CREATE INDEX idx_kpi_data_points_org_id ON kpi_data_points(org_id);
CREATE INDEX idx_kpi_data_points_period_dates ON kpi_data_points(period_start_date, period_end_date);
CREATE INDEX idx_kpi_data_points_period_type ON kpi_data_points(period_type);
CREATE INDEX idx_kpi_data_points_status ON kpi_data_points(status);
CREATE INDEX idx_kpi_data_points_calculated_at ON kpi_data_points(calculated_at);
CREATE INDEX idx_kpi_data_points_verification ON kpi_data_points(verified_at, verified_by);
CREATE UNIQUE INDEX idx_kpi_data_points_unique_period ON kpi_data_points(kpi_id, org_id, period_type, period_start_date);
```

#### 2.2.2 KPI Target Management

**Table: kpi_targets**
```sql
CREATE TABLE kpi_targets (
    target_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    kpi_id UUID NOT NULL REFERENCES kpi_definitions(kpi_id),
    org_id UUID REFERENCES organizations(org_id),
    target_year INTEGER NOT NULL,
    target_quarter INTEGER, -- 1-4 for quarterly targets, null for annual
    target_month INTEGER, -- 1-12 for monthly targets, null for quarterly/annual
    target_value DECIMAL(20,4) NOT NULL,
    baseline_value DECIMAL(20,4),
    stretch_target DECIMAL(20,4), -- Stretch goal for high performance
    target_type VARCHAR(20) NOT NULL, -- MINIMUM, MAXIMUM, EXACT, RANGE
    range_min DECIMAL(20,4),
    range_max DECIMAL(20,4),
    priority_level VARCHAR(20) DEFAULT 'MEDIUM', -- LOW, MEDIUM, HIGH, CRITICAL
    strategic_importance VARCHAR(20) DEFAULT 'MEDIUM', -- LOW, MEDIUM, HIGH, CRITICAL
    justification TEXT,
    approval_status VARCHAR(20) DEFAULT 'DRAFT', -- DRAFT, PENDING_APPROVAL, APPROVED, REJECTED
    approved_by UUID REFERENCES persons(person_id),
    approved_at TIMESTAMP WITH TIME ZONE,
    effective_date DATE DEFAULT CURRENT_DATE,
    expiry_date DATE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES users(user_id),
    updated_by UUID REFERENCES users(user_id),

    CONSTRAINT chk_target_year CHECK (target_year >= 2025 AND target_year <= 2030),
    CONSTRAINT chk_target_quarter CHECK (target_quarter IS NULL OR (target_quarter >= 1 AND target_quarter <= 4)),
    CONSTRAINT chk_target_month CHECK (target_month IS NULL OR (target_month >= 1 AND target_month <= 12)),
    CONSTRAINT chk_target_type CHECK (target_type IN ('MINIMUM', 'MAXIMUM', 'EXACT', 'RANGE')),
    CONSTRAINT chk_priority CHECK (priority_level IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
    CONSTRAINT chk_importance CHECK (strategic_importance IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
    CONSTRAINT chk_approval_status CHECK (approval_status IN ('DRAFT', 'PENDING_APPROVAL', 'APPROVED', 'REJECTED')),
    CONSTRAINT chk_unique_target UNIQUE(kpi_id, org_id, target_year, COALESCE(target_quarter, 0), COALESCE(target_month, 0)),
    CONSTRAINT chk_dates CHECK (expiry_date IS NULL OR expiry_date > effective_date)
);

CREATE INDEX idx_kpi_targets_kpi_id ON kpi_targets(kpi_id);
CREATE INDEX idx_kpi_targets_org_id ON kpi_targets(org_id);
CREATE INDEX idx_kpi_targets_year_quarter_month ON kpi_targets(target_year, COALESCE(target_quarter, 0), COALESCE(target_month, 0));
CREATE INDEX idx_kpi_targets_approval_status ON kpi_targets(approval_status);
```

#### 2.2.3 Data Source Integration

**Table: data_sources**
```sql
CREATE TABLE data_sources (
    source_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_code VARCHAR(30) UNIQUE NOT NULL,
    source_name VARCHAR(200) NOT NULL,
    source_type VARCHAR(30) NOT NULL, -- DATABASE, API, FILE, MANUAL, EXTERNAL_SYSTEM
    system_name VARCHAR(100),
    system_version VARCHAR(50),
    connection_details JSONB, -- Encrypted connection information
    api_endpoint VARCHAR(500),
    authentication_method VARCHAR(50), -- OAUTH, API_KEY, BASIC_AUTH, CERTIFICATE
    refresh_frequency VARCHAR(20), -- REAL_TIME, HOURLY, DAILY, WEEKLY, MONTHLY
    last_sync_at TIMESTAMP WITH TIME ZONE,
    sync_status VARCHAR(20) DEFAULT 'INACTIVE', -- ACTIVE, INACTIVE, ERROR, MAINTENANCE
    data_format VARCHAR(30), -- JSON, XML, CSV, EXCEL, DATABASE_TABLE
    owner_org_id UUID REFERENCES organizations(org_id),
    technical_contact_id UUID REFERENCES persons(person_id),
    business_contact_id UUID REFERENCES persons(person_id),
    sla_hours INTEGER DEFAULT 24, -- Service level agreement for data availability
    retention_days INTEGER DEFAULT 1825, -- 5 years default
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_source_type CHECK (source_type IN ('DATABASE', 'API', 'FILE', 'MANUAL', 'EXTERNAL_SYSTEM')),
    CONSTRAINT chk_refresh_frequency CHECK (refresh_frequency IN ('REAL_TIME', 'HOURLY', 'DAILY', 'WEEKLY', 'MONTHLY')),
    CONSTRAINT chk_sync_status CHECK (sync_status IN ('ACTIVE', 'INACTIVE', 'ERROR', 'MAINTENANCE')),
    CONSTRAINT chk_data_format CHECK (data_format IN ('JSON', 'XML', 'CSV', 'EXCEL', 'DATABASE_TABLE'))
);

CREATE INDEX idx_data_sources_source_code ON data_sources(source_code);
CREATE INDEX idx_data_sources_source_type ON data_sources(source_type);
CREATE INDEX idx_data_sources_sync_status ON data_sources(sync_status);
CREATE INDEX idx_data_sources_is_active ON data_sources(is_active);
```

**Table: kpi_data_source_mappings**
```sql
CREATE TABLE kpi_data_source_mappings (
    mapping_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    kpi_id UUID NOT NULL REFERENCES kpi_definitions(kpi_id),
    source_id UUID NOT NULL REFERENCES data_sources(source_id),
    source_table_name VARCHAR(200),
    source_field_name VARCHAR(200),
    transformation_logic TEXT,
    aggregation_method VARCHAR(50), -- SUM, COUNT, AVG, MAX, MIN, CUSTOM
    filter_conditions JSONB,
    join_conditions JSONB, -- For multi-table sources
    calculation_order INTEGER DEFAULT 1,
    is_primary_source BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_aggregation_method CHECK (aggregation_method IN ('SUM', 'COUNT', 'AVG', 'MAX', 'MIN', 'CUSTOM')),
    CONSTRAINT chk_unique_kpi_source UNIQUE(kpi_id, source_id)
);

CREATE INDEX idx_kpi_data_mappings_kpi_id ON kpi_data_source_mappings(kpi_id);
CREATE INDEX idx_kpi_data_mappings_source_id ON kpi_data_source_mappings(source_id);
CREATE INDEX idx_kpi_data_mappings_primary_source ON kpi_data_source_mappings(is_primary_source);
```

### 2.3 Quality and Audit Models

#### 2.3.1 Data Quality Tracking

**Table: data_quality_metrics**
```sql
CREATE TABLE data_quality_metrics (
    quality_metric_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    kpi_data_point_id UUID NOT NULL REFERENCES kpi_data_points(data_point_id),
    completeness_score DECIMAL(5,4) DEFAULT 1.0,
    accuracy_score DECIMAL(5,4) DEFAULT 1.0,
    consistency_score DECIMAL(5,4) DEFAULT 1.0,
    timeliness_score DECIMAL(5,4) DEFAULT 1.0,
    validity_score DECIMAL(5,4) DEFAULT 1.0,
    uniqueness_score DECIMAL(5,4) DEFAULT 1.0,
    overall_score DECIMAL(5,4) GENERATED ALWAYS AS (
        (completeness_score * 0.2 + accuracy_score * 0.25 +
         consistency_score * 0.2 + timeliness_score * 0.15 +
         validity_score * 0.15 + uniqueness_score * 0.05)
    ) STORED,
    quality_issues JSONB, -- Array of identified issues
    auto_checks_passed BOOLEAN DEFAULT true,
    manual_review_required BOOLEAN DEFAULT false,
    reviewed_by UUID REFERENCES persons(person_id),
    reviewed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_completeness CHECK (completeness_score >= 0 AND completeness_score <= 1),
    CONSTRAINT chk_accuracy CHECK (accuracy_score >= 0 AND accuracy_score <= 1),
    CONSTRAINT chk_consistency CHECK (consistency_score >= 0 AND consistency_score <= 1),
    CONSTRAINT chk_timeliness CHECK (timeliness_score >= 0 AND timeliness_score <= 1),
    CONSTRAINT chk_validity CHECK (validity_score >= 0 AND validity_score <= 1),
    CONSTRAINT chk_uniqueness CHECK (uniqueness_score >= 0 AND uniqueness_score <= 1)
);

CREATE INDEX idx_data_quality_metrics_data_point_id ON data_quality_metrics(kpi_data_point_id);
CREATE INDEX idx_data_quality_metrics_overall_score ON data_quality_metrics(overall_score);
CREATE INDEX idx_data_quality_metrics_review_required ON data_quality_metrics(manual_review_required);
```

#### 2.3.2 Audit Trail

**Table: audit_trail**
```sql
CREATE TABLE audit_trail (
    audit_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    table_name VARCHAR(100) NOT NULL,
    record_id UUID NOT NULL,
    operation_type VARCHAR(20) NOT NULL, -- INSERT, UPDATE, DELETE, SELECT
    operation_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    user_id UUID REFERENCES users(user_id),
    user_name VARCHAR(255),
    session_id VARCHAR(100),
    ip_address INET,
    user_agent TEXT,
    old_values JSONB, -- For UPDATE and DELETE
    new_values JSONB, -- For INSERT and UPDATE
    changed_fields JSONB, -- Array of field names that changed
    business_context TEXT, -- Business reason for change
    approval_reference VARCHAR(100), -- Reference to approval workflow
    source_system VARCHAR(100),
    batch_id UUID, -- For bulk operations
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_operation_type CHECK (operation_type IN ('INSERT', 'UPDATE', 'DELETE', 'SELECT')),
    CONSTRAINT chk_table_name CHECK (table_name IN (
        'kpi_definitions', 'kpi_data_points', 'kpi_targets',
        'organizations', 'persons', 'data_sources'
    ))
);

CREATE INDEX idx_audit_trail_table_record ON audit_trail(table_name, record_id);
CREATE INDEX idx_audit_trail_operation_time ON audit_trail(operation_time);
CREATE INDEX idx_audit_trail_user_id ON audit_trail(user_id);
CREATE INDEX idx_audit_trail_operation_type ON audit_trail(operation_type);
CREATE INDEX idx_audit_trail_batch_id ON audit_trail(batch_id);
```

#### 2.3.3 Data Validation Rules

**Table: validation_rules**
```sql
CREATE TABLE validation_rules (
    rule_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rule_name VARCHAR(200) NOT NULL,
    rule_code VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    rule_type VARCHAR(30) NOT NULL, -- RANGE, FORMAT, BUSINESS_LOGIC, REFERENCE
    target_table VARCHAR(100) NOT NULL,
    target_field VARCHAR(100) NOT NULL,
    condition_expression TEXT, -- SQL WHERE clause or validation logic
    error_message TEXT,
    severity_level VARCHAR(20) DEFAULT 'ERROR', -- WARNING, ERROR, CRITICAL
    is_active BOOLEAN DEFAULT true,
    execution_order INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_rule_type CHECK (rule_type IN ('RANGE', 'FORMAT', 'BUSINESS_LOGIC', 'REFERENCE')),
    CONSTRAINT chk_severity CHECK (severity_level IN ('WARNING', 'ERROR', 'CRITICAL'))
);

CREATE INDEX idx_validation_rules_target_table_field ON validation_rules(target_table, target_field);
CREATE INDEX idx_validation_rules_is_active ON validation_rules(is_active);
CREATE INDEX idx_validation_rules_severity ON validation_rules(severity_level);
```

**Table: validation_results**
```sql
CREATE TABLE validation_results (
    validation_result_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rule_id UUID NOT NULL REFERENCES validation_rules(rule_id),
    record_id UUID NOT NULL,
    table_name VARCHAR(100) NOT NULL,
    field_name VARCHAR(100) NOT NULL,
    field_value TEXT,
    validation_status VARCHAR(20) NOT NULL, -- PASSED, FAILED, WARNING
    error_message TEXT,
    evaluated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    evaluated_by UUID REFERENCES users(user_id),
    batch_id UUID,

    CONSTRAINT chk_validation_status CHECK (validation_status IN ('PASSED', 'FAILED', 'WARNING'))
);

CREATE INDEX idx_validation_results_rule_id ON validation_results(rule_id);
CREATE INDEX idx_validation_results_record_id ON validation_results(record_id);
CREATE INDEX idx_validation_results_status ON validation_results(validation_status);
CREATE INDEX idx_validation_results_evaluated_at ON validation_results(evaluated_at);
```

### 2.4 Configuration and Metadata Models

#### 2.4.1 System Configuration

**Table: system_configurations**
```sql
CREATE TABLE system_configurations (
    config_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    config_key VARCHAR(200) UNIQUE NOT NULL,
    config_value TEXT,
    config_type VARCHAR(30) NOT NULL, -- STRING, INTEGER, DECIMAL, BOOLEAN, JSON
    description TEXT,
    is_encrypted BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    effective_date DATE DEFAULT CURRENT_DATE,
    expiry_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_by UUID REFERENCES users(user_id),

    CONSTRAINT chk_config_type CHECK (config_type IN ('STRING', 'INTEGER', 'DECIMAL', 'BOOLEAN', 'JSON')),
    CONSTRAINT chk_dates CHECK (expiry_date IS NULL OR expiry_date > effective_date)
);

CREATE INDEX idx_system_configurations_config_key ON system_configurations(config_key);
CREATE INDEX idx_system_configurations_is_active ON system_configurations(is_active);
```

#### 2.4.2 Dashboard User Preferences

**Table: user_dashboard_preferences**
```sql
CREATE TABLE user_dashboard_preferences (
    preference_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(user_id),
    dashboard_name VARCHAR(100) NOT NULL,
    layout_config JSONB, -- Saved dashboard layout
    kpi_selection JSONB, -- Selected KPIs for display
    time_range_preference JSONB, -- Default time range settings
    notification_settings JSONB,
    color_theme VARCHAR(50) DEFAULT 'default',
    auto_refresh_interval INTEGER DEFAULT 300, -- seconds
    export_preferences JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_unique_user_dashboard UNIQUE(user_id, dashboard_name),
    CONSTRAINT chk_refresh_interval CHECK (auto_refresh_interval >= 30 AND auto_refresh_interval <= 3600)
);

CREATE INDEX idx_user_dashboard_preferences_user_id ON user_dashboard_preferences(user_id);
CREATE INDEX idx_user_dashboard_preferences_dashboard_name ON user_dashboard_preferences(dashboard_name);
```

---

## 3. Analytical Data Model (OLAP)

### 3.1 Fact Tables

#### 3.1.1 KPI Performance Fact

**Table: fact_kpi_performance**
```sql
CREATE TABLE fact_kpi_performance (
    fact_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    kpi_id UUID NOT NULL,
    category_id UUID NOT NULL,
    org_id UUID NOT NULL,
    time_id UUID NOT NULL REFERENCES dim_time(time_id),
    actual_value DECIMAL(20,4) NOT NULL,
    target_value DECIMAL(20,4),
    achievement_rate DECIMAL(10,4),
    variance_amount DECIMAL(20,4),
    variance_percentage DECIVAL(10,4),
    status_code INTEGER,
    trend_code INTEGER,
    quality_score DECIMAL(5,4),
    data_source_id UUID,
    load_timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    batch_id UUID
);

-- Partitioning by month for performance
CREATE TABLE fact_kpi_performance_y2025m01 PARTITION OF fact_kpi_performance
    FOR VALUES FROM ('2025-01-01') TO ('2025-02-01');

-- Indexes for analytical queries
CREATE INDEX idx_fact_kpi_performance_kpi_id ON fact_kpi_performance(kpi_id);
CREATE INDEX idx_fact_kpi_performance_category_id ON fact_kpi_performance(category_id);
CREATE INDEX idx_fact_kpi_performance_org_id ON fact_kpi_performance(org_id);
CREATE INDEX idx_fact_kpi_performance_time_id ON fact_kpi_performance(time_id);
CREATE INDEX idx_fact_kpi_performance_status_code ON fact_kpi_performance(status_code);
```

#### 3.1.2 KPI Trend Analysis

**Table: fact_kpi_trends**
```sql
CREATE TABLE fact_kpi_trends (
    trend_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    kpi_id UUID NOT NULL,
    org_id UUID NOT NULL,
    period_start_time_id UUID NOT NULL REFERENCES dim_time(time_id),
    period_end_time_id UUID NOT NULL REFERENCES dim_time(time_id),
    previous_period_value DECIMAL(20,4),
    current_period_value DECIMAL(20,4),
    change_amount DECIMAL(20,4),
    change_percentage DECIMAL(10,4),
    trend_direction VARCHAR(20), -- UP, DOWN, STABLE
    trend_strength VARCHAR(20), -- WEAK, MODERATE, STRONG
    moving_avg_3_periods DECIMAL(20,4),
    moving_avg_6_periods DECIMAL(20,4),
    moving_avg_12_periods DECIMAL(20,4),
    forecast_next_period DECIMAL(20,4),
    confidence_level DECIMAL(5,4),
    seasonality_factor DECIMAL(10,4),
    calculated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_fact_kpi_trends_kpi_org ON fact_kpi_trends(kpi_id, org_id);
CREATE INDEX idx_fact_kpi_trends_time_range ON fact_kpi_trends(period_start_time_id, period_end_time_id);
CREATE INDEX idx_fact_kpi_trends_direction ON fact_kpi_trends(trend_direction);
```

### 3.2 Dimension Tables

#### 3.2.1 Time Dimension

**Table: dim_time**
```sql
CREATE TABLE dim_time (
    time_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date_value DATE NOT NULL UNIQUE,
    year INTEGER NOT NULL,
    quarter INTEGER NOT NULL,
    quarter_name VARCHAR(10) NOT NULL,
    month INTEGER NOT NULL,
    month_name VARCHAR(20) NOT NULL,
    month_name_id VARCHAR(20) NOT NULL,
    week_of_year INTEGER NOT NULL,
    day_of_month INTEGER NOT NULL,
    day_of_week INTEGER NOT NULL,
    day_name VARCHAR(20) NOT NULL,
    day_name_id VARCHAR(20) NOT NULL,
    is_weekend BOOLEAN NOT NULL,
    is_holiday BOOLEAN DEFAULT false,
    holiday_name VARCHAR(100),
    fiscal_year INTEGER NOT NULL,
    fiscal_quarter INTEGER NOT NULL,
    fiscal_month INTEGER NOT NULL,
    is_working_day BOOLEAN NOT NULL,
    season VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Pre-populate time dimension for 10 years
-- This would be populated by a script
CREATE INDEX idx_dim_time_date_value ON dim_time(date_value);
CREATE INDEX idx_dim_time_year_quarter ON dim_time(year, quarter);
CREATE INDEX idx_dim_time_month ON dim_time(month);
CREATE INDEX idx_dim_time_fiscal_year ON dim_time(fiscal_year);
```

#### 3.2.2 Geography Dimension

**Table: dim_geography**
```sql
CREATE TABLE dim_geography (
    geo_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    country_code VARCHAR(3) NOT NULL,
    country_name VARCHAR(100) NOT NULL,
    province_code VARCHAR(10),
    province_name VARCHAR(100),
    city_code VARCHAR(10),
    city_name VARCHAR(100),
    district_code VARCHAR(10),
    district_name VARCHAR(100),
    region VARCHAR(50), -- Sumatera, Jawa, Bali-Nusa, Kalimantan, Sulawesi, Maluku-Papua
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_dim_geography_country_code ON dim_geography(country_code);
CREATE INDEX idx_dim_geography_province_code ON dim_geography(province_code);
CREATE INDEX idx_dim_geography_city_code ON dim_geography(city_code);
CREATE INDEX idx_dim_geography_region ON dim_geography(region);
```

---

## 4. Views and Materialized Views

### 4.1 Performance Monitoring Views

#### 4.1.1 Current KPI Status

```sql
CREATE VIEW v_current_kpi_status AS
SELECT
    kd.kpi_id,
    kd.kpi_code,
    kd.kpi_name,
    kc.category_name,
    kd.level,
    kd.unit,
    kdp.actual_value,
    kdp.target_value,
    kdp.achievement_rate,
    kdp.status,
    kdp.trend,
    kdp.calculated_at,
    org.org_name,
    org.org_code
FROM kpi_definitions kd
JOIN kpi_categories kc ON kd.category_id = kc.category_id
JOIN LATERAL (
    SELECT * FROM kpi_data_points
    WHERE kpi_id = kd.kpi_id
    AND period_type = 'MONTHLY'
    AND period_start_date = date_trunc('month', CURRENT_DATE)
    ORDER BY calculated_at DESC
    LIMIT 1
) kdp ON true
LEFT JOIN organizations org ON kdp.org_id = org.org_id
WHERE kd.is_active = true;
```

#### 4.1.2 KPI Performance Summary

```sql
CREATE MATERIALIZED VIEW mv_kpi_performance_summary AS
SELECT
    kc.category_id,
    kc.category_name,
    kd.level,
    COUNT(kd.kpi_id) as total_kpis,
    COUNT(CASE WHEN kdp.status = 'EXCELLENT' THEN 1 END) as excellent_count,
    COUNT(CASE WHEN kdp.status = 'GOOD' THEN 1 END) as good_count,
    COUNT(CASE WHEN kdp.status = 'WARNING' THEN 1 END) as warning_count,
    COUNT(CASE WHEN kdp.status = 'CRITICAL' THEN 1 END) as critical_count,
    AVG(kdp.achievement_rate) as avg_achievement_rate,
    MAX(kdp.calculated_at) as last_updated
FROM kpi_categories kc
JOIN kpi_definitions kd ON kc.category_id = kd.category_id
LEFT JOIN LATERAL (
    SELECT * FROM kpi_data_points
    WHERE kpi_id = kd.kpi_id
    AND period_type = 'MONTHLY'
    AND period_start_date = date_trunc('month', CURRENT_DATE)
    ORDER BY calculated_at DESC
    LIMIT 1
) kdp ON true
WHERE kd.is_active = true
GROUP BY kc.category_id, kc.category_name, kd.level;

-- Create unique index for refreshing
CREATE UNIQUE INDEX idx_mv_kpi_performance_summary_unique
ON mv_kpi_performance_summary(category_id, level);
```

### 4.2 Trend Analysis Views

#### 4.2.1 Monthly Trend Analysis

```sql
CREATE MATERIALIZED VIEW mv_monthly_kpi_trends AS
SELECT
    kd.kpi_id,
    kd.kpi_code,
    kd.kpi_name,
    kc.category_name,
    EXTRACT(YEAR FROM kdp.period_start_date) as trend_year,
    EXTRACT(MONTH FROM kdp.period_start_date) as trend_month,
    kdp.actual_value,
    kdp.target_value,
    kdp.achievement_rate,
    LAG(kdp.actual_value) OVER (PARTITION BY kd.kpi_id ORDER BY kdp.period_start_date) as previous_value,
    kdp.actual_value - LAG(kdp.actual_value) OVER (PARTITION BY kd.kpi_id ORDER BY kdp.period_start_date) as change_amount,
    CASE
        WHEN LAG(kdp.actual_value) OVER (PARTITION BY kd.kpi_id ORDER BY kdp.period_start_date) IS NULL THEN 'UNKNOWN'
        WHEN kdp.actual_value > LAG(kdp.actual_value) OVER (PARTITION BY kd.kpi_id ORDER BY kdp.period_start_date) THEN 'UP'
        WHEN kdp.actual_value < LAG(kdp.actual_value) OVER (PARTITION BY kd.kpi_id ORDER BY kdp.period_start_date) THEN 'DOWN'
        ELSE 'STABLE'
    END as trend_direction
FROM kpi_definitions kd
JOIN kpi_categories kc ON kd.category_id = kc.category_id
JOIN kpi_data_points kdp ON kd.kpi_id = kdp.kpi_id
WHERE kd.is_active = true
AND kdp.period_type = 'MONTHLY'
AND kdp.period_start_date >= CURRENT_DATE - INTERVAL '2 years'
ORDER BY kd.kpi_id, kdp.period_start_date;

CREATE INDEX idx_mv_monthly_trends_kpi_date ON mv_monthly_kpi_trends(kpi_id, trend_year, trend_month);
CREATE INDEX idx_mv_monthly_trends_category ON mv_monthly_trends(category_name);
```

---

## 5. Stored Procedures and Functions

### 5.1 KPI Calculation Functions

#### 5.1.1 Calculate Achievement Rate

```sql
CREATE OR REPLACE FUNCTION calculate_achievement_rate(
    p_actual_value DECIMAL,
    p_target_value DECIMAL,
    p_target_type VARCHAR
) RETURNS DECIMAL AS $$
BEGIN
    -- Handle edge cases
    IF p_target_value = 0 OR p_target_value IS NULL THEN
        RETURN NULL;
    END IF;

    -- Different calculation logic based on target type
    CASE p_target_type
        WHEN 'MINIMUM' THEN
            -- For minimum targets, higher is better
            RETURN GREATEST(0, (p_actual_value / p_target_value) * 100);

        WHEN 'MAXIMUM' THEN
            -- For maximum targets, lower is better
            RETURN GREATEST(0, (p_target_value / p_actual_value) * 100);

        WHEN 'EXACT' THEN
            -- For exact targets, closeness to target
            RETURN GREATEST(0, 100 - ABS(p_actual_value - p_target_value) / p_target_value * 100);

        WHEN 'RANGE' THEN
            -- For range targets, check if within range
            -- This would need additional parameters for min/max range
            RETURN 100; -- Simplified for example

        ELSE
            RETURN NULL;
    END CASE;
END;
$$ LANGUAGE plpgsql;
```

#### 5.1.2 Determine KPI Status

```sql
CREATE OR REPLACE FUNCTION determine_kpi_status(
    p_achievement_rate DECIMAL,
    p_kpi_id UUID
) RETURNS VARCHAR AS $$
DECLARE
    v_status VARCHAR(20);
    v_excellent_threshold DECIMAL;
    v_good_threshold DECIMAL;
    v_warning_threshold DECIMAL;
BEGIN
    -- Get threshold values from KPI definition or use defaults
    SELECT
        COALESCE(config_value::DECIMAL, 120.0), -- Excellent threshold
        COALESCE(config_value::DECIMAL, 100.0), -- Good threshold
        COALESCE(config_value::DECIMAL, 80.0)   -- Warning threshold
    INTO v_excellent_threshold, v_good_threshold, v_warning_threshold
    FROM system_configurations
    WHERE config_key IN ('kpi_status_excellent', 'kpi_status_good', 'kpi_status_warning')
    ORDER BY config_key;

    -- Determine status based on achievement rate
    IF p_achievement_rate >= v_excellent_threshold THEN
        v_status := 'EXCELLENT';
    ELSIF p_achievement_rate >= v_good_threshold THEN
        v_status := 'GOOD';
    ELSIF p_achievement_rate >= v_warning_threshold THEN
        v_status := 'WARNING';
    ELSE
        v_status := 'CRITICAL';
    END IF;

    RETURN v_status;
END;
$$ LANGUAGE plpgsql;
```

### 5.2 Data Validation Functions

#### 5.2.1 Validate KPI Data Point

```sql
CREATE OR REPLACE FUNCTION validate_kpi_data_point(
    p_data_point_id UUID
) RETURNS BOOLEAN AS $$
DECLARE
    v_is_valid BOOLEAN := true;
    v_validation_errors TEXT[];
    v_rule RECORD;
BEGIN
    -- Run all applicable validation rules
    FOR v_rule IN
        SELECT vr.rule_id, vr.rule_code, vr.condition_expression, vr.error_message
        FROM validation_rules vr
        WHERE vr.is_active = true
        AND vr.target_table = 'kpi_data_points'
        ORDER BY vr.execution_order
    LOOP
        -- Execute validation rule (simplified example)
        IF NOT EXECUTE('SELECT 1 FROM kpi_data_points kdp WHERE kdp.data_point_id = $1 AND (' || v_rule.condition_expression || ')', p_data_point_id) THEN
            v_is_valid := false;
            v_validation_errors := array_append(v_validation_errors, v_rule.error_message);

            -- Record validation failure
            INSERT INTO validation_results (
                rule_id, record_id, table_name, field_name, validation_status, error_message
            ) VALUES (
                v_rule.rule_id, p_data_point_id, 'kpi_data_points', NULL, 'FAILED', v_rule.error_message
            );
        END IF;
    END LOOP;

    -- Update data quality metrics
    UPDATE data_quality_metrics
    SET auto_checks_passed = v_is_valid,
        quality_issues = to_jsonb(v_validation_errors),
        reviewed_at = CURRENT_TIMESTAMP
    WHERE kpi_data_point_id = p_data_point_id;

    RETURN v_is_valid;
END;
$$ LANGUAGE plpgsql;
```

### 5.3 Trend Analysis Functions

#### 5.3.1 Calculate Trend

```sql
CREATE OR REPLACE FUNCTION calculate_kpi_trend(
    p_kpi_id UUID,
    p_current_date DATE DEFAULT CURRENT_DATE,
    p_periods_back INTEGER DEFAULT 3
) RETURNS TABLE (
    trend_direction VARCHAR,
    trend_strength VARCHAR,
    change_amount DECIMAL,
    change_percentage DECIMAL,
    confidence_level DECIMAL
) AS $$
DECLARE
    v_current_value DECIMAL;
    v_previous_value DECIMAL;
    v_change_amount DECIMAL;
    v_change_percentage DECIMAL;
    v_trend_direction VARCHAR;
    v_trend_strength VARCHAR;
    v_confidence_level DECIMAL;
BEGIN
    -- Get current and previous period values
    SELECT actual_value INTO v_current_value
    FROM kpi_data_points
    WHERE kpi_id = p_kpi_id
    AND period_type = 'MONTHLY'
    AND period_start_date = date_trunc('month', p_current_date);

    SELECT actual_value INTO v_previous_value
    FROM kpi_data_points
    WHERE kpi_id = p_kpi_id
    AND period_type = 'MONTHLY'
    AND period_start_date = date_trunc('month', p_current_date - INTERVAL '1 month');

    -- Calculate change metrics
    IF v_current_value IS NOT NULL AND v_previous_value IS NOT NULL AND v_previous_value != 0 THEN
        v_change_amount := v_current_value - v_previous_value;
        v_change_percentage := (v_change_amount / v_previous_value) * 100;

        -- Determine trend direction
        IF v_change_amount > 0 THEN
            v_trend_direction := 'UP';
        ELSIF v_change_amount < 0 THEN
            v_trend_direction := 'DOWN';
        ELSE
            v_trend_direction := 'STABLE';
        END IF;

        -- Determine trend strength based on percentage change
        IF ABS(v_change_percentage) >= 10 THEN
            v_trend_strength := 'STRONG';
        ELSIF ABS(v_change_percentage) >= 5 THEN
            v_trend_strength := 'MODERATE';
        ELSE
            v_trend_strength := 'WEAK';
        END IF;

        -- Calculate confidence based on data quality
        SELECT AVG(dqm.overall_score) INTO v_confidence_level
        FROM data_quality_metrics dqm
        JOIN kpi_data_points kdp ON dqm.kpi_data_point_id = kdp.data_point_id
        WHERE kdp.kpi_id = p_kpi_id
        AND kdp.period_start_date >= date_trunc('month', p_current_date - INTERVAL '3 months');

        IF v_confidence_level IS NULL THEN
            v_confidence_level := 0.5;
        END IF;

    ELSE
        v_trend_direction := 'UNKNOWN';
        v_trend_strength := 'UNKNOWN';
        v_change_amount := NULL;
        v_change_percentage := NULL;
        v_confidence_level := 0.0;
    END IF;

    -- Return results
    RETURN QUERY SELECT
        v_trend_direction,
        v_trend_strength,
        v_change_amount,
        v_change_percentage,
        v_confidence_level;
END;
$$ LANGUAGE plpgsql;
```

---

## 6. Data Loading and ETL Processes

### 6.1 Data Integration Patterns

#### 6.1.1 Incremental Load Procedure

```sql
CREATE OR REPLACE PROCEDURE incremental_kpi_data_load(
    p_source_system VARCHAR,
    p_load_date DATE DEFAULT CURRENT_DATE
) AS $$
DECLARE
    v_last_load_date DATE;
    v_record_count INTEGER;
BEGIN
    -- Get last successful load date for this source
    SELECT MAX(load_timestamp)::DATE INTO v_last_load_date
    FROM fact_kpi_performance
    WHERE data_source_id = (SELECT source_id FROM data_sources WHERE system_name = p_source_system);

    -- If no previous load, use default start date
    IF v_last_load_date IS NULL THEN
        v_last_load_date := p_load_date - INTERVAL '30 days';
    END IF;

    -- Load new data incrementally
    INSERT INTO fact_kpi_performance (
        kpi_id, category_id, org_id, time_id,
        actual_value, target_value, achievement_rate,
        status_code, data_source_id, load_timestamp
    )
    SELECT
        kpi_mapping.kpi_id,
        kd.category_id,
        org.org_id,
        dt.time_id,
        src.actual_value,
        src.target_value,
        calculate_achievement_rate(src.actual_value, src.target_value, kd.target_type),
        CASE
            WHEN calculate_achievement_rate(src.actual_value, src.target_value, kd.target_type) >= 120 THEN 1 -- EXCELLENT
            WHEN calculate_achievement_rate(src.actual_value, src.target_value, kd.target_type) >= 100 THEN 2 -- GOOD
            WHEN calculate_achievement_rate(src.actual_value, src.target_value, kd.target_type) >= 80 THEN 3 -- WARNING
            ELSE 4 -- CRITICAL
        END,
        ds.source_id,
        CURRENT_TIMESTAMP
    FROM source_data_staging src
    JOIN kpi_data_source_mappings kpi_mapping ON src.source_table = kpi_mapping.source_table_name
    JOIN kpi_definitions kd ON kpi_mapping.kpi_id = kd.kpi_id
    JOIN organizations org ON src.org_code = org.org_code
    JOIN dim_time dt ON src.report_date = dt.date_value
    JOIN data_sources ds ON ds.system_name = p_source_system
    WHERE src.report_date > v_last_load_date
    AND src.report_date <= p_load_date;

    GET DIAGNOSTICS v_record_count = ROW_COUNT;

    -- Log the load operation
    INSERT INTO etl_log (
        process_name, source_system, start_time, end_time,
        records_processed, status
    ) VALUES (
        'incremental_kpi_data_load', p_source_system,
        v_last_load_date, p_load_date, v_record_count, 'SUCCESS'
    );

    -- Update materialized views
    REFRESH MATERIALIZED VIEW CONCURRENTLY mv_kpi_performance_summary;
    REFRESH MATERIALIZED VIEW CONCURRENTLY mv_monthly_kpi_trends;

    COMMIT;

EXCEPTION WHEN OTHERS THEN
    -- Log error
    INSERT INTO etl_log (
        process_name, source_system, start_time, end_time,
        records_processed, status, error_message
    ) VALUES (
        'incremental_kpi_data_load', p_source_system,
        v_last_load_date, p_load_date, 0, 'ERROR', SQLERRM
    );

    ROLLBACK;
    RAISE;
END;
$$ LANGUAGE plpgsql;
```

### 6.2 Data Quality Monitoring

#### 6.2.1 Daily Data Quality Check

```sql
CREATE OR REPLACE PROCEDURE daily_data_quality_check()
AS $$
DECLARE
    v_check_date DATE := CURRENT_DATE;
    v_total_records INTEGER;
    v_failed_records INTEGER;
    v_quality_score DECIMAL;
BEGIN
    -- Count total records for today
    SELECT COUNT(*) INTO v_total_records
    FROM kpi_data_points
    WHERE DATE(calculated_at) = v_check_date;

    -- Count records that failed validation
    SELECT COUNT(*) INTO v_failed_records
    FROM data_quality_metrics dqm
    JOIN kpi_data_points kdp ON dqm.kpi_data_point_id = kdp.data_point_id
    WHERE DATE(kdp.calculated_at) = v_check_date
    AND dqm.auto_checks_passed = false;

    -- Calculate overall quality score
    IF v_total_records > 0 THEN
        v_quality_score := ((v_total_records - v_failed_records)::DECIMAL / v_total_records) * 100;
    ELSE
        v_quality_score := 0;
    END IF;

    -- Log quality metrics
    INSERT INTO daily_quality_metrics (
        check_date, total_records, failed_records, quality_score
    ) VALUES (
        v_check_date, v_total_records, v_failed_records, v_quality_score
    );

    -- Send alert if quality score below threshold
    IF v_quality_score < 95 THEN
        PERFORM send_quality_alert(v_check_date, v_quality_score, v_failed_records);
    END IF;

END;
$$ LANGUAGE plpgsql;
```

---

## 7. Performance Optimization

### 7.1 Indexing Strategy

#### 7.1.1 Composite Indexes for Common Queries

```sql
-- For dashboard performance queries
CREATE INDEX CONCURRENTLY idx_kpi_data_points_composite_dashboard
ON kpi_data_points(kpi_id, period_type, period_start_date DESC, calculated_at DESC);

-- For trend analysis queries
CREATE INDEX CONCURRENTLY idx_kpi_data_points_composite_trend
ON kpi_data_points(kpi_id, period_start_date, actual_value);

-- For status reporting queries
CREATE INDEX CONCURRENTLY idx_kpi_data_points_composite_status
ON kpi_data_points(status, period_type, period_start_date DESC);

-- For organizational breakdown queries
CREATE INDEX CONCURRENTLY idx_kpi_data_points_composite_org
ON kpi_data_points(org_id, kpi_id, period_start_date DESC);
```

#### 7.1.2 Partial Indexes for Filtered Data

```sql
-- Index only for active KPIs
CREATE INDEX CONCURRENTLY idx_kpi_definitions_active
ON kpi_definitions(category_id, level, kpi_code)
WHERE is_active = true;

-- Index only for recent data (last 2 years)
CREATE INDEX CONCURRENTLY idx_kpi_data_points_recent
ON kpi_data_points(kpi_id, period_start_date, actual_value)
WHERE period_start_date >= CURRENT_DATE - INTERVAL '2 years';

-- Index only for critical status KPIs
CREATE INDEX CONCURRENTLY idx_kpi_data_points_critical
ON kpi_data_points(kpi_id, calculated_at)
WHERE status IN ('CRITICAL', 'WARNING');
```

### 7.2 Partitioning Strategy

#### 7.2.1 Time-based Partitioning for KPI Data

```sql
-- Create partitioned table for historical KPI data
CREATE TABLE kpi_data_points_partitioned (
    LIKE kpi_data_points INCLUDING ALL
) PARTITION BY RANGE (period_start_date);

-- Create monthly partitions
DO $$
DECLARE
    v_start_date DATE := '2025-01-01';
    v_end_date DATE := '2027-01-01';
    v_current_date DATE;
BEGIN
    v_current_date := v_start_date;
    WHILE v_current_date < v_end_date LOOP
        EXECUTE format('
            CREATE TABLE IF NOT EXISTS kpi_data_points_y%sm%s
            PARTITION OF kpi_data_points_partitioned
            FOR VALUES FROM (%L) TO (%L)',
            EXTRACT(YEAR FROM v_current_date),
            LPAD(EXTRACT(MONTH FROM v_current_date)::TEXT, 2, '0'),
            v_current_date,
            v_current_date + INTERVAL '1 month'
        );
        v_current_date := v_current_date + INTERVAL '1 month';
    END LOOP;
END $$;
```

---

## 8. Security Considerations

### 8.1 Row-Level Security

#### 8.1.1 Organization-based Access Control

```sql
-- Enable row-level security on sensitive tables
ALTER TABLE kpi_data_points ENABLE ROW LEVEL SECURITY;

-- Policy for organizational access
CREATE POLICY org_data_access ON kpi_data_points
    USING (
        org_id IN (
            SELECT org_id FROM user_organization_access
            WHERE user_id = current_user_id()
        )
        OR current_user_id() IN (
            SELECT user_id FROM users WHERE role IN ('ADMIN', 'SUPER_ADMIN')
        )
    );

-- Policy for KPI category access
CREATE POLICY kpi_category_access ON kpi_data_points
    USING (
        kpi_id IN (
            SELECT kd.kpi_id FROM kpi_definitions kd
            JOIN kpi_category_permissions kcp ON kd.category_id = kcp.category_id
            WHERE kcp.role_id IN (
                SELECT role_id FROM user_roles WHERE user_id = current_user_id()
            )
        )
    );
```

### 8.2 Data Encryption

#### 8.2.1 Sensitive Data Protection

```sql
-- Create encryption extension
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Function to encrypt sensitive data
CREATE OR REPLACE FUNCTION encrypt_sensitive_data(data TEXT)
RETURNS TEXT AS $$
BEGIN
    RETURN encode(encrypt(data::bytea, current_setting('app.encryption_key'), 'aes'), 'base64');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to decrypt sensitive data
CREATE OR REPLACE FUNCTION decrypt_sensitive_data(encrypted_data TEXT)
RETURNS TEXT AS $$
BEGIN
    RETURN convert_from(decrypt(decode(encrypted_data, 'base64'), current_setting('app.encryption_key'), 'aes'), 'UTF8');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## 9. Maintenance and Operations

### 9.1 Automated Maintenance Procedures

#### 9.1.1 Data Retention Policy

```sql
CREATE OR REPLACE PROCEDURE implement_data_retention()
AS $$
BEGIN
    -- Archive old transaction data (older than 7 years)
    CREATE TABLE IF NOT EXISTS kpi_data_points_archive (LIKE kpi_data_points INCLUDING ALL);

    INSERT INTO kpi_data_points_archive
    SELECT * FROM kpi_data_points
    WHERE period_start_date < CURRENT_DATE - INTERVAL '7 years';

    DELETE FROM kpi_data_points
    WHERE period_start_date < CURRENT_DATE - INTERVAL '7 years';

    -- Archive audit trail older than 10 years
    CREATE TABLE IF NOT EXISTS audit_trail_archive (LIKE audit_trail INCLUDING ALL);

    INSERT INTO audit_trail_archive
    SELECT * FROM audit_trail
    WHERE operation_time < CURRENT_DATE - INTERVAL '10 years';

    DELETE FROM audit_trail
    WHERE operation_time < CURRENT_DATE - INTERVAL '10 years';

    -- Log retention operation
    INSERT INTO maintenance_log (
        operation_type, start_time, end_time, records_affected
    ) VALUES (
        'DATA_RETENTION', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP,
        (SELECT COUNT(*) FROM kpi_data_points_archive) + (SELECT COUNT(*) FROM audit_trail_archive)
    );

END;
$$ LANGUAGE plpgsql;
```

#### 9.1.2 Statistics Update

```sql
CREATE OR REPLACE PROCEDURE update_database_statistics()
AS $$
BEGIN
    -- Update table statistics for query optimizer
    ANALYZE kpi_definitions;
    ANALYZE kpi_data_points;
    ANALYZE kpi_categories;
    ANALYZE organizations;
    ANALYZE fact_kpi_performance;

    -- Update materialized view statistics
    ANALYZE mv_kpi_performance_summary;
    ANALYZE mv_monthly_kpi_trends;

    -- Rebuild indexes if needed
    REINDEX INDEX CONCURRENTLY idx_kpi_data_points_composite_dashboard;
    REINDEX INDEX CONCURRENTLY idx_fact_kpi_performance_kpi_id;

    -- Log maintenance operation
    INSERT INTO maintenance_log (
        operation_type, start_time, end_time
    ) VALUES (
        'UPDATE_STATISTICS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
    );

END;
$$ LANGUAGE plpgsql;
```

---

## 10. Conclusion

Standar data model ini menyediakan foundation yang komprehensif untuk Dashboard KPI INA-CRC dengan:

### 10.1 Key Features
1. **Complete Data Coverage:** Mendukung semua 149 KPI across 5 kategori
2. **Scalability:** Partitioned tables dan optimized indexes untuk large datasets
3. **Data Quality:** Comprehensive validation dan quality monitoring
4. **Audit Trail:** Complete tracking untuk compliance
5. **Performance:** Optimized untuk dashboard query performance
6. **Security:** Row-level security dan encryption untuk sensitive data

### 10.2 Implementation Benefits
1. **Single Source of Truth:** Centralized, trusted data repository
2. **Real-time Analytics:** Materialized views dan optimized queries
3. **Historical Analysis:** Time-based partitioning untuk trend analysis
4. **Compliance Ready:** Audit trail dan data governance features
5. **Scalable Architecture:** Dapat menangani pertumbuhan data dan users

### 10.3 Next Steps
1. **Database Setup:** Implement schema di PostgreSQL/MySQL environment
2. **Data Migration:** Migrate existing KPI data ke new schema
3. **API Development:** Build REST APIs untuk data access
4. **Testing:** Comprehensive testing untuk performance dan accuracy
5. **Training:** Tim training untuk data management dan operations

---

**Document Control:**
- **Version:** 1.0
- **Next Review:** Q1 2026 (Post-implementation)
- **Technical Review Required:** Database Architecture Team
- **Business Review Required:** KPI Governance Committee

**Prepared by:**
Data Architecture Team, INA-CRC
Date: 4 December 2025