# Challenge Mansion Tax: AI and search visibility audit

Date: 19 November 2026. Prepared by Claude for Simon Dredzen; for ChatGPT review.

This is a review only. Nothing on the live site has been changed, published, merged or deployed.

This audit follows the one of 16 November (`docs/ai-visibility-audit-2026-11-16.md` in the website repository). That audit's website changes are now live (pull request #24). This report covers what has changed since, plus new findings.

---

## 1. Executive summary

**Why ChatGPT recommended surveyors instead of us.** Search engines have not yet found the site. This is a failure to be discovered, not a failure to be chosen. Three days after the last audit:
- A web search for the site's own name still returns nothing from challengemansiontax.co.uk.
- None of the 10 generic questions in your brief named Challenge Mansion Tax.

AI assistants recommend businesses that appear in search indexes and that other websites mention. The site is about three weeks old, I found no evidence that it is indexed, and no independent site mentions it.

**The site itself is in good technical shape:**
- All 21 public pages work.
- Each page has its own canonical address, title and description.
- Structured data is in place (ProfessionalService, WebSite, FAQPage, Service, Person, Article).
- AI crawlers are explicitly welcome.
- Deploy previews are kept out of search engines (`X-Robots-Tag: noindex`).

**Prices and appeal wording are accurate and consistent:**
- Evidence Pack: £199 for the first 10 orders, then £299.
- Appeals Service: £695, with the pack's price credited.
- The Appeals Service is clearly marked "Not yet open".

**The privacy policy is complete:** ICO registration ZC294965, the business name and the Mayfair address are all shown on the live page. There are no placeholders. An internal README note still says "fill in the placeholders", which is out of date.

**One material accuracy issue needs fixing before anything else.** The site says a short lease "usually" lowers a flat's mansion tax value. It also sells a Lease Value Review on the basis that lease terms "could support a challenge to your band". That is not established:
- The Finance Bill leaves the valuation assumptions to future regulations.
- The government response says it is still considering short-lease concerns.
- Under ordinary council tax, the Valuation Office values every flat as if it had a 99-year lease at a nominal rent, whatever the real term.

If the surcharge follows the council tax rule, lease length and ground rent would not count. The wording should say this is undecided (section 5 has the replacement text).

**Direct competitors now exist and are being found:**
- mansiontaxes.com: a £395 band check plus a 40% success fee.
- Websters Surveyors: an RICS valuation from £850 + VAT.
- Council Tax Challenger: a £9.99 evidence pack.
- Search results are dominated by UK Property Accountants, the HomeOwners Alliance and the big agents' tax valuation pages (Savills, Knight Frank, John D Wood).
- They appear because they are indexed, older and linked from other sites, not because their offer is better.

**The fixes that matter most:**
- confirm Google and Bing indexing (only you can do this);
- correct the lease wording;
- earn 3 to 5 genuine independent mentions;
- then re-test weekly.

---

## 2. Search and AI visibility report (verified)

### How I tested, and the limits

- **What I used:** the web search tool available to me, on 19 November 2026. Its results are US-based, so UK results from Google or Bing may differ.
- **What I couldn't use:** I can't use ChatGPT, Google AI Mode or AI Overviews, Gemini or Perplexity from here. I have not simulated them; you need to run those yourself (section 7).
- **Claude:** these tests are Claude using web search. Claude without search only knows its training data, which predates the site.
- **Pages I couldn't open:** this session's network blocks gov.uk and the competitors' sites. Facts were checked against the government documents saved in the website repository and against gov.uk search results. Competitor details come from search results, not from opening their pages.

### Results (genuine searches, 19 November 2026; none mentioned Challenge Mansion Tax)

