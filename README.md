# Foundry Private Community App

A mobile-first Telegram Web App prototype for an application-only business community with role-based memberships and benefits.

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

Production authentication, application review, partner claims and signed QR verification require backend integration.
