# Product Requirements Document (PRD)
## Pengembangan Slide Presentasi GCP Training Module (Markdown Format)

**Versi:** 1.0
**Tanggal:** 3 November 2025
**Dipersiapkan oleh:** Clinical Research Development Team
**Status:** Draft

---

### 1. Executive Summary

#### 1.1. Tujuan Produk
Mengembangkan slide presentasi pelatihan Good Clinical Practice (GCP) dalam format Markdown yang komprehensif untuk Investigator Site Personnel di Indonesia, sesuai dengan standar internasional (ICH E6(R3), TransCelerate) dan regulasi nasional (BPOM No. 8 Tahun 2024).

#### 1.2. Problem Statement
Saat ini belum tersedia slide presentasi pelatihan GCP dalam format Markdown yang:
- Memenuhi kriteria minimum TransCelerate untuk self-attestation
- Terintegrasi dengan konteks regulasi Indonesia (PPUK, CUKB, KTDS)
- Mudah dikonversi ke berbagai platform (HTML, PDF, PowerPoint)
- Konsisten dengan format Bahasa Indonesia EYD Edisi ke-5
- Dapat di-track dengan version control (Git)

#### 1.3. Solution Overview
Pengembangan 7 modul slide presentasi dalam format Markdown dengan maksimal 20 slide per modul, dilengkapi dengan metadata, frontmatter, dan speaker notes untuk pelatihan 2 hari intensif (16 jam). Format Markdown memungkinkan kolaborasi yang efisien dan konversi ke multiple output formats.

---

### 2. Product Scope

#### 2.1. Target Audience
**Primary Users:**
- Principal Investigators (PI)
- Sub-Investigators (Sub-I)
- Clinical Research Coordinators (CRC)
- Pharmacists (Site Personnel)

**Secondary Users:**
- Clinical Research Associates (CRA)
- Study Coordinators
- Regulatory Affairs Personnel

#### 2.2. Module Structure
**7 Modul Pelatihan (Maksimal 20 slide per modul):**

1. **Modul 1: GCP Fundamentals** (15-20 slide)
   - 11 Prinsip ICH GCP
   - Dasar etika penelitian klinis
   - Definisi peran dan tanggung jawab

2. **Modul 2: Investigator Responsibilities** (15-20 slide)
   - Kualifikasi dan kompetensi investigator
   - Manajemen sumber daya
   - Delegasi dan supervisi

3. **Modul 3: Protocol and Regulatory Compliance** (15-20 slide)
   - Komunikasi IRB/IEC
   - Proses PPUK di Indonesia
   - Manajemen deviasi

4. **Modul 4: Participant Care and Safety** (15-20 slide)
   - Identifikasi SAE/SUSAR
   - Timeline pelaporan KTDS Indonesia
   - Manajemen keamanan peserta

5. **Modul 5: Informed Consent** (15-20 slide)
   - 22 elemen required informed consent
   - Populasi khusus
   - Prosedur darurat

6. **Modul 6: Clinical Trial Operations** (15-20 slide)
   - Manajemen produk investigasi
   - Randomisasi dan blinding
   - Prosedur penutupan studi

7. **Modul 7: Data Management and Documentation** (15-20 slide)
   - Prinsip ALCOA-C
   - Essential records
   - Data governance

#### 2.3. Output Format Scope
**Primary Output:**
- Markdown files (.md) dengan frontmatter
- HTML rendering untuk web presentation
- PDF export untuk handout
- Image assets (PNG/JPG) untuk visual elements

**Secondary Output:**
- PowerPoint conversion (via Pandoc/Marp)
- Google Slides import
- Presentasi berbasis web (Reveal.js)

#### 2.4. Out of Scope
- Platform Learning Management System (LMS)
- Video recording production
- Online assessment platform
- Certificate generation system
- Multilingual translations (other than Indonesian)
- Interactive web platform development

---

### 3. Technical Requirements

