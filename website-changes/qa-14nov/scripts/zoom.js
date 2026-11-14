const { chromium } = require('playwright'); const fs=require('fs'); const C=process.argv[2], D=__dirname;
(async()=>{const b=await chromium.launch();
for (const mode of ['live','proposed']) for (const w of [250,195,188]) {
 const ctx=await b.newContext({viewport:{width:w,height:500}}); const p=await ctx.newPage();
 await p.route('**/*',async r=>{const u=r.request().url();
  if(/facebook|google|doubleclick/.test(u))return r.fulfill({status:204,body:''});
  if(u==='https://challengemansiontax.co.uk/'){let h=fs.readFileSync(D+'/home.html','utf8');if(mode==='proposed')h=h.replace('</h1>\n','</h1>\n'+fs.readFileSync(C+'/hero-form.html','utf8'));return r.fulfill({status:200,contentType:'text/html',body:h});}
  if(u.endsWith('/assets/style.css'))return r.fulfill({status:200,contentType:'text/css',body:fs.readFileSync(D+'/style.css','utf8')+(mode==='proposed'?fs.readFileSync(C+'/style-additions.css','utf8'):'')});
  return r.continue();});
 await p.goto('https://challengemansiontax.co.uk/',{waitUntil:'load'}); await p.waitForTimeout(500);
 const res=await p.evaluate(()=>{const W=innerWidth;const wide=[...document.querySelectorAll('body *')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&r.right>W+1&&getComputedStyle(e).position!=='fixed'}).filter(e=>![...e.children].some(c=>c.getBoundingClientRect().right>W+1)).slice(0,6).map(e=>e.tagName+'.'+(e.className||'').toString().slice(0,30)+' r'+Math.round(e.getBoundingClientRect().right));return {sw:document.documentElement.scrollWidth,W,wide}});
 console.log(mode,w,JSON.stringify(res)); if(w===195) await p.screenshot({path:`${process.argv[3]}/${mode}-text200-top.png`}); await ctx.close();}
await b.close();})();
