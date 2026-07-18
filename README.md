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
- Twilio SendGrid email queue and approval delivery
- Twilio Verify WhatsApp and Telegram Gateway phone verification
- Server-side event weather proxy using Open-Meteo
- Local prototype fallback when backend environment variables are absent

See [`BACKEND_SETUP.md`](BACKEND_SETUP.md) for the integration steps.

## Accounts

Production seed data no longer creates demo members or a demo administrator. Use `npm run setup:admin` with local environment variables after applying the database migrations. Member credentials are created from the membership application and activated only after admin approval, email verification and phone verification.

## Run locally

```bash
npm install
npm run dev
```

## Prototype behavior

- Guests begin at member login or a five-step membership application.
- Applications collect identity, contact, professional profile, a member-chosen password and preferred phone-verification channel.
- Founder, employee, student and opportunity members have distinct card designs and benefit access.
- The admin can create a benefit and assign it to one or more membership types.
- Administrators can edit member profiles, account status, verification, membership type and individual benefit exclusions.
- The admin overview includes category performance, benefit click ranking and click-to-claim flow analytics.
- Existing benefits can be edited, and new benefits can use either colour-and-words artwork or an uploaded image.
- Admin settings cover profile details, passwords, two-step verification, session timeout, notifications and community defaults.
- Connected deployments persist operational data in Supabase across devices.

OpenAI community matching is intentionally not included.
