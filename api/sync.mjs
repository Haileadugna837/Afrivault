import {createHash} from 'node:crypto';import {body,method,safeError,send} from './_lib/http.mjs';import {requireIdentity} from './_lib/auth.mjs';import {sendTemplate} from './_lib/email.mjs';import {authAdmin,insert,remove,sb,select,update,upsert} from './_lib/supabase.mjs';
const snakeMember=m=>({id:m.id,email:m.email,name:m.name,phone:m.phone||'',city:m.city||'',organization:m.organization||'',title:m.title||'',role:m.role,status:m.status||'active',verification:m.verification||'pending',expires:m.expires||null,notes:m.notes||'',excluded_benefit_ids:m.excludedBenefits||[],preferences:{language:m.language||'en',twoFactor:Boolean(m.twoFactor),emailAlerts:m.emailAlerts!==false,telegramAlerts:m.telegramAlerts!==false,usageReceipts:m.usageReceipts!==false}});
const snakeBenefit=o=>({id:o.id,brand:o.brand,title:o.title,category_id:o.category,label:o.label||'',member_value:o.value||'',color:o.color||'#c8fa48',text_color:o.text||'#151613',description:o.description||'',partnership_description:o.partnershipDescription||'',company_description:o.companyDescription||'',eligibility:o.eligibility||[],featured:Boolean(o.featured),status:o.status||'draft',visual_mode:o.visualMode||'color',image_url:o.image||null,gallery:o.gallery||[]});
const snakeEvent=e=>({id:e.id,title:e.title,organizer:e.organizer,event_type:e.eventType,custom_type:e.customType||'',summary:e.summary||'',description:e.description||'',status:e.status||'draft',featured:Boolean(e.featured),start_at:e.startAt,end_at:e.endAt,timezone:e.timezone||'Africa/Addis_Ababa',rsvp_deadline:e.rsvpDeadline,capacity:Number(e.capacity)||1,guest_policy:e.guestPolicy||'members-only',format:e.format||'in-person',venue:e.venue||'',address:e.address||'',latitude:e.latitude??null,longitude:e.longitude??null,map_label:e.mapLabel||'',online_link:e.onlineLink||'',cost_type:e.costType||'free',price:e.price||'',agenda:e.agenda||'',requirements:e.requirements||'',dress_code:e.dressCode||'',age_restriction:e.ageRestriction||'',accessibility:e.accessibility||'',accessibility_options:e.accessibilityOptions||[],photography_policy:e.photographyPolicy||'allowed',id_requirement:e.idRequirement||'none',id_requirement_custom:e.idRequirementCustom||'',contact_email:e.contactEmail||'',contact_phone:e.contactPhone||'',eligibility:e.eligibility||[],visual_mode:e.visualMode||'color',color:e.color||'#c8fa48',image_url:e.image||null,allow_day_selection:Boolean(e.allowDaySelection),open_registration:Boolean(e.openRegistration)});
async function ensureAccount(email,password,metadata={}){
  if(!password)return null;
  try{return await authAdmin('/users',{method:'POST',body:{email,password,email_confirm:true,user_metadata:metadata}})}catch(error){
    if(!String(error.message).toLowerCase().match(/already|registered|exists/))throw error;
    const listed=await authAdmin('/users?page=1&per_page=1000');
    const existing=(listed.users||[]).find(user=>String(user.email||'').toLowerCase()===String(email).toLowerCase());
    if(!existing)throw error;
    return existing;
  }
}
async function syncMembers(records){
  for(const item of records){
    const [existing]=await select('profiles',`id=eq.${encodeURIComponent(item.id)}&select=user_id,email`);let userId=existing?.user_id;
    if(!userId&&item.password){const created=await ensureAccount(item.email,item.password,{role:item.role,member_code:item.id});userId=created?.id||null;}
    if(userId&&item.password)await authAdmin(`/users/${userId}`,{method:'PUT',body:{password:item.password,email:item.email,email_confirm:true,user_metadata:{role:item.role,member_code:item.id}}});
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
      const record=payload||{};const email=String(record.email||'').trim().toLowerCase();const password=String(record.password||'');
      if(!/^\S+@\S+\.\S+$/.test(email))throw Object.assign(new Error('Invalid email'),{status:400,publicMessage:'Enter a valid email address'});
      if(password.length<8||!/[A-Za-z]/.test(password)||!/[0-9]/.test(password))throw Object.assign(new Error('Weak password'),{status:400,publicMessage:'Use at least 8 characters with a letter and a number'});
      if(!['founder','employee','student','unemployed'].includes(record.role))throw Object.assign(new Error('Invalid role'),{status:400,publicMessage:'Choose a valid membership type'});
      const phone=String(record.data?.phone||record.phone||'').replace(/[\s()-]/g,'');
      if(!/^\+[1-9]\d{7,14}$/.test(phone))throw Object.assign(new Error('Invalid phone'),{status:400,publicMessage:'Use international phone format, for example +251911234567'});
      let created;
      try{created=await authAdmin('/users',{method:'POST',body:{email,password,email_confirm:false,user_metadata:{role:record.role,application_id:record.id}}});}
      catch(error){if(String(error.message).toLowerCase().match(/already|registered|exists/))throw Object.assign(error,{status:409,publicMessage:'An application or account already exists for this email. Use login or contact the community team.'});throw error;}
      const safeData={...(record.data||record)};delete safeData.password;delete safeData.confirmPassword;
      try{await insert('applications',[{id:record.id,auth_user_id:created.id,email,name:record.name,phone,role:record.role,status:'pending',data:safeData,submitted_at:record.submittedAt||new Date().toISOString()}]);}
      catch(error){await authAdmin(`/users/${created.id}`,{method:'DELETE'}).catch(()=>{});throw error;}
      await sendTemplate({to:email,template:'application-received',payload:{reference:record.id}}).catch(()=>{});send(res,200,{ok:true,reference:record.id});return;
    }
    if(domain==='guest-registration'){
      const ip=String(req.headers['x-forwarded-for']||req.socket?.remoteAddress||'unknown').split(',')[0].trim();const key=createHash('sha256').update(`guest:${payload.eventId}:${ip}`).digest('hex');const allowed=await sb('/rest/v1/rpc/consume_rate_limit',{method:'POST',body:{p_key:key,p_limit:8,p_window_seconds:3600}});if(!allowed)throw Object.assign(new Error('Rate limit'),{status:429,publicMessage:'Too many registrations were submitted. Please try again later.'});
      const record=payload;await upsert('guest_registrations',[{id:record.id,event_id:record.eventId,name:record.name,email:record.email,phone:record.phone||'',organization:record.organization||'',attendance_days:record.days||[],status:record.status||'going'}]);const [guestEvent]=await select('events',`id=eq.${encodeURIComponent(record.eventId)}&select=title`);await sendTemplate({to:record.email,template:'guest-registration',payload:{name:record.name,eventTitle:guestEvent?.title||'Foundry event'}}).catch(()=>{});send(res,200,{ok:true});return;
    }
    const actor=await requireIdentity(req);
    if(domain==='cleanup-demo-data'){
      if(actor.role!=='admin')throw Object.assign(new Error('Forbidden'),{status:403,publicMessage:'Administrator access is required'});
      const demoMemberIds=['ADMIN','FDRY-F-260071','FDRY-E-260184','FDRY-S-260239','FDRY-O-260306','FDRY-F-260412','FDRY-E-260488','FDRY-S-260522','FDRY-O-260577','FDRY-F-260601','FDRY-E-260634','FDRY-S-260688','FDRY-E-260720'];
      const demoApplicationIds=['AP-1839','AP-1840','AP-1841','AP-1842'];
      const demoBenefitIds=['aws','qatar','wework','canva','hyatt','selam','notion','linkedin','coursera','safaricom','wellness','jobfair'];
      const demoCategoryIds=['business','career','learning','travel','lifestyle','local'];
      const demoEventIds=['EVENT-FOUNDERS','EVENT-COFFEE','EVENT-CAREER','EVENT-WEBINAR'];
      const demoEmails=['admin@foundry.demo','founder@foundry.demo','employee@foundry.demo','student@foundry.demo','opportunity@foundry.demo','partner@foundry.demo','marta@tena.demo','henok@rd.demo','betelhem@aau.demo','yared@career.demo','ruth@orbit.demo','kaleb@nova.demo','saron@astu.demo','dawit@vertex.demo'];
      const inFilter=values=>`in.(${values.map(value=>`"${value}"`).join(',')})`;
      await remove('usage_logs',`or=(member_id.${inFilter(demoMemberIds)},partner_id.eq.PARTNER-SELAM)`);
      await remove('applications',`id=${inFilter(demoApplicationIds)}`);
      await remove('partner_benefits','partner_id=eq.PARTNER-SELAM');
      await remove('partners','id=eq.PARTNER-SELAM');
      await remove('event_people',`event_id=${inFilter(demoEventIds)}`);
      await remove('events',`id=${inFilter(demoEventIds)}`);
      await remove('benefits',`id=${inFilter(demoBenefitIds)}`);
      await remove('benefit_categories',`id=${inFilter(demoCategoryIds)}`);
      await remove('profiles',`id=${inFilter(demoMemberIds)}`);
      const authUsers=await authAdmin('/users?page=1&per_page=1000');
      for(const user of authUsers.users||[])if(demoEmails.includes(String(user.email||'').toLowerCase()))await authAdmin(`/users/${user.id}`,{method:'DELETE'});
      send(res,200,{ok:true,removed:{members:demoMemberIds.length,applications:demoApplicationIds.length,partner:'PARTNER-SELAM',benefits:demoBenefitIds.length,categories:demoCategoryIds.length,events:demoEventIds.length}});return;
    }
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
      const emailChanged=String(payload.email||'').toLowerCase()!==String(actor.user.email||'').toLowerCase();const phoneChanged=String(payload.phone||'')!==String(actor.profile.phone||'');
      const record=snakeMember({...payload,id:actor.profile.id,role:actor.profile.role,status:actor.profile.status,verification:actor.profile.verification});
      await update('profiles',`user_id=eq.${actor.user.id}`,record);
      if(payload.newPassword||emailChanged)await authAdmin(`/users/${actor.user.id}`,{method:'PUT',body:{...(payload.newPassword?{password:payload.newPassword}:{}),...(emailChanged?{email:payload.email,email_confirm:true}:{})}});
      if(emailChanged)await update('applications',`auth_user_id=eq.${actor.user.id}`,{email:payload.email});
      if(phoneChanged)await update('applications',`auth_user_id=eq.${actor.user.id}`,{phone:payload.phone});
      send(res,200,{ok:true,requiresVerification:false});return;
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
      const nextStatus=payload.status==='declined'?'rejected':payload.status;
      const [application]=await select('applications',`id=eq.${encodeURIComponent(payload.id)}&select=*`);
      if(!application)throw Object.assign(new Error('Missing application'),{status:404,publicMessage:'Application was not found'});
      if(nextStatus==='approved'){
        if(!application.auth_user_id)throw Object.assign(new Error('Legacy application has no Auth user'),{status:409,publicMessage:'This older application must be resubmitted so the member can choose a secure password.'});
        const existing=await select('profiles',`user_id=eq.${encodeURIComponent(application.auth_user_id)}&select=*`);
        if(!existing.length){const code=`FDRY-${({founder:'F',employee:'E',student:'S',unemployed:'O'})[application.role]||'M'}-${String(new Date().getFullYear()).slice(-2)}${Math.floor(1000+Math.random()*9000)}`;const data=application.data||{};await upsert('profiles',[{id:code,user_id:application.auth_user_id,email:application.email,name:application.name,phone:application.phone||data.phone||'',city:data.city||'',organization:data.company||data.organization||'',title:data.title||'',role:application.role,status:'active',verification:'verified',onboarding_status:'complete',phone_verified_at:null,phone_verification_channel:null,approved_at:new Date().toISOString(),approved_by:actor.user.id,expires:new Date(Date.now()+365*86400000).toISOString().slice(0,10),notes:'Created from approved membership application.',excluded_benefit_ids:[],preferences:{}}]);
        }
        await authAdmin(`/users/${application.auth_user_id}`,{method:'PUT',body:{email_confirm:true,user_metadata:{role:application.role,application_id:application.id}}});
      }else if(nextStatus==='rejected'&&application.auth_user_id){
        await authAdmin(`/users/${application.auth_user_id}`,{method:'DELETE'}).catch(()=>{});
      }
      await update('applications',`id=eq.${encodeURIComponent(payload.id)}`,{status:nextStatus,...(nextStatus==='approved'?{approved_at:new Date().toISOString(),approved_by:actor.user.id}:{})});
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
