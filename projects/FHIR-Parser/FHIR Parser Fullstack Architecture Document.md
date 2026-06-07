# FHIR Patient Record Visualizer - Fullstack Architecture Document

### **1. Introduction**

This document outlines the complete fullstack architecture for the **FHIR Patient Record Visualizer**, including backend systems, frontend implementation, and their integration. It serves as the single source of truth for AI-driven development.

* **Starter Template or Existing Project:** N/A - This will be a Greenfield project.

### **2. High Level Architecture**

* **Technical Summary:** The system will be a serverless, single-page application (SPA) built on a modern JavaScript/TypeScript stack. The architecture prioritizes performance and ease of deployment by leveraging a static hosting platform.
* **Platform and Infrastructure Choice:** The application will be hosted on **static.run** via manual web UI upload.
* **Repository Structure:** A single repository (Polyrepo) will be used as the project is a self-contained frontend application.
* **Architectural Patterns:** Jamstack, Component-Based UI, and Client-Side Rendering (CSR) will be the core patterns.

### **3. Tech Stack**

| Category | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Language** | TypeScript | `~5.4.5` | Primary development language |
| **Framework**| React | `~18.3.1`| UI library for the user interface |
| **Build Tool**| Vite | `~5.3.1` | Frontend tooling and development server |
| **Styling** | Tailwind CSS | `~3.4.4` | Utility-first CSS framework |
| **State Mngmt** | Zustand | `~4.5.2` | Minimalist state management |
| **Routing** | React Router | `~6.23.1`| Client-side routing library |
| **Testing** | Vitest & React Testing Library | `~1.6.0` / `~16.0.0` | Unit and integration testing |
| **Deployment**| static.run | N/A | Hosting and deployment platform |

### **4. Data Models**

TypeScript interfaces will be used to ensure type safety for the parsed FHIR data.

* **PatientData:** Represents the patient's core demographic info.
* **ConditionData:** Represents a patient's health conditions.
* **AllergyData:** Represents a patient's allergies.
* **MedicationData:** Represents a prescribed medication.
* **ImmunizationData:** Represents a patient's immunization history.
* **ProcedureData:** Represents a medical procedure.

### **5. API Specification**

A RESTful API using the OpenAPI 3.0 standard is defined for any future backend development.

### **6. Components**

* **`App`:** The root component managing the overall application state.
* **`FileUpload`:** Handles file selection and loading.
* **`PatientDashboard`:** The main view for displaying all patient data.
* **`DataCard`:** A reusable component for displaying lists of data (e.g., Conditions, Allergies).

### **7. Source Tree**

A standard React/Vite project structure will be used, with folders for components, hooks, services, and styles.

### **8. Infrastructure and Deployment**

* **Strategy:** A manual deployment process will be used.
* **Platform:** The application will be hosted on **static.run** via web UI upload.
* **Rollback:** Rollbacks will be managed by re-uploading a previous stable version from Git.

### **9. Coding Standards**

* **Type Safety:** TypeScript's `any` type should be avoided.
* **Component Structure:** Components should be small and reusable.
* **Styling:** All styling must be done using Tailwind CSS.
* **State Management:** Zustand should be used for shared state.