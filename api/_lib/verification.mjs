import {createHmac,randomInt,timingSafeEqual} from 'node:crypto';

const required=(name)=>{const value=process.env[name];if(!value)throw Object.assign(new Error(`${name} is not configured`),{status:503,publicMessage:'This verification channel is not configured yet'});return value};

export function normalizePhone(value){
  const phone=String(value||'').replace(/[\s()-]/g,'');
  if(!/^\+[1-9]\d{7,14}$/.test(phone))throw Object.assign(new Error('Invalid phone'),{status:400,publicMessage:'Enter the phone number in international format, for example +251911234567'});
  return phone;
}

export function createOtpCode(){
  return String(randomInt(0,1000000)).padStart(6,'0');
}

export function hashOtpCode(userId,phone,code){
  return createHmac('sha256',required('OTP_HASH_SECRET')).update(`${userId}:${normalizePhone(phone)}:${String(code)}`).digest('hex');
}

export function checkWhatsAppCode(userId,phone,code,expectedHash){
  if(!/^[a-f0-9]{64}$/i.test(String(expectedHash||'')))return false;
  const actual=Buffer.from(hashOtpCode(userId,phone,code),'hex');
  const expected=Buffer.from(expectedHash,'hex');
  return actual.length===expected.length&&timingSafeEqual(actual,expected);
}

export async function sendWhatsAppCode(phone,code){
  const token=required('WHATSAPP_ACCESS_TOKEN');
  const phoneNumberId=required('WHATSAPP_PHONE_NUMBER_ID');
  const templateName=required('WHATSAPP_OTP_TEMPLATE_NAME');
  const version=/^v\d+\.\d+$/.test(process.env.WHATSAPP_GRAPH_VERSION||'')?process.env.WHATSAPP_GRAPH_VERSION:'v23.0';
  const response=await fetch(`https://graph.facebook.com/${version}/${encodeURIComponent(phoneNumberId)}/messages`,{
    method:'POST',
    headers:{authorization:`Bearer ${token}`,'content-type':'application/json'},
    body:JSON.stringify({
      messaging_product:'whatsapp',
      recipient_type:'individual',
      to:phone.replace(/^\+/,''),
      type:'template',
      template:{
        name:templateName,
        language:{code:process.env.WHATSAPP_TEMPLATE_LANGUAGE||'en_US'},
        components:[
          {type:'body',parameters:[{type:'text',text:String(code)}]},
          {type:'button',sub_type:'url',index:'0',parameters:[{type:'text',text:String(code)}]}
        ]
      }
    })
  });
  const data=await response.json().catch(()=>({}));
  const requestId=data.messages?.[0]?.id;
  if(!response.ok||!requestId)throw Object.assign(new Error(JSON.stringify(data)),{status:502,publicMessage:'WhatsApp could not send the code. Confirm the Meta sender and authentication template are active, then try again.'});
  return {requestId,status:'sent'};
}

async function telegramRequest(method,payload){
  const response=await fetch(`https://gatewayapi.telegram.org/${method}`,{
    method:'POST',
    headers:{authorization:`Bearer ${required('TELEGRAM_GATEWAY_TOKEN')}`,'content-type':'application/json'},
    body:JSON.stringify(payload)
  });
  const data=await response.json().catch(()=>({}));
  if(!response.ok||!data.ok)throw Object.assign(new Error(JSON.stringify(data)),{status:502,publicMessage:'Telegram could not send or verify the code. Confirm this phone is registered on Telegram and try again.'});
  return data.result;
}

export async function sendTelegramCode(phone){
  const result=await telegramRequest('sendVerificationMessage',{phone_number:phone,code_length:6,ttl:600});
  return {requestId:result.request_id,status:result.delivery_status?.status||'sent'};
}

export async function checkTelegramCode(requestId,code){
  const result=await telegramRequest('checkVerificationStatus',{request_id:requestId,code:String(code)});
  return result.verification_status?.status==='code_valid';
}
