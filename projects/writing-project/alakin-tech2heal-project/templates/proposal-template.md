# Proposal Template

**Purpose:** Structured template for pilot project proposals, quarterly work plans, and business development proposals in Tech2Heal consulting activities.

**Based on:** Tech2Heal Consulting Toolkit Templates 3 & 7

---

## Pilot Project Proposal Template

**Project Title:** Pilot Project - Alakin Health Implementation at [Institution Name]

**Date:** [Submission Date]
**To:** [Recipient Title, Name]
**From:** Dr. Ahmad Hidayat, MSc, MBA
**Institution:** [Hospital/Organization Name]
**Clinical Focus:** [e.g., Type 2 Diabetes Management]
**Duration:** [e.g., 3 months pilot + 1 month evaluation]
**Language:** [Indonesian/English]

---

### Section 1: Executive Summary

**Institution:** [Full Institution Name]
**Location:** [City, Province]
**Type:** [Private Hospital / BPJS Hospital / Academic Medical Center]

**Clinical Focus:** [e.g., Type 2 Diabetes Mellitus Management]
**Patient Cohort Size:** [e.g., 50-100 patients]
**Duration:** [e.g., 3 months pilot + 1 month evaluation]
**Start Date:** [Target date]
**Primary Objective:** [e.g., "Reduce HbA1c levels by 0.5% and improve medication adherence by 30%"]

**Value Proposition:** [2-3 sentence summary of why Alakin Health is the right solution for this institution]

---

### Section 2: Clinical Scope

#### Inclusion Criteria

- **Age:** [e.g., 18-65 years]
- **Diagnosis:** [e.g., Type 2 Diabetes Mellitus with HbA1c > 7.5%]
- **Smartphone Access:** Required for patient mobile app
- **Literacy:** Able to read Indonesian language messages
- **Willingness:** Informed consent to participate in pilot

#### Exclusion Criteria

- Severe complications requiring intensive care
- Cognitive impairment preventing app usage
- Non-Indonesian speaking patients (if applicable)
- Lack of reliable smartphone/internet access

#### Clinical Intervention Plan

**1. Baseline Assessment**
- [ ] HbA1c measurement
- [ ] Blood pressure recording
- [ ] Weight measurement
- [ ] Medication list reconciliation
- [ ] Quality of life assessment

**2. Automated Care Program (Alakin Platform)**

*Daily:*
- Blood glucose monitoring reminders
- Medication adherence notifications
- Lifestyle prompts (diet, exercise)

*Weekly:*
- Medication adherence check-ins
- Symptom tracking surveys
- Educational content delivery

*Monthly:*
- Virtual nurse consultation via app
- Care plan adjustment based on data
- Progress review with care team

**3. Clinical Team Engagement**

*Physician:*
- Review dashboard weekly
- Adjust treatment plans based on data
- Manage complex cases

*Nurse:*
- Respond to patient queries within 24 hours
- Monitor alerts and notifications
- Coordinate care interventions

*Nutritionist (if applicable):*
- Provide dietary guidance through app
- Monitor eating patterns
- Personalize nutrition recommendations

---

### Section 3: Technical Specifications

#### SATUSEHAT Integration Requirements

**FHIR Resources to Exchange:**

| FHIR Resource | Data Purpose | Priority |
|---------------|--------------|----------|
| Patient | Demographic data | Required |
| Condition | Diagnosis information | Required |
| Observation | Vital signs, lab results (HbA1c, blood pressure) | Required |
| MedicationRequest | Prescription data | Required |
| CarePlan | Treatment protocols | Optional |

#### Existing EMR System

- **Vendor:** [Name of EMR system]
- **Version:** [Version number]
- **Integration Method:** [e.g., "HL7 FHIR API" or "Manual data export"]

#### Data Security and Privacy

- **Patient Consent:** Indonesian language consent form for data sharing
- **Data Storage:** [Indonesia-based server required? Or acceptable for Paris server?]
- **Compliance:** Indonesian privacy regulations + HIPAA standards
- **Access Controls:** Role-based access for clinical team

---

### Section 4: Team Structure

#### [Institution Name] Team

