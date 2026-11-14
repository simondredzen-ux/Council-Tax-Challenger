CHALLENGE MANSION TAX - WEBSITE TEST PACK (pull request #18, NOT published)
Tested: https://deploy-preview-18--challengemansiontax.netlify.app  |  14 November 2026

HOW IT WAS TESTED
ALL 13 DEVICES WERE SIMULATED. NO PHYSICAL DEVICE WAS USED. Safari was not used.
Tool: Playwright with Chromium, emulating each screen size, touch, and an iPhone/iPad browser identity.
Phones: visible area = 79% of screen height (allows for Safari's bars). Tablets: 90%. Desktop: full window.
Tracking requests (Google, Meta) were intercepted in the browser so no data reached them.
Test form submissions were intercepted and never reached the site, except the one labelled live test below.
Physical-device tests: NONE. Still to do on a real iPhone: Safari autofill, real focus-zoom, real Safari toolbars.

FILES
screenshots/NN-Device-A-first-screen-with-cookie-bar.png  = what a new visitor sees first
screenshots/NN-Device-B-full-page.jpg                     = whole home page after tapping Reject
test-results-13-devices.json = raw results; qa-final.js and fullshots.js = the test scripts

RESULTS (all simulated)
Device              Viewport   Button on 1st screen  After cookie choice  Cookie bar  Field text  Min tap  Sideways scroll  JS errors  Validation  1 submit on double-tap  Reject=no tracking  Accept=tracking  Header link  Labels
iPhone SE (2022)    375x667    NO (below cookie bar) PASS                 16% of screen 16px        44px     none             none       PASS        PASS                    PASS                PASS             PASS         ok
iPhone 13 mini      375x812    PASS                  PASS                 13% of screen 16px        44px     none             none       PASS        PASS                    PASS                PASS             PASS         ok
iPhone 13/14        390x844    PASS                  PASS                 13% of screen 16px        44px     none             none       PASS        PASS                    PASS                PASS             PASS         ok
iPhone 15 Pro       393x852    PASS                  PASS                 13% of screen 16px        44px     none             none       PASS        PASS                    PASS                PASS             PASS         ok
iPhone 17 Pro       402x874    PASS                  PASS                 12% of screen 16px        44px     none             none       PASS        PASS                    PASS                PASS             PASS         ok
iPhone Air          420x912    PASS                  PASS                 10% of screen 16px        44px     none             none       PASS        PASS                    PASS                PASS             PASS         ok
iPhone 15 Pro Max   430x932    PASS                  PASS                 9% of screen 16px        44px     none             none       PASS        PASS                    PASS                PASS             PASS         ok
iPhone 17 Pro Max   440x956    PASS                  PASS                 9% of screen 16px        44px     none             none       PASS        PASS                    PASS                PASS             PASS         ok
iPad mini           744x1133   PASS                  PASS                 13% of screen 16px        44px     none             none       PASS        PASS                    PASS                PASS             PASS         ok
iPad Air 11         820x1180   PASS                  PASS                 12% of screen 16px        44px     none             none       PASS        PASS                    PASS                PASS             PASS         ok
iPad Pro 13         1032x1376  PASS                  PASS                 10% of screen 16px        44px     none             none       PASS        PASS                    PASS                PASS             PASS         ok
Desktop 1280        1280x800   PASS                  PASS                 15% of screen 15.2px      34px     none             none       PASS        PASS                    PASS                PASS             PASS         ok
Desktop 1920        1920x1080  PASS                  PASS                 11% of screen 15.2px      34px     none             none       PASS        PASS                    PASS                PASS             PASS         ok

Notes: desktop keeps 15.2px fields and 34px buttons - correct for a mouse (no zoom, no touch). On the iPhone SE the
email field and button sit behind the cookie bar until the visitor taps Accept or Reject, then the whole form fits.

ONE LABELLED LIVE TEST through the new form on this preview (source test/claude_qa/preview18_hero):
Netlify recorded it, MailerLite added the subscriber, guide email arrived in 6 seconds (Gmail Promotions tab).
