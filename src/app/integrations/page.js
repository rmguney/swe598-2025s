"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function IntegrationsPage() {
  const [notifyEmail, setNotifyEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setNotifyEmail("");
    setTimeout(() => setSubmitted(false), 3000);
  };

  const integrations = [
    {
      name: "Jira",
      description: "Connect your risk analysis directly to Jira issues and epics",
      status: "Coming soon",
      features: ["Automatic risk-to-issue mapping", "Bi-directional sync", "Custom fields"],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="#2684FF" stroke="none">
          <path d="M11.571 11.513H0a5.218 5.218 0 0 0 5.232 5.215h2.13v2.057A5.215 5.215 0 0 0 12.575 24V12.518a1.005 1.005 0 0 0-1.005-1.005zm5.723-5.756H5.736a5.215 5.215 0 0 0 5.215 5.214h2.129v2.058a5.218 5.218 0 0 0 5.215 5.214V6.758a1.001 1.001 0 0 0-1.001-1.001zM23.013 0H11.455a5.215 5.215 0 0 0 5.215 5.215h2.129v2.057A5.215 5.215 0 0 0 24 12.483V1.005A1.001 1.001 0 0 0 23.013 0z" />
        </svg>
      )
    },
    {
      name: "Trello",
      description: "Visualize and manage risks alongside your Trello boards",
      status: "Coming soon",
      features: ["Risk cards in your boards", "Automated checklists", "Power-Up integration"],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="#0079BF" stroke="none">
          <path d="M21 3H3C1.9 3 1 3.9 1 5v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM10 17H5V7h5v10zm9 0h-5v-6h5v6z" />
        </svg>
      )
    },
    {
      name: "Asana",
      description: "Integrate risk assessments with your Asana projects and tasks",
      status: "Coming soon",
      features: ["Risk tasks", "Custom fields", "Automated workflows"],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="#FC636B" stroke="none">
          <path d="M19.779 10.904c-1.784-1.776-4.744-1.776-6.528 0a3.755 3.755 0 0 0-.761 4.383l.112.215a3.593 3.593 0 0 0 3.112 1.78 3.592 3.592 0 0 0 3.113-1.78l.111-.215a3.753 3.753 0 0 0-.76-4.383zm-15.039 0a3.756 3.756 0 0 0 7.505.432 3.756 3.756 0 0 0-7.505-.432z" />
        </svg>
      )
    },
    {
      name: "Microsoft Project",
      description: "Enrich MS Project plans with risk data and mitigation strategies",
      status: "Coming soon",
      features: ["Risk views", "Timeline integration", "Microsoft 365 sharing"],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="#217346" stroke="none">
          <path d="M22 6V18H6V6H22ZM24 4H4V20H24V4ZM0 2V22H2V2H0ZM9 14.18V9.09L12.25 11.64L15.5 9.09V14.18H16.5V8L12.25 11.25L8 8V14.18H9Z" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header title="RiskPredict" />
      
      <main className="pt-[calc(var(--header-height)+2rem)] pb-16 px-6">
        {/* Center-aligned container with fixed width */}
        <div className="max-w-5xl mx-auto">
          {/* Hero section */}
          <section className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Project Management Integrations</h1>
            <p className="text-lg opacity-70 max-w-5xl">
              Connect RiskPredict with your favorite project management tools to make risk assessment an integrated part of your workflow
            </p>
          </section>
          
          {/* Integrations grid */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Upcoming Integrations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {integrations.map((integration, index) => (
                <div 
                  key={index} 
                  className="vercel-card p-6 flex flex-col hover:shadow-md transition-shadow border border-transparent hover:border-[var(--border)]"
                >
                  <div className="flex items-center mb-4">
                    <div className="mr-4">
                      {integration.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{integration.name}</h3>
                      <span className="inline-block text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                        {integration.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm mb-4 opacity-80">{integration.description}</p>
                  <h4 className="text-sm font-medium mb-2">Key Features</h4>
                  <ul className="text-sm space-y-1 mb-4">
                    {integration.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-green-500 mr-2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6L9 17l-5-5"></path>
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="vercel-button-secondary mt-auto" disabled>
                    Join Waitlist
                  </button>
                </div>
              ))}
            </div>
          </section>
          
          {/* Benefits section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Why Integrate?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[var(--secondary)]/50 p-5 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-purple-100/20 dark:bg-purple-900/20 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-purple-600 dark:text-purple-400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.1 2.182L9.766 2 6 3.273 2.234 2 1.9 2.182 2 5.818l-1 7.454.234.546L6 15l4.766-1.182.234-.546-1-7.454.1-3.636z"></path>
                    <path d="M14.1 2.182L13.766 2 10 3.273 6.234 2 5.9 2.182 6 5.818l-1 7.454.234.546L10 15l4.766-1.182.234-.546-1-7.454.1-3.636z" transform="translate(8 5)"></path>
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">Single Source of Truth</h3>
                <p className="text-sm opacity-70">No more duplicate data entry or switching between tools. Keep your risk assessments connected to your tasks.</p>
              </div>
              
              <div className="bg-[var(--secondary)]/50 p-5 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-blue-100/20 dark:bg-blue-900/20 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-blue-600 dark:text-blue-400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">Team Collaboration</h3>
                <p className="text-sm opacity-70">Share risk insights with your entire team, directly in the tools they already use daily.</p>
              </div>
              
              <div className="bg-[var(--secondary)]/50 p-5 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-green-100/20 dark:bg-green-900/20 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-green-600 dark:text-green-400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M16 12l-4 4-4-4"></path>
                    <path d="M12 8v8"></path>
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">Automated Workflows</h3>
                <p className="text-sm opacity-70">Create tasks, tickets, or cards automatically based on risk assessments and mitigation strategies.</p>
              </div>
            </div>
          </section>
          
          {/* Notify me section */}
          <section className="bg-[var(--secondary)]/30 p-8 rounded-lg border border-[var(--border)]/50">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Get Early Access</h2>
              <p className="mb-6 opacity-70">
                Be the first to know when these integrations launch. We'll notify you when your favorite tool is ready.
              </p>
              
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-4">
                <input
                  type="email"
                  value={notifyEmail}
                  onChange={(e) => setNotifyEmail(e.target.value)}
                  className="vercel-input flex-grow"
                  placeholder="Enter your email address"
                  required
                />
                <button 
                  type="submit"
                  className="vercel-button-primary w-30"
                  disabled={submitted}
                >
                  {submitted ? "Thank you!" : "Notify Me"}
                </button>
              </form>
              
              <p className="text-xs mt-4 opacity-50">
                We'll only use your email to send integration updates. No spam, we promise.
              </p>
            </div>
          </section>

          {/* Custom integration request */}
          <section className="mt-16 text-center">
            <h2 className="text-xl font-bold mb-4">Need a Custom Integration?</h2>
            <p className="mb-6 opacity-70 max-w-5xl">
              Don't see your tool of choice? We're constantly expanding our integration options.
            </p>
            <Link href="/contact" className="vercel-button-secondary inline-block">
              Request an Integration
            </Link>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
