# Review of ChatGPT's brief "Get Challenge Mansion Tax appearing in Google search"

19 November 2026. Prepared by Claude for Simon Dredzen.

Nothing has been published. Changes are on pull request #26's free preview: https://deploy-preview-26--challengemansiontax.netlify.app

## 1. Executive summary

Much of this brief repeats work that is already done or already reported today. Worth adopting:
- the sharper title, heading and description for the appeals page;
- a clear "how we help" section with prices, "not yet open" and no guarantee;
- one Google Search Console baseline for "mansion tax appeals".

I've prepared the appeals page changes on pull request #26. Internal links, outreach and indexing are already covered.

**Two facts in the brief are wrong:**
1. **The Google Ads campaign did get impressions:** 728 since 9 November. The real problem is different (section 7).
2. **The campaign is still running and spending,** at about £5 a day, with no conversions.

## 2. What to adopt

| Brief priority | Recommendation | Status |
|---|---|---|
| 1. Google indexing | Adopt, but it's the same check as this morning's report; no new work. Needs your Search Console access | BLOCKED – SIMON ACTION REQUIRED |
| 2. Optimise the appeals page | Adopt, adjusted (section 3) | READY FOR APPROVAL (PR #26) |
| 3. Internal links | Already done: the appeals page is in the main menu and linked from 24 pages, including the homepage, guides, Chelsea, Kensington, leasehold and services pages. Adding more would be repetitive | COMPLETE |
| 4. Independent credibility | Adopt; same as this morning's outreach plan (drafts from 17 Nov) | READY FOR APPROVAL |
| 5. Google Ads review | Adopt the diagnosis (section 7). Don't launch a new "appeals" campaign yet | READY FOR APPROVAL (a decision for you) |
| 6. Measure Google performance | Adopt; the Monday check already records it once Windsor is linked to Search Console | BLOCKED – SIMON ACTION REQUIRED |

## 3. Appeals page: what changed (pull request #26)

**Exact proposed title, heading and description:**

| | Current | ChatGPT's proposal | Prepared (recommended) |
|---|---|---|---|
| Title | Mansion Tax Appeals: How to Challenge Your Band | Mansion Tax Appeals 2028 \| Valuation Evidence & Help | **Mansion Tax Appeals 2028: How to Challenge Your Valuation** (57 characters) |
| Main heading | Mansion tax appeal: how to challenge or appeal your band | Mansion Tax Appeals: How to Challenge Your Property Valuation | **Mansion tax appeals: how to challenge your property valuation** (adopted) |
| Description | How to challenge or appeal your mansion tax band: key dates… | Concerned about your 2028 mansion tax band? Get independent property valuation evidence, comparable sales analysis and help preparing for the appeals process. | **Worried about your 2028 mansion tax band? How the proposed challenge and appeal process works, the April 2026 evidence that counts, and how we can help.** (152 characters) |

**Why I adjusted the title and description:**
- **The title:** it keeps "how to challenge", which matches what people search, rather than "& Help".
- **The description:** "independent property valuation evidence" could read as a formal valuation, which we must not imply. The prepared version describes what the page actually covers.

**Content.** The page already explained the proposed tax, the April 2026 valuation date, the April 2028 start, the draft list in autumn 2027, the initial 8-month challenge window (proposed), the two stages (Valuation Office, then Valuation Tribunal within 3 months), the evidence to gather and condition. It is checked against the government response and the Finance Bill.

It lacked the commercial part, so I added a section, "How Challenge Mansion Tax can help":
- formal challenges and appeals aren't open yet; under the proposals they open when the charge starts, expected April 2028;
- the free checker and report;
- the Property Value Evidence Pack at £199 (introductory price for the first 10 orders, then £299), with what's in it, Simon's review, delivery within 7 days, and the free comparison when draft bands are published;
- the Appeals Service at £695 fixed, less the pack price, only when formal challenges open, with what it covers and that tribunal appeals are quoted separately;
- "an evidence review, not an RICS valuation. Nobody can guarantee a lower band…";
- buttons: "Order your Evidence Pack" and "Check your likely band for free".

Checked on the preview: the page loads, displays correctly on a simulated iPhone with no sideways scrolling, and the site's tests pass.

## 4. Google indexing status

This is unchanged from this morning's report.
- **What I verified:**
  - all 7 pages in the brief return 200, with their own correct canonical address;
  - robots.txt allows Google;
  - the sitemap lists all of them;
  - deploy previews send `noindex`.
- **What I couldn't verify:** whether Google has indexed them. Public search still shows nothing from the site.
- **What you check:** Search Console → **Pages** (indexed and not indexed, with reasons) and **Sitemaps**. Then use **URL inspection** on each of the 7 pages, and click **Request indexing** where it says "URL is not on Google". After #26 is published, request it again for the appeals, About, Chelsea and Kensington pages.

## 5. Internal links

No changes are needed. The appeals page is in the main menu ("Appeals") and is linked from 24 pages. More links would be the "excessive or repetitive" linking the brief warns against.

## 6. Three publicity opportunities

These are from this morning's plan; the drafts are in Notion, from 17 Nov, and haven't been sent.
1. **HomeOwners Alliance.** Its mansion tax valuation guide appears in most AI answers. Offer comment and data on flats. The draft is ready.
2. **PrimeResi** (prime London trade). Offer the floor-level data story: lower-ground period flats sell about 27% below first-floor flats per sq ft.
3. **The Negotiator or Property Industry Eye.** A comment piece, "what a mansion tax valuation model can't see". Correct the draft first so it says lease treatment is undecided.

## 7. Google Ads diagnosis (Windsor.ai data, 9 to 19 November; read only, nothing changed)

**Campaign "Test Nov 26 - Search":**
- **Status:** enabled; the ads are approved.
- **Results:** 728 impressions, 44 clicks, £72.73 spent, **0 conversions**.
- **Recent days:** 14 Nov: 57 impressions; 15 Nov: 13; 16 Nov: 5; 17 Nov: 46; 18 Nov: 76.

**Why delivery is low:**
1. **Ad rank.** The ads appeared for only 12% of the searches they were eligible for. 72% was lost to low ad rank (bid too low and/or quality score) and 16% to budget.
2. **Appeal searches barely exist yet.**
   - "challenge mansion tax" had 1 impression in 10 days, and "high value council tax surcharge" had 1.
   - There is no "mansion tax appeal" keyword in the campaign.
   - Most impressions came from "mansion tax valuation" (334), "mansion tax" exact (146) and "mansion tax cost" (89): general-interest searches.
   - People will search "appeal" when draft bands arrive in autumn 2027.
3. **Narrowing.** The campaign was narrowed to 61 postcodes around 12 Nov (per the session notes), which cut delivery further.
4. **No conversions recorded from 44 clicks.** Either nobody signed up, or Google Ads isn't counting the sign-up conversion.

**Recommendations, all needing your approval:**
- **Pause** the current campaign until #26 is live and conversion tracking is proven with one labelled test sign-up. That's about £5 a day at present for no recorded result.
- **Don't launch** a "mansion tax appeals" campaign at £5 a day now. The searches aren't there yet, and a low bid won't win the auction. Revisit before autumn 2027, or test 2 weeks of exact and phrase "mansion tax appeal" keywords only if Keyword Planner shows real UK volume.
- **Check Keyword Planner** (you, in Google Ads): UK monthly searches for "mansion tax appeal(s)", "challenge mansion tax" and "mansion tax valuation".

## 8. Prioritised checklist

1. Check the #26 preview (now including the appeals page), then say "publish it". READY FOR APPROVAL
2. Decide whether to pause the current Google Ads campaign. READY FOR APPROVAL
3. Search Console: check Pages and Sitemaps, and request indexing for the 7 pages. BLOCKED – SIMON ACTION REQUIRED
4. Link Windsor.ai to Search Console and Bing, so the Monday check records impressions, clicks, position and queries, including a "mansion tax appeals" baseline. BLOCKED – SIMON ACTION REQUIRED
5. Approve the outreach plan (the three opportunities above). READY FOR APPROVAL
6. Keyword Planner volumes. BLOCKED – SIMON ACTION REQUIRED
7. New appeals campaign. DEFERRED until there's search demand and tracking is proven