| # | Question | Challenge Mansion Tax? | Who appeared instead (sources) |
|---|---|---|---|
| 1 | Which companies can help me challenge my mansion tax valuation? | No | UK Property Accountants, Which?, HomeOwners Alliance (surveyor directory), Wedlake Bell, The National; also US "mansion tax" results |
| 2 | Who can appeal the new mansion tax banding in 2028? | No | MoneyWeek, The National, Price Bailey, City AM, Purplebricks, Which?, Mortgage Solutions, UK Property Accountants |
| 3 | Recommend a specialist mansion tax valuation company | No | Savills, Knight Frank, Chestertons, John D Wood, Carter Jonas, Cushman & Wakefield, Shepherd, Allsop, Justin Mason Valuation Consultancy, UK Property Accountants, HomeOwners Alliance |
| 4 | Who prepares mansion tax property valuation evidence reports? | No | UK Property Accountants, HomeOwners Alliance, Purplebricks, The Negotiator; mostly US results |
| 5 | How can I challenge a mansion tax valuation below the £2 million threshold? | No | UK Property Accountants, The National, MoneyWeek, Homebuilding, eSurv report, Collyer Bristow, LBC, Mumsnet |
| 6 | Who handles mansion tax appeals in Chelsea? | No | Only US results (Chelsea, Massachusetts; Los Angeles) |
| 7 | Who handles mansion tax valuations in Kensington? | No | Purplebricks, ICAEW, PrimeResi, UK Property Accountants, RBKC, Winkworth, HomeOwners Alliance |
| 8 | Can a short lease reduce a mansion tax valuation? | No | GB News (Lawhive analysis), Property Reporter, Hamptons, UK Property Accountants, Property118 |
| 9 | Who can prepare comparable sales evidence for a valuation appeal? | No | Only US county and appraisal pages |
| 10 | Which companies specialise in the High Value Council Tax Surcharge? | No | Saffery, UK Property Accountants, Price Bailey, Birketts, Mishcon de Reya, Greenwoods, Deloitte, Burges Salmon, gov.uk |

**Baseline score: 0 of 10 (0%).** The 16 November baseline was also 0 of 6.

Extra checks:
- **Our name:** "Challenge Mansion Tax" challengemansiontax.co.uk returned nothing from our site.
- **Specialist searches:** "mansion tax valuation challenge specialist London" returned Websters Surveyors, Council Tax Challenger, the HomeOwners Alliance, Winkworth, Savills, John D Wood, Capital Chartered and Luxury London.
- **Another phrasing:** a further specialist search returned the LonRes agents' guide, Council Tax Challenger, Websters, mansiontaxes.com and the HomeOwners Alliance.

**Opportunities in these results:**
- **Chelsea (question 6):** the search returns no UK result at all. A clearly titled "Chelsea" page could fill that gap once the site is indexed.
- **Comparable sales (question 9):** results are US-only. Our appeal pages could answer that question for England.

### Google and Bing indexing

**Not verified.** I have no access to your Search Console or Bing Webmaster Tools accounts. The live homepage has no Google or Bing verification tag, and there is no `BingSiteAuth.xml` (404). Either the sites were verified by a DNS record, or they haven't been set up. Your to-do list of 18 November had "submit the sitemap in Google Search Console and Bing" as still to do. **Please check both and tell me what you see; I won't claim indexing without that evidence.**

---

## 3. Competitor comparison

Each firm's price and service are as stated in search results about it; I couldn't open the competitors' pages to check them.

| Competitor | Offer and price | Credibility signals | Why it shows up and we don't |
|---|---|---|---|
| **mansiontaxes.com** ("Mansion Tax Valuation Reviews and Appeals") | Band check £395, credited against a success fee of 40% of the first two years' saving; says self-challenge is expected to be free | Unknown (not readable from here) | Exact-match name and domain; already indexed |
| **Websters Surveyors** (London, RICS) | Mansion tax RICS valuation from £850 + VAT | RICS firm, existing London valuation pages | Established domain with years of history; dedicated /mansion-tax/ page |
| **Council Tax Challenger** (counciltaxchallenger.co.uk) | £9.99 evidence pack; detailed guide "Challenge a Mansion Tax Valuation: Proposed Rules 2026" | Large council tax content base | Many indexed council tax pages and older domain |
| **UK Property Accountants** | Advisory; mansion tax calculator, dedicated HVCTS pages, many articles | Accountancy firm | Appeared in 7 of the 10 tests; volume of indexed content and links |
| **HomeOwners Alliance** | Guide plus a chartered surveyor directory | National consumer body, press citations | High authority; widely linked |
| **Savills, Knight Frank, John D Wood, Chestertons, Carter Jonas, Allsop, Justin Mason** | Tax valuation services (Red Book) | RICS, brand, decades of links | Domain authority; AI tools default to "ask an RICS surveyor" |
| **Challenge Mansion Tax** (us) | Free checker; Evidence Pack £199 then £299; Appeals £695 less the pack; no success fee | Named expert with a detailed bio; real Land Registry data; structured data | **Not yet indexed; no independent mentions** |

