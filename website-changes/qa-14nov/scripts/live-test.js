const { chromium, devices } = require('playwright');
(async () => {
  const b = await chromium.launch(); const ctx = await b.newContext({ ...devices['iPhone 13'] }); const p = await ctx.newPage();
  const resp = [];
  p.on('response', r => { if (r.request().method() === 'POST') resp.push(r.status() + ' ' + new URL(r.url()).pathname); });
  await p.goto('https://challengemansiontax.co.uk/?utm_source=test&utm_campaign=claude_qa&utm_content=live_e2e_14nov', { waitUntil: 'load', timeout: 60000 });
  await p.waitForSelector('.cookie-banner'); await p.click('.cookie-banner [data-choice=rejected]');
  await p.fill('#signup [name=first_name]', 'TEST Claude QA');
  await p.fill('#signup [name=postcode]', 'SW3 1LJ');
  await p.fill('#signup [name=email]', process.argv[2]);
  const t0 = new Date().toISOString();
  await Promise.all([p.waitForURL(/thanks/, { timeout: 30000 }), p.click('#submitBtn')]);
  await p.waitForLoadState('load'); await p.waitForTimeout(1500);
  const dl = await p.$$eval('a', as => as.filter(a => /guide/i.test(a.href + a.textContent)).map(a => a.textContent.trim().slice(0, 50) + ' -> ' + a.href.slice(0, 80)));
  await p.screenshot({ path: process.argv[3] });
  console.log('submitted at', t0, '\nPOST responses:', resp.join(', '), '\nthanks url:', p.url(), '\nguide links on thanks page:', dl.join(' | '));
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
