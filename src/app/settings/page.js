"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState("");
  const [saved, setSaved] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [usingEnvVar, setUsingEnvVar] = useState(false);
  
  useEffect(() => {
    // Check if using environment variable
    if (process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      setUsingEnvVar(true);
      setApiKey("●●●●●●●●●●●●●●●●");
    } else {
      // Load API key from localStorage if not using env var
      const storedApiKey = localStorage.getItem("gemini-api-key");
      if (storedApiKey) {
        setApiKey(storedApiKey);
      }
    }
  }, []);

  const saveApiKey = () => {
    if (!usingEnvVar && apiKey) {
      localStorage.setItem("gemini-api-key", apiKey);
      
      // Also store in a cookie for server-side access
      document.cookie = `gemini-api-key=${apiKey}; path=/; max-age=31536000; SameSite=Strict`;
      
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  const testApiKey = async () => {
    setTesting(true);
    setTestResult(null);
    
    try {
      // Use the actual API key for testing
      const keyToTest = usingEnvVar 
        ? process.env.NEXT_PUBLIC_GEMINI_API_KEY
        : apiKey;
        
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${keyToTest}`,
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
                    text: "Respond with 'API connection successful' if this request works.",
                  },
                ],
              },
            ],
          }),
        }
      );
      
      if (response.ok) {
        setTestResult({
          success: true,
          message: "API connection successful! Your key is working.",
        });
      } else {
        const errorData = await response.json();
        setTestResult({
          success: false,
          message: `API Error: ${errorData.error?.message || "Unknown error"}`,
        });
      }
    } catch (error) {
      setTestResult({
        success: false,
        message: `Connection error: ${error.message}`,
      });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col">
      <Header />
      
      <main className="pt-[calc(var(--header-height)+2rem)] pb-16 px-6 relative flex-grow">
        <div className="max-w-vercel mx-auto">
          <div className="w-full flex flex-col items-center text-center space-y-4 py-6">
            <h1 className="text-3xl font-bold tracking-tighter vercel-gradient-text">
              Settings
            </h1>
            <p className="text-base opacity-70 max-w-2xl">
              Configure your API keys and application preferences
            </p>
          </div>
          
          <div className="vercel-card p-6">
            <h2 className="text-xl font-semibold mb-4">API Key Configuration</h2>
            
            {usingEnvVar && (
              <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-md text-sm">
                <strong>Environment variable detected!</strong> Your API key is configured via environment variable (NEXT_PUBLIC_GEMINI_API_KEY).
              </div>
            )}
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Gemini API Key</label>
              <div className="flex gap-2">
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="vercel-input flex-grow"
                  placeholder="Enter your Gemini API key"
                  disabled={usingEnvVar}
                />
                <button
                  onClick={saveApiKey}
                  disabled={usingEnvVar || !apiKey}
                  className="vercel-button-primary whitespace-nowrap disabled:opacity-50"
                >
                  Save
                </button>
              </div>
            </div>
            
            <div className="flex gap-2 items-center mb-3">
              <button
                onClick={testApiKey}
                disabled={testing || (!apiKey && !usingEnvVar)}
                className="vercel-button-secondary disabled:opacity-50"
              >
                {testing ? "Testing..." : "Test Connection"}
              </button>
              
              {saved && (
                <span className="text-green-600 dark:text-green-400 text-sm ml-2">
                  API key saved!
                </span>
              )}
            </div>
            
            {testResult && (
              <div className={`mb-4 p-3 rounded-md ${testResult.success ? 'bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-300' : 'bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-300'}`}>
                {testResult.message}
              </div>
            )}
            
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-4 p-3 bg-gray-50 dark:bg-gray-900/30 rounded-md">
              <p className="mb-2">Need a Gemini API key? <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Get one from Google AI Studio</a></p>
              <p>Your API key is stored locally in your browser and is used for risk analysis.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
