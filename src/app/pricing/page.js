"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState("yearly");

  // Pricing data
  const pricingPlans = [
    {
      name: "Basic",
      description: "For small teams and simple projects",
      price: {
        monthly: 39,
        yearly: 29,
      },
      features: [
        "Up to 3 projects",
        "Basic risk analysis",
        "Email notifications",
        "Standard reports",
        "7-day data history"
      ],
      cta: "Start Free Trial",
      highlighted: false
    },
    {
      name: "Professional",
      description: "For growing teams with complex projects",
      price: {
        monthly: 89,
        yearly: 69,
      },
      features: [
        "Up to 15 projects",
        "Advanced risk prediction",
        "Real-time notifications",
        "Custom dashboards",
        "30-day data history",
        "API access",
        "Priority support"
      ],
      cta: "Start Free Trial",
      highlighted: true
    },
    {
      name: "Enterprise",
      description: "For organizations with mission-critical projects",
      price: {
        monthly: 199,
        yearly: 159,
      },
      features: [
        "Unlimited projects",
        "Advanced AI risk modeling",
        "Custom integrations",
        "Dedicated success manager",
        "99.9% uptime SLA",
        "Unlimited data history",
        "SSO & advanced security",
        "Custom training sessions"
      ],
      cta: "Contact Sales",
      highlighted: false
    }
  ];

  // Feature comparison data
  const comparisonFeatures = [
    {
      name: "Projects",
      basic: "Up to 3",
      pro: "Up to 15",
      enterprise: "Unlimited"
    },
    {
      name: "Team members",
      basic: "2",
      pro: "10",
      enterprise: "Unlimited"
    },
    {
      name: "Risk analysis depth",
      basic: "Basic",
      pro: "Advanced",
      enterprise: "Enterprise-grade"
    },
    {
      name: "Integration options",
      basic: "Limited",
      pro: "Standard",
      enterprise: "Custom"
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header />
      
      <main className="pt-[calc(var(--header-height)+2rem)] pb-16 px-6">
        {/* Center-aligned container with fixed width */}
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          {/* Hero section - properly centered */}
          <section className="text-center mb-16 w-full">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Simple, Transparent Pricing</h1>
            <p className="text-lg opacity-70 mx-auto text-center">
              Choose the plan that works best for your team and project needs
            </p>
            
            {/* Billing toggle - with fixed contrast */}
            <div className="inline-flex items-center bg-[var(--secondary)] rounded-full p-1 my-4 mx-auto">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  billingCycle === "monthly" 
                    ? "bg-[var(--primary)] text-[var(--primary-foreground)] font-medium"
                    : "text-[var(--foreground)] opacity-70"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  billingCycle === "yearly" 
                    ? "bg-[var(--primary)] text-[var(--primary-foreground)] font-medium"
                    : "text-[var(--foreground)] opacity-70"
                }`}
              >
                Yearly <span className="text-green-500">-20%</span>
              </button>
            </div>
          </section>

          {/* Pricing cards */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 w-full">
            {pricingPlans.map((plan, i) => (
              <div 
                key={i} 
                className={`relative rounded-xl overflow-hidden transition-all flex flex-col h-full ${
                  plan.highlighted 
                    ? "shadow-lg border-2 border-violet-900 -translate-y-2" 
                    : "border border-[var(--border)] hover:shadow-md hover:-translate-y-1"
                }`}
              >
                {plan.highlighted && (
                  <div className="bg-violet-900 text-center py-1.5 text-white text-sm font-medium">
                    Most Popular
                  </div>
                )}
                
                <div className="p-6 bg-[var(--card)] flex flex-col flex-grow">
                  <div className="mb-5">
                    <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                    <p className="text-sm opacity-70">{plan.description}</p>
                  </div>
                  
                  <div className="flex items-baseline mb-5">
                    <span className="text-3xl font-bold">${plan.price[billingCycle]}</span>
                    <span className="text-sm opacity-70 ml-1">/mo</span>
                  </div>
                  
                  <ul className="space-y-3 mb-6 flex-grow">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  {/* Button with proper contrast */}
                  <button 
                    className={`w-full py-2 px-4 rounded-md font-medium transition-colors mt-auto ${
                      plan.highlighted
                        ? "bg-violet-600 hover:bg-violet-700 text-white"
                        : "bg-[var(--primary)] hover:bg-opacity-90 text-[var(--primary-foreground)]"
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            ))}
          </section>

          {/* Feature comparison */}
          <section className="mb-16 w-full">
            <h2 className="text-2xl font-bold mb-6 text-center">Compare Features</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-4 px-4 font-semibold">Feature</th>
                    <th className="text-center py-4 px-4 font-semibold">Basic</th>
                    <th className="text-center py-4 px-4 font-semibold bg-blue-50 dark:bg-violet-900/10">Professional</th>
                    <th className="text-center py-4 px-4 font-semibold">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((feature, i) => (
                    <tr key={i} className="border-b border-[var(--border)]">
                      <td className="py-4 px-4 font-medium">{feature.name}</td>
                      <td className="text-center py-4 px-4">{feature.basic}</td>
                      <td className="text-center py-4 px-4 bg-blue-50 dark:bg-violet-900/5">{feature.pro}</td>
                      <td className="text-center py-4 px-4">{feature.enterprise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-16 w-full">
            <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="border border-[var(--border)] rounded-lg overflow-hidden bg-[var(--card)]">
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer p-4">
                    <h3 className="font-medium">How does the free trial work?</h3>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="p-4 pt-0 text-sm opacity-70">
                    Our free trial gives you full access to all features for 14 days with no credit card required. At the end of your trial, you can choose to continue with a paid plan or downgrade to our limited free tier.
                  </div>
                </details>
              </div>
              
              <div className="border border-[var(--border)] rounded-lg overflow-hidden bg-[var(--card)]">
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer p-4">
                    <h3 className="font-medium">Can I change plans later?</h3>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="p-4 pt-0 text-sm opacity-70">
                    Yes, you can upgrade or downgrade your plan at any time. When you upgrade, the changes take effect immediately with prorated billing for the remainder of the cycle. Downgrades take effect at the next billing date.
                  </div>
                </details>
              </div>
              
              <div className="border border-[var(--border)] rounded-lg overflow-hidden bg-[var(--card)]">
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer p-4">
                    <h3 className="font-medium">Do you offer discounts?</h3>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="p-4 pt-0 text-sm opacity-70">
                    We offer special pricing for educational institutions, non-profits, and startups. Contact our sales team to learn more about our discount programs.
                  </div>
                </details>
              </div>
            </div>
          </section>

          {/* CTA Section - properly centered */}
          <section className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-[var(--border)] dark:from-neutral-900/20 dark:to-neutral-900/50 rounded-xl p-8 text-center w-full">
            <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
            <p className="opacity-70 mb-6 max-w-4xl text-center">
              Our team is ready to help you find the perfect plan for your needs and answer any questions.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/contact" className="bg-[var(--primary)] text-[var(--primary-foreground)] px-6 py-2.5 rounded-md font-medium hover:opacity-90 transition-opacity">
                Contact Sales
              </Link>
              <button className="border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] px-6 py-2.5 rounded-md font-medium hover:bg-[var(--secondary)] transition-colors">
                Schedule a Demo
              </button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