| Role | Name | Department | Responsibilities | Time Commitment |
|------|------|------------|------------------|-----------------|
| **Clinical Champion** | [Name] | [Department] | Lead clinical oversight, protocol design, physician engagement | 5 hours/week |
| **Technical Coordinator** | [Name] | [Department] | EMR integration, technical troubleshooting, SATUSEHAT coordination | 10 hours/week during setup, 3 hours/week during operation |
| **Patient Enrollment Coordinator** | [Name] | [Department] | Patient recruitment, consent process, app onboarding training | 15 hours/week during enrollment, 5 hours/week during operation |

#### Tech2Heal Team

| Role | Responsibilities |
|------|------------------|
| **Technical Support** | Platform configuration, integration assistance |
| **Clinical Advisory** | Care program design, outcome measurement |
| **Project Management** | Timeline tracking, milestone coordination |

#### Ahmad Hidayat Role

- SATUSEHAT integration consulting
- Regulatory compliance guidance
- Liaison between institution and Tech2Heal
- Issue escalation and resolution facilitation

---

### Section 5: Timeline and Milestones

| Phase | Activities | Duration | Key Milestones |
|-------|-----------|----------|----------------|
| **Planning** | Scope finalization, team formation, consent forms | 4 weeks | Signed MOU, IRB approval (if required) |
| **Setup** | Platform configuration, EMR integration, staff training | 6 weeks | SATUSEHAT test data exchange, staff certified on platform |
| **Enrollment** | Patient recruitment, consent, app onboarding | 4 weeks | 50-100 patients enrolled and active |
| **Execution** | Active monitoring, care delivery, data collection | 12 weeks | Weekly progress reports, monthly outcome assessments |
| **Evaluation** | Data analysis, outcome measurement, reporting | 4 weeks | Final pilot report, continuation decision |

**Total Duration:** 30 weeks (~7 months)

**Critical Path:**
- Week 4: IRB approval required
- Week 10: SATUSEHAT integration testing complete
- Week 14: 50% enrollment target achieved
- Week 26: Execution phase complete
- Week 30: Final report submitted

---

### Section 6: Success Metrics

#### Clinical Outcomes

| Metric | Baseline | Target | Measurement Method |
|--------|----------|--------|-------------------|
| HbA1c reduction | [Baseline value] | [Target %] | Lab testing at start and end |
| Medication adherence rate | [Baseline %] | [Target %] | App tracking data |
| Blood pressure control | [Baseline %] | [Target %] | Weekly monitoring |
| Hospital admission/ER visit reduction | [Baseline rate] | [Target %] | Claims data analysis |

#### Operational Outcomes

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Patient engagement rate | [% of patients actively using app weekly] | App usage analytics |
| Clinical team satisfaction | [Rating scale target] | Qualitative feedback survey |
| Technical reliability | App uptime > 95%, integration error rate < 5% | System monitoring |
| Cost-effectiveness | [Cost per patient vs. usual care] | Economic analysis |

---

### Section 7: Budget and Resources

#### Tech2Heal Provided

- Platform access (no license fee during pilot)
- Technical integration support
- Training materials and sessions
- Patient mobile app access

#### [Institution Name] Provided

- Clinical staff time (as per team structure)
- IT infrastructure (servers, internet connectivity)
- Patient recruitment and enrollment expenses
- Local IRB fees (if applicable)

#### Estimated Total Cost

| Category | Estimated Cost (IDR) | Notes |
|----------|---------------------|-------|
| Clinical staff time | [Amount] | Based on time commitment |
| IT infrastructure | [Amount] | If upgrades needed |
| Patient recruitment | [Amount] | Marketing materials, staff time |
| IRB fees | [Amount] | If applicable |
| **TOTAL** | **[Total]** | |

---

### Section 8: Governance and Approvals

#### Required Institutional Approvals

- [ ] Director / CEO approval
- [ ] Medical Committee approval
- [ ] Ethics Committee / IRB approval (if pilot involves research)
- [ ] IT Security review (data protection assessment)
- [ ] Legal review (MOU/contract terms)

#### Approval Timeline

- Target for all approvals: [Date]
- Signatory Authority: [Name and Title]

---

### Section 9: Risk Mitigation