#### 3.1. Markdown Format Standards
**File Structure:**
- **Format:** Markdown (.md) dengan YAML frontmatter
- **Encoding:** UTF-8
- **Line Ending:** LF (Unix)
- **Indentation:** 2 spaces
- **Bahasa:** Bahasa Indonesia (EYD Edisi ke-5)

**Frontmatter Template:**
```yaml
---
title: "Modul X: [Judul Modul]"
module_number: X
total_slides: XX
duration_minutes: XX
learning_objectives:
  - "[Objektif 1]"
  - "[Objektif 2]"
author: "[Author Name]"
version: "1.0"
date: "2025-XX-XX"
compliance:
  - "ICH E6(R3)"
  - "BPOM No. 8/2024"
  - "TransCelerate"
tags: ["GCP", "Clinical Research", "Indonesia"]
---
```

**Struktur Markdown per Modul:**
- **# Slide 1: Title** (frontmatter + heading)
- **# Slide 2: Learning Objectives** (bullet list)
- **# Slide 3: Outline** (numbered list)
- **# Slide 4-15: Content Slides** (headings + bullet points)
- **# Slide 16-18: Case Study/Activity** (blockquotes + lists)
- **# Slide 19: Summary** (bold key points)
- **# Slide 20: Q&A** (questions + discussion prompts)

#### 3.2. Markdown Syntax Standards
**Heading Structure:**
```markdown
# Slide X: [Judul Slide] (H1 untuk slide breaks)
## Sub-judul (H2 untuk sections)
### Sub-sub-judul (H3 untuk sub-sections)
```

**Content Formatting:**
```markdown
- **Bold text** untuk key concepts
- *Italic text* untuk emphasis
- `Code blocks` untuk terminology
- > Blockquotes untuk case studies
- [Links](references) untuk external sources
- ![Images](./assets/image.png) untuk visual aids
```

**Table Format:**
```markdown
| Konsep | Deskripsi | Contoh |
|--------|-----------|--------|
| SAE | Serious Adverse Event | Kematian, Rawat Inap |
| SUSAR | Unexpected Serious Adverse Reaction | Reaksi tidak terduga |
```

**Code Blocks untuk References:**
```markdown
---
**Referensi:**
- ICH E6(R3), Section X.Y
- BPOM No. 8 Tahun 2024, Pasal Z
- WHO Guidelines, Chapter A
---
```

#### 3.3. Speaker Notes Format
**HTML Comments dalam Markdown:**
```markdown
# Slide X: Judul Slide

## Content point 1
Content point 2

<!--
SPEAKER NOTES:
- Penjelasan detail untuk trainer
- Local examples dari Indonesia
- Discussion prompts
- Time allocation: 5 menit
- Regulatory references: ICH E6(R3) 2.9
-->
```

#### 3.4. Asset Management
**Image Assets:**
- **Format:** PNG (transparent background) atau JPG
- **Resolution:** 1920x1080 minimum
- **Size:** Maximum 500KB per image
- **Location:** ./assets/module-X/ folder
- **Naming:** module-X-slide-Y-description.png

**File Organization:**
```
gcp-training-slides/
├── module-01-gcp-fundamentals.md
├── module-02-investigator-responsibilities.md
├── ...
├── assets/
│   ├── module-01/
│   │   ├── slide-01-title.png
│   │   └── slide-05-ich-principles.png
│   └── shared/
│       ├── logo-bpom.png
│       └── icon-warning.png
└── templates/
    ├── slide-template.md
    └── css-style.css
```

---

### 4. Content Requirements

#### 4.1. Markdown Content Structure
**Per Slide Markdown Harus Memiliki:**
```markdown
# Slide X: [Judul Slide yang Deskriptif]

## Learning Objective Connection
- *Terhubung dengan tujuan pembelajaran: [Objective X]*

## Content Points
- **Key Concept 1:** Deskripsi singkat dan jelas
- **Key Concept 2:** Contoh praktis atau aplikasi
- *Supporting detail:* Penjelasan tambahan

## Visual Elements (optional)
![Alt text](./assets/module-X/slide-X-description.png)

## References
---
**Referensi Regulasi:**
- ICH E6(R3), Section X.Y: [Deskripsi]
- BPOM No. 8 Tahun 2024, Pasal Z: [Deskripsi]
```

