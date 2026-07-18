const url=process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/,'');
const key=process.env.SUPABASE_SECRET_KEY||process.env.SUPABASE_SERVICE_ROLE_KEY;
const email=process.env.ADMIN_EMAIL?.trim().toLowerCase();
const password=process.env.ADMIN_PASSWORD;
const name=process.env.ADMIN_NAME?.trim()||'Community Admin';

if(!url||!key)throw new Error('Set NEXT_PUBLIC_SUPABASE_URL and either SUPABASE_SECRET_KEY or SUPABASE_SERVICE_ROLE_KEY.');
if(!email||!password)throw new Error('Set ADMIN_EMAIL and ADMIN_PASSWORD in your local environment.');
if(password.length<12)throw new Error('ADMIN_PASSWORD must contain at least 12 characters.');

const headers={apikey:key,...(!key.startsWith('sb_')?{authorization:`Bearer ${key}`}:{ }),'content-type':'application/json'};
async function request(path,options={}){
  const response=await fetch(`${url}${path}`,{...options,headers:{...headers,...options.headers}});
  const data=await response.json().catch(()=>null);
  if(!response.ok)throw new Error(`${path}: ${response.status} ${JSON.stringify(data)}`);
  return data;
}

const listed=await request('/auth/v1/admin/users?page=1&per_page=1000');
let user=(listed.users||[]).find(item=>item.email?.toLowerCase()===email);
if(user){
  user=await request(`/auth/v1/admin/users/${user.id}`,{method:'PUT',body:JSON.stringify({password,email_confirm:true,user_metadata:{role:'admin',account_id:'ADMIN-PRIMARY'}})});
}else{
  user=await request('/auth/v1/admin/users',{method:'POST',body:JSON.stringify({email,password,email_confirm:true,user_metadata:{role:'admin',account_id:'ADMIN-PRIMARY'}})});
}

await request('/rest/v1/profiles?on_conflict=id',{method:'POST',headers:{Prefer:'resolution=merge-duplicates,return=minimal'},body:JSON.stringify([{
  id:'ADMIN-PRIMARY',user_id:user.id,email,name,role:'admin',status:'active',verification:'verified',
  onboarding_status:'complete',approved_at:new Date().toISOString(),phone_verified_at:new Date().toISOString(),
  notes:'Primary community administrator',excluded_benefit_ids:[],preferences:{}
}])});

console.log(`Primary administrator configured for ${email}.`);