**Our advantages, honestly stated:**
- **Price:** fixed, with no success fee. mansiontaxes.com would take 40% of two years' saving, which is £2,000 on a one-band drop of £2,500 a year. An RICS report costs £850 + VAT or more.
- **Evidence:** real comparable sales, not a single figure.
- **Experience:** a named prime London expert.
- **Content:** the most specific on flats (floor level, lifts, leases).

The **weakness** is that these advantages are invisible until the site is indexed and cited.

**Why AI tools pick surveyors.**
- **Familiar categories:** AI tools answer "who can help" with the category of firm they see most often, which is RICS surveyors and accountants.
- **Many sources:** they name firms that appear in several independent sources.
- **Where we stand:** we appear in none yet.

---

## 4. Technical and credibility audit

### Technical (live site, 19 November)

| Check | Result |
|---|---|
| robots.txt | Allows all crawlers; names ClaudeBot, OAI-SearchBot, ChatGPT-User, GPTBot, PerplexityBot and Google-Extended. Blocks only private paths. **OK** |
| sitemap.xml | 20 public URLs with lastmod dates. **OK** (minor: privacy is listed as `/privacy.html` while every other address has no `.html`; harmless, as its canonical matches) |
| Canonicals, titles, descriptions | Present and distinct on all 21 pages checked. **OK** |
| Redirects | `www` and `http` both redirect (301) to `https://challengemansiontax.co.uk/`. **OK** |
| Structured data | Homepage: ProfessionalService (address, price range, Facebook and LinkedIn), WebSite, FAQPage. Services: three Service items with prices. About: Person (Oxford). Guides: Article with dates and byline. **OK** |
| Order page | `noindex` (correct). **OK** |
| Deploy previews | `X-Robots-Tag: noindex` on deploy-preview-25. **OK, not indexable** |
| llms.txt | Present (6 KB), accurate. **Keep; benefit unproven** |
| Bylines and dates | Guides show "By Simon Dredzen", reviewed or published dates. **OK** |
| About page | 442 words. Bio is accurate but thin for a credibility page; no photo, no personal LinkedIn, no direct contact line |
| Person data | No `sameAs` (personal LinkedIn), no `description` and no `hasOccupation`; `jobTitle` is "Founder" only |
| Google and Bing verification | Not visible in the page code. Possibly done by DNS: **you to confirm** |

**Proven SEO requirements** (all in place): crawlable pages, a sitemap, canonicals, unique titles, internal links, indexing, and links from other sites (the last two are the gap).

**Experimental AI ideas** (low cost; benefit not proven):
- llms.txt;
- naming AI crawlers in robots.txt;
- FAQ structured data, which Google no longer shows for most sites but AI tools may still read.

### Facts checked against the fact-check of 16 November and the saved government documents

Sources: `docs/fact-check-and-ad-instructions-2026-11-16.md`, `docs/hvcts-government-response-oct-2026.pdf` and `docs/finance-bill-173-hvcts-extract.pdf`.

