# Multi-Modal Observational Study Design: Telemedicine-Based Hypertension Management
## Research Protocol Using Synthea Synthetic Data

---

## Primary Research Question

**"How do patient engagement patterns, contextual factors, and technology interactions influence blood pressure control outcomes in a telemedicine-based hypertension management program, and what observable barriers and facilitators mediate the relationship between remote monitoring adherence and clinical effectiveness?"**

---

## Secondary Research Questions

1. What observable behavioral patterns distinguish patients achieving versus not achieving blood pressure control targets through telemedicine?
2. How do naturalistic contexts (home environment, daily routines, social support) influence medication adherence and self-monitoring behaviors?
3. What technology-related barriers (device usability, connectivity issues, digital literacy) predict telemedicine engagement and clinical outcomes?
4. How does awareness of remote monitoring (Hawthorne effect) influence patient behavior over time, and when does habituation occur?
5. What are the observed disparities in telemedicine utilization and effectiveness across demographic, socioeconomic, and geographic subgroups?

---

## Study Design Overview

**Design**: Prospective multi-modal observational cohort study with 12-month follow-up  
**Population**: 1,000 adults with hypertension (synthetic Synthea data) initiating telemedicine-based management  
**Setting**: Home-based remote monitoring with virtual clinic consultations  
**Primary Outcome**: Blood pressure control (<140/90 mmHg) at 12 months  
**Secondary Outcomes**: Medication adherence, self-monitoring frequency, emergency department visits, hospitalizations, patient engagement metrics

---

## I. Multi-Modal Observation Framework

### 1.1 Participant Observation Component

**Method**: Research team members act as "virtual health coaches" embedded in telemedicine platform, providing support while observing patient-system interactions.

**Data Collection**:
- Field notes documenting patient-reported barriers, technology difficulties, and contextual factors during coaching sessions
- Observational logs of patient questions, concerns, and problem-solving strategies
- Thick description of patient narratives about medication routines, lifestyle modifications, and social support

**Synthea Data Integration**:
- Link observations to synthetic patient encounters, medications, and vital signs
- Cross-reference observed behaviors with clinical documentation (visit notes, diagnoses)
- Correlate qualitative observations with quantitative outcome trajectories

**Frequency**: Weekly coaching sessions for first month, biweekly for months 2-3, monthly for months 4-12

**Observer Training**:
- 40-hour training on observational methods, field note standards, and cultural competency
- Inter-rater reliability assessment using recorded sessions (target κ ≥ 0.80)
- Regular calibration meetings reviewing coding consistency

**Bias Mitigation**:
- Dual observation (two coaches independently observe 20% of sessions) for reliability assessment
- Structured observation guides balancing standardization with ethnographic flexibility
- Regular debriefing sessions identifying and addressing observer assumptions/biases

---

### 1.2 Naturalistic Observation Component

**Method**: Passive monitoring of patient behaviors in natural home environments using unobtrusive technology-mediated observation.

#### A. Home Blood Pressure Monitoring Patterns

**Technology**: Connected blood pressure cuffs with automated transmission (simulated in Synthea)

**Observational Data**:
- Measurement timing (morning/evening, weekday/weekend patterns)
- Measurement frequency relative to prescribed schedule
- Blood pressure variability and trends
- Context markers: rapid sequences suggesting anxiety, post-medication timing, pre-appointment increases

**Analysis Approach**:
- Time-series analysis identifying diurnal patterns, weekly rhythms, and temporal trends
- Cluster analysis grouping patients by monitoring phenotypes
- Event sequence analysis examining measurement patterns around appointments, medication changes, or clinical events

#### B. Medication Adherence Observation

**Synthea Data Sources**:
- Medication claims (prescription fills, refill timing)
- Days supply calculations
- Medication possession ratio (MPR) and proportion of days covered (PDC)

**Derived Observational Metrics**:
- Refill timing regularity (on-time vs. delayed vs. early)
- Medication switching frequency
- Gaps in coverage periods
- Therapeutic inertia markers (blood pressure elevated without medication intensification)

#### C. Healthcare Utilization Patterns

**Observational Analysis**:
- Emergency department visits for hypertension-related issues
- Hospitalization timing relative to monitoring gaps
- Primary care encounter frequency
- Specialist referral patterns
- Telemedicine appointment attendance vs. no-show rates

**Contextual Factors from Synthea**:
- Day of week, time of day patterns
- Seasonal variations
- Geographic access barriers (distance to facilities)
- Insurance coverage patterns

---

### 1.3 Systematic Observation Component

**Method**: Structured, protocol-driven observation using standardized instruments and systematic sampling.

#### A. Video Telemedicine Encounter Observation

**Sample**: Randomly selected 20% of telemedicine encounters (n ≈ 2,400 encounters)

**Structured Observation Instrument**:

| Domain | Observed Elements | Coding System |
|--------|------------------|---------------|
| Patient Engagement | Eye contact, body language, verbal responsiveness | 5-point Likert scale |
| Technology Interaction | Connection quality, audio/video issues, platform navigation | Binary checklist |
| Shared Decision-Making | Patient questions, clinician explanations, collaborative planning | OPTION-12 scale |
| Health Literacy | Comprehension indicators, teach-back success | Brief Health Literacy Screen |
| Home Environment | Background noise, interruptions, privacy, visible social support | Structured checklist |

**Coding Procedure**:
- Three trained coders independently code 10% overlap sample
- Inter-rater reliability: Krippendorff's α ≥ 0.75 for continuous measures, κ ≥ 0.70 for categorical
- Weekly calibration meetings resolving coding discrepancies
- Blinded coding (coders unaware of patient outcomes)

#### B. Medication Adherence Systematic Observation

**Self-Report Triangulation**:
- Monthly Morisky Medication Adherence Scale-8 (MMAS-8)
- Compared against objective PDC from Synthea pharmacy claims
- Discrepancy analysis identifying over-reporters vs. accurate reporters

#### C. Technology Usability Observation

**Systematic Assessment**:
- System Usability Scale (SUS) at baseline, 3, 6, 12 months
- Technology acceptance model constructs (perceived usefulness, ease of use)
- Device error logs (automated from simulated monitoring platforms)
- Technical support contact frequency and issue categorization

---

## II. Technology-Enhanced Data Collection

### 2.1 Digital Phenotyping via Platform Analytics

**Data Sources** (simulated metadata overlaid on Synthea data):

