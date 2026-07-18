import {jwtVerify} from 'jose';import {body,method,safeError,send} from '../_lib/http.mjs';import {requireIdentity} from '../_lib/auth.mjs';import {select,upsert} from '../_lib/supabase.mjs';
export default async function handler(req,res){
  if(!method(req,res,['POST']))return;
  try{
    const actor=await requireIdentity(req,['partner','admin']);const input=await body(req);const secret=process.env.QR_SIGNING_SECRET;
    const verified=await jwtVerify(input.token,new TextEncoder().encode(secret),{issuer:'foundry-membership',audience:'foundry-partner'});
    const memberId=verified.payload.memberId;const [member]=await select('profiles',`id=eq.${encodeURIComponent(memberId)}&select=*`);
    if(!member||member.status!=='active'||member.verification!=='verified'||member.onboarding_status!=='complete')throw Object.assign(new Error('Membership unavailable'),{status:403,publicMessage:'Member is not currently active and fully verified'});
    const partnerId=actor.role==='partner'?actor.partner.id:input.partnerId;let benefitId=input.benefitId||null;let eligibleBenefits=[];
    if(partnerId){const assignments=await select('partner_benefits',`partner_id=eq.${encodeURIComponent(partnerId)}&select=benefit_id`);const ids=assignments.map(row=>row.benefit_id);if(ids.length){const rows=await select('benefits',`id=in.(${ids.map(id=>`"${id.replaceAll('"','')}"`).join(',')})&status=eq.active&select=id,title,eligibility`);eligibleBenefits=rows.filter(item=>(item.eligibility||[]).includes(member.role)&&!(member.excluded_benefit_ids||[]).includes(item.id));}}
    if(!eligibleBenefits.length)throw Object.assign(new Error('No eligible assigned benefit'),{status:403,publicMessage:'Membership is valid, but no assigned benefit is available for this member'});
    if(benefitId&&!eligibleBenefits.some(item=>item.id===benefitId))throw Object.assign(new Error('Benefit not eligible'),{status:403});benefitId=benefitId||eligibleBenefits[0].id;
    const log={id:`USE-${Date.now()}-${crypto.randomUUID().slice(0,6)}`,partner_id:partnerId,benefit_id:benefitId,member_id:member.id,verified_at:new Date().toISOString(),status:'verified',metadata:{qrNonce:verified.payload.nonce,verifiedBy:actor.user.id}};
    await upsert('usage_logs',[log]);
    send(res,200,{valid:true,member:{id:member.id,name:member.name,role:member.role,expires:member.expires},eligibleBenefits,log:{id:log.id,partnerId:partnerId,benefitId,status:'verified',verifiedAt:log.verified_at}});
  }catch(error){send(res,error.status||400,{valid:false,error:safeError(error)});}
}
