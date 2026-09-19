# HSA/FSA/HDHP Money Optimizer

An open-enrollment calculator that helps employees determine the optimal mix of HSA, Health FSA, and Dependent Care FSA contributions to maximize federal tax savings for the 2026/2027 benefits year.

## Features

- **Interactive Calculator**: Enter your details and see personalized recommendations
- **2026 IRS Limits**: Up-to-date contribution limits from IRS Rev. Proc. 2025-19 and 2025-32
- **Scenario Comparison**: Compare "Max HSA" vs "Split" vs "FSA-Heavy" strategies
- **Tax Savings Estimate**: See estimated federal tax savings (state taxes not included)
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
```

### Development

```bash
# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
# Create a production build
npm run build

# Start the production server
npm start
```

### Linting

```bash
npm run lint
```

## Project Structure

```
├── docs/               # PRD and roadmap documentation
├── public/             # Static assets
├── src/
│   ├── app/            # Next.js App Router pages
│   │   ├── layout.tsx  # Root layout
│   │   ├── page.tsx    # Home page
│   │   └── globals.css # Global styles
│   └── components/     # React components
│       ├── Header.tsx
│       └── Footer.tsx
├── package.json
├── tsconfig.json
└── README.md
```

## Tech Stack

- **Framework**: [Next.js 14+](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel (recommended)

## Documentation

- [Product Requirements Document](./docs/PRD.md)
- [Roadmap](./docs/ROADMAP.md)

## Disclaimer

This calculator is for **educational purposes only** and does not constitute tax, legal, or financial advice. Please consult a qualified professional for personalized guidance. Always verify contribution limits with your employer's benefits documentation and current IRS guidance.

## License

MIT
