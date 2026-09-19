"use client";

import { formatCurrency, type Scenario } from "@/lib/calculator";

interface ScenarioComparisonProps {
  scenarios: Scenario[];
  recommendedId: string;
  isEligibleForHSA: boolean;
}

export function ScenarioComparison({
  scenarios,
  recommendedId,
  isEligibleForHSA,
}: ScenarioComparisonProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Compare Scenarios
      </h3>
      <div className="grid gap-4 sm:grid-cols-3">
        {scenarios.map((scenario) => {
          const isRecommended = scenario.id === recommendedId;

          return (
            <div
              key={scenario.id}
              className={`rounded-lg border p-4 ${
                isRecommended
                  ? "border-blue-300 bg-blue-50 ring-2 ring-blue-500"
                  : "border-gray-200 bg-white"
              }`}
            >
              {isRecommended && (
                <span className="inline-block mb-2 rounded-full bg-blue-600 px-2 py-0.5 text-xs font-medium text-white">
                  Recommended
                </span>
              )}
              <h4 className="font-semibold text-gray-900">{scenario.name}</h4>
              <p className="text-xs text-gray-500 mt-1 mb-3">
                {scenario.description}
              </p>

              <div className="space-y-2 text-sm">
                {isEligibleForHSA ? (
                  <div className="flex justify-between">
                    <span className="text-gray-600">HSA</span>
                    <span className="font-medium text-gray-900">
                      {formatCurrency(scenario.hsaElection)}
                    </span>
                  </div>
                ) : (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Health FSA</span>
                    <span className="font-medium text-gray-900">
                      {formatCurrency(scenario.healthFSAElection)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Dependent Care</span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(scenario.dependentCareFSAElection)}
                  </span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-gray-600">Tax Savings</span>
                  <span className="text-lg font-bold text-green-700">
                    {formatCurrency(scenario.totalTaxSavings)}
                  </span>
                </div>
                {scenario.forfeitureRisk > 0 && (
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-500">Forfeiture Risk</span>
                    <span
                      className={`text-xs font-medium ${
                        scenario.forfeitureRiskLevel === "high"
                          ? "text-red-600"
                          : scenario.forfeitureRiskLevel === "medium"
                          ? "text-amber-600"
                          : "text-gray-600"
                      }`}
                    >
                      {formatCurrency(scenario.forfeitureRisk)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