| Risk | Probability | Impact | Mitigation Strategy |
|------|------------|--------|-------------------|
| [Risk 1: e.g., Low patient enrollment] | [High/Med/Low] | [High/Med/Low] | [Mitigation actions] |
| [Risk 2: e.g., SATUSEHAT integration delays] | [High/Med/Low] | [High/Med/Low] | [Mitigation actions] |
| [Risk 3: e.g., Staff resistance to new technology] | [High/Med/Low] | [High/Med/Low] | [Mitigation actions] |

---

### Section 10: Next Steps

1. **Review and Approval** [Timeline: Week 1]
   - [ ] Institution leadership review
   - [ ] Tech2Heal approval
   - [ ] Sign MOU

2. **Planning Phase** [Timeline: Weeks 2-5]
   - [ ] Finalize scope and team
   - [ ] Obtain IRB approval
   - [ ] Prepare consent forms
   - [ ] Setup project infrastructure

3. **Setup Phase** [Timeline: Weeks 6-11]
   - [ ] Configure Alakin platform
   - [ ] Integrate with SATUSEHAT
   - [ ] Train clinical team
   - [ ] Test data exchange

4. **Enrollment Phase** [Timeline: Weeks 12-15]
   - [ ] Recruit patients
   - [ ] Obtain informed consent
   - [ ] Onboard to mobile app

5. **Execution Phase** [Timeline: Weeks 16-27]
   - [ ] Active monitoring
   - [ ] Care delivery
   - [ ] Data collection

6. **Evaluation Phase** [Timeline: Weeks 28-30]
   - [ ] Analyze outcomes
   - [ ] Prepare final report
   - [ ] Continuation decision

---

### Contact Information

**Primary Contact:**
**Dr. Ahmad Hidayat, MSc, MBA**
Indonesia Market Development Consultant, Tech2Heal SAS
Chairman, Technical Working Group for SATUSEHAT Platform

Email: drahidayat@gmail.com
Phone: [+62 812-3456-7890]

**Tech2Heal Leadership:**
**Fabrice Pakin**, CEO
Email: fabrice@alakinhealth.com

**Raphael Pakin**, Operations/Business Development
Email: raphael.pakin@alakinhealth.com

---

## Quarterly Work Plan Template

**Period:** Q[X] [Year] ([Start Date] - [End Date])
**Submitted by:** Ahmad Hidayat
**Date:** [Submission Date]
**Approval Requested from:** Fabrice Pakin, Tech2Heal CEO

---

### Executive Summary

This quarterly work plan outlines strategic deliverables and activities for Q[X] [Year] focused on [primary objective - e.g., "establishing SATUSEHAT technical integration framework and building qualified lead pipeline"]. The plan allocates approximately [60-80] hours across deliverables, ensuring alignment with monthly 20-hour engagement constraint while maximizing milestone incentive attainment and market development progress.

---

### Deliverable 1: [Title]

**Objective:** [Clear statement of what this deliverable accomplishes]

**Scope:**
- [Specific component 1]
- [Specific component 2]
- [Specific component 3]

**Methodology:**
[Brief description of research approach, analysis framework, or development process]

**Timeline:**
- Week 1-2: [Activities]
- Week 3-6: [Activities]
- Week 7-10: [Activities]
- Week 11-13: Final review and submission

**Target Completion Date:** [Specific date]

**Time Allocation:** [X] hours

**Expected Outcome:** [Description of final deliverable format and content]

**Value to Tech2Heal:** [Explanation of how this deliverable supports Indonesia market entry strategy]

---

### Deliverable 2: [Title]

**Objective:** [Clear statement of what this deliverable accomplishes]

**Scope:**
- [Specific component 1]
- [Specific component 2]
- [Specific component 3]

**Methodology:**
[Brief description of research approach, analysis framework, or development process]

**Timeline:**
- Week 1-2: [Activities]
- Week 3-6: [Activities]
- Week 7-10: [Activities]
- Week 11-13: Final review and submission

**Target Completion Date:** [Specific date]

**Time Allocation:** [X] hours

**Expected Outcome:** [Description of final deliverable format and content]

**Value to Tech2Heal:** [Explanation of how this deliverable supports Indonesia market entry strategy]

---

### Additional Quarterly Activities

#### Lead Generation Target