#### A. Platform Engagement Metrics
- Login frequency, duration, and timing patterns
- Feature utilization (blood pressure dashboard, medication reminders, educational content)
- Message thread participation (patient-initiated vs. clinician-initiated)
- Video consultation attendance and punctuality
- Portal navigation patterns (pages viewed, time spent, click sequences)

**Behavioral Phenotypes**:
- **Engaged Users**: High login frequency, proactive messaging, consistent monitoring
- **Reactive Users**: Login following clinician prompts, irregular monitoring
- **Disengaged Users**: Declining platform use over time
- **Technology-Challenged Users**: High error rates, frequent technical support contacts

#### B. Device Interaction Data
- Blood pressure cuff pairing attempts and success rates
- Measurement transmission success vs. failure patterns
- Device battery replacement timing
- Firmware update completion

**Data Generation**:
```python
# Pseudo-algorithm for generating technology interaction metadata
for patient in synthea_cohort:
    # Base engagement on patient demographics and comorbidities
    engagement_propensity = calculate_propensity(
        age=patient.age,
        education=patient.education_level,
        comorbidity_count=len(patient.conditions),
        baseline_bp=patient.initial_bp
    )
    
    # Generate daily platform interaction probability
    for day in study_period:
        interaction_probability = engagement_propensity * habituation_curve(day)
        if random() < interaction_probability:
            generate_login_event(patient, day)
            if random() < 0.7:  # 70% take measurement when logging in
                generate_bp_measurement(patient, day)
```

### 2.2 Geographic and Contextual Data

**Data Elements from Synthea**:
- Patient residential coordinates (synthetic)
- Distance to nearest healthcare facility
- Urban vs. rural classification
- Area-level socioeconomic indicators (median income, education levels)
- Broadband availability (correlated with geographic location)

**Derived Contextual Variables**:
- Healthcare access index (composite of distance, transportation, facility availability)
- Digital divide risk score (broadband + device ownership + digital literacy estimate)
- Social vulnerability index (CDC SVI metrics by census tract)

**Analysis Applications**:
- Spatial analysis identifying geographic clusters of engagement/non-engagement
- Multilevel models with geographic random effects
- Interaction effects between location-based barriers and outcomes

### 2.3 Temporal Pattern Analysis

**Chronobiological Observation**:
- Blood pressure diurnal patterns (morning surge, nocturnal dipping)
- Medication timing relative to measurement timing
- Visit scheduling preferences (day of week, time of day)
- Seasonal adherence variations

**Event Sequence Mining**:
- Patterns preceding blood pressure spikes (missed medications, stress events, dietary changes)
- Trajectories following clinical events (hospitalization → engagement changes)
- Medication change sequences and subsequent adherence patterns

---

## III. Data Triangulation Strategy

### 3.1 Multi-Source Integration Framework

**Primary Data Sources**:

| Source Type | Specific Data | Update Frequency | Purpose |
|-------------|---------------|------------------|---------|
| **Synthea EHR** | Encounters, diagnoses, procedures, vital signs | Per encounter | Clinical outcomes, comorbidities |
| **Synthea Pharmacy** | Prescriptions, fills, days supply | Per transaction | Medication adherence (objective) |
| **Participant Observation** | Field notes, narratives, barriers | Weekly to monthly | Contextual understanding, barriers |
| **Platform Analytics** | Logins, measurements, messages | Continuous | Engagement patterns, digital behavior |
| **Structured Observation** | Video encounter coding, usability scales | Per assessment | Communication quality, technology acceptance |
| **Geographic Data** | Location, SVI, access metrics | Static/annual | Contextual factors, disparities |

### 3.2 Triangulation Approaches

#### A. Convergent Validation
**Medication Adherence Triangle**:
1. **Objective**: Pharmacy claims PDC from Synthea
2. **Self-Report**: MMAS-8 scores
3. **Observational**: Coaching session reports of adherence behaviors

**Analysis**:
```
Concordance Matrix:
                Objective High    Objective Low
Self-Report High    True Adherent     Over-Reporter
Self-Report Low     Under-Reporter    True Non-Adherent

Qualitative observation provides context for discrepant cases
```

#### B. Complementary Insights
**Blood Pressure Control Determinants**:
- **Quantitative**: Platform engagement metrics, medication PDC, demographic variables
- **Qualitative**: Participant observation identifying specific barriers (cost, side effects, forgetfulness, cultural beliefs)
- **Integration**: Quantitative models identify patterns; qualitative explains mechanisms

#### C. Sequential Triangulation
**Phase 1**: Quantitative analysis identifies unexpected patterns (e.g., high engagement but poor control)
**Phase 2**: Targeted qualitative investigation explores mechanisms through detailed case observation
**Phase 3**: Refined quantitative models incorporating newly identified factors

### 3.3 Discrepancy Resolution Protocol

When data sources conflict:

1. **Assess Measurement Validity**: Which source most directly measures construct?
2. **Examine Temporal Alignment**: Do measurements occur at same timepoints?
3. **Consider Social Desirability**: Is self-report potentially biased?
4. **Qualitative Investigation**: Use observational data to understand discrepancies
5. **Sensitivity Analysis**: Test conclusions under different assumptions about true values

**Example**:
```
Patient reports high adherence (MMAS-8 = 7/8)
BUT pharmacy data shows PDC = 0.45
AND observer notes patient mentioning "sometimes forgetting"

Resolution: PDC likely more valid; self-report influenced by social desirability
Action: Code as non-adherent; use observational data to understand barriers
```

---

## IV. Inter-Observer Reliability Plan

### 4.1 Detailed Observer Training Protocol

#### Phase 1: Foundational Training (Week 1 - 40 hours)

**Module 1: Observational Research Fundamentals (8 hours)**
- History and philosophy of observational methods
- Participant vs. naturalistic vs. systematic observation
- Reactivity and Hawthorne effect concepts
- Ethical foundations: Belmont Report principles applied to observation
- Role boundaries: Observer vs. clinician vs. researcher

**Module 2: Bias Recognition and Mitigation (8 hours)**
- Types of bias: Observer, confirmation, expectancy, cultural
- Self-awareness exercises identifying personal biases
- Strategies for maintaining objectivity
- Documentation practices minimizing interpretation
- Case studies: Bias impact on observational validity

**Module 3: Cultural Competency and Health Equity (8 hours)**
- Social determinants of health framework
- Cultural humility principles
- Implicit bias training with IAT exercises
- Health literacy and communication across literacy levels
- Working with diverse populations: race, ethnicity, age, disability, LGBTQ+
- Language access and interpreter utilization

