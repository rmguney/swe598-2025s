"use client";

import Header from "./Header";

export default function PageLayout({ 
  children,
  title = "Risk Analyzer",
  showHomeLink = false
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header title={title} showHomeLink={showHomeLink} />
      
      <main className="pt-[calc(var(--header-height)+2rem)] pb-16 px-6 flex-1">
        <div className="max-w-vercel mx-auto space-y-8 relative">
          {children}
        </div>
      </main>
    </div>
  );
}
