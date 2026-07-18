# Foundry production backend setup

Foundry uses Supabase PostgreSQL, Auth and Storage; Vercel Node.js functions; Twilio SendGrid email; Twilio Verify for WhatsApp OTP; Telegram Gateway for Telegram OTP; signed member QR codes; and server-side event weather.

## 1. Apply the database files

In Supabase SQL Editor, run these in order:

1. `supabase/migrations/202607180001_foundry_backend.sql`
2. `supabase/migrations/202607180002_verified_onboarding.sql`
3. `supabase/cleanup-demo-identities.sql`
4. `supabase/seed.sql`

The cleanup file deletes only the known prototype profiles, applications, partner and Auth users. It preserves benefits, categories, events and settings. The current seed contains content only and no longer creates demo identities.

Keep Row Level Security enabled. The verification challenge table intentionally has no browser policy; only server functions using the service role can access it.

## 2. Configure Supabase and Vercel

Add these Environment Variables to the Vercel project for Production, Preview and Development as appropriate:

```text
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_publishable_or_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_server_only_service_role_key
QR_SIGNING_SECRET=a_random_secret_of_at_least_32_characters
APP_URL=https://your-production-domain.example

TWILIO_SENDGRID_API_KEY=your_sendgrid_api_key
EMAIL_FROM=Foundry <members@your-verified-domain.example>

TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_VERIFY_SERVICE_SID=VA...

TELEGRAM_GATEWAY_TOKEN=your_telegram_gateway_token
```

Never put the service-role key, Twilio token, SendGrid key, Telegram token, QR secret or account passwords in a public file or a `NEXT_PUBLIC_` variable.

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

## 4. Configure email and OTP providers

Twilio SendGrid:

- Authenticate the production domain or verify a testing sender.
- Create an API key with mail-send access.
- Make `EMAIL_FROM` match the verified sender/domain.

Twilio Verify WhatsApp:

- Create a Verify Service and copy its `VA...` SID.
- Complete Twilio/Meta onboarding for your own WhatsApp sender.
- Enable WhatsApp as a verification channel.

Telegram:

- Create a Telegram Gateway account and obtain its access token.
- Fund the Gateway account for real deliveries.
- Recipients must have the submitted phone number registered on Telegram.

## 5. Onboarding behavior

1. An applicant selects a membership type and supplies their own password, email, phone and preferred OTP channel.
2. The password goes directly to Supabase Auth. It is never written to `applications`, local storage or logs.
3. The account remains email-unconfirmed and has no member profile until an administrator approves it.
4. Approval creates the member profile and sends a SendGrid approval/verification link.
5. Clicking the link verifies the email and opens the phone-verification screen.
6. WhatsApp codes use Twilio Verify; Telegram codes use Telegram Gateway.
7. Only a member with an active profile, verified email and verified phone can load benefits/events or generate a QR pass.
8. Changing email or phone resets the corresponding verification gate.

## Security notes

- Rotate any credential ever pasted into a chat or screenshot.
- Keep RLS enabled and keep the service-role key server-only.
- QR tokens expire after two minutes.
- OTP requests and approval-email resends are rate-limited.
- Review the `email_outbox` table for queued or failed messages.
