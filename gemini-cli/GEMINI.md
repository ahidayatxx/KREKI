111# Project Overview

This workspace, `claude-code`, is now organized into two main directories:

*   `projects/`: Contains all the individual projects.
*   `archive/`: Contains miscellaneous files and previous project artifacts.

This structure provides a cleaner and more organized environment for working with the various projects.

## Key Projects

Here's a breakdown of the main projects, now located in the `projects` directory:

### 1. FHIR Parser (`/projects/FHIR-Parser`)

*   **Purpose**: A full-stack application designed to parse, visualize, and manage FHIR (Fast Healthcare Interoperability Resources) data.
*   **Technology Stack**:
    *   **Frontend**: React with TypeScript
    *   **Styling**: Tailwind CSS
    *   **Build Tool**: Vite
*   **Key Files**:
    *   `projects/FHIR-Parser/fhir-parser/`: The main project directory.
    *   `projects/FHIR-Parser/FHIR Parser Fullstack Architecture Document.md`: Provides a detailed overview of the technical architecture.
    *   `projects/FHIR-Parser/FHIR Parser Product Requirements Document .md`: Outlines the product's features and requirements.
*   **How to Run**:
    1.  Navigate to the `projects/FHIR-Parser/fhir-parser` directory.
    2.  Run `npm install` to install dependencies.
    3.  Run `npm run dev` to start the development server.

### 2. Emergency Room (ER) Real-Time Dashboard (`/projects/ER-Dashboard`)

*   **Purpose**: A real-time dashboard for monitoring Emergency Room operations, focusing on time metrics and capacity management.
*   **Technology Stack**:
    *   **Frontend**: React.js
    *   **Backend**: FastAPI (Python)
    *   **Database**: PostgreSQL with TimescaleDB
*   **Key Files**:
    *   `projects/ER-Dashboard/ER-PRD.md`: The Product Requirements Document for the ER dashboard.
    *   `projects/ER-Dashboard/igd_case_*.json`: Sample JSON data for various ER scenarios.
    *   `projects/ER-Dashboard/igd_time_metrics_extractor.py`: A Python script for extracting time metrics from the data.
*   **How to Run**:
    *   The project is not fully self-contained. The frontend and backend would need to be run separately.
    *   To run the Python script: `python projects/ER-Dashboard/igd_time_metrics_extractor.py`

### 3. Chatbot UI (Archived)

*   **Purpose**: A simple, modern UI for a chatbot that connects to an n8n webhook. This project is now located in the `archive` directory.
*   **Technology Stack**:
    *   **Frontend**: HTML, CSS, JavaScript (no frameworks)
    *   **Backend**: n8n (external)
*   **Key Files**:
    *   `archive/chatbot-ui.html`: The main UI file.
    *   `archive/Chatbot_UI_Instructions.md`: Detailed instructions on how to set up and use the chatbot UI.
*   **How to Run**:
    1.  Open `archive/chatbot-ui.html` in a web browser.
    2.  Configure the n8n webhook URL in the UI.

### 4. Other Projects

The following projects are also located in the `projects` directory:

*   **`AI-Decision-Support`**: Contains HTML files related to an AI-based decision support system for ER patient admission.
*   **`SLB-Autis-Alamanda-Website`**: A simple website project with HTML, CSS, and JavaScript.
*   **`Percobaan-Website`**: Another simple website project.
*   **`n8n-workflows`**: Contains n8n workflow files.
*   **`Context7`**: Contains a Dockerfile.

## Development Conventions

*   Each project has its own set of conventions. Refer to the specific project's documentation and source code for details.
*   The `claude.py` script, now in the `archive` directory, was a utility for setting up the environment for the Claude CLI.