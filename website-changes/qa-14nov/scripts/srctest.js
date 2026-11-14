const { chromium, devices } = require('playwright'); const fs=require('fs'); const C=process.argv[2], D=__dirname;
(async()=>{const b=await chromium.launch();
for (const q of ['?gclid=ABC123','?gclid=ABC123&utm_source=google&utm_campaign=search-test&utm_content=mansion%20tax','']) {
 const ctx=await b.newContext({...devices['iPhone 13']}); const p=await ctx.newPage(); let post='';
 await p.route('**/*',async r=>{const req=r.request(),u=req.url();
  if(/facebook|google|doubleclick|cloudflareinsights/.test(new URL(u).hostname))return r.fulfill({status:204,body:''});
  if(req.method()==='POST'){if(req.postData().includes('form-name'))post=req.postData();return r.fulfill({status:200,body:'{}'});}
  if(/thanks/.test(u))return r.fulfill({status:200,contentType:'text/html',body:'ok'});
  if(u.startsWith('https://challengemansiontax.co.uk/?')||u==='https://challengemansiontax.co.uk/'){let h=fs.readFileSync(D+'/home.html','utf8');h=h.replace('</h1>\n','</h1>\n'+fs.readFileSync(C+'/hero-form.html','utf8')).replace('<script src="/assets/signup.js"></script>','<script src="/assets/signup.js"></script>\n<script src="/assets/hero-signup.js"></script>');return r.fulfill({status:200,contentType:'text/html',body:h});}
  if(u.endsWith('/assets/hero-signup.js'))return r.fulfill({status:200,contentType:'application/javascript',body:fs.readFileSync(C+'/hero-signup.js','utf8')});
  return r.continue();});
 await p.goto('https://challengemansiontax.co.uk/'+q,{waitUntil:'load'}); await p.click('.cookie-banner [data-choice=rejected]');
 await p.fill('[name=qg_name]','TEST');await p.fill('[name=qg_postcode]','SW3 1LJ');await p.fill('[name=qg_email]','qa@example.com');
 await Promise.all([p.waitForURL(/thanks/),p.click('#quickGuide button[type=submit]')]);
 console.log(JSON.stringify(q||'(no params)'),'-> source =',decodeURIComponent((post.match(/source=([^&]*)/)||[])[1]||'').replace(/\+/g,' '));
 await ctx.close();}
await b.close();})();
