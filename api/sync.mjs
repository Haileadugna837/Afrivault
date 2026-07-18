import {createHash} from 'node:crypto';import {body,method,safeError,send} from './_lib/http.mjs';import {requireIdentity} from './_lib/auth.mjs';import {sendTemplate} from './_lib/email.mjs';import {authAdmin,insert,remove,sb,select,update,upsert} from './_lib/supabase.mjs';
const snakeMember=m=>({id:m.id,email:m.email,name:m.name,phone:m.phone||'',city:m.city||'',organization:m.organization||'',title:m.title||'',role:m.role,status:m.status||'active',verification:m.verification||'pending',expires:m.expires||null,notes:m.notes||'',excluded_benefit_ids:m.excludedBenefits||[],preferences:{language:m.language||'en',twoFactor:Boolean(m.twoFactor),emailAlerts:m.emailAlerts!==false,telegramAlerts:m.telegramAlerts!==false,usageReceipts:m.usageReceipts!==false}});
const snakeBenefit=o=>({id:o.id,brand:o.brand,title:o.title,category_id:o.category,label:o.label||'',member_value:o.value||'',color:o.color||'#c8fa48',text_color:o.text||'#151613',description:o.description||'',partnership_description:o.partnershipDescription||'',company_description:o.companyDescription||'',eligibility:o.eligibility||[],featured:Boolean(o.featured),status:o.status||'draft',visual_mode:o.visualMode||'color',image_url:o.image||null,gallery:o.gallery||[]});
const snakeEvent=e=>({id:e.id,title:e.title,organizer:e.organizer,event_type:e.eventType,custom_type:e.customType||'',summary:e.summary||'',description:e.description||'',status:e.status||'draft',featured:Boolean(e.featured),start_at:e.startAt,end_at:e.endAt,timezone:e.timezone||'Africa/Addis_Ababa',rsvp_deadline:e.rsvpDeadline,capacity:Number(e.capacity)||1,guest_policy:e.guestPolicy||'members-only',format:e.format||'in-person',venue:e.venue||'',address:e.address||'',latitude:e.latitude??null,longitude:e.longitude??null,map_label:e.mapLabel||'',online_link:e.onlineLink||'',cost_type:e.costType||'free',price:e.price||'',agenda:e.agenda||'',requirements:e.requirements||'',dress_code:e.dressCode||'',age_restriction:e.ageRestriction||'',accessibility:e.accessibility||'',accessibility_options:e.accessibilityOptions||[],photography_policy:e.photographyPolicy||'allowed',id_requirement:e.idRequirement||'none',id_requirement_custom:e.idRequirementCustom||'',contact_email:e.contactEmail||'',contact_phone:e.contactPhone||'',eligibility:e.eligibility||[],visual_mode:e.visualMode||'color',color:e.color||'#c8fa48',image_url:e.image||null,allow_day_selection:Boolean(e.allowDaySelection),open_registration:Boolean(e.openRegistration)});
async function ensureAccount(email,password,metadata={}){
  if(!password)return null;
  try{return await authAdmin('/users',{method:'POST',body:{email,password,email_confirm:true,user_metadata:metadata}})}catch(error){
    if(!String(error.message).toLowerCase().includes('already'))throw error;return null;
  }
}
async function syncMembers(records){
  for(const item of records){
    const [existing]=await select('profiles',`id=eq.${encodeURIComponent(item.id)}&select=user_id,email`);let userId=existing?.user_id;
    if(!userId&&item.password){const created=await ensureAccount(item.email,item.password,{role:item.role,member_code:item.id});userId=created?.id||null;}
    if(userId&&item.password)await authAdmin(`/users/${userId}`,{method:'PUT',body:{password:item.password,email:item.email}});
    await upsert('profiles',[{...snakeMember(item),...(userId?{user_id:userId}:{})}]);
  }
}
async function syncPartners(records){
  for(const item of records){
    const [existing]=await select('partners',`id=eq.${encodeURIComponent(item.id)}&select=user_id,email`);let userId=existing?.user_id;
    if(!userId&&item.password){const created=await ensureAccount(item.email,item.password,{role:'partner',partner_id:item.id});userId=created?.id||null;}
    if(userId&&item.password)await authAdmin(`/users/${userId}`,{method:'PUT',body:{password:item.password,email:item.email}});
    await upsert('partners',[{id:item.id,email:item.email,company:item.company,contact_name:item.contactName||'',status:item.status||'active',...(userId?{user_id:userId}:{})}]);
    await remove('partner_benefits',`partner_id=eq.${encodeURIComponent(item.id)}`);
    await upsert('partner_benefits',(item.benefitIds||[]).map(benefitId=>({partner_id:item.id,benefit_id:benefitId})),'partner_id,benefit_id');
  }
}
export default async function handler(req,res){
  if(!method(req,res,['POST']))return;
  try{
    const input=await body(req);const domain=input.domain;const payload=input.payload;
    if(domain==='application'){
      const ip=String(req.headers['x-forwarded-for']||req.socket?.remoteAddress||'unknown').split(',')[0].trim();const key=createHash('sha256').update(`application:${ip}`).digest('hex');const allowed=await sb('/rest/v1/rpc/consume_rate_limit',{method:'POST',body:{p_key:key,p_limit:5,p_window_seconds:3600}});if(!allowed)throw Object.assign(new Error('Rate limit'),{status:429,publicMessage:'Too many applications were submitted. Please try again later.'});
      const record=payload;await upsert('applications',[{id:record.id,email:record.email,name:record.name,role:record.role,status:record.status||'pending',data:record.data||record,submitted_at:record.submittedAt||new Date().toISOString()}]);await sendTemplate({to:record.email,template:'application-received',payload:{reference:record.id}}).catch(()=>{});send(res,200,{ok:true});return;
    }
    if(domain==='guest-registration'){
      const ip=String(req.headers['x-forwarded-for']||req.socket?.remoteAddress||'unknown').split(',')[0].trim();const key=createHash('sha256').update(`guest:${payload.eventId}:${ip}`).digest('hex');const allowed=await sb('/rest/v1/rpc/consume_rate_limit',{method:'POST',body:{p_key:key,p_limit:8,p_window_seconds:3600}});if(!allowed)throw Object.assign(new Error('Rate limit'),{status:429,publicMessage:'Too many registrations were submitted. Please try again later.'});
      const record=payload;await upsert('guest_registrations',[{id:record.id,event_id:record.eventId,name:record.name,email:record.email,phone:record.phone||'',organization:record.organization||'',attendance_days:record.days||[],status:record.status||'going'}]);const [guestEvent]=await select('events',`id=eq.${encodeURIComponent(record.eventId)}&select=title`);await sendTemplate({to:record.email,template:'guest-registration',payload:{name:record.name,eventTitle:guestEvent?.title||'Foundry event'}}).catch(()=>{});send(res,200,{ok:true});return;
    }
    const actor=await requireIdentity(req);
    if(domain==='rsvps'){
      const rows=Object.entries(payload||{}).map(([eventId,r])=>({event_id:eventId,user_id:actor.user.id,status:r.status,email:r.email||actor.user.email||'',attendance_days:r.days||[],guest_requested:Boolean(r.guestRequested),guest_name:r.guestName||'',guest_email:r.guestEmail||'',guest_status:r.guestRequested?'requested':'not-requested'}));
      await upsert('event_rsvps',rows,'event_id,user_id');send(res,200,{ok:true});return;
    }
    if(domain==='saved'){
      await remove('saved_benefits',`user_id=eq.${actor.user.id}`);await upsert('saved_benefits',(payload||[]).map(benefitId=>({user_id:actor.user.id,benefit_id:benefitId})),'user_id,benefit_id');send(res,200,{ok:true});return;
    }
    if(domain==='benefit-event'){
      await insert('benefit_events',[{benefit_id:payload.benefitId,user_id:actor.user.id,event_name:payload.eventName}]);send(res,200,{ok:true});return;
    }
    if(domain==='profile'){
      const record=snakeMember({...payload,id:actor.profile.id,role:actor.profile.role,status:actor.profile.status,verification:actor.profile.verification});
      await update('profiles',`user_id=eq.${actor.user.id}`,record);
      if(payload.newPassword||payload.email!==actor.user.email)await authAdmin(`/users/${actor.user.id}`,{method:'PUT',body:{...(payload.newPassword?{password:payload.newPassword}:{}),...(payload.email!==actor.user.email?{email:payload.email,email_confirm:true}:{})}});send(res,200,{ok:true});return;
    }
    if(domain==='usage-status'&&['partner','admin'].includes(actor.role)){
      const [log]=await select('usage_logs',`id=eq.${encodeURIComponent(payload.id)}&select=*`);if(!log||(actor.role==='partner'&&log.partner_id!==actor.partner.id))throw Object.assign(new Error('Forbidden'),{status:403});
      await update('usage_logs',`id=eq.${encodeURIComponent(payload.id)}`,{status:payload.status,benefit_id:payload.benefitId||log.benefit_id});send(res,200,{ok:true});return;
    }
    if(domain==='partner-profile'&&actor.role==='partner'){
      await update('partners',`id=eq.${encodeURIComponent(actor.partner.id)}`,{company:payload.company,contact_name:payload.contactName||'',email:payload.email});
      if(payload.newPassword)await authAdmin(`/users/${actor.user.id}`,{method:'PUT',body:{password:payload.newPassword,email:payload.email}});send(res,200,{ok:true});return;
    }
    if(actor.role!=='admin')throw Object.assign(new Error('Forbidden'),{status:403});
    if(domain==='application-status'){
      const nextStatus=payload.status==='declined'?'rejected':payload.status;await update('applications',`id=eq.${encodeURIComponent(payload.id)}`,{status:nextStatus});
      if(nextStatus==='approved'){
        const [application]=await select('applications',`id=eq.${encodeURIComponent(payload.id)}&select=*`);const existing=application?await select('profiles',`email=eq.${encodeURIComponent(application.email)}&select=*`):[];
        if(application&&!existing.length){const code=`FDRY-${({founder:'F',employee:'E',student:'S',unemployed:'O'})[application.role]||'M'}-${String(new Date().getFullYear()).slice(-2)}${Math.floor(1000+Math.random()*9000)}`;const temporary=crypto.randomUUID()+crypto.randomUUID();const created=await ensureAccount(application.email,temporary,{role:application.role,member_code:code});const data=application.data||{};await upsert('profiles',[{id:code,user_id:created.id,email:application.email,name:application.name,phone:data.phone||'',city:data.city||'',organization:data.company||data.organization||'',title:data.title||'',role:application.role,status:'active',verification:'verified',expires:new Date(Date.now()+365*86400000).toISOString().slice(0,10),notes:'Created from approved membership application.',excluded_benefit_ids:[],preferences:{}}]);
          const link=await authAdmin('/generate_link',{method:'POST',body:{type:'recovery',email:application.email,redirect_to:process.env.APP_URL}}).catch(()=>null);await sendTemplate({to:application.email,template:'account-invitation',payload:{loginUrl:link?.action_link||process.env.APP_URL}}).catch(()=>{});
        }
      }
    }
    else if(domain==='delete-benefit'){
      await update('benefits',`id=eq.${encodeURIComponent(payload.id)}`,{status:'archived'});
      await remove('partner_benefits',`benefit_id=eq.${encodeURIComponent(payload.id)}`);
    }
    else if(domain==='delete-event')await remove('events',`id=eq.${encodeURIComponent(payload.id)}`);
    else if(domain==='delete-category')await remove('benefit_categories',`id=eq.${encodeURIComponent(payload.id)}`);
    else if(domain==='members')await syncMembers(payload||[]);
    else if(domain==='partners')await syncPartners(payload||[]);
    else if(domain==='categories')await upsert('benefit_categories',(payload||[]).map((c,index)=>({id:c.id,name:c.name,color:c.color,icon:c.icon||'◇',sort_order:index})));
    else if(domain==='benefits')await upsert('benefits',(payload||[]).map(snakeBenefit));
    else if(domain==='events'){
      await upsert('events',(payload||[]).map(snakeEvent));
      for(const event of payload||[]){await remove('event_people',`event_id=eq.${encodeURIComponent(event.id)}`);await upsert('event_people',(event.people||[]).map((p,index)=>({id:p.id||`PERSON-${event.id}-${index}`,event_id:event.id,type:p.type,name:p.name,title:p.title||'',description:p.description||'',website:p.website||'',image_url:p.image||null,sort_order:index})));}
    }
    else if(domain==='applications')await upsert('applications',(payload||[]).map(a=>({id:a.id,email:a.email||a.data?.email||`${a.id}@pending.local`,name:a.name,role:a.role,status:a.status||'pending',data:a.data||a})));
    else if(domain==='settings')await upsert('admin_settings',[{id:'community',settings:payload||{}}]);
    else if(domain==='usage-logs')await upsert('usage_logs',(payload||[]).map(l=>({id:l.id,partner_id:l.partnerId,benefit_id:l.benefitId||null,member_id:l.memberId,verified_at:l.verifiedAt||new Date().toISOString(),status:l.status||'verified',metadata:l.metadata||{}})));
    else throw Object.assign(new Error('Unknown sync domain'),{status:400,publicMessage:'Unsupported data operation'});
    send(res,200,{ok:true});
  }catch(error){send(res,error.status||500,{error:safeError(error)});}
}
