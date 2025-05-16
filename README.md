# Project Risk Analyzer: AI-Powered Project Success

**Elevate your project management with intelligent risk prediction and proactive mitigation.**

Project Risk Analyzer is a cutting-edge web application designed to empower project managers and teams by leveraging the analytical power of Google Gemini AI. It provides an intuitive, data-driven platform for comprehensive risk identification, insightful visualization, strategic mitigation planning, and interactive conversational analysis.

---

## What Does It Do?

At its core, Project Risk Analyzer transforms raw project data into actionable risk intelligence:

-   **Intelligent Data Collection**: Gathers essential project parameters (name, description, industry, budget, timeline, team size, objectives, constraints) through a user-friendly, guided form.
-   **AI-Driven Risk Analysis**: Utilizes the Google Gemini API (with a fallback to mock data for demonstration and offline use) to generate a structured list of potential risks, each detailed with:
    -   Probability (Likelihood of occurrence)
    -   Impact (Severity if it occurs)
    -   Mitigation Strategies (Actionable steps to reduce risk)
-   **Interactive Risk Visualization**: Presents risks on a dynamic risk matrix (heatmap) for an at-a-glance understanding of the risk landscape, complemented by a detailed tabular view.
-   **Strategic Mitigation Grouping**: Organizes mitigation strategies by risk severity (Critical, High, Medium, Low), enabling focused action on the most pressing issues.
-   **Conversational Risk Assistant**: Offers an AI-powered chat interface, allowing users to ask natural language questions about their project's risk profile and receive contextualized answers.
-   **Insightful Summary & Reporting**: Generates key statistics (e.g., critical risk counts, average scores) and visual summaries (e.g., risk distribution charts).
-   **Seamless Sharing & Export**: Facilitates collaboration by allowing users to export risk assessments (e.g., as PDF) and share them via unique links.

---

## Target Audience

This tool is designed for:

-   **Project Managers**: Seeking to enhance risk management processes and improve project outcomes.
-   **Team Leads & Members**: Who need to understand and contribute to mitigating project risks.
-   **Stakeholders & Executives**: Requiring clear, concise overviews of project risk landscapes for informed decision-making.
-   **Consultants & Analysts**: Looking for efficient tools for client project risk assessments.
-   **Students & Educators**: In project management or related fields, for learning and applying risk analysis concepts.

---

## Key Differentiators

What sets Project Risk Analyzer apart:

-   **AI-Powered Insights**: Goes beyond manual checklists by using advanced AI (Google Gemini) for nuanced and context-aware risk identification.
-   **Interactive & Intuitive UI**: Simplifies complex risk data through clear visualizations and user-friendly interfaces, inspired by Vercel's design principles.
-   **Conversational Analysis**: Allows users to "talk" to their risk data, making complex analysis accessible to non-experts.
-   **End-to-End Workflow**: Covers the entire risk management cycle from data input to mitigation planning and reporting within a single platform.
-   **Developer-Friendly & Extensible**: Built with modern web technologies (Next.js, Tailwind CSS), offering a solid foundation for future enhancements and integrations.
-   **Focus on Determinism**: Prompts are engineered to ensure consistent risk outputs for consistent inputs, crucial for reliable analysis.

---

## Challenges

The development journey involved overcoming several key challenges:

1.  **API Integration & Reliability**:
    -   **Challenge**: Ensuring robust and secure communication with the Google Gemini API, handling potential rate limits, errors, and API key management (as seen in `gemini-client.js` and `settings/page.js`).
    -   **Solution**: Implemented secure API key handling (environment variables, localStorage, and cookies via `api/gemini/analyze-risks/route.js`), and a mock data generation (`generateMockRisks` in `gemini-client.js`) as a fallback.

2.  **Deterministic AI Outputs**:
    -   **Challenge**: LLMs can be non-deterministic. Achieving consistent risk identification for identical project inputs is crucial for a reliable analysis tool.
    -   **Solution**: Carefully engineered prompts in `api/gemini/analyze-risks/route.js` instruct the AI to be deterministic, use specific terminology, and maintain output structure.

3.  **User Experience for Complex Data**:
    -   **Challenge**: Presenting multifaceted risk data (probability, impact, mitigations) in an easily digestible and actionable format.
    -   **Solution**: Developed an interactive risk matrix (`RiskMatrix.js`), tabbed results interface (`risk-analysis/page.js`), and grouped mitigation views (`RiskMitigations.js`) for clarity.

4.  **Data Validation & Integrity**:
    -   **Challenge**: Ensuring the quality of input data from `RiskForm.js` and the structured integrity of AI-generated outputs.
    -   **Solution**: Implemented form validation and server-side validation of the AI's JSON response in `api/gemini/analyze-risks/route.js`.

