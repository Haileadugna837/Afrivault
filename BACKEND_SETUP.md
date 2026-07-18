# Foundry production backend setup

Foundry uses Supabase PostgreSQL, Auth and Storage; Vercel Node.js functions; signed member QR codes; and server-side event weather. The current pilot uses administrator approval as the only membership verification gate.

## 1. Apply the database files

In Supabase SQL Editor, run these in order:

1. `supabase/migrations/202607180001_foundry_backend.sql`
2. `supabase/migrations/202607180002_verified_onboarding.sql`
3. `supabase/migrations/202607180004_admin_approval_only.sql`
4. `supabase/cleanup-demo-identities.sql`
5. `supabase/seed.sql`

The cleanup file deletes only the known prototype profiles, applications, partner and Auth users. It preserves benefits, categories, events and settings. The current seed contains content only and no longer creates demo identities.

Keep Row Level Security enabled. The verification challenge table intentionally has no browser policy; only server functions using the service role can access it.

## 2. Configure Supabase and Vercel

Add these Environment Variables to the Vercel project for Production, Preview and Development as appropriate:

```text
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
SUPABASE_SECRET_KEY=your_server_only_secret_key
QR_SIGNING_SECRET=a_random_secret_of_at_least_32_characters
APP_URL=https://your-production-domain.example

TWILIO_SENDGRID_API_KEY=your_sendgrid_api_key
EMAIL_FROM=Foundry <members@your-verified-domain.example>

WHATSAPP_ACCESS_TOKEN=your_server-only-permanent-system-user-token
WHATSAPP_PHONE_NUMBER_ID=your_meta_phone_number_id
WHATSAPP_OTP_TEMPLATE_NAME=afrivault_verification_code
WHATSAPP_TEMPLATE_LANGUAGE=en_US
WHATSAPP_GRAPH_VERSION=v23.0
OTP_HASH_SECRET=a_separate_random_secret_of_at_least_32_characters

```

Never put the secret/service-role key, Meta token, SendGrid key, OTP/QR secrets or account passwords in a public file or a `NEXT_PUBLIC_` variable.

In Supabase Authentication → URL Configuration, set the Site URL to `APP_URL` and add the production/preview domains to Redirect URLs. Approval and email-change links depend on this.

## 3. Create the primary administrator

Change the password previously shared in chat. Then run this from a trusted local terminal; do not paste the password into source files:

```bash
export NEXT_PUBLIC_SUPABASE_URL='https://your-project.supabase.co'
export SUPABASE_SERVICE_ROLE_KEY='your-server-only-key'
export ADMIN_EMAIL='your-admin-email@example.com'
export ADMIN_PASSWORD='a-new-unique-password'
export ADMIN_NAME='Community Admin'
npm run setup:admin
```

Remove `ADMIN_PASSWORD` from the terminal environment after the command completes. The script creates or updates the confirmed primary Supabase Auth user and links the `ADMIN-PRIMARY` profile.

## 4. Optional future communication providers

Current pilot requirement:

- No messaging provider or phone OTP is required.
- Administrator approval confirms the applicant's login email and activates membership access.

Reserved for the later email and WhatsApp phase:

Twilio SendGrid:

- Authenticate the production domain or verify a testing sender.
- Create an API key with mail-send access.
- Make `EMAIL_FROM` match the verified sender/domain.

Meta WhatsApp Cloud API:

- Create or connect a WhatsApp Business Account in a Meta app.
- Register the production sender number and copy its Phone Number ID.
- Create an `AUTHENTICATION` template with a copy-code OTP button, and set `WHATSAPP_OTP_TEMPLATE_NAME` to the approved template's exact name.
- Use a permanent system-user token with `whatsapp_business_messaging` permission in production. Temporary dashboard tokens are suitable only for a short test.
- The API generates a six-digit code and stores only its keyed HMAC hash. Never reuse `OTP_HASH_SECRET` as a public value.

## 5. Onboarding behavior

1. An applicant selects a membership type and supplies their own password, email, phone and professional details.
2. The password goes directly to Supabase Auth. It is never written to `applications`, local storage or logs.
3. The account remains email-unconfirmed and has no member profile until an administrator approves it.
4. Approval creates the member profile and activates the applicant's email/password login.
5. The approved applicant signs in immediately; there is no Telegram or phone-verification screen.
6. SendGrid email and Meta WhatsApp are dormant and can be enabled in a later phase.
7. Only an approved member with an active profile can load benefits/events or generate a QR pass.
8. Members can update their email and phone from account settings without entering an OTP during this pilot.

## Security notes

- Rotate any credential ever pasted into a chat or screenshot.
- Keep RLS enabled and keep the service-role key server-only.
- QR tokens expire after two minutes.
- Public applications and guest registrations are rate-limited.
- Review the `email_outbox` table for queued or failed messages.
