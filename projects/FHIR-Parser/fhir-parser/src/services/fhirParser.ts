import type { 
  FHIRBundle, 
  FHIRResource, 
  PatientData, 
  ConditionData, 
  AllergyData, 
  MedicationData, 
  ImmunizationData, 
  ProcedureData, 
  ParsedFHIRData 
} from '../types/fhir';

export class FHIRParser {
  static parseBundle(jsonContent: string): ParsedFHIRData {
    try {
      const bundle: FHIRBundle = JSON.parse(jsonContent);
      
      if (!bundle || bundle.resourceType !== 'Bundle') {
        throw new Error('Invalid FHIR Bundle format');
      }

      const resources = bundle.entry?.map(entry => entry.resource) || [];
      
      return {
        patient: this.parsePatient(resources),
        conditions: this.parseConditions(resources),
        allergies: this.parseAllergies(resources),
        medications: this.parseMedications(resources),
        immunizations: this.parseImmunizations(resources),
        procedures: this.parseProcedures(resources)
      };
    } catch (error) {
      throw new Error(`Failed to parse FHIR data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private static parsePatient(resources: FHIRResource[]): PatientData | null {
    const patientResource = resources.find(r => r.resourceType === 'Patient');
    
    if (!patientResource) {
      return null;
    }

    const name = this.extractName(patientResource.name);
    const birthDate = patientResource.birthDate || '';
    const age = this.calculateAge(birthDate);
    const gender = patientResource.gender || 'Unknown';
    const address = this.extractAddress(patientResource.address);

    return {
      id: patientResource.id || 'unknown',
      name,
      dateOfBirth: birthDate,
      age,
      gender: gender.charAt(0).toUpperCase() + gender.slice(1),
      address
    };
  }

  private static parseConditions(resources: FHIRResource[]): ConditionData[] {
    return resources
      .filter(r => r.resourceType === 'Condition')
      .map(condition => ({
        id: condition.id || 'unknown',
        code: condition.code?.coding?.[0]?.code || 'unknown',
        display: condition.code?.coding?.[0]?.display || condition.code?.text || 'Unknown condition',
        clinicalStatus: condition.clinicalStatus?.coding?.[0]?.code,
        verificationStatus: condition.verificationStatus?.coding?.[0]?.code,
        onsetDateTime: condition.onsetDateTime
      }));
  }

  private static parseAllergies(resources: FHIRResource[]): AllergyData[] {
    return resources
      .filter(r => r.resourceType === 'AllergyIntolerance')
      .map(allergy => ({
        id: allergy.id || 'unknown',
        code: allergy.code?.coding?.[0]?.code || 'unknown',
        display: allergy.code?.coding?.[0]?.display || allergy.code?.text || 'Unknown allergy',
        clinicalStatus: allergy.clinicalStatus?.coding?.[0]?.code,
        verificationStatus: allergy.verificationStatus?.coding?.[0]?.code,
        criticality: allergy.criticality,
        type: allergy.type
      }));
  }

  private static parseMedications(resources: FHIRResource[]): MedicationData[] {
    return resources
      .filter(r => r.resourceType === 'MedicationRequest')
      .map(medication => ({
        id: medication.id || 'unknown',
        medicationCodeableConcept: medication.medicationCodeableConcept,
        status: medication.status || 'unknown',
        intent: medication.intent || 'unknown',
        authoredOn: medication.authoredOn,
        dosageInstruction: medication.dosageInstruction
      }));
  }

  private static parseImmunizations(resources: FHIRResource[]): ImmunizationData[] {
    return resources
      .filter(r => r.resourceType === 'Immunization')
      .map(immunization => ({
        id: immunization.id || 'unknown',
        vaccineCode: immunization.vaccineCode || { text: 'Unknown vaccine' },
        status: immunization.status || 'unknown',
        occurrenceDateTime: immunization.occurrenceDateTime,
        primarySource: immunization.primarySource
      }));
  }

  private static parseProcedures(resources: FHIRResource[]): ProcedureData[] {
    return resources
      .filter(r => r.resourceType === 'Procedure')
      .map(procedure => ({
        id: procedure.id || 'unknown',
        code: procedure.code || { text: 'Unknown procedure' },
        status: procedure.status || 'unknown',
        performedDateTime: procedure.performedDateTime,
        performedPeriod: procedure.performedPeriod
      }));
  }

  private static extractName(names: any[]): string {
    if (!names || names.length === 0) {
      return 'Unknown Patient';
    }

    const name = names[0];
    const given = name.given?.join(' ') || '';
    const family = name.family || '';
    
    return `${given} ${family}`.trim() || 'Unknown Patient';
  }

  private static extractAddress(addresses: any[]): string | undefined {
    if (!addresses || addresses.length === 0) {
      return undefined;
    }

    const address = addresses[0];
    const parts = [
      ...(address.line || []),
      address.city,
      address.state,
      address.postalCode,
      address.country
    ].filter(Boolean);

    return parts.length > 0 ? parts.join(', ') : undefined;
  }

  private static calculateAge(birthDate: string): number {
    if (!birthDate) return 0;
    
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return Math.max(0, age);
  }
}