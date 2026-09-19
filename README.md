# HSA/FSA/HDHP Money Optimizer

[![Next.js](https://img.shields.io/badge/Next.js-14+-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0+-38bdf8)](https://tailwindcss.com/)

An open-enrollment calculator that helps employees determine the optimal mix of HSA, Health FSA, and Dependent Care FSA contributions to maximize federal tax savings for the 2026/2027 benefits year.

## Features

- **Interactive Calculator**: Enter your details and see personalized recommendations
- **2026 IRS Limits**: Up-to-date contribution limits from IRS Rev. Proc. 2025-19 and 2025-32
- **Scenario Comparison**: Compare "Max HSA" vs "Spending-Matched" vs "Conservative" strategies
- **Tax Savings Estimate**: See estimated federal tax + FICA savings
- **Forfeiture Risk Analysis**: Understand use-it-or-lose-it risks
- **Print/PDF Export**: Print-friendly summary for your records
- **Privacy-First**: All calculations happen in your browser—no data leaves your device

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm 9 or later

### Installation

```bash
# Clone the repository
git clone https://github.com/28chairs/Optimizer.git
cd Optimizer

# Install dependencies
npm install

# Copy environment variables (optional, for affiliate links)
cp .env.example .env.local
```

### Development

```bash
# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build & Test

```bash
# Run tests
npm test

# Create a production build
npm run build

# Start the production server
npm start

# Run linting
npm run lint
```

## Deployment

### Deploy to Vercel (Recommended)

The easiest way to deploy is with [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com/new)
3. Vercel will detect Next.js and configure the build automatically
4. Add environment variables (optional):
   - `NEXT_PUBLIC_AFFILIATE_HSA_URL`
   - `NEXT_PUBLIC_AFFILIATE_HYSA_URL`
5. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/28chairs/Optimizer)

### Other Deployment Options

This is a standard Next.js application that can be deployed to any platform that supports Node.js:

- **Netlify**: Connect your repo and use `npm run build` as the build command
- **Railway**: Import from GitHub with automatic detection
- **Docker**: Build using `Dockerfile` (create one if needed)
- **Static Export**: Run `next build && next export` for static hosting

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_AFFILIATE_HSA_URL` | Affiliate link for HSA account opening | No |
| `NEXT_PUBLIC_AFFILIATE_HYSA_URL` | Affiliate link for high-yield savings | No |

See `.env.example` for all available options.

## Project Structure

```
├── docs/                   # PRD and roadmap documentation
├── public/                 # Static assets
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── layout.tsx      # Root layout with SEO
│   │   ├── page.tsx        # Home page with calculator
│   │   ├── disclaimer/     # Legal disclaimer
│   │   └── methodology/    # Math and IRS citations
│   ├── components/         # React components
│   │   ├── CalculatorForm.tsx
│   │   ├── ResultsDisplay.tsx
│   │   ├── ScenarioComparison.tsx
│   │   ├── Checklist.tsx
│   │   ├── DisclaimerBanner.tsx
│   │   ├── AffiliateCTA.tsx
│   │   ├── EmailCapture.tsx
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── lib/                # Business logic
│       ├── calculator.ts   # Core calculation engine
│       ├── calculator.test.ts
│       └── constants.ts    # IRS limits and config
├── .env.example            # Environment variables template
├── package.json
├── tsconfig.json
└── README.md
```

## 2026 IRS Limits

All limits are sourced from official IRS guidance:

| Account | Limit | Source |
|---------|-------|--------|
| HSA (Self-only) | $4,400 | Rev. Proc. 2025-19 |
| HSA (Family) | $8,750 | Rev. Proc. 2025-19 |
| HSA Catch-up (55+) | +$1,000 | Rev. Proc. 2025-19 |
| HDHP Min Deductible (Self) | $1,700 | Rev. Proc. 2025-19 |
| HDHP Min Deductible (Family) | $3,400 | Rev. Proc. 2025-19 |
| HDHP Max OOP (Self) | $8,500 | Rev. Proc. 2025-19 |
| HDHP Max OOP (Family) | $17,000 | Rev. Proc. 2025-19 |
| Health FSA | $3,400 | Rev. Proc. 2025-32 |
| Health FSA Carryover | $680 | Rev. Proc. 2025-32 |
| Dependent Care FSA | $5,000* | IRC § 129 |

*Verify dependent care limit with your employer plan and current IRS guidance.

## Tech Stack

- **Framework**: [Next.js 14+](https://nextjs.org/) with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Testing**: Vitest
- **Deployment**: Vercel (recommended)

## Documentation

- [Product Requirements Document](./docs/PRD.md)
- [Development Roadmap](./docs/ROADMAP.md)

## Disclaimer

This calculator is for **educational purposes only** and does not constitute tax, legal, or financial advice. Please consult a qualified professional for personalized guidance. Always verify contribution limits with your employer's benefits documentation and current IRS guidance.

## Contributing

Contributions are welcome! Please read our contributing guidelines and submit a pull request.

## License

MIT License - see [LICENSE](./LICENSE) for details.

---

Built with care for open enrollment season.