**Module 4: Specific Instrument Training (8 hours)**

*OPTION-12 Shared Decision-Making Scale*:
- Video demonstrations of high/low shared decision-making
- Practice coding 20 sample encounters
- Discussion of ambiguous scenarios
- Anchor points for each scale item established

*System Usability Scale (SUS)*:
- Administration standardization
- Handling patient questions without influencing responses
- Dealing with incomplete responses
- Practice administration with 10 mock patients

*Brief Health Literacy Screen*:
- Recognizing health literacy red flags
- Non-judgmental observation techniques
- Distinguishing literacy from cognitive impairment
- Practice coding patient-clinician interactions

**Module 5: Data Documentation Standards (8 hours)**
- Field note writing best practices
- SOAP note structure for observational data
- Distinguishing observation from interpretation
- Time-stamping and contextual annotation
- Reflexivity statements (acknowledging observer positionality)
- Quality criteria: Credibility, transferability, dependability, confirmability

**Training Assessment**:
- Written exam (≥85% required to pass): Concepts, ethics, bias recognition
- Practical assessment: Code 5 video encounters, interview 2 mock patients
- Reflective essay: Personal biases and mitigation strategies

#### Phase 2: Supervised Practice Coding (Week 2-3 - 40 hours)

**Gold Standard Development**:
- Expert panel (n=3) codes 100 encounters establishing gold standard
- Consensus meetings resolve discrepancies
- Final gold standard dataset created for training

**Trainee Coding Practice**:
- Code 50 encounters independently (different from study sample)
- Compare against gold standard after every 10 encounters
- Individual feedback sessions identifying error patterns
- Recode encounters where agreement <70%
- Progress tracking: Agreement trajectory monitored

**Competency Threshold**:
- Must achieve ≥80% agreement with gold standard on final 20 encounters
- Cohen's κ ≥0.70 for categorical codes
- ICC ≥0.75 for continuous ratings
- Trainees not meeting threshold receive additional training and reassessment

#### Phase 3: Team Calibration (Week 4 - 20 hours)

**Consensus Building**:
- All observers code same 20 encounters independently
- Group meeting discusses each encounter:
  * Share individual codes
  * Explain reasoning
  * Identify discrepancies
  * Reach consensus on correct codes
  * Document ambiguous scenarios in coding manual

**Coding Manual Refinement**:
- Decision rules for ambiguous situations
- Worked examples with rationale
- Common pitfalls and how to avoid them
- Updates based on pilot data

**Final Certification**:
- Code 20 new encounters independently
- Meet reliability thresholds with team consensus codes
- Certificate of completion awarded
- Assigned to independent coding duties

### 4.2 Ongoing Calibration Strategies

#### Weekly Calibration Meetings (1 hour)

**Structured Agenda**:
```
1. Review previous week's double-coded cases (30 min)
   - Present disagreements
   - Discuss reasoning
   - Reach consensus
   - Update coding manual if needed

2. Challenging case discussion (20 min)
   - Observers nominate difficult cases
   - Collective problem-solving
   - Establish guidance for similar future cases

3. Reliability metrics review (10 min)
   - Current kappa/ICC values
   - Trends over time
   - Identify observers needing additional support
```

**Documentation**:
- Meeting minutes capturing decisions
- Coding manual updates version-controlled
- Action items assigned and tracked

#### Monthly Inter-Rater Reliability Audits

**Sampling Strategy**:
```python
# Stratified sampling for double-coding
strata = {
    'patient_age': ['18-45', '46-60', '61-75'],
    'race_ethnicity': ['White', 'Black', 'Hispanic', 'Asian', 'Other'],
    'technology_issues': ['Yes', 'No'],
    'time_period': ['Month1-3', 'Month4-6', 'Month7-9', 'Month10-12']
}

for stratum in generate_strata_combinations(strata):
    sample_n = 50 / n_strata  # 50 total encounters per month
    select_random_sample(stratum, n=sample_n)
    assign_to_two_random_observers()
```

**Reliability Calculation**:
```r
# Example R code for reliability assessment
library(irr)

# For categorical codes
kappa_results <- kappa2(ratings_matrix, weight="unweighted")

# For ordinal scales  
weighted_kappa <- kappa2(ratings_matrix, weight="squared")

# For continuous scales
icc_results <- icc(ratings_matrix, model="twoway", type="agreement")

# Generate reliability report
if(kappa_results$value < 0.70) {
    trigger_calibration_session()
    flag_observers_below_threshold()
}
```

#### Quarterly Comprehensive Reviews

**Scope**:
- Review all reliability metrics across observers
- Identify systematic drift patterns
- Assess need for refresher training
- Evaluate coding manual adequacy
- Plan enhancements for next quarter

**Deliverables**:
- Quarterly reliability report to PI and IRB
- Individual observer feedback letters
- Updated training materials
- Revised coding manual (if needed)

### 4.3 Reliability Metrics and Thresholds

#### Categorical Data: Cohen's Kappa and Krippendorff's Alpha

**Interpretation Guidelines**:
| Kappa Value | Interpretation | Action |
|------------|----------------|--------|
| < 0.40 | Poor | Immediate retraining; suspend independent coding |
| 0.40-0.59 | Fair | Targeted coaching; increase double-coding to 40% |
| 0.60-0.69 | Moderate | Calibration session; identify specific problems |
| 0.70-0.80 | Good | Continue monitoring; standard protocols |
| > 0.80 | Excellent | Maintain current practices |

**Calculation Example**:
```
Observer A and B code 50 encounters for technology issues (Yes/No)

Observed Agreement: 42/50 = 0.84
Expected Agreement by Chance: P(both Yes) + P(both No)
                            = (0.5 × 0.48) + (0.5 × 0.52) 
                            = 0.50
                            
Cohen's κ = (0.84 - 0.50) / (1 - 0.50) = 0.68

Result: Moderate agreement; calibration session scheduled
```

#### Continuous Data: Intraclass Correlation Coefficient

**ICC Model Selection**:
- **Model**: Two-way mixed effects
- **Type**: Absolute agreement (not consistency)
- **Unit**: Single rater (not average of raters)

**Interpretation**:
| ICC Value | Interpretation | Action |
|-----------|----------------|--------|
| < 0.50 | Poor | Immediate retraining required |
| 0.50-0.74 | Moderate | Additional practice and feedback |
| 0.75-0.90 | Good | Standard protocols maintained |
| > 0.90 | Excellent | Consider reducing double-coding burden |