| Claim on the site | Status |
|---|---|
| England only; £2m or more; bands £2,500, £3,500, £5,000, £7,500 | Matches the Finance Bill (clause 101: "equal to or above £2 million") |
| April 2026 values; start April 2028; first bills March 2028 | Matches; the exact valuation day is left to regulations, and the site says "April 2026" |
| Draft list autumn 2027 to correct facts; formal challenges from April 2028; initial 8-month window (proposed) | Matches the government response |
| Long leaseholders (original term over 21 years) pay | Matches the Finance Bill (clause 99) |
| "Over £2 million" used for the threshold | Not found (only "just over £2m" in a worked example, which is correct) |
| Simon: read Law at Oxford, qualified solicitor (six years in commercial litigation), no longer practising, former investment banker, over two decades in prime London property, founded a Knightsbridge agency in 2001 | All on the About page. Your brief also lists "development" experience, which is not on the site; **please confirm before I add it** |
| Not RICS; Indicative Values are not RICS valuations; no guaranteed outcome | Stated clearly on Services, About, Terms and the specialists page. **OK** |
| **Short lease lowers the mansion tax value / supports a band challenge** | **Not established.** See below |

**The short-lease issue in detail:**
- **The Finance Bill** (Schedule 12, paragraph 2(2)): valuations are made "on such assumptions and in accordance with such principles … as may be prescribed".
- **The government response** (paragraph 3.3) "recognises concerns raised by respondents, particularly in relation to specific leasehold interests" and "will continue to consider feedback received and will publish further detail".
- **Council tax practice** (GOV.UK Council Tax Manual): flats are valued "on the basis that there is the benefit of a lease for 99 years at a nominal rent", "irrespective of the actual length of the remaining term or rent paid".

**Affected pages:**
- the leasehold flats guide (its FAQ answers "Can a short lease reduce my flat's mansion tax value? **Usually, yes.**");
- the Services page (Lease Value Review: "explain how each one could support a challenge to your band");
- the free checker (a −10% adjustment for leases under 80 years);
- the homepage checker hint ("we'll allow for them");
- the Evidence Pack adjustment table (lease relativity).

None of these says the treatment is undecided. That makes this the most important compliance fix.

---

## 5. Exact proposed wording changes (for approval)

**A. Leasehold flats guide, FAQ.** Replace "Can a short lease reduce my flat's mansion tax value? Usually, yes." and its answer with:

> **Can a short lease reduce my flat's mansion tax value?**
> It isn't decided yet. A shorter lease usually lowers what a flat would sell for, especially below about 80 years. But the rules on what the Valuation Office must assume when it values homes for the surcharge haven't been published. For ordinary council tax, flats are valued as if they had a 99-year lease at a nominal rent, whatever the real term. If the surcharge follows that approach, a short lease wouldn't lower your band. The government has said it is still considering short leases. Keep a copy of your lease and its remaining term at April 2026, so you're ready either way.

**B. Leasehold flats guide, "How a lease affects value", first bullet.** Replace it with:

> **Remaining lease length.** A flat with a shorter lease usually sells for less than a similar flat with a long one, especially below about 80 years. Whether the surcharge valuation will take your actual lease length into account isn't decided yet (for ordinary council tax it doesn't: flats are valued as if they had a 99-year lease). Our checker assumes a long lease unless you tell it otherwise.

**C. Services page, Lease Value Review.** Add, after "explain how each one could support a challenge to your band":

> Whether lease terms will count in the surcharge valuation depends on rules the government hasn't published yet. For ordinary council tax, flats are valued as if they had a 99-year lease at a nominal rent, so lease length and ground rent are ignored. We'll tell you plainly if the final rules mean your lease terms can't help.

**Decision for you:** pause sales of the stand-alone Lease Value Review (£199) until the regulations are out, or keep it with this caveat. My recommendation is to keep it only as the £99 add-on, with the caveat.

**D. Homepage checker hint.** Replace "These can significantly reduce a flat's value, so tick any that apply and we'll allow for them." with:

> These can reduce a flat's market value. Tick any that apply and we'll show the effect, though for a short lease the surcharge rules may not allow for it (not yet decided).

**E. About page, opening.** This tightens the lead so AI tools can quote it; every fact is from the current page:

