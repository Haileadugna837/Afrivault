const url=()=>process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/,'');
const service=()=>process.env.SUPABASE_SERVICE_ROLE_KEY;
const anon=()=>process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export function configured(){return Boolean(url()&&service()&&anon())}
export async function sb(path,{method='GET',body,token=service(),headers={}}={}){
  if(!configured())throw Object.assign(new Error('Supabase environment variables are missing'),{publicMessage:'Backend configuration is incomplete'});
  const response=await fetch(`${url()}${path}`,{method,headers:{apikey:service(),'authorization':`Bearer ${token}`,'content-type':'application/json',...headers},body:body===undefined?undefined:JSON.stringify(body)});
  const text=await response.text();let data=null;try{data=text?JSON.parse(text):null}catch{data=text}
  if(!response.ok)throw Object.assign(new Error(`Supabase ${response.status}: ${typeof data==='string'?data:JSON.stringify(data)}`),{status:response.status});
  return data;
}
export async function userFromToken(token){
  if(!token)return null;
  const response=await fetch(`${url()}/auth/v1/user`,{headers:{apikey:anon(),authorization:`Bearer ${token}`}});
  return response.ok?response.json():null;
}
export async function select(table,query=''){return sb(`/rest/v1/${table}?${query}`)}
export async function insert(table,rows){
  if(!rows?.length)return [];
  return sb(`/rest/v1/${table}`,{method:'POST',body:rows,headers:{Prefer:'return=representation'}});
}
export async function upsert(table,rows,onConflict='id'){
  if(!rows?.length)return [];
  return sb(`/rest/v1/${table}?on_conflict=${encodeURIComponent(onConflict)}`,{method:'POST',body:rows,headers:{Prefer:'resolution=merge-duplicates,return=representation'}});
}
export async function update(table,query,values){
  return sb(`/rest/v1/${table}?${query}`,{method:'PATCH',body:values,headers:{Prefer:'return=representation'}});
}
export async function remove(table,query){return sb(`/rest/v1/${table}?${query}`,{method:'DELETE',headers:{Prefer:'return=minimal'}})}
export async function authAdmin(path,{method='GET',body}={}){
  const response=await fetch(`${url()}/auth/v1/admin${path}`,{method,headers:{apikey:service(),authorization:`Bearer ${service()}`,'content-type':'application/json'},body:body===undefined?undefined:JSON.stringify(body)});
  const data=await response.json().catch(()=>null);if(!response.ok)throw new Error(`Auth admin ${response.status}: ${JSON.stringify(data)}`);return data;
}
