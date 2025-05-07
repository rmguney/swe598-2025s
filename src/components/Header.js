"use client";

import Link from "next/link";

export default function Header({ title = "RiskPredict", showHomeLink = false }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white dark:bg-black border-b border-[var(--border)] h-[var(--header-height)] vercel-header">
      <div className="max-w-vercel mx-auto px-6 h-full flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="font-bold tracking-tight text-lg hover:opacity-80 transition-opacity">
            {title}
          </Link>
        </div>
        
        <div className="flex items-center gap-5">
          {showHomeLink && (
            <Link href="/" className="text-sm hover:opacity-70 transition-opacity">
              Home
            </Link>
          )}
          
          <Link href="/risk-analysis" className="text-sm hover:opacity-70 transition-opacity">
            Analyzer
          </Link>
          
          <Link href="/settings" className="text-sm hover:opacity-70 transition-opacity">
            Settings
          </Link>

          <Link href="/integrations" className="text-sm hover:opacity-70 transition-opacity">
            Integrations
          </Link>
          
          <Link href="/pricing" className="text-sm hover:opacity-70 transition-opacity">
            Pricing
          </Link>
 
          <a 
            href="https://github.com/rmguney/swe598-2025s" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm hover:opacity-70 transition-opacity"
          >
            GitHub
          </a>
        </div>
      </div>
    </header>
  );
}
