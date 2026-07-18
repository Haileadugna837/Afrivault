const required=(name)=>{const value=process.env[name];if(!value)throw Object.assign(new Error(`${name} is not configured`),{status:503,publicMessage:'This verification channel is not configured yet'});return value};

export function normalizePhone(value){
  const phone=String(value||'').replace(/[\s()-]/g,'');
  if(!/^\+[1-9]\d{7,14}$/.test(phone))throw Object.assign(new Error('Invalid phone'),{status:400,publicMessage:'Enter the phone number in international format, for example +251911234567'});
  return phone;
}

async function twilioRequest(path,values){
  const sid=required('TWILIO_ACCOUNT_SID');
  const token=required('TWILIO_AUTH_TOKEN');
  const response=await fetch(`https://verify.twilio.com/v2${path}`,{
    method:'POST',
    headers:{authorization:`Basic ${Buffer.from(`${sid}:${token}`).toString('base64')}`,'content-type':'application/x-www-form-urlencoded'},
    body:new URLSearchParams(values)
  });
  const data=await response.json().catch(()=>({}));
  if(!response.ok)throw Object.assign(new Error(JSON.stringify(data)),{status:502,publicMessage:'WhatsApp could not send or verify the code. Please try again.'});
  return data;
}

export async function sendWhatsAppCode(phone){
  const service=required('TWILIO_VERIFY_SERVICE_SID');
  const data=await twilioRequest(`/Services/${encodeURIComponent(service)}/Verifications`,{To:phone,Channel:'whatsapp'});
  return {requestId:data.sid,status:data.status};
}

export async function checkWhatsAppCode(phone,code){
  const service=required('TWILIO_VERIFY_SERVICE_SID');
  const data=await twilioRequest(`/Services/${encodeURIComponent(service)}/VerificationCheck`,{To:phone,Code:String(code)});
  return data.status==='approved';
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
