# Project Risk Analyzer

Project Risk Analyzer is a web application that leverages Google Gemini AI to help project managers and teams identify, visualize, and mitigate project risks. The tool provides an interactive, data-driven UI for risk assessment, mitigation planning, and conversational analysis.

---

## What Does It Do?

- **Collects project details** (name, description, industry, budget, timeline, team size, objectives, constraints) via a guided form.
- **Analyzes risks** using Google Gemini API (or mock data for demo), returning a structured list of risks with probability, impact, and mitigation strategies.
- **Visualizes risks** on an interactive risk matrix (heatmap) and in tabular form.
- **Groups and displays mitigation strategies** by risk severity.
- **Provides a conversational assistant** for Q&A about the risk profile.
- **Generates summary statistics and visualizations** (distribution, averages, severity counts).
- **Allows exporting and sharing** the risk assessment summary.

---

## Future Directions

While the current version uses the Google Gemini API for risk analysis, we are planning several major enhancements:

- **Custom AI Model:**  
  Develop and train a domain-specific risk analysis model, allowing for more tailored, explainable, and offline-capable risk assessments.

- **Full-featured Backend:**  
  Implement a robust backend for user authentication, persistent storage of projects and risk assessments, team collaboration, and audit trails.

- **Mobile Application:**  
  Build a mobile app (iOS/Android) for on-the-go risk analysis, notifications, and project updates.

- **Project Management Platform Integration:**  
  Offer plugins or integrations for popular project management tools (e.g., Jira, Asana, Trello, MS Project), enabling seamless risk analysis within existing workflows.

- **Advanced Reporting and Analytics:**  
  Add customizable dashboards, export formats, and benchmarking against industry/project type datasets.

If you are interested in contributing or collaborating on these directions, please reach out!

---

## User Interface Overview

### 1. Home Page

- **API Key Configuration:**  
  - Configure your Gemini API key via environment variable or browser localStorage.
  - Test connection and save securely.
- **Quick Start:**  
  - "Start Analysis" button leads to the risk analysis workflow.
- **Feature Highlights:**  
  - Cards summarize the main features: risk identification, visualization, mitigation, and conversational assistant.

### 2. Risk Analysis Workflow

- **Project Details Form:**  
  - Enter project information or use sample templates for quick setup.
  - Fields include project name, industry, budget, timeline, team size, objectives, and constraints.
  - On submission, triggers AI-powered risk analysis.

- **Tabbed Results Interface:**  
  - **Risk Matrix:**  
    - Interactive 4x4 grid visualizing risks by probability and impact.
    - Clickable risk markers show details and mitigation strategies.
    - Legend explains severity color coding.
    - Table lists all risks with scores and severity.
  - **Mitigations:**  
    - Risks grouped by severity (Critical, High, Medium, Low).
    - Each group shows risks and their mitigation strategies in styled cards.
    - Best practices for risk management are listed.
  - **Summary:**  
    - Key metrics: critical/high risk counts, average score, total risks.
    - Risk distribution bar visualizes severity breakdown.
    - Export as PDF or shareable link.
  - **Conversational Risk Assistant:**  
    - Chat interface to ask questions about your risks.
    - AI provides tailored answers using your risk data.

---

## Technical Details

- **Frontend:**  
  - Built with Next.js (App Router, React 19).
  - Tailwind CSS for styling, with custom Vercel-inspired components.
  - All UI logic is in `/src/app` and `/src/components`.
  - State management is local (React hooks).

- **Risk Analysis Logic:**  
  - `/src/utils/gemini-client.js` handles API key management and calls to Gemini.
  - If API fails or is missing, mock risk data is generated for demo purposes.
  - `/src/app/api/gemini/analyze-risks/route.js` is a Next.js API route that proxies requests to Gemini, ensuring API key security.

- **Risk Matrix & Mitigation:**  
  - `/src/components/RiskMatrix.js` renders the interactive matrix and risk table.
  - `/src/components/RiskMitigations.js` groups and displays mitigation strategies.

- **Conversational Assistant:**  
  - `/src/components/ChatInterface.js` provides a chat UI, sending user questions and risk data to Gemini for contextual answers.

- **Export & Sharing:**  
  - Summary tab allows exporting the risk report as a printable PDF (browser print dialog).
  - Share modal generates a link with encoded risk data for sharing.

- **API Key Security:**  
  - Supports both environment variable and in-app (localStorage) API key storage.
  - API key is never exposed to third parties.

---

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Google Gemini API key (get from [Google AI Studio](https://aistudio.google.com/app/apikey))

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure your Gemini API key:
   - **Recommended:**  
     Create `.env.local` and set `GEMINI_API_KEY` and `NEXT_PUBLIC_GEMINI_API_KEY`
   - **Or:**  
     Enter your API key in the app's configuration panel on the homepage

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Usage Workflow

1. Go to the Risk Analysis page.
2. Fill in project details or use a sample template.
3. Click "Analyze Risks" to generate your risk profile.
4. Explore results in the Matrix, Mitigations, Summary, and Chat tabs.
5. Export or share your assessment as needed.

---

## Project Structure

- `/src/app` - Next.js app directory (pages, API routes, layout)
- `/src/components` - UI components (form, matrix, mitigations, chat)
- `/src/utils` - Utility functions (Gemini API client)
- `/public` - Static assets (if any)
- `/postcss.config.mjs`, `/tailwind.config.js` - Styling configuration

---

## License

Educational project under MIT License.