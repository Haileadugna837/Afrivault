import {send} from './_lib/http.mjs';import {configured} from './_lib/supabase.mjs';
export default function handler(_req,res){send(res,configured()?200:503,{ok:configured(),service:'foundry-api',database:configured()?'configured':'missing-environment'});}

