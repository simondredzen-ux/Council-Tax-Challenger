---
title: "Challenge Mansion Tax: Action Plan"
subtitle: "Combined Google Ads audit and website test, 14 November 2026. Replaces the earlier iPad checklist."
---

# What Claude has done

| # | Done | Result |
|---|---|---|
| 1 | Checked whether the 0 conversions in Google Ads are real | **They are real.** Netlify and MailerLite show no genuine sign-ups from the ads (10–14 Nov). Tracking works in the browser; it only runs for visitors who accept cookies. |
| 2 | Checked the audit's "EmailOctopus" item | **Not used.** The site's code sends leads to **MailerLite**; EmailOctopus appears nowhere. Use MailerLite and Netlify for all lead checks. |
| 3 | Checked Google Tag Manager and the Google Ads conversion | Container GTM-WBSQWTFV → account AW-18562300609. Conversion label `gAenCKqyhLUdEMH1mJNF` fires on the thanks page, with the ad-click ID, only after Accept. |
| 4 | Checked the Meta Pixel | Pixel 2104372500283712 sends PageView, and Lead on the thanks page once per sign-up, only after Accept. |
| 5 | Checked cookie consent | With Reject, nothing goes to Google or Meta, and the sign-up is still saved in Netlify and MailerLite. |
| 6 | One labelled live test sign-up, from form to inbox | It worked. Netlify and MailerLite recorded it, the PDF downloaded, and the email arrived in 6 seconds, **but in Gmail's Promotions tab**. |
| 7 | Tested the site on 8 iPhone sizes (simulated, not real phones) | The live site fails on every size: the form is 3,000px or more down the page, the cookie card is too big, and the fields zoom. The proposed fixes pass on 7 sizes, and on the SE once the cookie choice is made. |
| 8 | Wrote and corrected the website code | It's in `website-changes/code/`, with a ready-to-paste prompt in `apply-prompt.txt`. |
| 9 | Labelled Google Ads visits in the sign-up records | Ad visits now show as `google-ads` (proposed code). |
| 10 | **Set up 3 MailerLite segments** so tests never get counted as leads | "Test sign-ups (exclude from lead counts)": 9 people. "Genuine leads (tests excluded)": **1 person**. "Google Ads leads (tests excluded)": 0. |
| 11 | Found a genuine lead | One person signed up on 7 Nov (not from an ad): a property estimated at about £4.5m, "borderline" band, opted into WhatsApp updates, has opened 3 emails and clicked 2. They're in the "Genuine leads" segment in MailerLite. Worth a personal follow-up. |

**What Claude could not do:**

- Change the website: access to its code repository was blocked.
- See or change Google Ads: no access, and you asked for no changes without approval.
- Check the domain's email authentication: the DNS lookup isn't available from here.

# What you need to do

## Step 1: Put the website fixes live (about 15 minutes)

- ☐ At claude.ai/code, start a **new session** in the **"Mansion-Tax-" environment**.
- ☐ Paste in the whole of **Website-changes-prompt.txt**. It creates a branch and a pull request; it doesn't publish anything.
- ☐ On a **real iPhone**, open the deploy preview link and check:
    - ☐ The guide form shows without scrolling (iPhone 13 or larger).
    - ☐ Tapping a field doesn't zoom the page.
    - ☐ Accept and Reject both close the cookie bar.
    - ☐ Safari offers to autofill name, postcode and email.
    - ☐ A test sign-up reaches the thanks page and the email arrives. Use `?utm_source=test&utm_campaign=preview` on the link and a `+test` email address.
- ☐ If all is well, **merge** the pull request.

## Step 2: Google Ads, no approval needed from anyone else (about 10 minutes)

Use ads.google.com in Safari. If you get the mobile layout, use **aA → Request Desktop Website**.

