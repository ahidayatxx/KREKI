# Standar Metadata Schema INA-CRC Dashboard KPI

**Status:** DRAFT
**Versi:** 1.0
**Tanggal:** 4 Desember 2025
**Pemilik:** Tim Data Governance INA-CRC

---

## 1. Overview

Dokumen ini mendefinisikan standar metadata schema komprehensif untuk mendukung Dashboard KPI INA-CRC. Schema ini dirancang untuk memberikan konteks lengkap tentang data, memastikan traceability, dan mendukung data governance framework yang robust.

### 1.1 Metadata Philosophy
1. **Contextual Richness:** Metadata harus memberikan konteks bisnis dan teknis yang lengkap
2. **Automation:** Capture metadata otomatis dimana memungkinkan
3. **Searchability:** Metadata harus mudah dicari dan diakses
4. **Governance:** Metadata mendukung compliance dan audit requirements
5. **Usability:** Metadata mudah dipahami oleh business users dan technical teams

### 1.2 Metadata Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                    Metadata Portal                         │
│  ├── Search & Discovery                                   │
│  ├── Business Glossary                                    │
│  ├── Data Catalog                                         │
│  ├── Lineage Visualizer                                   │
│  └── Quality Dashboard                                    │
├─────────────────────────────────────────────────────────────┤
│                    Metadata Repository                    │
│  ├── Business Metadata Layer                              │
│  │   ├── KPI Definitions                                  │
│  │   ├── Business Rules                                   │
│  │   ├── Data Stewardship                                 │
│  │   └── Business Glossary                                │
│  ├── Technical Metadata Layer                             │
│  │   ├── Data Models                                      │
│  │   ├── API Specifications                               │
│  │   ├── System Interfaces                                │
│  │   └── Transformation Rules                             │
│  ├── Operational Metadata Layer                           │
│  │   ├── Data Quality Metrics                             │
│  │   ├── Processing Logs                                   │
│  │   ├── Usage Statistics                                 │
│  │   └── Performance Metrics                               │
│  └── Governance Metadata Layer                            │
│      ├── Data Classification                              │
│      ├── Access Controls                                  │
│      ├── Retention Policies                               │
│      └── Compliance Requirements                           │
├─────────────────────────────────────────────────────────────┤
│                    Metadata Sources                        │
│  ├── Automatic Capture                                    │
│  │   ├── Database Schema                                   │
│  │   ├── API Definitions                                   │
│  │   ├── ETL Processes                                     │
│  │   └── System Logs                                       │
│  ├── Manual Entry                                         │
│  │   ├── Business Definitions                              │
│  │   ├── Data Stewards                                    │
│  │   ├── Quality Rules                                     │
│  │   └── Governance Policies                               │
│  └── External Sources                                      │
│      ├── Regulatory Documents                             │
│      ├── Industry Standards                               │
│      ├── Vendor Specifications                            │
│      └── Research Papers                                   │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Core Metadata Schema

### 2.1 Business Metadata Schema

#### 2.1.1 KPI Business Definition

**Table: kpi_business_metadata**
```sql
CREATE TABLE kpi_business_metadata (
    metadata_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    kpi_id UUID NOT NULL REFERENCES kpi_definitions(kpi_id),
    business_context JSONB NOT NULL,
    business_definition JSONB NOT NULL,
    data_definition JSONB NOT NULL,
    quality_definition JSONB NOT NULL,
    governance_definition JSONB NOT NULL,
    version INTEGER DEFAULT 1,
    effective_date DATE DEFAULT CURRENT_DATE,
    expiry_date DATE,
    status VARCHAR(20) DEFAULT 'ACTIVE', -- ACTIVE, DRAFT, DEPRECATED, RETIRED
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES users(user_id),
    updated_by UUID REFERENCES users(user_id),

    CONSTRAINT chk_metadata_status CHECK (status IN ('ACTIVE', 'DRAFT', 'DEPRECATED', 'RETIRED')),
    CONSTRAINT chk_dates CHECK (expiry_date IS NULL OR expiry_date > effective_date),
    CONSTRAINT chk_version CHECK (version > 0)
);

-- JSONB Structure for business_context:
{
  "purpose": "Why this KPI exists and what business need it addresses",
  "business_question": "What specific business question does this KPI answer?",
  "success_criteria": "What constitutes success for this KPI?",
  "business_impact": "How this KPI impacts business outcomes",
  "strategic_alignment": "How this KPI aligns with organizational strategy",
  "limitations": "Known limitations or constraints of this KPI",
  "assumptions": "Key assumptions underlying this KPI calculation",
  "dependencies": "Other KPIs or processes this KPI depends on",
  "stakeholders": ["Internal stakeholders who use or care about this KPI"],
  "decision_making": "How this KPI is used in decision making processes"
}

-- JSONB Structure for data_definition:
{
  "numerator": "Clear definition of what goes into the numerator",
  "denominator": "Clear definition of what goes into the denominator",
  "inclusions": "What should be included in the calculation",
  "exclusions": "What should be excluded from the calculation",
  "counting_rules": "Specific rules about how to count or measure",
  "time_period_rules": "How time periods should be handled",
  "boundary_conditions": "Edge cases and how to handle them",
  "calculation_examples": ["Examples of how the calculation works"],
  "data_elements": ["Specific data elements used in calculation"]
}

-- JSONB Structure for quality_definition:
{
  "validation_rules": ["Rules for validating data quality"],
  "quality_thresholds": {
    "completeness_min": 0.95,
    "accuracy_min": 0.98,
    "timeliness_max_hours": 24,
    "consistency_min": 0.90
  },
  "quality_checks": ["Specific quality checks to perform"],
  "error_handling": "How to handle quality issues",
  "quality_monitoring": "How quality is monitored over time",
  "improvement_actions": ["Actions to take when quality issues are found"]
}

-- JSONB Structure for governance_definition:
{
  "approval_workflow": "Workflow for approving changes to this KPI",
  "review_frequency": "How often this KPI should be reviewed",
  "change_management": {
    "change_types": ["Types of changes that require approval"],
    "approval_levels": ["Levels of approval required"],
    "documentation_requirements": ["Documentation needed for changes"]
  },
  "audit_requirements": ["Audit trail and documentation requirements"],
  "compliance_standards": ["Regulatory or compliance standards this KPI must meet"],
  "retention_policy": {
    "data_retention_years": 7,
    "archive_requirements": ["Requirements for archiving data"],
    "disposition_policy": "How to dispose of data after retention period"
  },
  "access_controls": {
    "access_level": "Level of access restriction",
    "authorized_roles": ["Roles authorized to access this KPI"],
    "data_classification": "Classification level of this KPI"
  }
}
```

#### 2.1.2 Business Glossary

**Table: business_glossary**
```sql
CREATE TABLE business_glossary (
    term_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    term_name VARCHAR(200) NOT NULL,
    term_name_id VARCHAR(200),
    term_definition TEXT NOT NULL,
    term_definition_id TEXT,
    synonyms JSONB, -- Array of alternative terms
    abbreviations JSONB, -- Array of common abbreviations
    business_domain VARCHAR(100),
    context_usage TEXT,
    examples JSONB, -- Array of usage examples
    related_terms JSONB, -- Array of related term IDs
    data_elements JSONB, -- Data elements that implement this term
    business_rules JSONB, -- Business rules related to this term
    steward_id UUID REFERENCES persons(person_id),
    expert_id UUID REFERENCES persons(person_id),
    approval_status VARCHAR(20) DEFAULT 'DRAFT', -- DRAFT, PENDING_APPROVAL, APPROVED, REJECTED
    approved_by UUID REFERENCES persons(person_id),
    approved_at TIMESTAMP WITH TIME ZONE,
    version INTEGER DEFAULT 1,
    effective_date DATE DEFAULT CURRENT_DATE,
    expiry_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES users(user_id),
    updated_by UUID REFERENCES users(user_id),

    CONSTRAINT chk_approval_status CHECK (approval_status IN ('DRAFT', 'PENDING_APPROVAL', 'APPROVED', 'REJECTED')),
    CONSTRAINT chk_version CHECK (version > 0),
    CONSTRAINT chk_dates CHECK (expiry_date IS NULL OR expiry_date > effective_date),
    CONSTRAINT chk_unique_term UNIQUE(term_name, business_domain)
);

CREATE INDEX idx_business_glossary_term_name ON business_glossary(term_name);
CREATE INDEX idx_business_glossary_business_domain ON business_glossary(business_domain);
CREATE INDEX idx_business_glossary_approval_status ON business_glossary(approval_status);
CREATE INDEX idx_business_glossary_steward ON business_glossary(steward_id);
CREATE INDEX idx_business_glossary_fulltext ON business_glossary USING GIN(to_tsvector('id', term_name || ' ' || term_definition));
```

