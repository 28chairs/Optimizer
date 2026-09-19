"use client";

interface ChecklistProps {
  items: string[];
  warnings: string[];
}

export function Checklist({ items, warnings }: ChecklistProps) {
  return (
    <div className="space-y-4">
      {/* Warnings */}
      {warnings.length > 0 && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
          <h4 className="text-sm font-medium text-blue-900 mb-2">
            Important Notes
          </h4>
          <ul className="space-y-2">
            {warnings.map((warning, index) => (
              <li
                key={index}
                className="text-sm text-blue-800 flex items-start gap-2"
              >
                <svg
                  className="h-4 w-4 flex-shrink-0 mt-0.5 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {warning}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Checklist */}
      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
          <svg
            className="h-5 w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
          What to Elect in Your Portal
        </h4>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="flex h-5 w-5 items-center justify-center rounded border border-gray-300 bg-white text-xs text-gray-400 flex-shrink-0 mt-0.5">
                {index + 1}
              </span>
              <span className="text-sm text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
