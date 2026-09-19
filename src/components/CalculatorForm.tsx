"use client";

import { useState, useCallback } from "react";
import {
  FILING_STATUSES,
  FEDERAL_TAX_BRACKETS,
  FSA_ROLLOVER_OPTIONS,
  IRS_LIMITS_2026,
  type FilingStatus,
  type FSARolloverType,
} from "@/lib/constants";
import type { CalculatorInputs } from "@/lib/calculator";

interface CalculatorFormProps {
  onCalculate: (inputs: CalculatorInputs) => void;
}

export function CalculatorForm({ onCalculate }: CalculatorFormProps) {
  const [filingStatus, setFilingStatus] = useState<FilingStatus>("single");
  const [marginalTaxRate, setMarginalTaxRate] = useState<number>(0.22);
  const [customTaxRate, setCustomTaxRate] = useState("");
  const [useCustomRate, setUseCustomRate] = useState(false);
  const [expectedMedicalSpend, setExpectedMedicalSpend] = useState("2000");
  const [expectedDependentCareSpend, setExpectedDependentCareSpend] = useState("0");
  const [hasHDHP, setHasHDHP] = useState(true);
  const [coverageType, setCoverageType] = useState<"self" | "family">("self");
  const [isAge55Plus, setIsAge55Plus] = useState(false);
  const [employerHSAContribution, setEmployerHSAContribution] = useState("0");
  const [fsaRolloverType, setFsaRolloverType] = useState<FSARolloverType>("carryover");

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      const effectiveTaxRate = useCustomRate
        ? parseFloat(customTaxRate) / 100
        : marginalTaxRate;

      onCalculate({
        filingStatus,
        marginalTaxRate: isNaN(effectiveTaxRate) ? 0.22 : effectiveTaxRate,
        expectedMedicalSpend: parseFloat(expectedMedicalSpend) || 0,
        expectedDependentCareSpend: parseFloat(expectedDependentCareSpend) || 0,
        hasHDHP,
        coverageType,
        isAge55Plus,
        employerHSAContribution: parseFloat(employerHSAContribution) || 0,
        fsaRolloverType,
      });
    },
    [
      filingStatus,
      marginalTaxRate,
      customTaxRate,
      useCustomRate,
      expectedMedicalSpend,
      expectedDependentCareSpend,
      hasHDHP,
      coverageType,
      isAge55Plus,
      employerHSAContribution,
      fsaRolloverType,
      onCalculate,
    ]
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Filing Status */}
      <div>
        <label
          htmlFor="filingStatus"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Filing Status
        </label>
        <select
          id="filingStatus"
          value={filingStatus}
          onChange={(e) => setFilingStatus(e.target.value as FilingStatus)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
        >
          {FILING_STATUSES.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
      </div>

      {/* Tax Rate */}
      <div>
        <label
          htmlFor="taxRate"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Marginal Federal Tax Rate
        </label>
        <div className="space-y-3">
          <select
            id="taxRate"
            value={useCustomRate ? "custom" : marginalTaxRate.toString()}
            onChange={(e) => {
              if (e.target.value === "custom") {
                setUseCustomRate(true);
              } else {
                setUseCustomRate(false);
                setMarginalTaxRate(parseFloat(e.target.value));
              }
            }}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
          >
            {FEDERAL_TAX_BRACKETS.map((bracket) => (
              <option key={bracket.rate} value={bracket.rate}>
                {bracket.label} — {bracket.description}
              </option>
            ))}
            <option value="custom">Enter custom rate...</option>
          </select>
          {useCustomRate && (
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={customTaxRate}
                onChange={(e) => setCustomTaxRate(e.target.value)}
                placeholder="e.g., 25"
                min="0"
                max="50"
                step="0.1"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              />
              <span className="text-gray-600">%</span>
            </div>
          )}
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Your highest tax bracket. Check your most recent tax return.
        </p>
      </div>

      {/* Expected Medical Spend */}
      <div>
        <label
          htmlFor="medicalSpend"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Expected Unreimbursed Medical Expenses (2026)
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
            $
          </span>
          <input
            id="medicalSpend"
            type="number"
            value={expectedMedicalSpend}
            onChange={(e) => setExpectedMedicalSpend(e.target.value)}
            min="0"
            step="100"
            className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
          />
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Include prescriptions, copays, dental, vision, and out-of-pocket costs.
        </p>
      </div>

      {/* Expected Dependent Care Spend */}
      <div>
        <label
          htmlFor="dependentCareSpend"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Expected Dependent Care Expenses (2026)
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
            $
          </span>
          <input
            id="dependentCareSpend"
            type="number"
            value={expectedDependentCareSpend}
            onChange={(e) => setExpectedDependentCareSpend(e.target.value)}
            min="0"
            step="100"
            className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
          />
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Daycare, after-school care, summer camps, or elder care that enables you
          to work.
        </p>
      </div>

      {/* HDHP Coverage */}
      <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
        <div>
          <span className="block text-sm font-medium text-gray-700 mb-3">
            Are you enrolled in a High-Deductible Health Plan (HDHP)?
          </span>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="hdhp"
                checked={hasHDHP}
                onChange={() => setHasHDHP(true)}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-900">Yes</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="hdhp"
                checked={!hasHDHP}
                onChange={() => setHasHDHP(false)}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-900">No</span>
            </label>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            HDHP required for HSA eligibility. 2026 min deductible: $
            {IRS_LIMITS_2026.HDHP_MIN_DEDUCTIBLE_SELF.toLocaleString()} (self) / $
            {IRS_LIMITS_2026.HDHP_MIN_DEDUCTIBLE_FAMILY.toLocaleString()} (family).
          </p>
        </div>

        {hasHDHP && (
          <>
            <div>
              <span className="block text-sm font-medium text-gray-700 mb-2">
                Coverage Type
              </span>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="coverage"
                    checked={coverageType === "self"}
                    onChange={() => setCoverageType("self")}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-900">Self-only</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="coverage"
                    checked={coverageType === "family"}
                    onChange={() => setCoverageType("family")}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-900">Family</span>
                </label>
              </div>
            </div>

            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAge55Plus}
                  onChange={(e) => setIsAge55Plus(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Age 55 or older (eligible for $
                  {IRS_LIMITS_2026.HSA_CATCH_UP_55_PLUS.toLocaleString()} catch-up)
                </span>
              </label>
            </div>

            <div>
              <label
                htmlFor="employerHSA"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Employer HSA Contribution (if any)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  $
                </span>
                <input
                  id="employerHSA"
                  type="number"
                  value={employerHSAContribution}
                  onChange={(e) => setEmployerHSAContribution(e.target.value)}
                  min="0"
                  step="100"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Counts toward your annual HSA limit. Check your benefits guide.
              </p>
            </div>
          </>
        )}
      </div>

      {/* FSA Rollover Type */}
      {!hasHDHP && (
        <div>
          <label
            htmlFor="fsaRollover"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Health FSA Rollover Rules
          </label>
          <select
            id="fsaRollover"
            value={fsaRolloverType}
            onChange={(e) => setFsaRolloverType(e.target.value as FSARolloverType)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
          >
            {FSA_ROLLOVER_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label} — {option.description}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-gray-500">
            Check your employer&apos;s plan documents for FSA rollover rules.
          </p>
        </div>
      )}

      <button
        type="submit"
        className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors focus:ring-4 focus:ring-blue-500/50 cursor-pointer"
      >
        Calculate My Optimal Elections
      </button>
    </form>
  );
}
