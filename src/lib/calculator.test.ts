/**
 * Unit tests for the HSA/FSA Calculator Engine
 *
 * Tests three primary personas:
 * 1. Single HDHP - individual with high-deductible plan
 * 2. Family with kids - family coverage with dependent care needs
 * 3. Non-HDHP FSA-only - no HSA eligibility, using Health FSA
 */

import { describe, it, expect } from "vitest";
import {
  calculateOptimalElections,
  formatCurrency,
  formatPercent,
  type CalculatorInputs,
} from "./calculator";
import { IRS_LIMITS_2026 } from "./constants";

describe("calculateOptimalElections", () => {
  describe("Persona 1: Single HDHP", () => {
    const inputs: CalculatorInputs = {
      filingStatus: "single",
      marginalTaxRate: 0.22,
      expectedMedicalSpend: 2000,
      expectedDependentCareSpend: 0,
      hasHDHP: true,
      coverageType: "self",
      isAge55Plus: false,
      employerHSAContribution: 0,
      fsaRolloverType: "carryover",
    };

    it("should be eligible for HSA", () => {
      const result = calculateOptimalElections(inputs);
      expect(result.isEligibleForHSA).toBe(true);
    });

    it("should have correct max HSA contribution (self-only)", () => {
      const result = calculateOptimalElections(inputs);
      expect(result.maxHSAContribution).toBe(IRS_LIMITS_2026.HSA_SELF_ONLY);
    });

    it("should not allow Health FSA with HDHP", () => {
      const result = calculateOptimalElections(inputs);
      expect(result.maxHealthFSA).toBe(0);
    });

    it("should generate HSA-focused scenarios", () => {
      const result = calculateOptimalElections(inputs);
      expect(result.scenarios.length).toBeGreaterThanOrEqual(3);
      expect(result.scenarios.every((s) => s.healthFSAElection === 0)).toBe(true);
    });

    it("should calculate positive tax savings", () => {
      const result = calculateOptimalElections(inputs);
      expect(result.recommended.totalTaxSavings).toBeGreaterThan(0);
    });

    it("should include FICA savings in total", () => {
      const result = calculateOptimalElections(inputs);
      expect(result.recommended.ficaSavings).toBeGreaterThan(0);
      expect(result.recommended.totalTaxSavings).toBe(
        result.recommended.federalTaxSavings + result.recommended.ficaSavings
      );
    });
  });

  describe("Persona 2: Family with kids (HDHP + dependent care)", () => {
    const inputs: CalculatorInputs = {
      filingStatus: "mfj",
      marginalTaxRate: 0.24,
      expectedMedicalSpend: 5000,
      expectedDependentCareSpend: 10000,
      hasHDHP: true,
      coverageType: "family",
      isAge55Plus: false,
      employerHSAContribution: 500,
      fsaRolloverType: "carryover",
    };

    it("should have family HSA limit minus employer contribution", () => {
      const result = calculateOptimalElections(inputs);
      expect(result.maxHSAContribution).toBe(
        IRS_LIMITS_2026.HSA_FAMILY - inputs.employerHSAContribution
      );
    });

    it("should cap dependent care FSA at $5,000 for MFJ", () => {
      const result = calculateOptimalElections(inputs);
      expect(result.maxDependentCareFSA).toBe(
        IRS_LIMITS_2026.DEPENDENT_CARE_FSA_DEFAULT
      );
    });

    it("should recommend dependent care FSA when spending qualifies", () => {
      const result = calculateOptimalElections(inputs);
      expect(result.recommended.dependentCareFSAElection).toBeGreaterThan(0);
    });

    it("should include warning about dependent care limit", () => {
      const result = calculateOptimalElections(inputs);
      expect(
        result.warnings.some((w) => w.includes("Dependent Care FSA"))
      ).toBe(true);
    });
  });

  describe("Persona 3: Non-HDHP FSA-only", () => {
    const inputs: CalculatorInputs = {
      filingStatus: "single",
      marginalTaxRate: 0.22,
      expectedMedicalSpend: 3000,
      expectedDependentCareSpend: 0,
      hasHDHP: false,
      coverageType: "self",
      isAge55Plus: false,
      employerHSAContribution: 0,
      fsaRolloverType: "use-it-or-lose-it",
    };

    it("should not be eligible for HSA", () => {
      const result = calculateOptimalElections(inputs);
      expect(result.isEligibleForHSA).toBe(false);
    });

    it("should have zero max HSA contribution", () => {
      const result = calculateOptimalElections(inputs);
      expect(result.maxHSAContribution).toBe(0);
    });

    it("should allow Health FSA up to limit", () => {
      const result = calculateOptimalElections(inputs);
      expect(result.maxHealthFSA).toBe(IRS_LIMITS_2026.HEALTH_FSA_LIMIT);
    });

    it("should generate FSA-focused scenarios", () => {
      const result = calculateOptimalElections(inputs);
      expect(result.scenarios.length).toBeGreaterThanOrEqual(3);
      expect(result.scenarios.every((s) => s.hsaElection === 0)).toBe(true);
    });

    it("should warn about use-it-or-lose-it when elected", () => {
      const result = calculateOptimalElections(inputs);
      if (result.recommended.healthFSAElection > 0) {
        expect(
          result.warnings.some((w) => w.includes("use-it-or-lose-it"))
        ).toBe(true);
      }
    });
  });

  describe("Edge cases", () => {
    it("should handle zero spending", () => {
      const inputs: CalculatorInputs = {
        filingStatus: "single",
        marginalTaxRate: 0.22,
        expectedMedicalSpend: 0,
        expectedDependentCareSpend: 0,
        hasHDHP: true,
        coverageType: "self",
        isAge55Plus: false,
        employerHSAContribution: 0,
        fsaRolloverType: "carryover",
      };

      const result = calculateOptimalElections(inputs);
      expect(result).toBeDefined();
      expect(result.scenarios.length).toBeGreaterThan(0);
    });

    it("should add catch-up contribution for age 55+", () => {
      const inputs: CalculatorInputs = {
        filingStatus: "single",
        marginalTaxRate: 0.22,
        expectedMedicalSpend: 5000,
        expectedDependentCareSpend: 0,
        hasHDHP: true,
        coverageType: "self",
        isAge55Plus: true,
        employerHSAContribution: 0,
        fsaRolloverType: "carryover",
      };

      const result = calculateOptimalElections(inputs);
      expect(result.maxHSAContribution).toBe(
        IRS_LIMITS_2026.HSA_SELF_ONLY + IRS_LIMITS_2026.HSA_CATCH_UP_55_PLUS
      );
    });

    it("should reduce dependent care FSA for MFS filers", () => {
      const inputs: CalculatorInputs = {
        filingStatus: "mfs",
        marginalTaxRate: 0.22,
        expectedMedicalSpend: 2000,
        expectedDependentCareSpend: 5000,
        hasHDHP: false,
        coverageType: "self",
        isAge55Plus: false,
        employerHSAContribution: 0,
        fsaRolloverType: "carryover",
      };

      const result = calculateOptimalElections(inputs);
      expect(result.maxDependentCareFSA).toBe(
        IRS_LIMITS_2026.DEPENDENT_CARE_FSA_MFS
      );
    });

    it("should handle employer contribution exceeding personal limit", () => {
      const inputs: CalculatorInputs = {
        filingStatus: "single",
        marginalTaxRate: 0.22,
        expectedMedicalSpend: 2000,
        expectedDependentCareSpend: 0,
        hasHDHP: true,
        coverageType: "self",
        isAge55Plus: false,
        employerHSAContribution: 5000, // More than self-only limit
        fsaRolloverType: "carryover",
      };

      const result = calculateOptimalElections(inputs);
      expect(result.maxHSAContribution).toBe(0);
    });

    it("should generate checklist items", () => {
      const inputs: CalculatorInputs = {
        filingStatus: "single",
        marginalTaxRate: 0.22,
        expectedMedicalSpend: 2000,
        expectedDependentCareSpend: 0,
        hasHDHP: true,
        coverageType: "self",
        isAge55Plus: false,
        employerHSAContribution: 0,
        fsaRolloverType: "carryover",
      };

      const result = calculateOptimalElections(inputs);
      expect(result.checklist.length).toBeGreaterThan(0);
      expect(
        result.checklist.some((item) => item.includes("Verify all elections"))
      ).toBe(true);
    });
  });
});

describe("formatCurrency", () => {
  it("should format positive amounts", () => {
    expect(formatCurrency(1000)).toBe("$1,000");
    expect(formatCurrency(4400)).toBe("$4,400");
  });

  it("should format zero", () => {
    expect(formatCurrency(0)).toBe("$0");
  });

  it("should round decimal amounts", () => {
    expect(formatCurrency(1234.56)).toBe("$1,235");
  });
});

describe("formatPercent", () => {
  it("should format decimal rates as percentages", () => {
    expect(formatPercent(0.22)).toBe("22%");
    expect(formatPercent(0.1)).toBe("10%");
    expect(formatPercent(0.37)).toBe("37%");
  });
});
