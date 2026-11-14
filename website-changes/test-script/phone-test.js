const { chromium, devices } = require('playwright');
const fs = require('fs');
const C = process.argv[2], OUT = process.argv[3], MODE = process.argv[4]; // MODE: before | after
const D = __dirname;
const DEV = [['375', devices['iPhone 8']], ['390', devices['iPhone 13']], ['430', devices['iPhone 14 Pro Max']]];
(async () => {
  const b = await chromium.launch();
  const report = [];
  for (const [w, dev] of DEV) {
    const ctx = await b.newContext({ ...dev, deviceScaleFactor: 2 });
    const p = await ctx.newPage();
    const posts = [];
    await p.route('**/*', async r => {
      const u = r.request().url();
      if (r.request().method() === 'POST') { posts.push(u.replace('https://challengemansiontax.co.uk','') + ' ' + (r.request().postData()||'').slice(0,800)); return r.fulfill({ status: 200, body: '{}' }); }
      if (/thanks\.html/.test(u)) return r.fulfill({ status: 200, contentType: 'text/html', body: '<h1>THANKS PAGE (stubbed)</h1>' });
      if (u === 'https://challengemansiontax.co.uk/') {
        let h = fs.readFileSync(D + '/home.html', 'utf8');
        if (MODE === 'after') {
          h = h.replace('</h1>\n', '</h1>\n' + fs.readFileSync(C + '/hero-form.html', 'utf8'));
          h = h.replace('<script src="/assets/signup.js"></script>', '<script src="/assets/signup.js"></script>\n<script src="/assets/hero-signup.js"></script>');
        }
        return r.fulfill({ status: 200, contentType: 'text/html', body: h });
      }
      if (u.endsWith('/assets/style.css')) { let t = fs.readFileSync(D + '/style.css', 'utf8'); if (MODE === 'after') t += fs.readFileSync(C + '/style-additions.css', 'utf8'); return r.fulfill({ status: 200, contentType: 'text/css', body: t }); }
      if (u.endsWith('/assets/consent.js')) { let t = fs.readFileSync(D + '/consent.js', 'utf8'); if (MODE === 'after') t = t.replace('We use Meta and Google cookies to measure our ads, so we can reach more homeowners and offer our free mansion tax check. Nothing personal is shared. ', 'We use Meta and Google cookies to measure our ads. Nothing personal is shared. '); return r.fulfill({ status: 200, contentType: 'application/javascript', body: t }); }
      if (u.endsWith('/assets/hero-signup.js')) return r.fulfill({ status: 200, contentType: 'application/javascript', body: fs.readFileSync(C + '/hero-signup.js', 'utf8') });
      return r.continue();
    });
    await p.goto('https://challengemansiontax.co.uk/', { waitUntil: 'load', timeout: 60000 }); await p.evaluate(() => document.fonts.ready); await p.waitForSelector('.cookie-banner'); await p.waitForTimeout(800);
    const vh = p.viewportSize().height;
    await p.screenshot({ path: `${OUT}/${MODE}-${w}-1-first-screen.png` });
    const banner = await p.$eval('.cookie-banner', e => Math.round(e.getBoundingClientRect().height)).catch(() => 0);
    const formSel = MODE === 'after' ? '#quickGuide' : '#signup';
    const btnSel = formSel + ' button[type=submit]';
    const btnTop = await p.$eval(btnSel, e => Math.round(e.getBoundingClientRect().bottom));
    await p.click('.cookie-banner [data-choice=rejected]');
    await p.screenshot({ path: `${OUT}/${MODE}-${w}-2-cookie-dismissed.png` });
    const fields = await p.$$eval(`${formSel} input:not([type=hidden]):not([type=checkbox]):not([name=company])`, els => els.filter(e => e.offsetParent).map(e => ({ name: e.name, font: parseFloat(getComputedStyle(e).fontSize) })));
    const allInputs = await p.$$eval('input.input, select.input', els => els.map(e => parseFloat(getComputedStyle(e).fontSize)));
    const under16 = allInputs.filter(f => f < 16).length;
    for (const f of fields) await p.focus(`${formSel} [name=${f.name}]`);
    const vals = MODE === 'after' ? { qg_name: 'Test', qg_postcode: 'SW3 1LJ', qg_email: 'qa@example.com' } : { first_name: 'Test', postcode: 'SW3 1LJ', email: 'qa@example.com' };
    for (const [k, v] of Object.entries(vals)) await p.fill(`${formSel} [name=${k}]`, v);
    await p.$eval(btnSel, e => e.scrollIntoView({ block: 'center' }));
    await p.screenshot({ path: `${OUT}/${MODE}-${w}-3-filled-in.png` });
    await Promise.all([p.waitForURL(/thanks/, { timeout: 15000 }).catch(() => {}), p.click(btnSel)]);
    const ok = /thanks/.test(p.url());
    const lead = posts.find(x => x.includes('form-name=guide-signup')) || '';
    report.push({ width: w, viewport_h: vh, cookie_banner_px: banner, submit_button_bottom_px: btnTop, button_on_first_screen: btnTop <= vh - banner, form_fields_font_px: fields.map(f => `${f.name}:${f.font}`).join(' '), site_inputs_under_16px: `${under16}/${allInputs.length}`, submitted_to_thanks: ok, netlify_post_sent: !!lead, source_field: (lead.match(/source=([^&]*)/) || [])[1] || '' });
    await ctx.close();
  }
  await b.close();
  fs.writeFileSync(`${OUT}/${MODE}-results.json`, JSON.stringify(report, null, 1));
  console.table(report);
})().catch(e => { console.error(e); process.exit(1); });
