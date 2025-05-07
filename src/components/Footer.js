import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  
  // Hide footer on AI Model page
  if (pathname === "/ai-model") {
    return null;
  }
  
  return (
    <footer className="bg-neutral-950 border-t border-[var(--border)] mt-8">
      <div className="max-w-vercel mx-auto px-4 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {/* Company Info */}
          <div>
            <h3 className="font-semibold text-sm mb-2">RiskPredict</h3>
            <p className="text-xs opacity-70 mb-4">
              AI-powered risk prediction.
            </p>
            <div className="flex space-x-3 mt-3">
              {/* Social Icons - simplified */}
              <a href="https://twitter.com" className="text-[var(--foreground)] hover:text-blue-500 transition-all" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="https://linkedin.com" className="text-[var(--foreground)] hover:text-blue-700 transition-all" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="https://github.com" className="text-[var(--foreground)] hover:text-gray-600 dark:hover:text-white transition-all" aria-label="GitHub">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold text-xs mb-2">Product</h4>
            <ul className="space-y-1">
              <li><Link href="/risk-analysis" className="text-xs opacity-70 hover:opacity-100 transition-all">Risk Analysis</Link></li>
              <li><Link href="/pricing" className="text-xs opacity-70 hover:opacity-100 transition-all">Pricing</Link></li>
              <li><Link href="/demo" className="text-xs opacity-70 hover:opacity-100 transition-all">Demo</Link></li>
              <li><Link href="/integrations" className="text-xs opacity-70 hover:opacity-100 transition-all">Integrations</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-xs mb-2">Resources</h4>
            <ul className="space-y-1">
              <li><Link href="/blog" className="text-xs opacity-70 hover:opacity-100 transition-all">Blog</Link></li>
              <li><Link href="/documentation" className="text-xs opacity-70 hover:opacity-100 transition-all">Docs</Link></li>
              <li><Link href="/support" className="text-xs opacity-70 hover:opacity-100 transition-all">Support</Link></li>
              <li><Link href="/api" className="text-xs opacity-70 hover:opacity-100 transition-all">API</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-xs mb-2">Company</h4>
            <ul className="space-y-1">
              <li><Link href="/about" className="text-xs opacity-70 hover:opacity-100 transition-all">About</Link></li>
              <li><Link href="/careers" className="text-xs opacity-70 hover:opacity-100 transition-all">Careers</Link></li>
              <li><Link href="/privacy" className="text-xs opacity-70 hover:opacity-100 transition-all">Privacy</Link></li>
              <li><Link href="/terms" className="text-xs opacity-70 hover:opacity-100 transition-all">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[var(--border)]/60 mt-4 pt-4 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs opacity-70">
            © {new Date().getFullYear()} RiskPredict
          </p>
        </div>
      </div>
    </footer>
  );
}
