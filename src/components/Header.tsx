import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900">
              HSA/FSA Optimizer
            </span>
            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
              2026
            </span>
          </Link>
          <nav className="hidden sm:flex items-center gap-6">
            <Link
              href="/methodology"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              How It Works
            </Link>
            <Link
              href="/disclaimer"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Disclaimer
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
