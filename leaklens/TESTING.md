# LeakLens QA & Acceptance Tests

This file gives judges and reviewers a fast, reproducible way to verify the product without providing private data.

## Public test target

Live app: https://eurekawebsites.github.io/tarjeta-aster/leaklens/

## Core acceptance test

1. Open the live app.
2. Click **Load sample**.
3. Click **Analyze conversion leaks**.
4. Confirm a conversion-health score is produced.
5. Confirm ranked findings include evidence and severity.
6. Confirm a prioritized action plan appears below the audit.

### Verified sample result

A live browser QA pass produced:

- **Score:** 45/100
- **Grade:** High-friction
- **Finding 1:** Booking depends on a phone call — High
- **Finding 2:** Potential currency mismatch — High
- **Finding 3:** Trust proof is thin — Medium
- **P1:** Add asynchronous booking
- **P1:** Verify currency end-to-end
- **P2:** Move proof near the CTA

The exact number of displayed findings can change if the sample or scoring logic changes, but every finding must remain evidence-backed and actionable.

## Local AI acceptance test

1. Refresh the live app.
2. Click **Load local AI**.
3. Wait for the header status to change to **Local AI ready** and the button to show **AI loaded**.
4. Load the sample and run the audit again.
5. Confirm the mode label changes from **Rules only** to **Local AI + rules**.
6. If semantic risk confidence crosses the configured threshold, confirm the AI finding displays its local zero-shot confidence as evidence.

A live browser QA pass confirmed the browser-local model loads successfully.

## Graceful-degradation test

LeakLens must remain useful without the ML model. Run the core acceptance test without clicking **Load local AI**. The deterministic evidence engine should still produce the score, ranked findings, and remediation plan.

## Privacy test

Open browser developer tools and run an audit in rules-only mode. The app has no backend submission endpoint and does not persist the pasted website copy. When local AI is enabled, semantic inference is performed in the browser with Transformers.js rather than sending the business copy to a hosted LLM API.

## Input validation

- Fewer than 80 characters: the audit should not run and focus should return to the text field.
- Normal homepage copy: the audit should run without page navigation or reload.
- Re-running an audit: the results should update in place.

## Responsive behavior

The app uses a two-column input/results layout on larger screens and collapses to one column below 760px. Action cards also collapse to one column on narrow screens.

## What is deterministic vs. AI

**Deterministic evidence engine**
- CTA presence/repetition
- phone-only booking language
- form/lead-capture signals
- pricing signals
- Mexico/USD mismatch signal
- trust-proof signals
- differentiation signals

**Browser-local ML layer**
- booking-friction semantics
- trust/credibility semantics
- CTA-strength semantics
- differentiation/value-proposition semantics

**Fusion rule**
AI findings are added only when confidence crosses an explicit threshold. The model is additive and does not replace deterministic evidence.
