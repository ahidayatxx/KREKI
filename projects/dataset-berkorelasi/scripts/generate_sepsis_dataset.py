#!/usr/bin/env python3
"""
Generate synthetic sepsis dataset with high correlation for SADR training.
Supports 3-class classification: No sepsis (0), Sepsis (1), Septic shock (2)
"""

import argparse
import csv
import random
import sys
from pathlib import Path

# Clinical ranges for sepsis classification based on SIRS/qSOFA criteria
SEPSIS_RANGES = {
    "No Sepsis": {
        "lactate": (0.5, 1.9),           # mmol/L
        "procalcitonin": (0.01, 0.49),   # ng/mL
        "white_blood_cells": (4.5, 11.0),  # 10^9/L
        "heart_rate": (60, 89),          # bpm
        "mean_arterial_pressure": (75, 110), # mmHg
        "respiratory_rate": (12, 19),    # breaths/min
        "temperature": (36.0, 37.7),     # °C
        "creatinine": (0.5, 1.1),        # mg/dL
        "platelet_count": (150, 450),    # 10^9/L
        "bilirubin": (0.2, 1.1)          # mg/dL
    },
    "Sepsis": {
        "lactate": (2.0, 3.9),           # mmol/L (elevated)
        "procalcitonin": (0.5, 4.9),     # ng/mL (elevated)
        "white_blood_cells": (2.0, 4.4), # 10^9/L (low) or (12.0, 20.0) (high)
        "heart_rate": (90, 120),         # bpm (tachycardia)
        "mean_arterial_pressure": (65, 74), # mmHg (slightly low)
        "respiratory_rate": (20, 29),    # breaths/min (tachypnea)
        "temperature": (37.8, 39.5),     # °C (fever) or (35.0, 36.0) (hypothermia)
        "creatinine": (1.2, 2.5),        # mg/dL (elevated)
        "platelet_count": (100, 149),    # 10^9/L (low)
        "bilirubin": (1.2, 3.0)          # mg/dL (elevated)
    },
    "Septic Shock": {
        "lactate": (4.0, 10.0),          # mmol/L (high)
        "procalcitonin": (5.0, 50.0),    # ng/mL (very high)
        "white_blood_cells": (1.0, 3.9), # 10^9/L (very low) or (20.0, 40.0) (very high)
        "heart_rate": (121, 160),        # bpm (severe tachycardia)
        "mean_arterial_pressure": (40, 64), # mmHg (hypotension)
        "respiratory_rate": (30, 45),    # breaths/min (severe tachypnea)
        "temperature": (39.6, 41.5),     # °C (high fever) or (34.0, 35.0) (severe hypothermia)
        "creatinine": (2.6, 6.0),        # mg/dL (high)
        "platelet_count": (20, 99),      # 10^9/L (very low)
        "bilirubin": (3.1, 8.0)          # mg/dL (high)
    }
}

# Mapping to numeric target
CLASS_MAPPING = {
    "No Sepsis": 0,
    "Sepsis": 1,
    "Septic Shock": 2
}

CLASS_NAMES = ["No Sepsis", "Sepsis", "Septic Shock"]


def generate_value(range_tuple, decimals=2):
    """Generate a random value within the given range."""
    low, high = range_tuple
    return round(random.uniform(low, high), decimals)


