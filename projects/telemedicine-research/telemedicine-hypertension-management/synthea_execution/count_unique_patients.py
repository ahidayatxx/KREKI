
import pandas as pd

file_path = "output/hypertension_pilot_study/csv/patient_bp_time_series.csv"
df = pd.read_csv(file_path)

unique_patients = df['PATIENT'].nunique()

print(f"Number of unique patients in {file_path}: {unique_patients}")
