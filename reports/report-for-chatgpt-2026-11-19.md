# Report for ChatGPT: Challenge Mansion Tax, Claude's work on 19 Nov 2026

Nothing has been published to the live site. Pull requests are on free Netlify previews awaiting Simon.

## 1. Owner's area and voice-to-PDF (PR #25, brief v4, approved "as recommended")

- Private /owner page, not linked or listed. Sign-in changed from a password to "Sign in with Google" (only simondredzen@gmail.com). Old /pack-builder and /sample-approve moved behind the same sign-in.
- Draft Evidence Packs from a report link or direct entry. The full sales list is shown, with reasons for any sale set aside, and a suggested shortlist of 5–8 chosen on merit (the checker's middle 50% is for reference only). Also: LonRes manual entry, CSV export, provisional adjustments, plain-English missing facts, and no value range under 3 credible sales. DRAFT appears on every page until sign-off, and editing after sign-off returns the pack to draft.
- Voice: iPhone Shortcut → /api/owner/voice → follow-up questions if needed → draft PDF emailed only to OWNER_EMAIL (fixed in Netlify).
- Security fix found: the raw sales and address data files (/data/) were publicly downloadable. They are now locked to the site's own functions, in any letter case.
- Tested locally and in a simulated browser; signed-out access tested on the preview.
- Not yet tested on the preview: real Google sign-in, server PDF on Netlify, Gmail sending, Simon's iPhone.
- Blocked on Simon: Google client ID; GMAIL_APP_PASSWORD and OWNER_VOICE_KEY in Netlify.

## 2. AI and search visibility audit (reports/ai-visibility-audit-2026-11-19.md)

- 0 of 10 generic questions named Challenge Mansion Tax (Claude web search, US-based results). The site's own name returns nothing: a discovery problem, not a selection problem.
- The site is technically sound, and prices and appeal wording are accurate.
- ICO: no problem. The live privacy policy shows ICO ZC294965, the trading name and the Mayfair address. The "placeholders" concern came from an out-of-date internal README note, now corrected. No publish needed.
- Material issue: the site says a short lease "usually" lowers the mansion tax value, and sells a Lease Value Review on that basis. That is not established:
  - the Finance Bill (Sch 12 para 2(2)) leaves valuation assumptions to regulations;
  - the government response says short leases are still being considered;
  - council tax values flats as if they had a 99-year lease at a nominal rent.

  Replacement wording is proposed (audit sections A–D), awaiting Simon's decision.
- Competitors: mansiontaxes.com (£395 + 40% success fee), Websters Surveyors (RICS from £850 + VAT), Council Tax Challenger (free mansion tax guides; its £9.99 pack is for ordinary council tax, not the mansion tax: corrected later on 19 Nov). UK Property Accountants appeared in 7 of 10 searches.
- Correction to earlier sessions: Google Search Console and Bing were already set up on 8 Nov (Namecheap TXT record, sitemap submitted). The 17 Nov "set-up guide" repeated work already done. What's needed now is to check indexing results, not to set them up again.

## 3. "Who can help" wording (PR #26, audit action 4)

- Homepage one-line description of the service; sharper About lead (former solicitor, Oxford Law, investment banker, not RICS, no longer practising) and Person structured data; "Who handles mansion tax appeals in Chelsea / Kensington?" sections with FAQ data.
- "Development" experience is not added until Simon confirms it.
- To be published together with PR #25 (one Netlify charge).

## 4. Measurement

- Weekly scheduled test, every Monday at 07:35 UK time, in Claude's conversation: 10 questions plus an own-name check, logged in the existing Notion "Visibility tracker" (baseline 19 Nov = 0/10). A duplicate tracker page was removed.
- Windsor.ai can feed Google Search Console and Bing figures into the weekly check once Simon links them (on today's to-do list).
- ChatGPT, Google AI Mode, Gemini and Perplexity: tested by Simon by hand, monthly.

## Questions for ChatGPT to review

1. Short-lease wording (audit sections A–D): accurate and fair? Should the £199 stand-alone Lease Value Review be paused until the regulations are published?
2. Anything in the Chelsea/Kensington "who handles appeals" wording that overstates the proposed process?
3. Any missing quick win for being found in ChatGPT and Google before autumn 2027?