**Calculation**:
```
ICC(2,1) = (MSR - MSE) / (MSR + (k-1)MSE + k(MSC - MSE)/n)

Where:
MSR = Mean square for rows (subjects)
MSE = Mean square error (residual)
MSC = Mean square for columns (raters)
k = Number of raters
n = Number of subjects

Reported with 95% confidence interval
```

#### Ordinal Data: Weighted Kappa

**Weighting Scheme**: Quadratic weights
```
Weight = 1 - (i - j)² / (k - 1)²

Where:
i, j = Categories assigned by raters
k = Number of categories

Example for 5-point Likert:
Adjacent category disagreement (4 vs 5): Weight = 0.94
Two-category disagreement (3 vs 5): Weight = 0.75
Maximum disagreement (1 vs 5): Weight = 0.00
```

### 4.4 Drift Monitoring and Prevention

#### Automated Monthly Drift Detection

**Statistical Process Control Charts**:
```python
# Control chart for monitoring kappa over time
import numpy as np
import matplotlib.pyplot as plt

def create_control_chart(kappa_values, dates):
    mean_kappa = np.mean(kappa_values)
    std_kappa = np.std(kappa_values)
    
    ucl = mean_kappa + 2*std_kappa  # Upper control limit
    lcl = mean_kappa - 2*std_kappa  # Lower control limit
    
    plt.plot(dates, kappa_values, 'bo-')
    plt.axhline(mean_kappa, color='g', linestyle='--', label='Mean')
    plt.axhline(ucl, color='r', linestyle='--', label='UCL')
    plt.axhline(lcl, color='r', linestyle='--', label='LCL')
    plt.axhline(0.70, color='orange', linestyle=':', label='Minimum')
    
    # Flag points outside control limits
    for i, (date, kappa) in enumerate(zip(dates, kappa_values)):
        if kappa < lcl or kappa > ucl:
            plt.plot(date, kappa, 'ro', markersize=10)
            trigger_investigation(month=i+1)
```

#### Systematic Drift Patterns

**Pattern Recognition**:
1. **Temporal Drift**: Reliability declining over time
   - Cause: Observer fatigue, boredom, skill decay
   - Solution: Refresher training, motivation strategies

2. **Observer-Specific Drift**: One observer consistently differs from others
   - Cause: Idiosyncratic interpretation, inadequate training
   - Solution: Individual coaching, re-certification

3. **Item-Specific Drift**: Particular codes show poor agreement
   - Cause: Ambiguous definitions, complex concepts
   - Solution: Coding manual clarification, additional examples

4. **Context-Specific Drift**: Agreement varies by patient characteristics
   - Cause: Difficulty with specific populations or scenarios
   - Solution: Targeted training, expert consultation

#### Drift Mitigation Strategies

**Continuous Quality Improvement Cycle**:
```
Measure → Analyze → Improve → Verify → Sustain
   ↑                                      ↓
   ←─────────────────────────────────────
```

**Specific Tactics**:
- **Booster Training** (quarterly): 4-hour refresher sessions
- **Gold Standard Recalibration** (semi-annually): Re-establish benchmarks with new examples
- **Peer Review**: Observers critique each other's coded cases constructively
- **Video Review Sessions**: Watch encounters together, discuss real-time coding decisions
- **Coding Games**: Gamified practice to maintain engagement and skill

### 4.5 Handling Disagreements

#### Consensus Building Process

**For Minor Disagreements** (within 1 scale point or adjacent categories):
```
Step 1: Independent initial coding
Step 2: Reveal codes to each other
Step 3: Brief discussion of reasoning (5 minutes)
Step 4: Independent re-rating after discussion
Step 5: If still disagree, use average (continuous) or senior coder breaks tie (categorical)
```

**For Major Disagreements** (>1 scale point difference):
```
Step 1: Independent initial coding
Step 2: Each coder writes rationale (before seeing other's code)
Step 3: Senior coder reviews both codes and rationales (blinded to coder identity)
Step 4: Team meeting with video review
Step 5: Consensus reached through discussion
Step 6: Document reason for disagreement in coding manual
```

**Unresolvable Disagreements**:
- Escalate to PI or senior methodologist
- Consider excluding case if fundamental ambiguity exists
- Document exclusion decision and reasoning

### 4.6 Observer Performance Feedback

#### Individual Feedback Reports (Monthly)

**Template**:
```markdown
Observer: [Name]
Month: [Date]
Cases Coded: [N]

Reliability Metrics:
- Overall κ: 0.XX (Target: ≥0.70)
- ICC: 0.XX (Target: ≥0.75)
- % Perfect Agreement: XX%

Strengths:
- [Specific codes/domains with high reliability]
- [Positive trends]

Areas for Improvement:
- [Specific codes/domains with low reliability]
- [Common error patterns]

Action Plan:
- [Specific recommendations]
- [Additional training resources]
- [Follow-up timeline]

Coder's Reflection:
- [Space for self-assessment]
- [Questions or concerns]
```

**Positive Reinforcement**:
- Recognize excellent reliability publicly in team meetings
- Highlight observers demonstrating improvement
- Award "Reliability Champion" monthly (gamification)

---

## V. Hawthorne Effect and Bias Management

### 5.1 Hawthorne Effect Mitigation Strategies

#### A. Habituation Design

**Observation Intensity Tapering**:
- **Weeks 1-4**: Weekly coaching (high observation intensity)
- **Weeks 5-12**: Biweekly coaching (moderate intensity)
- **Weeks 13-52**: Monthly coaching (low intensity)

**Rationale**: Initial reactivity expected; habituation over time as observation normalizes

**Empirical Assessment**:
```
Model: Outcome ~ Time + Time² + ObservationIntensity + Time×ObservationIntensity

Test H₀: Reactivity diminishes over time (negative Time² coefficient)
Test H₁: Reduced observation intensity changes behavior trajectory
```

#### B. Unobtrusive Measures Priority

**Passive Data Collection**:
- Automated blood pressure transmission (no active patient recording)
- Platform analytics captured automatically (no additional patient action)
- Pharmacy claims from routine prescribing (no research-specific behavior)

**Less Reactive Measures**:
- Objective adherence (pharmacy claims) prioritized over self-report
- Automated device logs over patient logs
- Clinical outcomes (blood pressure) over process measures when possible

#### C. Comparison Group Strategy

**Within-Subjects Design**:
- Pre-observation baseline period (months -3 to 0): Extract historical Synthea data
- Observation period (months 1-12): Active study participation
- Compare individual trajectories to assess observation effects

