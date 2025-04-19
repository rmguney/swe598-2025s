"use client";

import { useState } from "react";

export default function RiskMatrix({ risks }) {
  const [selectedRisk, setSelectedRisk] = useState(null);

  const getPositionStyle = (probability, impact) => {
    // Convert 1-5 scale to percentages for positioning
    const left = `${(impact - 1) * 25}%`;
    const bottom = `${(probability - 1) * 25}%`;
    return { left, bottom };
  };

  const getRiskColor = (riskScore) => {
    if (riskScore <= 5) return "bg-green-500";
    if (riskScore <= 10) return "bg-yellow-500";
    if (riskScore <= 15) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <div className="vercel-card relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-500/5 dark:bg-sky-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="relative">
        <div className="flex items-center mb-3">
          <div className="mr-3 p-2 bg-blue-100/20 dark:bg-blue-900/20 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-blue-600 dark:text-blue-400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="3" y1="9" x2="21" y2="9"></line>
              <line x1="9" y1="21" x2="9" y2="9"></line>
            </svg>
          </div>
          <h2 className="text-2xl font-bold tracking-tight vercel-gradient-text">Risk Assessment Matrix</h2>
        </div>
      </div>
      
      <div className="flex gap-8 flex-col lg:flex-row mt-2">
        <div className="relative w-full lg:w-2/3 aspect-square border border-[var(--border)] bg-[var(--secondary)] rounded-xl p-4 mt-8 ml-12">
          <div className="absolute w-full flex justify-between top-full text-xs px-4">
            {["Low", "Medium", "High", "Critical"].map((label, i) => (
              <span 
                key={i} 
                className="transform -translate-x-1/2 bg-[var(--background)] px-1.5 py-0.5 rounded text-xs opacity-80 mt-1"
              >
                {label}
              </span>
            ))}
          </div>
          
          <div className="absolute h-full flex flex-col justify-between -left-3 text-xs top-0">
            {["Almost Certain", "Likely", "Possible", "Unlikely", "Rare"].map((label, i) => (
              <div key={i} className="transform translate-y-1/2 flex items-center">
                <span className="opacity-80 bg-[var(--background)] px-1.5 py-0.5 rounded text-xs whitespace-nowrap">
                  {label}
                </span>
              </div>
            ))}
          </div>
          
          <div className="absolute top-full mt-5 w-full text-center">
            <span className="text-sm font-medium px-2 py-1 bg-[var(--background)] rounded-md opacity-80">Impact</span>
          </div>
          
          <div className="absolute -left-20 top-1/2 transform -translate-y-1/2 -rotate-90">
            <span className="text-sm font-medium px-2 py-1 bg-[var(--background)] rounded-md opacity-80 whitespace-nowrap">Probability</span>
          </div>
          
          <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-0">
            {[...Array(16)].map((_, index) => (
              <div 
                key={index} 
                className="border-[0.5px] border-[var(--border)] opacity-30"
              ></div>
            ))}
          </div>
          
          {risks.map((risk, index) => (
            <div 
              key={index}
              className={`absolute w-7 h-7 rounded-full cursor-pointer transform -translate-x-1/2 translate-y-1/2 hover:ring-2 hover:ring-[var(--ring)] flex items-center justify-center text-xs font-bold transition-all shadow-md ${getRiskColor(risk.probability * risk.impact)}`}
              style={getPositionStyle(risk.probability, risk.impact)}
              onClick={() => setSelectedRisk(risk)}
              title={risk.title}
            >
              {index + 1}
            </div>
          ))}
        </div>
        
        <div className="md:w-1/3 flex flex-col mt-8">
          <div className="bg-[var(--secondary)] p-4 rounded-lg border border-[var(--border)]">
            <h3 className="text-lg font-medium mb-3 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              Risk Level Legend
            </h3>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 p-1.5 rounded bg-red-500/10">
                <div className="w-4 h-4 rounded-sm bg-red-500"></div>
                <span className="text-sm">Critical (16-25)</span>
              </div>
              <div className="flex items-center gap-2 p-1.5 rounded bg-orange-500/10">
                <div className="w-4 h-4 rounded-sm bg-orange-500"></div>
                <span className="text-sm">High (11-15)</span>
              </div>
              <div className="flex items-center gap-2 p-1.5 rounded bg-yellow-500/10">
                <div className="w-4 h-4 rounded-sm bg-yellow-500"></div>
                <span className="text-sm">Medium (6-10)</span>
              </div>
              <div className="flex items-center gap-2 p-1.5 rounded bg-green-500/10">
                <div className="w-4 h-4 rounded-sm bg-green-500"></div>
                <span className="text-sm">Low (1-5)</span>
              </div>
            </div>
          </div>
          
          {selectedRisk && (
            <div className="bg-[var(--secondary)] p-4 rounded-lg border border-[var(--border)] shadow-sm mt-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-lg">{selectedRisk.title}</h4>
                <span className={`text-xs font-medium py-1 px-2 rounded-full ${
                  selectedRisk.probability * selectedRisk.impact > 15 ? "bg-red-500/20 text-red-600 dark:text-red-400" :
                  selectedRisk.probability * selectedRisk.impact > 10 ? "bg-orange-500/20 text-orange-600 dark:text-orange-400" :
                  selectedRisk.probability * selectedRisk.impact > 5 ? "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400" :
                  "bg-green-500/20 text-green-600 dark:text-green-400"
                }`}>
                  Score: {selectedRisk.probability * selectedRisk.impact}
                </span>
              </div>
              
              <div className="flex gap-4 mt-3 text-sm bg-[var(--background)] p-2 rounded-md">
                <div className="flex flex-col items-center">
                  <span className="text-xs opacity-70">Probability</span>
                  <span className="font-mono text-base">{selectedRisk.probability}/5</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs opacity-70">Impact</span>
                  <span className="font-mono text-base">{selectedRisk.impact}/5</span>
                </div>
              </div>
              
              {selectedRisk.mitigation && (
                <div className="mt-4 pt-3 border-t border-[var(--border)]">
                  <h5 className="text-sm font-medium mb-1.5 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                    Mitigation Strategy:
                  </h5>
                  <p className="text-sm opacity-80 bg-[var(--background)]/50 p-2.5 rounded">{selectedRisk.mitigation}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t border-[var(--border)]">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <line x1="8" y1="6" x2="21" y2="6"></line>
            <line x1="8" y1="12" x2="21" y2="12"></line>
            <line x1="8" y1="18" x2="21" y2="18"></line>
            <line x1="3" y1="6" x2="3.01" y2="6"></line>
            <line x1="3" y1="12" x2="3.01" y2="12"></line>
            <line x1="3" y1="18" x2="3.01" y2="18"></line>
          </svg>
          All Identified Risks
        </h3>
        
        <div className="bg-[var(--secondary)]/50 p-3 rounded-lg border border-[var(--border)]/50">
          <div className="overflow-auto max-h-64">
            <table className="vercel-table w-full">
              <thead className="sticky top-0 bg-[var(--background)] z-10">
                <tr>
                  <th className="w-10 text-center">#</th>
                  <th>Risk</th>
                  <th className="w-24 text-center">Probability</th>
                  <th className="w-24 text-center">Impact</th>
                  <th className="w-24 text-center">Score</th>
                </tr>
              </thead>
              <tbody>
                {risks.map((risk, index) => (
                  <tr 
                    key={index} 
                    className="border-b dark:border-gray-700 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 cursor-pointer"
                    onClick={() => setSelectedRisk(risk)}
                  >
                    <td className="text-center">{index + 1}</td>
                    <td>{risk.title}</td>
                    <td className="text-center">{risk.probability}</td>
                    <td className="text-center">{risk.impact}</td>
                    <td className={`text-center font-medium ${
                      risk.probability * risk.impact > 15 ? "text-red-600 dark:text-red-400" :
                      risk.probability * risk.impact > 10 ? "text-orange-600 dark:text-orange-400" :
                      risk.probability * risk.impact > 5 ? "text-yellow-600 dark:text-yellow-400" :
                      "text-green-600 dark:text-green-400"
                    }`}>
                      {risk.probability * risk.impact}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
