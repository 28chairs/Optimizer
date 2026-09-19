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

## Phase 1: Scaffold

**Commit**: `chore: scaffold Next.js app`

- [ ] Initialize Next.js App Router project
- [ ] Configure TypeScript (strict mode)
- [ ] Configure Tailwind CSS
- [ ] Create basic layout component
  - [ ] Header with logo/title
  - [ ] Footer with copyright and nav links
- [ ] Create home page placeholder
- [ ] Update README with:
  - [ ] Project description
  - [ ] Run instructions (`npm install`, `npm run dev`)
  - [ ] Build instructions
- [ ] Verify `npm run build` passes
- [ ] Add `.gitignore` for Node.js/Next.js

**Deliverables**: Working Next.js skeleton that builds and runs

---

## Phase 2: Core Calculator Math

**Commit**: `feat: add HSA/FSA calculation engine`

- [ ] Create `src/lib/constants.ts`
  - [ ] 2026 IRS limits (HSA, HDHP, FSA, DCFSA)
  - [ ] Code comments citing Rev. Proc. 2025-19 / 2025-32
  - [ ] Filing status options
  - [ ] Federal tax bracket options
- [ ] Create `src/lib/calculator.ts`
  - [ ] Input type definitions
  - [ ] Output/result type definitions
  - [ ] HSA contribution calculation
  - [ ] Health FSA recommendation
  - [ ] Dependent Care FSA recommendation
  - [ ] Tax savings estimation (federal + FICA)
  - [ ] Forfeiture risk calculation
  - [ ] Scenario generation:
    - [ ] Max HSA scenario
    - [ ] Spending-matched scenario
    - [ ] Conservative scenario
- [ ] Create `src/lib/calculator.test.ts`
  - [ ] Test single HDHP persona
  - [ ] Test family with kids persona
  - [ ] Test non-HDHP FSA-only persona
  - [ ] Test edge cases (zero spending, max contributions)
- [ ] Add methodology notes as code comments

**Deliverables**: Pure TypeScript module with unit tests

---

## Phase 3: Calculator UI

**Commit**: `feat: wire calculator UI`

- [ ] Create `src/components/CalculatorForm.tsx`
  - [ ] Filing status dropdown
  - [ ] Tax rate selector (dropdown + custom)
  - [ ] Expected medical spend input
  - [ ] Expected dependent care spend input
  - [ ] HDHP coverage toggle
  - [ ] Coverage type (self/family)
  - [ ] Age 55+ checkbox
  - [ ] Employer HSA contribution input
  - [ ] FSA rollover type selector
- [ ] Create `src/components/ResultsDisplay.tsx`
  - [ ] Recommended elections summary
  - [ ] Tax savings highlight
  - [ ] Forfeiture risk indicator
- [ ] Create `src/components/ScenarioComparison.tsx`
  - [ ] Side-by-side scenario cards
  - [ ] Visual comparison of savings
- [ ] Create `src/components/DisclaimerBanner.tsx`
  - [ ] Visible educational disclaimer
  - [ ] Links to /disclaimer and /methodology
- [ ] Create `src/components/Checklist.tsx`
  - [ ] "What to elect in your portal" list
- [ ] Update home page (`src/app/page.tsx`)
  - [ ] Hero section with value proposition
  - [ ] Calculator form
  - [ ] Results section
  - [ ] Disclaimer banner
- [ ] Mobile-responsive styling
- [ ] Form validation

**Deliverables**: Functional calculator on home page

---

## Phase 4: Supporting Pages + Monetization Stubs

**Commit**: `feat: add disclaimer, methodology, and monetization stubs`

- [ ] Create `/disclaimer` page
  - [ ] Full educational disclaimer text
  - [ ] "Not tax advice" language
  - [ ] "Consult a professional" guidance
  - [ ] Link back to calculator
- [ ] Create `/methodology` page
  - [ ] Tax savings formula explanation
  - [ ] IRS citations with Rev. Proc. numbers
  - [ ] Explanation of scenarios
  - [ ] Link back to calculator
- [ ] Create `src/components/AffiliateCTA.tsx`
  - [ ] "Open an HSA" placeholder
  - [ ] "Park HSA cash in HYSA" placeholder
  - [ ] Driven by `NEXT_PUBLIC_AFFILIATE_*` env vars
  - [ ] Graceful fallback when env vars not set
- [ ] Create `src/components/EmailCapture.tsx`
  - [ ] "Email me my results" button
  - [ ] localStorage for results
  - [ ] mailto: link generation
- [ ] Add print-friendly CSS
  - [ ] Hide navigation in print
  - [ ] Clean summary layout
  - [ ] "Print Summary" button
- [ ] Add `.env.example` with affiliate env vars

**Deliverables**: Complete page set with monetization hooks

---

## Phase 5: Polish + PR

**Commit(s)**: `chore: add SEO meta and finalize README` + PR update

- [ ] Add SEO meta tags
  - [ ] Title: "HSA vs FSA Calculator 2026 | Open Enrollment Optimizer"
  - [ ] Description for search engines
  - [ ] Open Graph tags for social sharing
- [ ] Test sample personas:
  - [ ] Single HDHP, $2k medical spend
  - [ ] Family with kids, $5k medical + $10k dependent care
  - [ ] Non-HDHP, FSA-only, $3k medical spend
- [ ] Update README with:
  - [ ] Full project description
  - [ ] Run instructions
  - [ ] Deploy instructions (Vercel)
  - [ ] Environment variables documentation
  - [ ] License
- [ ] Final build verification (`npm run build`)
- [ ] Open/update PR with:
  - [ ] Summary of all phases
  - [ ] Screenshots (if applicable)
  - [ ] Testing notes

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

| Phase | Status | Commit SHA | Date |
|-------|--------|------------|------|
| 0 | ✅ Complete | — | 2026-09-19 |
| 1 | 🔄 In Progress | — | — |
| 2 | ⏳ Pending | — | — |
| 3 | ⏳ Pending | — | — |
| 4 | ⏳ Pending | — | — |
| 5 | ⏳ Pending | — | — |

---

*Last updated: 2026-09-19*