**Between-Subjects Comparison**:
- Identify matched controls in Synthea receiving usual care (no telemedicine, no observation)
- Propensity score matching on baseline characteristics
- Compare outcomes adjusting for observation exposure

### 5.2 Observer Bias Management

#### A. Observer Blinding (Partial)

**Feasible Blinding**:
- Video encounter coders blinded to patient clinical outcomes during coding
- Outcome assessors analyzing blood pressure control unaware of engagement classifications
- Statistical analysts receive de-identified data without exposure to field notes

**Infeasible Blinding**:
- Participant observation coaches necessarily know patient engagement patterns
- Solution: Use objective outcome measures less susceptible to observer interpretation

#### B. Standardized Instruments

**Validated Scales**:
- System Usability Scale (SUS)
- Morisky Medication Adherence Scale (MMAS-8)
- OPTION-12 shared decision-making scale
- Brief Health Literacy Screen

**Benefits**:
- Established scoring algorithms reduce subjective judgment
- Published psychometric properties enable comparison
- Training materials standardize administration

#### C. Mixed Methods Team Separation

**Qualitative Team**: Conducts participant observation, generates field notes, identifies themes
**Quantitative Team**: Analyzes Synthea data, platform metrics, statistical modeling
**Integration Team**: Brings together findings, resolves discrepancies, synthesizes

**Protection**: Prevents qualitative team biases from influencing quantitative analyses and vice versa

### 5.3 Selection Bias Management

#### A. Enrollment Strategy

**Synthea Cohort Definition**:
```sql
SELECT patient_id
FROM patients p
JOIN conditions c ON p.id = c.patient_id
WHERE c.code IN (hypertension_codes)
  AND p.age BETWEEN 18 AND 75
  AND enrollment_date BETWEEN '2024-01-01' AND '2024-12-31'
  AND NOT EXISTS (
    SELECT 1 FROM encounters e 
    WHERE e.patient_id = p.id 
      AND e.code IN (kidney_failure_codes, pregnancy_codes)
  )
```

**Inclusion Criteria**:
- Diagnosed hypertension (ICD-10: I10-I15)
- Age 18-75 years
- Prescribed antihypertensive medication
- English or Spanish speaking (for coaching observations)

**Exclusion Criteria**:
- End-stage renal disease
- Pregnancy
- Cognitive impairment limiting telemedicine participation
- No telephone/internet access (would prevent intervention engagement)

#### B. Propensity-Based Analysis

**Propensity for Engagement Model**:
```
Logit(High_Engagement) ~ Age + Sex + Race/Ethnicity + Education + 
                         Income + Comorbidity_Count + Baseline_BP + 
                         Digital_Literacy + Prior_Telehealth_Use + 
                         Geographic_Access + Social_Support
```

**Applications**:
- Inverse probability weighting for outcome analyses
- Propensity stratification for subgroup comparisons
- Sensitivity analyses examining unmeasured confounding

### 5.4 Measurement Reactivity Assessment

**Intensive vs. Standard Monitoring Comparison**:

Using Synthea's natural variation in monitoring frequency:
- **High-Intensity**: Daily BP monitoring prescribed
- **Standard-Intensity**: Weekly BP monitoring prescribed
- **Analysis**: Does monitoring frequency itself affect outcomes (independent of adherence)?

**Measurement Artifact Investigation**:
```
Research Question: Do blood pressure readings systematically decrease 
                   immediately after coaching sessions (suggesting 
                   short-term reactivity)?

Analysis: Interrupted time series examining BP in 7-day windows 
          before/after coaching sessions
```

---

## VI. Analytical Framework

### 6.1 Mixed-Effects Longitudinal Models

**Primary Analysis**:
```
BP(t) ~ Time + Engagement(t) + Adherence(t) + Demographics + Comorbidities +
        (1 + Time | Patient) + (1 | Coach) + (1 | Geographic_Region)

Where:
- BP(t): Blood pressure at time t
- Random effects: Patient-specific intercepts/slopes, coach clustering, 
  geographic clustering
```

### 6.2 Trajectory Analysis

**Latent Class Growth Modeling**:
- Identify distinct trajectory patterns (rapid responders, slow responders, non-responders)
- Examine predictors of trajectory class membership
- Use qualitative observation data to characterize class differences

### 6.3 Causal Mediation Analysis

**Research Question**: Does platform engagement mediate the relationship between intervention exposure and blood pressure control?

```
Total Effect: Telemedicine → BP Control
Direct Effect: Telemedicine → BP Control (controlling for engagement)
Indirect Effect: Telemedicine → Engagement → BP Control
```

### 6.4 Machine Learning for Pattern Detection

**Unsupervised Learning**:
- Cluster analysis identifying engagement phenotypes
- Sequence mining discovering common behavioral patterns
- Anomaly detection flagging unusual patterns warranting qualitative investigation

**Supervised Learning**:
- Prediction models for non-adherence, disengagement, poor control
- Feature importance analysis identifying key predictors
- Use predictions to target intensive observation resources

### 6.5 Qualitative Analysis

**Thematic Analysis of Field Notes**:
1. Open coding: Initial barrier/facilitator identification
2. Axial coding: Grouping related codes into themes
3. Selective coding: Developing overarching theoretical framework

**Integration with Quantitative**:
- Quantitative identifies patterns → Qualitative explains mechanisms
- Qualitative generates hypotheses → Quantitative tests associations
- Discrepancies between methods prompt deeper investigation

---

## VII. Synthea Data Implementation Specifications

### 7.1 Core Synthea Modules Required

**Essential Modules**:
- **Cardiovascular Disease**: Hypertension diagnosis, progression, complications
- **Medications**: Antihypertensive prescriptions (ACE inhibitors, ARBs, CCBs, diuretics, beta-blockers)
- **Encounters**: Primary care visits, emergency department, hospitalizations, telehealth
- **Observations**: Blood pressure measurements, labs (creatinine, potassium, lipids)
- **Claims**: Pharmacy claims, procedure claims, diagnosis claims

### 7.2 Synthetic Data Augmentation

**Telemedicine-Specific Extensions** (to overlay on base Synthea data):