#### 2.1.3 Data Stewardship

**Table: data_stewardship**
```sql
CREATE TABLE data_stewardship (
    stewardship_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    data_asset_type VARCHAR(50) NOT NULL, -- KPI, DATASET, SYSTEM, REPORT, API
    data_asset_id UUID NOT NULL, -- Reference to the actual data asset
    stewardship_role VARCHAR(50) NOT NULL, -- OWNER, STEWARD, CUSTODIAN, EXPERT
    person_id UUID NOT NULL REFERENCES persons(person_id),
    organization_id UUID REFERENCES organizations(org_id),
    responsibilities JSONB, -- Specific responsibilities for this role
    authority_level VARCHAR(30) NOT NULL, -- APPROVE, REVIEW, CONSULT, INFORM
    contact_preferences JSONB, -- Preferred contact methods and frequency
    delegation_rules JSONB, -- Rules for delegating responsibilities
    backup_steward_id UUID REFERENCES persons(person_id), -- Backup contact
    effective_date DATE DEFAULT CURRENT_DATE,
    expiry_date DATE,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES users(user_id),
    updated_by UUID REFERENCES users(user_id),

    CONSTRAINT chk_asset_type CHECK (data_asset_type IN ('KPI', 'DATASET', 'SYSTEM', 'REPORT', 'API')),
    CONSTRAINT chk_stewardship_role CHECK (stewardship_role IN ('OWNER', 'STEWARD', 'CUSTODIAN', 'EXPERT')),
    CONSTRAINT chk_authority_level CHECK (authority_level IN ('APPROVE', 'REVIEW', 'CONSULT', 'INFORM')),
    CONSTRAINT chk_unique_stewardship UNIQUE(data_asset_type, data_asset_id, stewardship_role, person_id),
    CONSTRAINT chk_dates CHECK (expiry_date IS NULL OR expiry_date > effective_date)
);

CREATE INDEX idx_data_stewardship_asset ON data_stewardship(data_asset_type, data_asset_id);
CREATE INDEX idx_data_stewardship_person ON data_stewardship(person_id);
CREATE INDEX idx_data_stewardship_role ON data_stewardship(stewardship_role);
CREATE INDEX idx_data_stewardship_is_primary ON data_stewardship(is_primary);
CREATE INDEX idx_data_stewardship_effective ON data_stewardship(effective_date, expiry_date);
```

### 2.2 Technical Metadata Schema

#### 2.2.1 System Integration Metadata

**Table: system_integrations**
```sql
CREATE TABLE system_integrations (
    integration_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    integration_code VARCHAR(50) UNIQUE NOT NULL,
    integration_name VARCHAR(200) NOT NULL,
    integration_type VARCHAR(30) NOT NULL, -- API, DATABASE, FILE_TRANSFER, EVENT_DRIVEN
    source_system_id UUID NOT NULL REFERENCES data_sources(source_id),
    target_system_id UUID NOT NULL REFERENCES data_sources(source_id),
    integration_pattern VARCHAR(50), -- REQUEST_RESPONSE, PUBLISH_SUBSCRIBE, BATCH, STREAMING
    protocol VARCHAR(50), -- HTTP, HTTPS, FTP, SFTP, JDBC, AMQP, KAFKA
    data_format VARCHAR(30), -- JSON, XML, CSV, AVRO, PARQUET, PROTOBUF
    frequency VARCHAR(30), -- REAL_TIME, NEAR_REAL_TIME, BATCH, SCHEDULED
    sla_requirements JSONB,
    technical_specifications JSONB,
    error_handling JSONB,
    monitoring_configuration JSONB,
    security_configuration JSONB,
    version VARCHAR(20) DEFAULT '1.0',
    status VARCHAR(20) DEFAULT 'ACTIVE', -- ACTIVE, INACTIVE, DEPRECATED, UNDER_MAINTENANCE
    owned_by UUID REFERENCES organizations(org_id),
    technical_contact_id UUID REFERENCES persons(person_id),
    business_contact_id UUID REFERENCES persons(person_id),
    documentation_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_integration_type CHECK (integration_type IN ('API', 'DATABASE', 'FILE_TRANSFER', 'EVENT_DRIVEN')),
    CONSTRAINT chk_integration_pattern CHECK (integration_pattern IN ('REQUEST_RESPONSE', 'PUBLISH_SUBSCRIBE', 'Batch', 'STREAMING')),
    CONSTRAINT chk_protocol CHECK (protocol IN ('HTTP', 'HTTPS', FTP', 'SFTP', 'JDBC', 'AMQP', 'KAFKA', 'REST', 'SOAP')),
    CONSTRAINT chk_data_format CHECK (data_format IN ('JSON', 'XML', 'CSV', 'AVRO', 'PARQUET', 'PROTOBUF')),
    CONSTRAINT chk_frequency CHECK (frequency IN ('REAL_TIME', 'NEAR_REAL_TIME', 'BATCH', 'SCHEDULED', 'ON_DEMAND')),
    CONSTRAINT chk_status CHECK (status IN ('ACTIVE', 'INACTIVE', 'DEPRECATED', 'UNDER_MAINTENANCE'))
);

-- JSONB Structure for technical_specifications:
{
  "endpoints": [
    {
      "name": "API endpoint name",
      "url": "https://api.example.com/endpoint",
      "method": "GET/POST/PUT/DELETE",
      "authentication": "OAuth2, API_KEY, BASIC_AUTH",
      "rate_limit": {
        "requests_per_minute": 1000,
        "burst_limit": 100
      },
      "timeout_seconds": 30,
      "retry_policy": {
        "max_retries": 3,
        "backoff_strategy": "exponential",
        "retry_conditions": ["timeout", "5xx_errors"]
      }
    }
  ],
  "data_schema": {
    "input_schema": "JSON Schema for input data",
    "output_schema": "JSON Schema for output data",
    "error_responses": ["Expected error response formats"]
  },
  "performance_requirements": {
    "response_time_p95_ms": 500,
    "throughput_rps": 1000,
    "availability_percentage": 99.9
  },
  "scalability_config": {
    "horizontal_scaling": true,
    "max_concurrent_connections": 1000,
    "auto_scaling_enabled": true
  }
}

CREATE INDEX idx_system_integrations_source_target ON system_integrations(source_system_id, target_system_id);
CREATE INDEX idx_system_integrations_type ON system_integrations(integration_type);
CREATE INDEX idx_system_integrations_status ON system_integrations(status);
```

#### 2.2.2 Data Transformation Metadata

**Table: data_transformations**
```sql
CREATE TABLE data_transformations (
    transformation_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    transformation_name VARCHAR(200) NOT NULL,
    transformation_code VARCHAR(50) UNIQUE NOT NULL,
    transformation_type VARCHAR(30) NOT NULL, -- CALCULATION, AGGREGATION, FILTER, ENRICHMENT, VALIDATION
    description TEXT,
    business_purpose TEXT,
    source_data_elements JSONB, -- Input data elements
    target_data_elements JSONB, -- Output data elements
    transformation_logic TEXT, -- Business logic description
    technical_implementation JSONB, -- Technical implementation details
    transformation_rules JSONB, -- Business rules applied
    dependencies JSONB, -- Dependencies on other transformations
    quality_checks JSONB, -- Quality validation checks
    error_handling JSONB, -- Error handling procedures
    performance_metrics JSONB, -- Expected performance characteristics
    version VARCHAR(20) DEFAULT '1.0',
    status VARCHAR(20) DEFAULT 'ACTIVE', -- ACTIVE, INACTIVE, DEPRECATED, TESTING
    developed_by UUID REFERENCES persons(person_id),
    reviewed_by UUID REFERENCES persons(person_id),
    approved_by UUID REFERENCES persons(person_id),
    last_tested_at TIMESTAMP WITH TIME ZONE,
    test_results JSONB,
    documentation_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_transformation_type CHECK (transformation_type IN ('CALCULATION', 'AGGREGATION', 'FILTER', 'ENRICHMENT', 'VALIDATION')),
    CONSTRAINT chk_status CHECK (status IN ('ACTIVE', 'INACTIVE', 'DEPRECATED', 'TESTING'))
);

-- JSONB Structure for technical_implementation:
{
  "programming_language": "SQL/Python/JavaScript/etc",
  "implementation_details": {
    "sql_query": "SELECT statement for SQL transformations",
    "python_function": "Python code snippet",
    "javascript_code": "JavaScript code snippet"
  },
  "optimization_notes": "Performance optimization considerations",
  "resource_requirements": {
    "cpu_requirement": "LOW/MEDIUM/HIGH",
    "memory_requirement_mb": 512,
    "execution_time_estimate_seconds": 30
  },
  "execution_environment": "Production/Staging/Development",
  "dependencies": ["Libraries or frameworks required"],
  "deployment_details": {
    "container_image": "Docker image if containerized",
    "orchestration": "Kubernetes/Airflow/etc",
    "scheduling": "Cron expression or schedule details"
  }
}

CREATE INDEX idx_data_transformations_type ON data_transformations(transformation_type);
CREATE INDEX idx_data_transformations_status ON data_transformations(status);
CREATE INDEX idx_data_transformations_developer ON data_transformations(developed_by);
```