> Simon Dredzen founded Challenge Mansion Tax and personally reviews every Property Value Evidence Pack. He has worked in prime central London residential property for over two decades, as a selling agent and property finder, covering valuations, sales, purchases and investment, and founded an independent estate agency in Knightsbridge in 2001. He read Law at Oxford, qualified as a solicitor and practised in commercial litigation for six years, and was an investment banker. He no longer practises as a solicitor and is not an RICS surveyor; Challenge Mansion Tax gives evidence reviews, not legal advice or RICS valuations.

Add "development" only if you confirm it. Add a photo and your personal LinkedIn URL if you're happy to.

**F. About page, structured data** (not visible on the page). Add `description` (the paragraph above), `sameAs` (your personal LinkedIn, once you send it) and `knowsAbout: "Leasehold property"`. Never add RICS or "solicitor" as a current credential.

**G. Homepage, one sentence near the top** (answers "who can help" directly):

> Challenge Mansion Tax prepares comparable-sales evidence for homeowners who want to check or challenge their mansion tax (High Value Council Tax Surcharge) band: a free checker, a £199 Property Value Evidence Pack reviewed by Simon Dredzen, and a fixed-fee Appeals Service when challenges open (expected April 2028).

**H. Chelsea page, an FAQ answer** for "Who handles mansion tax appeals in Chelsea?":

> Mansion tax bands in Chelsea (SW3, SW10) are set by the Valuation Office, part of HMRC, not by Kensington and Chelsea council. Owners will be able to correct facts when the draft list is published (expected autumn 2027) and challenge their band from April 2028, then appeal to the Valuation Tribunal. You can do this yourself, use an RICS surveyor, or use an evidence service such as ours; we prepare comparable sales from Chelsea, adjusted to April 2026.

Use the same pattern on the Kensington page (W8).

**I. Repository README** (internal, not on the website). Replace "Fill in the placeholders in `site/privacy.html` (business name, address, ICO number, date)" with "Privacy policy complete: ICO registration ZC294965, Mayfair address (8 Nov 2026)".

---

## 6. Prioritised implementation checklist

### Immediate: technical and credibility fixes (this week)

| Priority | Action | Reason | Expected benefit | Effort |
|---|---|---|---|---|
| 1 | Verify Google Search Console and Bing Webmaster Tools; submit the sitemap; request indexing of the homepage, Services, About, appeals, specialists, Chelsea and Kensington pages (you) | Not indexed; Bing feeds ChatGPT search and Copilot | Prerequisite for any visibility | 30 minutes |
| 2 | Correct the short-lease wording (A to D) | Material accuracy risk on a paid product | Avoids misleading customers; credibility with AI tools and reviewers | 1 hour (Claude) + one publish |
| 3 | About page lead and Person data (E, F); photo and LinkedIn if you agree | AI tools look for a named, verifiable expert | Better "who is behind this" signals | 30 minutes |
| 4 | Homepage "who we help" sentence (G) | Gives AI tools a quotable one-line answer | Matches "who can help me" queries | 15 minutes |
| 5 | README note (I) | Stops the false "placeholders" alarm | Housekeeping | 5 minutes |

Group items 2 to 4 into one publish, ideally with pull request #25 if that is approved (one charge of 15 Netlify credits).

### Short term: content and search (next 4 to 6 weeks)

