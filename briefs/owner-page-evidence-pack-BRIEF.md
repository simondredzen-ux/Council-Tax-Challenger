BRIEF FOR APPROVAL (v3): PRIVATE OWNER'S PAGE FOR DRAFT EVIDENCE PACKS

Challenge Mansion Tax (challengemansiontax.co.uk, repository simondredzen-ux/Mansion-Tax-, Netlify).
Revised 19 Nov 2026 from Simon's instructions (v3: secret owner's area and sign-in method agreed). Nothing is built until Simon approves this brief.

GOAL

One secret, private owner's page that no visitor sees, which Simon signs in to. Simon either pastes an existing customer report link or enters a property
directly, clicks "Create draft pack", and sees an editable draft on the same page, in about a minute
in a normal case. Reuse the existing pack builder, calculations, adjustment matrix and print layout
rather than building a second system.

FACTS CHECKED IN THE CODE THAT SHAPE THIS BRIEF

- The pack builder (/pack-builder.html, site/assets/pack.js) already does most of the work:
  - It loads sales from /api/report?full=1.
  - It applies the April 2026 time adjustment and the adjustment matrix ("Use it").
  - It has the four fact labels.
  - It already flags property adjustments of 10% or more, sales more than 25% larger or smaller
    than the subject home, sales after the valuation date, and fewer than 5 sales.
  - It prints as DRAFT until sign-off.
- Search results: the full search returns up to 80 sales, each marked whether it is in the middle
  50% used for the free estimate.
  - There is no recorded reason why other sales were set aside. Reasons will have to be added (see
    section 2).
- Floor areas come from EPC records (and Land Registry addresses), but no per-sale source field is
  stored. The source will have to be added.
- Direct entry is possible: the checker can already list the addresses in a postcode, with their
  EPC floor area and floor level, and run an estimate without a signup or an email.
- Current weaknesses:
  - The reviewer key (PACK_KEY) is typed into the browser and stored there (localStorage "pack:key").
  - Drafts are kept only in that browser, so they can't be reopened on another device.
  - The builder page loads Cloudflare Web Analytics.
  - The existing hidden pages (/pack-builder and /sample-approve) are named in the public
    robots.txt file, so anyone reading that file can see that they exist.
  - Anyone can open those pages. Only the data behind them is protected (by PACK_KEY).

1. TWO WAYS TO START

a) Customer report link
- Paste the link. The page loads the subject property and every comparable sale the report's search
  returned.