#### 2.2.3 API Documentation Metadata

**Table: api_documentation**
```sql
CREATE TABLE api_documentation (
    api_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    api_name VARCHAR(200) NOT NULL,
    api_version VARCHAR(20) NOT NULL,
    base_url VARCHAR(500) NOT NULL,
    api_type VARCHAR(30) NOT NULL, -- REST, SOAP, GRAPHQL, WEBSOCKET
    description TEXT,
    authentication_mechanisms JSONB, -- Supported auth methods
    rate_limiting JSONB, -- Rate limiting configuration
    endpoints JSONB, -- Array of endpoint definitions
    data_models JSONB, -- Request/response data models
    error_codes JSONB, -- Error code definitions
    examples JSONB, -- Usage examples
    testing_instructions JSONB, -- How to test the API
    monitoring_endpoints JSONB, -- Health check and monitoring endpoints
    changelog JSONB, -- Version history
    deprecation_schedule JSONB, -- Planned deprecations
    support_contacts JSONB, -- Who to contact for support
    documentation_url TEXT,
    swagger_specification TEXT, -- OpenAPI/Swagger specification
    postman_collection JSONB, -- Postman collection for testing
    status VARCHAR(20) DEFAULT 'ACTIVE', -- ACTIVE, DEPRECATED, UNDER_DEVELOPMENT
    owned_by UUID REFERENCES organizations(org_id),
    technical_lead_id UUID REFERENCES persons(person_id),
    product_manager_id UUID REFERENCES persons(person_id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_api_type CHECK (api_type IN ('REST', 'SOAP', 'GRAPHQL', 'WEBSOCKET')),
    CONSTRAINT chk_status CHECK (status IN ('ACTIVE', 'DEPRECATED', 'UNDER_DEVELOPMENT', 'RETIRED'))
);

-- JSONB Structure for endpoints:
{
  "endpoints": [
    {
      "path": "/api/v1/kpi/{kpi_id}",
      "method": "GET",
      "summary": "Retrieve KPI data",
      "description": "Get current and historical KPI data",
      "parameters": [
        {
          "name": "kpi_id",
          "in": "path",
          "required": true,
          "type": "string",
          "description": "Unique identifier of the KPI"
        },
        {
          "name": "period_start",
          "in": "query",
          "required": false,
          "type": "string",
          "format": "date",
          "description": "Start date for historical data"
        }
      ],
      "responses": {
        "200": {
          "description": "Successful response",
          "schema": {
            "$ref": "#/definitions/KPIResponse"
          }
        },
        "404": {
          "description": "KPI not found"
        }
      },
      "security": [
        {
          "oauth2": ["read:kpi"]
        }
      ]
    }
  ]
}

CREATE INDEX idx_api_documentation_name_version ON api_documentation(api_name, api_version);
CREATE INDEX idx_api_documentation_type ON api_documentation(api_type);
CREATE INDEX idx_api_documentation_status ON api_documentation(status);
```

### 2.3 Operational Metadata Schema

#### 2.3.1 Data Quality Monitoring

**Table: operational_quality_metrics**
```sql
CREATE TABLE operational_quality_metrics (
    quality_metric_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    data_asset_type VARCHAR(50) NOT NULL,
    data_asset_id UUID NOT NULL,
    metric_type VARCHAR(50) NOT NULL, -- COMPLETENESS, ACCURACY, TIMELINESS, CONSISTENCY, VALIDITY, UNIQUENESS
    metric_value DECIMAL(10,4) NOT NULL,
    metric_threshold DECIMAL(10,4),
    metric_grade VARCHAR(20), -- EXCELLENT, GOOD, ACCEPTABLE, POOR, CRITICAL
    measurement_period_start TIMESTAMP WITH TIME ZONE,
    measurement_period_end TIMESTAMP WITH TIME ZONE,
    record_count_evaluated INTEGER,
    record_count_passed INTEGER,
    record_count_failed INTEGER,
    failure_details JSONB, -- Details about what failed validation
    corrective_actions_taken JSONB, -- Actions taken to address quality issues
    impact_assessment JSONB, -- Business impact assessment
    automated_check BOOLEAN DEFAULT true,
    manual_verification BOOLEAN DEFAULT false,
    verified_by UUID REFERENCES persons(person_id),
    verified_at TIMESTAMP WITH TIME ZONE,
    quality_trend VARCHAR(20), -- IMPROVING, STABLE, DECLINING
    alert_triggered BOOLEAN DEFAULT false,
    alert_severity VARCHAR(20), -- INFO, WARNING, ERROR, CRITICAL
    measurement_source VARCHAR(100), -- System or process that measured this
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_metric_type CHECK (metric_type IN ('COMPLETENESS', 'ACCURACY', 'TIMELINESS', 'CONSISTENCY', 'VALIDITY', 'UNIQUENESS')),
    CONSTRAINT chk_metric_grade CHECK (metric_grade IN ('EXCELLENT', 'GOOD', 'ACCEPTABLE', 'POOR', 'CRITICAL')),
    CONSTRAINT chk_quality_trend CHECK (quality_trend IN ('IMPROVING', 'STABLE', 'DECLINING')),
    CONSTRAINT chk_alert_severity CHECK (alert_severity IN ('INFO', 'WARNING', 'ERROR', 'CRITICAL')),
    CONSTRAINT chk_metric_value CHECK (metric_value >= 0 AND metric_value <= 1)
);

CREATE INDEX idx_operational_quality_asset ON operational_quality_metrics(data_asset_type, data_asset_id);
CREATE INDEX idx_operational_quality_type ON operational_quality_metrics(metric_type);
CREATE INDEX idx_operational_quality_period ON operational_quality_metrics(measurement_period_start, measurement_period_end);
CREATE INDEX idx_operational_quality_grade ON operational_quality_metrics(metric_grade);
CREATE INDEX idx_operational_quality_alert ON operational_quality_metrics(alert_triggered, alert_severity);
```

#### 2.3.2 System Performance Metrics

**Table: system_performance_metrics**
```sql
CREATE TABLE system_performance_metrics (
    performance_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    system_id UUID NOT NULL REFERENCES data_sources(source_id),
    component_name VARCHAR(100), -- Specific system component
    metric_name VARCHAR(100) NOT NULL, -- response_time, throughput, error_rate, etc.
    metric_value DECIMAL(15,4) NOT NULL,
    metric_unit VARCHAR(30), -- milliseconds, requests_per_second, percentage, etc.
    measurement_timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    measurement_period_minutes INTEGER DEFAULT 5,
    threshold_warning DECIMAL(15,4),
    threshold_critical DECIMAL(15,4),
    status VARCHAR(20), -- HEALTHY, WARNING, CRITICAL, UNKNOWN
    additional_metrics JSONB, -- Related metrics in key-value format
    environmental_factors JSONB, -- Load, concurrent users, data volume, etc.
    incident_impact BOOLEAN DEFAULT false,
    incident_details JSONB, -- Related incident information
    sla_compliance BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_status CHECK (status IN ('HEALTHY', 'WARNING', 'CRITICAL', 'UNKNOWN')),
    CONSTRAINT chk_metric_unit CHECK (metric_unit IN ('milliseconds', 'seconds', 'requests_per_second', 'percentage', 'count', 'bytes', 'cpu_percent', 'memory_percent')),
    CONSTRAINT chk_positive_value CHECK (metric_value >= 0),
    CONSTRAINT chk_measurement_period CHECK (measurement_period_minutes > 0)
);

CREATE INDEX idx_system_performance_system_timestamp ON system_performance_metrics(system_id, measurement_timestamp);
CREATE INDEX idx_system_performance_metric_name ON system_performance_metrics(metric_name);
CREATE INDEX idx_system_performance_status ON system_performance_metrics(status);
CREATE INDEX idx_system_performance_incident ON system_performance_metrics(incident_impact);
```

#### 2.3.3 Usage Analytics

