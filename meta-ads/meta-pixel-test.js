const { chromium, devices } = require('playwright');
const LAND = 'https://challengemansiontax.co.uk/?utm_source=facebook&utm_medium=paid_social&utm_campaign=cmt_meta_test_nov26&utm_content=ad_a_awareness&fbclid=TEST_CLAUDE_FBCLID';
async function run(b, { failPost = false, reload = false, consent = 'accepted' }) {
  const ctx = await b.newContext({ ...devices['iPhone 13'] }); const p = await ctx.newPage();
  const ev = [], posts = [];
  await p.route('**/*', r => { const u = new URL(r.request().url());
    if (/facebook\.com$/.test(u.hostname) && u.pathname.startsWith('/tr')) { ev.push(u.searchParams.get('ev')); return r.fulfill({ status: 204, body: '' }); }
    if (/google|doubleclick|cloudflareinsights/.test(u.hostname)) return r.fulfill({ status: 204, body: '' });
    if (r.request().method() === 'POST') { posts.push((r.request().postData() || '').match(/source=([^&]*)/)?.[1] || u.pathname);
      return r.fulfill(failPost && u.pathname === '/' ? { status: 500, body: 'err' } : { status: 200, contentType: 'application/json', body: '{}' }); }
    return r.continue(); });
  await p.goto(LAND, { waitUntil: 'load', timeout: 60000 }); await p.waitForSelector('.cookie-banner');
  await p.click(`.cookie-banner [data-choice=${consent}]`); await p.waitForTimeout(2000);
  await p.fill('[name=qg_name]', 'TEST'); await p.fill('[name=qg_postcode]', 'SW3 1LJ'); await p.fill('[name=qg_email]', 'qa@example.com');
  await p.click('#quickGuide button[type=submit]');
  await p.waitForURL(/thanks/, { timeout: 8000 }).catch(() => {});
  await p.waitForTimeout(3000);
  const onThanks = /thanks/.test(p.url());
  if (reload && onThanks) { await p.reload({ waitUntil: 'load' }); await p.waitForTimeout(3000); }
  const msg = onThanks ? '' : await p.textContent('#quickGuide .qg-msg');
  const cookies = (await ctx.cookies()).map(c => c.name).filter(n => /_fb/.test(n)).join(',');
  await ctx.close();
  return { onThanks, leadEvents: ev.filter(e => e === 'Lead').length, pageViews: ev.filter(e => e === 'PageView').length, source: decodeURIComponent(posts[0] || ''), errorShown: msg, fbCookies: cookies };
}
(async () => {
  const b = await chromium.launch();
  console.log('1 accept + success           :', JSON.stringify(await run(b, {})));
  console.log('2 accept + success + reload  :', JSON.stringify(await run(b, { reload: true })));
  console.log('3 accept + FAILED submission :', JSON.stringify(await run(b, { failPost: true })));
  console.log('4 reject + success           :', JSON.stringify(await run(b, { consent: 'rejected' })));
  await b.close();
})();
