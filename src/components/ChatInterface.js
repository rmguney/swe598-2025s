"use client";

import { useState } from "react";
import { sendChatMessage, directApiCall } from "../utils/gemini-client"; // Try importing directly
// Alternatively, if it's a default export:
// import geminiClient from "../utils/gemini-client";
// const { sendChatMessage } = geminiClient; // Uncomment this if needed

export default function ChatInterface({ risks }) {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!messageInput.trim()) return;
    
    const userMessage = messageInput;
    setMessageInput("");
    
    const newMessages = [
      ...messages,
      { role: "user", content: userMessage }
    ];
    setMessages(newMessages);
    
    setIsLoading(true);
    try {
      console.log("Sending message with risks:", JSON.stringify(risks).substring(0, 100) + "...");
      
      // Try using the direct API call function if sendChatMessage isn't working
      let response;
      try {
        response = await sendChatMessage(userMessage, risks);
      } catch (innerError) {
        console.error("sendChatMessage failed:", innerError);
        // Fallback to direct API call if available
        if (typeof directApiCall === 'function') {
          const prompt = `User question: ${userMessage}\nContext (risk assessment data): ${JSON.stringify(risks)}`;
          response = await directApiCall(prompt);
        } else {
          throw innerError; // Re-throw if no fallback available
        }
      }
      
      setMessages([
        ...newMessages,
        { role: "assistant", content: response }
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages([
        ...newMessages,
        { role: "assistant", content: `Error: ${error.message || "Unknown error occurred"}. Please check your API key configuration or try again.` }
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="vercel-card relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="relative">
        <div className="flex items-center mb-6">
          <div className="mr-3 p-2 bg-purple-100/20 dark:bg-purple-900/20 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-purple-600 dark:text-purple-400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold tracking-tight vercel-gradient-text">Conversational Risk Assistant</h2>
        </div>
        
        <p className="mb-6 opacity-70 text-sm">
          Ask questions about your risk assessment and receive AI-powered analysis and recommendations.
        </p>
        
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg overflow-hidden">
          <div className="h-[320px] overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center opacity-60">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-3 text-purple-500">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                <p className="text-sm font-medium">No messages yet</p>
                <p className="text-xs mt-1">Ask a question about your risk assessment</p>
              </div>
            ) : (
              messages.map((message, i) => (
                <div 
                  key={i} 
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div 
                    className={`rounded-lg p-3 max-w-[80%] ${
                      message.role === "user" 
                        ? "bg-blue-100/20 dark:bg-blue-900/20 text-foreground ml-auto" 
                        : "bg-[var(--secondary)] border border-[var(--border)]"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))
            )}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="rounded-lg p-3 max-w-[80%] bg-[var(--secondary)] border border-[var(--border)]">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-150"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-300"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="border-t border-[var(--border)] p-3">
            <form onSubmit={handleSendMessage} className="flex items-center gap-3">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Ask about your risks..."
                className="flex-1 text-sm bg-[var(--background)] border border-[var(--border)] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
              />
              <button 
                type="submit" 
                disabled={isLoading || !messageInput.trim()}
                className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded-md text-sm font-medium flex items-center disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
                Send
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-4 text-xs opacity-60">
          <p>Try asking questions like "What are my critical risks?" or "How can I improve my risk profile?"</p>
        </div>
      </div>
    </div>
  );
}
