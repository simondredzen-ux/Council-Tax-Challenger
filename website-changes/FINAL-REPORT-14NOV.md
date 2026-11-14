# Challenge Mansion Tax: implementation report, 14 Nov 2026

## A. Completed independently (verified)

1. **Connector check.**
   - Working: GitHub (read/write), Netlify (read only), MailerLite (read/write), Gmail (drafts) and web search.
   - Not available in Claude: Google Ads, Windsor.ai, GA4, Meta Ads.
2. **Website (pull request #18, not published).**
   - Added the guide description, the credibility line and the header link to the short form.
   - Fixed two defects found on iPads: 15.2px fields and 34px cookie buttons.
   - Retested on 13 simulated devices against the deploy preview; all pass (details in the PR).
3. **Policy facts checked** against gov.uk: England, £2m+, April 2026 values, starts April 2028, Valuation Office Agency. The £7,500 top-band figure wasn't confirmed in the search results; it isn't used in the drafts.
4. **Second email: unsent draft** in MailerLite.
   - It sits in the automation "DRAFT (off) – report and guide email, plain rewrite for approval", which is switched off.
   - It uses Simon's wording, the existing legal wording and the unsubscribe link, and a proper text-only version.
   - The live "report and guide" email is unchanged.
5. **MailerLite review.**
   - Each automation is triggered once when someone joins a group, so no duplicate-send risk was found.
   - The follow-up sequences skip Sample requests and Customers.
   - MailerLite reports the sender domain needs no further authentication. DMARC can't be checked from here.
6. **Google Ads script v2.**
   - Read-only by default: each change has its own switch.
   - The Wales negative is now phrase-only, so searches for "mansion tax england and wales" aren't blocked.
   - It adds keyword, ad and location reports and looks up the Google IDs for the 15 postcodes.
   - The postcode bids (+25%) and two paused new ads are behind switches.
   - Tested on a simulated account: 0 changes when read-only; exactly 14 intended changes with all switches on.
7. **Ad copy:** two ads (information-led and evidence-led), 10 headlines each, all within Google's limits, with no guaranteed outcomes. They're in the script and created paused only if the switch is on.
8. **Genuine lead follow-up:** unsent Gmail draft, "Your mansion tax estimate and the £5m line".
9. **Lead reconciliation:**
   - Netlify guide-signup: 30 in total; all but 1 are tests.
   - MailerLite: 1 genuine lead (7 Nov, not from an ad).
   - The Sample requests and Customers groups contain only test addresses.

## B. Ready for approval

| Item | Benefit | Risk | Cost | Reversible |
|---|---|---|---|---|
| Publish PR #18 | Guide offer visible to phone visitors | Low, tested on 13 simulated devices | 15 Netlify credits | Yes; rollback is free |
| Script: tracking suffix | See which keyword brings each lead | None | £0 | Yes |
| Script: negative keywords | Stops spend on Scotland, Wales and NI searches | Very low | £0 | Yes |
| Script: sitelinks | Larger ads, more routes in | Low | £0 | Yes |
| Script: postcode bids +25% | More visibility in high-value areas | Higher CPC there | Spend only | Yes |
| Script: 2 new ads, created paused | Clean test of two messages | None until enabled | £0 | Yes |
| Swap in the second email | Fixes the broken text-only version, plainer email | Low | £0 | Yes |
| Send the follow-up to the genuine lead | Possible first client | Low | £0 | No (it's an email) |
| Weekly lead report as a Claude scheduled task | Automatic reconciliation | None | Claude usage only | Yes |

**Location setting.** I now recommend **keeping "Presence or interest"**, which reverses my earlier advice. Practically all reported spend (£55.50 of £56.90) was already from England. "Presence only" would also block overseas owners of English homes, who are a real audience for £2m+ London property.

## C. Only Simon can do

1. Fix billing in Google Ads; remove the campaign end date; set the conversion's Count to "One".
2. Check the preview on a real iPhone, then say "publish it".
3. Paste the script into Google Ads and **Preview** it. Send Claude the log, and turn on the switches you approve.
4. To give Claude checker-completion numbers: open `https://challengemansiontax.co.uk/api/check-stats?key=<your STATS_KEY>&month=2026-11` yourself and paste the result. Don't paste the key itself into chat.

## D. Performance dashboard (10–14 Nov)

| Metric | Value |
|---|---|
| Spend / impressions / clicks | £56.90 / 588 / 36 |
| CTR / CPC | 6.12% / £1.58 |
| Website visits | Not available (no GA4 access) |
| Genuine guide sign-ups from ads | 0 |
| Genuine leads in total | 1 (7 Nov, direct) |
| Cost per lead | No leads yet (£56.90 spent) |
| Evidence Pack orders (£199) / appeal enquiries (£695) | 0 / 0 |
| Checker completions | Not available (needs STATS_KEY) |

**Next review:** after a further £50–75 of spend with the new page live, or 7 days, whichever comes first.

## E. Blockers

- **Google Ads, Windsor.ai, GA4, Meta Ads:** no connector in Claude. Alternatives: the Google Ads script (Simon runs it), and the Windsor data pasted into chat.
- **Website repository:** connected after approval.
- **Netlify:** read only, so Claude can't read form submission contents or publish. Publishing goes through the PR merge.
- **DNS / DMARC:** no DNS lookup available here. Check in MailerLite → Settings → Domains.
