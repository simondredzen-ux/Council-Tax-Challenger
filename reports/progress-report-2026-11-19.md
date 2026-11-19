# Challenge Mansion Tax: progress report on the prioritised action plan

19 November 2026. Prepared by Claude for Simon Dredzen.

Nothing has been published, merged or deployed. Everything below is on branches or free previews, awaiting your approval.

## 1. Executive summary

- **Priority 1 (short-lease wording): READY FOR APPROVAL.**
  - Every page that tied a short lease to the mansion tax band now separates market value from the surcharge valuation.
  - The £199 stand-alone Lease Value Review is no longer promoted; the £99 add-on stays.
  - The checker, the free report and its PDF now label the lease adjustment as market value only.
  - The changes are in pull request #26, on its free preview, which I have checked.
- **Priority 2 (pull request #26): READY FOR APPROVAL.**
  - What's in it: the "who can help" wording, the About page, Chelsea and Kensington, plus Priority 1.
  - The Chelsea and Kensington wording matches the government response and the Finance Bill.
  - **Recommendation: publish #26 on its own now, without waiting for #25.**
- **Priority 3 (Google and Bing indexing): BLOCKED – SIMON ACTION REQUIRED.**
  - Both were set up on 8 November, so there's nothing to redo.
  - I can't see their reports. Public search still returns nothing from the site.
  - Linking Windsor.ai (5 minutes) would let me read the figures every week.
- **Priority 4 (pull request #25, the owner's area): BLOCKED – SIMON ACTION REQUIRED.**
  - Code complete; signed-out security checked on the preview.
  - It needs three settings from you before the real tests (Google sign-in, PDF, email, iPhone) can run.
  - Do not publish it yet.
- **Priority 5 (independent credibility): READY FOR APPROVAL.** The outreach drafts of 17 November exist and haven't been sent. Section 9 has a short plan built on them, with two corrections.
- **Measurement: COMPLETE.**
  - The Monday check now records US results separately (a new "Region" column in your existing Visibility tracker).
  - It also records weekly sign-ups, orders and ad spend.

## 2. The five most urgent actions

1. **Approve and publish pull request #26.** This is you: say "publish it" after checking the preview, https://deploy-preview-26--challengemansiontax.netlify.app. It fixes the short-lease claims on the live site and adds the visibility wording.
2. **Check Google's Pages report and request indexing for 5 key pages.** This is you, about 10 minutes (section 6).
3. **Link Windsor.ai to Search Console and Bing.** This is you, about 5 minutes; the steps are on today's Notion to-do.
4. **Supply the three settings for pull request #25,** then I run the real tests (section 7).
5. **Approve the outreach plan** (section 9), starting with the HomeOwners Alliance and PrimeResi.

## 3. Prioritised implementation checklist

| # | Item | Status |
|---|---|---|
| 1.1 | Market value separated from the surcharge valuation (leasehold guide, appeals and specialists pages, homepage FAQ, checker, free report and its PDF) | READY FOR APPROVAL (PR #26) |
| 1.2 | No claim that a short lease will reduce the band | READY FOR APPROVAL (PR #26) |
| 1.3 | Stand-alone £199 Lease Value Review no longer promoted. It is removed from Services and the fees table; its order page still works, with a note, for anyone holding the link | READY FOR APPROVAL (PR #26) |
| 1.4 | £99 add-on kept, with the caveat | READY FOR APPROVAL (PR #26) |
| 1.5 | Lease adjustments qualified. Checker label: "−10% (market value; may not count for the surcharge)". The Evidence Pack adds a "Lease length" basis note and a warning | READY FOR APPROVAL (checker in #26; pack in #25) |
| 2.1 | Homepage, About, Chelsea and Kensington wording, and structured data | READY FOR APPROVAL (PR #26) |
| 2.2 | Preview of #26 checked: all 12 pages load, hidden from search engines, checker works | COMPLETE |
| 3.1 | Indexing status per page | BLOCKED – SIMON ACTION REQUIRED |
| 3.2 | Sitemap, canonicals and robots.txt on the live site | COMPLETE (no problems found) |
| 4.1 | Signed-out security on the preview: pages, data requests and `/data/` refused in any letter case | COMPLETE |
| 4.2 | Real Google sign-in, Netlify PDF, Gmail sending, iPhone tests | BLOCKED – SIMON ACTION REQUIRED |
| 5.1 | Outreach plan | READY FOR APPROVAL |
| 6.1 | Weekly check: Region column (UK/US) and commercial figures | COMPLETE |
| 6.2 | Windsor link for Search Console and Bing | BLOCKED – SIMON ACTION REQUIRED |
| — | New articles, area pages, valuation features, redesign, more ad spend | DEFERRED |

## 4. Exact wording changes (pull request #26)

**Leasehold flats guide, FAQ (visible text and search-engine data).** The question changes from "Does a short lease reduce my flat's mansion tax value? Usually, yes…" to "Can a short lease reduce my flat's mansion tax value?", answered:

> It isn't decided yet. A shorter lease usually lowers what a flat would sell for, especially below about 80 years. But the rules on what the Valuation Office must assume when it values homes for the surcharge haven't been published. For ordinary council tax, flats are valued as if they had a 99-year lease at a nominal rent, whatever the real term. If the surcharge follows that approach, a short lease wouldn't lower your band. The government has said it is still considering short leases. Keep a copy of your lease and its remaining term at April 2026, so you're ready either way.

**Leasehold flats guide, introduction.** "…can make a large difference to a flat's value, and to its band." becomes:

> …can make a large difference to what a flat would sell for. Whether they also count for the band depends on valuation rules the government hasn't published yet.

**Leasehold flats guide, "Remaining lease length".**

> A flat with a shorter lease usually sells for less than a similar flat with a long one, especially below about 80 years. Whether the surcharge valuation will take your actual lease length into account isn't decided yet (for ordinary council tax it doesn't: flats are valued as if they had a 99-year lease). Our checker assumes a long lease unless you tell it otherwise.

**Leasehold flats guide, ground rent.** Added: "Ground rent is also ignored for ordinary council tax (flats are valued at a nominal rent); the surcharge rules aren't published yet."

**Services, Lease Value Review.**
- **Price:** "£99 when added to a Property Value Evidence Pack". The stand-alone £199 price and its button are removed, and the fees table shows £99 only.
- **New paragraph:**

> Whether lease terms will count in the surcharge valuation depends on rules the government hasn't published yet. For ordinary council tax, flats are valued as if they had a 99-year lease at a nominal rent, so lease length and ground rent are ignored. We'll tell you plainly if the final rules mean your lease terms can't help your band.

**Order page (add-on):** "Whether these count for the surcharge depends on rules not yet published." The line "half the £199 it costs on its own later" is removed.

**Stand-alone order page:** a note recommending the £99 add-on and explaining the 99-year council tax rule.

**Checker:**
- **Hint:** "These can significantly reduce what a flat would sell for, so tick any that apply and we'll show the effect. For a short lease, the surcharge rules may not allow for it (not yet decided)."
- **Result note:** ends "Whether the surcharge valuation will allow for lease length isn't decided yet."
- **Adjustment label:** "−10% (market value; may not count for the surcharge)".

**Free report (web page and PDF):** "With a shorter lease, especially under 80 years, the market value is usually lower. Whether the surcharge valuation will take your actual lease length into account isn't decided yet: for ordinary council tax, flats are valued as if they had a 99-year lease." This replaces "the Valuation Office should allow for it, and it is worth raising in a challenge".

**Appeals and specialists pages:** a short qualifier wherever a short lease is listed as evidence.

The Chelsea, Kensington, homepage and About wording is as reported earlier (audit sections E to H).

**Checked against the sources:**
- The Finance Bill, Schedule 12 paragraph 2(2): assumptions are to be prescribed.
- The government response, paragraph 3.3.
- The 16 November fact-check: draft list in autumn 2027, challenges from April 2028 with an initial 8-month window (proposed), then the Valuation Tribunal for England.
- The Valuation Office has been part of HMRC since 1 April 2026.

**Also verified on the preview:**
- **Evidence Pack price:** "£199 introductory price".
- **Appeals Service:** £695, described as available only "when challenges open (expected April 2028)", with "Not yet open" kept.
- **No guarantees:** the existing "nobody can guarantee a lower band" wording is unchanged.

## 5. Status of the pull requests

**Pull request #26, "who can help" wording plus short-lease corrections: READY FOR APPROVAL.**
- Preview: https://deploy-preview-26--challengemansiontax.netlify.app
- Changes 12 site files; the site's existing checker tests pass.
- Safe to publish on its own (one Netlify charge, 15 credits). It doesn't depend on #25.

**Pull request #25, owner's area and voice-to-PDF: BLOCKED – SIMON ACTION REQUIRED.**

| # | Check from your brief | Status |
|---|---|---|
| 1 | Google sign-in only for simondredzen@gmail.com | Tested locally (another account, a token for another site, expired, reused, tampered and forged sign-ins all refused). Real Google sign-in on the preview: blocked, needs the client ID |
| 2 | Server-side checks on every protected endpoint | Complete (preview, signed out: every private page and data request refused) |
| 3 | Private property and sales data protected | Complete |
| 4 | `/data/` not downloadable | Complete (live-style preview: 404 in every letter case and encoding tried) |
| 5 | Real draft PDF on Netlify | Blocked: needs the settings below |
| 6 | Email to the fixed owner address | Blocked: needs `GMAIL_APP_PASSWORD` |
| 7 | iPhone Shortcut and follow-up questions | Blocked: needs `OWNER_VOICE_KEY` (tested locally) |
| 8 | DRAFT on every page until approval | Complete (local PDFs checked page by page) |
| 9 | Editing an approved pack returns it to draft | Complete (local browser test) |
| 10 | No credentials exposed | Complete for the code: keys live only in Netlify's settings; the voice key can't read data |

**Settings you need to supply (never in chat):**
1. **Google client ID:** create it in Google Cloud Console; the steps are on today's Notion to-do. It isn't secret, so paste it to me and I'll set `GOOGLE_CLIENT_ID`.
2. **`GMAIL_APP_PASSWORD`:** add it yourself in Netlify, from https://myaccount.google.com/apppasswords.
3. **`OWNER_VOICE_KEY`:** add it yourself in Netlify; a random string of 24 or more characters from your password manager.

Already set: `OWNER_EMAIL` (simondredzen@gmail.com) and `PACK_KEY` (proven by the working data lock).

**Your iPhone checklist, once those are set:**
1. Open the preview's /owner → Sign in with Google → choose simondredzen@gmail.com. It should open your drafts.
2. Sign out. Try signing in with any other Google account: it must be refused.
3. Create a draft from a postcode: check the confirmation step, the shortlist reasons, and that DRAFT shows when you tap Print.
4. Build the "Evidence Pack" Shortcut (docs/owner-area.md) and say "Hey Siri, Evidence Pack" followed by a test property. Expect the spoken reply within seconds and the email with the PDF within about a minute.
5. Try an address with two possible flats, and answer the follow-up question.
6. Open the draft from the email link, sign off, then change one word. It must return to draft.

## 6. Google and Bing indexing report

| Page | Indexing status | Evidence | Action |
|---|---|---|---|
| Homepage `/` | Unknown | No result in public search tests (US results), including for the site's own name and a `site:` search | Simon: URL inspection, then Request indexing |
| `/services` (Evidence Pack, Appeals Service) | Unknown | As above | Request indexing |
| `/about` | Unknown | As above | Request indexing (again after #26 is published) |
| `/mansion-tax-appeals` | Unknown | As above | Request indexing |
| `/mansion-tax-appeal-specialists` (live since 17 Nov) | Unknown | As above | Request indexing |
| `/mansion-tax-leasehold-flats`, `/mansion-tax-chelsea`, `/mansion-tax-kensington` | Unknown | As above | Request indexing after #26 is published |
| Sitemap | Live and valid: 20 addresses, correct canonicals | Checked on the live site | Simon: check its status in Search Console ("Success", discovered pages) |
| Technical blockers | None found: robots.txt allows crawlers; every page returns 200 with its own canonical; www and http redirect correctly; previews are hidden from search | Live checks, 19 Nov | — |
| Impressions, clicks, queries | Not available to Claude | Needs Search Console or Windsor | Link Windsor (5 minutes) |

**Verified by Claude:** the technical rows, and the absence of the site from public search results. **Needs your access:** everything Search Console and Bing report.

## 7. Actions that need you

1. Check the #26 preview, then say "publish it" (or tell me what to change).
2. In Search Console: open the **Pages** and **Sitemaps** reports, request indexing for the 5 key pages, and send me screenshots.
3. Link Windsor.ai to Search Console and Bing (steps on today's Notion to-do).
4. For #25: create the Google client ID (paste it to me), and add `GMAIL_APP_PASSWORD` and `OWNER_VOICE_KEY` in Netlify yourself. Then press "Retry deploy" on the #25 preview.
5. Confirm whether "development" belongs in your biography.
6. Approve or edit the outreach plan (section 9), the recipients and the journalist-service profile.
7. Monthly, from the UK: ask the questions in ChatGPT, Google AI Mode, Gemini and Perplexity, and log them in the tracker with Region "UK results".
8. Optional: share the MailerLite "Genuine leads" count, and checker visits (Cloudflare analytics or `STATS_KEY`), so lead-to-customer rates can be measured.

## 8. What can safely be published first

**Publish pull request #26 on its own, now.**
- It corrects the short-lease claims, which are a live accuracy risk today.
- It adds the visibility wording.
- It is fully tested on its preview and touches no sign-in, data or payment code.

**Keep #25 unpublished** until the tests in section 5 pass on its preview.

Publishing #26 first means one more Netlify charge later, when #25 goes live (15 credits each). The accuracy fix is worth that.

## 9. Outreach plan (for approval; nothing will be sent without it)

This builds on the drafts of 17 November ("Phase 2 drafts … NOT SENT" in Notion), with two corrections:
- **The Negotiator draft** lists "short leases" among things a model misses. It should say lease treatment for the surcharge isn't decided yet.
- **The biography line** should match the About page: "former solicitor; not an RICS surveyor".

**Three publications, in order:**
1. **HomeOwners Alliance.** Its mansion tax valuation guide is cited in almost every AI answer we tested. Offer data and comment on flats: floor level, lifts, and leases (with the caveat). The draft is ready.
2. **PrimeResi.** A prime London trade publication that appeared repeatedly in our results (valuation, HMRC staffing, design stories). Offer the floor-level data story: lower-ground period flats sell about 27% below first-floor flats per sq ft.
3. **The Negotiator or Property Industry Eye.** Offer the comment piece "what a mansion tax valuation model can't see" (draft ready, with the correction above).

**Expert commentary angles:**
- why the April 2026 valuation date matters, and what records to keep now;
- why flats in the same building can be valued very differently (floor level, lift, size, condition);
- how comparable sales evidence works;
- the open question of lease length, which is timely and shows expertise because few sources explain it correctly.

**Journalist request services:** Qwoted (free tier) and ResponseSource (paid), using the profile drafted on 17 November with the corrected biography line. Reply only to relevant requests.

**Directories and profiles:**
- Bing Places;
- the LinkedIn company page (exists; complete it);
- your personal LinkedIn headline, mentioning Challenge Mansion Tax;
- Google Business Profile, only if its rules accept the Mayfair virtual office address (check first);
- Trustpilot, only once real customers can be invited (no incentives, no invented reviews).

**LinkedIn, 3 posts over 3 weeks:**
1. Floor level and lifts: the data story.
2. "What the April 2026 valuation date means for your records."
3. "Short leases and the mansion tax: what we know and what we don't."

Each post links to the matching guide. No paid links, no review swaps, no accreditations we don't hold.

## Deferred, per your brief

New generic articles, more postcode pages, new valuation features, a redesign, and more ad spend before conversion tracking is reliable.
