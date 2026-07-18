import {method,safeError,send} from './_lib/http.mjs';
export default async function handler(req,res){
  if(!method(req,res,['GET']))return;
  try{
    const lat=Number(req.query?.lat),lon=Number(req.query?.lon),date=String(req.query?.date||'');if(!Number.isFinite(lat)||!Number.isFinite(lon)||!/^\d{4}-\d{2}-\d{2}$/.test(date))throw Object.assign(new Error('Invalid weather query'),{status:400});
    const url=new URL('https://api.open-meteo.com/v1/forecast');url.searchParams.set('latitude',lat);url.searchParams.set('longitude',lon);url.searchParams.set('hourly','temperature_2m,apparent_temperature,precipitation_probability,weather_code,wind_speed_10m');url.searchParams.set('timezone','auto');url.searchParams.set('start_date',date);url.searchParams.set('end_date',date);
    const response=await fetch(url,{headers:{'user-agent':'Foundry Events/1.0'}});if(!response.ok)throw new Error(`Weather provider ${response.status}`);send(res,200,await response.json(),{'cache-control':'public, s-maxage=1800, stale-while-revalidate=3600'});
  }catch(error){send(res,error.status||502,{error:safeError(error)});}
}
