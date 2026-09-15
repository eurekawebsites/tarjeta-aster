# LeakLens

LeakLens is a privacy-first AI conversion auditor for service-business websites, built for the AI Builders Hackathon 2026.

## Problem
Small businesses often pay for traffic before fixing the last part of the funnel. Phone-only scheduling, currency mistakes, vague calls to action, weak trust proof and unclear positioning can quietly waste high-intent visitors.

## Solution
Paste visible homepage copy into LeakLens and receive a ranked conversion-risk map plus concrete P1/P2/P3 fixes.

## AI architecture
LeakLens uses a hybrid approach:

1. **Evidence engine** — deterministic JavaScript checks detect observable signals such as CTA language, booking paths, price/currency markers, forms, trust proof and differentiation.
2. **Local zero-shot classifier** — `Xenova/mobilebert-uncased-mnli` runs in the browser through Transformers.js. It classifies website language against conversion-risk hypotheses for booking friction, trust, CTA strength and differentiation.
3. **Fusion layer** — semantic AI findings are added only above confidence thresholds. AI output is treated as a risk signal, not ground truth.
4. **Action layer** — each finding is paired with evidence, severity and a concrete remediation.

No API key is required. Analyzed business text is not sent to an LLM provider. The app remains fully usable in explainable rules-only mode if the browser model cannot load.

## Live demo and presentation
- Live app: https://eurekawebsites.github.io/tarjeta-aster/leaklens/
- Presentation deck: https://eurekawebsites.github.io/tarjeta-aster/leaklens/deck.html
- Source: https://github.com/eurekawebsites/tarjeta-aster/tree/main/leaklens

Click **Load sample**, then **Analyze conversion leaks**. Optionally click **Load local AI** first to add browser-side semantic classification.

## Verified behavior
A live browser QA pass confirmed that the sample audit produces a conversion-health score, ranked evidence-backed findings, prioritized P1/P2 remediation, and successfully loads the browser-local AI model.

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

## Target users
Local service businesses, agencies, freelancers and growth teams that want a fast, privacy-friendly audit before spending more on traffic.

## Roadmap
- URL ingestion with explicit consent
- Screenshot and visual-hierarchy analysis
- Accessibility/mobile checks
- Conversion-event integrations
- Vertical-specific scoring
- Before/after audit history

## Development assistance
ChatGPT was used as a development assistant for ideation, implementation support, QA planning, copy editing, and preparation of submission materials. LeakLens itself does not depend on ChatGPT or a hosted LLM API at runtime. Its semantic analysis runs locally in the browser through Transformers.js and MobileBERT MNLI.

Built by Aster Volta / Eureka Websites Tech.