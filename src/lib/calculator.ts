/**
 * HSA/FSA Calculator Engine
 *
 * Calculates optimal HSA, Health FSA, and Dependent Care FSA elections
 * based on user inputs and 2026 IRS limits.
 *
 * Key formulas:
 * - Federal tax savings = election × marginal tax rate
 * - FICA savings = election × 7.65% (both HSA and FSA are exempt from FICA)
 * - Total savings = Federal savings + FICA savings
 *
 * Sources:
 * - IRS Rev. Proc. 2025-19 (HSA/HDHP limits)
 * - IRS Rev. Proc. 2025-32 (FSA limits)
 */

import {
  IRS_LIMITS_2026,
  FICA_RATE,
  type FilingStatus,
  type FSARolloverType,
} from "./constants";

/**
 * Input fields for the calculator
 */
export interface CalculatorInputs {
  filingStatus: FilingStatus;
  marginalTaxRate: number;
  expectedMedicalSpend: number;
  expectedDependentCareSpend: number;
  hasHDHP: boolean;
  coverageType: "self" | "family";
  isAge55Plus: boolean;
  employerHSAContribution: number;
  fsaRolloverType: FSARolloverType;
}

/**
 * A single scenario with elections and outcomes
 */
export interface Scenario {
  id: string;
  name: string;
  description: string;
  hsaElection: number;
  healthFSAElection: number;
  dependentCareFSAElection: number;
  federalTaxSavings: number;
  ficaSavings: number;
  totalTaxSavings: number;
  forfeitureRisk: number;
  forfeitureRiskLevel: "low" | "medium" | "high";
  notes: string[];
}

/**
 * Calculator output with recommendations and scenarios
 */
export interface CalculatorResult {
  isEligibleForHSA: boolean;
  maxHSAContribution: number;
  maxHealthFSA: number;
  maxDependentCareFSA: number;
  recommended: Scenario;
  scenarios: Scenario[];
  warnings: string[];
  checklist: string[];
}

/**
 * Calculate tax savings for a given pre-tax election amount
 */
function calculateTaxSavings(
  amount: number,
  marginalTaxRate: number
): { federal: number; fica: number; total: number } {
  const federal = amount * marginalTaxRate;
  const fica = amount * FICA_RATE;
  return {
    federal: Math.round(federal * 100) / 100,
    fica: Math.round(fica * 100) / 100,
    total: Math.round((federal + fica) * 100) / 100,
  };
}

/**
 * Calculate forfeiture risk based on elections vs expected spending
 */
function calculateForfeitureRisk(
  healthFSAElection: number,
  dependentCareFSAElection: number,
  expectedMedicalSpend: number,
  expectedDependentCareSpend: number,
  fsaRolloverType: FSARolloverType
): { amount: number; level: "low" | "medium" | "high"; notes: string[] } {
  const notes: string[] = [];
  let forfeitureAmount = 0;

  // Health FSA forfeiture calculation
  const healthFSAUnused = Math.max(0, healthFSAElection - expectedMedicalSpend);

  if (healthFSAUnused > 0) {
    if (fsaRolloverType === "use-it-or-lose-it") {
      forfeitureAmount += healthFSAUnused;
      notes.push(
        `Health FSA: $${healthFSAUnused.toLocaleString()} at risk of forfeiture (use-it-or-lose-it)`
      );
    } else if (fsaRolloverType === "carryover") {
      const maxCarryover = IRS_LIMITS_2026.HEALTH_FSA_MAX_CARRYOVER;
      const excessOverCarryover = Math.max(0, healthFSAUnused - maxCarryover);
      if (excessOverCarryover > 0) {
        forfeitureAmount += excessOverCarryover;
        notes.push(
          `Health FSA: $${excessOverCarryover.toLocaleString()} exceeds max carryover ($${maxCarryover})`
        );
      } else if (healthFSAUnused > 0) {
        notes.push(
          `Health FSA: $${healthFSAUnused.toLocaleString()} can carry over (within $${maxCarryover} limit)`
        );
      }
    } else if (fsaRolloverType === "grace-period") {
      notes.push(
        `Health FSA: $${healthFSAUnused.toLocaleString()} can be used in 2.5-month grace period`
      );
    }
  }

  // Dependent Care FSA forfeiture (always use-it-or-lose-it)
  const dcfsaUnused = Math.max(
    0,
    dependentCareFSAElection - expectedDependentCareSpend
  );
  if (dcfsaUnused > 0) {
    forfeitureAmount += dcfsaUnused;
    notes.push(
      `Dependent Care FSA: $${dcfsaUnused.toLocaleString()} at risk (use-it-or-lose-it)`
    );
  }

  // Determine risk level
  let level: "low" | "medium" | "high" = "low";
  if (forfeitureAmount > 500) level = "medium";
  if (forfeitureAmount > 1500) level = "high";

  return { amount: forfeitureAmount, level, notes };
}

