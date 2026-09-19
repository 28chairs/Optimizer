import Link from "next/link";

interface DisclaimerBannerProps {
  compact?: boolean;
}

export function DisclaimerBanner({ compact = false }: DisclaimerBannerProps) {
  if (compact) {
    return (
      <div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3">
        <p className="text-sm text-amber-800">
          <strong>Educational Tool Only:</strong> Not tax, legal, or financial advice.{" "}
          <Link href="/disclaimer" className="underline hover:text-amber-900">
            Read full disclaimer
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-amber-50 border border-amber-200 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5 text-amber-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-amber-800">
            Educational Tool Only
          </h3>
          <div className="mt-2 text-sm text-amber-700">
            <p>
              This calculator provides estimates for informational purposes only.
              It does not constitute tax, legal, or financial advice. The results
              are based on your inputs and 2026 IRS limits.
            </p>
            <p className="mt-2">
              Please consult a qualified tax professional and verify all figures
              with your employer&apos;s benefits documentation before making
              elections.
            </p>
          </div>
          <div className="mt-3 flex gap-4">
            <Link
              href="/disclaimer"
              className="text-sm font-medium text-amber-800 underline hover:text-amber-900"
            >
              Full Disclaimer
            </Link>
            <Link
              href="/methodology"
              className="text-sm font-medium text-amber-800 underline hover:text-amber-900"
            >
              Methodology
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