#### 4.2. Indonesian Context Integration
**Konteks Lokal dalam Markdown:**
```markdown
## Proses PPUK di Indonesia
1. **Submission** → ET/IEC Review (30 hari)
2. **Approval** → BPOM Registration (60 hari)
3. **Implementation** → Site Initiation
4. **Reporting** → Ongoing compliance

> **Contoh Kasus:** Multi-center trial di 5 rumah sakit
> - Single ethical assessment di PI institution
> - Local approvals di masing-masing site
> - Timeline total: 90-120 hari
```

**Format untuk Timeline Pelaporan:**
```markdown
## Timeline Pelaporan KTDS Indonesia
| Event | Timeline | Pihak yang Melaporkan |
|-------|----------|---------------------|
| SAE teridentifikasi | **24 jam** | Investigator ke Sponsor |
| SUSAR teridentifikasi | **7 hari** | Sponsor ke BPOM |
| Laporan tahunan | **Tahunan** | Sponsor ke ET/IEC |
| Safety update | **Sesuai kebutuhan** | Investigator ke Sponsor |
```

#### 4.3. Quality Standards for Markdown
**Markdown Validation Checklist:**
- ✅ Valid YAML frontmatter syntax
- ✅ Proper heading hierarchy (H1 untuk slide breaks)
- ✅ Consistent bullet point formatting
- ✅ Image paths are correct and relative
- ✅ Table formatting is valid
- ✅ Code blocks properly fenced
- ✅ HTML comments for speaker notes
- ✅ Internal links working correctly
- ✅ UTF-8 encoding maintained
- ✅ Line endings consistent (LF)

#### 4.4. Interactive Elements in Markdown
**Discussion Prompts Format:**
```markdown
## Diskusi Kelompok
> **Pertanyaan:**
> Bagaimana Anda akan menangani situasi berikut?
>
> **Skenario:** Peserta trial mengalami SAE di hari libur
> - Langkah apa yang akan Anda ambil?
> - Siapa yang perlu dihubungi?
> - Dokumentasi apa yang harus dibuat?
>
> **Waktu diskusi:** 15 menit
```

**Case Study Format:**
```markdown
## Studi Kasus: Kelayakan Investigator
### Background
Dr. Siti, SpPD (40 tahun) ingin menjadi PI

### Requirements Checklist
- [ ] Pengalaman ≥ 2 tahun dalam penelitian
- [ ] Publikasi ilmiah dalam 5 tahun terakhir
- [ ] Training GCP yang masih valid
- [ ] Ketersediaan time commitment
- [ ] Fasilitas penunjang yang memadai

### Diskusi
Apakah Dr. Siti memenuhi kriteria PI? Jelaskan alasan Anda.
```

---

### 5. User Experience Requirements

#### 5.1. Trainer Experience
**Ease of Use:**
- Ready-to-use templates
- Comprehensive speaker notes
- Clear visual hierarchy
- Consistent navigation
- Downloadable PDF version

**Support Materials:**
- Facilitator guide per modul
- Case study solutions
- Activity instructions
- Assessment answer keys
- Time management guide

#### 5.2. Participant Experience
**Learning Engagement:**
- Interactive discussion opportunities
- Practical case studies
- Hands-on activities
- Visual learning aids
- Clear take-home messages

**Accessibility:**
- Clear typography
- High contrast colors
- Logical content flow
- Consistent formatting
- Print-friendly layout

---

### 6. Implementation Timeline

#### 6.1. Markdown Development Phases
**Phase 1: Markdown Content Development (Weeks 1-4)**
- Week 1: Modules 1-2 Markdown content creation
  - Frontmatter development
  - Slide structure definition
  - Content drafting in Markdown
- Week 2: Modules 3-4 Markdown content creation
  - Interactive element integration
  - Indonesian context inclusion
  - Reference linking
