import pandas as pd

# Load the datasets
patients = pd.read_csv("output/hypertension_pilot_study/csv/patients.csv")
observations = pd.read_csv("output/hypertension_pilot_study/csv/observations.csv")
medications = pd.read_csv("output/hypertension_pilot_study/csv/medications.csv")
encounters = pd.read_csv("output/hypertension_pilot_study/csv/encounters.csv")
conditions = pd.read_csv("output/hypertension_pilot_study/csv/conditions.csv")

# Identify hypertension patients from conditions.csv
hypertension_code = '59621000' # SNOMED-CT code for Hypertension

# Debugging: Print unique codes in conditions.csv
print(f"Unique codes in conditions.csv: {conditions['CODE'].unique()}")

# Ensure CODE column is string type for robust comparison
conditions['CODE'] = conditions['CODE'].astype(str)

hypertension_patient_ids = conditions[conditions['CODE'] == hypertension_code]['PATIENT'].unique()
print(f"Found {len(hypertension_patient_ids)} hypertension patients.")

# Create a list to hold event data
events = []

# Process observations (blood pressure checks)
bp_observations = observations[observations['CODE'].isin(['8480-6', '8462-4'])].copy()
bp_observations['START'] = pd.to_datetime(bp_observations['DATE'])
for index, row in bp_observations.iterrows():
    events.append({
        "PATIENT": row["PATIENT"],
        "START": row["START"],
        "EVENT_TYPE": "BP_CHECK"
    })
print(f"Extracted {len(bp_observations)} BP check events.")

# Process medications (assuming each new prescription is a 'refill' event for simplicity)
medications['START'] = pd.to_datetime(medications['START'])
for index, row in medications.iterrows():
    events.append({
        "PATIENT": row["PATIENT"],
        "START": row["START"],
        "EVENT_TYPE": "MED_REFILL"
    })
print(f"Extracted {len(medications)} medication refill events.")

# Process encounters (as telemedicine visits)
encounters['START'] = pd.to_datetime(encounters['START'])
for index, row in encounters.iterrows():
    events.append({
        "PATIENT": row["PATIENT"],
        "START": row["START"],
        "EVENT_TYPE": "TELEMED_VISIT"
    })
print(f"Extracted {len(encounters)} telemedicine visit events.")

# Create a DataFrame from the events list
events_df = pd.DataFrame(events)
print(f"Total events before filtering: {len(events_df)}.")

# Filter events to only include our hypertension cohort
events_df = events_df[events_df['PATIENT'].isin(hypertension_patient_ids)]
print(f"Total events after filtering for hypertension patients: {len(events_df)}.")

# Sort by patient and then by date to create sequences
events_df = events_df.sort_values(by=['PATIENT', 'START'])

# Save the processed data to a new CSV file
events_df.to_csv("output/hypertension_pilot_study/csv/patient_event_sequences.csv", index=False)

print("Successfully created the patient event sequence file.")