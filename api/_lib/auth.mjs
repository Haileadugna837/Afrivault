import {select,userFromToken} from './supabase.mjs';
export function bearer(req){return String(req.headers.authorization||'').replace(/^Bearer\s+/i,'').trim()}
export async function identity(req){
  const user=await userFromToken(bearer(req));if(!user)return null;
  const [profile]=await select('profiles',`user_id=eq.${user.id}&select=*`);
  const [partner]=await select('partners',`user_id=eq.${user.id}&select=*`);
  return {user,profile:profile||null,partner:partner||null,role:profile?.role||(partner?'partner':null)};
}
export async function requireIdentity(req,roles=[]){
  const actor=await identity(req);if(!actor)throw Object.assign(new Error('Unauthorized'),{status:401,publicMessage:'Please sign in again'});
  if(roles.length&&!roles.includes(actor.role))throw Object.assign(new Error('Forbidden'),{status:403,publicMessage:'You do not have permission for this action'});
  return actor;
}

