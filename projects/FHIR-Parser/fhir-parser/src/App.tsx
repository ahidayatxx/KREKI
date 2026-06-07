import { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { PatientDashboard } from './components/PatientDashboard';
import { ErrorBoundary } from './components/ErrorBoundary';
import { FHIRParser } from './services/fhirParser';
import type { ParsedFHIRData } from './types/fhir';

function App() {
  const [parsedData, setParsedData] = useState<ParsedFHIRData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileLoad = (fileContent: string) => {
    try {
      setError(null);
      const data = FHIRParser.parseBundle(fileContent);
      setParsedData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to parse FHIR data');
      setParsedData(null);
    }
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    setParsedData(null);
  };

  const handleReset = () => {
    setParsedData(null);
    setError(null);
  };

  return (
    <ErrorBoundary>
      <div className="App">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 m-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <h3 className="text-red-800 font-medium">Error</h3>
            </div>
            <p className="text-red-700 mt-1">{error}</p>
            <button
              onClick={() => setError(null)}
              className="mt-2 px-3 py-1 bg-red-100 text-red-800 rounded text-sm hover:bg-red-200 transition-colors"
            >
              Dismiss
            </button>
          </div>
        )}

        {!parsedData ? (
          <FileUpload onFileLoad={handleFileLoad} onError={handleError} />
        ) : (
          <PatientDashboard data={parsedData} onReset={handleReset} />
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;