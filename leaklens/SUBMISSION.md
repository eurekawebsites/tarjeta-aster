# LeakLens - Devpost Submission Copy

## Tagline
Private, explainable local AI that finds the leaks between website traffic and revenue.

## Project story

### Inspiration
Small businesses often spend money on traffic before fixing the last part of the funnel. While reviewing service-business websites, we kept seeing conversion problems that were small technically but expensive commercially: phone-only booking, unclear next steps, mismatched currency labels, weak trust proof, and generic positioning. Existing website audits tend to be either static checklists or opaque LLM reports.

### What it does
LeakLens turns visible homepage copy into an evidence-backed conversion audit. Users paste website text and select the business type. LeakLens returns a 0-100 conversion-health score, ranked findings with severity and evidence, and a P1/P2/P3 action plan.

The app can also load a browser-side zero-shot language model to detect semantic risks that simple keyword rules can miss, including booking friction, weak trust, vague calls to action, and generic positioning.

No account or API key is required. A built-in sample lets judges evaluate the complete workflow immediately without supplying private data.

### How we built it
LeakLens uses a hybrid architecture.

1. A deterministic evidence engine checks observable conversion signals such as CTA language, online booking, forms, price and currency markers, trust proof, and differentiation.
2. A MobileBERT MNLI model runs locally in the browser through Transformers.js for zero-shot classification.
3. A fusion layer adds semantic findings only when model confidence crosses explicit thresholds.
4. A remediation layer maps findings to prioritized fixes.

This architecture is intentionally not a prompt wrapper. Rules handle facts that should be deterministic; AI handles semantic ambiguity.

### Responsible AI and privacy
Business copy is not sent to an LLM provider and no API key is required. AI confidence is presented as a risk signal rather than a factual diagnosis. Deterministic evidence remains visible, and the product continues to work in rules-only mode if the browser model cannot load.

### Real-world value
LeakLens is designed to answer a practical question before a business spends more on acquisition: **is the page receiving that traffic quietly losing high-intent visitors?** Instead of returning a generic marketing grade, each risk is tied to evidence and a prioritized fix. For a service business, recovering even one qualified lead can be worth more than the cost of an audit.

### Challenges
The main design challenge was balancing usefulness with explainability. An opaque score would be easy to produce but hard to trust. We therefore made every finding evidence-backed and kept the AI layer additive rather than authoritative. A second challenge was making inference practical without a backend, which led to browser-side ONNX inference through Transformers.js.

### Accomplishments
- Working responsive prototype with no backend dependency
- Explainable conversion-health scoring
- Ranked findings and prioritized remediation
- Browser-side zero-shot AI with no API key
- Graceful non-AI fallback
- Public documentation and live demo
- Reproducible QA / acceptance-test documentation
- Live browser QA confirmed the scoring, action plan, and local model load successfully

In the verified sample run, LeakLens scored the page **45/100 (High-friction)** and surfaced phone-only booking, a potential Mexico/USD currency mismatch, and thin trust proof, then mapped those findings to two P1 fixes and one P2 fix.

### What we learned
AI is most useful here when it complements deterministic product logic rather than replacing it. The hybrid design creates a more trustworthy workflow: obvious signals remain auditable while the model contributes where language is ambiguous.

### What's next
- Consent-based URL ingestion
- Screenshot and visual-hierarchy analysis
- Accessibility and mobile-layout signals
- Analytics and conversion-event integrations
- Vertical-specific scoring models
- Before/after audit history to measure whether fixes improve outcomes

## Built with
JavaScript, HTML, CSS, Transformers.js, MobileBERT, ONNX, Hugging Face, GitHub Pages

## Hackathon scope
The LeakLens product, scoring workflow, local-AI integration, public demo, documentation, presentation, and submission materials were created for the AI Builders Hackathon 2026.

## Development assistance disclosure
ChatGPT was used during the hackathon as a development assistant for ideation, implementation support, QA planning, copy editing, and submission preparation. LeakLens does not depend on ChatGPT or any hosted LLM API at runtime. Its semantic AI runs locally in the browser through Transformers.js and MobileBERT MNLI.

## Links
Live demo: https://eurekawebsites.github.io/tarjeta-aster/leaklens/

Public source: https://github.com/eurekawebsites/tarjeta-aster/tree/main/leaklens

Presentation deck: https://eurekawebsites.github.io/tarjeta-aster/leaklens/deck.html

QA / acceptance tests: https://github.com/eurekawebsites/tarjeta-aster/blob/main/leaklens/TESTING.md

Judging evidence map: https://github.com/eurekawebsites/tarjeta-aster/blob/main/leaklens/JUDGING.md

## Suggested prize/category
Best SaaS Product
