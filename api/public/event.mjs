import {method,safeError,send} from '../_lib/http.mjs';import {select} from '../_lib/supabase.mjs';
export default async function handler(req,res){
  if(!method(req,res,['GET']))return;
  try{const id=String(req.query?.id||'');const [event]=await select('events',`id=eq.${encodeURIComponent(id)}&status=eq.published&open_registration=eq.true&select=*`);if(!event){send(res,404,{error:'Registration is not available'});return;}const people=await select('event_people',`event_id=eq.${encodeURIComponent(id)}&select=*&order=sort_order`);send(res,200,{event,people},{'cache-control':'public, s-maxage=60'});}catch(error){send(res,error.status||500,{error:safeError(error)});}
}