```python
# Generate telemedicine engagement metrics
class TelemedicineObservation:
    def __init__(self, patient, start_date):
        self.patient = patient
        self.start_date = start_date
        
    def generate_engagement_trajectory(self, months=12):
        """Generate platform engagement over time"""
        
        # Base engagement propensity from patient characteristics
        base_engagement = self.calculate_propensity(
            age=self.patient.age,
            tech_literacy=self.estimate_digital_literacy(),
            baseline_bp=self.patient.initial_bp,
            comorbidities=len(self.patient.conditions)
        )
        
        # Time-varying engagement with habituation
        engagement_trajectory = []
        for month in range(months):
            # Hawthorne effect: High initially, declines, plateaus
            hawthorne_multiplier = 1.3 if month < 3 else 1.0
            
            # Habituation: Gradual decline in reactivity
            habituation_factor = np.exp(-0.05 * month)
            
            # Success reinforcement: Engagement increases if BP improving
            success_boost = 1.2 if self.patient.bp_improving(month) else 0.9
            
            month_engagement = (base_engagement * 
                              hawthorne_multiplier * 
                              habituation_factor * 
                              success_boost + 
                              np.random.normal(0, 0.1))
            
            engagement_trajectory.append(month_engagement)
            
        return engagement_trajectory
    
    def generate_bp_measurements(self, engagement_trajectory):
        """Generate home BP measurements based on engagement"""
        measurements = []
        
        for month, engagement in enumerate(engagement_trajectory):
            # Measurements per month correlates with engagement
            n_measurements = np.random.poisson(engagement * 20)
            
            for _ in range(n_measurements):
                # True BP with medication effect + measurement error
                true_bp = self.patient.calculate_true_bp(month)
                measured_bp = true_bp + np.random.normal(0, 5)
                
                measurements.append({
                    'month': month,
                    'systolic': measured_bp,
                    'timestamp': self.generate_timestamp(month)
                })
                
        return measurements
```

### 7.3 Data Extract Schema

**Observation Database Structure**:

```sql
-- Patient demographics and baseline
CREATE TABLE patients (
    patient_id VARCHAR(36) PRIMARY KEY,
    age INT,
    sex VARCHAR(10),
    race VARCHAR(50),
    ethnicity VARCHAR(50),
    education_level VARCHAR(50),
    income_level VARCHAR(50),
    zip_code VARCHAR(10),
    enrollment_date DATE,
    baseline_systolic INT,
    baseline_diastolic INT
);

-- Longitudinal blood pressure measurements
CREATE TABLE bp_measurements (
    measurement_id SERIAL PRIMARY KEY,
    patient_id VARCHAR(36) REFERENCES patients,
    measurement_date TIMESTAMP,
    systolic INT,
    diastolic INT,
    measurement_context VARCHAR(20), -- 'home', 'clinic', 'emergency'
    device_id VARCHAR(50)
);

-- Medication adherence data
CREATE TABLE medication_adherence (
    patient_id VARCHAR(36) REFERENCES patients,
    month INT,
    pdc DECIMAL(3,2), -- Proportion of days covered
    gap_days INT, -- Days without medication
    refill_timeliness VARCHAR(20) -- 'early', 'on-time', 'late'
);

-- Platform engagement metrics
CREATE TABLE platform_engagement (
    patient_id VARCHAR(36) REFERENCES patients,
    date DATE,
    logins INT,
    minutes_active INT,
    bp_views INT,
    messages_sent INT,
    educational_content_views INT
);

-- Qualitative observation data
CREATE TABLE field_notes (
    note_id SERIAL PRIMARY KEY,
    patient_id VARCHAR(36) REFERENCES patients,
    observer_id VARCHAR(36),
    observation_date DATE,
    note_text TEXT,
    themes TEXT[], -- Array of identified themes
    barriers TEXT[],
    facilitators TEXT[]
);

-- Structured encounter observations
CREATE TABLE encounter_observations (
    encounter_id VARCHAR(36) PRIMARY KEY,
    patient_id VARCHAR(36) REFERENCES patients,
    encounter_date DATE,
    engagement_score INT, -- 1-5 Likert scale
    technology_issues BOOLEAN,
    shared_decision_making_score INT, -- OPTION-12 total
    health_literacy_adequate BOOLEAN,
    observer_id VARCHAR(36)
);
```

### 7.4 Sample Size and Power Considerations

**Primary Analysis Power Calculation**:
```
Outcome: Blood pressure control (<140/90)
Exposure: High vs. low platform engagement

Expected control rate in low engagement: 40%
Clinically meaningful difference: 15 percentage points
α = 0.05, Power = 0.80
Required sample size: 372 per group → 750 total

With 20% attrition: N = 1,000 recruited
```

**Subgroup Analysis Considerations**:
- Sufficient power for race/ethnicity subgroups (≥150 per group)
- Age stratification (18-45, 46-60, 61-75): ≥300 per stratum
- Geographic stratification (urban/rural): Adequate given Synthea distribution

---

## VIII. Timeline and Milestones

| Phase | Duration | Key Activities | Deliverables |
|-------|----------|---------------|--------------|
| **Preparation** | Months -3 to 0 | Synthea data generation, platform setup, observer training, IRB approval | Trained observation team, data infrastructure |
| **Enrollment** | Months 0-3 | Patient recruitment, baseline assessments, initial observations | N=1,000 enrolled, baseline data complete |
| **Intensive Observation** | Months 1-6 | Weekly/biweekly coaching, video encounter coding, platform monitoring | Rich observational data, early engagement patterns |
| **Sustained Monitoring** | Months 7-12 | Monthly coaching, continued platform monitoring, ongoing data collection | Longitudinal trajectories, habituation assessment |
| **Analysis** | Months 13-15 | Data integration, statistical analysis, qualitative thematic analysis | Preliminary findings, pattern identification |
| **Dissemination** | Months 16-18 | Manuscript preparation, conference presentations | Publications, practice recommendations |

---

## IX. Ethical Considerations

### 9.1 Informed Consent

**Key Elements**:
- Observation scope: Types of data collected, observation intensity, duration
- Video recording: Consent for encounter recording and coding
- Data sharing: Synthea synthetic nature, no PHI, but research use explained
- Voluntary participation: Right to withdraw, declining observation doesn't affect care
- Benefits/risks: Potential Hawthorne effect as benefit; minimal risks from observation

### 9.2 Privacy Protections

**Even with synthetic data**:
- Treat as if real PHI for training purposes
- Secure data storage, encrypted transmission
- Limited access (role-based)
- De-identification for presentations/publications
- No patient identifiers in field notes

### 9.3 Observer Training on Ethics

