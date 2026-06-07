import React, { useCallback, useState } from 'react';

interface FileUploadProps {
  onFileLoad: (fileContent: string) => void;
  onError: (error: string) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileLoad, onError }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileRead = useCallback((file: File) => {
    if (!file.type.includes('json') && !file.name.endsWith('.json')) {
      onError('Please select a valid JSON file');
      return;
    }

    setIsLoading(true);
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        if (!content) {
          onError('Failed to read file content');
          return;
        }
        
        // Validate JSON format
        JSON.parse(content);
        onFileLoad(content);
      } catch (error) {
        onError('Invalid JSON file format');
      } finally {
        setIsLoading(false);
      }
    };

    reader.onerror = () => {
      onError('Error reading file');
      setIsLoading(false);
    };

    reader.readAsText(file);
  }, [onFileLoad, onError]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileRead(file);
    }
  }, [handleFileRead]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileRead(file);
    }
  }, [handleFileRead]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <div className="max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          FHIR Patient Record Visualizer
        </h1>
        <p className="text-gray-600 mb-8">
          Upload a FHIR JSON file to visualize patient data in a readable format
        </p>
        
        <div
          className={`
            relative border-2 border-dashed rounded-lg p-8 transition-colors cursor-pointer
            ${isDragOver 
              ? 'border-primary bg-blue-50' 
              : 'border-gray-300 hover:border-primary hover:bg-gray-50'
            }
            ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept=".json"
            onChange={handleFileSelect}
            disabled={isLoading}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          />
          
          <div className="text-center">
            {isLoading ? (
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
                <p className="text-gray-600">Processing file...</p>
              </div>
            ) : (
              <>
                <svg
                  className="mx-auto h-12 w-12 text-gray-400 mb-4"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="text-lg font-medium text-gray-900 mb-2">
                  Drop your FHIR JSON file here
                </p>
                <p className="text-gray-500 mb-4">
                  or click to browse files
                </p>
                <p className="text-sm text-gray-400">
                  Supports .json files up to 5MB
                </p>
              </>
            )}
          </div>
        </div>
        
        <p className="text-xs text-gray-500 mt-4">
          Your data is processed locally and never leaves your browser
        </p>
      </div>
    </div>
  );
};