import Link from "next/link";
import type { Metadata } from "next";
import { IRS_LIMITS_2026, IRS_CITATIONS, FICA_RATE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Methodology | HSA/FSA Optimizer 2026",
  description:
    "Learn how the HSA/FSA Money Optimizer calculates tax savings, with IRS citations and formulas.",
};

export default function MethodologyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Methodology</h1>

      <div className="prose prose-gray max-w-none">
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            How We Calculate Tax Savings
          </h2>
          <p className="text-gray-700 mb-4">
            Pre-tax contributions to HSA, Health FSA, and Dependent Care FSA
            accounts reduce your taxable income, saving you money on both federal
            income tax and FICA (Social Security and Medicare) taxes.
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 my-6">
            <h3 className="font-medium text-gray-900 mb-2">Tax Savings Formula</h3>
            <code className="block text-sm bg-white p-3 rounded border border-gray-200">
              Total Savings = Election Amount × (Marginal Tax Rate + FICA Rate)
            </code>
            <p className="text-sm text-gray-600 mt-3">
              Where FICA Rate = {(FICA_RATE * 100).toFixed(2)}% (Social Security
              6.2% + Medicare 1.45%)
            </p>
          </div>

          <h3 className="font-medium text-gray-900 mt-6 mb-2">Example Calculation</h3>
          <p className="text-gray-700 mb-2">
            For a $4,400 HSA contribution at a 22% marginal tax rate:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Federal tax savings: $4,400 × 22% = <strong>$968</strong></li>
            <li>FICA savings: $4,400 × 7.65% = <strong>$336.60</strong></li>
            <li>Total savings: <strong>$1,304.60</strong></li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            2026 IRS Limits
          </h2>
          <p className="text-gray-700 mb-4">
            The following limits are used in our calculations, based on official
            IRS guidance.
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                    Account Type
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">
                    2026 Limit
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                    Source
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    HSA (Self-only coverage)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 text-right font-medium">
                    ${IRS_LIMITS_2026.HSA_SELF_ONLY.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {IRS_CITATIONS.HSA}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    HSA (Family coverage)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 text-right font-medium">
                    ${IRS_LIMITS_2026.HSA_FAMILY.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {IRS_CITATIONS.HSA}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    HSA Catch-up (Age 55+)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 text-right font-medium">
                    +${IRS_LIMITS_2026.HSA_CATCH_UP_55_PLUS.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {IRS_CITATIONS.HSA}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    HDHP Min Deductible (Self)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 text-right font-medium">
                    ${IRS_LIMITS_2026.HDHP_MIN_DEDUCTIBLE_SELF.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {IRS_CITATIONS.HDHP}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    HDHP Min Deductible (Family)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 text-right font-medium">
                    ${IRS_LIMITS_2026.HDHP_MIN_DEDUCTIBLE_FAMILY.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {IRS_CITATIONS.HDHP}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    HDHP Max Out-of-Pocket (Self)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 text-right font-medium">
                    ${IRS_LIMITS_2026.HDHP_OOP_MAX_SELF.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {IRS_CITATIONS.HDHP}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    HDHP Max Out-of-Pocket (Family)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 text-right font-medium">
                    ${IRS_LIMITS_2026.HDHP_OOP_MAX_FAMILY.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {IRS_CITATIONS.HDHP}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    Health FSA (Salary Reduction)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 text-right font-medium">
                    ${IRS_LIMITS_2026.HEALTH_FSA_LIMIT.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {IRS_CITATIONS.HEALTH_FSA}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    Health FSA Max Carryover
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 text-right font-medium">
                    ${IRS_LIMITS_2026.HEALTH_FSA_MAX_CARRYOVER.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {IRS_CITATIONS.HEALTH_FSA}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    Dependent Care FSA
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 text-right font-medium">
                    ${IRS_LIMITS_2026.DEPENDENT_CARE_FSA_DEFAULT.toLocaleString()}*
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">IRC § 129</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    Dependent Care FSA (MFS)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 text-right font-medium">
                    ${IRS_LIMITS_2026.DEPENDENT_CARE_FSA_MFS.toLocaleString()}*
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">IRC § 129</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-3">
            *Dependent Care FSA limits are statutory caps under IRC § 129. Verify
            the current limit with your employer plan and IRS guidance.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Scenario Comparison
          </h2>
          <p className="text-gray-700 mb-4">
            The Calculator generates multiple scenarios to help you understand
            different approaches:
          </p>

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">
                Max HSA / Max FSA
              </h3>
              <p className="text-sm text-gray-600">
                Contributes the maximum allowed amount. For HSA, this maximizes
                long-term savings since funds roll over indefinitely and can be
                invested. For FSA, this is capped at your expected spending to
                minimize forfeiture risk.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">
                Match Expected Spending
              </h3>
              <p className="text-sm text-gray-600">
                Aligns contributions with your anticipated medical or dependent
                care expenses. For Health FSA, we apply a small buffer (90% of
                expected spending) to account for estimation uncertainty.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">
                Conservative Approach
              </h3>
              <p className="text-sm text-gray-600">
                Recommends lower contributions (50-75% of maximum or expected
                spending) to minimize forfeiture risk, suitable if you&apos;re
                uncertain about your expenses.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Forfeiture Risk Calculation
          </h2>
          <p className="text-gray-700 mb-4">
            We calculate forfeiture risk based on:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>
              <strong>Health FSA:</strong> Unused funds minus carryover allowance
              (if your plan permits carryover). Grace period plans have reduced
              risk. Use-it-or-lose-it plans forfeit all unused funds.
            </li>
            <li>
              <strong>Dependent Care FSA:</strong> Always use-it-or-lose-it.
              Unused funds at year-end are forfeited.
            </li>
            <li>
              <strong>HSA:</strong> No forfeiture risk. Funds roll over
              indefinitely and can be invested for retirement.
            </li>
          </ul>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-4">
            <h3 className="font-medium text-gray-900 mb-2">Risk Levels</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>
                <span className="inline-block w-20 font-medium text-green-700">
                  Low:
                </span>{" "}
                $0 - $500 at risk
              </li>
              <li>
                <span className="inline-block w-20 font-medium text-amber-700">
                  Medium:
                </span>{" "}
                $500 - $1,500 at risk
              </li>
              <li>
                <span className="inline-block w-20 font-medium text-red-700">
                  High:
                </span>{" "}
                Over $1,500 at risk
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            HSA + FSA Rules
          </h2>
          <p className="text-gray-700 mb-4">
            Important rules for combining accounts:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>
              <strong>HSA eligibility requires HDHP:</strong> You must be enrolled
              in a qualifying High-Deductible Health Plan to contribute to an HSA.
            </li>
            <li>
              <strong>HSA + general Health FSA don&apos;t mix:</strong> If you
              have HSA-eligible HDHP coverage, you cannot use a general-purpose
              Health FSA. Your employer may offer a limited-purpose FSA for
              dental/vision only.
            </li>
            <li>
              <strong>Employer HSA contributions count:</strong> Employer
              contributions to your HSA count toward your annual limit.
            </li>
            <li>
              <strong>Dependent Care FSA is separate:</strong> You can always
              contribute to a Dependent Care FSA regardless of your health plan
              type.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Limitations
          </h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>
              <strong>State taxes not included:</strong> We only calculate
              federal tax and FICA savings. Some states do not allow HSA
              deductions (e.g., California, New Jersey).
            </li>
            <li>
              <strong>Simplified tax brackets:</strong> We use your marginal
              rate, but actual savings depend on your complete tax situation.
            </li>
            <li>
              <strong>Employer plan variations:</strong> Your employer&apos;s
              plan may have different limits or rules than IRS maximums.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            IRS Resources
          </h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>
              <a
                href="https://www.irs.gov/publications/p969"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                IRS Publication 969 - Health Savings Accounts
              </a>
            </li>
            <li>
              <a
                href="https://www.irs.gov/publications/p503"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                IRS Publication 503 - Child and Dependent Care Expenses
              </a>
            </li>
          </ul>
        </section>
      </div>

      <div className="mt-8 pt-8 border-t border-gray-200">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Calculator
        </Link>
      </div>
    </div>
  );
}
