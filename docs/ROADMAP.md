# HSA / FSA / HDHP Money Optimizer — Roadmap

## Phased Delivery Plan

This roadmap breaks the MVP into discrete, committable phases. Each phase produces working code that can be reviewed and tested independently.

---

## Phase 0: PRD + Roadmap ✅

**Commit**: `docs: add PRD and phased roadmap`

- [x] Create `docs/PRD.md` with full product requirements
- [x] Create `docs/ROADMAP.md` with phases and checkboxes
- [x] Define 2026 IRS limits to hard-code
- [x] Document scope and non-goals
- [x] Define acceptance criteria per phase

**Deliverables**: Documentation only

---

## Phase 1: Scaffold ✅

**Commit**: `chore: scaffold Next.js app`

- [x] Initialize Next.js App Router project
- [x] Configure TypeScript (strict mode)
- [x] Configure Tailwind CSS
- [x] Create basic layout component
  - [x] Header with logo/title
  - [x] Footer with copyright and nav links
- [x] Create home page placeholder
- [x] Update README with:
  - [x] Project description
  - [x] Run instructions (`npm install`, `npm run dev`)
  - [x] Build instructions
- [x] Verify `npm run build` passes
- [x] Add `.gitignore` for Node.js/Next.js

**Deliverables**: Working Next.js skeleton that builds and runs

---

## Phase 2: Core Calculator Math ✅

**Commit**: `feat: add HSA/FSA calculation engine`

- [x] Create `src/lib/constants.ts`
  - [x] 2026 IRS limits (HSA, HDHP, FSA, DCFSA)
  - [x] Code comments citing Rev. Proc. 2025-19 / 2025-32
  - [x] Filing status options
  - [x] Federal tax bracket options
- [x] Create `src/lib/calculator.ts`
  - [x] Input type definitions
  - [x] Output/result type definitions
  - [x] HSA contribution calculation
  - [x] Health FSA recommendation
  - [x] Dependent Care FSA recommendation
  - [x] Tax savings estimation (federal + FICA)
  - [x] Forfeiture risk calculation
  - [x] Scenario generation:
    - [x] Max HSA scenario
    - [x] Spending-matched scenario
    - [x] Conservative scenario
- [x] Create `src/lib/calculator.test.ts`
  - [x] Test single HDHP persona
  - [x] Test family with kids persona
  - [x] Test non-HDHP FSA-only persona
  - [x] Test edge cases (zero spending, max contributions)
- [x] Add methodology notes as code comments

**Deliverables**: Pure TypeScript module with unit tests

---

## Phase 3: Calculator UI ✅

**Commit**: `feat: wire calculator UI`

- [x] Create `src/components/CalculatorForm.tsx`
  - [x] Filing status dropdown
  - [x] Tax rate selector (dropdown + custom)
  - [x] Expected medical spend input
  - [x] Expected dependent care spend input
  - [x] HDHP coverage toggle
  - [x] Coverage type (self/family)
  - [x] Age 55+ checkbox
  - [x] Employer HSA contribution input
  - [x] FSA rollover type selector
- [x] Create `src/components/ResultsDisplay.tsx`
  - [x] Recommended elections summary
  - [x] Tax savings highlight
  - [x] Forfeiture risk indicator
- [x] Create `src/components/ScenarioComparison.tsx`
  - [x] Side-by-side scenario cards
  - [x] Visual comparison of savings
- [x] Create `src/components/DisclaimerBanner.tsx`
  - [x] Visible educational disclaimer
  - [x] Links to /disclaimer and /methodology
- [x] Create `src/components/Checklist.tsx`
  - [x] "What to elect in your portal" list
- [x] Update home page (`src/app/page.tsx`)
  - [x] Hero section with value proposition
  - [x] Calculator form
  - [x] Results section
  - [x] Disclaimer banner
- [x] Mobile-responsive styling
- [x] Form validation

**Deliverables**: Functional calculator on home page

---

## Phase 4: Supporting Pages + Monetization Stubs ✅

**Commit**: `feat: add disclaimer, methodology, and monetization stubs`

- [x] Create `/disclaimer` page
  - [x] Full educational disclaimer text
  - [x] "Not tax advice" language
  - [x] "Consult a professional" guidance
  - [x] Link back to calculator
- [x] Create `/methodology` page
  - [x] Tax savings formula explanation
  - [x] IRS citations with Rev. Proc. numbers
  - [x] Explanation of scenarios
  - [x] Link back to calculator
- [x] Create `src/components/AffiliateCTA.tsx`
  - [x] "Open an HSA" placeholder
  - [x] "Park HSA cash in HYSA" placeholder
  - [x] Driven by `NEXT_PUBLIC_AFFILIATE_*` env vars
  - [x] Graceful fallback when env vars not set
- [x] Create `src/components/EmailCapture.tsx`
  - [x] "Email me my results" button
  - [x] localStorage for results
  - [x] mailto: link generation
- [x] Add print-friendly CSS
  - [x] Hide navigation in print
  - [x] Clean summary layout
  - [x] "Print Summary" button
- [x] Add `.env.example` with affiliate env vars

**Deliverables**: Complete page set with monetization hooks

---

## Phase 5: Polish + PR ✅

**Commit(s)**: `chore: add SEO meta and finalize README` + PR update

- [x] Add SEO meta tags
  - [x] Title: "HSA vs FSA Calculator 2026 | Open Enrollment Optimizer"
  - [x] Description for search engines
  - [x] Open Graph tags for social sharing
- [x] Test sample personas:
  - [x] Single HDHP, $2k medical spend
  - [x] Family with kids, $5k medical + $10k dependent care
  - [x] Non-HDHP, FSA-only, $3k medical spend
- [x] Update README with:
  - [x] Full project description
  - [x] Run instructions
  - [x] Deploy instructions (Vercel)
  - [x] Environment variables documentation
  - [x] License
- [x] Final build verification (`npm run build`)
- [x] Open/update PR with:
  - [x] Summary of all phases
  - [x] Testing notes

**Deliverables**: Production-ready MVP with PR

---

## Future Phases (Post-MVP)

These are **not** in scope for the initial MVP but documented for future planning:

### Phase 6: Premium Features
- [ ] Paid PDF report generation
- [ ] Enhanced scenario modeling
- [ ] Historical comparison (prior year)

### Phase 7: Analytics + Optimization
- [ ] Analytics integration (privacy-respecting)
- [ ] A/B testing for CTA placement
- [ ] Performance optimization

### Phase 8: Content Marketing
- [ ] Blog posts on HSA strategies
- [ ] Open enrollment guides
- [ ] SEO content expansion

---

## Progress Tracking

| Phase | Status | Commit Message | Date |
|-------|--------|----------------|------|
| 0 | ✅ Complete | `docs: add PRD and phased roadmap` | 2026-09-19 |
| 1 | ✅ Complete | `chore: scaffold Next.js app` | 2026-09-19 |
| 2 | ✅ Complete | `feat: add HSA/FSA calculation engine` | 2026-09-19 |
| 3 | ✅ Complete | `feat: wire calculator UI` | 2026-09-19 |
| 4 | ✅ Complete | `feat: add disclaimer, methodology, and monetization stubs` | 2026-09-19 |
| 5 | ✅ Complete | `chore: add SEO meta and finalize README` | 2026-09-19 |

---

*Last updated: 2026-09-19*
