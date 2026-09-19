"use client";

interface AffiliateCTAProps {
  variant: "hsa" | "hysa";
}

export function AffiliateCTA({ variant }: AffiliateCTAProps) {
  const hsaUrl = process.env.NEXT_PUBLIC_AFFILIATE_HSA_URL;
  const hysaUrl = process.env.NEXT_PUBLIC_AFFILIATE_HYSA_URL;

  if (variant === "hsa") {
    return (
      <div className="rounded-lg border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
            <svg
              className="h-5 w-5 text-blue-600"
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
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900">Need an HSA Account?</h4>
            <p className="mt-1 text-sm text-gray-600">
              Open a Health Savings Account to start saving on taxes and building
              your healthcare nest egg.
            </p>
            {hsaUrl ? (
              <a
                href={hsaUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="mt-3 inline-flex items-center gap-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
              >
                Open an HSA
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            ) : (
              <p className="mt-2 text-xs text-gray-400 italic">
                Partner link coming soon
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
          <svg
            className="h-5 w-5 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">
            Grow Your HSA Balance
          </h4>
          <p className="mt-1 text-sm text-gray-600">
            Park your HSA cash in a high-yield savings account to earn more while
            you wait to spend it.
          </p>
          {hysaUrl ? (
            <a
              href={hysaUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="mt-3 inline-flex items-center gap-1 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition-colors"
            >
              Compare HYSA Rates
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          ) : (
            <p className="mt-2 text-xs text-gray-400 italic">
              Partner link coming soon
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
