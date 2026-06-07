# FHIR Patient Record Visualizer

A client-side web application that parses FHIR JSON files and displays patient data in a sophisticated, readable HTML format.

## Features

- 📁 **File Upload**: Drag-and-drop or click to upload FHIR JSON files
- 👤 **Patient Demographics**: Display name, age, gender, and address
- 🏥 **Medical Conditions**: List of patient's health conditions with status
- ⚠️ **Allergies**: Allergy information with criticality levels
- 💊 **Medications**: Current and past medications with dosage information
- 💉 **Immunizations**: Vaccination history with dates
- 🔬 **Procedures**: Medical procedures performed
- 📱 **Responsive Design**: Mobile-first responsive design
- 🔒 **Privacy-First**: All processing happens locally in your browser

## Tech Stack

- **React 19** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Zustand** for state management (if needed)
- **Vitest** for testing

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd fhir-parser
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment to any static hosting service.

## Usage

1. **Upload a FHIR JSON file**: Click the upload area or drag and drop a valid FHIR R4 JSON bundle file
2. **View patient data**: The application will parse the file and display the patient information in organized cards
3. **Reset/Upload new file**: Click "Upload New File" to clear the current data and load a different file

## FHIR Support

This application supports FHIR R4 bundles and extracts data from the following resource types:

- `Patient` - Demographics and basic information
- `Condition` - Health conditions and diagnoses
- `AllergyIntolerance` - Allergies and intolerances
- `MedicationRequest` - Prescribed medications
- `Immunization` - Vaccination records
- `Procedure` - Medical procedures

## Security & Privacy

- **Client-side only**: No data is sent to any server
- **No data storage**: Files are processed in memory only
- **Local processing**: All FHIR parsing happens in your browser
- **No tracking**: No analytics or tracking scripts

## Development

### Project Structure

```
src/
├── components/          # React components
│   ├── FileUpload.tsx   # File upload component
│   ├── PatientDashboard.tsx # Main dashboard view
│   ├── DataCard.tsx     # Reusable data display card
│   └── ErrorBoundary.tsx # Error handling
├── services/            # Business logic
│   └── fhirParser.ts    # FHIR parsing service
├── types/               # TypeScript type definitions
│   └── fhir.ts          # FHIR-related types
└── App.tsx              # Main application component
```

### Adding New Resource Types

To add support for additional FHIR resource types:

1. Add the TypeScript interface in `src/types/fhir.ts`
2. Add parsing logic in `src/services/fhirParser.ts`
3. Create a render function in `PatientDashboard.tsx`
4. Add a new `DataCard` to display the data

### Testing

Run the test suite:

```bash
npm run test
```

## Deployment

This application can be deployed to any static hosting service:

- **static.run** (as specified in the architecture)
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

Simply build the project and upload the `dist` directory contents.

## License

This project is licensed under the MIT License.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Support

For issues and questions, please create an issue in the repository.