import {method,safeError,send} from './_lib/http.mjs';import {requireIdentity} from './_lib/auth.mjs';import {select,update} from './_lib/supabase.mjs';
const quoted=value=>`"${String(value).replaceAll('"','')}"`;
const idFilter=ids=>ids.length?`id=in.(${ids.map(quoted).join(',')})`:'id=eq.__none__';
export default async function handler(req,res){
  if(!method(req,res,['GET']))return;
  try{
    const actor=await requireIdentity(req);
    if(['founder','employee','student','unemployed'].includes(actor.role)&&actor.profile.status==='active'&&(actor.profile.onboarding_status!=='complete'||actor.profile.verification!=='verified')){
      const approved={onboarding_status:'complete',verification:'verified',phone_verification_channel:null,phone_verified_at:null};
      await update('profiles',`user_id=eq.${actor.user.id}`,approved);
      Object.assign(actor.profile,approved);
    }
    const categories=await select('benefit_categories','select=*&order=sort_order');
    let benefits=[];let events=[];let eventPeople=[];
    if(actor.role==='admin'){
      [benefits,events,eventPeople]=await Promise.all([
        select('benefits','select=*&order=created_at'),select('events','select=*&order=start_at'),select('event_people','select=*&order=sort_order')
      ]);
    }else if(actor.role==='partner'){
      const assignments=await select('partner_benefits',`partner_id=eq.${encodeURIComponent(actor.partner.id)}&select=benefit_id`);
      benefits=await select('benefits',`${idFilter(assignments.map(row=>row.benefit_id))}&status=eq.active&select=*&order=created_at`);
    }else{
      const role=String(actor.profile?.role||'');
      [benefits,events]=await Promise.all([
        select('benefits',`status=eq.active&eligibility=cs.%7B${encodeURIComponent(role)}%7D&select=*&order=created_at`),
        select('events',`status=eq.published&eligibility=cs.%7B${encodeURIComponent(role)}%7D&select=*&order=start_at`)
      ]);
      const exclusions=new Set(actor.profile?.excluded_benefit_ids||[]);
      benefits=benefits.filter(item=>!exclusions.has(item.id));
      if(events.length)eventPeople=await select('event_people',`event_id=in.(${events.map(event=>quoted(event.id)).join(',')})&select=*&order=sort_order`);
    }
    const data={actor,categories,benefits,events,eventPeople};
    if(actor.role==='admin'){
      const [members,applications,partners,partnerBenefits,usageLogs,rsvps,guests,settings,benefitEvents]=await Promise.all([
        select('profiles','select=*&order=created_at'),select('applications','select=*&order=submitted_at.desc'),select('partners','select=*&order=created_at'),
        select('partner_benefits','select=*'),select('usage_logs','select=*&order=verified_at.desc'),select('event_rsvps','select=*'),
        select('guest_registrations','select=*&order=created_at.desc'),select('admin_settings','select=*'),select('benefit_events','select=*')]);
      Object.assign(data,{members,applications,partners,partnerBenefits,usageLogs,rsvps,guests,settings,benefitEvents});
    }else if(actor.role==='partner'){
      const [partnerBenefits,usageLogs]=await Promise.all([select('partner_benefits',`partner_id=eq.${actor.partner.id}&select=*`),select('usage_logs',`partner_id=eq.${actor.partner.id}&select=*&order=verified_at.desc`)]);
      Object.assign(data,{partners:[actor.partner],partnerBenefits,usageLogs});
    }else{
      const [rsvps,saved]=await Promise.all([select('event_rsvps',`user_id=eq.${actor.user.id}&select=*`),select('saved_benefits',`user_id=eq.${actor.user.id}&select=*`)]);
      Object.assign(data,{members:[actor.profile],rsvps,saved});
    }
    send(res,200,data);
  }catch(error){send(res,error.status||500,{error:safeError(error)});}
}
