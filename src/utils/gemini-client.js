// This utility handles interactions with the Google Gemini API

const getApiKey = () => {
  // First try to get from environment variable
  if (process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
    return process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  }
  
  // Fallback to localStorage for development/testing
  if (typeof window !== 'undefined') {
    return localStorage.getItem('gemini-api-key');
  }
  
  return null;
};

export async function analyzeRisks(projectData) {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    throw new Error("Gemini API key not found. Please configure it in settings.");
  }

  try {
    // First, use our server endpoint to protect the API key
    const response = await fetch('/api/gemini/analyze-risks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ projectData }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.risks;
    
  } catch (error) {
    console.error('Error querying Gemini API:', error);
    
    // For development/demo purposes, return mock data if API call fails
    return generateMockRisks(projectData);
  }
}

// Generate mock risks for development/demo purposes
function generateMockRisks(projectData) {
  const industry = projectData.industry || 'technology';
  const baseRisks = [
    {
      title: "Budget overrun",
      probability: 3,
      impact: 4,
      mitigation: "Implement strict cost control measures and regular financial reviews."
    },
    {
      title: "Schedule delays",
      probability: 4,
      impact: 3,
      mitigation: "Add buffer time to critical path activities and monitor progress closely."
    },
    {
      title: "Scope creep",
      probability: 4,
      impact: 4,
      mitigation: "Implement formal change management process and clear requirements documentation."
    },
    {
      title: "Resource unavailability",
      probability: 3,
      impact: 3,
      mitigation: "Cross-train team members and identify backup resources."
    },
    {
      title: "Stakeholder resistance",
      probability: 2,
      impact: 4,
      mitigation: "Conduct stakeholder analysis and develop engagement plan."
    }
  ];
  
  // Industry-specific risks
  const industryRisks = {
    technology: [
      {
        title: "Technical complexity issues",
        probability: 4,
        impact: 5,
        mitigation: "Conduct technical proof of concept and engage expert consultants."
      },
      {
        title: "Cybersecurity vulnerabilities",
        probability: 3,
        impact: 5,
        mitigation: "Implement security by design and conduct regular penetration testing."
      }
    ],
    finance: [
      {
        title: "Regulatory compliance issues",
        probability: 4,
        impact: 5,
        mitigation: "Engage legal experts and maintain regulatory tracking system."
      },
      {
        title: "Market volatility",
        probability: 3,
        impact: 4,
        mitigation: "Develop contingency plans for different market scenarios."
      }
    ],
    healthcare: [
      {
        title: "Patient data security breach",
        probability: 2,
        impact: 5,
        mitigation: "Implement HIPAA compliance measures and encryption."
      },
      {
        title: "Regulatory approval delays",
        probability: 4,
        impact: 4,
        mitigation: "Early engagement with regulatory bodies and thorough documentation."
      }
    ],
    construction: [
      {
        title: "Safety incidents",
        probability: 3,
        impact: 5,
        mitigation: "Implement comprehensive safety program and regular training."
      },
      {
        title: "Material cost increases",
        probability: 4,
        impact: 3,
        mitigation: "Secure fixed-price contracts with suppliers where possible."
      }
    ]
  };
  
  // Combine base risks with industry-specific risks
  let combinedRisks = [...baseRisks];
  
  if (industryRisks[industry]) {
    combinedRisks = [...combinedRisks, ...industryRisks[industry]];
  }
  
  // Add a project-specific risk based on description
  if (projectData.projectDescription) {
    const keywords = {
      "integration": {
        title: "System integration failures",
        probability: 4,
        impact: 4,
        mitigation: "Implement thorough integration testing and phased deployment."
      },
      "international": {
        title: "Cross-border compliance issues",
        probability: 3,
        impact: 4,
        mitigation: "Engage local legal experts and research country-specific requirements."
      },
      "vendor": {
        title: "Vendor performance issues",
        probability: 3,
        impact: 3,
        mitigation: "Implement vendor performance SLAs and monitoring."
      }
    };
    
    // Check if any keywords are in the description
    for (const [keyword, risk] of Object.entries(keywords)) {
      if (projectData.projectDescription.toLowerCase().includes(keyword)) {
        combinedRisks.push(risk);
        break;
      }
    }
  }
  
  return combinedRisks;
}

