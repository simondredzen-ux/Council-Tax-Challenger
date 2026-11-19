BRIEF (v4, approved as recommended; amended 19 Nov 2026: Google sign-in): OWNER'S AREA, PLUS VOICE REQUEST TO DRAFT PDF BY EMAIL

Challenge Mansion Tax (challengemansiontax.co.uk, repository simondredzen-ux/Mansion-Tax-, Netlify).
Revised 19 Nov 2026. v4 = v3 (approved, with Simon's amendments) + one voice request on the iPhone
that produces a draft Evidence Pack PDF and emails it to Simon. Nothing in the voice part is built until
Simon approves this brief. Nothing is published to the live site without Simon's separate approval.

PART A. WHAT STAYS FROM v3 (APPROVED, BUILD IN PROGRESS)

- /owner: a secret page behind "Sign in with Google". Only OWNER_EMAIL (simondredzen@gmail.com) is let
  in, and there is no site password (amendment, 19 Nov 2026). It isn't linked anywhere or listed in
  robots.txt or the sitemap.
- Two ways to start: a customer report link, or direct entry.
- Each sale is assessed on its merits. The checker's middle 50% is shown for reference only.
- The full list of sales the search returned, with reasons for any set aside.
- CSV export, and manual entry of completed LonRes sales.
- Provisional adjustments; missing facts in plain English; a number for a scenario only once its
  assumption and basis are stated.
- DRAFT on every page until Simon signs off. Editing after sign-off returns the pack to draft, and the
  signed-off copy is kept.
- Drafts are saved online. Preview drafts are kept separate from live drafts. Drafts saved in a browser
  by the old builder can be imported.
- The old /pack-builder and /sample-approve addresses move behind the same sign-in.
- The raw sales and address files (/data/sales, /data/addr), which are public today, are locked so only
  the site's own functions can read them. The checker and customer reports keep working.
- April 2026 for mansion tax packs.
- Acquisition research (e.g. Abingdon Road, once the flat and postcode are confirmed): direct entry plus
  CSV, with the valuation date for that instruction stated. No pack PDF for other dates in this version.

PART B. NEW IN v4: ONE VOICE REQUEST TO A DRAFT PDF BY EMAIL

What Simon does (iPhone):
1. Say: "Hey Siri, Evidence Pack."
2. Siri asks: "Which property?" Simon says, for example: "Flat 2, 24 Example Road, SW8 1AA. Three-bedroom
   first-floor flat, 1,250 square feet, dated condition."
3. Siri replies within a few seconds: "Started: Flat 2, 24 Example Road, SW8 1AA. The draft will be in
   your email in about a minute."
   - If the address is ambiguous, or an essential detail is missing or conflicts with a record, Siri asks
     one short question instead, for example: "I found Flat 2 and Flat 2A at 24 Example Road. Which one?"
     or "The energy certificate says 1,180 sq ft. Use 1,250 from you, or 1,180?" Simon answers by voice.
4. The email arrives at the fixed owner address with:
   - the draft PDF attached (DRAFT on every page);
   - a short summary: the indicative range, the number of credible sales, and any weak-evidence flags
     and facts to confirm;
   - a link to the editable draft in /owner (it opens only after signing in), where Simon reviews every
     sale returned, adds LonRes evidence and signs off.

Why an iPhone Shortcut, not the Claude app (checked):
- The Claude app on the iPhone can't call a private website directly. It reaches outside services only
  through connectors.
- A custom connector for the site would need its own OAuth sign-in service: more work, and a second way
  into the owner's area. Proposed for a later version if wanted.
- A Claude Code session could call the site, but it starts slowly and isn't made for a one-line daily
  request.
- A Siri Shortcut is built into the iPhone, works by voice, and keeps its access key on the phone.
- Simon can still ask Claude about a pack afterwards: the PDF is in Gmail, which Claude can read through
  the existing Gmail connector.

What happens on the site (target: about a minute in a normal case):
1. The Shortcut sends the dictated text to a new private address, /api/owner/voice.
   - It sends a voice key that lives only in the Shortcut on Simon's iPhone and in Netlify. It never goes
     in chat.
   - The voice key can only start a draft. It can't read drafts, sales or customer data.
   - Requests are rate-limited (for example, 10 an hour).
2. The site reads the dictation: postcode, flat or house number, street, type, bedrooms, floor, floor
   area and condition. This uses fixed rules, not AI (decision 3), with a follow-up question where
   something is unclear.
3. It matches the exact address against the energy certificate and Land Registry address lists, and
   compares the dictated floor area and floor with the energy certificate.
4. It records the facts:
   - Floor area: Simon's figure with source "Owner statement (dictated)", plus the energy certificate
     figure where one exists, and any difference flagged.
   - Condition: recorded as Simon's statement (for example, "dated", which the adjustment table calls
     "Dated but sound", −5%), flagged "condition at April 2026 to be confirmed".
5. It runs the same evidence search, shortlist, adjustment matrix and provisional adjustments as /owner,
   and saves the draft in the same online drafts list.
6. It produces the PDF with the same pack layout as /owner (a browser on the server prints the same
   page), with DRAFT on every page.
7. It emails the PDF only to OWNER_EMAIL, an address fixed in Netlify's settings. Nothing in the
   dictation can change the recipient, and no customer is ever emailed.
