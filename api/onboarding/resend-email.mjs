import {createHash} from 'node:crypto';
import {body,method,safeError,send} from '../_lib/http.mjs';
import {sendTemplate} from '../_lib/email.mjs';
import {authAdmin,sb,select} from '../_lib/supabase.mjs';

export default async function handler(req,res){
  if(!method(req,res,['POST']))return;
  try{
    const input=await body(req);const email=String(input.email||'').trim().toLowerCase();
    if(!/^\S+@\S+\.\S+$/.test(email))throw Object.assign(new Error('Invalid email'),{status:400,publicMessage:'Enter a valid email address'});
    const ip=String(req.headers['x-forwarded-for']||req.socket?.remoteAddress||'unknown').split(',')[0].trim();
    const key=createHash('sha256').update(`approval-email:${ip}:${email}`).digest('hex');
    const allowed=await sb('/rest/v1/rpc/consume_rate_limit',{method:'POST',body:{p_key:key,p_limit:3,p_window_seconds:3600}});
    if(!allowed)throw Object.assign(new Error('Rate limit'),{status:429,publicMessage:'Please wait before requesting another verification email'});
    const [application]=await select('applications',`email=eq.${encodeURIComponent(email)}&status=eq.approved&select=id,email`);
    if(application){
      const link=await authAdmin('/generate_link',{method:'POST',body:{type:'magiclink',email,redirect_to:process.env.APP_URL}});
      await sendTemplate({to:email,template:'email-verification',payload:{verifyUrl:link.action_link||process.env.APP_URL}});
    }
    send(res,200,{ok:true,message:'If this approved account exists, a verification email has been sent.'});
  }catch(error){send(res,error.status||500,{error:safeError(error)});}
}
