const { chromium, devices } = require('playwright');
const fs = require('fs');
const C = process.argv[2], OUT = process.argv[3], MODE = process.argv[4], ONLY = process.argv[5];
const D = __dirname;
const UA = devices['iPhone 13'].userAgent;
const DEVS = [
  ['se', 'iPhone SE (2022)', 375, 667], ['mini', 'iPhone 13 mini', 375, 812], ['13', 'iPhone 13 / 14', 390, 844],
  ['15pro', 'iPhone 14 Pro / 15 Pro', 393, 852], ['17pro', 'iPhone 16 Pro / 17 Pro', 402, 874], ['air', 'iPhone Air', 420, 912],
  ['15pm', 'iPhone 15 Pro Max', 430, 932], ['17pm', 'iPhone 16/17 Pro Max', 440, 956]];
// Visible area in Safari portrait ≈ screen height minus status bar + address/tab bar. Use 0.79 of screen
// (iOS 26 compact tab bar) as a conservative "first screen" height.
const SAFARI = h => Math.round(h * 0.79);
function setup(p) {
  return p.route('**/*', async r => {
    const req = r.request(); const u = req.url();
    if (/facebook\.com|google\.com|googleadservices|doubleclick|googletagmanager|connect\.facebook|cloudflareinsights/.test(u)) return r.fulfill({ status: 204, body: '' });
    if (req.method() === 'POST') return r.fulfill({ status: 200, contentType: 'application/json', body: '{}' });
    if (/thanks\.html/.test(u)) return r.fulfill({ status: 200, contentType: 'text/html', body: '<h1>thanks</h1>' });
    if (u === 'https://challengemansiontax.co.uk/') {
      let h = fs.readFileSync(D + '/home.html', 'utf8');
      if (MODE === 'proposed') { h = h.replace('</h1>\n', '</h1>\n' + fs.readFileSync(C + '/hero-form.html', 'utf8')); h = h.replace('<script src="/assets/signup.js"></script>', '<script src="/assets/signup.js"></script>\n<script src="/assets/hero-signup.js"></script>'); }
      return r.fulfill({ status: 200, contentType: 'text/html', body: h });
    }
    if (u.endsWith('/assets/style.css')) { let t = fs.readFileSync(D + '/style.css', 'utf8'); if (MODE === 'proposed') t += fs.readFileSync(C + '/style-additions.css', 'utf8'); return r.fulfill({ status: 200, contentType: 'text/css', body: t }); }
    if (u.endsWith('/assets/consent.js')) { let t = fs.readFileSync(D + '/consent.js', 'utf8'); if (MODE === 'proposed' && fs.existsSync(C + '/consent-patch.json')) { for (const [a, b] of JSON.parse(fs.readFileSync(C + '/consent-patch.json', 'utf8'))) t = t.split(a).join(b); } return r.fulfill({ status: 200, contentType: 'application/javascript', body: t }); }
    if (u.endsWith('/assets/hero-signup.js')) return r.fulfill({ status: 200, contentType: 'application/javascript', body: fs.readFileSync(C + '/hero-signup.js', 'utf8') });
    return r.continue();
  });
}
async function open(b, w, h, opts = {}) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, userAgent: UA, isMobile: true, hasTouch: true, deviceScaleFactor: opts.dsf || 2 });
  const p = await ctx.newPage(); await setup(p);
  await p.goto('https://challengemansiontax.co.uk/', { waitUntil: 'load', timeout: 60000 });
  await p.evaluate(() => document.fonts.ready); await p.waitForSelector('.cookie-banner'); await p.waitForTimeout(500);
  return { ctx, p };
}
const FORM = () => MODE === 'proposed' ? '#quickGuide' : '#signup';
async function measure(p, firstH) {
  return p.evaluate(({ F, firstH }) => {
    const r = e => e && e.getBoundingClientRect();
    const form = document.querySelector(F), btn = form.querySelector('button[type=submit]');
    const email = form.querySelector('input[type=email]');
    const ban = document.querySelector('.cookie-banner');
    const br = ban ? r(ban) : null, bb = r(btn);
    const banTop = br ? Math.min(br.top, firstH) : firstH;
    const overlap = (a, b) => a && b && !(a.bottom <= b.top || a.top >= b.bottom || a.right <= b.left || a.left >= b.right);
    const vis = [...document.querySelectorAll('input:not([type=hidden]):not([type=checkbox]):not([type=radio]), select, textarea')].filter(e => e.offsetParent && e.name !== 'company');
    const small = vis.filter(e => parseFloat(getComputedStyle(e).fontSize) < 16).map(e => (e.name || e.id) + ':' + getComputedStyle(e).fontSize);
    const taps = [btn, ...(ban ? ban.querySelectorAll('button') : [])].map(e => ({ t: e.textContent.trim().slice(0, 20), h: Math.round(r(e).height), w: Math.round(r(e).width) }));
    const clipped = [...document.querySelectorAll('h1,h2,p,button,a.btn,label,.qg-title')].filter(e => e.offsetParent && (e.scrollWidth > e.clientWidth + 1) && getComputedStyle(e).overflowX !== 'visible').length;
    const ac = [...form.querySelectorAll('input:not([type=hidden]):not([type=checkbox])')].filter(e => e.name !== 'company').map(e => `${e.name}=${e.getAttribute('autocomplete') || '-'}`);
    return {
      bannerH: br ? Math.round(br.height) : 0,
      formTitleVisible: r(form).top < banTop - 40,
      emailVisible: r(email).bottom <= banTop,
      buttonVisible: bb.bottom <= banTop,
      buttonY: Math.round(bb.bottom),
      bannerCoversButton: overlap(br, bb),
      hScroll: document.documentElement.scrollWidth > window.innerWidth + 1,
      smallInputs: small, taps, clipped, autocomplete: ac,
    };
  }, { F: FORM(), firstH });
}
(async () => {
  const b = await chromium.launch();
  const rows = [];
  for (const [id, name, w, h] of DEVS) {
    if (ONLY && !ONLY.split(',').includes(id)) continue;
    const firstH = SAFARI(h);
    const { ctx, p } = await open(b, w, firstH);
    const m = await measure(p, firstH);
    await p.screenshot({ path: `${OUT}/${MODE}-${id}-first-screen.png` });
    // Accept / reject
    await p.click('.cookie-banner [data-choice=accepted]');
    const acc = await p.evaluate(() => ({ gone: !document.querySelector('.cookie-banner'), stored: (localStorage.getItem('cmt-consent') || '').includes('accepted'), fbq: typeof window.fbq === 'function' }));
    // fields: focus, fill, submit
    const F = FORM(); const pre = MODE === 'proposed' ? 'qg_' : '';
    const names = MODE === 'proposed' ? ['qg_name', 'qg_postcode', 'qg_email'] : ['first_name', 'postcode', 'email'];
    for (const n of names) await p.tap(`${F} [name=${n}]`);
    await p.fill(`${F} [name=${names[0]}]`, 'TEST'); await p.fill(`${F} [name=${names[1]}]`, 'SW3 1LJ'); await p.fill(`${F} [name=${names[2]}]`, 'qa@example.com');
    const [nav] = await Promise.all([p.waitForURL(/thanks/, { timeout: 15000 }).then(() => true).catch(() => false), p.tap(`${F} button[type=submit]`)]);
    await ctx.close();
    // Reject in a fresh context
    const r2 = await open(b, w, firstH, { dsf: 1 });
    await r2.p.click('.cookie-banner [data-choice=rejected]');
    const rej = await r2.p.evaluate(() => ({ gone: !document.querySelector('.cookie-banner'), stored: (localStorage.getItem('cmt-consent') || '').includes('rejected'), fbq: typeof window.fbq === 'function' }));
    await r2.ctx.close();
    // Landscape
    const lw = h, lh = Math.round(w * 0.86);
    const L = await open(b, lw, lh, { dsf: 1 });
    const lm = await L.p.evaluate(() => { const ban = document.querySelector('.cookie-banner').getBoundingClientRect(); return { bannerShare: Math.round(100 * ban.height / innerHeight), hScroll: document.documentElement.scrollWidth > innerWidth + 1 }; });
    await L.p.screenshot({ path: `${OUT}/${MODE}-${id}-landscape.png` });
    await L.ctx.close();
    // Larger text (Safari aA 150% / 200% ≈ narrower CSS viewport)
    const zoom = {};
    for (const z of [1.5, 2]) {
      const Z = await open(b, Math.round(w / z), Math.round(firstH / z), { dsf: 2 * z });
      zoom[z] = await Z.p.evaluate(() => ({ hScroll: document.documentElement.scrollWidth > innerWidth + 1, sw: document.documentElement.scrollWidth, iw: innerWidth }));
      if (z === 2) await Z.p.screenshot({ path: `${OUT}/${MODE}-${id}-text200.png` });
      await Z.ctx.close();
    }
    rows.push({ id, name, viewport: `${w}x${h}`, safariVisibleH: firstH, ...m, accept: acc, reject: rej, submitted: nav, landscape: lm, zoom });
    console.log(id, JSON.stringify({ btnVis: m.buttonVisible, btnY: m.buttonY, banH: m.bannerH, cover: m.bannerCoversButton, h: m.hScroll, small: m.smallInputs.length, taps: m.taps.map(t => t.h).join('/'), sub: nav, L: lm, Z: [zoom[1.5].hScroll, zoom[2].hScroll] }));
  }
  await b.close();
  fs.writeFileSync(`${OUT}/${MODE}-matrix.json`, JSON.stringify(rows, null, 1));
})().catch(e => { console.error(e); process.exit(1); });
