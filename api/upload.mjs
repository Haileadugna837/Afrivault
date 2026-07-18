import {body,method,safeError,send} from './_lib/http.mjs';import {bearer,requireIdentity} from './_lib/auth.mjs';
const allowed=new Set(['image/jpeg','image/png','image/webp']);
export default async function handler(req,res){
  if(!method(req,res,['POST']))return;
  try{
    const actor=await requireIdentity(req);const input=await body(req);const bucket=input.bucket;
    if(!['benefit-images','event-images','profile-images'].includes(bucket))throw Object.assign(new Error('Invalid bucket'),{status:400});
    if(bucket!=='profile-images'&&actor.role!=='admin')throw Object.assign(new Error('Forbidden'),{status:403});
    const match=String(input.dataUrl||'').match(/^data:([^;]+);base64,(.+)$/);if(!match||!allowed.has(match[1]))throw Object.assign(new Error('Invalid image'),{status:400,publicMessage:'Use a JPG, PNG or WebP image'});
    const bytes=Buffer.from(match[2],'base64');if(bytes.length>5*1024*1024)throw Object.assign(new Error('Too large'),{status:413,publicMessage:'Image must be smaller than 5 MB'});
    const extension=match[1]==='image/png'?'png':match[1]==='image/webp'?'webp':'jpg';const folder=bucket==='profile-images'?actor.user.id:(input.folder||'uploads').replace(/[^a-z0-9_-]/gi,'-');const path=`${folder}/${crypto.randomUUID()}.${extension}`;
    const response=await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/${bucket}/${path}`,{method:'POST',headers:{apikey:process.env.SUPABASE_SERVICE_ROLE_KEY,authorization:`Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,'content-type':match[1],'x-upsert':'false'},body:bytes});
    if(!response.ok)throw new Error(`Storage upload failed: ${response.status} ${await response.text()}`);
    send(res,201,{path,url:`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`});
  }catch(error){send(res,error.status||500,{error:safeError(error)});}
}

