const { chromium, devices } = require('playwright');
const OUT = process.argv[2];
const BEACON = /(^|\.)(facebook\.com|google\.com|google\.co\.uk|googleadservices\.com|doubleclick\.net|google-analytics\.com|googlesyndication\.com)$/;
const LANDING = 'https://challengemansiontax.co.uk/?gclid=TEST_CLAUDE_QA_GCLID&utm_source=test&utm_campaign=claude_qa';
async function run(b, name, plan) {
  const ctx = await b.newContext({ ...devices['iPhone 13'] });
  const p = await ctx.newPage();
  const log = { scripts: [], beacons: [], formPosts: [] };
  await p.route('**/*', async r => {
    const req = r.request(); const u = new URL(req.url());
    if (BEACON.test(u.hostname)) { log.beacons.push(u.hostname + u.pathname + ' ' + decodeURIComponent(u.search).slice(0, 5000)); return r.fulfill({ status: 204, body: '' }); }
    if (/googletagmanager\.com|connect\.facebook\.net/.test(u.hostname)) log.scripts.push(u.hostname + u.pathname);
    if (req.method() === 'POST' && u.hostname.endsWith('challengemansiontax.co.uk')) { log.formPosts.push(u.pathname + ' ' + (req.postData() || '').slice(0, 600)); return r.fulfill({ status: 200, contentType: 'application/json', body: '{}' }); }
    return r.continue();
  });
  await p.goto(LANDING, { waitUntil: 'load', timeout: 60000 });
  await p.waitForSelector('.cookie-banner');
  if (plan.landing) await p.click(`.cookie-banner [data-choice=${plan.landing}]`);
  await p.waitForTimeout(2500);
  log.afterLanding = { scripts: log.scripts.length, beacons: log.beacons.length };
  await p.fill('#signup [name=first_name]', 'TEST Claude QA');
  await p.fill('#signup [name=postcode]', 'SW3 1LJ');
  await p.fill('#signup [name=email]', 'qa@example.com');
  await Promise.all([p.waitForURL(/thanks/, { timeout: 20000 }), p.click('#submitBtn')]);
  await p.waitForLoadState('load');
  if (plan.thanks) { await p.waitForSelector('.cookie-banner'); await p.click(`.cookie-banner [data-choice=${plan.thanks}]`); }
  await p.waitForTimeout(5000);
  log.thanksUrl = p.url();
  log.cookies = (await ctx.cookies()).map(c => c.name).join(',');
  log.thanksText = (await p.innerText('main').catch(() => p.innerText('body'))).slice(0, 700);
  await p.screenshot({ path: `${OUT}/${name}-thanks.png` });
  await ctx.close();
  return log;
}
(async () => {
  const b = await chromium.launch();
  const res = {};
  res.reject = await run(b, 'reject', { landing: 'rejected' });
  res.accept = await run(b, 'accept', { landing: 'accepted' });
  res.late = await run(b, 'late-accept', { landing: null, thanks: 'accepted' });
  await b.close();
  require('fs').writeFileSync(`${OUT}/tracking.json`, JSON.stringify(res, null, 1));
  for (const [k, v] of Object.entries(res)) {
    console.log(`\n===== ${k} =====\nthanks url: ${v.thanksUrl}\ncookies: ${v.cookies}\nafter landing: ${JSON.stringify(v.afterLanding)}\nscripts: ${[...new Set(v.scripts)].join(' | ')}`);
    console.log('form posts:\n  ' + v.formPosts.map(x => x.slice(0, 250)).join('\n  '));
    console.log('beacons:\n  ' + v.beacons.join('\n  '));
  }
  console.log('\nTHANKS TEXT:\n' + res.reject.thanksText);
})().catch(e => { console.error(e); process.exit(1); });