b) Direct entry (own research, e.g. an acquisition such as Abingdon Road)
- Enter the postcode, then choose the exact address or flat number from the list (or type it if it
  isn't listed). Then enter the property type and floor area.
- Before the draft is created, a confirmation step shows:
  - the exact property matched;
  - the floor area and its source: EPC (with date if known), the owner's measured plan, or entered
    by Simon;
  - the floor level and tenure, where known.
- Direct entry creates no customer signup, no Netlify form submission, no MailerLite contact and no
  email. It is labelled "Owner research" in the saved list.

2. SHORTLIST, AND THE FULL LIST

- Suggest 5 to 8 sales where the evidence supports that many. Each suggested sale shows why it was
  chosen: distance or same street/building, sale date, size difference, same type and tenure, and
  floor level.
- Give access to the full list returned by the search, including sales set aside, each with a
  reason where known. Example reasons: outside the middle 50%, different property type, no floor
  area, size more than 25% different, sold long before or after April 2026, new build.
- Simon can add, remove and reweight sales (High / Medium / Low, as now).
- With only 3 or 4 credible sales, use them and show a clear "limited evidence" flag in the draft.
  With fewer than 3, the draft gives no value range and says the evidence is insufficient.
- Export the complete sales list (CSV, opens in Excel) for cross-checking against LonRes.
- Add LonRes sales by hand: address, date, price, floor area, area source and a note. Each one is
  recorded as "Source: LonRes (entered by Simon)" in the pack. These must be completed sales, never
  asking prices.

3. CALCULATIONS AUTOMATED, JUDGEMENT CALLS FLAGGED

- For each selected sale, show:
  - the original completion date and price;
  - the floor area and its source;
  - the April 2026 time adjustment and resulting price;
  - any separate property adjustments, each with its reason.
- Reuse the existing adjustment matrix. Every suggestion is marked "Provisional" until Simon
  reviews it and ticks it as accepted.
- Keep the existing flags (adjustments of 10% or more, sales after the valuation date, large size
  differences, too few sales).
- Unknown facts (condition, lease length, floor level, etc.) are marked To be confirmed. For each,
  the draft shows whether the gap could move the value range, for example "lease length unknown:
  could reduce the range by up to X% if under 80 years", using the matrix figures.

4. EDITABLE DRAFT AND SIGN-OFF

- Pre-fill sourced property facts with the existing labels: Owner statement, Verified, Public data,
  To be confirmed.
- Draft the indicative range and the evidence summary when the data supports them.
- The final conclusion and sign-off are left to Simon.
- Save and reopen a draft.
- Draft PDFs are clearly marked DRAFT on every page. After sign-off, download the final PDF.
- Editing a signed-off pack returns it to draft until Simon approves it again. The earlier signed-off
  version is kept for reference.
- First version uses the existing Print / Save as PDF, provided it produces a clean pack (checked in
  testing on desktop and iPhone). If it doesn't, Claude reports back before building a server PDF.
- Email-to-self stays optional and is not in the first version.

5. GENUINELY PRIVATE ACCESS (A SECRET OWNER'S AREA)

- Secret page: the owner's page is not linked from anywhere on the site, not in the sitemap and
  not in robots.txt. Search engines are kept out with a noindex header and meta tag instead, so its
  address is not published anywhere.
- Sign-in (agreed): a password checked on the server. Signing in gives a secure, short-lived
  sign-in cookie, and repeated wrong attempts are blocked. Anyone who finds the address sees only a
  sign-in box; nothing else loads until Simon has signed in.
- The page and the full comparable-sales request require Simon to be signed in, and the server
  checks this on every request.
- One private area: the existing pack builder (/pack-builder) and sample approval page
  (/sample-approve) move behind the same sign-in. Their entries are removed from robots.txt, and
  they get the noindex header instead. There is then one private area, with no hidden pages left
  open.
- PACK_KEY stays on the server only. The browser-stored key is removed, and the existing builder
  clears any saved copy.
- The owner page is noindex and not linked, and it loads no analytics.
- Report links and customer details are kept out of analytics and server logs (the existing logs
  will be checked and cleaned where needed).
- Where drafts are saved: in Netlify Blobs (private storage attached to the site), not in the
  browser. Simon can reopen them on any device after signing in. Existing drafts in a browser can be
  imported once.
- Confirm that the public checker and the customer report still work as before, and that the free
  report still never shows the comparable sales.

6. WHAT A SUCCESSFUL PREVIEW LOOKS LIKE

On the free deploy preview (no live publish), Claude demonstrates with screenshots and sample PDFs:
- a pack started from a customer report link (a TEST report);
- a pack started by direct entry, with no signup, contact or email created (checked in Netlify
  Forms and MailerLite);
- a case with too few credible comparables, showing the flag or no range;
- editing the shortlist (add, remove, reweight, add a LonRes sale), and exporting the full list;
- saving a draft, reopening it on a second device, signing off, downloading a readable final PDF,
  then editing it and seeing it return to draft;
- signed-out users, and requests without the sign-in, being refused for the owner page, the pack
  builder, the sample approval page and the full sales data;
- the owner's area not appearing in robots.txt, the sitemap or any link on the site;
- sample approvals still working after signing in;
- the public checker and customer report still working.
Tests are simulated in Playwright (iPhone, iPad, desktop), plus Simon's real iPhone before approval.
Simon approves the preview before anything is published (one live publish, 15 Netlify credits).

WHAT CLAUDE MAY DO ALONE

- Work on a branch with a pull request and the free preview.
- Create TEST cases.

WHAT NEEDS SIMON'S APPROVAL

- This brief.
- Publishing to the live site.
- Adding email-to-self later.

DECISIONS FOR SIMON BEFORE BUILDING

1. Sign-in method: DECIDED. A password checked by the site, with a secure cookie.
   Simon sets the password himself in Netlify; it is never typed into chat.
2. Owner's page address: /owner, or a less obvious name of Simon's choice.
3. Abingdon Road: confirm the postcode, so it can be used as a test case.
4. LonRes: is CSV export enough for cross-checking, or do you also want a CSV import of LonRes sales?

DELIVERABLES

- Pull request and preview link.
- A test report (passed / failed, simulated vs real device).
- Screenshots and sample PDFs.
- The code changes as text, for ChatGPT review.
- Updated docs/evidence-pack.md.