export async function directApiCall(prompt) {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    throw new Error("Gemini API key not found");
  }
  
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    }
  );
  
  // Process response...
}

export async function chatWithGemini(userMessage, riskData, previousMessages = []) {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    throw new Error("Gemini API key not found. Please configure it in settings.");
  }

  try {
    // First, use our server endpoint to protect the API key
    const response = await fetch('/api/gemini/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        userMessage,
        riskData,
        previousMessages: previousMessages.filter(msg => msg.role !== 'system') // Filter out system messages
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.response;
    
  } catch (error) {
    console.error('Error in chat interaction with Gemini API:', error);
    
    // For development/demo purposes, return mock response if API call fails
    return generateMockChatResponse(userMessage, riskData);
  }
}

// Generate mock chat responses for development/demo purposes
function generateMockChatResponse(userMessage, riskData) {
  const userMessageLower = userMessage.toLowerCase();
  
  if (userMessageLower.includes("biggest risk") || userMessageLower.includes("highest risk")) {
    const sortedRisks = [...riskData].sort((a, b) => 
      (b.probability * b.impact) - (a.probability * a.impact)
    );
    const highestRisk = sortedRisks[0];
    
    return `Based on the assessment, your biggest risk is "${highestRisk.title}" with a risk score of ${highestRisk.probability * highestRisk.impact} (probability: ${highestRisk.probability}, impact: ${highestRisk.impact}). The recommended mitigation strategy is: ${highestRisk.mitigation}`;
  }
  
  if (userMessageLower.includes("mitigate") && userMessageLower.includes("critical")) {
    const criticalRisks = riskData.filter(r => r.probability * r.impact > 15);
    if (criticalRisks.length === 0) {
      return "Good news! You don't have any risks classified as critical (score > 15) in your assessment.";
    }
    
    return `You have ${criticalRisks.length} critical risks that need immediate attention. Here are the mitigation strategies for each:\n\n${
      criticalRisks.map((risk, i) => `${i+1}. ${risk.title}: ${risk.mitigation}`).join('\n\n')
    }`;
  }
  
  if (userMessageLower.includes("immediate attention") || userMessageLower.includes("urgent")) {
    const highPriorityRisks = riskData.filter(r => r.probability * r.impact > 10);
    return `There are ${highPriorityRisks.length} risks requiring urgent attention (score > 10). The top 3 are: 
    ${highPriorityRisks.slice(0, 3).map((r, i) => `${i+1}. ${r.title} (score: ${r.probability * r.impact})`).join('\n')}`;
  }
  
  if (userMessageLower.includes("summarize") || userMessageLower.includes("summary")) {
    const criticalCount = riskData.filter(r => r.probability * r.impact > 15).length;
    const highCount = riskData.filter(r => {
      const score = r.probability * r.impact;
      return score > 10 && score <= 15;
    }).length;
    const mediumCount = riskData.filter(r => {
      const score = r.probability * r.impact;
      return score > 5 && score <= 10;
    }).length;
    const lowCount = riskData.filter(r => r.probability * r.impact <= 5).length;
    
    return `Your risk profile summary:\n\n• Critical risks: ${criticalCount}\n• High risks: ${highCount}\n• Medium risks: ${mediumCount}\n• Low risks: ${lowCount}\n\nAverage risk score: ${(riskData.reduce((acc, risk) => acc + (risk.probability * risk.impact), 0) / riskData.length).toFixed(1)} out of 25`;
  }
  
  return "I'm your risk assessment assistant. I can help you understand your project risks better. Try asking about your biggest risks, mitigation strategies, or which risks need immediate attention.";
}
