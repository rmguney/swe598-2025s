"use client";

import { useState } from "react";
import RiskForm from "../../components/RiskForm";
import RiskMatrix from "../../components/RiskMatrix";
import RiskMitigations from "../../components/RiskMitigations";
import ChatInterface from "../../components/ChatInterface";
import Link from "next/link";

export default function RiskAnalysisPage() {
  const [analysisResults, setAnalysisResults] = useState(null);
  const [activeTab, setActiveTab] = useState("matrix");
  const [showShareModal, setShowShareModal] = useState(false);
  
  const handleAnalysisComplete = (results) => {
    setAnalysisResults(results);
  };
  
  // Function to export the summary as PDF
  const handleExportPDF = () => {
    // Create a printable version of the summary
    const printWindow = window.open('', '_blank');
    
    if (printWindow) {
      // Set up basic HTML structure for the PDF
      printWindow.document.write(`
        <html>
          <head>
            <title>Risk Assessment Summary</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              h1 { color: #0070f3; }
              .section { margin-bottom: 20px; }
              table { width: 100%; border-collapse: collapse; margin-top: 10px; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #f2f2f2; }
              .risk-stats { display: flex; justify-content: space-between; }
              .stat-box { padding: 10px; border: 1px solid #eaeaea; border-radius: 5px; width: 22%; }
              .critical { color: #e53e3e; }
              .high { color: #dd6b20; }
              .medium { color: #d69e2e; }
              .low { color: #38a169; }
            </style>
          </head>
          <body>
            <h1>Risk Assessment Summary</h1>
            <p>Generated on: ${new Date().toLocaleString()}</p>
            
            <div class="section">
              <h2>Risk Statistics</h2>
              <div class="risk-stats">
                <div class="stat-box">
                  <h3>Critical Risks</h3>
                  <p class="critical">${analysisResults.filter(r => r.probability * r.impact > 15).length}</p>
                </div>
                <div class="stat-box">
                  <h3>High Risks</h3>
                  <p class="high">${analysisResults.filter(r => {
                    const score = r.probability * r.impact;
                    return score > 10 && score <= 15;
                  }).length}</p>
                </div>
                <div class="stat-box">
                  <h3>Average Score</h3>
                  <p>${(analysisResults.reduce((acc, risk) => acc + (risk.probability * risk.impact), 0) / analysisResults.length).toFixed(1)}</p>
                </div>
                <div class="stat-box">
                  <h3>Total Risks</h3>
                  <p>${analysisResults.length}</p>
                </div>
              </div>
            </div>
            
            <div class="section">
              <h2>All Risks</h2>
              <table>
                <tr>
                  <th>#</th>
                  <th>Risk</th>
                  <th>Probability</th>
                  <th>Impact</th>
                  <th>Score</th>
                  <th>Severity</th>
                </tr>
                ${analysisResults.map((risk, index) => {
                  const score = risk.probability * risk.impact;
                  let severity = "Low";
                  let severityClass = "low";
                  
                  if (score > 15) {
                    severity = "Critical";
                    severityClass = "critical";
                  } else if (score > 10) {
                    severity = "High";
                    severityClass = "high";
                  } else if (score > 5) {
                    severity = "Medium";
                    severityClass = "medium";
                  }
                  
                  return `
                    <tr>
                      <td>${index + 1}</td>
                      <td>${risk.title}</td>
                      <td>${risk.probability}</td>
                      <td>${risk.impact}</td>
                      <td>${score}</td>
                      <td class="${severityClass}">${severity}</td>
                    </tr>
                  `;
                }).join('')}
              </table>
            </div>
            
            <div class="section">
              <h2>Mitigation Strategies</h2>
              <table>
                <tr>
                  <th>Risk</th>
                  <th>Mitigation Strategy</th>
                </tr>
                ${analysisResults.map(risk => `
                  <tr>
                    <td>${risk.title}</td>
                    <td>${risk.mitigation}</td>
                  </tr>
                `).join('')}
              </table>
            </div>
          </body>
        </html>
      `);
      
      printWindow.document.close();
      
      // Small delay to ensure content is loaded before printing
      setTimeout(() => {
        printWindow.print();
      }, 500);
    } else {
      alert("Please allow popups to export the PDF");
    }
  };
  
  // Share modal component
  const ShareModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium">Share Risk Assessment</h3>
          <button 
            onClick={() => setShowShareModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Share link</label>
          <div className="flex">
            <input 
              type="text" 
              value={`${window.location.origin}/shared-risk/${btoa(JSON.stringify(analysisResults))}`} 
              readOnly
              className="vercel-input flex-grow"
            />
            <button 
              className="ml-2 vercel-button-secondary"
              onClick={() => {
                navigator.clipboard.writeText(`${window.location.origin}/shared-risk/${btoa(JSON.stringify(analysisResults))}`);
                alert("Link copied to clipboard");
              }}
            >
              Copy
            </button>
          </div>
          <p className="text-xs mt-2 opacity-70">Anyone with this link can view your risk assessment.</p>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Share via</label>
          <div className="flex gap-3">
            <button className="flex flex-1 justify-center items-center gap-2 vercel-button-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              Email
            </button>
            <button className="flex flex-1 justify-center items-center gap-2 vercel-button-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                <line x1="6" y1="1" x2="6" y2="4"></line>
                <line x1="10" y1="1" x2="10" y2="4"></line>
                <line x1="14" y1="1" x2="14" y2="4"></line>
              </svg>
              Slack
            </button>
          </div>
        </div>
        
        <button 
          onClick={() => setShowShareModal(false)} 
          className="w-full vercel-button-primary"
        >
          Done
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <header className="vercel-header h-[var(--header-height)] fixed top-0 inset-x-0 z-10 bg-opacity-80 dark:bg-opacity-70">
        <div className="max-w-vercel mx-auto h-full flex items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <h1 className="font-bold text-lg pt-3 pr-4">Risk Analyzer</h1>
            <Link href="/" className="text-sm font-medium flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity pt-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5"></path>
                <path d="M12 19l-7-7 7-7"></path>
              </svg>
              Home
            </Link>
          </div>
        </div>
      </header>
      
      <main className="pt-[calc(var(--header-height)+2rem)] pb-16 px-6">
        <div className="max-w-vercel mx-auto space-y-8">
          <RiskForm onAnalysisComplete={handleAnalysisComplete} />
          
          {analysisResults && (
            <>
              <div className="flex border-b border-[var(--border)] overflow-x-auto">
                <button 
                  className={`tab-button ${activeTab === "matrix" ? "active" : ""}`}
                  onClick={() => setActiveTab("matrix")}
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="3" y1="9" x2="21" y2="9"></line>
                      <line x1="9" y1="21" x2="9" y2="9"></line>
                    </svg>
                    Risk Matrix
                  </div>
                </button>
                <button 
                  className={`tab-button ${activeTab === "mitigations" ? "active" : ""}`}
                  onClick={() => setActiveTab("mitigations")}
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5">
                      <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                    </svg>
                    Mitigations
                  </div>
                </button>
                <button 
                  className={`tab-button ${activeTab === "summary" ? "active" : ""}`}
                  onClick={() => setActiveTab("summary")}
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5">
                      <line x1="8" y1="6" x2="21" y2="6"></line>
                      <line x1="8" y1="12" x2="21" y2="12"></line>
                      <line x1="8" y1="18" x2="21" y2="18"></line>
                      <line x1="3" y1="6" x2="3.01" y2="6"></line>
                      <line x1="3" y1="12" x2="3.01" y2="12"></line>
                      <line x1="3" y1="18" x2="3.01" y2="18"></line>
                    </svg>
                    Summary
                  </div>
                </button>
                <button 
                  className={`tab-button ${activeTab === "chat" ? "active" : ""}`}
                  onClick={() => setActiveTab("chat")}
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    Conversational Risk Assistant
                  </div>
                </button>
              </div>
              
              <div> 
                {activeTab === "matrix" && <RiskMatrix risks={analysisResults} />}
                {activeTab === "mitigations" && <RiskMitigations risks={analysisResults} />}
                {activeTab === "chat" && <ChatInterface risks={analysisResults} />}
                {activeTab === "summary" && (
                  <div className="vercel-card relative overflow-hidden"> 
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 dark:bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                    
                    <div className="relative">
                      <div className="flex items-center mb-6">
                        <div className="mr-3 p-2 bg-amber-100/20 dark:bg-amber-900/20 rounded-lg">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-amber-600 dark:text-amber-400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 20h9"></path>
                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                          </svg>
                        </div>
                        <h2 className="text-2xl font-bold tracking-tight vercel-gradient-text">Risk Analysis Summary</h2>
                      </div>
                      
                      <p className="mb-6 opacity-70 text-sm">
                        Overview of risk assessment results and key metrics for this project.
                      </p>
                      
                      {/* Stats Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-red-50/50 dark:bg-red-900/20 p-4 rounded-lg border border-red-100 dark:border-red-900/30 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-sm font-medium text-red-700 dark:text-red-400">Critical Risks</h3>
                            <div className="rounded-full bg-red-100 dark:bg-red-800 p-1">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-red-600 dark:text-red-400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                                <line x1="12" y1="9" x2="12" y2="13"></line>
                                <line x1="12" y1="17" x2="12.01" y2="17"></line>
                              </svg>
                            </div>
                          </div>
                          <p className="text-3xl font-semibold">
                            {analysisResults.filter(r => r.probability * r.impact > 15).length}
                          </p>
                          <p className="text-xs mt-1 opacity-70">Requires immediate attention</p>
                        </div>
                        
                        <div className="bg-orange-50/50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-100 dark:border-orange-900/30 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-sm font-medium text-orange-700 dark:text-orange-400">High Risks</h3>
                            <div className="rounded-full bg-orange-100 dark:bg-orange-800 p-1">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-orange-600 dark:text-orange-400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M12 8v4"></path>
                                <path d="M12 16h.01"></path>
                              </svg>
                            </div>
                          </div>
                          <p className="text-3xl font-semibold">
                            {analysisResults.filter(r => {
                              const score = r.probability * r.impact;
                              return score > 10 && score <= 15;
                            }).length}
                          </p>
                          <p className="text-xs mt-1 opacity-70">Needs close monitoring</p>
                        </div>
                        
                        <div className="bg-blue-50/50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-sm font-medium text-blue-700 dark:text-blue-400">Average Score</h3>
                            <div className="rounded-full bg-blue-100 dark:bg-blue-800 p-1">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-blue-600 dark:text-blue-400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
                              </svg>
                            </div>
                          </div>
                          <p className="text-3xl font-semibold">
                            {(analysisResults.reduce((acc, risk) => acc + (risk.probability * risk.impact), 0) / analysisResults.length).toFixed(1)}
                          </p>
                          <p className="text-xs mt-1 opacity-70">Out of 25 maximum</p>
                        </div>
                        
                        <div className="bg-purple-50/50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-100 dark:border-purple-900/30 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-sm font-medium text-purple-700 dark:text-purple-400">Total Risks</h3>
                            <div className="rounded-full bg-purple-100 dark:bg-purple-800 p-1">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-purple-600 dark:text-purple-400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                              </svg>
                            </div>
                          </div>
                          <p className="text-3xl font-semibold">
                            {analysisResults.length}
                          </p>
                          <p className="text-xs mt-1 opacity-70">Identified in analysis</p>
                        </div>
                      </div>
                      
                      {/* Risk Distribution */}
                      <div className="bg-[var(--secondary)]/50 p-5 rounded-lg mb-8">
                        <h3 className="text-lg font-medium mb-4 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-600 dark:text-gray-400 mr-2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="20" x2="18" y2="10"></line>
                            <line x1="12" y1="20" x2="12" y2="4"></line>
                            <line x1="6" y1="20" x2="6" y2="14"></line>
                          </svg>
                          Risk Distribution
                        </h3>
                        
                        <div className="flex justify-between text-xs mb-2 px-1">
                          <span className="text-gray-600 dark:text-gray-400">Distribution by severity level</span>
                          <span className="text-gray-600 dark:text-gray-400">Risk Level →</span>
                        </div>
                        
                        <div className="h-6 w-full flex rounded-md overflow-hidden">
                          {[
                            { color: "bg-green-500", label: "Low", filter: r => r.probability * r.impact <= 5 },
                            { color: "bg-yellow-500", label: "Medium", filter: r => { const s = r.probability * r.impact; return s > 5 && s <= 10; }},
                            { color: "bg-orange-500", label: "High", filter: r => { const s = r.probability * r.impact; return s > 10 && s <= 15; }},
                            { color: "bg-red-500", label: "Critical", filter: r => r.probability * r.impact > 15 }
                          ].map((level, i) => {
                            const count = analysisResults.filter(level.filter).length;
                            const percentage = (count / analysisResults.length) * 100;
                            return (
                              <div
                                key={i}
                                className={`${level.color} transition-all relative group`}
                                style={{ width: `${percentage}%` }}
                              >
                                {percentage > 15 && (
                                  <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-medium">
                                    {Math.round(percentage)}%
                                  </div>
                                )}
                                <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/75 text-white text-xs rounded px-2 py-1 pointer-events-none whitespace-nowrap">
                                  {level.label}: {count} ({Math.round(percentage)}%)
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        
                        <div className="flex justify-between text-[10px] mt-2 px-1">
                          <span className="text-green-600 dark:text-green-400 font-medium">Low</span>
                          <span className="text-yellow-600 dark:text-yellow-400 font-medium">Medium</span>
                          <span className="text-orange-600 dark:text-orange-400 font-medium">High</span>
                          <span className="text-red-600 dark:text-red-400 font-medium">Critical</span>
                        </div>
                      </div>
                      
                      {/* Quick Actions */}
                      <div className="flex gap-3 justify-end pt-4 border-t border-[var(--border)]">
                        <button 
                          className="vercel-button-secondary group"
                          onClick={handleExportPDF}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="mr-1.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="17 8 12 3 7 8"></polyline>
                            <line x1="12" y1="3" x2="12" y2="15"></line>
                          </svg>
                          Export PDF
                        </button>
                        <button 
                          className="vercel-button-primary group"
                          onClick={() => setShowShareModal(true)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="mr-1.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                            <polyline points="16 6 12 2 8 6"></polyline>
                            <line x1="12" y1="2" x2="12" y2="15"></line>
                          </svg>
                          Share
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>
      
      {/* Share Modal */}
      {showShareModal && <ShareModal />}
    </div>
  );
}
