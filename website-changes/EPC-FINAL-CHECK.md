# Final check before publishing: removal of public EPC references

19 Nov 2026. Pull request #27 on the website repository (branch `claude/remove-epc-references-h0odxz`,
latest commit `f6b11f2`). It is not merged or published. Pushing to the PR rebuilds the free deploy preview
only. Evidence is in `epc-wording-evidence/final-check/`.

## 1. Floor-area disclaimer: done

The standard wording below now appears, word for word, in each of the places listed:

> Floor areas are derived from available property records and may not reflect the property's current
> configuration or exact measured area. Owners should verify the information before relying on it for
> valuation or appeal purposes.

- The free checker result, when the area came from our records. It is not shown when the owner typed the area.
- The online report.
- The downloadable report PDF.
- The owner's details form, under the pre-filled area.
- The Evidence Pack builder and its printed pack.
- The automated sample preview PDF.
- The static sample Evidence Pack PDF.

The guide pages (area pages, price index, flats floor-level guide) use floor areas only for area statistics,
not for a particular home. They say "recorded floor areas" without the owner disclaimer.

## 2. Evidence Pack accuracy: done

- The comparable tables are headed **"Recorded size"**.
- Source labels for the home's details now read:
  - "Recorded (property records)"
  - "Verified (measured or documented)"
  - "Owner statement"
  - "To be confirmed"
- The method note adds: "Recorded floor areas have not been independently measured. Different measurement
  standards (for example, gross internal area, net internal area or an estate agent's figure) can give
  different results for the same home, which affects comparisons between properties, so the subject home's
  floor area should be measured on the same basis as the comparables."
- **Correction found:** the static sample Evidence Pack PDF (sent to approved sample requests) still had the old EPC
  wording, which the first audit missed. Its page 1 banner also wrongly said HM Land Registry supplies floor
  areas and floor levels. I redacted both, so the old text is removed from the file, not just covered, and
  reset them in the same typeface. The layout is unchanged.

## 3. Legal compliance: needs specialist confirmation

I have not assumed compliance. These points need confirming by a solicitor, or with the data provider:

1. **EPC data licence attribution.** The open-data licence the EPC data is issued under (the Open
   Government Licence v3.0) asks re-users to use the provider's own attribution statement, or a generic
   one if none is given. The site now uses the generic "Contains public sector information licensed
   under the Open Government Licence v3.0". I could not read the EPC service's current terms, because they are
   blocked from this environment. If the provider requires the dataset to be named, one credits line would need
   to name it.
2. **Address data.** The checker and owner's details form list addresses drawn from the same records, and secondary
   sources say the address and postcode fields are not covered by the open licence: Royal Mail keeps rights in them.
   This was already the case before this change, but the credit now no longer names the dataset. A solicitor
   should confirm that showing these addresses is permitted and what credit it needs.
3. **Data protection.** The government treats address-level energy certificate records as personal data. The site
   publishes addresses with floor areas and floor levels for other people's homes, in the address list and in
   public data files. The privacy notice doesn't describe this source or use. This was also the case before
   this change and needs specialist advice.
4. **Consumer law.** Not naming a data source is unlikely to be a misleading omission if customers are told
   clearly that areas are estimates from records, not measured, and should be checked. The disclaimer now does
   this. The source labels must stay accurate: use "Verified" only for facts that have actually been verified.
   Specialist confirmation is recommended.
5. Sold-price, OS Code-Point Open, UK HPI and Open Government Licence attributions are unchanged.

## 4. Commercial confidentiality

**Fixed:**
- All visible page text, placeholders, dropdowns, collapsed sections and meta tags on 31 pages.
- PDF text and PDF metadata (titles show only "Challenge Mansion Tax" and the document name).
- Public script comments.
- The note in the price-trend data file.

**Left as they are: internal names**, as the brief asked. These can be seen in the page source only:
- the `d-epc…` ids and the hidden field `epc_area_m2` (also a Netlify form column) on the owner's details form;
- the `epcArea` variable in the checker script;
- the adjustment key `epc`, which is the energy-rating adjustment and is legitimate.

Renaming them is about an hour's work, low risk, and changes the Netlify column name.

**Exposure that can't be fixed without changing how the site works:**
- **Public data files.** `/data/addr/` (26 MB) and `/data/sales/` (183 MB) hold the whole matched dataset:
  addresses, recorded floor areas, floor levels and building age, with sale prices. Anyone can download them.
  `robots.txt` and the `noindex` header only ask search engines not to index them. A knowledgeable competitor
  could infer the source from the address style and fields. The checker API returns the same fields per
  postcode. To fix it, the data would move behind the server functions (not public files), with rate limiting.
- **Valuation method in public code.** The Evidence Pack builder runs in the browser. Its scripts
  (`/assets/adjustments.js`, `/assets/pack.js`) are public files, even though the page is behind a key and
  hidden from search engines. They hold the full adjustment table, the lease relativity curve and the weighting
  rules. To fix it, those calculations would move to a server function.
- **Minor.** The sample preview PDF mentions "a trade database not available to the public" for sale particulars.
  It isn't a floor-area source. Change it if you prefer.

## 5. Functionality: unchanged

- **No change to calculation or data code.** The PR changes no checker, estimate, address-matching, token or
  data-build code, and no data file except one display note.
- **Same results as the live code.** I ran the checker API from `main` and from this branch on the same
  19 postcodes, including address picks, typed areas, short leases and floors. 113 calls, 92 of them with
  estimates, gave 0 differences.
- **Project tests pass.** `npm test` (the end-to-end checker test with synthetic data, report PDF and sample
  preview PDF) reports "All checker tests passed".

## 6. Final testing: all pass

All tests were simulated: a local copy of the site with the real checker, report and PDF functions and the live
address data, in headless Chromium. No real submissions were made.

| Check | Result |
|---|---|
| 31 pages: no EPC wording in the page code, including meta tags (only the internal id `d-epc`, see above) | PASS |
| Checker, address picked: "from available property records" plus the disclaimer | PASS |
| Checker, area typed: "as you entered it", with no records disclaimer | PASS |
| Online report (signed link): disclaimer and "recorded floor areas" shown, no EPC wording | PASS |
| Report PDF download: valid PDF, disclaimer, no EPC wording, layout fits (no orphan line) | PASS |
| Owner's details form: pre-fill, disclaimer, source "Property records", "Change it" | PASS |
| Evidence Pack builder (reviewer key, from the report link): disclaimer, standards note, "Recorded size", printed pack has no EPC wording | PASS |
| Sample preview PDF and static sample pack (stamped and personalised versions) | PASS, 0 EPC mentions |
| JavaScript errors | None |
| Real iPhone check on the deploy preview | **Not done: Simon to do** |

## Outstanding before "publish it"

1. Legal points 1 to 4 above (licence wording, address data, data protection, consumer law): specialist or
   provider confirmation.
2. Check the deploy preview on your iPhone:
   https://deploy-preview-27--challengemansiontax.netlify.app (checker, `/order-details`, `/report` from a
   report email link).
