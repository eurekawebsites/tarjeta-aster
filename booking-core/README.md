# Eureka Booking — reusable V1 core

A configuration-driven booking-request core for the Revenue Sprint offer. The demo is intentionally backend-free so it has **zero operating cost** while we validate sales.

Public GitHub Pages demo: `https://eurekawebsites.github.io/tarjeta-aster/booking-core/`

## What V1 already supports

- Multiple business/tenant configurations from one shared core
- Tenant selection by `?business=<tenant-id>` for demos/configuration proof
- Separate per-tenant local demo storage
- Services, durations and price labels
- Multiple locations
- Provider filtering by service/location
- Business hours, blocked dates, lead time and booking window
- Generated appointment-request slots
- Customer name/phone/email/notes
- Explicit **request vs. confirmed appointment** distinction
- Confirmation screen + folio
- Optional click-to-WhatsApp handoff with a prefilled structured message
- Admin demo showing requests stored in the same browser
- Mobile-first responsive UI

Included proof configurations:

- `clinica-demo-roma` — medical/aesthetic clinic
- `dental-demo` — dental practice
- `spa-demo` — massage/wellness business

These are fictional demo configurations. A prospect-specific preview should use public information only and must not imply that the prospect is already a customer.

## Cost guardrails

The public demo uses `localStorage` only. It sends no SMS, email, WhatsApp API message, payment, or server request.

For a paying client, keep the same UI and replace the storage adapter with a client-owned backend. Preferred first implementation: Firebase/Firestore on a client-owned project, with security rules and only the minimum reads/writes required for bookings. Client pays any provider costs if they later add WhatsApp API, SMS, paid email, payment processing, calendar sync, or other metered services.

**Do not include automated WhatsApp/SMS in the base one-time price.** Click-to-WhatsApp is free from our side and remains the V1 fallback.

## Before first production client

1. Add a storage adapter interface (`demo` / `firestore`).
2. Add authenticated admin access.
3. Add server-side collision protection for confirmed slots.
4. Add cancellation/reschedule tokens.
5. Add business-specific privacy/consent copy.
6. Add audit logging for admin status changes.
7. Add configurable notification adapters, disabled by default.
8. Test timezone/DST behavior for the client's market.

## Scope boundary

This is a booking-request core, not an enterprise scheduling platform. Payments, complex recurring schedules, insurance, medical records, automated WhatsApp, SMS, two-way calendar sync, multi-resource capacity and marketplace behavior are separate paid modules.