- **Qualified EOIs:** [Number] institutions
- **Target Segments:** [e.g., "BPJS-affiliated hospitals in West Java"]
- **Outreach Strategy:** [Brief description of approach]
- **Time Allocation:** [X] hours

#### Pilot Development Support

- **Active Pilots:** [Number and institution names]
- **New Pilots Targeted:** [Number]
- **Key Milestones:**
  - [Pilot 1 milestone]
  - [Pilot 2 milestone]
  - [Pilot 3 milestone]
- **Time Allocation:** [X] hours

#### Market Intelligence

- **Focus Areas:**
  - [Area 1: e.g., "BPJS digital health procurement protocols"]
  - [Area 2: e.g., "Ministry of Health DTx approval pathways"]
- **Information Gathering:** [Methods - conferences, regulatory monitoring, network conversations]
- **Time Allocation:** [X] hours

---

### Total Quarterly Time Budget

- Deliverable 1: [X] hours
- Deliverable 2: [X] hours (if applicable)
- Lead Generation: [X] hours
- Pilot Support: [X] hours
- Market Intelligence: [X] hours
- Tech2Heal Communication: [X] hours
- **TOTAL:** [60-80] hours (aligns with 20 hours/month × 3 months)

---

### Incentive Structure Confirmation

**Quarterly Deliverable Incentive:** IDR [3,000,000 - 7,000,000] (to be specified by Tech2Heal upon approval)

**Complexity Justification:** [Explanation of why this work merits specified incentive level within range]

**Expected Additional Milestone Incentives:**

- EOI Submissions: [Target number] × IDR 1,500,000 = IDR [Total estimated]
- Pilot Initiations: [Target number] × IDR 5,000,000 = IDR [Total estimated]
- **Total Estimated Q[X] Incentives:** IDR [Total]

---

### Approval Request

I request Tech2Heal's approval for this Q[X] [Year] Work Plan, including:
1. Confirmation of deliverable scope and timeline
2. Specification of quarterly deliverable incentive amount within IDR 3,000,000 - 7,000,000 range
3. Agreement on time allocation and priority sequencing

**Requested Approval Deadline:** [Date - ideally 2 weeks before quarter start]

---

### Signature

_______________________
Ahmad Hidayat, MD
Indonesia Market Development Consultant
Tech2Heal SAS

---

### Tech2Heal Approval

☐ **APPROVED AS SUBMITTED**
☐ **APPROVED WITH MODIFICATIONS** (see notes below)
☐ **REQUIRES REVISION**

**Quarterly Deliverable Incentive Amount:** IDR _______________________

**Modifications or Comments:**
[Tech2Heal feedback on scope, timeline, priorities]

_______________________
Fabrice Pakin
CEO, Tech2Heal SAS
Date: _______________________

---

## Proposal Best Practices

### DO's:
- [ ] Be specific about objectives and scope
- [ ] Include realistic timelines with milestones
- [ ] Quantify success metrics with baselines and targets
- [ ] Address risk mitigation explicitly
- [ ] Specify resource requirements clearly
- [ ] Include all governance and approval steps
- [ ] Provide clear next steps with timelines
- [ ] Use professional formatting and organization
- [ ] Ensure technical accuracy (SATUSEHAT, FHIR)
- [ ] Adapt language to audience (Indonesian/English)

### DON'Ts:
- [ ] Use vague objectives or success criteria
- [ ] Overpromise on outcomes or timelines
- [ ] Skip risk assessment or mitigation
- [ ] Omit resource requirements or budget
- [ ] Forget governance and approval steps
- [ ] Leave next steps unclear
- [ ] Use inconsistent formatting
- [ ] Include technical inaccuracies
- [ ] Ignore cultural context for Indonesian institutions
- [ ] Make proposal generic without customization

---

## Quick Reference: Proposal Types

| Proposal Type | Audience | Key Focus | Length |
|---------------|----------|------------|--------|
| Pilot Project | Hospital Leadership | Clinical outcomes, ROI, implementation | 8-10 pages |
| Quarterly Work Plan | Tech2Heal Leadership | Deliverables, timeline, incentives | 5-7 pages |
| Business Proposal | Corporate/Insurance | Cost savings, ROI, differentiation | 6-8 pages |
| Technical Proposal | IT/Technical Teams | Integration, specifications, security | 10-15 pages |
