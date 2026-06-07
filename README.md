# SATUSEHAT Compliant EMR Development Framework

A comprehensive framework and collection of tools for developing Electronic Medical Records (EMR) systems that comply with Indonesian SATUSEHAT standards and healthcare interoperability requirements.

## 🏥 Overview

This repository contains multiple projects and tools focused on Indonesian healthcare system development, including:

- **SATUSEHAT Compliance**: Framework components aligned with Indonesian national health data standards
- **FHIR Integration**: Healthcare data parsing and interoperability tools
- **Emergency Room Analytics**: Workflow optimization and metrics extraction
- **Clinical Research Tools**: Support for Indonesian Clinical Research Center (INA-CRC) initiatives
- **Digital Health Innovation**: Modern web applications for healthcare delivery

## 📁 Repository Structure

```
├── projects/                          # Main project directory
│   ├── FHIR-Parser/                   # React/TypeScript FHIR data parser
│   ├── ER-Dashboard/                  # Emergency Room metrics dashboard
│   ├── SLB-Autis-Alamanda-Website/    # Special needs school website
│   ├── project-management/            # Context engineering methodology
│   │   ├── project-management-template/  # 10-phase project management framework
│   │   └── ina-crc-governance/        # INA-CRC governance optimization
│   └── Percobaan-Website/             # Static website experiments
├── fasyankes-depok/                   # Healthcare facility data
├── regulatory-document-retrieval/     # Healthcare regulatory compliance tools
├── archive/                          # Historical project files
├── SATUSEHAT-Compliant EMR Development Framework/  # Main framework files
└── agent-output/                     # AI agent generated outputs
```

## 🚀 Key Projects

### FHIR Parser
**Location**: `projects/FHIR-Parser/fhir-parser/`
- **Technology Stack**: React 19.1.0, TypeScript, Vite, Tailwind CSS
- **Features**: Fast Healthcare Interoperability Resources (FHIR) data parsing
- **Commands**:
  ```bash
  npm install
  npm run dev          # Start development server
  npm run build        # Build for production
  npm run lint         # Run ESLint
  ```

### ER Dashboard
**Location**: `projects/ER-Dashboard/`
- **Technology**: Python 3
- **Features**: Emergency room workflow metrics extraction and visualization
- **Commands**:
  ```bash
  python3 igd_time_metrics_extractor.py  # Extract metrics from JSON case files
  ./run_extractor.sh                      # Batch processing script
  ```

### Project Management Framework
**Location**: `projects/project-management/project-management-template/`
- **Methodology**: Context Engineering Approach
- **Process**: 10-phase systematic project execution
- **Documentation**: Comprehensive project discovery and planning templates

## 🔧 Development Guidelines

### Context Engineering Methodology
When working in project management folders and user says "Let's begin":

1. **Discovery Phase (Phases 1-5)**:
   - Core Project Definition
   - Stakeholder & Organizational Context
   - Technical & Resource Context
   - Historical Context
   - Risk Assessment & Success Criteria

2. **Planning Phase (Phases 6-7)**:
   - Context Synthesis & Project Brief
   - Context-Rich Project Planning

3. **Execution Phase (Phases 8-10)**:
   - Context-Preserved Execution
   - Iterative Context Refinement
   - Context Documentation & Handoff

### Technology Standards

#### React/TypeScript Projects
- Functional components with hooks
- State management with Zustand
- Tailwind CSS for styling
- TypeScript strict mode enabled
- ESLint configuration for code quality

#### Python Projects
- JSON data processing and extraction
- Healthcare metrics calculation
- Emergency department workflow analysis

#### Static Websites
- Vanilla JavaScript with modern DOM APIs
- Responsive design with CSS Grid/Flexbox
- Intersection Observer for scroll animations
- No build process required

## 🏛️ Healthcare Domain Focus

### INA-CRC (Indonesian Clinical Research Center)
- National clinical trial coordination center
- Governance optimization with BB Binomika
- Integration with Kemenkes (Ministry of Health) strategic plans
- Focus on ISS 32 (clinical research capability enhancement)

### SATUSEHAT Compliance
- Indonesian national health data standards
- Healthcare system integration
- Clinical trial management systems
- Digital health transformation initiatives

### Regulatory Compliance
- BPOM (Badan Pengawas Obat dan Makanan) regulations
- Kemenkes (Ministry of Health) guidelines
- Clinical trial governance frameworks
- Healthcare system integration plans

## 📊 Tools and Utilities

### Synthea Integration
- **File**: `synthea-with-dependencies.jar`
- **Configuration**: `synthea.properties`
- **Purpose**: Generate synthetic healthcare data for testing

### Gemini CLI Extensions
- **Location**: `gemini-cli/` and `gemini-cli-extension/`
- **Purpose**: AI-powered healthcare consulting tools

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ for React projects
- Python 3.8+ for data processing
- Git for version control

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/ahidayatxx/SATUSEHAT-Compliant_EMR_Development_Framework.git
   cd SATUSEHAT-Compliant_EMR_Development_Framework
   ```

2. Install dependencies for specific projects:
   ```bash
   # For FHIR Parser
   cd projects/FHIR-Parser/fhir-parser
   npm install

   # For Python projects
   pip install -r requirements.txt  # If available
   ```

## 📋 Documentation Standards

### Required Project Documentation
- Project discovery reports with comprehensive context
- Strategic plans with KPIs and roadmaps
- Governance structures with RACI matrices
- Implementation timelines and risk management

### Healthcare Project Requirements
- Regulatory compliance documentation
- Clinical trial governance frameworks
- Healthcare system integration plans
- Stakeholder mapping across healthcare ecosystem

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is part of Indonesian healthcare digital transformation initiatives. Please refer to individual project licenses for specific usage terms.

## 🔗 Related Resources

- [SATUSEHAT Platform](https://satusehat.kemkes.go.id/)
- [Indonesian Ministry of Health](https://www.kemkes.go.id/)
- [FHIR Standards](https://hl7.org/fhir/)
- [INA-CRC](https://inacrc.id/)

---

**Note**: This repository is actively maintained as part of Indonesian healthcare digital transformation efforts. For questions or collaboration opportunities, please open an issue or contact the repository maintainers.