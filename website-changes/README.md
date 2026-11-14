# Proposed changes to challengemansiontax.co.uk (not yet live)

These changes have **not** been committed to the website's own repository or deployed. Access to
that repository was blocked in the session that wrote them. This folder holds the exact code and the
test evidence for review. `apply-prompt.txt` is the instruction to apply them in a session that has
the website repository.

## The three changes

| # | Change | File(s) here | Where it goes in the site |
|---|---|---|---|
| 1 | Short free-guide form on the first phone screen | `code/hero-form.html`, `code/hero-signup.js` | `index.html`, straight after the hero `<h1>`; new `assets/hero-signup.js`, loaded after `assets/signup.js` |
| 2 | Slim cookie bar on phones, shorter banner text | `code/style-additions.css` (cookie rules), `code/consent-text-change.md` | end of `assets/style.css`; text in `assets/consent.js` |
| 3 | Stop iPhone zooming into form fields | `code/style-additions.css` (`.input{font-size:16px}` under 600px) | end of `assets/style.css` |

How the new form works: it doesn't post anything itself. It validates name, postcode and email,
copies them into the existing `#signup` form and calls `requestSubmit()`. That means Netlify Forms,
the MailerLite hand-off, the `/api/guide-link` call, the thanks-page redirect and the `Lead` tracking
event all run unchanged. It appends `/hero` to the hidden `source` field so these sign-ups can be told
apart. It has no `netlify` attribute, so Netlify won't register it as a separate form.

## How it was tested

- `test-script/phone-test.js` uses Playwright (Chromium) with iPhone device emulation.
- It loads the live home page HTML, CSS and JS saved on 14 Nov 2026, with and without the changes
  injected.
- All POST requests are intercepted, so **no real submissions were sent**, and `/thanks.html` is
  stubbed.

At each width the script does the following:

1. Screenshots the first screen.
2. Taps Reject on the cookie bar and screenshots again.
3. Focuses every visible form field.
4. Fills in name, postcode and email.
5. Submits the form.

| Width | Device profile | Viewport |
|---|---|---|
| 375 | iPhone 8 / SE (2nd–3rd gen) | 375×667 |
| 390 | iPhone 13 / 14 | 390×664 |
| 430 | iPhone 14 Pro Max | 430×740 |

## Results

| Width | Version | Cookie bar height | Submit button on first screen | Form field text size | Inputs on page under 16px | Reached thanks page | Netlify post `source` |
|---|---|---|---|---|---|---|---|
| 375 | before | 184px | no (button at 3,386px) | 15.2px | 15 of 15 | yes | direct |
| 375 | after | 86px | **yes** (553px) | 16px | 0 of 18 | yes | direct/hero |
| 390 | before | 184px | no (3,280px) | 15.2px | 15 of 15 | yes | direct |
| 390 | after | 86px | **yes** (553px) | 16px | 0 of 18 | yes | direct/hero |
| 430 | before | 162px | no (3,035px) | 15.2px | 15 of 15 | yes | direct |
| 430 | after | 86px | **yes** (553px) | 16px | 0 of 18 | yes | direct/hero |

The raw numbers are in `test-screenshots/before-results.json` and `after-results.json`. The
screenshots are named `{before|after}-{width}-{1-first-screen|2-cookie-dismissed|3-filled-in}.png`.

## Limits of this test

- **Chromium emulation, not real Safari.** It checks layout, field text size and the submit flow.
  It cannot reproduce Safari's real toolbars or its focus-zoom behaviour, which is why the zoom fix
  is checked by measuring that every field is at least 16px. Check on a real iPhone or iPad from the
  Netlify deploy preview before merging.
- The real Netlify, MailerLite and email delivery steps were not run, because posts were intercepted.
