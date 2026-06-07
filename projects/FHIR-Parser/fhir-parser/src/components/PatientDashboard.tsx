import React from 'react';
import type { ParsedFHIRData, ConditionData, AllergyData, MedicationData, ImmunizationData, ProcedureData } from '../types/fhir';
import { DataCard } from './DataCard';

interface PatientDashboardProps {
  data: ParsedFHIRData;
  onReset: () => void;
}

export const PatientDashboard: React.FC<PatientDashboardProps> = ({ data, onReset }) => {
  const { patient, conditions, allergies, medications, immunizations, procedures } = data;

  const renderCondition = (condition: ConditionData) => (
    <div>
      <h4 className="font-medium text-gray-900">{condition.display}</h4>
      <div className="text-sm text-gray-600 mt-1">
        {condition.clinicalStatus && (
          <span className={`inline-block px-2 py-1 rounded-full text-xs mr-2 ${
            condition.clinicalStatus === 'active' 
              ? 'bg-red-100 text-red-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {condition.clinicalStatus}
          </span>
        )}
        {condition.onsetDateTime && (
          <span className="text-gray-500">
            Onset: {new Date(condition.onsetDateTime).toLocaleDateString()}
          </span>
        )}
      </div>
    </div>
  );

  const renderAllergy = (allergy: AllergyData) => (
    <div>
      <h4 className="font-medium text-gray-900">{allergy.display}</h4>
      <div className="text-sm text-gray-600 mt-1">
        {allergy.criticality && (
          <span className={`inline-block px-2 py-1 rounded-full text-xs mr-2 ${
            allergy.criticality === 'high' 
              ? 'bg-red-100 text-red-800'
              : allergy.criticality === 'low'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-gray-100 text-gray-800'
          }`}>
            {allergy.criticality} criticality
          </span>
        )}
        {allergy.type && (
          <span className="text-gray-500 capitalize">Type: {allergy.type}</span>
        )}
      </div>
    </div>
  );

  const renderMedication = (medication: MedicationData) => {
    const medicationName = medication.medicationCodeableConcept?.coding?.[0]?.display || 
                          medication.medicationCodeableConcept?.text || 
                          'Unknown medication';
    
    return (
      <div>
        <h4 className="font-medium text-gray-900">{medicationName}</h4>
        <div className="text-sm text-gray-600 mt-1">
          <span className={`inline-block px-2 py-1 rounded-full text-xs mr-2 ${
            medication.status === 'active' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {medication.status}
          </span>
          {medication.authoredOn && (
            <span className="text-gray-500">
              Prescribed: {new Date(medication.authoredOn).toLocaleDateString()}
            </span>
          )}
        </div>
        {medication.dosageInstruction?.[0]?.text && (
          <p className="text-sm text-gray-600 mt-2">{medication.dosageInstruction[0].text}</p>
        )}
      </div>
    );
  };

  const renderImmunization = (immunization: ImmunizationData) => {
    const vaccineName = immunization.vaccineCode.coding?.[0]?.display || 
                       immunization.vaccineCode.text || 
                       'Unknown vaccine';
    
    return (
      <div>
        <h4 className="font-medium text-gray-900">{vaccineName}</h4>
        <div className="text-sm text-gray-600 mt-1">
          <span className={`inline-block px-2 py-1 rounded-full text-xs mr-2 ${
            immunization.status === 'completed' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {immunization.status}
          </span>
          {immunization.occurrenceDateTime && (
            <span className="text-gray-500">
              Date: {new Date(immunization.occurrenceDateTime).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
    );
  };

  const renderProcedure = (procedure: ProcedureData) => {
    const procedureName = procedure.code.coding?.[0]?.display || 
                         procedure.code.text || 
                         'Unknown procedure';
    
    return (
      <div>
        <h4 className="font-medium text-gray-900">{procedureName}</h4>
        <div className="text-sm text-gray-600 mt-1">
          <span className={`inline-block px-2 py-1 rounded-full text-xs mr-2 ${
            procedure.status === 'completed' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {procedure.status}
          </span>
          {procedure.performedDateTime && (
            <span className="text-gray-500">
              Date: {new Date(procedure.performedDateTime).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
    );
  };

  // Icons for each section
  const HeartIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );

  const ExclamationIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
    </svg>
  );

  const PillIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  );

  const ShieldIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );

  const ClipboardIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Patient Record</h1>
              <p className="text-gray-600">FHIR Data Visualization</p>
            </div>
            <button
              onClick={onReset}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Upload New File
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Patient Header */}
        {patient && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{patient.name}</h2>
                <div className="mt-2 text-gray-600">
                  <p>
                    <span className="font-medium">Date of Birth:</span> {patient.dateOfBirth} ({patient.age} years old)
                  </p>
                  <p>
                    <span className="font-medium">Gender:</span> {patient.gender}
                  </p>
                  {patient.address && (
                    <p>
                      <span className="font-medium">Address:</span> {patient.address}
                    </p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Patient ID</div>
                <div className="font-mono text-sm text-gray-900">{patient.id}</div>
              </div>
            </div>
          </div>
        )}

        {/* Data Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DataCard
            title="Conditions"
            data={conditions}
            renderItem={renderCondition}
            icon={<HeartIcon />}
            emptyMessage="No conditions reported"
          />
          
          <DataCard
            title="Allergies"
            data={allergies}
            renderItem={renderAllergy}
            icon={<ExclamationIcon />}
            emptyMessage="No allergies reported"
          />
          
          <DataCard
            title="Medications"
            data={medications}
            renderItem={renderMedication}
            icon={<PillIcon />}
            emptyMessage="No medications reported"
          />
          
          <DataCard
            title="Immunizations"
            data={immunizations}
            renderItem={renderImmunization}
            icon={<ShieldIcon />}
            emptyMessage="No immunizations reported"
          />
          
          <div className="lg:col-span-2">
            <DataCard
              title="Procedures"
              data={procedures}
              renderItem={renderProcedure}
              icon={<ClipboardIcon />}
              emptyMessage="No procedures reported"
            />
          </div>
        </div>
      </div>
    </div>
  );
};