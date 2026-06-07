export interface PatientData {
  id: string;
  name: string;
  dateOfBirth: string;
  age: number;
  gender: string;
  address?: string;
}

export interface ConditionData {
  id: string;
  code: string;
  display: string;
  clinicalStatus?: string;
  verificationStatus?: string;
  onsetDateTime?: string;
}

export interface AllergyData {
  id: string;
  code: string;
  display: string;
  clinicalStatus?: string;
  verificationStatus?: string;
  criticality?: string;
  type?: string;
}

export interface MedicationData {
  id: string;
  medicationCodeableConcept?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
    text?: string;
  };
  status: string;
  intent: string;
  authoredOn?: string;
  dosageInstruction?: Array<{
    text?: string;
    timing?: any;
    doseAndRate?: any;
  }>;
}

export interface ImmunizationData {
  id: string;
  vaccineCode: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
    text?: string;
  };
  status: string;
  occurrenceDateTime?: string;
  primarySource?: boolean;
}

export interface ProcedureData {
  id: string;
  code: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
    text?: string;
  };
  status: string;
  performedDateTime?: string;
  performedPeriod?: {
    start?: string;
    end?: string;
  };
}

export interface FHIRBundle {
  resourceType: 'Bundle';
  id?: string;
  type: string;
  entry?: Array<{
    fullUrl?: string;
    resource: FHIRResource;
  }>;
}

export interface FHIRResource {
  resourceType: string;
  id?: string;
  [key: string]: any;
}

export interface ParsedFHIRData {
  patient: PatientData | null;
  conditions: ConditionData[];
  allergies: AllergyData[];
  medications: MedicationData[];
  immunizations: ImmunizationData[];
  procedures: ProcedureData[];
}