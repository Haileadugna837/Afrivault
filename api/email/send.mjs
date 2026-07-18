import {body,method,safeError,send} from '../_lib/http.mjs';import {requireIdentity} from '../_lib/auth.mjs';import {sendTemplate} from '../_lib/email.mjs';
export default async function handler(req,res){
  if(!method(req,res,['POST']))return;
  try{
    const actor=await requireIdentity(req);const input=await body(req);const own=String(input.to||'').toLowerCase()===String(actor.user.email||'').toLowerCase();if(actor.role!=='admin'&&!own)throw Object.assign(new Error('Forbidden'),{status:403});
    const result=await sendTemplate({to:input.to,template:input.template,payload:{...input.payload,appUrl:process.env.APP_URL}});send(res,200,{ok:true,...result});
  }catch(error){send(res,error.status||500,{error:safeError(error)});}
}

