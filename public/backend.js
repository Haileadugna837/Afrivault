(function(){
  const config=window.FOUNDRY_CONFIG||{};const base=String(config.apiBase||'').replace(/\/$/,'');const authKey='foundry-supabase-session';let session=null;let hydrating=false;
  const baseBenefitIds=new Set(['aws','qatar','wework','canva','hyatt','selam','notion','linkedin','coursera','safaricom','wellness','jobfair']);
  const configured=()=>Boolean(config.supabaseUrl&&config.supabaseAnonKey&&!String(config.supabaseAnonKey).includes('YOUR_'));
  const json=async response=>{const data=await response.json().catch(()=>({}));if(!response.ok)throw new Error(data.error||data.msg||data.message||`Request failed (${response.status})`);return data};
  function readSession(){try{session=JSON.parse(localStorage.getItem(authKey)||'null')}catch{session=null}return session}
  function saveSession(value){session=value;if(value)localStorage.setItem(authKey,JSON.stringify(value));else localStorage.removeItem(authKey)}
  const hashParams=new URLSearchParams(location.hash.replace(/^#/,''));const callbackType=hashParams.get('type');const authCallbackSession=Boolean(hashParams.get('access_token')&&['recovery','magiclink','signup','invite','email_change'].includes(callbackType));const recoverySession=authCallbackSession&&callbackType==='recovery';if(authCallbackSession){saveSession({access_token:hashParams.get('access_token'),refresh_token:hashParams.get('refresh_token'),expires_at:Math.floor(Date.now()/1000)+Number(hashParams.get('expires_in')||3600)});history.replaceState(null,'',location.pathname+location.search);}
  async function auth(path,options={}){return json(await fetch(`${config.supabaseUrl}/auth/v1${path}`,{...options,headers:{apikey:config.supabaseAnonKey,'content-type':'application/json',...(options.headers||{})}}))}
  async function token(){
    if(!session)readSession();if(!session)return '';
    if((session.expires_at||0)*1000>Date.now()+60000)return session.access_token;
    try{const next=await auth('/token?grant_type=refresh_token',{method:'POST',body:JSON.stringify({refresh_token:session.refresh_token})});saveSession(next);return next.access_token}catch{saveSession(null);return ''}
  }
  async function api(path,options={}){const access=await token();return json(await fetch(`${base}${path}`,{...options,headers:{'content-type':'application/json',...(access?{authorization:`Bearer ${access}`}:{}) ,...(options.headers||{})}}))}
  const profileToMember=p=>({id:p.id,name:p.name,email:p.email,phone:p.phone||'',city:p.city||'',role:p.role,organization:p.organization||'',title:p.title||'',status:p.status,verification:p.verification,onboardingStatus:p.onboarding_status||'complete',phoneVerifiedAt:p.phone_verified_at||null,phoneVerificationChannel:p.phone_verification_channel||null,expires:p.expires,notes:p.notes||'',excludedBenefits:p.excluded_benefit_ids||[],...(p.preferences||{})});
  const benefitToOffer=o=>({id:o.id,brand:o.brand,title:o.title,category:o.category_id,label:o.label,value:o.member_value,color:o.color,text:o.text_color,description:o.description,partnershipDescription:o.partnership_description,companyDescription:o.company_description,eligibility:o.eligibility||[],featured:o.featured,status:o.status,visualMode:o.visual_mode,image:o.image_url,gallery:o.gallery||[]});
  const eventToApp=(e,people)=>({id:e.id,title:e.title,organizer:e.organizer,eventType:e.event_type,customType:e.custom_type,summary:e.summary,description:e.description,status:e.status,featured:e.featured,startAt:e.start_at,endAt:e.end_at,timezone:e.timezone,rsvpDeadline:e.rsvp_deadline,capacity:e.capacity,guestPolicy:e.guest_policy,format:e.format,venue:e.venue,address:e.address,latitude:e.latitude,longitude:e.longitude,mapLabel:e.map_label,onlineLink:e.online_link,costType:e.cost_type,price:e.price,agenda:e.agenda,requirements:e.requirements,dressCode:e.dress_code,ageRestriction:e.age_restriction,accessibility:e.accessibility,accessibilityOptions:e.accessibility_options||[],photographyPolicy:e.photography_policy,idRequirement:e.id_requirement,idRequirementCustom:e.id_requirement_custom,contactEmail:e.contact_email,contactPhone:e.contact_phone,eligibility:e.eligibility||[],visualMode:e.visual_mode,color:e.color,image:e.image_url,allowDaySelection:e.allow_day_selection,openRegistration:e.open_registration,people:people.filter(p=>p.event_id===e.id).map(p=>({id:p.id,type:p.type,name:p.name,title:p.title,description:p.description,website:p.website,image:p.image_url}))});
  const partnerToApp=(p,links)=>({id:p.id,company:p.company,contactName:p.contact_name,email:p.email,status:p.status,benefitIds:links.filter(link=>link.partner_id===p.id).map(link=>link.benefit_id),createdAt:p.created_at});
  function localSet(key,value){localStorage.setItem(key,typeof value==='string'?value:JSON.stringify(value))}
  function hydrate(data){
    hydrating=true;
    try{
      if(data.categories)localSet('foundry-benefit-categories',data.categories.map(c=>({id:c.id,name:c.name,color:c.color,icon:c.icon})));
      if(data.benefits){const offers=data.benefits.map(benefitToOffer),overrides={};offers.forEach(o=>overrides[o.id]=o);localSet('foundry-benefit-overrides',overrides);localSet('foundry-custom-offers',offers.filter(o=>!baseBenefitIds.has(o.id)));localSet('foundry-deleted-benefits',[]);}
      if(data.events){localSet('foundry-events',data.events.map(e=>eventToApp(e,data.eventPeople||[])));localSet('foundry-events-schema','3');}
      if(data.members)localSet('foundry-members',data.members.filter(p=>p.role!=='admin').map(profileToMember));
      if(data.applications)localSet('foundry-applications',data.applications.map(a=>({...a.data,id:a.id,email:a.email,name:a.name,initials:a.name.split(/\s+/).map(part=>part[0]).slice(0,2).join('').toUpperCase(),role:a.role,detail:a.data?.detail||a.data?.title||'',submitted:new Date(a.submitted_at).toLocaleDateString(),status:a.status,submittedAt:a.submitted_at})));
      if(data.partners)localSet('foundry-partners',data.partners.map(p=>partnerToApp(p,data.partnerBenefits||[])));
      if(data.usageLogs)localSet('foundry-usage-logs',data.usageLogs.map(l=>({id:l.id,partnerId:l.partner_id,benefitId:l.benefit_id,memberId:l.member_id,verifiedAt:l.verified_at,status:l.status,updatedAt:l.updated_at,metadata:l.metadata})));
      if(data.settings?.[0])localSet('foundry-admin-settings',data.settings[0].settings||{});
      if(data.benefitEvents){const clicks={},claims={};data.benefitEvents.forEach(row=>{const target=row.event_name==='claim'?claims:clicks;target[row.benefit_id]=(target[row.benefit_id]||0)+1});localSet('foundry-benefit-clicks',clicks);localSet('foundry-benefit-claims',claims);}
      const email=data.actor?.user?.email;if(email&&data.rsvps){const records={};data.rsvps.filter(r=>r.user_id===data.actor.user.id).forEach(r=>records[r.event_id]={status:r.status,email:r.email,days:r.attendance_days||[],guestRequested:r.guest_requested,guestName:r.guest_name,guestEmail:r.guest_email,guestStatus:r.guest_status,updatedAt:r.updated_at});localSet(`foundry-event-rsvps-${email}`,records);}
      if(email&&data.saved)localSet(`foundry-saved-${email}`,data.saved.map(row=>row.benefit_id));
    }finally{hydrating=false;}
  }
  async function signIn(email,password){
    if(!configured())return null;const result=await auth('/token?grant_type=password',{method:'POST',body:JSON.stringify({email,password})});saveSession(result);const data=await api('/api/bootstrap');hydrate(data);return actorAccount(data.actor);
  }
  function actorAccount(actor){if(!actor)return null;if(actor.role==='partner')return {...partnerToApp(actor.partner,[]),role:'partner',name:actor.partner.company,subtitle:'Partner verification portal'};const p=profileToMember(actor.profile);return {...p,role:actor.role,emailConfirmed:Boolean(actor.user?.email_confirmed_at),subtitle:actor.role==='admin'?'Foundry Operations':`${p.title} · ${p.organization}`};}
  async function restore(){if(!configured()||!readSession())return null;try{const data=await api('/api/bootstrap');hydrate(data);return actorAccount(data.actor)}catch{saveSession(null);return null}}
  async function bootstrap(){const data=await api('/api/bootstrap');hydrate(data);return data}
  async function sync(domain,payload){if(!configured()||hydrating)return {offline:true};try{return await api('/api/sync',{method:'POST',body:JSON.stringify({domain,payload})})}catch(error){console.error(`Foundry sync failed: ${domain}`,error);window.dispatchEvent(new CustomEvent('foundry:sync-error',{detail:{domain,error}}));throw error}}
  async function uploadImage(dataUrl,bucket='benefit-images',folder='uploads'){if(!configured())return dataUrl;const result=await api('/api/upload',{method:'POST',body:JSON.stringify({dataUrl,bucket,folder})});return result.url}
  async function issueQr(){return api('/api/qr/issue',{method:'POST',body:'{}'})}
  async function verifyQr(qrToken,benefitId){return api('/api/qr/verify',{method:'POST',body:JSON.stringify({token:qrToken,benefitId})})}
  async function sendEmail(to,template,payload){return api('/api/email/send',{method:'POST',body:JSON.stringify({to,template,payload})})}
  async function registerApplication(application,password){return api('/api/sync',{method:'POST',body:JSON.stringify({domain:'application',payload:{...application,password}})})}
  async function resendApproval(email){return api('/api/onboarding/resend-email',{method:'POST',body:JSON.stringify({email})})}
  async function updateOnboardingContact(payload){return api('/api/onboarding/contact',{method:'POST',body:JSON.stringify(payload)})}
  async function sendPhoneOtp(payload){return api('/api/onboarding/otp-send',{method:'POST',body:JSON.stringify(payload)})}
  async function verifyPhoneOtp(payload){return api('/api/onboarding/otp-check',{method:'POST',body:JSON.stringify(payload)})}
  async function weather(lat,lon,date){return api(`/api/weather?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&date=${encodeURIComponent(date)}`)}
  async function publicEvent(id){const result=await api(`/api/public/event?id=${encodeURIComponent(id)}`);return eventToApp(result.event,result.people||[])}
  async function signOut(){if(session?.access_token)auth('/logout',{method:'POST',headers:{authorization:`Bearer ${session.access_token}`}}).catch(()=>{});saveSession(null)}
  async function requestPasswordReset(email){return auth('/recover',{method:'POST',body:JSON.stringify({email,redirect_to:location.origin+location.pathname})})}
  async function updatePassword(password){const access=await token();return auth('/user',{method:'PUT',headers:{authorization:`Bearer ${access}`},body:JSON.stringify({password})})}
  window.FoundryBackend={configured,signIn,signOut,restore,bootstrap,sync,registerApplication,resendApproval,updateOnboardingContact,sendPhoneOtp,verifyPhoneOtp,uploadImage,issueQr,verifyQr,sendEmail,weather,publicEvent,requestPasswordReset,updatePassword,recoverySession:Boolean(recoverySession),authCallbackSession:Boolean(authCallbackSession),hasSession:()=>Boolean(readSession()),get hydrating(){return hydrating}};
})();