**Table: usage_analytics**
```sql
CREATE TABLE usage_analytics (
    usage_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id),
    session_id VARCHAR(100),
    event_type VARCHAR(50) NOT NULL, -- LOGIN, LOGOUT, VIEW, EXPORT, SEARCH, DOWNLOAD, API_CALL
    resource_type VARCHAR(50) NOT NULL, -- DASHBOARD, REPORT, KPI, DATASET, API_ENDPOINT
    resource_id UUID, -- ID of the specific resource accessed
    resource_name VARCHAR(200),
    action_details JSONB, -- Details about the specific action
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    session_duration_seconds INTEGER,
    ip_address INET,
    user_agent TEXT,
    device_type VARCHAR(30), -- DESKTOP, MOBILE, TABLET, API_CLIENT
    browser VARCHAR(50),
    operating_system VARCHAR(50),
    response_time_ms INTEGER,
    success BOOLEAN DEFAULT true,
    error_code VARCHAR(50),
    error_message TEXT,
    page_views INTEGER DEFAULT 1, -- For page view events
    data_volume_mb DECIMAL(10,2), -- Amount of data transferred
    cost_impact DECIMAL(10,4), -- Estimated cost of this usage
    business_value JSONB, -- Estimated business value
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_event_type CHECK (event_type IN ('LOGIN', 'LOGOUT', 'VIEW', 'EXPORT', 'SEARCH', 'DOWNLOAD', 'API_CALL', 'CREATE', 'UPDATE', 'DELETE')),
    CONSTRAINT chk_resource_type CHECK (resource_type IN ('DASHBOARD', 'REPORT', 'KPI', 'DATASET', 'API_ENDPOINT', 'DOCUMENTATION')),
    CONSTRAINT chk_device_type CHECK (device_type IN ('DESKTOP', 'MOBILE', 'TABLET', 'API_CLIENT'))
);

CREATE INDEX idx_usage_analytics_user_timestamp ON usage_analytics(user_id, timestamp);
CREATE INDEX idx_usage_analytics_event_type ON usage_analytics(event_type);
CREATE INDEX idx_usage_analytics_resource ON usage_analytics(resource_type, resource_id);
CREATE INDEX idx_usage_analytics_session ON usage_analytics(session_id);
CREATE INDEX idx_usage_analytics_success ON usage_analytics(success, timestamp);
```

### 2.4 Governance Metadata Schema

#### 2.4.1 Data Classification

**Table: data_classification**
```sql
CREATE TABLE data_classification (
    classification_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    data_asset_type VARCHAR(50) NOT NULL,
    data_asset_id UUID NOT NULL,
    classification_level VARCHAR(30) NOT NULL, -- PUBLIC, INTERNAL, RESTRICTED, CONFIDENTIAL, HIGHLY_CONFIDENTIAL
    sensitivity_level VARCHAR(20) NOT NULL, -- LOW, MEDIUM, HIGH, CRITICAL
    business_impact_level VARCHAR(20) NOT NULL, -- LOW, MEDIUM, HIGH, CRITICAL
    legal_requirements JSONB, -- Legal and regulatory requirements
    retention_period_years INTEGER,
    archival_requirements JSONB, -- How data should be archived
    disposal_requirements JSONB, -- How data should be disposed
    access_restrictions JSONB, -- Who can access this data
    sharing_restrictions JSONB, -- Limitations on data sharing
    encryption_requirements JSONB, -- Encryption requirements for data at rest and in transit
    audit_requirements JSONB, -- Audit trail requirements
    compliance_standards JSONB, -- Compliance standards that apply
    risk_assessment JSONB, -- Risk assessment details
    approved_by UUID REFERENCES persons(person_id),
    approved_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    review_frequency_months INTEGER DEFAULT 12,
    last_reviewed_at TIMESTAMP WITH TIME ZONE,
    next_review_date DATE,
    status VARCHAR(20) DEFAULT 'ACTIVE', -- ACTIVE, UNDER_REVIEW, UPDATED, DEPRECATED
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES users(user_id),
    updated_by UUID REFERENCES users(user_id),

    CONSTRAINT chk_classification_level CHECK (classification_level IN ('PUBLIC', 'INTERNAL', 'RESTRICTED', 'CONFIDENTIAL', 'HIGHLY_CONFIDENTIAL')),
    CONSTRAINT chk_sensitivity_level CHECK (sensitivity_level IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
    CONSTRAINT chk_business_impact CHECK (business_impact_level IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
    CONSTRAINT chk_retention_period CHECK (retention_period_years >= 0 AND retention_period_years <= 100),
    CONSTRAINT chk_status CHECK (status IN ('ACTIVE', 'UNDER_REVIEW', 'UPDATED', 'DEPRECATED')),
    CONSTRAINT chk_unique_classification UNIQUE(data_asset_type, data_asset_id)
);

-- JSONB Structure for access_restrictions:
{
  "minimum_clearance_level": "SECURITY_CLEARANCE_REQUIRED",
  "role_based_access": ["ROLES_THAT_CAN_ACCESS"],
  "departmental_access": ["DEPARTMENTS_THAT_CAN_ACCESS"],
  "geographic_restrictions": ["LOCATIONS_WHERE_ACCESS_IS_ALLOWED"],
  "time_based_restrictions": {
    "business_hours_only": true,
    "allowed_days": ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"],
    "allowed_time_range": "08:00-18:00"
  },
  "purpose_based_access": ["AUTHORIZED_PURPOSES"],
  "approval_required": true,
  "approval_workflow": "APPROVAL_WORKFLOW_NAME"
}

CREATE INDEX idx_data_classification_level ON data_classification(classification_level);
CREATE INDEX idx_data_classification_sensitivity ON data_classification(sensitivity_level);
CREATE INDEX idx_data_classification_asset ON data_classification(data_asset_type, data_asset_id);
CREATE INDEX idx_data_classification_next_review ON data_classification(next_review_date);
```

#### 2.4.2 Compliance and Regulatory

**Table: regulatory_compliance**
```sql
CREATE TABLE regulatory_compliance (
    compliance_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    regulation_name VARCHAR(200) NOT NULL,
    regulation_code VARCHAR(50),
    regulatory_body VARCHAR(200), -- BPOM, KEMENKES, KOMINFO, etc.
    compliance_type VARCHAR(50) NOT NULL, -- DATA_PROTECTION, PRIVACY, SECURITY, AUDIT, REPORTING
    compliance_requirement TEXT NOT NULL,
    applicable_data_assets JSONB, -- Data assets this requirement applies to
    compliance_controls JSONB, -- Controls implemented to meet the requirement
    evidence_of_compliance JSONB, -- Evidence showing compliance
    compliance_status VARCHAR(20) DEFAULT 'COMPLIANT', -- COMPLIANT, NON_COMPLIANT, PARTIALLY_COMPLIANT, NOT_APPLICABLE
    risk_level VARCHAR(20), -- LOW, MEDIUM, HIGH, CRITICAL
    mitigation_actions JSONB, -- Actions taken to mitigate non-compliance
    audit_findings JSONB, -- Findings from audits or assessments
    corrective_actions JSONB, -- Corrective action plans
    compliance_percentage DECIMAL(5,2), -- Percentage compliance
    last_assessment_date DATE,
    next_assessment_date DATE,
    assessor_id UUID REFERENCES persons(person_id),
    approved_by UUID REFERENCES persons(person_id),
    documentation_references JSONB, -- Links to compliance documentation
    monitoring_frequency VARCHAR(30), -- CONTINUOUS, DAILY, WEEKLY, MONTHLY, QUARTERLY
    automated_monitoring BOOLEAN DEFAULT false,
    alerts_enabled BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_compliance_type CHECK (compliance_type IN ('DATA_PROTECTION', 'PRIVACY', 'SECURITY', 'AUDIT', 'REPORTING', 'QUALITY')),
    CONSTRAINT chk_compliance_status CHECK (compliance_status IN ('COMPLIANT', 'NON_COMPLIANT', 'PARTIALLY_COMPLIANT', 'NOT_APPLICABLE')),
    CONSTRAINT chk_risk_level CHECK (risk_level IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
    CONSTRAINT chk_compliance_percentage CHECK (compliance_percentage >= 0 AND compliance_percentage <= 100)
);

CREATE INDEX idx_regulatory_compliance_regulation ON regulatory_compliance(regulation_name);
CREATE INDEX idx_regulatory_compliance_status ON regulatory_compliance(compliance_status);
CREATE INDEX idx_regulatory_compliance_risk ON regulatory_compliance(risk_level);
CREATE INDEX idx_regulatory_compliance_next_assessment ON regulatory_compliance(next_assessment_date);
```

#### 2.4.3 Change Management Metadata

