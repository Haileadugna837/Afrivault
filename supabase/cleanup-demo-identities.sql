-- Removes only the known prototype records originally shipped with Foundry.
-- Review the exact email list below, then run once in Supabase SQL Editor.

begin;

delete from public.usage_logs where member_id in (
  'FDRY-F-260071','FDRY-E-260184','FDRY-S-260239','FDRY-O-260306',
  'FDRY-F-260412','FDRY-E-260488','FDRY-S-260522','FDRY-O-260577',
  'FDRY-F-260601','FDRY-E-260634','FDRY-S-260688','FDRY-E-260720'
) or partner_id='PARTNER-SELAM';

delete from public.applications where id in ('AP-1839','AP-1840','AP-1841','AP-1842')
  or lower(email) in ('marta@tena.demo','henok@rd.demo','betelhem@aau.demo','yared@career.demo');

delete from public.partner_benefits where partner_id='PARTNER-SELAM';
delete from public.partners where id='PARTNER-SELAM' or lower(email)='partner@foundry.demo';

delete from public.event_people where event_id in ('EVENT-FOUNDERS','EVENT-COFFEE','EVENT-CAREER','EVENT-WEBINAR');
delete from public.events where id in ('EVENT-FOUNDERS','EVENT-COFFEE','EVENT-CAREER','EVENT-WEBINAR');

delete from public.benefits where id in (
  'aws','qatar','wework','canva','hyatt','selam','notion','linkedin','coursera','safaricom','wellness','jobfair'
);
delete from public.benefit_categories where id in ('business','career','learning','travel','lifestyle','local');

delete from public.profiles where id in (
  'ADMIN','FDRY-F-260071','FDRY-E-260184','FDRY-S-260239','FDRY-O-260306',
  'FDRY-F-260412','FDRY-E-260488','FDRY-S-260522','FDRY-O-260577',
  'FDRY-F-260601','FDRY-E-260634','FDRY-S-260688','FDRY-E-260720'
) or lower(email) in (
  'admin@foundry.demo','founder@foundry.demo','employee@foundry.demo','student@foundry.demo',
  'opportunity@foundry.demo','marta@tena.demo','henok@rd.demo','betelhem@aau.demo',
  'yared@career.demo','ruth@orbit.demo','kaleb@nova.demo','saron@astu.demo','dawit@vertex.demo'
);

delete from auth.users where lower(email) in (
  'admin@foundry.demo','founder@foundry.demo','employee@foundry.demo',
  'student@foundry.demo','opportunity@foundry.demo','partner@foundry.demo'
);

commit;
