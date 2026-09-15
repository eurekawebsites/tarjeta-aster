# LeakLens

LeakLens is a privacy-first AI conversion auditor for service-business websites, built for the AI Builders Hackathon 2026.

## Problem
Small businesses often pay for traffic before fixing the last part of the funnel. Phone-only scheduling, currency mistakes, vague calls to action, weak trust proof and unclear positioning can quietly waste high-intent visitors.

## Solution
Paste visible homepage copy into LeakLens and receive a conversion-health score, ranked conversion-risk map, evidence for every finding, and concrete P1/P2/P3 fixes.

## 60-second judge path
1. Open the [live app](https://eurekawebsites.github.io/tarjeta-aster/leaklens/).
2. Click **Load sample**.
3. Click **Analyze conversion leaks**.
4. Inspect the score, ranked evidence-backed findings, and prioritized action plan.
5. Optional: click **Load local AI** and rerun the audit to add browser-side semantic classification.

The sample intentionally contains realistic conversion problems including phone-only booking, a Mexico/USD currency mismatch, and weak trust proof so the audit can be evaluated immediately without supplying private data.

## AI architecture
LeakLens uses a hybrid approach:

1. **Evidence engine** — deterministic JavaScript checks detect observable signals such as CTA language, booking paths, price/currency markers, forms, trust proof and differentiation.
2. **Local zero-shot classifier** — `Xenova/mobilebert-uncased-mnli` runs in the browser through Transformers.js. It classifies website language against conversion-risk hypotheses for booking friction, trust, CTA strength and differentiation.
3. **Fusion layer** — semantic AI findings are added only above confidence thresholds. AI output is treated as a risk signal, not ground truth.
4. **Action layer** — each finding is paired with evidence, severity and a concrete remediation.

This is deliberately not a prompt-wrapper architecture. Deterministic logic handles observable facts; local ML is reserved for semantic ambiguity.

No API key is required. Analyzed business text is not sent to an LLM provider. The app remains fully usable in explainable rules-only mode if the browser model cannot load.

## Why the product can matter
For a service business, one missed high-intent lead can be worth more than the cost of the audit. LeakLens is designed to identify conversion friction before a business spends more on ads or traffic. The output is intentionally actionable: every risk is paired with evidence and a prioritized remediation rather than a generic marketing score.

## Live demo and presentation
- Live app: https://eurekawebsites.github.io/tarjeta-aster/leaklens/
- Presentation deck: https://eurekawebsites.github.io/tarjeta-aster/leaklens/deck.html
- Reproducible QA / acceptance tests: https://github.com/eurekawebsites/tarjeta-aster/blob/main/leaklens/TESTING.md
- Source: https://github.com/eurekawebsites/tarjeta-aster/tree/main/leaklens

## Verified behavior
A live browser QA pass confirmed that the sample audit produces a conversion-health score, ranked evidence-backed findings, prioritized P1/P2 remediation, and successfully loads the browser-local AI model. In the verified sample run, LeakLens scored the page **45/100 (High-friction)** and surfaced three ranked issues: phone-only booking, a potential currency mismatch, and thin trust proof.

## Tech
- HTML/CSS/JavaScript
- Transformers.js 4.2 via CDN
- MobileBERT MNLI ONNX model
- Browser-side inference
- GitHub Pages static hosting

## Responsible AI
- AI confidence is displayed as evidence, not fact.
- Deterministic signals remain inspectable.
- No user data is persisted.
- The product has a non-AI fallback.
- Semantic AI findings are thresholded before they can affect the audit.

## Target users
Local service businesses, agencies, freelancers and growth teams that want a fast, privacy-friendly audit before spending more on traffic.

## Hackathon scope
The LeakLens product, scoring workflow, local-AI integration, public demo, documentation, presentation, and submission materials were created for the AI Builders Hackathon 2026. General-purpose development tools and open-source libraries are disclosed below.

## Roadmap
- Consent-based URL ingestion
- Screenshot and visual-hierarchy analysis
- Accessibility/mobile checks
- Analytics and conversion-event integrations
- Vertical-specific scoring
- Before/after audit history to measure whether fixes improve outcomes

## Development assistance and third-party technology
ChatGPT was used as a development assistant for ideation, implementation support, QA planning, copy editing, and preparation of submission materials. LeakLens itself does not depend on ChatGPT or a hosted LLM API at runtime. Its semantic analysis runs locally in the browser through Transformers.js and MobileBERT MNLI.

Third-party/open-source technology used at runtime includes Transformers.js and the `Xenova/mobilebert-uncased-mnli` model. GitHub Pages hosts the static application.

Built by Aster Volta / Eureka Websites Tech.