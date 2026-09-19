/**
 * IRS 2026 Contribution Limits
 *
 * Sources:
 * - HSA limits: IRS Rev. Proc. 2025-19
 * - FSA limits: IRS Rev. Proc. 2025-32
 * - HDHP requirements: IRS Rev. Proc. 2025-19
 *
 * These are the inflation-adjusted limits for tax year 2026.
 */

export const IRS_LIMITS_2026 = {
  // HSA Contribution Limits (Rev. Proc. 2025-19)
  HSA_SELF_ONLY: 4400,
  HSA_FAMILY: 8750,
  HSA_CATCH_UP_55_PLUS: 1000,

  // HDHP Minimum Deductible Requirements (Rev. Proc. 2025-19)
  HDHP_MIN_DEDUCTIBLE_SELF: 1700,
  HDHP_MIN_DEDUCTIBLE_FAMILY: 3400,

  // HDHP Maximum Out-of-Pocket (Rev. Proc. 2025-19)
  HDHP_OOP_MAX_SELF: 8500,
  HDHP_OOP_MAX_FAMILY: 17000,

  // Health FSA Limits (Rev. Proc. 2025-32)
  HEALTH_FSA_LIMIT: 3400,
  HEALTH_FSA_MAX_CARRYOVER: 680,

  // Dependent Care FSA (IRC § 129 as amended by OBBBA Pub. L. 119-21)
  // Note: Verify current limit with your employer plan and IRS guidance
  DEPENDENT_CARE_FSA_DEFAULT: 7500,
  DEPENDENT_CARE_FSA_MFS: 3750,
} as const;

export const IRS_CITATIONS = {
  HSA: "IRS Rev. Proc. 2025-19",
  HDHP: "IRS Rev. Proc. 2025-19",
  HEALTH_FSA: "IRS Rev. Proc. 2025-32",
  DEPENDENT_CARE:
    "IRC § 129 as amended by OBBBA Pub. L. 119-21; verify with your employer plan",
} as const;

/**
 * Federal marginal tax brackets
 * These are common brackets; users can also enter a custom rate.
 */
export const FEDERAL_TAX_BRACKETS = [
  { label: "10%", rate: 0.1, description: "Up to ~$11,600 (single)" },
  { label: "12%", rate: 0.12, description: "~$11,600 - $47,150 (single)" },
  { label: "22%", rate: 0.22, description: "~$47,150 - $100,525 (single)" },
  { label: "24%", rate: 0.24, description: "~$100,525 - $191,950 (single)" },
  { label: "32%", rate: 0.32, description: "~$191,950 - $243,725 (single)" },
  { label: "35%", rate: 0.35, description: "~$243,725 - $609,350 (single)" },
  { label: "37%", rate: 0.37, description: "Over ~$609,350 (single)" },
] as const;

/**
 * Filing status options
 */
export const FILING_STATUSES = [
  { value: "single", label: "Single" },
  { value: "mfj", label: "Married Filing Jointly" },
  { value: "mfs", label: "Married Filing Separately" },
  { value: "hoh", label: "Head of Household" },
] as const;

export type FilingStatus = (typeof FILING_STATUSES)[number]["value"];

/**
 * FSA rollover options
 * Employers choose one of these for their Health FSA plan.
 */
export type FSARolloverType = "use-it-or-lose-it" | "grace-period" | "carryover";

export const FSA_ROLLOVER_OPTIONS = [
  {
    value: "carryover" as const,
    label: "Carryover",
    description: `Up to $${IRS_LIMITS_2026.HEALTH_FSA_MAX_CARRYOVER} can roll over to next year`,
  },
  {
    value: "grace-period" as const,
    label: "Grace Period",
    description: "2.5 months after year-end to spend remaining balance",
  },
  {
    value: "use-it-or-lose-it" as const,
    label: "Use-It-or-Lose-It",
    description: "Unused funds are forfeited at year-end",
  },
] as const;

/**
 * FICA tax rate (employee portion)
 * Social Security (6.2%) + Medicare (1.45%) = 7.65%
 */
export const FICA_RATE = 0.0765;
