/**
 * Challenge Mansion Tax: approved Google Ads changes + evidence report
 * Campaign: "Test Nov 26 - Search" (ID 24454587778)
 *
 * HOW TO USE (Google Ads, desktop site):
 *   Tools > Bulk actions > Scripts > + (New script). Paste this whole file, authorise it, then:
 *   1. Click PREVIEW. Nothing is changed in Preview. Read the Logs: section 1 is the evidence
 *      report, section 2 lists exactly what WOULD change.
 *   2. Only if you're happy, click RUN. Run it once; running it again skips anything already done.
 *
 * WHAT IT CHANGES (section 2):
 *   a. Final URL suffix  utm_source=google&utm_campaign=search-test&utm_content={keyword}
 *   b. Campaign negative keywords: scotland, wales, "northern ireland"
 *   c. Six sitelinks on the campaign
 *
 * WHAT IT DOES NOT DO (do these by hand, see the action plan):
 *   billing, end date, conversion "Count: One", the "Presence" location option, postcode bid
 *   adjustments, ad headline changes, keyword match-type changes, budget.
 *
 * Written without access to the account, so it has not been run before. Every step is wrapped so
 * a failure is logged and the rest still runs. Check the Logs after Preview.
 */

var CAMPAIGN_ID = 24454587778;
var FINAL_URL_SUFFIX = 'utm_source=google&utm_campaign=search-test&utm_content={keyword}';
var NEGATIVES = ['scotland', 'wales', '"northern ireland"'];
var SITELINKS = [
  ['Free Mansion Tax Checker', 'https://challengemansiontax.co.uk/#checker'],
  ['£2m Threshold Explained', 'https://challengemansiontax.co.uk/how-much-is-mansion-tax'],
  ['How To Appeal Your Band', 'https://challengemansiontax.co.uk/mansion-tax-appeals'],
  ['Property Value Evidence', 'https://challengemansiontax.co.uk/services'],
  ['Free Mansion Tax Guide', 'https://challengemansiontax.co.uk/#guide'],
  ['Who Pays Mansion Tax', 'https://challengemansiontax.co.uk/who-pays-mansion-tax']
];
var REPORT_FROM = '2026-11-10';
var REPORT_TO = '2026-11-30';

function main() {
  Logger.log('===== 1. EVIDENCE REPORT (read only) =====');
  safe('Campaign settings', reportCampaign);
  safe('Conversion actions', reportConversions);
  safe('Search terms by keyword', reportSearchTerms);

  Logger.log('');
  Logger.log('===== 2. CHANGES (applied only when you click Run, not in Preview) =====');
  var campaign = getCampaign();
  if (!campaign) return;
  safe('a. Final URL suffix', function () { setSuffix(campaign); });
  safe('b. Negative keywords', function () { addNegatives(campaign); });
  safe('c. Sitelinks', function () { addSitelinks(campaign); });
  Logger.log('');
  Logger.log('Done. Still to do by hand: billing, end date, conversion Count: One, Presence location option, postcode bids, ad changes.');
}

function getCampaign() {
  var it = AdsApp.campaigns().withIds([CAMPAIGN_ID]).get();
  if (!it.hasNext()) { Logger.log('ERROR: campaign ' + CAMPAIGN_ID + ' not found. Nothing changed.'); return null; }
  var c = it.next();
  Logger.log('Campaign: ' + c.getName() + ' (' + CAMPAIGN_ID + ')');
  return c;
}

function reportCampaign() {
  var rows = AdsApp.search(
    'SELECT campaign.name, campaign.status, campaign.serving_status, ' +
    'campaign.geo_target_type_setting.positive_geo_target_type, campaign.final_url_suffix ' +
    'FROM campaign WHERE campaign.id = ' + CAMPAIGN_ID);
  while (rows.hasNext()) {
    var r = rows.next();
    Logger.log('Status: ' + r.campaign.status + ' | serving: ' + r.campaign.servingStatus);
    Logger.log('Location option: ' + r.campaign.geoTargetTypeSetting.positiveGeoTargetType +
      '  (PRESENCE = only people in England; PRESENCE_OR_INTEREST = also people interested in it)');
    Logger.log('Current Final URL suffix: ' + (r.campaign.finalUrlSuffix || '(none)'));
  }
}

