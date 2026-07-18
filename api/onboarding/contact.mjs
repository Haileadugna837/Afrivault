import {body,method,safeError,send} from '../_lib/http.mjs';
import {requireIdentity} from '../_lib/auth.mjs';
import {authAdmin,select,update} from '../_lib/supabase.mjs';
import {normalizePhone} from '../_lib/verification.mjs';

export default async function handler(req,res){
  if(!method(req,res,['POST']))return;
  try{
    const actor=await requireIdentity(req,['founder','employee','student','unemployed']);
    const input=await body(req);const phone=normalizePhone(input.phone||actor.profile.phone);
    const email=String(input.email||actor.profile.email||'').trim().toLowerCase();
    const channel=String(input.channel||'telegram');
    if(!/^\S+@\S+\.\S+$/.test(email))throw Object.assign(new Error('Invalid email'),{status:400,publicMessage:'Enter a valid email address'});
    if(channel!=='telegram')throw Object.assign(new Error('Invalid channel'),{status:400,publicMessage:'Telegram is the available verification channel'});
    const emailChanged=email!==String(actor.user.email||'').toLowerCase();
    const phoneChanged=phone!==actor.profile.phone;
    if(emailChanged){
      const matches=await select('profiles',`email=eq.${encodeURIComponent(email)}&select=id`);
      if(matches.length)throw Object.assign(new Error('Email exists'),{status:409,publicMessage:'That email is already connected to another account'});
      await authAdmin(`/users/${actor.user.id}`,{method:'PUT',body:{email,email_confirm:true}});
      await update('applications',`auth_user_id=eq.${actor.user.id}`,{email});
    }
    await update('profiles',`user_id=eq.${actor.user.id}`,{
      email,phone,verification:'pending',phone_verified_at:null,phone_verification_channel:channel,
      onboarding_status:'phone_pending',preferences:{...(actor.profile.preferences||{}),preferredOtpChannel:channel}
    });
    await update('applications',`auth_user_id=eq.${actor.user.id}`,{phone,preferred_otp_channel:channel});
    send(res,200,{ok:true,emailChanged,phoneChanged,email,phone,channel});
  }catch(error){send(res,error.status||500,{error:safeError(error)});}
}