**Table: change_management_metadata**
```sql
CREATE TABLE change_management_metadata (
    change_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    change_request_id VARCHAR(50) UNIQUE NOT NULL,
    change_title VARCHAR(500) NOT NULL,
    change_description TEXT,
    change_type VARCHAR(50) NOT NULL, -- KPI_DEFINITION, DATA_SOURCE, CALCULATION_LOGIC, SYSTEM_UPDATE
    change_category VARCHAR(50), -- EMERGENCY, STANDARD, MAJOR, MINOR
    priority_level VARCHAR(20) NOT NULL, -- LOW, MEDIUM, HIGH, CRITICAL
    affected_assets JSONB, -- Data assets affected by this change
    business_justification TEXT,
    technical_implementation JSONB,
    rollback_plan JSONB,
    testing_plan JSONB,
    change_impact JSONB, -- Assessment of change impact
    risk_assessment JSONB,
    approval_workflow JSONB,
    approval_status VARCHAR(20) DEFAULT 'PENDING', -- PENDING, APPROVED, REJECTED, CANCELLED
    approved_by UUID REFERENCES persons(person_id),
    approved_at TIMESTAMP WITH TIME ZONE,
    implementation_schedule JSONB,
    actual_start_time TIMESTAMP WITH TIME ZONE,
    actual_end_time TIMESTAMP WITH TIME ZONE,
    change_status VARCHAR(20) DEFAULT 'PLANNED', -- PLANNED, IN_PROGRESS, COMPLETED, FAILED, ROLLED_BACK
    success_criteria JSONB,
    verification_results JSONB,
    lessons_learned TEXT,
    business_outcome JSONB,
    stakeholders JSONB, -- People and teams involved in the change
    communication_plan JSONB,
    documentation_updates JSONB,
    training_requirements JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES users(user_id),
    updated_by UUID REFERENCES users(user_id),

    CONSTRAINT chk_change_type CHECK (change_type IN ('KPI_DEFINITION', 'DATA_SOURCE', 'CALCULATION_LOGIC', 'SYSTEM_UPDATE', 'PROCESS_CHANGE')),
    CONSTRAINT chk_change_category CHECK (change_category IN ('EMERGENCY', 'STANDARD', 'MAJOR', 'MINOR')),
    CONSTRAINT chk_priority_level CHECK (priority_level IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
    CONSTRAINT chk_approval_status CHECK (approval_status IN ('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED')),
    CONSTRAINT chk_change_status CHECK (change_status IN ('PLANNED', 'IN_PROGRESS', 'COMPLETED', 'FAILED', 'ROLLED_BACK'))
);

-- JSONB Structure for business_outcome:
{
  "kpi_impact": {
    "affected_kpis": ["List of affected KPIs"],
    "expected_improvement": "Expected improvement in metrics",
    "actual_impact": "Actual impact after implementation"
  },
  "operational_efficiency": {
    "time_saved_hours": 40,
    "cost_reduction_percentage": 15,
    "process_improvements": ["List of process improvements"]
  },
  "quality_improvements": {
    "data_quality_improvement": "Improvement in data quality metrics",
    "error_reduction_percentage": 25,
    "user_satisfaction_improvement": "Improvement in user satisfaction"
  },
  "strategic_alignment": {
    "strategic_objectives_supported": ["List of strategic objectives"],
    "alignment_score": 0.95,
    "competitive_advantage": "Description of competitive advantage gained"
  }
}

CREATE INDEX idx_change_management_request_id ON change_management_metadata(change_request_id);
CREATE INDEX idx_change_management_type ON change_management_metadata(change_type);
CREATE INDEX idx_change_management_status ON change_management_metadata(change_status);
CREATE INDEX idx_change_management_priority ON change_management_metadata(priority_level);
CREATE INDEX idx_change_management_approval ON change_management_metadata(approval_status);
```

---

## 3. Metadata Management Processes

### 3.1 Metadata Lifecycle Management

#### 3.1.1 Metadata Creation Workflow

```sql
CREATE OR REPLACE PROCEDURE create_kpi_metadata(
    p_kpi_id UUID,
    p_business_context JSONB,
    p_data_definition JSONB,
    p_quality_definition JSONB,
    p_governance_definition JSONB,
    p_created_by UUID
) AS $$
DECLARE
    v_metadata_id UUID;
    v_approval_workflow_id UUID;
BEGIN
    -- Create metadata record
    INSERT INTO kpi_business_metadata (
        kpi_id,
        business_context,
        data_definition,
        quality_definition,
        governance_definition,
        created_by
    ) VALUES (
        p_kpi_id,
        p_business_context,
        p_data_definition,
        p_quality_definition,
        p_governance_definition,
        p_created_by
    ) RETURNING metadata_id INTO v_metadata_id;

    -- Initiate approval workflow if required
    IF p_governance_definition->>'approval_workflow' IS NOT NULL THEN
        INSERT INTO approval_workflows (
            metadata_id,
            workflow_type,
            workflow_definition,
            initiated_by,
            status
        ) VALUES (
            v_metadata_id,
            'METADATA_APPROVAL',
            p_governance_definition->>'approval_workflow',
            p_created_by,
            'PENDING_APPROVAL'
        ) RETURNING workflow_id INTO v_approval_workflow_id;

        -- Send notifications to approvers
        PERFORM send_approval_notifications(v_approval_workflow_id);
    END IF;

    -- Log metadata creation
    INSERT INTO metadata_audit_log (
        metadata_id,
        action_type,
        action_details,
        performed_by,
        performed_at
    ) VALUES (
        v_metadata_id,
        'CREATE',
        json_build_object(
            'kpi_id', p_kpi_id,
            'business_context', p_business_context,
            'data_definition', p_data_definition
        ),
        p_created_by,
        CURRENT_TIMESTAMP
    );

    COMMIT;
END;
$$ LANGUAGE plpgsql;
```

#### 3.1.2 Metadata Quality Assessment

```sql
CREATE OR REPLACE PROCEDURE assess_metadata_quality()
AS $$
DECLARE
    v_total_metadata INTEGER;
    v_complete_metadata INTEGER;
    v_quality_score DECIMAL;
    v_quality_issues JSONB[] := ARRAY[]::JSONB[];
BEGIN
    -- Count total metadata records
    SELECT COUNT(*) INTO v_total_metadata
    FROM kpi_business_metadata
    WHERE status = 'ACTIVE';

    -- Count complete metadata (all required fields filled)
    SELECT COUNT(*) INTO v_complete_metadata
    FROM kpi_business_metadata kbm
    WHERE kbm.status = 'ACTIVE'
    AND kbm.business_context IS NOT NULL
    AND kbm.business_context != '{}'::jsonb
    AND kbm.data_definition IS NOT NULL
    AND kbm.data_definition != '{}'::jsonb
    AND kbm.quality_definition IS NOT NULL
    AND kbm.quality_definition != '{}'::jsonb
    AND kbm.governance_definition IS NOT NULL
    AND kbm.governance_definition != '{}'::jsonb;

    -- Calculate quality score
    IF v_total_metadata > 0 THEN
        v_quality_score := (v_complete_metadata::DECIMAL / v_total_metadata::DECIMAL) * 100;
    ELSE
        v_quality_score := 0;
    END IF;

    -- Identify quality issues
    FOR v_quality_issues IN
        SELECT jsonb_build_object(
            'kpi_id', kd.kpi_id,
            'kpi_name', kd.kpi_name,
            'issue_type', 'MISSING_BUSINESS_CONTEXT'
        )
        FROM kpi_definitions kd
        LEFT JOIN kpi_business_metadata kbm ON kd.kpi_id = kbm.kpi_id
        WHERE kbm.business_context IS NULL OR kbm.business_context = '{}'::jsonb

        UNION ALL

        SELECT jsonb_build_object(
            'kpi_id', kd.kpi_id,
            'kpi_name', kd.kpi_name,
            'issue_type', 'MISSING_DATA_DEFINITION'
        )
        FROM kpi_definitions kd
        LEFT JOIN kpi_business_metadata kbm ON kd.kpi_id = kbm.kpi_id
        WHERE kbm.data_definition IS NULL OR kbm.data_definition = '{}'::jsonb

        UNION ALL

        SELECT jsonb_build_object(
            'kpi_id', kd.kpi_id,
            'kpi_name', kd.kpi_name,
            'issue_type', 'MISSING_STEWARD'
        )
        FROM kpi_definitions kd
        WHERE NOT EXISTS (
            SELECT 1 FROM data_stewardship ds
            WHERE ds.data_asset_type = 'KPI'
            AND ds.data_asset_id = kd.kpi_id
            AND ds.stewardship_role = 'OWNER'
        )
    LOOP
        v_quality_issues := array_append(v_quality_issues, v_quality_issues);
    END LOOP;

    -- Store quality assessment results
    INSERT INTO metadata_quality_assessments (
        assessment_date,
        total_metadata_count,
        complete_metadata_count,
        quality_score,
        quality_issues,
        improvement_recommendations
    ) VALUES (
        CURRENT_DATE,
        v_total_metadata,
        v_complete_metadata,
        v_quality_score,
        to_jsonb(v_quality_issues),
        jsonb_build_object(
            'recommendations', [
                'Complete missing business context definitions',
                'Add detailed data definitions',
                'Assign data stewards to all KPIs',
                'Review and update quality definitions'
            ]
        )
    );

    -- Send alert if quality score below threshold
    IF v_quality_score < 80 THEN
        PERFORM send_metadata_quality_alert(v_quality_score, v_quality_issues);
    END IF;

END;
$$ LANGUAGE plpgsql;
```

