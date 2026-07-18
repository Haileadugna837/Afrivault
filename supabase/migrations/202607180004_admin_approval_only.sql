-- The pilot now uses administrator approval as the only membership gate.
-- Approved active members do not need a phone OTP step.
alter table public.applications alter column preferred_otp_channel drop not null;
alter table public.applications alter column preferred_otp_channel drop default;

drop table if exists public.verification_challenges;

update public.profiles
set onboarding_status='complete',
    verification='verified',
    phone_verified_at=null,
    phone_verification_channel=null
where role in ('founder','employee','student','unemployed')
  and status='active'
  and (onboarding_status<>'complete' or verification<>'verified');
