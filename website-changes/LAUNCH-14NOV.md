# Live launch of PR #18: 14 Nov 2026

- **Approved by:** Simon ("I approve publishing pull request #18").
- **Merged:** squash commit f575c9d on `main`.
- **Deployed:** Netlify production deploy 6af8d2077155863f0c0cf41d, ready, published 21:26:49 UTC. No errors; 10 functions deployed.

## Production checks (simulated devices, Playwright/Chromium; no physical device)

- **13 devices, all pass:** 8 iPhones, 3 iPads, 2 desktops.
  - No JavaScript errors and no sideways scrolling.
  - Validation works; a double tap sends one submission.
  - Touch devices: 16px fields and 44px tap targets.
  - The header link lands on the form.
  - Guide button on the first screen everywhere except the iPhone SE, where it appears after the cookie choice.
- **Tracking, through the new form**, with beacons intercepted so no data was sent:
  - **Reject:** no Google or Meta requests (only Cloudflare's cookie-free analytics, as designed).
  - **Accept:** the Google Ads conversion AW-18562300609 / gAenCKqyhLUdEMH1mJNF fires on the thanks page with the click ID; Meta Lead fires once.
  - **Late accept** (on the thanks page): same result, with the click ID still passed.
- **One labelled live test:**
  - Name "TEST Claude QA live launch", source test/claude_qa/prod_launch/hero, cookies rejected.
  - Netlify guide-signup went from 30 to 31; MailerLite added the subscriber.
  - The guide email arrived 7 seconds later (Gmail Promotions tab).
