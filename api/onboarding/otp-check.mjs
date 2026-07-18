import {body,method,safeError,send} from '../_lib/http.mjs';
import {requireIdentity} from '../_lib/auth.mjs';
import {select,update} from '../_lib/supabase.mjs';
import {checkTelegramCode,checkWhatsAppCode} from '../_lib/verification.mjs';

export default async function handler(req,res){
  if(!method(req,res,['POST']))return;
  try{
    const actor=await requireIdentity(req,['founder','employee','student','unemployed']);
    const input=await body(req);const code=String(input.code||'').trim();const challengeId=String(input.challengeId||'');
    if(!/^\d{4,8}$/.test(code))throw Object.assign(new Error('Invalid code'),{status:400,publicMessage:'Enter the numeric code you received'});
    const [challenge]=await select('verification_challenges',`id=eq.${encodeURIComponent(challengeId)}&user_id=eq.${actor.user.id}&select=*`);
    if(!challenge||challenge.status!=='pending')throw Object.assign(new Error('Missing challenge'),{status:400,publicMessage:'Request a new verification code'});
    if(new Date(challenge.expires_at).getTime()<Date.now()){await update('verification_challenges',`id=eq.${challenge.id}`,{status:'expired',code_hash:null});throw Object.assign(new Error('Expired'),{status:400,publicMessage:'That code expired. Request a new one.'});}
    if(challenge.attempts>=5){await update('verification_challenges',`id=eq.${challenge.id}`,{status:'failed',code_hash:null});throw Object.assign(new Error('Too many attempts'),{status:429,publicMessage:'Request a new verification code'});}
    const valid=challenge.channel==='whatsapp'?checkWhatsAppCode(actor.user.id,challenge.phone,code,challenge.code_hash):await checkTelegramCode(challenge.provider_request_id,code);
    if(!valid){const failed=challenge.attempts>=4;await update('verification_challenges',`id=eq.${challenge.id}`,{attempts:challenge.attempts+1,status:failed?'failed':'pending',code_hash:failed?null:challenge.code_hash});throw Object.assign(new Error('Wrong code'),{status:400,publicMessage:'The code is incorrect. Check the message and try again.'});}
    const verifiedAt=new Date().toISOString();
    await update('verification_challenges',`id=eq.${challenge.id}`,{status:'approved',attempts:challenge.attempts+1,code_hash:null});
    await update('profiles',`user_id=eq.${actor.user.id}`,{phone:challenge.phone,verification:'verified',onboarding_status:'complete',phone_verified_at:verifiedAt,phone_verification_channel:challenge.channel});
    send(res,200,{ok:true,verifiedAt});
  }catch(error){send(res,error.status||500,{error:safeError(error)});}
}
