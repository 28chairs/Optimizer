"use client";

import { formatCurrency, type Scenario } from "@/lib/calculator";

interface ResultsDisplayProps {
  recommended: Scenario;
  isEligibleForHSA: boolean;
  maxHSAContribution: number;
  maxHealthFSA: number;
  maxDependentCareFSA: number;
}

export function ResultsDisplay({
  recommended,
  isEligibleForHSA,
  maxHSAContribution,
  maxHealthFSA,
  maxDependentCareFSA,
}: ResultsDisplayProps) {
  return (
    <div className="rounded-xl border border-green-200 bg-green-50 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
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
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Suggested Starting Point
          </h3>
          <p className="text-sm text-gray-600">{recommended.name}</p>
        </div>
      </div>

      {/* Tax Savings Highlight */}
      <div className="mb-6 rounded-lg bg-white p-4 border border-green-100">
        <p className="text-sm text-gray-600 mb-1">Estimated Federal Tax Savings</p>
        <p className="text-3xl font-bold text-green-700">
          {formatCurrency(recommended.totalTaxSavings)}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Federal: {formatCurrency(recommended.federalTaxSavings)} + FICA:{" "}
          {formatCurrency(recommended.ficaSavings)}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Note: State taxes not included
        </p>
      </div>

      {/* Election Amounts */}
      <div className="space-y-3">
        {isEligibleForHSA && (
          <div className="flex justify-between items-center py-2 border-b border-green-100">
            <div>
              <span className="font-medium text-gray-900">HSA Contribution</span>
              <span className="ml-2 text-xs text-gray-500">
                (max: {formatCurrency(maxHSAContribution)})
              </span>
            </div>
            <span className="text-lg font-semibold text-gray-900">
              {formatCurrency(recommended.hsaElection)}
            </span>
          </div>
        )}

        {!isEligibleForHSA && (
          <div className="flex justify-between items-center py-2 border-b border-green-100">
            <div>
              <span className="font-medium text-gray-900">Health FSA</span>
              <span className="ml-2 text-xs text-gray-500">
                (max: {formatCurrency(maxHealthFSA)})
              </span>
            </div>
            <span className="text-lg font-semibold text-gray-900">
              {formatCurrency(recommended.healthFSAElection)}
            </span>
          </div>
        )}

        <div className="flex justify-between items-center py-2">
          <div>
            <span className="font-medium text-gray-900">Dependent Care FSA</span>
            <span className="ml-2 text-xs text-gray-500">
              (max: {formatCurrency(maxDependentCareFSA)})
            </span>
          </div>
          <span className="text-lg font-semibold text-gray-900">
            {formatCurrency(recommended.dependentCareFSAElection)}
          </span>
        </div>
      </div>

      {/* Forfeiture Risk */}
      {recommended.forfeitureRisk > 0 && (
        <div
          className={`mt-4 rounded-lg p-3 ${
            recommended.forfeitureRiskLevel === "high"
              ? "bg-red-50 border border-red-200"
              : recommended.forfeitureRiskLevel === "medium"
              ? "bg-amber-50 border border-amber-200"
              : "bg-gray-50 border border-gray-200"
          }`}
        >
          <div className="flex items-start gap-2">
            <svg
              className={`h-5 w-5 flex-shrink-0 ${
                recommended.forfeitureRiskLevel === "high"
                  ? "text-red-500"
                  : recommended.forfeitureRiskLevel === "medium"
                  ? "text-amber-500"
                  : "text-gray-500"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <div>
              <p
                className={`text-sm font-medium ${
                  recommended.forfeitureRiskLevel === "high"
                    ? "text-red-800"
                    : recommended.forfeitureRiskLevel === "medium"
                    ? "text-amber-800"
                    : "text-gray-800"
                }`}
              >
                Forfeiture Risk: {formatCurrency(recommended.forfeitureRisk)}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                {recommended.forfeitureRiskLevel === "high"
                  ? "High risk — consider reducing elections"
                  : recommended.forfeitureRiskLevel === "medium"
                  ? "Moderate risk — plan spending carefully"
                  : "Low risk — within reasonable tolerance"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Notes */}
      {recommended.notes.length > 0 && (
        <ul className="mt-4 space-y-1">
          {recommended.notes.map((note, index) => (
            <li key={index} className="text-xs text-gray-600 flex items-start gap-2">
              <span className="text-gray-400">•</span>
              {note}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