5.  **State Management & Component Interaction**:
    -   **Challenge**: Managing application state (e.g., form data, analysis results, active tabs) effectively across various React components.
    -   **Solution**: Leveraged React hooks (`useState`, `useEffect`) for local component state and prop drilling for inter-component communication.

---

## System Vision

Our vision is for Project Risk Analyzer to be an indispensable co-pilot for project success, transforming risk management from a reactive chore into a proactive, strategic advantage. We aim to:

-   **Democratize Risk Analysis**: Make sophisticated risk assessment accessible to all project stakeholders, regardless of their expertise level, through intuitive interfaces and AI assistance.
-   **Foster a Risk-Aware Culture**: Embed risk thinking into the project lifecycle by seamlessly integrating with existing workflows and collaboration tools.
-   **Drive Continuous Improvement**: Evolve into a learning system that not only identifies risks but also predicts them with increasing accuracy by learning from a growing dataset of projects and outcomes.
-   **Become an Industry Standard**: Set a new benchmark for AI-driven project risk management, offering unparalleled insights and foresight.

---

## Enabling Technologies

The selection of technologies was driven by the need for a modern, performant, and developer-friendly stack:

1.  **Frontend Framework - Next.js (with App Router & React 19)**:
    -   **Why**: Enables server-side rendering for performance, static site generation where applicable, a robust component model with React, and simplified routing with the App Router. Facilitates features like API routes (`api/gemini/analyze-risks/route.js`).
2.  **Styling - Tailwind CSS**:
    -   **Why**: A utility-first CSS framework that allows for rapid UI development and easy customization, ensuring a consistent and modern look and feel (evident in `globals.css` and all components).
3.  **AI Integration - Google Gemini API**:
    -   **Why**: Provides powerful natural language processing and generation capabilities for risk identification and conversational analysis. The choice of `gemini-1.5-flash` suggests a balance between capability and speed/cost.
4.  **Client-Side State Management - React Hooks**:
    -   **Why**: `useState` and `useEffect` offer a simple yet powerful way to manage local component state and side effects without external libraries for this project's scale.
5.  **API Key Management**:
    -   **Why**: Securely handling API keys is paramount. The system supports environment variables (server-side) and localStorage/cookies (client-side, with server-side proxying) as seen in `settings/page.js` and `api/gemini/analyze-risks/route.js`.
6.  **Deployment - Vercel**:
    -   **Why**: Native support for Next.js applications, offering seamless deployment, CI/CD, and serverless functions for API routes.

---

## Mockup System (`generateMockRisks` in `gemini-client.js`)

The mockup system plays a crucial role:

-   **Development & Testing**: Allows frontend development and UI testing to proceed independently of live API availability or API key setup.
-   **Demonstration**: Enables showcasing the application's features and workflow even without an active internet connection or configured API key, crucial for presentations or trials.
-   **Fallback Mechanism**: Provides a graceful degradation of service if the Gemini API is temporarily unavailable or if a user hasn't configured their API key.
-   **Content Structure Reference**: The mock data defines the expected structure for risks, aiding in consistent data handling throughout the application.

---

## System Architecture

The application follows a modern client-server architecture, leveraging Next.js capabilities:

**High-Level Overview:**

```
Client (Browser) <----------------> Next.js Server <----------------> Google Gemini API
  - React Components                 - API Routes (Proxy)
  - UI Logic                         - Server-Side Logic (Future)
  - State Management
  - API Key (localStorage)
```

**Layers & Data Flow:**

1.  **Presentation Layer (Client-Side - `/src/components`, `/src/app/**/page.js`)**:
    -   **Responsibilities**: Renders the UI, handles user interactions, manages local state.
    -   **Key Components**: `RiskForm`, `RiskMatrix`, `RiskMitigations`, `ChatInterface`, `Header`, `Footer`.
    -   **Data Flow**: User inputs project details into `RiskForm.js`. This data is then sent to the backend API route. Results are received and displayed in various components.

2.  **Application Layer (Client-Side & Server-Side API Route)**:
    -   **Client-Side (`/src/utils/gemini-client.js`)**: Prepares API requests, handles API key retrieval from localStorage (if applicable), and processes responses or falls back to mock data.
    -   **Server-Side (`/src/app/api/gemini/analyze-risks/route.js`)**:
        -   Acts as a secure proxy to the Google Gemini API.
        -   Retrieves API key from environment variables or cookies (preferred for security).
        -   Constructs the detailed prompt for the Gemini API.
        -   Sends the request to Gemini and parses its response.
        -   Performs validation and formatting of the risk data before sending it back to the client.

3.  **External Service Layer (Google Gemini API)**:
    -   **Responsibilities**: Performs the core AI-driven risk analysis based on the provided prompt and project data.

