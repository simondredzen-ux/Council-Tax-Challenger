# Brief for review: Owner's page to create an Evidence Pack automatically

Prepared by Claude on 19 Nov 2026 for ChatGPT to review before anything is built.
Website: challengemansiontax.co.uk (repository simondredzen-ux/Mansion-Tax-, hosted on Netlify).

## 1. Goal

Give Simon one private owner's page where he can enter a property (or paste a customer's report link),
press one button, and get a complete draft Property Value Evidence Pack as a PDF in about a minute.
He then checks it, signs it off and downloads it (or emails it to himself). Today this takes many
manual steps in the pack builder.

## 2. Current facts (checked in the code on 19 Nov 2026)

- **Pack builder:** `/pack-builder.html` with `site/assets/pack.js` (585 lines). It's internal, not linked and not indexed. It runs entirely in the browser.
- **How a pack is made now:**
  1. Paste a customer's report link.
  2. The builder loads up to 80 comparable sales from `/api/report?full=1`, which needs the `PACK_KEY` in the `x-pack-key` header.
  3. Fill in the property profile by hand, marking each fact as Owner statement, Verified, Public data or To be confirmed.
  4. Pick 5–8 comparables by hand, and press "Use it" on each for the standard adjustment (docs/adjustment-matrix.md).
  5. Add the 2026 condition items, rate the evidence, write the conclusion and sign off.
  6. Use the browser's Print / save PDF.
- **Saving:** work is saved only in that browser (localStorage), plus a downloadable JSON case file. Photos can fill the browser's storage.
- **Getting a report link:**
  - The customer's link comes from their checker result.
  - For Simon's own home, he has to run the public checker himself and fish the link out of the email or MailerLite.
  - The checker API (`/api/check`) can already produce an estimate directly from postcode, type, area, condition, lease, floor and address.
- **Existing building blocks:**
  - Netlify Blobs is already used (stores "checks" and "sample-requests").
  - pdf-lib already builds PDFs on the server (personalised sample pack, report PDF).
  - `/sample-approve.html` already uses the same PACK_KEY pattern for a private reviewer page.
- **Email:** MailerLite is live (the docs still say EmailOctopus in places). There is no transactional email service for sending one-off emails.
- **Publishing:** previews are free; each live publish costs 15 Netlify credits. Nothing is published without Simon's approval.
- **Pack status:** a pack stays marked DRAFT until a named reviewer approves it. Rules: completed sales only, every adjustment needs a reason, and owner statements are kept separate from verified facts.

## 3. Proposed solution

A new private page, `/owner` (not linked, `noindex`, needs PACK_KEY), with three parts.

**A. Create a pack (one form, one button)**
- **Input:** either paste a report link, or type the address details (postcode, then pick the address from the list, property type, floor area, condition, lease and floor), the same fields as the checker. Plus pack type: "2026 Evidence File" or "Challenge Pack" (the Challenge Pack also needs the official value).
- **The "Create pack" button runs a new server function, `/api/owner-pack`, which:**
  1. Runs the estimate (or reads it from the report link) and loads all comparables.
  2. Automatically selects the best 5–8 comparables by closeness in location, sale date, size and property type, using completed sales only.
  3. Applies the standard adjustment table, recording the reason for each adjustment.
  4. Fills in the property profile, marking checker data as "Public data" and anything not known as "To be confirmed".
  5. Proposes an evidence rating and a draft conclusion from fixed wording. There is no free-written AI text.
  6. Builds the PDF on the server, watermarked DRAFT.
  7. Saves the case in Netlify Blobs (store "owner-packs") so it isn't tied to one browser.
- **Output:** the PDF on screen with a Download button, and a link to open the case in the existing pack builder for any fine-tuning.

**B. Approve**
- Simon reviews the pack, then enters his name, ticks the two checks and presses Approve.
- The final PDF is made without the DRAFT mark.
- Approval is always by hand; the page never approves automatically.

**C. Past packs**
- A list of saved cases (date, address, status), each with Download and Open buttons.

**Sending:**
- **Phase 1:** download only, and Simon emails it himself.
- **Phase 2 (optional, separate approval):** an "Email to me" button that sends the PDF only to a fixed owner address set in Netlify (`OWNER_EMAIL`). This needs a transactional email service (for example Resend or Postmark). It never sends to a customer.

## 4. Tasks (for Claude, after this brief is approved)

1. Move the pack calculations out of `pack.js` into a shared module, so the browser builder and the new server function give identical figures.
2. Write the automatic comparable selection and adjustment rules, and test them against the Chelsea example pack and 3 other test properties.
3. Build `/api/owner-pack` (create, list, approve), protected by PACK_KEY, with cases saved in Netlify Blobs.
4. Build the server-side PDF to match the current printed layout, including the DRAFT watermark.
5. Build `/owner.html` (works on a phone), and let the pack builder open a saved case.
6. Update `docs/evidence-pack.md` and correct its EmailOctopus mentions to MailerLite.

## 5. What Claude may do alone

- Work on a branch and pull request, and test on the free deploy preview.
- Create test packs, with addresses marked "TEST".

## 6. What needs Simon's approval

- Publishing to the live site (15 Netlify credits).
- Phase 2 email sending (choice of email service, the cost and the sender address).
- The automatic selection and adjustment rules, before any pack goes to a paying customer.

## 7. Testing required

- **Same result both ways:** the same case gives the same figures in the old builder and in the new automatic pack.
- **Rules are followed:** no asking prices; every adjustment has a reason; DRAFT appears until approved; and with fewer than 3 usable comparables the pack says "insufficient evidence" instead of inventing a range.
- **Security:** the page and API refuse requests without PACK_KEY; `/owner` is `noindex`; and the free report still never shows the comparable sales.
- **Devices:** iPhone, iPad and desktop (simulated in Playwright), plus Simon's real iPhone before approval.
- **Reporting:** results are listed as passed or failed, with screenshots and 2 sample PDFs.

## 8. Deliverables

- A pull request with a deploy-preview link.
- A test report, sample PDFs and screenshots.
- The code changes as text (for ChatGPT review).
- Updated docs.

## 9. Success measure

- Simon can produce a correct draft pack for any English property in under 2 minutes, from his phone or a computer, with no copying of links and no manual comparable picking.
- He can approve and download the final PDF in 1 more minute.

## 10. Questions for ChatGPT to review

1. Are automatic comparable selection and standard adjustments safe enough for a paid product, given that a person always approves? What should force the pack to "insufficient evidence"?
2. Should the PDF be built on the server (consistent and saved) or by printing from the browser as now (simpler, but tied to one browser)? Claude recommends the server.
3. Is PACK_KEY enough protection for a page that can produce paid packs, or should it have its own `OWNER_KEY` or Netlify password protection?
4. Is the Phase 2 "Email to me" worth a new email service, or is downloading enough?
5. Anything missing from the property profile that the pack needs and the checker doesn't collect, such as the condition photos and lease documents?
