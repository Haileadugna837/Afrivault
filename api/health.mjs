import {send} from './_lib/http.mjs';import {configured} from './_lib/supabase.mjs';
const present=(...names)=>names.every(name=>Boolean(process.env[name]));
export default function handler(_req,res){
  const database=configured();
  send(res,database?200:503,{
    ok:database,
    service:'foundry-api',
    onboarding:'telegram-only',
    database:database?'configured':'missing-environment',
    providers:{
      email:present('TWILIO_SENDGRID_API_KEY','EMAIL_FROM'),
      whatsapp:present('WHATSAPP_ACCESS_TOKEN','WHATSAPP_PHONE_NUMBER_ID','WHATSAPP_OTP_TEMPLATE_NAME','OTP_HASH_SECRET'),
      telegram:present('TELEGRAM_GATEWAY_TOKEN')
    }
  });
}