- Week 3: Modules 5-6 Markdown content creation
  - Case study development
  - Activity design in Markdown
  - Speaker notes integration
- Week 4: Module 7 Markdown content creation
  - Final content assembly
  - Cross-module consistency check

**Phase 2: Markdown Processing & Validation (Weeks 5-6)**
- Week 5: Markdown validation and processing
  - YAML frontmatter validation
  - Syntax checking (markdownlint)
  - Image asset optimization
  - Link validation
- Week 6: Conversion testing and optimization
  - HTML rendering tests
  - PDF export validation
  - PowerPoint conversion testing
  - Mobile responsiveness check

**Phase 3: Content Review & Compliance (Weeks 7-8)**
- Week 7: Expert review in Markdown format
  - Clinical accuracy review
  - Regulatory compliance validation
  - Language and terminology check
  - Local context appropriateness
- Week 8: Markdown final revisions
  - Review feedback integration
  - Final quality assurance
  - Version control tagging

**Phase 4: Testing & Delivery (Weeks 9-10)**
- Week 9: Multi-format testing
  - GitHub repository setup
  - CI/CD pipeline testing
  - Automated conversion validation
  - User acceptance testing
- Week 10: Final delivery and documentation
  - Repository documentation
  - Conversion scripts delivery
  - Trainer preparation guides
  - Final version release

#### 6.2. Key Milestones
| Milestone | Target Date | Markdown Deliverables |
|-----------|-------------|---------------------|
| Markdown Content Complete | Week 4 | All 7 modules in .md format |
| Markdown Validation Complete | Week 6 | Syntax-checked & validated files |
| Compliance Approval | Week 8 | Regulatory-approved content |
| Conversion Testing Complete | Week 9 | Multi-format validation |
| Final Repository Launch | Week 10 | Complete GitHub package |

#### 6.3. Version Control Strategy
**Git Workflow:**
```bash
gcp-training-slides/
├── main/                    # Production-ready content
├── develop/                 # Development branch
├── feature/module-X/        # Individual module development
├── review/                  # Expert review branch
└── release/v1.0/           # Final release tags
```

**Commit Message Standards:**
```
feat: add module-01-gcp-fundamentals content
fix: correct YAML frontmatter syntax
docs: update conversion guide
refactor: standardize image paths
test: validate markdown syntax
chore: update README.md
```

---

### 7. Success Metrics

#### 7.1. Markdown Quality Metrics
**Content Quality:**
- 100% TransCelerate criteria compliance
- 100% ICH E6(R3) guideline coverage
- 100% BPOM regulation integration
- 95% language accuracy (Bahasa Indonesia EYD)
- 90% trainer satisfaction rating

**Markdown Technical Quality:**
- 100% valid YAML frontmatter syntax
- 100% markdownlint compliance
- 100% image path validity
- 0 broken internal links
- 100% UTF-8 encoding consistency
- 100% conversion success rate to HTML/PDF/PowerPoint

**Repository Quality:**
- 100% commit message standards compliance
- 100% automated testing pass rate
- 100% documentation completeness
- 100% version tagging accuracy
- <24 hour pull request response time

#### 7.2. Learning Effectiveness Metrics
**Participant Engagement:**
- Average session rating ≥ 4.5/5.0
- Knowledge assessment pass rate ≥ 85%
- Case study completion rate ≥ 90%
- Activity participation rate ≥ 95%
- Post-training confidence score ≥ 4.0/5.0

#### 7.3. Compliance Metrics
**Regulatory Compliance:**
- BPOM audit readiness score ≥ 95%
- TransCelerate self-attestation eligibility 100%
- CUKB certification preparation coverage 100%
- PPUK process accuracy 100%
- KTDS reporting timeline accuracy 100%

---

### 8. Risk Assessment

#### 8.1. High Priority Risks
**Regulatory Changes:**
- **Risk:** ICH E6(R3) atau BPOM regulation updates
- **Mitigation:** Regular monitoring, modular update system
- **Contingency:** 2-week buffer for regulatory updates