**Data Storage & State:**

-   **Project Data & Risks**: Primarily transient, held in React component state during a user session (`analysisResults` in `risk-analysis/page.js`).
-   **API Key**: Stored in browser localStorage (`settings/page.js`) for client-side convenience or via environment variables for server-side calls. Cookies are used to make the client-stored key accessible to server-side API routes.
-   **Chat History**: Stored in component state within `ChatInterface.js`.

---

## User Interface Overview

The user journey is designed to be intuitive and progressive:

1.  **Home Page (`/src/app/page.js`)**:
    -   **Purpose**: Introduces the application, highlights key features, and provides a call-to-action to start analysis or configure settings.
    -   **Key Elements**: Hero section, feature cards, links to "Risk Analysis" and "Settings". Includes a promo video modal.

2.  **Settings Page (`/src/app/settings/page.js`)**:
    -   **Purpose**: Allows users to configure their Google Gemini API key.
    -   **Key Elements**: Input field for API key, save button, test connection button. Detects if an environment variable is used.

3.  **Risk Analysis Page (`/src/app/risk-analysis/page.js`)**:
    -   **Step 1: Project Input (`RiskForm.js`)**:
        -   Users input project details (name, industry, budget, etc.) or select a sample project template.
        -   Submission triggers the risk analysis process.
    -   **Step 2: Results Display (Tabbed Interface)**: Once analysis is complete, results are shown in a multi-tab view:
        -   **Risk Matrix Tab (`RiskMatrix.js`)**:
            -   Visualizes risks on a probability/impact grid.
            -   Color-coded cells for severity.
            -   Clickable markers for risk details.
            -   Accompanied by a sortable table of all identified risks.
        -   **Mitigations Tab (`RiskMitigations.js`)**:
            -   Lists risks grouped by severity (Critical, High, Medium, Low).
            -   Clearly displays mitigation strategies for each risk.
            -   Includes a section on general risk management best practices.
        -   **Summary Tab**:
            -   Presents key metrics (e.g., number of critical risks, average risk score).
            -   Shows a risk distribution bar chart.
            -   Provides options to "Export PDF" and "Share" the assessment.
        -   **Conversational Risk Assistant Tab (`ChatInterface.js`)**:
            -   A chat window where users can ask questions about their specific risk assessment (e.g., "What are my top 3 critical risks?", "Suggest alternative mitigations for schedule delays.").
            -   The AI uses the current risk data as context for its answers.

4.  **Integrations Page (`/src/app/integrations/page.js`)**:
    -   **Purpose**: Showcases upcoming integrations with popular project management tools.
    -   **Key Elements**: Cards for each integration (Jira, Trello, etc.) with descriptions and features. Option to join a waitlist.

5.  **Pricing Page (`/src/app/pricing/page.js`)**:
    -   **Purpose**: Details available subscription plans.
    -   **Key Elements**: Pricing tiers, feature comparison table, FAQ section.

---

## Technical Details

-   **Risk Analysis Core Logic (`/src/app/api/gemini/analyze-risks/route.js`)**:
    -   The Next.js API route constructs a detailed prompt for the Gemini API, including project data and instructions for the desired output format (JSON array of risk objects).
    -   It emphasizes determinism, specific field names (`title`, `probability`, `impact`, `mitigation`), and ranking.
    -   The response from Gemini is parsed (extracting the JSON array from potentially verbose text) and validated.
-   **Mock Risk Generation (`/src/utils/gemini-client.js` - `generateMockRisks`)**:
    -   Provides a static set of base risks and industry-specific risks.
    -   Includes logic to add project-specific risks based on keywords in the project description, offering a degree of dynamic mock data.
-   **Risk Scoring & Categorization**:
    -   Implicitly, risk severity is calculated as `probability * impact`.
    -   This score is used in `RiskMatrix.js` for placement and color-coding, and in `RiskMitigations.js` and the Summary tab for grouping and statistics. Thresholds (e.g., score > 15 for Critical) are defined in these components.
-   **API Key Security**:
    -   Client-side API keys entered in settings are stored in `localStorage`.
    -   For API calls, these keys are ideally proxied through the Next.js backend (`/api/gemini/analyze-risks/route.js`) where a server-side environment variable `GEMINI_API_KEY` is the most secure option. The route also checks for a cookie if the key was set client-side, allowing the backend to use it.
-   **Styling & UI Components (`globals.css`, Tailwind config, individual components)**:
    -   Utilizes Tailwind CSS for a utility-first approach.
    -   Custom Vercel-inspired styles are defined in `globals.css` for components like `.vercel-card`, `.vercel-button-primary`, etc., ensuring a consistent and polished look.
    -   Dark mode is supported via CSS variables and `[data-theme="dark"]` selectors.

