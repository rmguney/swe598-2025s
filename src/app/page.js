"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  const videoRef = useRef(null);
  const [showVideoModal, setShowVideoModal] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5; // Slowing down the video more
    }
  }, []);

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col">
      <Header />
      
      <main className="pt-[calc(var(--header-height))] pb-16 px-6 relative flex-grow">
        {/* Video Background - only in hero section, vertically centered */}
        <div className="absolute top-[var(--header-height)] left-0 w-full h-[50vh] overflow-hidden">
          <video 
            ref={videoRef}
            className="absolute w-full h-full object-cover object-center"
            src="/animation.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          {/* Overlay with dark top and vanishing vignette at bottom */}
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--background)] to-transparent"></div>
        </div>
      
        <div className="max-w-vercel mx-auto">
          {/* Video placeholder - creates space for the video */}
          <div className="h-[50vh]"></div>
          
          {/* Content starts here - after video */}
          <div className="space-y-8 relative z-20 -mt-10">
            {/* Hero section with enhanced styling */}
            <div className="w-full flex flex-col items-center text-center space-y-4">
              <p className="text-base opacity-70 max-w-3xl">
                Transform your project management with AI-powered risk prediction and proactive mitigation strategies
              </p>
              
              {/* Buttons container */}
              <div className="flex flex-wrap gap-4 mt-4 justify-center">
                <Link
                  href="/risk-analysis"
                  className="vercel-button-primary px-6 py-2 group cursor-pointer"
                >
                  <span>Try for Free</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 group-hover:translate-x-0.5 transition-transform">
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </Link>
                
                <button
                  onClick={() => setShowVideoModal(true)}
                  className="vercel-button-secondary px-6 py-2 group cursor-pointer flex items-center"
                >
                  <span>Watch Promo</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </button>
              </div>
            </div>

            {/* Feature cards with enhanced styling */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
              {/* Existing feature cards */}
              <div className="vercel-card p-4 flex flex-col hover:shadow-md transition-shadow border border-transparent hover:border-[var(--border)] bg-[var(--card)]">
                <div className="flex items-start">
                  <div className="mr-3 p-1.5 rounded-full bg-blue-100/20 dark:bg-blue-900/30">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 16v-4"></path>
                      <path d="M12 8h.01"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">Real-time Risk Prediction</h3>
                    <p className="opacity-70 text-xs mt-0.5">AI-powered analysis of project data and external factors to predict risks before they occur.</p>
                  </div>
                </div>
              </div>
              
              <div className="vercel-card p-4 flex flex-col hover:shadow-md transition-shadow border border-transparent hover:border-[var(--border)] bg-[var(--card)]">
                <div className="flex items-start">
                  <div className="mr-3 p-1.5 rounded-full bg-green-100/20 dark:bg-green-900/30">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 20h.01"></path>
                      <path d="M7 20v-4"></path>
                      <path d="M12 20v-8"></path>
                      <path d="M17 20v-6"></path>
                      <path d="M22 20V8"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">Proactive Mitigation</h3>
                    <p className="opacity-70 text-xs mt-0.5">Get actionable insights and strategies to prevent risks from impacting your projects.</p>
                  </div>
                </div>
              </div>
              
              <div className="vercel-card p-4 flex flex-col hover:shadow-md transition-shadow border border-transparent hover:border-[var(--border)] bg-[var,--card)]">
                <div className="flex items-start">
                  <div className="mr-3 p-1.5 rounded-full bg-amber-100/20 dark:bg-amber-900/30">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                      <path d="m9 12 2 2 4-4"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">Seamless Integration</h3>
                    <p className="opacity-70 text-xs mt-0.5">Works with your existing project management tools like Jira and Trello.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Additional feature showcase section */}
            <div className="mt-12 pt-8 border-t border-[var(--border)]/60">
              <h2 className="text-2xl font-bold mb-6 text-center">Advanced Risk Management Features</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Additional card 1 */}
                <div className="vercel-card p-6 hover:shadow-md transition-shadow border border-transparent hover:border-[var(--border)] bg-[var,--card)]">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-100/20 dark:bg-indigo-900/30 flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313-12.454z"></path>
                        <path d="m17 4 2 2"></path>
                        <path d="m19 2 2 2"></path>
                        <path d="m15 6 2 2"></path>
                        <path d="m17 4 2 2"></path>
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold">24/7 Risk Monitoring</h3>
                  </div>
                  <p className="opacity-70 text-sm">Continuous monitoring of project metrics and market conditions to detect emerging risks before they impact your project timeline or budget.</p>
                  <div className="mt-4 pt-4 border-t border-[var(--border)]/50 flex justify-between items-center">
                    <span className="text-xs opacity-70">Get real-time alerts</span>
                    <div className="flex items-center text-xs text-blue-600 dark:text-blue-400 font-medium">
                      <span>Learn more</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Additional card 2 */}
                <div className="vercel-card p-6 hover:shadow-md transition-shadow border border-transparent hover:border-[var(--border)] bg-[var,--card)]">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-pink-100/20 dark:bg-pink-900/30 flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 3v18h18"></path>
                        <path d="M18 12.22 15 15l-5-5-3 3"></path>
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold">Predictive Analytics</h3>
                  </div>
                  <p className="opacity-70 text-sm">Leverage machine learning algorithms to identify patterns from past projects and predict potential roadblocks before they occur.</p>
                  <div className="mt-4 pt-4 border-t border-[var(--border)]/50 flex justify-between items-center">
                    <span className="text-xs opacity-70">85% accuracy rate</span>
                    <div className="flex items-center text-xs text-blue-600 dark:text-blue-400 font-medium">
                      <span>Learn more</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Testimonial Section */}
            <div className="mt-12 pt-8 border-t border-[var(--border)]/60">
              <h2 className="text-2xl font-bold mb-6 text-center">What Our Clients Say</h2>
              
              <div className="vercel-card p-6 hover:shadow-md transition-shadow border border-transparent hover:border-[var(--border)] bg-[var,--card)]">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-4 text-white font-bold">
                    TC
                  </div>
                  <div>
                    <h4 className="font-medium">Thomas Chen</h4>
                    <p className="text-xs opacity-70">Project Manager, Global Tech Solutions</p>
                  </div>
                </div>
                <blockquote className="text-sm italic opacity-80 mb-4">
                  "RiskPredict has transformed how we manage project uncertainties. The AI-powered insights helped us identify potential issues weeks before they would have impacted our timeline, saving us thousands of dollars and countless hours."
                </blockquote>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#FFD700" stroke="#FFD700" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Why Choose RiskPredict section - updated for consistency */}
            <div className="mt-12 pt-8 border-t border-[var(--border)]/60">
              <h2 className="text-2xl font-bold mb-6 text-center">Why Choose RiskPredict?</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="vercel-card p-6 hover:shadow-md transition-shadow border border-transparent hover:border-[var(--border)] bg-[var,--card)]">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100/20 dark:bg-blue-900/30 flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="2" y1="12" x2="22" y2="12"></line>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold">Global Risk Factors Database</h3>
                  </div>
                  <p className="opacity-70 text-sm">Access to industry-specific risk knowledge and historical data to improve prediction accuracy.</p>
                </div>
                
                <div className="vercel-card p-6 hover:shadow-md transition-shadow border border-transparent hover:border-[var(--border)] bg-[var,--card)]">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-green-100/20 dark:bg-green-900/30 flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold">Continuous Learning</h3>
                  </div>
                  <p className="opacity-70 text-sm">Our AI model learns from your project history to deliver increasingly accurate predictions over time.</p>
                </div>
                
                <div className="vercel-card p-6 hover:shadow-md transition-shadow border border-transparent hover:border-[var(--border)] bg-[var,--card)]">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-purple-100/20 dark:bg-purple-900/30 flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="9" y1="3" x2="9" y2="21"></line>
                        <line x1="15" y1="3" x2="15" y2="21"></line>
                        <line x1="3" y1="9" x2="21" y2="9"></line>
                        <line x1="3" y1="15" x2="21" y2="15"></line>
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold">Customizable Dashboards</h3>
                  </div>
                  <p className="opacity-70 text-sm">Create tailored views for different stakeholders and project management needs.</p>
                </div>
                
                <div className="vercel-card p-6 hover:shadow-md transition-shadow border border-transparent hover:border-[var(--border)] bg-[var,--card)]">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-amber-100/20 dark:bg-amber-900/30 flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold">Comprehensive Reporting</h3>
                  </div>
                  <p className="opacity-70 text-sm">Generate detailed reports for stakeholders with visual representations of risk assessments and mitigation status.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Video Modal - Using correct promo video */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[var(--card)] rounded-lg overflow-hidden max-w-4xl w-full relative">
            <button 
              className="absolute top-3 right-3 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full p-2 text-white transition-colors z-10"
              onClick={() => setShowVideoModal(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <video 
              className="w-full aspect-video"
              src="/promo.mp4"
              controls
              autoPlay
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
