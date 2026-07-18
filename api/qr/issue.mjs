import {SignJWT} from 'jose';import {method,safeError,send} from '../_lib/http.mjs';import {requireIdentity} from '../_lib/auth.mjs';
export default async function handler(req,res){
  if(!method(req,res,['POST']))return;
  try{
    const actor=await requireIdentity(req,['founder','employee','student','unemployed']);
    if(actor.profile.status!=='active'||actor.profile.verification!=='verified')throw Object.assign(new Error('Inactive member'),{status:403,publicMessage:'Membership must be active and verified'});
    const secret=process.env.QR_SIGNING_SECRET;if(!secret||secret.length<32)throw new Error('QR_SIGNING_SECRET must be at least 32 characters');
    const token=await new SignJWT({memberId:actor.profile.id,role:actor.profile.role,name:actor.profile.name,nonce:crypto.randomUUID()}).setProtectedHeader({alg:'HS256',typ:'JWT'}).setSubject(actor.user.id).setIssuer('foundry-membership').setAudience('foundry-partner').setIssuedAt().setExpirationTime('2m').sign(new TextEncoder().encode(secret));
    send(res,200,{token,expiresIn:120,memberId:actor.profile.id});
  }catch(error){send(res,error.status||500,{error:safeError(error)});}
}

