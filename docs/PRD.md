# HSA / FSA / HDHP Money Optimizer — Product Requirements Document

## Overview

An open-enrollment calculator that helps employees determine the optimal mix of HSA, Health FSA, and Dependent Care FSA contributions to maximize federal tax savings for the 2026/2027 benefits year.

## Problem Statement

Every fall, millions of employees face confusing open-enrollment decisions:
- "Should I max out my HSA or split contributions with an FSA?"
- "How much will I actually save in taxes?"
- "What's the forfeiture risk if I over-elect?"

Most employees guess or under-contribute, leaving significant tax savings on the table. There's no simple, free, trustworthy calculator that shows the math clearly.

## Target Audience

- W-2 employees with employer-sponsored benefits
- Ages 25–65, variety of household situations
- Comfortable with basic web forms
- Making open-enrollment decisions (typically October–November)
- Not seeking professional tax advice — just a starting point

## Success Metrics

| Metric | Target | Timeline |
|--------|--------|----------|
| First affiliate revenue | $1 | ~2 weeks post-launch |
| Monthly unique visitors | 1,000+ | By end of open-enrollment season |
| Calculator completions | 50%+ of page loads | Ongoing |
| Bounce rate | <60% | Ongoing |

## Scope

### In Scope

- Public landing page with interactive calculator
- Client-side calculations (no server-side processing needed)
- Educational disclaimers (not tax/legal/insurance advice)
- Affiliate CTA placeholders (HSA accounts, HYSA parking)
- Print-friendly summary / basic PDF export via print CSS
- Email capture stub ("email me my results")
- Mobile-first, fast, accessible UI
- SEO optimization for "HSA vs FSA 2026" keywords

### Non-Goals (Explicitly Out of Scope)

- **No tax advice**: Educational calculator only; users must verify with tax professionals
- **No bank linking**: No Plaid, no account aggregation
- **No authentication**: No user accounts, no login
- **No payment processing**: Affiliate stubs only; no real transactions
- **No state tax calculations**: Federal only (state taxes vary too much)
- **No payroll integration**: Manual input only
- **No invented IRS limits**: Only use published 2026 guidance

## 2026 IRS Limits (Hard-Coded)

All limits sourced from **IRS Rev. Proc. 2025-19** and **Rev. Proc. 2025-32**:

### HSA Contribution Limits
| Type | Amount |
|------|--------|
| Self-only coverage | $4,400 |
| Family coverage | $8,750 |
| Age 55+ catch-up | $1,000 |

### HDHP Requirements
| Requirement | Self-Only | Family |
|-------------|-----------|--------|
| Minimum deductible | $1,700 | $3,400 |
| Maximum out-of-pocket | $8,500 | $17,000 |

### Flexible Spending Accounts
| Account Type | Limit |
|--------------|-------|
| Health FSA salary reduction | $3,400 |
| Health FSA max carryover (if plan allows) | $680 |
| Dependent Care FSA | $7,500* |
| Dependent Care FSA (MFS) | $3,750* |

*\*Dependent Care FSA: IRC § 129 as amended by OBBBA Pub. L. 119-21. Verify the current limit with your employer plan and IRS guidance.*

## Calculator Inputs

### Required
- Filing status (Single / MFJ / MFS / HoH)
- Marginal federal tax rate (dropdown of common brackets OR free entry)
- Expected unreimbursed medical spend for next year
- Covered by HDHP? (Yes/No)
  - If yes: Self-only vs Family coverage
  - If yes: Age 55+?
  - If yes: Employer HSA contribution amount (optional)

### Optional
- Expected dependent care spend
- Health FSA rollover rules (use-it-or-lose-it / grace period / carryover)
- Current planned elections (for comparison)

## Calculator Outputs

### Primary Recommendations
- Recommended HSA election amount
- Recommended Health FSA election amount (if applicable)
- Recommended Dependent Care FSA election amount
- Estimated federal tax savings (with note: "state taxes not included")

### Scenario Comparison
Side-by-side display of:
1. **"Max HSA"** — Contribute the maximum allowed to HSA
2. **"Split"** — Balanced approach based on expected spending
3. **"FSA-Heavy"** — Maximize FSA if not HSA-eligible

### Risk Assessment
- Forfeiture / use-it-or-lose-it risk callout
- Clear explanation of rollover rules

### Action Items
- "What to elect in your portal" checklist
- Visible disclaimer linking to `/disclaimer` and `/methodology`

## Monetization Strategy

### Phase 1 (MVP)
- **Affiliate CTAs**: Placeholder blocks driven by environment variables
  - `NEXT_PUBLIC_AFFILIATE_HSA_URL` — "Open an HSA with [Partner]"
  - `NEXT_PUBLIC_AFFILIATE_HYSA_URL` — "Park your HSA cash in a high-yield account"
- **Email capture**: Lightweight localStorage + mailto link for "email me my results"
- **Print summary**: CSS print styles for clean PDF generation

### Phase 2 (Post-MVP)
- $9–19 "Premium PDF Report" with detailed breakdown
- Newsletter signup for annual open-enrollment reminders

## Technical Requirements

### Stack
- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Deployment**: Vercel (or any static host)

### Performance
- Lighthouse score: 90+ on all metrics
- First Contentful Paint: <1.5s
- All calculations client-side (no API latency)

### Privacy
- No server-side storage of user inputs
- All calculations performed in browser
- No cookies required for core functionality
- Clear privacy statement on page

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Landing page + interactive calculator |
| `/disclaimer` | Full educational/legal disclaimer |
| `/methodology` | Math formulas + IRS citations |

## Acceptance Criteria

### Phase 0: PRD + Roadmap
- [x] PRD document created with all sections
- [x] Roadmap with phases and checkboxes
- [x] Committed to repository

### Phase 1: Scaffold
- [ ] Next.js App Router project initialized
- [ ] TypeScript configured with strict mode
- [ ] Tailwind CSS configured
- [ ] Basic layout component with header/footer
- [ ] Home page placeholder
- [ ] README with run instructions
- [ ] `npm run build` passes

### Phase 2: Core Calculator Math
- [ ] Pure TypeScript calculation module
- [ ] Functions for HSA/FSA/DCFSA recommendations
- [ ] Tax savings estimation logic
- [ ] Scenario generation (max HSA / split / FSA-heavy)
- [ ] IRS limit constants with Rev. Proc. citations
- [ ] Unit tests for core calculations

### Phase 3: Calculator UI
- [ ] Input form with all required fields
- [ ] Live results display
- [ ] Scenario comparison cards
- [ ] Mobile-responsive design
- [ ] Educational disclaimer banner visible
- [ ] Form validation

### Phase 4: Supporting Pages + Monetization
- [ ] `/disclaimer` page with full legal text
- [ ] `/methodology` page with math and IRS cites
- [ ] Affiliate CTA placeholders (env var driven)
- [ ] Print-friendly CSS for summary
- [ ] Email capture stub

### Phase 5: Polish + PR
- [ ] SEO meta tags for target keywords
- [ ] Sample personas tested and validated
- [ ] README with deployment instructions
- [ ] PR opened with summary of all phases

## Risks and Mitigations

| Risk | Mitigation |
|------|------------|
| IRS changes limits after launch | Clear date stamps; easy constant updates |
| Users treat as tax advice | Multiple disclaimers; educational framing |
| Complex edge cases missed | Conservative recommendations; "verify with employer" notes |
| Mobile usability issues | Mobile-first design; test on real devices |

## Timeline

This is a rapid MVP targeting open-enrollment season. Each phase is designed to be independently committable and testable.

---

*Document version: 1.0*  
*Last updated: 2026-09-19*
