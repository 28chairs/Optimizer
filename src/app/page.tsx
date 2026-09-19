"use client";

import { useState } from "react";
import { CalculatorForm } from "@/components/CalculatorForm";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { ScenarioComparison } from "@/components/ScenarioComparison";
import { Checklist } from "@/components/Checklist";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import {
  calculateOptimalElections,
  type CalculatorInputs,
  type CalculatorResult,
} from "@/lib/calculator";
import { IRS_LIMITS_2026, IRS_CITATIONS } from "@/lib/constants";

export default function Home() {
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const handleCalculate = (inputs: CalculatorInputs) => {
    const calculationResult = calculateOptimalElections(inputs);
    setResult(calculationResult);

    // Scroll to results on mobile
    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
          Open Enrollment
          <span className="block text-blue-600">Money Optimizer</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-gray-600">
          Find the optimal mix of HSA, Health FSA, and Dependent Care FSA
          contributions to maximize your federal tax savings for the 2026
          benefits year.
        </p>
      </section>

      {/* Disclaimer Banner */}
      <section className="mb-8">
        <DisclaimerBanner />
      </section>

      {/* Main Content */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Calculator Form */}
        <section>
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Your Information
            </h2>
            <CalculatorForm onCalculate={handleCalculate} />
          </div>

          {/* IRS Limits Reference */}
          <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">
              2026 IRS Limits
            </h3>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
              <dt className="text-gray-500">HSA (Self-only)</dt>
              <dd className="text-gray-900 font-medium">
                ${IRS_LIMITS_2026.HSA_SELF_ONLY.toLocaleString()}
              </dd>
              <dt className="text-gray-500">HSA (Family)</dt>
              <dd className="text-gray-900 font-medium">
                ${IRS_LIMITS_2026.HSA_FAMILY.toLocaleString()}
              </dd>
              <dt className="text-gray-500">HSA Catch-up (55+)</dt>
              <dd className="text-gray-900 font-medium">
                +${IRS_LIMITS_2026.HSA_CATCH_UP_55_PLUS.toLocaleString()}
              </dd>
              <dt className="text-gray-500">Health FSA</dt>
              <dd className="text-gray-900 font-medium">
                ${IRS_LIMITS_2026.HEALTH_FSA_LIMIT.toLocaleString()}
              </dd>
              <dt className="text-gray-500">FSA Carryover</dt>
              <dd className="text-gray-900 font-medium">
                ${IRS_LIMITS_2026.HEALTH_FSA_MAX_CARRYOVER.toLocaleString()}
              </dd>
              <dt className="text-gray-500">Dependent Care FSA</dt>
              <dd className="text-gray-900 font-medium">
                ${IRS_LIMITS_2026.DEPENDENT_CARE_FSA_DEFAULT.toLocaleString()}*
              </dd>
            </dl>
            <p className="mt-3 text-xs text-gray-500">
              Sources: {IRS_CITATIONS.HSA}, {IRS_CITATIONS.HEALTH_FSA}
              <br />
              *Dependent Care: {IRS_CITATIONS.DEPENDENT_CARE}
            </p>
          </div>
        </section>

        {/* Results Section */}
        <section id="results">
          {result ? (
            <div className="space-y-6">
              <ResultsDisplay
                recommended={result.recommended}
                isEligibleForHSA={result.isEligibleForHSA}
                maxHSAContribution={result.maxHSAContribution}
                maxHealthFSA={result.maxHealthFSA}
                maxDependentCareFSA={result.maxDependentCareFSA}
              />

              <Checklist items={result.checklist} warnings={result.warnings} />

              <ScenarioComparison
                scenarios={result.scenarios}
                recommendedId={result.recommended.id}
                isEligibleForHSA={result.isEligibleForHSA}
              />

              <DisclaimerBanner compact />
            </div>
          ) : (
            <div className="rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center h-full flex items-center justify-center min-h-[300px]">
              <div className="mx-auto max-w-sm">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  Your Results Will Appear Here
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Fill out the form and click &quot;Calculate My Optimal Elections&quot;
                  to see personalized recommendations.
                </p>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Value Props */}
      <section className="mt-16 grid gap-8 sm:grid-cols-3">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
            <svg
              className="h-6 w-6 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="mt-4 font-semibold text-gray-900">Tax Savings</h3>
          <p className="mt-2 text-sm text-gray-500">
            See exactly how much you can save on federal taxes with optimal
            elections.
          </p>
        </div>
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-6 w-6 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="mt-4 font-semibold text-gray-900">2026 IRS Limits</h3>
          <p className="mt-2 text-sm text-gray-500">
            Up-to-date contribution limits from IRS Rev. Proc. 2025-19 and
            2025-32.
          </p>
        </div>
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
            <svg
              className="h-6 w-6 text-purple-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h3 className="mt-4 font-semibold text-gray-900">Private</h3>
          <p className="mt-2 text-sm text-gray-500">
            All calculations happen in your browser. No data leaves your device.
          </p>
        </div>
      </section>
    </div>
  );
}