**Content Accuracy:**
- **Risk:** Medical terminology atau regulatory reference errors
- **Mitigation:** Multi-level expert review process
- **Contingency**: Independent validation before launch

#### 8.2. Medium Priority Risks
**Technical Compatibility:**
- **Risk:** PowerPoint version compatibility issues
- **Mitigation:** Multiple format testing, fallback PDF version
- **Contingency**: Google Slides alternative preparation

**Timeline Delays:**
- **Risk:** Expert review delays atau content complexity
- **Mitigation**: Parallel development, early expert engagement
- **Contingency**: 1-week buffer in each phase

---

### 9. Resource Requirements

#### 9.1. Human Resources for Markdown Development
**Core Team:**
- **Project Manager:** 1 person (0.5 FTE, 10 weeks)
- **Markdown Content Developers:** 2 persons (1.0 FTE each, 8 weeks)
- **Medical Writers (Markdown specialists):** 2 persons (0.75 FTE each, 6 weeks)
- **Regulatory Experts:** 2 persons (0.25 FTE each, 4 weeks)
- **Technical Writers (Markdown):** 1 person (0.75 FTE, 6 weeks)
- **DevOps Engineer (CI/CD):** 1 person (0.5 FTE, 4 weeks)

**Subject Matter Experts:**
- **GCP Trainers:** 3 persons (0.25 FTE each, review phases)
- **BPOM Representatives:** 1 person (0.1 FTE, validation phase)
- **Clinical Investigators:** 2 persons (0.25 FTE each, content validation)
- **Markdown/Git Specialists:** 1 person (0.25 FTE, technical validation)

#### 9.2. Technical Resources for Markdown Development
**Development Tools:**
- **Text Editors:** VS Code with Markdown extensions
- **Validation Tools:** markdownlint, yaml-lint
- **Version Control:** Git/GitHub Pro account
- **CI/CD:** GitHub Actions workflows
- **Project Management:** Linear/Notion for task tracking

**Conversion & Rendering Tools:**
- **Pandoc:** For format conversion (MD → PPTX/PDF)
- **Marp:** For Markdown presentation rendering
- **MkDocs:** For static site generation
- **GitHub Pages:** For web hosting
- **Image Optimization:** ImageMagick/TinyPNG API

**Collaboration Tools:**
- **GitHub Repositories:** For version control
- **Pull Request Templates:** For review process
- **Issue Templates:** For bug tracking
- **Automated Testing:** GitHub Actions workflows

#### 9.3. Budget Estimate for Markdown Development
**Development Costs:**
- Personnel (Markdown specialists): IDR 160.000.000
- Software licenses (GitHub Pro, tools): IDR 12.000.000
- Expert consultation: IDR 25.000.000
- Quality assurance (automated testing): IDR 8.000.000
- Repository hosting & CI/CD: IDR 5.000.000
- **Total Estimated Budget: IDR 210.000.000**

---

### 10. Delivery Requirements

