-- Store only a keyed hash of Meta WhatsApp OTP values. Plaintext codes are
-- generated in the API function, sent to Meta and then discarded.
alter table public.verification_challenges
  add column if not exists code_hash text;

comment on column public.verification_challenges.code_hash is
  'HMAC-SHA256 of a short-lived WhatsApp OTP; cleared after approval, expiry or final failure.';
