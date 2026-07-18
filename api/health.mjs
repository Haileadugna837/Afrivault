import {send} from './_lib/http.mjs';import {configured,select} from './_lib/supabase.mjs';
const present=(...names)=>names.every(name=>Boolean(process.env[name]));
export default async function handler(_req,res){
  const database=configured();
  let databaseAccess=false;
  if(database)try{await select('applications','select=id&limit=1');databaseAccess=true}catch(error){console.error('Health check database access failed',error)}
  send(res,databaseAccess?200:503,{
    ok:databaseAccess,
    service:'foundry-api',
    onboarding:'admin-approval-only',
    database:databaseAccess?'ready':database?'connection-failed':'missing-environment',
    providers:{
      email:present('TWILIO_SENDGRID_API_KEY','EMAIL_FROM'),
      whatsapp:present('WHATSAPP_ACCESS_TOKEN','WHATSAPP_PHONE_NUMBER_ID','WHATSAPP_OTP_TEMPLATE_NAME','OTP_HASH_SECRET')
    }
  });
}