def generate_sepsis_dataset(samples, output_path=None):
    """
    Generate synthetic sepsis dataset with 3 classes.

    Args:
        samples: Total number of samples to generate
        output_path: Optional path to save CSV file
    """
    # Calculate samples per class (balanced)
    samples_per_class = samples // len(CLASS_NAMES)
    remainder = samples % len(CLASS_NAMES)

    data = []

    for i, class_name in enumerate(CLASS_NAMES):
        # Distribute remainder to first classes
        n = samples_per_class + (1 if i < remainder else 0)
        class_ranges = SEPSIS_RANGES[class_name]
        target_value = CLASS_MAPPING[class_name]

        for _ in range(n):
            row = {"id": len(data) + 1}

            # For Sepsis class, randomly choose between low WBC or high WBC
            if class_name == "Sepsis":
                wbc_range = random.choice([(2.0, 4.4), (12.0, 20.0)])
                temp_range = random.choice([(37.8, 39.5), (35.0, 36.0)])
            elif class_name == "Septic Shock":
                wbc_range = random.choice([(1.0, 3.9), (20.0, 40.0)])
                temp_range = random.choice([(39.6, 41.5), (34.0, 35.0)])
            else:
                wbc_range = class_ranges["white_blood_cells"]
                temp_range = class_ranges["temperature"]

            # Generate all variables
            row["lactate"] = generate_value(class_ranges["lactate"])
            row["procalcitonin"] = generate_value(class_ranges["procalcitonin"])
            row["white_blood_cells"] = generate_value(wbc_range)
            row["heart_rate"] = generate_value(class_ranges["heart_rate"], 0)
            row["mean_arterial_pressure"] = generate_value(class_ranges["mean_arterial_pressure"], 0)
            row["respiratory_rate"] = generate_value(class_ranges["respiratory_rate"], 0)
            row["temperature"] = generate_value(temp_range)
            row["creatinine"] = generate_value(class_ranges["creatinine"])
            row["platelet_count"] = generate_value(class_ranges["platelet_count"], 0)
            row["bilirubin"] = generate_value(class_ranges["bilirubin"])
            row["sepsis_status"] = target_value
            row["sepsis_class"] = class_name

            data.append(row)

    # Shuffle data
    random.shuffle(data)

    # Reassign IDs after shuffle
    for i, row in enumerate(data):
        row["id"] = i + 1

    # Define fieldnames
    variables = [
        "lactate", "procalcitonin", "white_blood_cells",
        "heart_rate", "mean_arterial_pressure", "respiratory_rate",
        "temperature", "creatinine", "platelet_count", "bilirubin"
    ]
    fieldnames = ["id"] + variables + ["sepsis_status", "sepsis_class"]

    # Output
    if output_path:
        with open(output_path, "w", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(data)
        print(f"✓ Dataset sepsis berhasil disimpan ke: {output_path}")
    else:
        writer = csv.DictWriter(sys.stdout, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(data)

    # Print summary
    print(f"\n{'='*60}")
    print(f"SEPSIS PREDICTION DATASET - SUMMARY")
    print(f"{'='*60}")
    print(f"Total samples: {samples}")
    print(f"\nClass distribution:")
    for class_name in CLASS_NAMES:
        count = sum(1 for row in data if row["sepsis_class"] == class_name)
        percentage = (count / samples) * 100
        print(f"  - {class_name} (code {CLASS_MAPPING[class_name]}): {count} samples ({percentage:.1f}%)")

    print(f"\nVariables (10 predictors):")
    for i, var in enumerate(variables, 1):
        print(f"  {i:2d}. {var}")

    print(f"\nTarget variable: sepsis_status")
    print(f"  - 0 = No Sepsis")
    print(f"  - 1 = Sepsis")
    print(f"  - 2 = Septic Shock")

    print(f"\nExpected correlations (|r| ≥ 0.75):")
    print(f"  - High lactate → sepsis")
    print(f"  - High procalcitonin → sepsis")
    print(f"  - Abnormal WBC → sepsis")
    print(f"  - High HR + Low MAP → septic shock")
    print(f"  - High RR → sepsis")
    print(f"  - Abnormal temp → sepsis")
    print(f"  - High creatinine → organ dysfunction")
    print(f"  - Low platelets → organ dysfunction")
    print(f"  - High bilirubin → organ dysfunction")

    print(f"\nClinical criteria (SIRS/qSOFA):")
    print(f"  - SIRS: ≥2 criteria abnormal → Sepsis")
    print(f"  - Septic Shock: Sepsis + hypotension (MAP < 65) + lactate ≥ 4")

    print(f"\n{'='*60}\n")

    return data


def main():
    parser = argparse.ArgumentParser(
        description="Generate synthetic sepsis dataset for SADR training/validation"
    )
    parser.add_argument(
        "--samples", "-n",
        type=int,
        default=100,
        help="Jumlah sampel (default: 100)"
    )
    parser.add_argument(
        "--output", "-o",
        required=True,
        help="Path file output CSV"
    )

    args = parser.parse_args()

    # Create output directory if needed
    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)

    generate_sepsis_dataset(args.samples, args.output)


if __name__ == "__main__":
    main()