**Curriculum Includes**:
- Respect for autonomy and privacy
- Recognizing vulnerable populations
- Mandatory reporting requirements (in real study: abuse, neglect)
- Cultural humility and anti-bias training
- Professional boundaries in participant observation

### 9.4 Procedures for Handling Unexpected Events and Ethical Dilemmas

#### A. Clinical Safety Protocols

**Critical Blood Pressure Thresholds**:
- **Hypertensive Emergency** (≥180/120 mmHg with symptoms): Immediate emergency services notification
- **Severely Elevated** (≥180/120 mmHg without symptoms): Same-day clinician contact required
- **Uncontrolled** (≥160/100 mmHg sustained): 48-hour clinician follow-up

**Observer Actions**:
```
IF BP ≥ 180/120 AND (chest_pain OR dyspnea OR altered_mental_status OR severe_headache):
    1. Instruct patient to call 911 immediately
    2. Document in real-time safety log
    3. Notify study PI within 15 minutes
    4. Complete adverse event report within 24 hours
ELSE IF BP ≥ 180/120 without symptoms:
    1. Contact study clinician immediately (within 1 hour)
    2. Arrange same-day evaluation
    3. Document intervention and outcome
```

**Medication Adverse Events**:
- Suspected serious adverse drug reactions → immediate clinician notification
- New symptoms post-medication change → 24-hour documentation and reporting
- Patient expresses suicidal ideation → crisis hotline referral + immediate PI notification

#### B. Technology Failure Response

**Device Malfunction Protocol**:
1. **Immediate**: Troubleshoot using standardized decision tree
2. **Within 24 hours**: Technical support contact if unresolved
3. **Within 48 hours**: Backup device shipping if needed
4. **Documentation**: Log all technical issues with timestamps and resolution

**Data Transmission Failures**:
- Manual data entry backup protocol activated if >3 consecutive failures
- IT team notification if system-wide outage
- Patient provided alternative monitoring options (phone reporting)

#### C. Ethical Dilemma Decision Framework

**Real-Time Consultation Structure**:
```
Observer encounters ethical dilemma
         ↓
Immediate supervisor consultation (available 24/7)
         ↓
If unresolved → Study PI consultation within 2 hours
         ↓
If still unresolved → Ethics Committee consultation within 24 hours
         ↓
Document decision and rationale in ethics log
```

**Common Dilemma Scenarios with Decision Trees**:

**Scenario 1: Patient Reports Non-Adherence Due to Cost**
```
Decision Path:
- Assess immediate safety risk (current BP status)
- Provide resource list for medication assistance programs
- Connect with social worker if available
- Document barriers in observational notes
- DO NOT judge or pressure patient
- Maintain therapeutic relationship priority
```

**Scenario 2: Observer Suspects Domestic Violence**
```
Decision Path (synthetic data context):
- Document observations objectively
- Consult with PI immediately
- In real study: Follow mandatory reporting laws
- Provide domestic violence resources
- Safety planning takes precedence over research activities
- Consider participant withdrawal if safety compromised
```

**Scenario 3: Patient Requests Observer Opinion on Medical Decisions**
```
Decision Path:
- Clarify observer role (research, not clinical care)
- Redirect to clinical team for medical advice
- Document patient concerns for clinician review
- Maintain professional boundaries
- Offer to facilitate clinician communication
```

**Scenario 4: Observer Witnesses Medication Diversion or Misuse**
```
Decision Path:
- Document observations without confrontation
- Immediate PI notification
- Clinical team assessment arranged
- Consider substance use disorder resources
- Maintain non-judgmental approach
- Reassess participant safety and study eligibility
```

**Scenario 5: Participant Distress During Observation**
```
Decision Path:
- Pause observation immediately
- Offer emotional support within boundaries
- Assess need for mental health resources
- Provide crisis hotline information if needed
- Document episode with sensitivity
- Consider observation schedule adjustment
```

#### D. Privacy Breach Response

**Suspected Data Breach Protocol**:
1. **Immediate** (within 1 hour):
   - Contain breach (disconnect systems, change passwords)
   - Document scope: what data, how many patients, how occurred
   
2. **Within 4 hours**:
   - Notify study PI and institutional data security officer
   - Activate incident response team
   
3. **Within 24 hours**:
   - Complete preliminary breach assessment
   - Notify IRB if required
   - Begin affected participant notification if applicable

4. **Within 72 hours**:
   - Complete full investigation
   - Implement corrective actions
   - Submit comprehensive incident report

**Inadvertent Privacy Violations**:
- Observer accidentally views unauthorized data → immediate supervisor notification and documentation
- Third party overhears encounter → assess disclosure scope, patient notification, mitigation planning
- Video recording error (wrong patient, unintended recording) → immediate deletion, documentation, patient notification

#### E. Observer Well-Being and Burnout Prevention

**Emotional Safety for Observers**:
- Monthly debriefing sessions with clinical supervisor
- Peer support groups for processing challenging observations
- Access to employee assistance program (EAP) services
- Rotation out of high-stress cases as needed

**Vicarious Trauma Protocol**:
```
Warning Signs:
- Persistent distress about patient situations
- Sleep disturbance related to observations
- Difficulty maintaining professional boundaries
- Cynicism or compassion fatigue

Response:
- Confidential discussion with supervisor
- Temporary case load reduction
- EAP referral
- Additional training on self-care
- Possible role reassignment if needed
```

#### F. Research Integrity Issues

**Data Fabrication or Falsification Suspicion**:
1. Confidential report to PI or integrity officer
2. Independent audit of suspected observer's data
3. Investigation following institutional policies
4. Remedial action (retraining vs. removal)
5. Data correction or exclusion as warranted

**Protocol Violations**:
- Minor deviations: Documentation, observer retraining, monitoring
- Major violations: Immediate suspension, investigation, possible termination
- All violations logged and reported to IRB as required

#### G. Unexpected Study Discontinuation

**Participant Withdrawal**:
- Respect decision without pressure to continue
- Collect reason if participant willing to share
- Retain previously collected data unless participant requests deletion
- Offer alternative care resources
- Document withdrawal and circumstances

**Emergency Study Suspension**:
```
Triggers:
- Safety concerns requiring immediate review
- Multiple serious adverse events
- Significant protocol violations
- External regulatory action

Actions:
1. Immediate suspension of new enrollment
2. Safety review of current participants
3. IRB notification within 24 hours
4. Participant notification of suspension
5. Investigation and corrective action plan
6. IRB approval required before resumption
```

#### H. Cultural and Linguistic Challenges

