# LeakLens — Judging Evidence Map

The AI Builders Hackathon evaluates projects on Innovation & Creativity (20%), Technical Implementation (25%), Problem Solving & Impact (25%), User Experience & Design (15%), and Presentation & Demo (15%). This page points reviewers to concrete evidence for each area.

## Innovation & Creativity — 20%

LeakLens is not an LLM prompt wrapper. It separates conversion auditing into two different reasoning jobs:

- observable facts are handled by deterministic evidence rules;
- ambiguous language is handled by a browser-local zero-shot classifier;
- semantic findings affect the audit only above explicit confidence thresholds.

The result is an explainable hybrid system where AI is used only where semantic judgment adds value.

## Technical Implementation — 25%

- Static browser application with no required backend.
- MobileBERT MNLI inference runs locally through Transformers.js.
- Rules engine detects CTA, booking, lead-capture, pricing, currency, trust, and differentiation signals.
- Fusion layer combines deterministic and semantic findings without allowing the model to replace observable evidence.
- Graceful rules-only fallback if local ML cannot load.
- Reproducible acceptance tests are documented in `TESTING.md`.

## Problem Solving & Impact — 25%

LeakLens targets a practical business failure mode: companies buying traffic before fixing conversion friction on the page receiving that traffic.

The output is designed for action rather than diagnosis alone. Each finding includes:

1. severity;
2. evidence;
3. the commercial risk;
4. a prioritized P1/P2/P3 remediation.

The sample demonstrates three realistic failure modes: phone-only booking, a local-market currency mismatch, and weak trust proof.

## User Experience & Design — 15%

- One-screen workflow: paste copy → audit → ranked leak map → action plan.
- Sample data lets a judge evaluate the product immediately.
- Responsive two-column desktop layout collapses to one column on mobile.
- Findings expose evidence instead of asking users to trust a black-box score.
- Local AI is optional and clearly labeled.
- No account or API key is required for the demo.

## Presentation & Demo — 15%

Submission assets include:

- public working product;
- public source;
- presentation deck;
- narrated demo video;
- reproducible judge path;
- explicit responsible-AI and development-assistance disclosure.

## Fastest evaluation path

Open the live app, click **Load sample**, then **Analyze conversion leaks**. A complete audit appears immediately. Local AI can then be loaded separately to verify browser-side semantic inference.