8. If anything fails (no data for the postcode, not enough sales, an email error), Simon gets an email
   saying what happened, and the draft link where there is one.

Sign-off stays in /owner. The emailed PDF is always a draft.

PART C. WHAT REUSES THE EXISTING BUILDER, AND WHAT IS NEW

Reused as it is:
- The checker's estimate and the sales data (estimate.mjs).
- The adjustment matrix (adjustments.js).
- The pack layout and calculations (pack.js renderDoc and calc).
- The address lists (energy certificate and Land Registry).
- The time adjustment to April 2026.
- The fact-source labels.

Reused from the v3 build (written; testing next):
- Owner sign-in and the private pages.
- The evidence search with reasons and a shortlist.
- Online drafts and preview separation.
- Provisional adjustments, missing facts, the LonRes form and the CSV.
- The locked data files.

New for v4:
1. /api/owner/voice:
   - reads the dictation;
   - matches the address;
   - asks the follow-up question;
   - checks the voice key and the rate limit;
   - starts the job.
2. Server-side draft creation: the same steps as "Create draft pack", run without Simon at the screen.
3. Server-side PDF:
   - a headless browser (Chromium for serverless) opens the draft with a one-time key and prints it to
     PDF in a background function;
   - the existing layout is reused, not redrawn.
4. Email with the attachment, to OWNER_EMAIL only (decision 2).
5. The iPhone Shortcut:
   - Claude supplies it with step-by-step set-up (about 5 minutes on the phone);
   - Simon pastes the voice key into it on his phone, never in chat.
6. Job status and failure emails.

PART D. SECURITY

- Sign-in is with Simon's Google account (Google checks the password; the site never sees it). The keys
  are set by Simon in Netlify (OWNER_VOICE_KEY and the Gmail app password) and are never typed into chat.
  GOOGLE_CLIENT_ID is public and can be set by Claude.
- OWNER_EMAIL is fixed in Netlify. The voice request can't name a recipient.
- The voice key can only start a draft for Simon's own inbox. If it leaked, the worst case is unwanted
  draft emails to Simon (rate-limited); it can't read any data. It can be changed in Netlify and the
  Shortcut at any time.
- The PDF is attached to the email. The draft link in the email still needs the /owner sign-in.
- Previews use separate drafts. A preview sends email only to OWNER_EMAIL, marked "PREVIEW" in the
  subject.

PART E. DEMONSTRATION ON THE DEPLOY PREVIEW (BEFORE ANY LIVE PUBLISH)

Using a synthetic case (name "TEST", a test property with real public sales data):
1. Voice request to the preview's /api/owner/voice with the Shortcut (preview address and key), timed
   from request to email.
2. An ambiguous address (follow-up question answered), and a floor area that conflicts with the energy
   certificate.
3. A case with too few credible sales: the PDF says the evidence is insufficient, with no range.
4. The emailed PDF: DRAFT on every page, the shortlist with reasons, original prices, April 2026 time
   adjustments and provisional adjustments.
5. The link opens the draft in /owner after signing in. Add a LonRes sale, export the CSV, sign off,
   download the final PDF, then edit it and see it return to draft.
6. The v3 checks:
   - signed-out access refused for /owner, /owner.html, /pack-builder(.html), /sample-approve(.html),
     /api/owner/*, /api/report?full=1 and /data/sales/*;
   - the voice key refused for anything but starting a draft;
   - the public checker and customer reports still working;
   - an old browser draft imported.
7. Simon tests the whole workflow on his iPhone before approving publication.

PART F. DECISIONS FOR SIMON

1. The Shortcut approach for v1 (recommended), with a Claude connector considered later.
2. How the email is sent:
   (a) Recommended: Gmail with an app password, sending from and to Simon's own Gmail. No new account or
       DNS changes. Simon creates the app password in his Google account and enters it in Netlify.
   (b) A sending service such as Resend or Postmark, from an address at challengemansiontax.co.uk. It
       needs an account and DNS records on the domain.
3. Reading the dictation:
   (a) Recommended: fixed rules plus a follow-up question. No extra cost, and nothing is sent to an AI
       service.
   (b) Claude through the Anthropic API, for freer phrasing. It needs an API key in Netlify and costs a
       fraction of a penny per request.
4. Netlify plan check:
   - the background function and the headless browser need a function time limit of more than
     10 seconds;
   - Claude will check the plan's limits on the preview and report back before relying on it;
   - if they aren't available, the fallback is a PDF drawn with the existing PDF library, which is more
     work and a separate layout to maintain.
5. The owner email address (set by Simon in Netlify as OWNER_EMAIL).

PART G. WHAT CLAUDE MAY DO ALONE / WHAT NEEDS APPROVAL

- May do alone:
  - work on the branch, the pull request and the free preview;
  - send test emails only to OWNER_EMAIL from the preview.
- Needs approval:
  - this brief;
  - the decisions above;
  - publishing to the live site (15 Netlify credits).

DELIVERABLES

- Pull request and preview link.
- The Shortcut with set-up steps.
- A test report (passed / failed, simulated vs on Simon's iPhone).
- Sample PDFs and screenshots.
- The code changes as text, for ChatGPT review.
- Updated docs/evidence-pack.md.
