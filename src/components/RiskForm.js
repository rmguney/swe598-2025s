"use client";

import { useState } from "react";
import { analyzeRisks } from "../utils/gemini-client";

export default function RiskForm({ onAnalysisComplete }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    projectName: "",
    projectDescription: "",
    industry: "",
    budget: "",
    timeline: "",
    teamSize: "",
    objectives: "",
    constraints: ""
  });

  // Sample project templates for quick selection
  const sampleProjects = [
    {
      name: "E-commerce Platform Migration",
      description: "Migrate our existing e-commerce platform to a cloud-based solution with enhanced features and improved scalability. The project involves data migration, integrating with payment gateways, and minimal downtime requirements.",
      industry: "technology",
      budget: "150000",
      timeline: "6",
      teamSize: "8",
      objectives: "Improve site performance by 40%\nIncrease mobile conversion rates\nReduce maintenance costs\nImprove security compliance",
      constraints: "Must maintain 99.9% uptime during transition\nLimited budget for third-party tools\nMust complete before holiday shopping season"
    },
    {
      name: "Hospital Management System Implementation",
      description: "Deploy a comprehensive hospital management system that integrates patient records, billing, pharmacy, and staff scheduling. The system must comply with healthcare regulations and ensure patient data privacy.",
      industry: "healthcare",
      budget: "300000",
      timeline: "10",
      teamSize: "12",
      objectives: "Digitize all patient records\nStreamline billing processes\nImprove appointment scheduling efficiency\nEnsure HIPAA compliance",
      constraints: "Minimal disruption to hospital operations\nStrict data security requirements\nIntegration with existing laboratory systems"
    },
    {
      name: "Office Tower Construction",
      description: "Construct a 15-story office building in the downtown business district, including parking facilities, sustainable design elements, and smart building technology.",
      industry: "construction",
      budget: "12000000",
      timeline: "24",
      teamSize: "45",
      objectives: "Achieve LEED Gold certification\nComplete construction on schedule\nDeliver within budget\nIncorporate energy-efficient systems",
      constraints: "Downtown zoning restrictions\nLimited construction hours due to noise ordinances\nSupply chain challenges for specialized materials"
    },
    {
      name: "Financial Trading Platform Upgrade",
      description: "Upgrade our trading platform to support high-frequency trading with improved risk management features and regulatory compliance reporting.",
      industry: "finance",
      budget: "500000",
      timeline: "8",
      teamSize: "15",
      objectives: "Reduce transaction processing time by 50%\nImplement advanced risk analytics\nEnsure compliance with new financial regulations\nImprove system reliability",
      constraints: "Zero downtime during market hours\nStrict regulatory requirements\nLegacy system integration challenges"
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const risks = await analyzeRisks(formData);
      onAnalysisComplete(risks);
    } catch (error) {
      console.error("Error analyzing risks:", error);
      alert("Failed to analyze risks. Please check your API key and try again.");
    } finally {
      setLoading(false);
    }
  };

  const applyProjectTemplate = (template) => {
    setFormData({
      projectName: template.name || "",
      projectDescription: template.description || "",
      industry: template.industry || "",
      budget: template.budget || "",
      timeline: template.timeline || "",
      teamSize: template.teamSize || "",
      objectives: template.objectives || "",
      constraints: template.constraints || ""
    });
  };

  return (
    <div className="vercel-card relative overflow-hidden w-full">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="relative w-full">
        <div className="flex items-center mb-4">
          <div className="mr-3 p-2 bg-blue-100/20 dark:bg-blue-900/20 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-blue-600 dark:text-blue-400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
              <path d="M12 16v-4"></path>
              <path d="M12 8h.01"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold tracking-tight vercel-gradient-text">Project Risk Analysis</h2>
        </div>
        
        <p className="mb-4 opacity-70 text-sm">
          Enter your project details below to generate a comprehensive risk assessment using AI.
        </p>
        
        {/* Sample projects section */}
        <div className="mb-6 bg-[var(--secondary)]/30 p-3 rounded-lg border border-[var(--border)]/50">
          <h3 className="text-sm font-medium mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
            Sample Projects - Click to fill form:
          </h3>
          <div className="flex flex-wrap gap-2">
            {sampleProjects.map((project, index) => (
              <button 
                key={index}
                onClick={() => applyProjectTemplate(project)}
                className="text-sm bg-[var(--secondary)] hover:bg-[var(--secondary)]/80 px-3 py-1.5 rounded-md border border-[var(--border)] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <div className={`w-2 h-2 rounded-full ${
                  project.industry === 'technology' ? 'bg-blue-500' :
                  project.industry === 'healthcare' ? 'bg-green-500' :
                  project.industry === 'finance' ? 'bg-purple-500' :
                  project.industry === 'construction' ? 'bg-orange-500' : 'bg-gray-500'
                }`}></div>
                {project.name}
              </button>
            ))}
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="bg-[var(--secondary)]/50 p-4 rounded-lg">
                <h3 className="text-md font-medium mb-3 flex items-center">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-500/20 text-blue-500 text-xs font-bold mr-2">1</span>
                  Project Basics
                </h3>
              
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm mb-1 opacity-80 font-medium">Project Name</label>
                    <input
                      type="text"
                      name="projectName"
                      value={formData.projectName}
                      onChange={handleChange}
                      className="vercel-input"
                      required
                      placeholder="Enter project name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm mb-1 opacity-80 font-medium">Industry</label>
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      className="vercel-input"
                      required
                    >
                      <option value="">Select industry</option>
                      <option value="technology">Technology</option>
                      <option value="finance">Finance</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="construction">Construction</option>
                      <option value="education">Education</option>
                      <option value="retail">Retail</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="bg-[var(--secondary)]/50 p-4 rounded-lg">
                <h3 className="text-md font-medium mb-3 flex items-center">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-500/20 text-green-500 text-xs font-bold mr-2">2</span>
                  Resources
                </h3>
              
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm mb-1 opacity-80 font-medium">Budget ($)</label>
                    <input
                      type="number"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="vercel-input"
                      required
                      placeholder="e.g., 50000"
                    />
                  </div>
                  
                  <div className="gap-3">
                    <div>
                      <label className="block text-sm mb-1 opacity-80 font-medium">Timeline (months)</label>
                      <input
                        type="number"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        className="vercel-input"
                        required
                        placeholder="e.g., 6"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm mb-1 opacity-80 font-medium">Team Size</label>
                      <input
                        type="number"
                        name="teamSize"
                        value={formData.teamSize}
                        onChange={handleChange}
                        className="vercel-input"
                        required
                        placeholder="e.g., 5"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-[var(--secondary)]/50 p-4 rounded-lg">
                <h3 className="text-md font-medium mb-3 flex items-center">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-purple-500/20 text-purple-500 text-xs font-bold mr-2">3</span>
                  Project Details
                </h3>
                
                <div>
                  <label className="block text-sm mb-1 opacity-80 font-medium">Project Description</label>
                  <textarea
                    name="projectDescription"
                    value={formData.projectDescription}
                    onChange={handleChange}
                    className="vercel-input h-24"
                    required
                    placeholder="Describe your project in detail..."
                  />
                </div>
              </div>
              
              <div className="bg-[var(--secondary)]/50 p-4 rounded-lg">
                <h3 className="text-md font-medium mb-3 flex items-center">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-orange-500/20 text-orange-500 text-xs font-bold mr-2">4</span>
                  Objectives &amp; Constraints
                </h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm mb-1 opacity-80 font-medium">Key Objectives</label>
                    <textarea
                      name="objectives"
                      value={formData.objectives}
                      onChange={handleChange}
                      className="vercel-input"
                      placeholder="Enter key project objectives, one per line"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm mb-1 opacity-80 font-medium">Constraints</label>
                    <textarea
                      name="constraints"
                      value={formData.constraints}
                      onChange={handleChange}
                      className="vercel-input"
                      placeholder="Enter project constraints, one per line"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-2 lg:pt-0 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="vercel-button-primary group relative overflow-hidden cursor-pointer"
            >
              <span className="relative z-10 flex items-center">
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Analyzing Risks...
                  </>
                ) : (
                  <>
                    <span>Analyze Risks</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 group-hover:translate-x-1 transition-transform">
                      <path d="m9 18 6-6-6-6"></path>
                    </svg>
                  </>
                )}
              </span>
              {!loading && (
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 dark:from-blue-500/10 dark:to-purple-500/10 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform"></span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
