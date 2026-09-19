import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50" data-print-hide>
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} HSA/FSA Optimizer. Educational tool only.
          </p>
          <nav className="flex gap-6">
            <Link
              href="/disclaimer"
              className="text-sm text-gray-500 hover:text-gray-900"
            >
              Disclaimer
            </Link>
            <Link
              href="/methodology"
              className="text-sm text-gray-500 hover:text-gray-900"
            >
              Methodology
            </Link>
          </nav>
        </div>
        <p className="mt-4 text-center text-xs text-gray-400">
          This calculator is for educational purposes only and does not constitute tax,
          legal, or financial advice. Consult a qualified professional for personalized guidance.
        </p>
      </div>
    </footer>
  );
}
