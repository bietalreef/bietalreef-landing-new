const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const { CITY, CATEGORY, SERVICE_INTENTS } = require('../data/localServices');
const { pageModel, localPath, localSitemap, cityServiceGate, localSearchDimensions } = require('../lib/localServices');
const provider = { id:'471b909d-3481-4df2-a82e-739e786511d3',slug:'alrehab-home-clean', name:{ar:'الرحاب',en:'Alrehab'},published:true,verified:true,visibility:{directory:true},coverage:[{emirate:CITY.emirate,city:CITY.slug,areas:['al-jimi'],approved:true}],services:SERVICE_INTENTS.slice(0,2).map((item,i)=>({id:'real-card-'+i,entityId:'real-taxonomy-'+i,providerServiceId:'real-row-'+i,sourceSlug:item.sourceSlugs[0],slug:item.slug,category:CATEGORY.slug,published:true,provenance:'provider_services',title:item.name,summary:{ar:'وصف منشور',en:'Published description'}}))};
test('city service AR/EN: truth gate, unique metadata, entity schema and breadcrumbs',()=>{
 for(const intent of SERVICE_INTENTS.slice(0,2)) for(const locale of ['ar','en']){
  const model=pageModel({locale,category:CATEGORY.slug,service:intent.slug,providers:[provider]});
  assert.equal(model.indexable,true);assert.equal(model.canonical,'https://bietalreef.ae'+localPath({locale,category:CATEGORY.slug,service:intent.slug}));
  assert.equal(model.alternates.default,model.alternates.ar);assert.equal(model.schema.about['@type'],'Service');assert.equal(model.schema.about.provider[0]['@id'],'https://bietalreef.ae/providers/alrehab-home-clean#provider');
  assert.equal(model.breadcrumbs.at(-1).href,localPath({locale,category:CATEGORY.slug,service:intent.slug})); assert.ok(model.description.includes(locale==='ar'?intent.name.ar:intent.name.en.toLowerCase()));
  assert.ok(model.relatedServices.every(x=>pageModel({locale,category:CATEGORY.slug,service:x.slug,providers:[provider]})));
 }
});
test('missing service relations and unsupported marketing phrases never manufacture URLs',()=>{
 for(const service of ['carpet-rug-cleaning','majlis-cleaning','mattress-upholstery-cleaning','deep-cleaning','move-in-cleaning','water-tank-cleaning','pest-control','../bad'])assert.equal(pageModel({category:CATEGORY.slug,service,providers:[provider]}),null);
 assert.equal(pageModel({category:'wrong',service:'sofa-cleaning',providers:[provider]}),null);
});
test('mandatory service gates cannot be bypassed by templates, scores, approval or missing descriptions',()=>{
 const model=pageModel({category:CATEGORY.slug,service:'sofa-cleaning',providers:[provider]});
 for(const mutate of [s=>({...s,entityId:null}),s=>({...s,providerServiceId:null}),s=>({...s,provenance:'template'}),s=>({...s,summary:{ar:'',en:''}})]){
  const bad={...provider,services:provider.services.map(mutate)};assert.equal(pageModel({category:CATEGORY.slug,service:'sofa-cleaning',providers:[bad]}).indexable,false);
 }
 assert.equal(cityServiceGate({service:'sofa-cleaning',category:CATEGORY.slug,providers:[provider],title:model.title,description:model.description,canonical:'https://evil.test',links:model.breadcrumbs}).passed,false);
 for(const change of [{verified:false},{published:false},{coverage:[]}])assert.equal(pageModel({category:CATEGORY.slug,service:'sofa-cleaning',providers:[{...provider,...change}]}),null);
});
test('sitemap and dimensions include eligible city services; area service remains noindex',()=>{
 const urls=localSitemap([provider]).map(x=>x.loc);assert.equal(urls.length,8);assert.ok(urls.some(x=>x.endsWith('/sofa-cleaning')));assert.ok(!urls.some(x=>x.includes('/al-jimi/')));
 assert.equal(pageModel({area:'al-jimi',category:CATEGORY.slug,service:'sofa-cleaning',providers:[provider]}).indexable,false);
 assert.deepEqual(localSearchDimensions('/en/uae/abu-dhabi/al-ain/cleaning-services/sofa-cleaning'),{locale:'en',emirate:'abu-dhabi',city:'al-ain',area:'',category:CATEGORY.slug,service:'sofa-cleaning'});
});
test('search request validation and metric mapping are independent of query text',async()=>{
 const g=await import('../lib/localSeoGrowth.mjs'); const input={startDate:'2026-09-01',endDate:'2026-09-30',dimensions:['page','query','date']}; assert.equal(g.validateSearchRequest(input).dataState,'final');
 for(const overrides of [{startDate:'2026-02-30'},{endDate:'2026-08-01'},{dimensions:['token']},{dimensions:['query','query']},{page:'https://evil.test'}])assert.throws(()=>g.validateSearchRequest({...input,...overrides}));
 const result=g.normalizeSearchRows([{keys:['https://bietalreef.ae/path','<script>','2026-09-01'],clicks:3,impressions:30,ctr:.1,position:7}],input.dimensions);assert.equal(result[0].query,'<script>');assert.equal(result[0].clicks,3);assert.ok(!('route' in result[0]));
});
test('opportunity is explainable, mandatory, contextual and never auto publishes',async()=>{
 const {recommendOpportunity:r,ADS_ADAPTER}=await import('../lib/localSeoGrowth.mjs');const ready={entity:{serviceExists:true,servicePublished:true,providerEligible:true,coverage:true,categoryValid:true},content:{useful:true,sourceReviewed:true}};
 assert.equal(r().state,'not_ready');assert.equal(r({...ready,search:{impressions:100000}}).state,'candidate');
 assert.equal(r({...ready,approved:true,search:{commercialIntent:true,impressions:500,windowDays:30,complete:true},previous:{impressions:100,windowDays:7,complete:true}}).state,'candidate');
 const result=r({...ready,approved:true,search:{commercialIntent:true,impressions:40,windowDays:30,complete:true},previous:{impressions:30,windowDays:30,complete:true}});assert.equal(result.state,'recommended');assert.equal(result.auto_publish,false);assert.ok(result.why_this_candidate.some(x=>x.includes('comparable')));
 assert.equal(r({...ready,approved:true,conversions:{phone_click:1},search:{commercialIntent:true}}).state,'recommended');assert.equal(r({...ready,rejected:true}).state,'rejected');assert.equal(ADS_ADAPTER.status,'not_connected');
});
async function edgeHarness(admin=false,stale=false){
 const growth=await import('../lib/localSeoGrowth.mjs'); let handler; const calls=[];const pair=await crypto.subtle.generateKey({name:'RSASSA-PKCS1-v1_5',modulusLength:2048,publicExponent:new Uint8Array([1,0,1]),hash:'SHA-256'},true,['sign','verify']);const key=Buffer.from(await crypto.subtle.exportKey('pkcs8',pair.privateKey)).toString('base64');
 const manifest={version:1,rows:[{url:'https://bietalreef.ae/uae/abu-dhabi/al-ain/cleaning-services/sofa-cleaning',canonical_url:'https://bietalreef.ae/uae/abu-dhabi/al-ain/cleaning-services/sofa-cleaning'}],missing_services:[]};
 const fetch=async(url,options={})=>{calls.push({url:String(url),options});if(String(url).includes('verify_platform_admin'))return Response.json({is_admin:admin});if(String(url).includes('oauth2.googleapis.com'))return Response.json({access_token:'fixture-google-token'});if(String(url).includes('searchAnalytics/query'))return Response.json({rows:[{keys:['https://bietalreef.ae/uae/abu-dhabi/al-ain/cleaning-services/sofa-cleaning','تنظيف كنب'],impressions:40,clicks:3,ctr:.075,position:7}]});if(String(url).endsWith('/api/local-seo-registry'))return Response.json(manifest);if(stale && String(url).endsWith('local_seo_url_registry?select=url'))return Response.json([{url:'https://bietalreef.ae/uae/abu-dhabi/al-ain/cleaning-services/retired-service'}]);if(options.method==='POST' && String(url).includes('local_seo_url_registry'))return new Response(null,{status:204});return Response.json([]);};
 const environment={SUPABASE_URL:'https://fixture.supabase.co',SUPABASE_ANON_KEY:'fixture-public',SUPABASE_SERVICE_ROLE_KEY:'fixture-server-only',GOOGLE_SERVICE_ACCOUNT_JSON:JSON.stringify({private_key:`-----BEGIN PRIVATE KEY-----\n${key}\n-----END PRIVATE KEY-----`,client_email:'fixture@example.test'}),GOOGLE_SEARCH_CONSOLE_PROPERTY:'sc-domain:bietalreef.ae'};
 const context={require:()=>growth,exports:{},Deno:{env:{get:key=>environment[key]},serve:fn=>{handler=fn}},fetch,Response,Request,URL,URLSearchParams,AbortSignal,crypto,TextEncoder,Uint8Array,atob,btoa,Date,JSON,Set,Math,console};vm.runInNewContext(ts.transpileModule(fs.readFileSync('supabase/functions/google-integration-health/index.ts','utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.CommonJS}}).outputText,context);
 return {calls,request:(body,origin)=>handler(new Request('https://fixture.supabase.co/function',{method:'POST',headers:{authorization:'Bearer fixture-user',...(origin?{origin}:{})},body:JSON.stringify(body)}))};
}
test('existing Edge integration rejects nonadmins before any Google/registry access',async()=>{const h=await edgeHarness();for(const action of ['search_analytics','sync_local_seo_registry','refresh_local_seo_performance','inspect_local_seo','review_local_seo','local_seo_report'])assert.equal((await h.request({action})).status,403);assert.ok(h.calls.every(x=>x.url.includes('verify_platform_admin')));});
test('existing Edge integration reads Google metrics and syncs metadata without exposing tokens',async()=>{const h=await edgeHarness(true);let response=await h.request({action:'search_analytics',startDate:'2026-09-01',endDate:'2026-09-30'});assert.equal(response.status,200);let body=await response.json();assert.equal(body.rows[0].clicks,3);assert.ok(!JSON.stringify(body).includes('fixture-google-token'));assert.ok(!JSON.stringify(body).includes('fixture-server-only'));response=await h.request({action:'sync_local_seo_registry'});assert.equal(response.status,200);assert.equal((await response.json()).auto_publish,false);assert.equal((await h.request({action:'search_analytics',startDate:'2026-02-30',endDate:'2026-09-30'})).status,400);assert.equal((await h.request({action:'review_local_seo',url:'https://evil.test',approved:true})).status,400);});
test('lastmod tracks actual source edits, never the request clock',()=>{
 const changed={...provider,services:provider.services.map(item=>({...item,updatedAt:'2026-10-07T08:00:00Z'}))};const model=pageModel({category:CATEGORY.slug,service:'sofa-cleaning',providers:[changed]});assert.equal(model.lastModified,'2026-10-07');assert.ok(localSitemap([changed]).every(row=>row.lastmod==='2026-10-07'));
});

test('CORS is bounded and withdrawn URLs lose eligibility without publication',async()=>{const h=await edgeHarness(true,true);let response=await h.request({action:'sync_local_seo_registry'},'https://app.bietalreef.ae');assert.equal(response.headers.get('access-control-allow-origin'),'https://app.bietalreef.ae');assert.equal((await response.json()).withdrawn,1);assert.ok(h.calls.some(call=>call.options.method==='PATCH'&&JSON.parse(call.options.body).sitemap_eligible===false));response=await h.request({action:'local_seo_report'},'https://untrusted.example');assert.equal(response.headers.get('access-control-allow-origin'),null);});