- ☐ **Billing:** fix the payment method. Don't raise the budget.
- ☐ **End date:** campaign "Test Nov 26 – Search" → Settings → End date → **None**.
- ☐ **Conversion settings:** Goals → Conversions → the action using label `gAenCKqyhLUdEMH1mJNF`. Confirm it's **Active** and **Primary**, then set **Count: One**. (At the moment a reload of the thanks page would count again.)
- ☐ **Tracking suffix:** Settings → Campaign URL options → Final URL suffix:

    `utm_source=google&utm_campaign=search-test&utm_content={keyword}`

## Step 3: Google Ads changes to approve (your decision)

- ☐ **Location: "Presence" only.** Settings → Locations → Location options → *Presence: people in or regularly in your targeted locations*. Keep England.
- ☐ **Investigate "mansion tax valuation"** (49% of spend) before changing it:
    - Keywords → Search terms, filtered to this keyword.
    - About half the spend has no search term showing.
    - If most of it is "how much" or inspection searches, change the keyword to exact match `[mansion tax valuation]` and add phrase keywords for relevant worries, such as "mansion tax appeal" and "mansion tax inspection".
- ☐ **Negative keywords, minimal for now:** `scotland`, `wales`, `northern ireland`. Keep informational searches until the new page has had a fair test.
- ☐ **High-value postcodes:** add SW7, W8, NW3, SW19, SW11, SW6, W4 (and SW1X, SW3, SW10) as extra locations with a **+20–30% bid adjustment**. Don't replace England.
- ☐ **Make the two ads different:**
    - **Ad 2** (CTR 9.9%), theme "check your band": headlines *Mansion Tax on £2m Homes?* · *Check Your Likely Band Free*
    - **Ad 1** (CTR 5.3%), theme "challenge/evidence": headlines *Is Your Home Overvalued?* · *Challenge Your Valuation*
    - Note: the audit's "Concerned Your Home Is Overvalued?" is 34 characters, over Google's 30-character headline limit.
- ☐ **Sitelinks:**

| Sitelink text | URL |
|---|---|
| Free Mansion Tax Checker | https://challengemansiontax.co.uk/#checker |
| £2m Threshold Explained | https://challengemansiontax.co.uk/how-much-is-mansion-tax |
| How To Appeal Your Band | https://challengemansiontax.co.uk/mansion-tax-appeals |
| Property Value Evidence | https://challengemansiontax.co.uk/services |
| Free Mansion Tax Guide | https://challengemansiontax.co.uk/#guide |
| Who Pays Mansion Tax | https://challengemansiontax.co.uk/who-pays-mansion-tax |

## Step 4: Email delivery (about 15 minutes)

- ☐ In MailerLite, open **Settings → Domains** and check that challengemansiontax.co.uk shows **SPF, DKIM and DMARC verified**. If not, follow MailerLite's instructions to add the records at your domain provider.
- ☐ Consider sending the guide email as **plain text**, with a short personal note from you. Plain emails are less likely to land in Promotions.

## Step 5: Website content changes (your approval)

- ☐ Add a credibility line under the guide form, such as "Prepared by [name / qualification], using HM Land Registry sales data."
- ☐ Say what's inside the guide, for example "5-page guide: how the bands work, the 2026 evidence checklist, how appeals will work".
- ☐ Point the header "Free guide" button at the new form at the top of the home page.

## Step 6: Measure, then decide (after about 200 clicks)

- **Main figure:** cost per genuine guide sign-up = Google Ads spend ÷ the **"Google Ads leads (tests excluded)"** segment in MailerLite.
- **Check:** "Genuine leads" in MailerLite should be at least the conversions in Google Ads. The difference is visitors who rejected cookies.
- **Decide:**
    - 4 or more ad leads (2%+): the campaign works. Consider raising the budget and a Facebook Lead Ads test.
    - 0–1 ad leads: rethink keywords and audience before spending more.

## Not urgent

- At 200% text size, some lower sections of the page overflow sideways by about 26px.
- Optional: delete the 9 test subscribers in MailerLite. They're already excluded by the segments, so this isn't needed.