### 3.2 Metadata Search and Discovery

#### 3.2.1 Full-Text Search Implementation

```sql
-- Create full-text search indexes
CREATE INDEX CONCURRENTLY idx_kpi_metadata_fulltext_search
ON kpi_business_metadata USING GIN(
    to_tsvector('id',
        COALESCE(kbm.business_context->>'purpose', '') || ' ' ||
        COALESCE(kbm.business_context->>'business_question', '') || ' ' ||
        COALESCE(kbm.data_definition->>'numerator', '') || ' ' ||
        COALESCE(kbm.data_definition->>'denominator', '')
    )
);

-- Search function
CREATE OR REPLACE FUNCTION search_kpi_metadata(
    p_search_term TEXT,
    p_category_filter VARCHAR DEFAULT NULL,
    p_level_filter VARCHAR DEFAULT NULL,
    p_limit INTEGER DEFAULT 50,
    p_offset INTEGER DEFAULT 0
) RETURNS TABLE (
    kpi_id UUID,
    kpi_name VARCHAR,
    kpi_code VARCHAR,
    category_name VARCHAR,
    relevance_score REAL,
    metadata_snippet TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        kd.kpi_id,
        kd.kpi_name,
        kd.kpi_code,
        kc.category_name,
        ts_rank(
            to_tsvector('id',
                COALESCE(kbm.business_context->>'purpose', '') || ' ' ||
                COALESCE(kbm.business_context->>'business_question', '') || ' ' ||
                COALESCE(kbm.data_definition->>'numerator', '') || ' ' ||
                COALESCE(kbm.data_definition->>'denominator', '') || ' ' ||
                kd.kpi_name || ' ' || kd.kpi_code
            ),
            plainto_tsquery('id', p_search_term)
        ) AS relevance_score,
        ts_headline('id',
            COALESCE(kbm.business_context->>'purpose', ''),
            plainto_tsquery('id', p_search_term)
        ) AS metadata_snippet
    FROM kpi_definitions kd
    JOIN kpi_categories kc ON kd.category_id = kc.category_id
    LEFT JOIN kpi_business_metadata kbm ON kd.kpi_id = kbm.kpi_id
    WHERE kd.is_active = true
    AND (
        to_tsvector('id',
            COALESCE(kbm.business_context->>'purpose', '') || ' ' ||
            COALESCE(kbm.business_context->>'business_question', '') || ' ' ||
            COALESCE(kbm.data_definition->>'numerator', '') || ' ' ||
            COALESCE(kbm.data_definition->>'denominator', '') || ' ' ||
            kd.kpi_name || ' ' || kd.kpi_code
        ) @@ plainto_tsquery('id', p_search_term)
    )
    AND (p_category_filter IS NULL OR kc.category_name = p_category_filter)
    AND (p_level_filter IS NULL OR kd.level = p_level_filter)
    ORDER BY relevance_score DESC
    LIMIT p_limit
    OFFSET p_offset;
END;
$$ LANGUAGE plpgsql;
```

#### 3.2.2 Metadata Relationship Explorer

```sql
CREATE OR REPLACE FUNCTION explore_metadata_relationships(
    p_root_kpi_id UUID,
    p_relationship_depth INTEGER DEFAULT 3
) RETURNS TABLE (
    source_kpi_id UUID,
    source_kpi_name VARCHAR,
    relationship_type VARCHAR,
    target_kpi_id UUID,
    target_kpi_name VARCHAR,
    relationship_strength DECIMAL,
    path_depth INTEGER
) AS $$
WITH RECURSIVE relationship_graph AS (
    -- Base case: direct relationships
    SELECT
        kd.kpi_id as source_kpi_id,
        kd.kpi_name as source_kpi_name,
        'DEPENDS_ON' as relationship_type,
        (kbm.data_definition->>'dependencies')::json#>>'{0}' as target_reference,
        NULL::UUID as target_kpi_id,
        NULL::VARCHAR as target_kpi_name,
        0.9::DECIMAL as relationship_strength,
        1 as path_depth
    FROM kpi_definitions kd
    JOIN kpi_business_metadata kbm ON kd.kpi_id = kbm.kpi_id
    WHERE kd.kpi_id = p_root_kpi_id
    AND kbm.data_definition->>'dependencies' IS NOT NULL

    UNION ALL

    -- Recursive case: traverse relationships
    SELECT
        rg.source_kpi_id,
        rg.source_kpi_name,
        rg.relationship_type,
        kbmm.data_definition->>'dependencies' as target_reference,
        NULL::UUID as target_kpi_id,
        NULL::VARCHAR as target_kpi_name,
        rg.relationship_strength * 0.8 as relationship_strength,
        rg.path_depth + 1
    FROM relationship_graph rg
    JOIN kpi_definitions kd ON rg.source_kpi_id = kd.kpi_id
    JOIN kpi_business_metadata kbmm ON kd.kpi_id = kbmm.kpi_id
    WHERE kbmm.data_definition->>'dependencies' IS NOT NULL
    AND rg.path_depth < p_relationship_depth
)
SELECT
    rg.source_kpi_id,
    rg.source_kpi_name,
    rg.relationship_type,
    kd_target.kpi_id as target_kpi_id,
    kd_target.kpi_name as target_kpi_name,
    rg.relationship_strength,
    rg.path_depth
FROM relationship_graph rg
LEFT JOIN kpi_definitions kd_target ON rg.target_reference = kd_target.kpi_code
WHERE rg.target_kpi_id IS NOT NULL
ORDER BY rg.path_depth, rg.relationship_strength DESC;
$$ LANGUAGE plpgsql;
```

---

## 4. Metadata APIs

### 4.1 Metadata REST API Specification

#### 4.1.1 KPI Metadata Endpoints

