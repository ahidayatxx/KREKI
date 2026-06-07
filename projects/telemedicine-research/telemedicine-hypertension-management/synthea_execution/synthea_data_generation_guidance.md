# Guidance for Generating Synthetic Data for a Hypertension Telemedicine Pilot Study

This revised guide provides a streamlined process for generating a small-scale synthetic dataset with Synthea, specifically for a pilot study focused on testing observational protocols and performing advanced analyses.

## 1. Quick Setup and Configuration

For a pilot study, speed and simplicity are key. Follow this minimal setup:

1.  **Install Java**: Ensure you have Java JDK 11 or 17.
2.  **Download Synthea**: Get the pre-compiled JAR for the quickest start.
    ```bash
    wget https://github.com/synthetichealth/synthea/releases/download/master-branch-latest/synthea-with-dependencies.jar
    ```
3.  **Configure for CSV Export**: Create a simple `synthea.properties` file. For this pilot, we only need CSV output.
    ```properties
    exporter.csv.export = true
    exporter.baseDirectory = ./output/hypertension_pilot
    exporter.years_of_history = 1
    generate.vital_signs = true
    ```

## 2. Generate the Pilot Dataset

Use a single command to generate a small, manageable cohort. A size of 200-300 patients is sufficient for testing protocols and initial analysis.

```bash
java -jar synthea-with-dependencies.jar \
  -p 300 \
  -s 12345 \
  -m hypertension \
  -a 45-85 \
  -c synthea.properties \
  Massachusetts
```
*   `-p 300`: A smaller population for a manageable pilot dataset.
*   `-s 12345`: A seed for reproducibility.
*   `-m hypertension`: Focuses on the exact clinical module you are studying.
*   `-a 45-85`: Targets a more realistic age range for hypertension.

## 3. Data Preparation for Advanced Analysis

This section focuses on structuring the raw Synthea output for your specific analytical needs.

### Key Data Files for Your Pilot:
*   `patients.csv`: For demographic data.
*   `conditions.csv`: To identify your hypertension cohort.
*   `observations.csv`: For blood pressure readings and other vitals.
*   `medications.csv`: To track medication prescriptions and changes.
*   `encounters.csv`: To simulate telemedicine interactions.

### Simulating Telemedicine Encounters
For the pilot, simply re-label existing encounters as "telehealth". This is the fastest way to create the necessary data for your observational protocol.

```python
import pandas as pd

# Load encounters and simulate telehealth visits
encounters = pd.read_csv('output/hypertension_pilot/csv/encounters.csv')
encounters['ENCOUNTERCLASS'] = 'telehealth'
encounters.to_csv('output/hypertension_pilot/csv/encounters_telehealth.csv', index=False)
```

## 4. Guidance for Advanced Analyses

Here’s how to approach your planned analyses with the generated data:

### Sequence Analysis for Behavioral Patterns
*   **Objective**: To identify patterns in patient actions over time (e.g., "missed medication -> self-monitored BP -> scheduled telehealth visit").
*   **Data Preparation**:
    1.  Create a unified event log from `observations.csv`, `medications.csv`, and the modified `encounters_telehealth.csv`.
    2.  Each row should represent a single event with a `patient_id`, `timestamp`, and `event_type` (e.g., 'bp_check', 'med_refill', 'telehealth_visit').
*   **Analysis**: Use a sequence mining library (like `PrefixSpan-py` in Python) to find common sequences of behaviors among patients who do (or do not) achieve blood pressure control.

### Time Series Analysis for Temporal Trends
*   **Objective**: To analyze how blood pressure trends over the 12-month study period.
*   **Data Preparation**:
    1.  Filter `observations.csv` for blood pressure readings (LOINC codes `8480-6` for systolic, `8462-4` for diastolic).
    2.  Create a time series for each patient, resampling the data to a consistent frequency (e.g., daily or weekly) and handling missing values.
*   **Analysis**: Apply time series models (e.g., ARIMA) to identify trends, seasonality, or the impact of specific events (like a medication change) on blood pressure.

### Social Network Analysis (If Applicable)
*   **Objective**: To understand relationships if you simulate patient-to-patient or patient-to-provider interactions.
*   **Applicability**: This is only applicable if you decide to **simulate** interaction data, as Synthea does not generate this natively.
*   **Data Preparation**: Create an "edge list" where each row represents an interaction between two individuals (e.g., `patient_A`, `patient_B`, `timestamp`).
*   **Analysis**: Use a library like `NetworkX` in Python to build a graph and analyze centrality, clustering, and other network metrics. For a pilot focused on observational protocol, this may be out of scope unless you are specifically testing an interaction-based intervention.

### Mixed Methods Integration
*   **Objective**: To use your qualitative field notes to explain the "why" behind the quantitative patterns found in the Synthea data.
*   **Integration Strategy**:
    1.  **Develop Archetypes**: Use the quantitative data to cluster patients into archetypes (e.g., "Consistent Monitor," "Medication Avoider").
    2.  **Create Mock Field Notes**: For each archetype, generate a few sample qualitative field notes that represent the behaviors and attitudes of that group.
        *   *Example for "Medication Avoider"*: "Patient expressed concerns about side effects and mentioned they only take their medication when they 'feel' their blood pressure is high."
    3.  **Test Your Coding Scheme**: Apply your qualitative coding scheme to these mock field notes. This allows you to refine your codes and observational protocol *before* collecting real data.
    4.  **Triangulate**: Practice linking the coded qualitative themes back to the quantitative archetypes to ensure your mixed-methods analysis plan is sound.