---

## Future Enhancements

Building on the current foundation, future development could focus on:

1.  **Advanced AI & Machine Learning**:
    -   **Custom AI Model**: Train a domain-specific model fine-tuned on project risk data for enhanced accuracy, explainability, and potentially offline capabilities.
    -   **Predictive Trending**: Analyze historical project data (if stored) to predict risk trends for new projects.
    -   **Automated Mitigation Suggestions**: Offer more diverse and contextually rich mitigation strategies based on a larger knowledge base.

2.  **Collaboration & Workflow**:
    -   **User Authentication & Accounts**: Allow users to save projects and risk assessments.
    -   **Team Workspaces**: Enable multiple users to collaborate on risk assessments.
    -   **Version History**: Track changes to risk assessments over time.
    -   **Notifications & Alerts**: Proactively notify users of newly identified risks or changes in risk status.

3.  **Deeper Integrations (as outlined in `/src/app/integrations/page.js`)**:
    -   **Bi-directional Sync**: Full synchronization with tools like Jira, Trello, Asana, MS Project.
    -   **In-Tool Risk Dashboards**: Embed risk views directly within integrated PM tools.

4.  **Enhanced Reporting & Analytics**:
    -   **Customizable Dashboards**: Allow users to create personalized views of risk data.
    -   **Export Formats**: Support for Excel, CSV, and more sophisticated PDF layouts.
    -   **Benchmarking**: Compare project risk profiles against industry averages or organizational benchmarks (requires data aggregation).

5.  **Mobile Accessibility**:
    -   **Responsive Design Improvements**: Further optimize for smaller screens.
    -   **Dedicated Mobile App (PWA or Native)**: For on-the-go risk management.

6.  **Gamification & Learning**:
    -   **Risk Management Tutorials**: Interactive guides within the app.
    -   **Scenario Simulators**: Allow users to test the impact of different decisions on project risk.

---

## Getting Started

### Prerequisites

-   Node.js (v18 or higher recommended, v16 minimum)
-   npm or yarn
-   Google Gemini API key (obtain from [Google AI Studio](https://aistudio.google.com/app/apikey))

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd project-risk-analyzer # Or your project directory name
    ```

2.  Install dependencies:
    ```bash
    npm install
    # or
    # yarn install
    ```

3.  Configure your Gemini API key:
    -   **Recommended (Server-Side Security)**:
        Create a `.env.local` file in the project root and add your API key:
        ```env
        GEMINI_API_KEY=YOUR_GEMINI_API_KEY
        # For client-side features that might need it (though backend proxy is safer)
        NEXT_PUBLIC_GEMINI_API_KEY=YOUR_GEMINI_API_KEY
        ```
    -   **Alternative (Client-Side Configuration)**:
        Run the app and navigate to the "Settings" page (usually linked from the homepage or header) to enter and save your API key in the browser's localStorage.

4.  Run the development server:
    ```bash
    npm run dev
    # or
    # yarn dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Usage Workflow

1.  **Navigate** to the application, typically starting at the Home Page.
2.  **(Optional but Recommended)** Go to the **Settings** page to configure your Gemini API Key if not using environment variables.
3.  Go to the **Risk Analysis** page.
4.  **Fill in Project Details** using the `RiskForm` or select a sample project template.
5.  Click **"Analyze Risks"**. The application will call the backend API, which in turn queries the Gemini API (or uses mock data).
6.  **Explore Results**:
    -   View the **Risk Matrix** for a visual overview.
    -   Check the **Mitigations** tab for detailed strategies.
    -   Review the **Summary** tab for key statistics and export/share options.
    -   Interact with the **Conversational Risk Assistant** to ask specific questions about your risks.
7.  **Export or Share** your assessment as needed from the Summary tab.

---

## Project Structure

A brief overview of the key directories within `/src`:

-   `/src/app` - Core of the Next.js application using the App Router.
    -   `/api` - Backend API routes (e.g., `/api/gemini/analyze-risks`).
    -   `/(pages)` - Different pages of the application (e.g., `page.js` for home, `risk-analysis/page.js`).
    -   `layout.js` - Root layout for the application.
    -   `globals.css` - Global styles and Tailwind CSS configuration.
-   `/src/components` - Reusable React UI components used across various pages (e.g., `RiskForm.js`, `RiskMatrix.js`, `Header.js`, `Footer.js`).
-   `/src/utils` - Utility functions, including the Gemini API client logic (`gemini-client.js`).
-   `/public` - Static assets like images, videos (`animation.mp4`, `promo.mp4`).

---

## License

This project is an educational tool and is licensed under the MIT License. See the LICENSE file for details.