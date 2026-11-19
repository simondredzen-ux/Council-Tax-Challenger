# Audit: public references to EPCs as a floor-area source

Date: 19 Nov 2026. Website repository `simondredzen-ux/Mansion-Tax-`, branch `claude/remove-epc-references-h0odxz`
(not merged, not published). The full code change is in `epc-wording-evidence/epc-wording-code-changes.diff.txt` (with screenshots and the test PDFs, made from synthetic data).

## Scope searched

I searched everything Netlify publishes (`site/`: 31 HTML pages, page scripts and public data files) and
everything that writes customer documents (`netlify/functions`, `netlify/lib`: the report PDF and the sample
Evidence Pack). The search terms were "EPC", "energy performance", "energy certificate", "certificate",
"government register" and "MHCLG / Communities".
The pages are the free checker, report, order forms, owner's details form, Evidence Pack builder, guides,
area pages, price index and terms.

I did not search:

- `docs/`, `README.md` and the GitHub workflow, because they are internal and not published.
- MailerLite emails, Google Ads, Meta ads and Notion, because they are not in the repository (see "Still to check").

## Changes made (29 public-facing occurrences)

| # | Page / template (file) | Existing wording | Proposed wording |
|---|---|---|---|
| 1 | Home page: free checker, address hint (`site/index.html`) | Picking your address fills in the floor area from its energy certificate, if we have it. | Picking your address fills in an estimated floor area from available property records, where we hold one. Please check it. |
| 2 | Home page: "Why isn't my address listed?" (`site/index.html`) | We list homes in this postcode that have an energy certificate (EPC) on the government register… Yours may be missing if it has no certificate (many homes not sold or let since 2008 don't), if its certificate gives the address differently… | We list homes in this postcode that appear in the property records we use… Yours may be missing if we hold no record for it, if its record gives the address differently… |
| 3 | Free checker result (`site/assets/checker.js`) | 81 m² floor area, from the energy certificate | 81 m² floor area, from available property records |
| 4 | Online report: source line (`site/report.html`) | Source: HM Land Registry Price Paid Data with floor areas from energy performance certificates. Contains HM Land Registry data © Crown copyright… | Source: HM Land Registry Price Paid Data, with floor areas derived from available property records. Contains HM Land Registry data © Crown copyright… OGL v3.0. Contains public sector information licensed under the Open Government Licence v3.0. |
| 5 | Online report: checks (`site/report.html`) | Floor area. Energy certificates are often wrong by 10% or more… | Floor area. Recorded floor areas are often wrong by 10% or more… |
| 6 | Online report: next steps (`site/report.html`) | …get a measured floor plan, and keep your energy certificate. | …get a measured floor plan, and keep any documents that record it. |
| 7 | Online report: comparables intro (`site/assets/report.js`) | …with floor areas from energy certificates. | …with recorded floor areas. |
| 8–12 | Report PDF (`netlify/lib/personal-pdf.mjs`) | Same five sentences as 4–7, plus "…to a floor area of X, taken from your home's energy certificate or as you entered it." | Same replacements as 4–7, plus "…taken from available property records or as you entered it." |
| 13 | Sample report form placeholder (`site/sample-report.html`) | From your energy certificate | From a floor plan or sale particulars |
| 14 | Order form placeholder (`site/order.html`) | From your energy certificate or floor plan | From a floor plan or sale particulars |
| 15 | Owner's details form, pre-filled panel (`site/order-details.html`) | Floor area from your energy certificate (EPC): | Estimated floor area from available property records: |
| 16 | Owner's details form, "Where is the floor area from?" (`site/order-details.html`) | Option "Energy certificate (EPC)" (also set automatically) | Option "Property records" (also set automatically) |
| 17–18 | Sample Evidence Pack PDF (`netlify/lib/sample-pack.mjs`) | "To be confirmed: ideally measured, or from your energy certificate" and the sources line "…Open Government Licence v3.0; energy performance certificates." | "…ideally measured, or from a floor plan" and "…© Crown copyright 2026; contains public sector information licensed under the Open Government Licence v3.0." |
| 19 | Evidence Pack, method note (`site/assets/pack.js`) | Floor areas for comparables come from energy performance certificates matched by address. EPC floor areas are measured to the energy assessors' conventions, which usually give a slightly smaller figure than an estate agent's gross internal area, so the subject's area should be measured the same way. | Floor areas for comparables are derived from available property records and have not been independently measured. Recorded floor areas can be slightly smaller than an estate agent's gross internal area, so the subject home's area should be measured on a consistent basis. |
| 20 | Evidence Pack, adjustments note (`site/assets/pack.js`) | …floor areas and floor levels from energy performance certificates. | …floor areas and floor levels from available property records. |
| 21 | Evidence Pack, sources (`site/assets/pack.js`) | Floor areas: energy performance certificate data (Ministry of Housing, Communities and Local Government). | Floor areas: available property records. Contains public sector information licensed under the Open Government Licence v3.0. |
| 22–23 | Guide: flats, floor level and lift (`site/mansion-tax-flats-floor-level-lift.html`) | …with floor levels and floor areas from Energy Performance Certificates. / Sources: …; Energy Performance Certificate floor levels and floor areas; … | …from available property records. / Sources: …; floor levels and floor areas from available property records (contains public sector information licensed under the Open Government Licence v3.0); … |
| 24–25 | Chelsea and Kensington pages (`site/mansion-tax-chelsea.html`, `-kensington.html`) | Price per sq ft: from floor areas on energy certificates, for the £2m+ sales where one was found. | Price per sq ft: using recorded floor areas, for the £2m+ sales where one was available. |
| 26 | Prime London prices (`site/prime-london-prices.html`) | …sale prices with floor areas from energy certificates, as sold… | …sale prices with recorded floor areas, as sold… |
| 27 | London Price Index (`site/london-price-index.html`) | Floor areas from energy performance certificate data (Ministry of Housing, Communities and Local Government). | Floor areas from available property records. Contains public sector information licensed under the Open Government Licence v3.0. |
| 28 | Appeal specialists guide (`site/mansion-tax-appeal-specialists.html`) | floor area (often on the EPC) | floor area (check it against a measured floor plan) |
| 29 | Terms, section on the pack (`site/terms.html`) | Sales data comes from HM Land Registry and energy performance certificates, under their licences. | Sales data comes from HM Land Registry and other public records, used under their licences. |

### Also changed (visible only to someone reading the page source or data files)

- Code comments in public scripts (`checker.js`, `adjustments.js`, `order-details.html`) now say "record" instead of "EPC" or
  "energy certificate".
- The note in the public data file `site/data/pcl-trend.json` was changed from "with EPC floor areas" to "with recorded floor areas".
  The script that rebuilds this file each month, `scripts/build-pcl-trend.mjs`, was changed too, so the next refresh
  doesn't bring the old wording back.

## Deliberately kept

| Item | Why |
|---|---|
| "Energy rating" adjustment in the Evidence Pack (A/B, C–E, F/G; Nationwide research) | It is about energy efficiency affecting value, not a floor-area source. This is a genuine EPC use the brief says to keep. |
| HM Land Registry, Ordnance Survey Code-Point Open, UK HPI and OGL attribution lines | Licence attribution is required, so all of these stay unchanged. |

## Needs your decision: licence attribution for the EPC data

The EPC data is used under the Open Government Licence. The OGL asks re-users to give the attribution statement
the data provider specifies, or, if none is specified, "Contains public sector information licensed under the
Open Government Licence v3.0". Where the old text named EPC data as a source, I replaced it with that generic
statement. Required attribution is kept, but the dataset isn't named.

**I could not confirm whether the EPC service specifies its own wording.** Its licence pages
(epc.opendatacommunities.org and get-energy-performance-data.communities.gov.uk) are blocked from this
environment. Secondary sources say:

- the non-address fields are OGL;
- the address and postcode fields are held separately, with Royal Mail rights.

Please check the current terms on the service's website, or let me reach those two sites, before approving.
If the terms require the dataset to be named, the least revealing compliant wording is probably a single
credits line, e.g. "Contains public sector information (Energy Performance of Buildings data) licensed under
the Open Government Licence v3.0", placed only in the sources line and not in the explanatory text.

## Not changed: internal names (no effect on what visitors see)

The following technical identifiers still contain "epc". They are invisible on the pages, but someone reading the
page source could see them:

- the `epcArea` variable;
- the HTML ids `d-epc…`;
- the hidden form field `epc_area_m2` on the owner's details form, which is also a column in the Netlify
  "order-details" submissions;
- the adjustment key `epc` (the energy rating).

The brief said not to change internal workings, so I left them. Renaming them is possible later (low risk, but
the Netlify form column would change name).

Server-side code, the data build scripts and `docs/` keep their EPC references. They are not public.

## Functionality checks (all on the branch, simulated; no real submissions)

| Check | Result |
|---|---|
| `npm test` (end-to-end checker test with synthetic data, including the report PDF and the sample Evidence Pack PDF) | All checker tests passed |
| Report PDF and sample pack PDF generated and text extracted | 0 mentions of EPC/energy certificates; new wording present |
| Syntax check of every page script and PDF module; `pcl-trend.json` parses | OK |
| Headless Chromium, local copy of the site with the real checker API and live address data: all 31 pages scanned for visible EPC wording (page text, placeholders, dropdowns, collapsed sections) | None found |
| Free checker: SW3 5LW, pick an address → floor area pre-fills (872 sq ft) → estimate shows "81 m² floor area, from available property records" | OK |
| Owner's details form: same address → panel "Estimated floor area from available property records: 872 sq ft (81 sq m)", source set to "Property records"; "Change it" clears it and shows manual entry | OK |
| Evidence Pack builder loads; JS errors on any page | Loads; no errors |

The `area_source` value is only stored in the Netlify form submission. No code reads it, so renaming the option
can't break anything. New submissions will say "Property records" instead of "Energy certificate (EPC)".

## Still to check (outside the website repository)

- MailerLite emails and automations (the guide and report emails), Google Ads and Meta ad text, the guide PDF, and
  Notion or partner material. Tell me if you want these checked too.
- Already-issued PDFs and Evidence Packs keep the old wording. Only new ones change.

## To approve

1. Decide on the EPC attribution wording (see above).
2. Ask me to open the pull request for a free Netlify deploy preview (no credits), then check it on your iPhone.
3. Publishing happens only when you say "publish it" (15 Netlify credits).
