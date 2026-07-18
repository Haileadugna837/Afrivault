import {sb} from './supabase.mjs';

const escape=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const templates={
  'rsvp-confirmation':p=>({subject:`You’re registered for ${p.eventTitle}`,html:`<h1>You’re on the list.</h1><p>Your RSVP for <strong>${escape(p.eventTitle)}</strong> is confirmed.</p><p>${escape(p.dateLabel||'')}<br>${escape(p.location||'')}</p><p><a href="${escape(p.manageUrl||p.appUrl||'#')}">Manage RSVP</a></p>`}),
  'rsvp-cancelled':p=>({subject:`RSVP cancelled: ${p.eventTitle}`,html:`<h1>Your attendance was cancelled.</h1><p>Your place for <strong>${escape(p.eventTitle)}</strong> has been released.</p>`}),
  'guest-registration':p=>({subject:`Registration confirmed: ${p.eventTitle}`,html:`<h1>Registration confirmed.</h1><p>Thank you, ${escape(p.name)}. You are registered for <strong>${escape(p.eventTitle)}</strong>.</p>`}),
  'application-received':p=>({subject:'We received your Foundry application',html:`<h1>Your application is in review.</h1><p>Reference: <strong>${escape(p.reference)}</strong></p><p>We’ll email you when the community team completes its review.</p>`}),
  'account-approved':p=>({subject:'Your Foundry membership is approved',html:`<h1>You’re approved.</h1><p>Your Foundry membership application has been accepted.</p><p><a href="${escape(p.loginUrl||p.appUrl||'#')}">Sign in to your membership</a></p>`}),
  'email-verification':p=>({subject:'Verify your Foundry email',html:`<h1>Verify your email.</h1><p><a href="${escape(p.verifyUrl)}">Confirm this email address</a></p>`}),
  'account-invitation':p=>({subject:'Your Foundry account is ready',html:`<h1>Welcome to Foundry.</h1><p>Your account has been created.</p><p><a href="${escape(p.loginUrl)}">Sign in</a></p>`})
};

function sender(){
  const raw=String(process.env.EMAIL_FROM||'').trim();
  const match=raw.match(/^(.*?)\s*<([^>]+)>$/);
  return match?{name:match[1].trim(),email:match[2].trim()}:{email:raw};
}

export async function sendTemplate({to,template,payload={}}){
  const render=templates[template];
  if(!render)throw new Error('Unknown email template');
  const message=render(payload);
  const providerKey=process.env.TWILIO_SENDGRID_API_KEY||process.env.SENDGRID_API_KEY;
  const storedPayload={...payload};if(storedPayload.verifyUrl)storedPayload.verifyUrl='[secure link omitted]';if(storedPayload.loginUrl)storedPayload.loginUrl='[secure link omitted]';
  const [queued]=await sb('/rest/v1/email_outbox',{method:'POST',body:{recipient:to,template,payload:storedPayload,status:providerKey?'sending':'queued'},headers:{Prefer:'return=representation'}});
  if(!providerKey)return {queued:true,id:queued?.id};
  if(!process.env.EMAIL_FROM)throw new Error('EMAIL_FROM is required');
  try{
    const response=await fetch('https://api.sendgrid.com/v3/mail/send',{
      method:'POST',
      headers:{authorization:`Bearer ${providerKey}`,'content-type':'application/json'},
      body:JSON.stringify({personalizations:[{to:[{email:to}]}],from:sender(),subject:message.subject,content:[{type:'text/html',value:message.html}]})
    });
    const result=await response.json().catch(()=>({}));
    if(!response.ok)throw new Error(JSON.stringify(result));
    const providerId=response.headers.get('x-message-id')||null;
    await sb(`/rest/v1/email_outbox?id=eq.${queued.id}`,{method:'PATCH',body:{status:'sent',provider_id:providerId,sent_at:new Date().toISOString()}});
    return {sent:true,id:providerId};
  }catch(error){
    await sb(`/rest/v1/email_outbox?id=eq.${queued.id}`,{method:'PATCH',body:{status:'failed',error:String(error.message).slice(0,500)}});
    throw error;
  }
}
