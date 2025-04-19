"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ChatInterface from "../../components/ChatInterface";

export default function ChatPage() {
  const [riskData, setRiskData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Retrieve risk data from localStorage
    const storedRiskData = localStorage.getItem("riskAssessmentData");
    
    if (storedRiskData) {
      try {
        setRiskData(JSON.parse(storedRiskData));
      } catch (error) {
        console.error("Error parsing stored risk data:", error);
      }
    }
    
    setLoading(false);
  }, []);

  // Redirect to risk analysis if no data is available
  useEffect(() => {
    if (!loading && !riskData) {
      router.push("/risk-analysis");
    }
  }, [loading, riskData, router]);

  if (loading || !riskData) {
    return (
      <div className="min-h-screen pt-[calc(var(--header-height)+2rem)] px-6">
        <div className="max-w-vercel mx-auto">
          <div className="flex items-center justify-center h-64">
            <svg className="animate-spin h-8 w-8 text-gray-500" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="vercel-header h-[var(--header-height)] fixed top-0 inset-x-0 z-10 bg-opacity-80 dark:bg-opacity-70">
        <div className="max-w-vercel mx-auto h-full flex items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <h1 className="font-bold text-lg pt-3 pr-4">Risk Chat</h1>
            <Link href="/risk-analysis" className="text-sm font-medium flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity pt-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5"></path>
                <path d="M12 19l-7-7 7-7"></path>
              </svg>
              Back to Analysis
            </Link>
          </div>
        </div>
      </header>
      
      <main className="pt-[calc(var(--header-height)+2rem)] pb-16 px-6">
        <div className="max-w-vercel mx-auto">
          <ChatInterface riskData={riskData} />
        </div>
      </main>
    </div>
  );
}
