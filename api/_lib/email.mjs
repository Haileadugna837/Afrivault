import {sb} from './supabase.mjs';
const escape=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const templates={
  'rsvp-confirmation':p=>({subject:`You’re registered for ${p.eventTitle}`,html:`<h1>You’re on the list.</h1><p>Your RSVP for <strong>${escape(p.eventTitle)}</strong> is confirmed.</p><p>${escape(p.dateLabel||'')}<br>${escape(p.location||'')}</p><p><a href="${escape(p.manageUrl||p.appUrl||'#')}">Manage RSVP</a></p>`}),
  'rsvp-cancelled':p=>({subject:`RSVP cancelled: ${p.eventTitle}`,html:`<h1>Your attendance was cancelled.</h1><p>Your place for <strong>${escape(p.eventTitle)}</strong> has been released.</p>`}),
  'guest-registration':p=>({subject:`Registration confirmed: ${p.eventTitle}`,html:`<h1>Registration confirmed.</h1><p>Thank you, ${escape(p.name)}. You are registered for <strong>${escape(p.eventTitle)}</strong>.</p>`}),
  'application-received':p=>({subject:'We received your Foundry application',html:`<h1>Your application is in review.</h1><p>Reference: <strong>${escape(p.reference)}</strong></p><p>We’ll contact you when the community team has completed its review.</p>`}),
  'account-invitation':p=>({subject:'Your Foundry account is ready',html:`<h1>Welcome to Foundry.</h1><p>Your account has been created.</p><p><a href="${escape(p.loginUrl)}">Sign in</a></p>`})
};
export async function sendTemplate({to,template,payload={}}){
  const render=templates[template];if(!render)throw new Error('Unknown email template');const message=render(payload);
  const [queued]=await sb('/rest/v1/email_outbox',{method:'POST',body:{recipient:to,template,payload,status:process.env.RESEND_API_KEY?'sending':'queued'},headers:{Prefer:'return=representation'}});
  if(!process.env.RESEND_API_KEY)return {queued:true,id:queued?.id};
  try{
    const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{authorization:`Bearer ${process.env.RESEND_API_KEY}`,'content-type':'application/json'},body:JSON.stringify({from:process.env.EMAIL_FROM,to:[to],subject:message.subject,html:message.html})});const result=await response.json();if(!response.ok)throw new Error(JSON.stringify(result));
    await sb(`/rest/v1/email_outbox?id=eq.${queued.id}`,{method:'PATCH',body:{status:'sent',provider_id:result.id,sent_at:new Date().toISOString()}});return {sent:true,id:result.id};
  }catch(error){await sb(`/rest/v1/email_outbox?id=eq.${queued.id}`,{method:'PATCH',body:{status:'failed',error:String(error.message).slice(0,500)}});throw error;}
}