3. Decide whether to schedule the architectural fixes (public data files; builder calculations) separately.
4. Not checked: MailerLite emails, ads, Notion. PDFs already sent keep the old wording.

Publishing costs 15 Netlify credits, and rolling back is free.

---

# Follow-up (19 Nov 2026, later): items 3 and 4

## Item 3: private data files: done on the preview (commit `b2fc912`)

- **Edge gate.** A small edge function now answers "not found" for the checker's address and sales files and the
  index file, unless the request comes from the site's own server functions. Those send a secret header derived
  from `PACK_KEY`, or from `DATA_KEY` if you add one.
- **Unchanged:** the chart files (London index, prime London trend), the monthly data workflow, and every estimate.
- **Checked on the real deploy preview:**
  - the data files return 404 and the chart files load;
  - the checker address lookup and estimates work;
  - the online report and the report PDF work;
  - the owner's details form pre-fills;
  - no JavaScript errors.
- **Same estimates.** Results match `main` exactly (113 calls), and match exactly whether the data is read from
  disk or through the gate (34 calls).
- **Not working: the rate limit** on the checker (30 a minute per visitor). It is in the code, but Netlify didn't
  enforce it on the preview: 100 requests in under a minute all went through. Check Netlify → Project → Security
  (rate limiting), or ask Netlify support whether code-based rate limits apply to your plan or only to
  production. Until then, someone could still collect the data slowly through the checker, one postcode at a time.
- **Evidence Pack builder scripts.** Not changed, as recommended: low risk, and can be done later.
- **Optional.** Add a separate `DATA_KEY` in Netlify (Functions scope), so that changing your reviewer key
  doesn't also change the data key. It takes effect at the next deploy.

## Item 4: emails, ads and Notion: audited (read-only)

- **Clean:**
  - all 7 MailerLite automations (live and off);
  - both draft campaigns;
  - the 3 Google Ads search ads;
  - the local Meta and Google Ads files;
  - reusable Gmail drafts.
- **Fixed on the branch:** the order confirmation email template (`docs/order-confirmation-email.md`). It now
  reads "a floor plan or any document that shows it" instead of "energy certificate".
- **Not changed (your drafts, so your decision).** Notion page "Phase 2 drafts: areas, data story, outreach
  (17 Nov 2026) — NOT SENT":
  - The Negotiator pitch: "It would draw on Land Registry and EPC data…" → suggested: "It would draw on HM Land
    Registry sales and available property records…"
  - Data story caveat: "floor level from EPCs (about three-quarters of flat sales matched)" → suggested: "floor
    level from available property records, which may not reflect each flat's current configuration". Also drop
    the match rate, because it shows how sales are matched.
- **Kept on purpose:**
  - the draft council tax guide in `docs/`, which is DIY advice telling owners where public data is;
  - an old email describing a third party's appeal.
  Neither describes our method.
- **Couldn't check:**
  - live Meta ad text (no recent data in Windsor);
  - Google Ads sitelinks and callouts (returned nothing);
  - MailerLite landing pages (the call failed);
  - the info@ mailbox;
  - Notion beyond its top search results.
  Check the first two by eye in Ads Manager and Google Ads.
