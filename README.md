# Foundry Private Community App

A responsive Telegram Web App and desktop portal for an application-only business community with role-based memberships, benefits, events and partner verification.

## Production backend

The repository includes a production-ready backend foundation:

- Supabase PostgreSQL schema, seed data and Row Level Security
- Supabase email/password authentication and persistent sessions
- Supabase Storage for benefit, event, speaker and sponsor images
- Cross-device member, benefit, event, RSVP and partner data
- Vercel Node.js functions for privileged operations
- Two-minute server-signed membership QR tokens and partner verification logs
- Resend email queue and delivery integration
- Server-side event weather proxy using Open-Meteo
- Local prototype fallback when backend environment variables are absent

See [`BACKEND_SETUP.md`](BACKEND_SETUP.md) for the integration steps.

## Demo accounts

All demo accounts use the password `demo123`.

- `founder@foundry.demo` — Obsidian founder membership
- `employee@foundry.demo` — Cobalt employee membership
- `student@foundry.demo` — Violet student membership
- `opportunity@foundry.demo` — Amber opportunity membership
- `admin@foundry.demo` — community administration

## Run locally

```bash
npm install
npm run dev
```

## Prototype behavior

- Guests begin at member login or a five-step membership application.
- Applications collect identity, contact, professional and community profile details.
- Founder, employee, student and opportunity members have distinct card designs and benefit access.
- The admin can create a benefit and assign it to one or more membership types.
- Administrators can edit member profiles, account status, verification, membership type and individual benefit exclusions.
- The admin overview includes category performance, benefit click ranking and click-to-claim flow analytics.
- Existing benefits can be edited, and new benefits can use either colour-and-words artwork or an uploaded image.
- Admin settings cover profile details, passwords, two-step verification, session timeout, notifications and community defaults.
- Custom benefits, applications and saved offers persist in browser storage.

OpenAI community matching is intentionally not included.
