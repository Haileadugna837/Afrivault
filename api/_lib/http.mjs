export function send(res,status,data,headers={}) {
  Object.entries({'content-type':'application/json; charset=utf-8','cache-control':'no-store',...headers}).forEach(([key,value])=>res.setHeader(key,value));
  res.status(status).end(JSON.stringify(data));
}
export function method(req,res,allowed) {
  if (allowed.includes(req.method)) return true;
  res.setHeader('allow',allowed.join(', ')); send(res,405,{error:'Method not allowed'}); return false;
}
export async function body(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  let raw=''; for await (const chunk of req) raw+=chunk;
  if (!raw) return {}; try { return JSON.parse(raw); } catch { throw new Error('Invalid JSON body'); }
}
export function safeError(error) {
  console.error(error); return error?.publicMessage || (process.env.NODE_ENV==='development' ? error?.message : 'The request could not be completed');
}