```yaml
openapi: 3.0.3
info:
  title: INA-CRC Metadata API
  description: RESTful API for managing KPI metadata
  version: 1.0.0
  contact:
    name: INA-CRC Data Governance Team
    email: metadata@ina-crc.go.id

paths:
  /api/v1/kpi-metadata:
    get:
      summary: List KPI metadata
      parameters:
        - name: kpi_id
          in: query
          schema:
            type: string
            format: uuid
        - name: category
          in: query
          schema:
            type: string
        - name: level
          in: query
          schema:
            type: string
            enum: [STRATEGIC, OPERATIONAL]
        - name: status
          in: query
          schema:
            type: string
            enum: [ACTIVE, DRAFT, DEPRECATED]
        - name: page
          in: query
          schema:
            type: integer
            default: 1
        - name: limit
          in: query
          schema:
            type: integer
            default: 50
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: array
                    items:
                      $ref: '#/components/schemas/KPIMetadata'
                  pagination:
                    $ref: '#/components/schemas/Pagination'
                  metadata:
                    $ref: '#/components/schemas/ResponseMetadata'

    post:
      summary: Create KPI metadata
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateKPIMetadataRequest'
      responses:
        '201':
          description: Metadata created successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/KPIMetadata'
        '400':
          description: Invalid request data
        '409':
          description: Metadata already exists

  /api/v1/kpi-metadata/{kpi_id}:
    get:
      summary: Get KPI metadata by ID
      parameters:
        - name: kpi_id
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/KPIMetadata'
        '404':
          description: Metadata not found

    put:
      summary: Update KPI metadata
      parameters:
        - name: kpi_id
          in: path
          required: true
          schema:
            type: string
            format: uuid
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UpdateKPIMetadataRequest'
      responses:
        '200':
          description: Metadata updated successfully
        '404':
          description: Metadata not found

  /api/v1/metadata/search:
    post:
      summary: Search metadata
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/MetadataSearchRequest'
      responses:
        '200':
          description: Search results
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/MetadataSearchResponse'

  /api/v1/metadata/lineage/{kpi_id}:
    get:
      summary: Get KPI data lineage
      parameters:
        - name: kpi_id
          in: path
          required: true
          schema:
            type: string
            format: uuid
        - name: depth
          in: query
          schema:
            type: integer
            default: 3
      responses:
        '200':
          description: Lineage information
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/KPILineageResponse'

components:
  schemas:
    KPIMetadata:
      type: object
      properties:
        metadata_id:
          type: string
          format: uuid
        kpi_id:
          type: string
          format: uuid
        kpi_code:
          type: string
        kpi_name:
          type: string
        business_context:
          type: object
          properties:
            purpose:
              type: string
            business_question:
              type: string
            success_criteria:
              type: string
            strategic_alignment:
              type: string
            stakeholders:
              type: array
              items:
                type: string
        data_definition:
          type: object
          properties:
            numerator:
              type: string
            denominator:
              type: string
            inclusions:
              type: string
            exclusions:
              type: string
            calculation_examples:
              type: array
              items:
                type: object
        quality_definition:
          type: object
          properties:
            quality_thresholds:
              type: object
            validation_rules:
              type: array
              items:
                type: string
            quality_checks:
              type: array
              items:
                type: string
        governance_definition:
          type: object
          properties:
            approval_workflow:
              type: string
            review_frequency:
              type: string
            retention_policy:
              type: object
            access_controls:
              type: object
        version:
          type: integer
        status:
          type: string
          enum: [ACTIVE, DRAFT, DEPRECATED, RETIRED]
        created_at:
          type: string
          format: date-time
        updated_at:
          type: string
          format: date-time

    CreateKPIMetadataRequest:
      type: object
      required:
        - kpi_id
        - business_context
        - data_definition
      properties:
        kpi_id:
          type: string
          format: uuid
        business_context:
          $ref: '#/components/schemas/BusinessContext'
        data_definition:
          $ref: '#/components/schemas/DataDefinition'
        quality_definition:
          $ref: '#/components/schemas/QualityDefinition'
        governance_definition:
          $ref: '#/components/schemas/GovernanceDefinition'

    BusinessContext:
      type: object
      required:
        - purpose
        - business_question
      properties:
        purpose:
          type: string
          maxLength: 1000
        business_question:
          type: string
          maxLength: 500
        success_criteria:
          type: string
          maxLength: 1000
        business_impact:
          type: string
        strategic_alignment:
          type: string
        limitations:
          type: string
        assumptions:
          type: string
        stakeholders:
          type: array
          items:
            type: string
        decision_making:
          type: string

    DataDefinition:
      type: object
      required:
        - numerator
        - denominator
      properties:
        numerator:
          type: string
          maxLength: 1000
        denominator:
          type: string
          maxLength: 1000
        inclusions:
          type: string
        exclusions:
          type: string
        counting_rules:
          type: string
        time_period_rules:
          type: string
        boundary_conditions:
          type: string
        calculation_examples:
          type: array
          items:
            type: object
        data_elements:
          type: array
          items:
            type: string

    QualityDefinition:
      type: object
      properties:
        validation_rules:
          type: array
          items:
            type: string
        quality_thresholds:
          type: object
          properties:
            completeness_min:
              type: number
              minimum: 0
              maximum: 1
            accuracy_min:
              type: number
              minimum: 0
              maximum: 1
            timeliness_max_hours:
              type: number
              minimum: 0
            consistency_min:
              type: number
              minimum: 0
              maximum: 1
        quality_checks:
          type: array
          items:
            type: string
        error_handling:
          type: string
        quality_monitoring:
          type: string
        improvement_actions:
          type: array
          items:
            type: string

    GovernanceDefinition:
      type: object
      properties:
        approval_workflow:
          type: string
        review_frequency:
          type: string
          pattern: '^[0-9]+ (day|week|month|year)s?$'
        change_management:
          type: object
          properties:
            change_types:
              type: array
              items:
                type: string
            approval_levels:
              type: array
              items:
                type: string
        audit_requirements:
          type: array
          items:
            type: string
        compliance_standards:
          type: array
          items:
            type: string
        retention_policy:
          type: object
          properties:
            data_retention_years:
              type: integer
              minimum: 1
              maximum: 100
            archive_requirements:
              type: array
              items:
                type: string
        access_controls:
          type: object
          properties:
            access_level:
              type: string
            authorized_roles:
              type: array
              items:
                type: string
            data_classification:
              type: string

    MetadataSearchRequest:
      type: object
      required:
        - query
      properties:
        query:
          type: string
          minLength: 2
        filters:
          type: object
          properties:
            category:
              type: array
              items:
                type: string
            level:
              type: array
              items:
                type: string
                enum: [STRATEGIC, OPERATIONAL]
            status:
              type: array
              items:
                type: string
                enum: [ACTIVE, DRAFT, DEPRECATED]
        sort:
          type: object
          properties:
            field:
              type: string
              enum: [relevance, kpi_name, created_at, updated_at]
            order:
              type: string
              enum: [asc, desc]
              default: desc
        pagination:
          type: object
          properties:
            page:
              type: integer
              minimum: 1
              default: 1
            limit:
              type: integer
              minimum: 1
              maximum: 100
              default: 50

    MetadataSearchResponse:
      type: object
      properties:
        data:
          type: array
          items:
            $ref: '#/components/schemas/KPIMetadata'
        search_metadata:
          type: object
          properties:
            total_results:
              type: integer
            query:
              type: string
            search_time_ms:
              type: number
            facets:
              type: object
              properties:
                categories:
                  type: array
                  items:
                    type: object
                    properties:
                      name:
                        type: string
                      count:
                        type: integer
                levels:
                  type: array
                  items:
                    type: object
                    properties:
                      name:
                        type: string
                      count:
                        type: integer
        pagination:
          $ref: '#/components/schemas/Pagination'

    KPILineageResponse:
      type: object
      properties:
        kpi_id:
          type: string
          format: uuid
        lineage_graph:
          type: object
          properties:
            nodes:
              type: array
              items:
                type: object
                properties:
                  id:
                    type: string
                  name:
                    type: string
                  type:
                    type: string
                    enum: [KPI, DATA_SOURCE, TRANSFORMATION, SYSTEM]
                  metadata:
                    type: object
            edges:
              type: array
              items:
                type: object
                properties:
                  source:
                    type: string
                  target:
                    type: string
                  relationship_type:
                    type: string
                  strength:
                    type: number
                    minimum: 0
                    maximum: 1
        depth:
          type: integer
        generated_at:
          type: string
          format: date-time

    Pagination:
      type: object
      properties:
        page:
          type: integer
        limit:
          type: integer
        total:
          type: integer
        total_pages:
          type: integer
        has_next:
          type: boolean
        has_prev:
          type: boolean

    ResponseMetadata:
      type: object
      properties:
        request_id:
          type: string
          format: uuid
        timestamp:
          type: string
          format: date-time
        version:
          type: string
        server:
          type: string

  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT

security:
  - BearerAuth: []
```

---

## 5. Metadata Quality Framework

### 5.1 Quality Dimensions

#### 5.1.1 Metadata Quality Metrics

**Table: metadata_quality_assessments**
```sql
CREATE TABLE metadata_quality_assessments (
    assessment_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assessment_date DATE DEFAULT CURRENT_DATE,
    total_metadata_count INTEGER NOT NULL,
    complete_metadata_count INTEGER DEFAULT 0,
    quality_score DECIMAL(5,2) NOT NULL, -- 0-100 scale
    quality_issues JSONB, -- Detailed quality issues
    improvement_recommendations JSONB,
    automated_score DECIMAL(5,2), -- Score from automated checks
    manual_score DECIMAL(5,2), -- Score from manual review
    assessor_id UUID REFERENCES persons(person_id),
    assessment_type VARCHAR(30) DEFAULT 'AUTOMATED', -- AUTOMATED, MANUAL, HYBRID
    scope VARCHAR(50) DEFAULT 'ALL', -- ALL, CATEGORY, LEVEL, CUSTOM
    scope_parameters JSONB, -- Parameters defining the assessment scope
    next_assessment_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_assessment_type CHECK (assessment_type IN ('AUTOMATED', 'MANUAL', 'HYBRID')),
    CONSTRAINT chk_quality_score CHECK (quality_score >= 0 AND quality_score <= 100),
    CONSTRAINT chk_automated_score CHECK (automated_score IS NULL OR (automated_score >= 0 AND automated_score <= 100)),
    CONSTRAINT chk_manual_score CHECK (manual_score IS NULL OR (manual_score >= 0 AND manual_score <= 100))
);

-- JSONB Structure for quality_issues:
{
  "missing_business_context": [
    {
      "kpi_id": "uuid",
      "kpi_name": "KPI Name",
      "severity": "HIGH",
      "impact": "Cannot understand business purpose"
    }
  ],
  "incomplete_data_definitions": [
    {
      "kpi_id": "uuid",
      "kpi_name": "KPI Name",
      "missing_fields": ["numerator", "exclusions"],
      "severity": "MEDIUM"
    }
  ],
  "outdated_information": [
    {
      "kpi_id": "uuid",
      "kpi_name": "KPI Name",
      "last_updated": "2023-01-01",
      "recommended_action": "Review and update metadata"
    }
  ],
  "missing_governance": [
    {
      "kpi_id": "uuid",
      "kpi_name": "KPI Name",
      "missing_controls": ["retention_policy", "access_controls"],
      "compliance_risk": "HIGH"
    }
  ]
}
```

