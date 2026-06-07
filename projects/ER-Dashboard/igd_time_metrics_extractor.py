#!/usr/bin/env python3
"""
IGD Time Metrics Extractor
Script untuk mengekstrak metrik waktu pelayanan IGD dari file JSON FHIR
Penulis: Ahmad Hidayat
Tanggal: 2025-01-22
"""

import json
import os
import pandas as pd
from datetime import datetime
from pathlib import Path
import argparse
import sys

class IGDTimeMetricsExtractor:
    def __init__(self, folder_path):
        self.folder_path = Path(folder_path)
        self.cases = []
        self.metrics = []
        
    def calculate_minutes_difference(self, start_time, end_time):
        """Menghitung selisih waktu dalam menit"""
        try:
            start = datetime.fromisoformat(start_time.replace('Z', '+00:00'))
            end = datetime.fromisoformat(end_time.replace('Z', '+00:00'))
            return round((end - start).total_seconds() / 60)
        except:
            return None
    
    def format_time(self, minutes):
        """Format menit menjadi jam dan menit"""
        if minutes is None:
            return None
        hours = minutes // 60
        mins = minutes % 60
        return f"{hours}h {mins}m" if hours > 0 else f"{mins}m"
    
    def extract_patient_info(self, bundle):
        """Ekstrak informasi pasien dari bundle FHIR"""
        patient_info = {}
        
        for entry in bundle.get('entry', []):
            resource = entry.get('resource', {})
            resource_type = resource.get('resourceType')
            
            if resource_type == 'Patient':
                patient_info['patient_id'] = resource.get('id')
                names = resource.get('name', [{}])
                if names:
                    patient_info['patient_name'] = names[0].get('text', 'Unknown')
                patient_info['gender'] = resource.get('gender', 'Unknown')
                
                # Hitung umur dari birthDate
                birth_date = resource.get('birthDate')
                if birth_date:
                    birth_year = int(birth_date.split('-')[0])
                    current_year = datetime.now().year
                    patient_info['age'] = current_year - birth_year
                    
        return patient_info
    
    def extract_encounter_info(self, bundle):
        """Ekstrak informasi encounter dari bundle FHIR"""
        encounter_info = {}
        
        for entry in bundle.get('entry', []):
            resource = entry.get('resource', {})
            resource_type = resource.get('resourceType')
            
            if resource_type == 'Encounter':
                encounter_info['encounter_id'] = resource.get('id')
                encounter_info['status'] = resource.get('status')
                
                period = resource.get('period', {})
                encounter_info['arrival_time'] = period.get('start')
                encounter_info['discharge_time'] = period.get('end')
                
                # Lokasi
                locations = resource.get('location', [])
                if locations:
                    encounter_info['location'] = locations[0].get('location', {}).get('display', 'Unknown')
                
                # Dokter
                participants = resource.get('participant', [])
                for participant in participants:
                    if participant.get('individual'):
                        encounter_info['doctor'] = participant['individual'].get('display', 'Unknown')
                        break
                        
                # Disposisi
                hospitalization = resource.get('hospitalization', {})
                discharge_disp = hospitalization.get('dischargeDisposition', {})
                coding = discharge_disp.get('coding', [])
                if coding:
                    encounter_info['disposition'] = coding[0].get('code', 'unknown')
                    
        return encounter_info
    
    def extract_observations(self, bundle):
        """Ekstrak observasi (triase, vital signs, dll)"""
        observations = {}
        
        for entry in bundle.get('entry', []):
            resource = entry.get('resource', {})
            resource_type = resource.get('resourceType')
            
            if resource_type == 'Observation':
                code = resource.get('code', {})
                coding = code.get('coding', [])
                effective_time = resource.get('effectiveDateTime')
                
                for code_item in coding:
                    code_value = code_item.get('code')
                    
                    # Triase
                    if code_value == '75910-0':  # Canadian triage scale
                        value_concept = resource.get('valueCodeableConcept', {})
                        value_coding = value_concept.get('coding', [])
                        if value_coding:
                            display = value_coding[0].get('display', '0')
                            observations['triage_level'] = int(display) if display.isdigit() else 0
                            observations['triage_time'] = effective_time
                    
                    # Tanda vital
                    elif code_value in ['8310-5', '8867-4', '8480-6', '8462-4', '2708-6', '9279-1']:
                        if 'first_vitals_time' not in observations or effective_time < observations['first_vitals_time']:
                            observations['first_vitals_time'] = effective_time
                    
                    # Pain score
                    elif code_value == '1172399009':
                        observations['pain_assessment_time'] = effective_time
                        
        return observations
    
    def extract_conditions(self, bundle):
        """Ekstrak kondisi/diagnosis"""
        conditions = {}
        
        for entry in bundle.get('entry', []):
            resource = entry.get('resource', {})
            resource_type = resource.get('resourceType')
            
            if resource_type == 'Condition':
                category = resource.get('category', [])
                code = resource.get('code', {})
                coding = code.get('coding', [])
                
                for cat in category:
                    cat_coding = cat.get('coding', [])
                    for cat_item in cat_coding:
                        if cat_item.get('code') == 'chief-complaint':
                            if coding:
                                conditions['chief_complaint'] = coding[0].get('display', 'Unknown')
                        elif cat_item.get('code') == 'encounter-diagnosis':
                            if coding:
                                conditions['diagnosis'] = coding[0].get('display', 'Unknown')
                                
        return conditions
    
    def extract_medications(self, bundle):
        """Ekstrak informasi medikasi"""
        medications = {}
        earliest_med_time = None
        
        for entry in bundle.get('entry', []):
            resource = entry.get('resource', {})
            resource_type = resource.get('resourceType')
            
            if resource_type == 'MedicationRequest':
                authored_on = resource.get('authoredOn')
                if authored_on:
                    if earliest_med_time is None or authored_on < earliest_med_time:
                        earliest_med_time = authored_on
                        
        medications['first_medication_time'] = earliest_med_time
        return medications
    
    def extract_procedures_services(self, bundle):
        """Ekstrak prosedur dan service request"""
        procedures = {}
        
        for entry in bundle.get('entry', []):
            resource = entry.get('resource', {})
            resource_type = resource.get('resourceType')
            
            if resource_type == 'ServiceRequest':
                category = resource.get('category', [])
                authored_on = resource.get('authoredOn')
                
                for cat in category:
                    coding = cat.get('coding', [])
                    for code_item in coding:
                        code_value = code_item.get('code')
                        
                        # Lab
                        if code_value == '108252007':
                            if 'lab_order_time' not in procedures or authored_on < procedures['lab_order_time']:
                                procedures['lab_order_time'] = authored_on
                        
                        # Imaging
                        elif code_value in ['363679005', '386053000']:
                            service_code = resource.get('code', {})
                            service_coding = service_code.get('coding', [])
                            for service_item in service_coding:
                                service_code_value = service_item.get('code')
                                
                                # X-ray
                                if 'x-ray' in service_item.get('display', '').lower():
                                    procedures['xray_order_time'] = authored_on
                                
                                # ECG
                                elif service_code_value == '11524-6':
                                    procedures['ecg_order_time'] = authored_on
            
            elif resource_type == 'Procedure':
                performed_period = resource.get('performedPeriod', {})
                start_time = performed_period.get('start')
                end_time = performed_period.get('end')
                
                if start_time:
                    procedures['procedure_start_time'] = start_time
                if end_time:
                    procedures['procedure_end_time'] = end_time
                    
        return procedures
    
    def process_single_file(self, file_path):
        """Proses satu file JSON"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            # Ekstrak semua komponen
            patient_info = self.extract_patient_info(data)
            encounter_info = self.extract_encounter_info(data)
            observations = self.extract_observations(data)
            conditions = self.extract_conditions(data)
            medications = self.extract_medications(data)
            procedures = self.extract_procedures_services(data)
            
            # Gabungkan semua informasi
            case_data = {
                'file_name': file_path.name,
                'bundle_id': data.get('id', 'unknown'),
                'timestamp': data.get('timestamp'),
                **patient_info,
                **encounter_info,
                **observations,
                **conditions,
                **medications,
                **procedures
            }
            
            return case_data
            
        except Exception as e:
            print(f"Error processing {file_path}: {str(e)}")
            return None
    
    def calculate_metrics(self, case_data):
        """Hitung metrik waktu untuk satu kasus"""
        if not case_data or not case_data.get('arrival_time') or not case_data.get('discharge_time'):
            return None
        
        arrival_time = case_data['arrival_time']
        discharge_time = case_data['discharge_time']
        
        metrics = {
            'case_file': case_data['file_name'],
            'patient_name': case_data.get('patient_name', 'Unknown'),
            'age': case_data.get('age'),
            'gender': case_data.get('gender', 'Unknown'),
            'triage_level': case_data.get('triage_level'),
            'chief_complaint': case_data.get('chief_complaint', 'Unknown'),
            'diagnosis': case_data.get('diagnosis', case_data.get('chief_complaint', 'Unknown')),
            'location': case_data.get('location', 'Unknown'),
            'doctor': case_data.get('doctor', 'Unknown'),
            'disposition': case_data.get('disposition', 'unknown'),
            
            # Time metrics
            'total_los_minutes': self.calculate_minutes_difference(arrival_time, discharge_time),
            'arrival_to_triage_minutes': self.calculate_minutes_difference(arrival_time, case_data.get('triage_time')) if case_data.get('triage_time') else None,
            'arrival_to_vitals_minutes': self.calculate_minutes_difference(arrival_time, case_data.get('first_vitals_time')) if case_data.get('first_vitals_time') else None,
            'arrival_to_medication_minutes': self.calculate_minutes_difference(arrival_time, case_data.get('first_medication_time')) if case_data.get('first_medication_time') else None,
            'arrival_to_lab_minutes': self.calculate_minutes_difference(arrival_time, case_data.get('lab_order_time')) if case_data.get('lab_order_time') else None,
            'arrival_to_xray_minutes': self.calculate_minutes_difference(arrival_time, case_data.get('xray_order_time')) if case_data.get('xray_order_time') else None,
            'arrival_to_ecg_minutes': self.calculate_minutes_difference(arrival_time, case_data.get('ecg_order_time')) if case_data.get('ecg_order_time') else None,
            'arrival_to_procedure_minutes': self.calculate_minutes_difference(arrival_time, case_data.get('procedure_start_time')) if case_data.get('procedure_start_time') else None,
            'procedure_duration_minutes': self.calculate_minutes_difference(case_data.get('procedure_start_time'), case_data.get('procedure_end_time')) if case_data.get('procedure_start_time') and case_data.get('procedure_end_time') else None,
        }
        
        # Add formatted times
        metrics['total_los_formatted'] = self.format_time(metrics['total_los_minutes'])
        
        return metrics
    
    def process_folder(self):
        """Proses semua file JSON dalam folder"""
        json_files = list(self.folder_path.glob('*.json'))
        
        if not json_files:
            print(f"Tidak ada file JSON ditemukan di folder: {self.folder_path}")
            return
        
        print(f"Ditemukan {len(json_files)} file JSON")
        print("Memproses file...")
        
        for file_path in sorted(json_files):
            print(f"  - Memproses: {file_path.name}")
            case_data = self.process_single_file(file_path)
            
            if case_data:
                metrics = self.calculate_metrics(case_data)
                if metrics:
                    self.metrics.append(metrics)
                    self.cases.append(case_data)
        
        print(f"Berhasil memproses {len(self.metrics)} kasus")
    
    def generate_summary_stats(self):
        """Generate statistik ringkasan"""
        if not self.metrics:
            return {}
        
        df = pd.DataFrame(self.metrics)
        
        # Filter data yang valid
        los_data = df['total_los_minutes'].dropna()
        triage_data = df['arrival_to_triage_minutes'].dropna()
        vitals_data = df['arrival_to_vitals_minutes'].dropna()
        medication_data = df['arrival_to_medication_minutes'].dropna()
        
        stats = {
            'total_cases': len(self.metrics),
            'los_stats': {
                'mean': round(los_data.mean()) if not los_data.empty else 0,
                'median': round(los_data.median()) if not los_data.empty else 0,
                'min': round(los_data.min()) if not los_data.empty else 0,
                'max': round(los_data.max()) if not los_data.empty else 0,
            },
            'triage_stats': {
                'mean': round(triage_data.mean()) if not triage_data.empty else 0,
                'compliance_5min': (triage_data <= 5).sum() if not triage_data.empty else 0,
                'compliance_rate': f"{((triage_data <= 5).sum() / len(triage_data) * 100):.1f}%" if not triage_data.empty else "0%"
            },
            'vitals_stats': {
                'mean': round(vitals_data.mean()) if not vitals_data.empty else 0,
                'coverage': f"{len(vitals_data)}/{len(self.metrics)} ({len(vitals_data)/len(self.metrics)*100:.1f}%)"
            },
            'medication_stats': {
                'mean': round(medication_data.mean()) if not medication_data.empty else 0,
                'coverage': f"{len(medication_data)}/{len(self.metrics)} ({len(medication_data)/len(self.metrics)*100:.1f}%)"
            },
            'triage_distribution': df['triage_level'].value_counts().to_dict() if 'triage_level' in df.columns else {},
            'disposition_distribution': df['disposition'].value_counts().to_dict() if 'disposition' in df.columns else {}
        }
        
        return stats
    
    def export_to_excel(self, output_file='igd_time_metrics.xlsx'):
        """Export hasil ke Excel"""
        if not self.metrics:
            print("Tidak ada data untuk diekspor")
            return
        
        df = pd.DataFrame(self.metrics)
        stats = self.generate_summary_stats()
        
        with pd.ExcelWriter(output_file, engine='openpyxl') as writer:
            # Sheet 1: Raw Data
            df.to_excel(writer, sheet_name='Raw Data', index=False)
            
            # Sheet 2: Summary Statistics
            summary_data = []
            summary_data.append(['RINGKASAN STATISTIK IGD', ''])
            summary_data.append(['Total Kasus', stats['total_cases']])
            summary_data.append(['', ''])
            
            summary_data.append(['LENGTH OF STAY (LOS)', ''])
            summary_data.append(['Rata-rata (menit)', stats['los_stats']['mean']])
            summary_data.append(['Median (menit)', stats['los_stats']['median']])
            summary_data.append(['Minimum (menit)', stats['los_stats']['min']])
            summary_data.append(['Maksimum (menit)', stats['los_stats']['max']])
            summary_data.append(['', ''])
            
            summary_data.append(['TRIASE', ''])
            summary_data.append(['Rata-rata waktu (menit)', stats['triage_stats']['mean']])
            summary_data.append(['Kepatuhan ≤5 menit', stats['triage_stats']['compliance_rate']])
            summary_data.append(['', ''])
            
            summary_data.append(['TANDA VITAL', ''])
            summary_data.append(['Rata-rata waktu (menit)', stats['vitals_stats']['mean']])
            summary_data.append(['Cakupan', stats['vitals_stats']['coverage']])
            summary_data.append(['', ''])
            
            summary_data.append(['MEDIKASI', ''])
            summary_data.append(['Rata-rata waktu (menit)', stats['medication_stats']['mean']])
            summary_data.append(['Cakupan', stats['medication_stats']['coverage']])
            
            summary_df = pd.DataFrame(summary_data, columns=['Metrik', 'Nilai'])
            summary_df.to_excel(writer, sheet_name='Summary', index=False)
            
        print(f"Data berhasil diekspor ke: {output_file}")
    
    def export_to_csv(self, output_file='igd_time_metrics.csv'):
        """Export hasil ke CSV"""
        if not self.metrics:
            print("Tidak ada data untuk diekspor")
            return
        
        df = pd.DataFrame(self.metrics)
        df.to_csv(output_file, index=False, encoding='utf-8')
        print(f"Data berhasil diekspor ke: {output_file}")
    
    def print_summary(self):
        """Print ringkasan hasil"""
        if not self.metrics:
            print("Tidak ada data untuk ditampilkan")
            return
        
        stats = self.generate_summary_stats()
        
        print("\n" + "="*60)
        print("RINGKASAN METRIK WAKTU IGD")
        print("="*60)
        
        print(f"\nTotal Kasus: {stats['total_cases']}")
        
        print(f"\nLENGTH OF STAY (LOS):")
        print(f"  Rata-rata: {self.format_time(stats['los_stats']['mean'])}")
        print(f"  Median: {self.format_time(stats['los_stats']['median'])}")
        print(f"  Rentang: {self.format_time(stats['los_stats']['min'])} - {self.format_time(stats['los_stats']['max'])}")
        
        print(f"\nTRIASE:")
        print(f"  Rata-rata waktu: {stats['triage_stats']['mean']} menit")
        print(f"  Kepatuhan ≤5 menit: {stats['triage_stats']['compliance_rate']}")
        
        print(f"\nTANDA VITAL:")
        print(f"  Rata-rata waktu: {stats['vitals_stats']['mean']} menit")
        print(f"  Cakupan: {stats['vitals_stats']['coverage']}")
        
        print(f"\nMEDIKASI:")
        print(f"  Rata-rata waktu: {stats['medication_stats']['mean']} menit")
        print(f"  Cakupan: {stats['medication_stats']['coverage']}")
        
        if stats['triage_distribution']:
            print(f"\nDISTRIBUSI TRIASE:")
            for level, count in sorted(stats['triage_distribution'].items()):
                print(f"  Level {level}: {count} kasus")
        
        print("\nDETAIL PER KASUS:")
        print("-" * 80)
        for i, metric in enumerate(self.metrics, 1):
            print(f"{i}. {metric['patient_name']} ({metric.get('age', '?')}yo {metric.get('gender', '?')})")
            print(f"   Keluhan: {metric['chief_complaint']}")
            print(f"   Triase: Level {metric.get('triage_level', '?')}")
            print(f"   LOS: {metric['total_los_formatted']}")
            if metric.get('arrival_to_medication_minutes'):
                print(f"   Waktu ke obat: {metric['arrival_to_medication_minutes']} menit")
            print()

def main():
    parser = argparse.ArgumentParser(description='IGD Time Metrics Extractor')
    parser.add_argument('folder_path', help='Path ke folder yang berisi file JSON IGD')
    parser.add_argument('--output', '-o', default='igd_metrics', help='Nama file output (tanpa ekstensi)')
    parser.add_argument('--format', '-f', choices=['excel', 'csv', 'both'], default='both', help='Format output')
    parser.add_argument('--no-summary', action='store_true', help='Jangan tampilkan ringkasan di console')
    
    args = parser.parse_args()
    
    # Validasi folder path
    if not os.path.exists(args.folder_path):
        print(f"Error: Folder {args.folder_path} tidak ditemukan!")
        sys.exit(1)
    
    # Buat extractor dan proses data
    extractor = IGDTimeMetricsExtractor(args.folder_path)
    extractor.process_folder()
    
    if not extractor.metrics:
        print("Tidak ada data yang berhasil diekstrak!")
        sys.exit(1)
    
    # Export data
    if args.format in ['excel', 'both']:
        extractor.export_to_excel(f"{args.output}.xlsx")
    
    if args.format in ['csv', 'both']:
        extractor.export_to_csv(f"{args.output}.csv")
    
    # Tampilkan ringkasan
    if not args.no_summary:
        extractor.print_summary()

if __name__ == "__main__":
    main()