#### 10.1. Final Markdown Deliverables
**Per Module Package:**
- **module-XX-module-name.md** - Slide content in Markdown
- **assets/module-XX/** - Image assets folder
- **module-XX-speaker-notes.md** - Detailed speaker notes
- **module-XX-facilitator-guide.md** - Training guide
- **module-XX-case-study-solution.md** - Case study answers
- **module-XX-activity-instructions.md** - Activity guide

**Repository Structure:**
```markdown
gcp-training-slides/
├── README.md                          # Project overview
├── CONTRIBUTING.md                    # Contribution guidelines
├── CHANGELOG.md                       # Version history
├── module-01-gcp-fundamentals.md      # Module 1 slides
├── module-02-investigator-responsibilities.md
├── module-03-protocol-compliance.md
├── module-04-participant-safety.md
├── module-05-informed-consent.md
├── module-06-clinical-operations.md
├── module-07-data-management.md
├── assets/
│   ├── module-01/                     # Module-specific images
│   ├── module-02/
│   └── shared/                        # Shared assets
├── docs/
│   ├── facilitator-guide.md           # Master facilitator guide
│   ├── conversion-guide.md            # Format conversion instructions
│   ├── compliance-matrix.md           # Compliance tracking
│   └── assessment-tools.md            # Evaluation materials
├── scripts/
│   ├── build.sh                       # Automated build script
│   ├── validate.sh                    # Validation script
│   └── convert.sh                     # Conversion script
└── .github/
    ├── workflows/                     # CI/CD workflows
    ├── PULL_REQUEST_TEMPLATE.md       # PR template
    └── ISSUE_TEMPLATE/                # Issue templates
```

#### 10.2. Conversion Deliverables
**Automated Conversion Outputs:**
- **HTML version** - Web-ready presentations
- **PDF version** - Printable handouts
- **PowerPoint version** - PPTX format via Pandoc
- **Google Slides import** - Ready for upload
- **Static site** - MkDocs generated documentation

**Conversion Scripts:**
```bash
# Build all formats
./scripts/build.sh

# Validate Markdown syntax
./scripts/validate.sh

# Convert to specific formats
./scripts/convert.sh --format=html
./scripts/convert.sh --format=pdf
./scripts/convert.sh --format=pptx
```

#### 10.3. Documentation Requirements
**Technical Documentation:**
- **README.md** - Project overview and quick start
- **CONTRIBUTING.md** - Development guidelines
- **CHANGELOG.md** - Version history and changes
- **ARCHITECTURE.md** - System design and structure
- **API.md** - Conversion API documentation

**Quality Assurance Documentation:**
- **COMPLIANCE.md** - Regulatory compliance tracking
- **TESTING.md** - Testing procedures and results
- **VALIDATION.md** - Content validation reports
- **PERFORMANCE.md** - Conversion performance metrics

**Training Documentation:**
- **FACILITATOR-GUIDE.md** - Master training guide
- **ASSESSMENT-TOOLS.md** - Evaluation materials
- **TIMING-MATRIX.md** - Session timing guide
- **BEST-PRACTICES.md** - Training best practices
- **FAQ.md** - Frequently asked questions

---

### 11. Approval and Sign-off

#### 11.1. Stakeholder Approval
**Required Approvals:**
- [ ] **Project Sponsor:** Clinical Research Director
- [ ] **Regulatory Compliance:** BPOM Liaison Officer
- [ ] **Medical Affairs:** Chief Medical Officer
- [ ] **Quality Assurance:** QA Manager
- [ ] **Training Department:** Training Coordinator

#### 11.2. Acceptance Criteria
**Go/No-Go Criteria:**
- All TransCelerate minimum criteria met
- ICH E6(R3) compliance verified
- BPOM regulation integration complete
- Expert review approved
- Pilot testing successful
- Quality assurance passed

---

### 12. Appendices

#### 12.1. References
**Primary Documents:**
- ICH E6(R3) Guideline (Final: January 2025)
- BPOM Regulation No. 8 Tahun 2024
- TransCelerate GCP Training Self-Attestation Criteria
- WHO Guidance for Best Practices in Clinical Trials
- EYD (Ejaan Yang Disempurnakan) Edisi ke-5

**Template Documents:**
- Slide Presentation Guidelines (Panduan Pembuatan Slide)
- Development Framework (Step 0)
- Learning Objectives (Step 1)
- Quality Assurance Checklist

#### 12.2. Glossary
**Key Terms:**
- **GCP:** Good Clinical Practice
- **CUKB:** Sertifikat Umum Kelayakan Klinis
- **PPUK:** Penilaian Penggunaan Produk Kesehatan
- **KTDS:** Kegawatdaruratan Tidak Diduga Serius
- **SAE:** Serious Adverse Event
- **SUSAR:** Suspected Unexpected Serious Adverse Reaction
- **IRB/IEC:** Institutional Review Board / Independent Ethics Committee

---

**Document Status:** Draft for Review
**Next Review Date:** 10 November 2025
**Target Approval:** 17 November 2025
**Target Launch:** 15 December 2025