#### 5.1.2 Quality Improvement Tracking

**Table: metadata_quality_improvements**
```sql
CREATE TABLE metadata_quality_improvements (
    improvement_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assessment_id UUID NOT NULL REFERENCES metadata_quality_assessments(assessment_id),
    issue_type VARCHAR(100) NOT NULL,
    issue_description TEXT,
    affected_metadata UUID[] DEFAULT '{}', -- Array of affected metadata IDs
    improvement_actions JSONB, -- Specific actions to take
    action_owner_id UUID REFERENCES persons(person_id),
    target_date DATE,
    status VARCHAR(20) DEFAULT 'PENDING', -- PENDING, IN_PROGRESS, COMPLETED, CANCELLED
    completion_date DATE,
    results JSONB, -- Results of improvement actions
    lessons_learned TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_status CHECK (status IN ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED')),
    CONSTRAINT chk_target_date CHECK (target_date >= CURRENT_DATE),
    CONSTRAINT chk_completion_date CHECK (completion_date IS NULL OR completion_date >= created_at::DATE)
);

-- JSONB Structure for improvement_actions:
{
  "business_context_completion": {
    "actions": [
      "Schedule workshops with business stakeholders",
      "Create template for business context documentation",
      "Assign metadata stewards for each KPI category"
    ],
    "resources_needed": [
      "Business analyst time: 40 hours",
      "Subject matter expert consultations: 20 hours"
    ],
    "estimated_effort_days": 15,
    "priority": "HIGH"
  },
  "data_definition_enhancement": {
    "actions": [
      "Review calculation logic with technical teams",
      "Document edge cases and boundary conditions",
      "Create calculation examples"
    ],
    "resources_needed": [
      "Technical analyst time: 30 hours",
      "Data scientist time: 15 hours"
    ],
    "estimated_effort_days": 10,
    "priority": "MEDIUM"
  }
}
```

---

## 6. Implementation Roadmap

### 6.1 Phase 1: Foundation (Q1 2026)

#### Sprint 1-2: Core Metadata Infrastructure
- [ ] Database schema implementation
- [ ] Basic metadata CRUD APIs
- [ ] Metadata validation framework
- [ ] Initial data stewardship setup

#### Sprint 3-4: Business Metadata Capture
- [ ] KPI business definition templates
- [ ] Business glossary import tools
- [ ] Data stewardship assignment workflows
- [ ] Metadata quality assessment tools

#### Sprint 5-6: Search and Discovery
- [ ] Full-text search implementation
- [ ] Metadata catalog portal
- [ ] Relationship visualization
- [ ] Basic reporting capabilities

**Phase 1 Deliverables:**
- ✅ Core metadata repository operational
- ✅ Business metadata capture tools ready
- ✅ Search and discovery functionality
- ✅ Basic quality monitoring

### 6.2 Phase 2: Advanced Features (Q2 2026)

#### Sprint 7-8: Lineage and Impact Analysis
- [ ] Data lineage tracking
- [ ] Impact analysis tools
- [ ] Change management integration
- [ ] Automated relationship discovery

#### Sprint 9-10: Quality and Governance
- [ ] Advanced quality metrics
- [ ] Compliance monitoring
- [ ] Automated quality improvement recommendations
- [ ] Governance workflow automation

#### Sprint 11-12: Integration and Automation
- [ ] Integration with development tools
- [ ] Automated metadata capture
- [ ] Real-time synchronization
- [ ] Event-driven updates

**Phase 2 Deliverables:**
- ✅ Complete lineage tracking
- ✅ Advanced governance features
- ✅ Automated metadata capture
- ✅ Integration with development pipeline

### 6.3 Phase 3: Enterprise Features (Q3 2026)

#### Sprint 13-14: Analytics and Intelligence
- [ ] Metadata analytics dashboard
- [ ] Predictive quality analytics
- [ ] Usage pattern analysis
- [ ] Business intelligence integration

#### Sprint 15-16: Collaboration and Knowledge Management
- [ ] Collaborative metadata editing
- [ ] Knowledge base integration
- [ ] Community features
- [ ] Expert recommendation system

#### Sprint 17-18: Scale and Performance
- [ ] Performance optimization
- [ ] Scalability enhancements
- [ ] Multi-tenant features
- [ ] Advanced security controls

**Phase 3 Deliverables:**
- ✅ Enterprise-grade analytics
- ✅ Collaborative features
- ✅ Scalable architecture
- ✅ Advanced security

---

## 7. Success Metrics and KPIs

### 7.1 Metadata Quality Metrics

#### 7.1.1 Completeness Metrics
- **Business Context Coverage:** % of KPIs with complete business context
- **Data Definition Coverage:** % of KPIs with complete data definitions
- **Governance Coverage:** % of KPIs with governance policies
- **Stewardship Coverage:** % of KPIs with assigned stewards

#### 7.1.2 Accuracy Metrics
- **Definition Accuracy:** % of metadata verified by subject matter experts
- **Calculation Accuracy:** % of calculations verified against source data
- **Relationship Accuracy:** % of data relationships verified
- **Classification Accuracy:** % of data classifications correctly applied

#### 7.1.3 Timeliness Metrics
- **Metadata Freshness:** Average age of metadata updates
- **Review Compliance:** % of metadata reviewed within required timeframe
- **Update Latency:** Time from data change to metadata update
- **Quality Assessment Frequency:** Regularity of quality assessments

### 7.2 Usage and Adoption Metrics

#### 7.2.1 Engagement Metrics
- **Active Users:** Number of users accessing metadata repository
- **Search Volume:** Number of metadata searches performed
- **Content Contributions:** Number of metadata updates by business users
- **Quality Feedback:** Number of quality improvements suggested

#### 7.2.2 Business Impact Metrics
- **Decision Making Speed:** Reduction in time to find and understand KPIs
- **Data Discovery Efficiency:** Improvement in data discovery processes
- **Compliance Readiness:** Reduction in audit preparation time
- **Development Productivity:** Improvement in development cycle time

---

## 8. Conclusion

Standar metadata schema ini menyediakan foundation yang komprehensif untuk Dashboard KPI INA-CRC dengan:

### 8.1 Key Benefits
1. **Complete Context:** Business and technical context for all data assets
2. **Traceability:** End-to-end lineage and impact analysis
3. **Quality Assurance:** Automated and manual quality monitoring
4. **Governance:** Complete governance and compliance framework
5. **Searchability:** Advanced search and discovery capabilities
6. **Collaboration:** Tools for collaborative metadata management

### 8.2 Strategic Value
1. **Data Literacy:** Improved understanding of KPI definitions and calculations
2. **Trust:** Increased trust in data quality and accuracy
3. **Efficiency:** Reduced time spent searching for and validating data
4. **Compliance:** Automated compliance monitoring and reporting
5. **Innovation:** Foundation for advanced analytics and AI capabilities

### 8.3 Implementation Success Factors
1. **Executive Support:** Strong sponsorship and resource allocation
2. **User Engagement:** Active involvement of business and technical users
3. **Quality Focus:** Rigorous approach to metadata quality
4. **Integration:** Seamless integration with existing systems
5. **Continuous Improvement:** Ongoing refinement and enhancement

### 8.4 Next Steps
1. **Approval:** Secure approval for metadata framework implementation
2. **Team Formation:** Assemble metadata management team
3. **Tool Selection:** Select and configure metadata management tools
4. **Pilot Implementation:** Start with pilot KPI category
5. **Full Rollout:** Systematic rollout across all KPI categories

---

**Document Control:**
- **Version:** 1.0
- **Next Review:** Q2 2026 (Post Phase 2 implementation)
- **Technical Review Required:** Data Architecture Team
- **Business Review Required:** Data Governance Committee

**Prepared by:**
Data Governance Team, INA-CRC
Date: 4 December 2025