/**
 * Build a scenario with calculated values
 */
function buildScenario(
  id: string,
  name: string,
  description: string,
  hsaElection: number,
  healthFSAElection: number,
  dependentCareFSAElection: number,
  inputs: CalculatorInputs
): Scenario {
  const hsaSavings = calculateTaxSavings(hsaElection, inputs.marginalTaxRate);
  const healthFSASavings = calculateTaxSavings(
    healthFSAElection,
    inputs.marginalTaxRate
  );
  const dcfsaSavings = calculateTaxSavings(
    dependentCareFSAElection,
    inputs.marginalTaxRate
  );

  const totalFederal =
    hsaSavings.federal + healthFSASavings.federal + dcfsaSavings.federal;
  const totalFica =
    hsaSavings.fica + healthFSASavings.fica + dcfsaSavings.fica;

  const forfeitureResult = calculateForfeitureRisk(
    healthFSAElection,
    dependentCareFSAElection,
    inputs.expectedMedicalSpend,
    inputs.expectedDependentCareSpend,
    inputs.fsaRolloverType
  );

  const notes: string[] = [...forfeitureResult.notes];

  // Add HSA note about rollover
  if (hsaElection > 0) {
    notes.push("HSA funds never expire and can be invested for retirement");
  }

  return {
    id,
    name,
    description,
    hsaElection,
    healthFSAElection,
    dependentCareFSAElection,
    federalTaxSavings: Math.round(totalFederal * 100) / 100,
    ficaSavings: Math.round(totalFica * 100) / 100,
    totalTaxSavings: Math.round((totalFederal + totalFica) * 100) / 100,
    forfeitureRisk: forfeitureResult.amount,
    forfeitureRiskLevel: forfeitureResult.level,
    notes,
  };
}

/**
 * Main calculator function
 * Generates scenarios and recommends optimal elections
 */
