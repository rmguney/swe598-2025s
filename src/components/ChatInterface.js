"use client";

import { useState, useRef, useEffect } from "react";
import { chatWithGemini } from "../utils/gemini-client";

export default function ChatInterface({ risks }) {
  const [messages, setMessages] = useState([
    {
      role: "system",
      content: "Hi there! I'm your AI assistant. Ask me anything about the risk assessment results and I'll help you understand them better."
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      role: "user",
      content: inputMessage
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await chatWithGemini(inputMessage, risks, messages);
      
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response
        }
      ]);
    } catch (error) {
      console.error("Error in chat:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error processing your request. Please try again."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="vercel-card relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="relative">
        <div className="flex items-center mb-6">
          <div className="mr-3 p-2 bg-purple-100/20 dark:bg-purple-900/20 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-purple-600 dark:text-purple-400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold tracking-tight vercel-gradient-text">Risk Assessment Chat</h2>
        </div>
        
        <p className="mb-4 opacity-70 text-sm">
          Ask questions about your project risks and get AI-powered insights based on your assessment results.
        </p>

        {/* Messages container */}
        <div className="bg-[var(--secondary)]/50 rounded-lg p-4 mb-4 h-[350px] overflow-y-auto">
          {messages.filter(msg => msg.role !== "system").map((message, index) => (
            <div
              key={index}
              className={`mb-3 ${
                message.role === "user" ? "text-right" : "text-left"
              }`}
            >
              <div
                className={`inline-block max-w-[80%] rounded-lg p-3 ${
                  message.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-[var(--card)] border border-[var(--border)]"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="text-left mb-3">
              <div className="inline-block max-w-[80%] rounded-lg p-3 bg-[var(--card)] border border-[var(--border)]">
                <div className="flex space-x-2 items-center">
                  <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse delay-150"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse delay-300"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            disabled={isLoading}
            placeholder="Ask about your risk assessment..."
            className="vercel-input flex-grow"
          />
          <button
            type="submit"
            disabled={isLoading || !inputMessage.trim()}
            className="vercel-button-primary"
          >
            <span>Send</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-2"
            >
              <path d="M22 2L11 13"></path>
              <path d="M22 2l-7 20-4-9-9-4 20-7z"></path>
            </svg>
          </button>
        </form>

        {/* Suggested questions */}
        <div className="mt-6 pt-4 border-t border-[var(--border)]">
          <h3 className="text-sm font-medium mb-3">Suggested Questions</h3>
          <div className="flex flex-wrap gap-2">
            {[
              "What's my biggest risk?",
              "How can I mitigate critical risks?",
              "Which risks need immediate attention?",
              "Summarize my risk profile"
            ].map((question, index) => (
              <button
                key={index}
                onClick={() => {
                  setInputMessage(question);
                }}
                className="text-sm bg-[var(--secondary)] hover:bg-[var(--secondary)]/80 px-3 py-1.5 rounded-full"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
