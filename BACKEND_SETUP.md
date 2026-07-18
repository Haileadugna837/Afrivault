# Foundry backend setup

The application now supports a Supabase PostgreSQL backend, Supabase Auth and Storage, Vercel server functions, secure signed QR verification, Resend email delivery, server-side weather lookup and browser fallback mode.

## 1. Create the database

In the Supabase SQL Editor, run these files in order:

1. `supabase/migrations/202607180001_foundry_backend.sql`
2. `supabase/seed.sql`

The migration creates tables, indexes, row-level security policies and three public image buckets. The seed adds the current prototype benefits, member records, partner, events and applications.

## 2. Collect keys

From Supabase Project Settings → API, collect:

- Project URL
- Publishable/anon key
- Service-role key

The anon key is designed for browser use. The service-role key must only be placed in Vercel environment variables.

## 3. Configure Vercel

Connect `Haileadugna837/Afrivault` to a Vercel project and add:

```text
NEXT_PUBLIC_SUPABASE_URL=https://ixmlmkryvojamioifjce.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_publishable_key
SUPABASE_SERVICE_ROLE_KEY=your_server_only_service_role_key
QR_SIGNING_SECRET=a_random_secret_of_at_least_32_characters
APP_URL=https://your-production-domain.example
RESEND_API_KEY=optional_until_email_is_enabled
EMAIL_FROM=Foundry <members@your-verified-domain.example>
```

Generate `QR_SIGNING_SECRET` with a password manager or `openssl rand -base64 48`.

## 4. Create login accounts

After loading the seed, run locally with the same server variables:

```bash
npm install
FIRST_ADMIN_EMAIL=you@example.com npm run seed:auth
```

This links the first admin and prototype accounts to Supabase Auth. Change every demo password before a public launch.

In Supabase Authentication → URL Configuration, set **Site URL** to the production domain and add the same domain to **Redirect URLs**. This is required for password recovery links.

## 5. Configure email

Verify your sending domain in Resend, then add `RESEND_API_KEY` and `EMAIL_FROM` in Vercel. Without the key, email requests remain in `email_outbox` with status `queued` and the rest of the application continues working.

## Security notes

- Never commit `.env`, the service-role key, Resend key or QR signing secret.
- Keep Supabase Row Level Security enabled.
- Use the partner portal for QR verification; QR tokens expire after two minutes.
- The app retains local prototype fallback only when no Supabase public key is configured.
