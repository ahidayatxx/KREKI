import pandas as pd

# Load the observations dataset
observations = pd.read_csv("output/hypertension_pilot_study/csv/observations.csv")

# Filter for blood pressure readings (systolic and diastolic LOINC codes)
systolic_bp_code = '8480-6'
diastolic_bp_code = '8462-4'

bp_observations = observations[observations['CODE'].isin([systolic_bp_code, diastolic_bp_code])].copy()

# Convert DATE to datetime objects
bp_observations['DATE'] = pd.to_datetime(bp_observations['DATE'])

# Pivot the table to have systolic and diastolic as separate columns
bp_pivot = bp_observations.pivot_table(
    index=['PATIENT', 'DATE'],
    columns='CODE',
    values='VALUE'
).reset_index()

bp_pivot.rename(columns={
    systolic_bp_code: 'SYSTOLIC_BP',
    diastolic_bp_code: 'DIASTOLIC_BP'
}, inplace=True)

# Sort by patient and date
bp_pivot = bp_pivot.sort_values(by=['PATIENT', 'DATE'])

print("--- Debugging bp_pivot DataFrame ---")
print(bp_pivot.head())
print(f"Number of unique patients in bp_pivot: {bp_pivot['PATIENT'].nunique()}")
print("-------------------------------------")

# Resample to daily frequency for each patient and forward-fill missing values
def resample_patient_bp(df_group):
    # df_group here is a DataFrame for a single patient, grouped by PATIENT
    patient_id = df_group['PATIENT'].iloc[0]
    
    print(f"\n--- Debugging resample_patient_bp for patient: {patient_id} ---")
    print(f"Original group size: {len(df_group)}")
    
    # Set DATE as index for resampling, and select only numeric BP columns
    df_resampled = df_group.set_index('DATE')[['SYSTOLIC_BP', 'DIASTOLIC_BP']]
    
    # Resample to daily mean, then forward-fill missing values
    df_resampled = df_resampled.resample('D').mean().ffill()
    
    print(f"Resampled group size: {len(df_resampled)}")
    
    # Add the patient ID back as a column
    df_resampled['PATIENT'] = patient_id
    
    return df_resampled.reset_index()

bp_time_series = bp_pivot.groupby('PATIENT').apply(resample_patient_bp)

# Drop the extra index level created by groupby().apply()
bp_time_series = bp_time_series.reset_index(drop=True)

# Reorder columns to have PATIENT first
bp_time_series = bp_time_series[['PATIENT', 'DATE', 'SYSTOLIC_BP', 'DIASTOLIC_BP']]

# Save the processed time series data to a new CSV file
bp_time_series.to_csv("output/hypertension_pilot_study/csv/patient_bp_time_series.csv", index=False)

print("Successfully created the patient blood pressure time series file.")
