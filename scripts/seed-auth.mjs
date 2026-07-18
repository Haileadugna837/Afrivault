const url=process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/,'');const key=process.env.SUPABASE_SERVICE_ROLE_KEY;
if(!url||!key)throw new Error('Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY before running seed:auth');
const password=process.env.DEMO_ACCOUNT_PASSWORD||'demo123';
const accounts=[
  {id:'ADMIN',email:process.env.FIRST_ADMIN_EMAIL||'admin@foundry.demo',role:'admin'},
  {id:'FDRY-F-260071',email:'founder@foundry.demo',role:'founder'},
  {id:'FDRY-E-260184',email:'employee@foundry.demo',role:'employee'},
  {id:'FDRY-S-260239',email:'student@foundry.demo',role:'student'},
  {id:'FDRY-O-260306',email:'opportunity@foundry.demo',role:'unemployed'},
  {id:'PARTNER-SELAM',email:'partner@foundry.demo',role:'partner'}
];
const headers={apikey:key,authorization:`Bearer ${key}`,'content-type':'application/json'};
async function request(path,options={}){const response=await fetch(`${url}${path}`,{...options,headers:{...headers,...options.headers}});const data=await response.json().catch(()=>null);if(!response.ok)throw new Error(`${path}: ${response.status} ${JSON.stringify(data)}`);return data}
const listed=await request('/auth/v1/admin/users?page=1&per_page=1000');
for(const account of accounts){
  let user=(listed.users||[]).find(item=>item.email?.toLowerCase()===account.email.toLowerCase());
  if(!user)user=await request('/auth/v1/admin/users',{method:'POST',body:JSON.stringify({email:account.email,password,email_confirm:true,user_metadata:{role:account.role,account_id:account.id}})});
  const table=account.role==='partner'?'partners':'profiles';const filter=`id=eq.${encodeURIComponent(account.id)}`;
  await request(`/rest/v1/${table}?${filter}`,{method:'PATCH',headers:{Prefer:'return=minimal'},body:JSON.stringify({user_id:user.id,email:account.email})});
  console.log(`Linked ${account.role}: ${account.email}`);
}
console.log('Authentication seed complete. Change all demo passwords before production launch.');

