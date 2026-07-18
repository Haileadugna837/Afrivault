import {createHash} from 'node:crypto';
import {body,method,safeError,send} from '../_lib/http.mjs';
import {requireIdentity} from '../_lib/auth.mjs';
import {insert,sb,update} from '../_lib/supabase.mjs';
import {normalizePhone,sendTelegramCode,sendWhatsAppCode} from '../_lib/verification.mjs';

export default async function handler(req,res){
  if(!method(req,res,['POST']))return;
  try{
    const actor=await requireIdentity(req,['founder','employee','student','unemployed']);
    if(!actor.user.email_confirmed_at)throw Object.assign(new Error('Email unverified'),{status:403,publicMessage:'Verify your email before verifying your phone'});
    const input=await body(req);const phone=normalizePhone(input.phone||actor.profile.phone);const channel=String(input.channel||'whatsapp');
    if(!['whatsapp','telegram'].includes(channel))throw Object.assign(new Error('Invalid channel'),{status:400,publicMessage:'Choose WhatsApp or Telegram'});
    const key=createHash('sha256').update(`phone-otp:${actor.user.id}`).digest('hex');
    const allowed=await sb('/rest/v1/rpc/consume_rate_limit',{method:'POST',body:{p_key:key,p_limit:5,p_window_seconds:3600}});
    if(!allowed)throw Object.assign(new Error('Rate limit'),{status:429,publicMessage:'Too many codes were requested. Please try again later.'});
    const provider=channel==='whatsapp'?await sendWhatsAppCode(phone):await sendTelegramCode(phone);
    const [challenge]=await insert('verification_challenges',[{user_id:actor.user.id,channel,phone,provider_request_id:provider.requestId,status:'pending',expires_at:new Date(Date.now()+10*60000).toISOString()}]);
    await update('profiles',`user_id=eq.${actor.user.id}`,{phone,verification:'pending',onboarding_status:'phone_pending',phone_verification_channel:channel,phone_verified_at:null,preferences:{...(actor.profile.preferences||{}),preferredOtpChannel:channel}});
    await update('applications',`auth_user_id=eq.${actor.user.id}`,{phone,preferred_otp_channel:channel});
    send(res,200,{ok:true,challengeId:challenge.id,channel,phone});
  }catch(error){send(res,error.status||500,{error:safeError(error)});}
}