export function calculateOptimalElections(
  inputs: CalculatorInputs
): CalculatorResult {
  const warnings: string[] = [];
  const checklist: string[] = [];

  // Determine HSA eligibility and limits
  const isEligibleForHSA = inputs.hasHDHP;
  let maxHSAContribution = 0;

  if (isEligibleForHSA) {
    // Base HSA limit based on coverage type
    maxHSAContribution =
      inputs.coverageType === "self"
        ? IRS_LIMITS_2026.HSA_SELF_ONLY
        : IRS_LIMITS_2026.HSA_FAMILY;

    // Add catch-up contribution for age 55+
    if (inputs.isAge55Plus) {
      maxHSAContribution += IRS_LIMITS_2026.HSA_CATCH_UP_55_PLUS;
    }

    // Subtract employer contribution (counts toward annual limit)
    maxHSAContribution = Math.max(
      0,
      maxHSAContribution - inputs.employerHSAContribution
    );
  }

  // Health FSA limit
  // Note: With an HSA, you cannot have a general-purpose Health FSA
  // (only limited-purpose dental/vision FSA, which we don't model here)
  const maxHealthFSA = isEligibleForHSA ? 0 : IRS_LIMITS_2026.HEALTH_FSA_LIMIT;

  // Dependent Care FSA limit (reduced for MFS filers)
  const maxDependentCareFSA =
    inputs.filingStatus === "mfs"
      ? IRS_LIMITS_2026.DEPENDENT_CARE_FSA_MFS
      : IRS_LIMITS_2026.DEPENDENT_CARE_FSA_DEFAULT;

  // Generate scenarios
  const scenarios: Scenario[] = [];

  if (isEligibleForHSA) {
    // HSA-eligible scenarios

    // Scenario 1: Max HSA
    const dcfsaForMaxHSA = Math.min(
      maxDependentCareFSA,
      inputs.expectedDependentCareSpend
    );
    scenarios.push(
      buildScenario(
        "max-hsa",
        "Max HSA Contribution",
        "Contribute the maximum to your HSA for long-term savings",
        maxHSAContribution,
        0,
        dcfsaForMaxHSA,
        inputs
      )
    );

    // Scenario 2: Match spending
    const matchedHSA = Math.min(maxHSAContribution, inputs.expectedMedicalSpend);
    scenarios.push(
      buildScenario(
        "match-spending",
        "Match Expected Spending",
        "Contribute based on expected medical expenses",
        matchedHSA,
        0,
        dcfsaForMaxHSA,
        inputs
      )
    );

    // Scenario 3: Conservative
    const conservativeHSA = Math.min(
      Math.round(maxHSAContribution * 0.5),
      inputs.expectedMedicalSpend
    );
    const conservativeDCFSA = Math.min(
      Math.round(maxDependentCareFSA * 0.75),
      inputs.expectedDependentCareSpend
    );
    scenarios.push(
      buildScenario(
        "conservative",
        "Conservative Approach",
        "Lower contributions to minimize risk",
        conservativeHSA,
        0,
        conservativeDCFSA,
        inputs
      )
    );

    warnings.push(
      "With HDHP coverage, you cannot use a general-purpose Health FSA. " +
        "Your employer may offer a limited-purpose FSA for dental/vision only."
    );
  } else {
    // FSA-only scenarios (no HSA eligibility)

    // Scenario 1: Max FSA
    const maxFSAElection = Math.min(
      maxHealthFSA,
      inputs.expectedMedicalSpend
    );
    const dcfsaForMaxFSA = Math.min(
      maxDependentCareFSA,
      inputs.expectedDependentCareSpend
    );
    scenarios.push(
      buildScenario(
        "max-fsa",
        "Max Health FSA",
        "Maximize Health FSA up to your expected spending",
        0,
        maxFSAElection,
        dcfsaForMaxFSA,
        inputs
      )
    );

    // Scenario 2: Match spending with buffer
    const matchedFSA = Math.min(
      maxHealthFSA,
      Math.round(inputs.expectedMedicalSpend * 0.9)
    );
    scenarios.push(
      buildScenario(
        "match-spending",
        "Match Expected Spending",
        "Contribute 90% of expected spending to reduce forfeiture risk",
        0,
        matchedFSA,
        dcfsaForMaxFSA,
        inputs
      )
    );

    // Scenario 3: Conservative
    const conservativeFSA = Math.min(
      maxHealthFSA,
      Math.round(inputs.expectedMedicalSpend * 0.7)
    );
    const conservativeDCFSA = Math.min(
      Math.round(maxDependentCareFSA * 0.75),
      inputs.expectedDependentCareSpend
    );
    scenarios.push(
      buildScenario(
        "conservative",
        "Conservative Approach",
        "Lower contributions to minimize forfeiture risk",
        0,
        conservativeFSA,
        conservativeDCFSA,
        inputs
      )
    );
  }

  // Determine recommended scenario
  // Prefer highest tax savings with acceptable forfeiture risk
  let recommended = scenarios[0];
  for (const scenario of scenarios) {
    const isBetterSavings = scenario.totalTaxSavings > recommended.totalTaxSavings;
    const isAcceptableRisk = scenario.forfeitureRiskLevel !== "high";
    const isSameSavingsLowerRisk =
      scenario.totalTaxSavings === recommended.totalTaxSavings &&
      scenario.forfeitureRisk < recommended.forfeitureRisk;

    if ((isBetterSavings && isAcceptableRisk) || isSameSavingsLowerRisk) {
      recommended = scenario;
    }
  }

  // Generate checklist
  if (recommended.hsaElection > 0) {
    checklist.push(
      `Elect $${recommended.hsaElection.toLocaleString()} for HSA contribution`
    );
    if (inputs.employerHSAContribution > 0) {
      checklist.push(
        `Your employer contributes $${inputs.employerHSAContribution.toLocaleString()} to your HSA (already counted toward limit)`
      );
    }
  }

  if (recommended.healthFSAElection > 0) {
    checklist.push(
      `Elect $${recommended.healthFSAElection.toLocaleString()} for Health FSA`
    );
  }

  if (recommended.dependentCareFSAElection > 0) {
    checklist.push(
      `Elect $${recommended.dependentCareFSAElection.toLocaleString()} for Dependent Care FSA`
    );
  }

  if (
    recommended.hsaElection === 0 &&
    recommended.healthFSAElection === 0 &&
    recommended.dependentCareFSAElection === 0
  ) {
    checklist.push(
      "Based on your inputs, no pre-tax elections are recommended at this time"
    );
  }

  checklist.push(
    "Verify all elections in your employer's benefits portal before the deadline"
  );
  checklist.push("Keep receipts for all qualified expenses");

  // Add conditional warnings
  if (
    inputs.fsaRolloverType === "use-it-or-lose-it" &&
    recommended.healthFSAElection > 0
  ) {
    warnings.push(
      "Your Health FSA uses 'use-it-or-lose-it' rules. Unused funds at year-end are forfeited."
    );
  }

  if (recommended.dependentCareFSAElection > 0) {
    warnings.push(
      "Dependent Care FSA: The $5,000 limit is per household (not per parent). " +
        "Verify the current limit with your employer and IRS guidance."
    );
  }

  return {
    isEligibleForHSA,
    maxHSAContribution,
    maxHealthFSA,
    maxDependentCareFSA,
    recommended,
    scenarios,
    warnings,
    checklist,
  };
}

/**
 * Format a number as currency (USD)
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format a number as a percentage
 */
export function formatPercent(rate: number): string {
  return `${Math.round(rate * 100)}%`;
}