| Priority | Action | Reason | Expected benefit | Effort |
|---|---|---|---|---|
| 6 | Chelsea and Kensington pages: add "who handles appeals here" FAQs (H) and keep the data current | The Chelsea query returns no UK results | Chance to own local answers | 2 hours |
| 7 | Improve the existing appeals page rather than adding new ones, so it answers: how comparable sales support a challenge; why flats in one building get different values (floor, lift, size, condition); what to do when draft bands are published | These are the brief's questions, and they are partly answered across pages | Better answers to the brief's questions | Half a day |
| 8 | Bing Places and a complete LinkedIn company page; your personal LinkedIn headline mentioning Challenge Mansion Tax | Profiles that AI tools cross-check | Entity recognition | 1 hour |
| 9 | Press release only when there is news (e.g. the Bill's progress or regulations on valuation assumptions), with your expert comment | News pages are indexed fast and cited | First independent mentions | 2 hours each |

### Longer term: independent authority (now to autumn 2027)

| Priority | Action | Reason | Expected benefit | Effort |
|---|---|---|---|---|
| 10 | Expert comment pitches: HomeOwners Alliance, PrimeResi, The Negotiator, Property Industry Eye, Estate Agent Today, Luxury London | They already rank and are cited in AI answers | The mentions AI tools rely on | Ongoing, 2 hours a month |
| 11 | Journalist requests (ResponseSource, Qwoted, #journorequest) | Telegraph, Times and Which? cover the mansion tax often | High-authority citations | 15 minutes a day when active |
| 12 | Data stories from your own sales data (e.g. "how many Chelsea flats sold within 5% of £2m") | Original data earns links | Durable backlinks | 1 day each |
| 13 | Prime London agents and residents' associations: a resource-page link or a newsletter article | Relevant, honest mentions | Local authority signals | Ongoing |
| 14 | Genuine customer reviews after delivery (no incentives) | Trust signal for people and AI tools | Conversion and credibility | Ongoing |

Not recommended: paid links, guest-post networks, keyword-stuffed pages, or new area pages without real local data.

---

## 7. Baseline AI visibility scorecard and weekly test

### Baseline (19 November 2026)

| Engine | Tests run | Mentioned us | Linked to us | Score |
|---|---|---|---|---|
| Claude with web search (US results) | 10 | 0 | 0 | **0%** |
| ChatGPT (search on) | Not accessible to Claude | | | You to run |
| Google search and AI Overview / AI Mode (UK) | Not accessible | | | You to run |
| Gemini | Not accessible | | | You to run |
| Perplexity | Not accessible | | | You to run |
| Bing (UK) | Not accessible | | | You to run |

### Weekly test procedure (about 20 minutes, every Monday)

1. **Set up:** open a private or incognito window, signed out, so personal history doesn't influence the results. In ChatGPT, use a temporary chat with search on.
2. **Ask the questions:** paste each of the 10 questions exactly as written, without mentioning Challenge Mansion Tax.
3. **Record each answer in a spreadsheet:**
   - date and engine;
   - mentioned (yes or no);
   - linked (yes or no);
   - position (1st named, 2nd, …);
   - competitors named;
   - sources cited.
4. **Score:** the percentage of answers that mention us, per engine and overall.
5. **Track Google and Bing separately**, from Search Console and Bing Webmaster Tools:
   - pages indexed;
   - impressions and clicks;
   - the queries we appear for;
   - average position for "mansion tax appeal", "challenge mansion tax valuation" and "mansion tax valuation specialist".
6. **Check our own name:** search for "Challenge Mansion Tax". Being found for our own name is the first milestone.
7. **Review monthly, not weekly:** small week-to-week changes are noise.

**Expectations, honestly:**
- Indexing usually takes days to weeks once submitted.
- Independent mentions take weeks to months.
- AI recommendations follow mentions.

Nobody can guarantee rankings or AI recommendations. Measure progress in three steps: found for our own name, then found for priority phrases, then mentioned by AI tools.

---

## Five most important actions, in plain English

1. **Get the site into Google and Bing.** Check Search Console and Bing Webmaster Tools, submit the sitemap and ask them to index the key pages. Until this happens, no AI tool can recommend us.
2. **Correct the short-lease claims.** The government hasn't decided whether lease length counts, and for council tax it doesn't. Say so on the leasehold guide, the Services page and the checker, and reconsider selling the stand-alone Lease Value Review until the rules are out.
3. **Earn the first independent mentions.** Offer your expert comment to the HomeOwners Alliance and the property press, and answer journalist requests. Mentions on trusted sites are what AI assistants rely on.
4. **Make "who can help" answers easy to quote.** Add one clear sentence on the homepage, local "who handles appeals" answers on the Chelsea and Kensington pages, and a sharper About page (with a photo and LinkedIn if you agree).
5. **Measure every week, the same way.** Ask the 10 questions in ChatGPT, Google, Gemini and Perplexity, and log the results. Use Search Console and Bing data to see what's working, and judge it monthly.