**Language Barriers**:
- Professional interpreter services (not family members)
- Bilingual observer assignment when possible
- Translated materials provided
- Extra time allocated for interpreted encounters

**Cultural Misunderstandings**:
- Consult cultural liaison when available
- Acknowledge uncertainty and seek guidance
- Avoid assumptions based on stereotypes
- Document cultural factors affecting observations
- Continuous cultural competency training

#### I. Decision Documentation Requirements

**All Unexpected Events Require**:
1. **Immediate documentation** in real-time log (what, when, who, where)
2. **Within 24 hours**: Detailed narrative describing:
   - Event details and context
   - Decision-making process
   - Consultations conducted
   - Actions taken
   - Outcome and follow-up plan
3. **Weekly review**: PI reviews all events, provides feedback
4. **Monthly aggregation**: Summary report to IRB with themes and actions

**Ethics Log Template**:
```
Date/Time: [timestamp]
Observer: [ID]
Patient: [ID]
Event Type: [dropdown menu]
Description: [free text]
Consultations: [who consulted, when]
Decision: [action taken]
Rationale: [reasoning]
Outcome: [result]
Lessons Learned: [for team learning]
```

#### J. Annual Protocol Review

**Comprehensive Assessment**:
- Review all unexpected events and ethical dilemmas
- Identify patterns requiring protocol modification
- Update decision trees based on experience
- Enhance training for commonly challenging scenarios
- Share lessons learned across research team

---

## X. Expected Contributions

### 10.1 Methodological Innovations

1. **Multi-modal integration**: Demonstrates combining qualitative observation with quantitative digital phenotyping
2. **Reactivity assessment**: Empirically quantifies Hawthorne effects and habituation in remote monitoring
3. **Triangulation framework**: Provides replicable approach for validating adherence across data sources
4. **Bias mitigation**: Tests multiple strategies for inter-observer reliability and observer blinding

### 10.2 Clinical Insights

1. **Engagement phenotypes**: Identifies distinct behavioral patterns in telemedicine users
2. **Barrier taxonomy**: Catalogs observable barriers (technology, literacy, contextual) affecting outcomes
3. **Equity assessment**: Documents disparities in telemedicine effectiveness across populations
4. **Implementation guidance**: Generates evidence-based recommendations for telemedicine program design

### 10.3 Synthetic Data Utility

1. **Synthea augmentation methods**: Demonstrates how to enrich synthetic EHR data with behavioral metadata
2. **Validation strategies**: Shows approaches for validating synthetic data patterns against real-world expectations
3. **Training applications**: Provides dataset for teaching observational research methods

---

## XI. Limitations and Mitigation

| Limitation | Mitigation Strategy |
|------------|-------------------|
| **Synthetic data limitations** | Validate patterns against published hypertension studies; acknowledge synthetic nature in interpretation |
| **Hawthorne effects** | Explicitly model as study question; use comparison periods/groups; assess habituation |
| **Observer bias** | Rigorous training, inter-rater reliability, blinded outcome assessment where feasible |
| **Selection bias** | Propensity methods, sensitivity analyses, diverse recruitment, document exclusions |
| **Generalizability** | Multi-site design, diverse sample, clear eligibility criteria, examine effect heterogeneity |
| **Missing data** | Intensive follow-up, redundant measurement, multiple imputation with sensitivity analyses |

---

## XII. Data Management Plan

**Storage**:
- REDCap database for structured observation data
- ATLAS.ti for qualitative field notes
- Secure server for video recordings (encrypted, access-controlled)
- PostgreSQL database for Synthea extracts and platform analytics

**Version Control**:
- All analysis code in GitHub (private repository)
- Data dictionary maintained with version history
- Analysis plan pre-registered before outcome assessment

**Quality Assurance**:
- Weekly data quality checks (range checks, consistency checks)
- Monthly data audits (random sample verification)
- Quarterly comprehensive data review

**Sharing**:
- De-identified quantitative dataset deposited in ICPSR upon publication
- Qualitative data: Sanitized field notes with identifiers removed
- Synthetic nature allows broader sharing than real patient data

---

## XIII. References

Chevallier, T., Buzancais, G., Occean, B.-V., Rataboul, P., Boisson, C., Simon, N., Lannelongue, A., Chaniaud, N., Gricourt, Y., Lefrant, J.-Y., & Cuvillon, P. (2020). Feasibility of remote digital monitoring using wireless Bluetooth monitors, the Smart Angel™ app and an original web platform for patients following outpatient surgery: A prospective observational pilot study. *BMC Anesthesiology, 20*(1), Article 251. https://doi.org/10.1186/s12871-020-01178-5

Clarke, J., Flott, K., Crespo, R. F., Ashrafian, H., Fontana, G., Benger, J., Darzi, A., & Elkin, S. (2021). Assessing the safety of home oximetry for COVID-19: A multisite retrospective observational study. *BMJ Open, 11*(9), Article e049235. https://doi.org/10.1136/bmjopen-2021-049235

Haynes, S. C., Kompala, T., Neinstein, A., Rosenthal, J. L., & Crossen, S. S. (2021). Disparities in telemedicine use for subspecialty diabetes care during COVID-19 shelter-in-place orders. *Journal of Diabetes Science and Technology, 15*(5), 1101–1106. https://doi.org/10.1177/1932296821997851

Martinez, K. A., Keenan, K., Rastogi, R., Roufael, J., Fletcher, A. M., Rood, M., & Rothberg, M. B. (2020). The association between physician race/ethnicity and patient satisfaction: An exploration in direct to consumer telemedicine. *Journal of General Internal Medicine, 35*(9), 2600–2606. https://doi.org/10.1007/s11606-020-06005-8

Predieri, B., Leo, F., Candia, F., Lucaccioni, L., Madeo, S. F., Pugliese, M., Vivaccia, V., Bruzzi, P., & Iughetti, L. (2020). Glycemic control improvement in Italian children and adolescents with type 1 diabetes followed through telemedicine during lockdown due to the COVID-19 pandemic. *Frontiers in Endocrinology, 11,* Article 595735. https://doi.org/10.3389/fendo.2020.595735

Walonoski, J., Kramer, M., Nichols, J., Quina, A., Moesel, C., Hall, D., Duffett, C., Dube, K., Gallagher, T., & McLachlan, S. (2018). Synthea: An approach, method, and software mechanism for generating synthetic patients and the synthetic electronic health care record. *Journal of the American Medical Informatics Association, 25*(3), 230–238. https://doi.org/10.1093/jamia/ocx079