function reportConversions() {
  var rows = AdsApp.search(
    'SELECT conversion_action.name, conversion_action.status, conversion_action.type, ' +
    'conversion_action.counting_type, conversion_action.primary_for_goal FROM conversion_action ' +
    "WHERE conversion_action.status != 'REMOVED'");
  var n = 0;
  while (rows.hasNext()) {
    var a = rows.next().conversionAction; n++;
    Logger.log('Conversion: "' + a.name + '" | status ' + a.status + ' | type ' + a.type +
      ' | counting ' + a.countingType + (a.countingType === 'ONE_PER_CLICK' ? ' (OK)' : '  <-- set Count to "One"') +
      ' | primary ' + a.primaryForGoal);
  }
  if (!n) Logger.log('No conversion actions found.');
}

function reportSearchTerms() {
  var rows = AdsApp.search(
    'SELECT search_term_view.search_term, segments.keyword.info.text, segments.keyword.info.match_type, ' +
    'metrics.clicks, metrics.impressions, metrics.cost_micros, metrics.conversions FROM search_term_view ' +
    'WHERE campaign.id = ' + CAMPAIGN_ID + " AND segments.date BETWEEN '" + REPORT_FROM + "' AND '" + REPORT_TO + "' " +
    'ORDER BY metrics.cost_micros DESC');
  var shown = 0, cost = 0;
  while (rows.hasNext()) {
    var r = rows.next(); var c = r.metrics.costMicros / 1e6; cost += c; shown++;
    Logger.log('£' + c.toFixed(2) + ' | ' + r.metrics.clicks + ' clicks | search "' + r.searchTermView.searchTerm +
      '" <- keyword "' + r.segments.keyword.info.text + '" (' + r.segments.keyword.info.matchType + ')' +
      ' | conv ' + r.metrics.conversions);
  }
  Logger.log(shown + ' visible search terms, £' + cost.toFixed(2) + ' in total. ' +
    'Spend not listed here went on searches Google does not show.');
}

function setSuffix(campaign) {
  var current = campaign.urls().getFinalUrlSuffix();
  if (current === FINAL_URL_SUFFIX) { Logger.log('Suffix already set. Skipped.'); return; }
  Logger.log('Final URL suffix: "' + (current || '') + '" -> "' + FINAL_URL_SUFFIX + '"');
  campaign.urls().setFinalUrlSuffix(FINAL_URL_SUFFIX);
}

function addNegatives(campaign) {
  var existing = {};
  var it = campaign.negativeKeywords().get();
  while (it.hasNext()) existing[it.next().getText().toLowerCase()] = true;
  NEGATIVES.forEach(function (k) {
    if (existing[k.toLowerCase()]) { Logger.log('Negative ' + k + ' already exists. Skipped.'); return; }
    Logger.log('Add campaign negative keyword: ' + k);
    campaign.createNegativeKeyword(k);
  });
}

function addSitelinks(campaign) {
  var existing = {};
  var it = campaign.extensions().sitelinks().get();
  while (it.hasNext()) existing[it.next().getLinkText().toLowerCase()] = true;
  SITELINKS.forEach(function (s) {
    if (s[0].length > 25) { Logger.log('Sitelink text too long, skipped: ' + s[0]); return; }
    if (existing[s[0].toLowerCase()]) { Logger.log('Sitelink "' + s[0] + '" already exists. Skipped.'); return; }
    Logger.log('Add sitelink: "' + s[0] + '" -> ' + s[1]);
    var op = AdsApp.extensions().newSitelinkBuilder().withLinkText(s[0]).withFinalUrl(s[1]).build();
    if (!op.isSuccessful()) { Logger.log('  could not create: ' + op.getErrors().join('; ')); return; }
    campaign.addSitelink(op.getResult());
  });
}

function safe(label, fn) {
  try { Logger.log('--- ' + label); fn(); }
  catch (e) { Logger.log('!! ' + label + ' failed: ' + e + '  (nothing else is affected; do this step by hand)'); }
}
