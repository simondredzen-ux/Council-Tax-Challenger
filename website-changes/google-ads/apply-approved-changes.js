/**
 * Challenge Mansion Tax: Google Ads evidence report + changes for approval (v2, 14 Nov 2026)
 * Account 612-379-5103 · Campaign "Test Nov 26 - Search" (ID 24454587778)
 *
 * SAFE BY DEFAULT: with every switch below left false, this script ONLY READS and logs. It changes
 * nothing even if you press Run. To apply an approved change, set that one switch to true and Run.
 *
 * HOW TO USE (Google Ads, desktop site): Tools > Bulk actions > Scripts > + > paste > Authorise.
 *   1. Click PREVIEW (or Run with all switches false). Read the Logs.
 *   2. Turn on only the switches you have approved, click PREVIEW again to see exactly what would
 *      change, then RUN.
 */

// ---- Switches: leave false until approved -------------------------------------------------------
var APPLY_URL_SUFFIX = false;     // tracking suffix so each lead shows its keyword
var APPLY_NEGATIVES = false;      // Scotland / Wales / Northern Ireland exclusions (see NEGATIVES)
var APPLY_SITELINKS = false;      // six sitelinks
var APPLY_POSTCODE_BIDS = false;  // add high-value postcode districts with a bid increase
var CREATE_NEW_ADS = false;       // two differentiated responsive search ads, created PAUSED

// ---- Settings -----------------------------------------------------------------------------------
var CAMPAIGN_ID = 24454587778;
var FINAL_URL = 'https://challengemansiontax.co.uk/';
var FINAL_URL_SUFFIX = 'utm_source=google&utm_campaign=search-test&utm_content={keyword}';
// Phrase and exact negatives only. A bare broad "wales" would also block searches such as
// "mansion tax england and wales" from English owners, so it is not used.
var NEGATIVES = ['"scotland"', '"scottish"', '"northern ireland"', '"mansion tax wales"', '"welsh"'];
var SITELINKS = [
  ['Free Mansion Tax Checker', 'https://challengemansiontax.co.uk/#checker'],
  ['£2m Threshold Explained', 'https://challengemansiontax.co.uk/how-much-is-mansion-tax'],
  ['How To Appeal Your Band', 'https://challengemansiontax.co.uk/mansion-tax-appeals'],
  ['Property Value Evidence', 'https://challengemansiontax.co.uk/services'],
  ['Free Mansion Tax Guide', 'https://challengemansiontax.co.uk/#quickGuide'],
  ['Who Pays Mansion Tax', 'https://challengemansiontax.co.uk/who-pays-mansion-tax']
];
var POSTCODES = ['SW6', 'SW11', 'N1', 'NW3', 'W4', 'SW19', 'SW7', 'NW6', 'N10', 'AL5', 'W2', 'SW15', 'W8', 'SE1', 'SW4'];
var POSTCODE_BID_MODIFIER = 1.25; // +25% where the searcher is in one of these districts
var ADS = {
  information: {
    headlines: ['Mansion Tax on £2m Homes?', 'Check Your Likely Band Free', 'Mansion Tax Checker',
      'Estimate Your 2026 Value', 'See Your Likely Yearly Charge', 'Free Mansion Tax Guide',
      'From April 2028 in England', 'Bands From £2m to £5m+', 'Results in About a Minute', 'Independent Mansion Tax Help'],
    descriptions: ['Estimate your home\'s 2026 value from local sales and see your likely band. Free.',
      'Get our free 5-page guide: the bands, key dates and the evidence worth keeping now.']
  },
  evidence: {
    headlines: ['Is Your Home Overvalued?', 'Challenge Your Valuation', 'Near a Mansion Tax Threshold?',
      'Prepare Your 2026 Evidence', '£1 Over a Line Costs More', 'Comparable Sales Evidence',
      'Free Guide to Challenging It', 'Know Your Appeal Options', 'Reviewed by Simon Dredzen', 'Independent of HMRC and VOA'],
    descriptions: ['Homes valued just over a threshold pay the whole higher charge. Prepare your evidence now.',
      'Free guide and checker. Optional Evidence Pack reviewed by a prime London property expert.']
  }
};
var REPORT_FROM = '2026-11-10', REPORT_TO = '2026-12-31';

function main() {
  Logger.log('Mode: ' + ([APPLY_URL_SUFFIX, APPLY_NEGATIVES, APPLY_SITELINKS, APPLY_POSTCODE_BIDS, CREATE_NEW_ADS].some(Boolean)
    ? 'CHANGES SWITCHED ON (see section 2)' : 'READ ONLY (no switch is on, nothing will change)'));
  Logger.log('===== 1. EVIDENCE REPORT =====');
  safe('Campaign settings', reportCampaign);
  safe('Conversion actions', reportConversions);
  safe('Keywords', reportKeywords);
  safe('Search terms', reportSearchTerms);
  safe('Ads', reportAds);
  safe('Locations', reportLocations);
  safe('Postcode district IDs', lookupPostcodes);

  Logger.log('');
  Logger.log('===== 2. CHANGES =====');
  var c = getCampaign(); if (!c) return;
  if (APPLY_URL_SUFFIX) safe('Final URL suffix', function () { setSuffix(c); }); else Logger.log('Final URL suffix: switch off, skipped.');
  if (APPLY_NEGATIVES) safe('Negative keywords', function () { addNegatives(c); }); else Logger.log('Negatives: switch off, skipped. Would add: ' + NEGATIVES.join(', '));
  if (APPLY_SITELINKS) safe('Sitelinks', function () { addSitelinks(c); }); else Logger.log('Sitelinks: switch off, skipped.');
  if (APPLY_POSTCODE_BIDS) safe('Postcode bids', function () { addPostcodes(c); }); else Logger.log('Postcode bids: switch off, skipped.');
  if (CREATE_NEW_ADS) safe('New ads (paused)', function () { createAds(c); }); else Logger.log('New ads: switch off, skipped.');
  Logger.log('Not done by this script (do by hand): billing, end date, conversion Count: One, location option Presence, budget.');
}

function getCampaign() {
  var it = AdsApp.campaigns().withIds([CAMPAIGN_ID]).get();
  if (!it.hasNext()) { Logger.log('ERROR: campaign ' + CAMPAIGN_ID + ' not found. Nothing changed.'); return null; }
  return it.next();
}
function rows(q) { var out = [], it = AdsApp.search(q); while (it.hasNext()) out.push(it.next()); return out; }
function money(m) { return '£' + (m / 1e6).toFixed(2); }
var DATES = " AND segments.date BETWEEN '" + REPORT_FROM + "' AND '" + REPORT_TO + "'";

function reportCampaign() {
  rows('SELECT campaign.name, campaign.status, campaign.serving_status, campaign.geo_target_type_setting.positive_geo_target_type, ' +
    'campaign.final_url_suffix, campaign_budget.amount_micros FROM campaign WHERE campaign.id = ' + CAMPAIGN_ID).forEach(function (r) {
    Logger.log(r.campaign.name + ' | status ' + r.campaign.status + ' | serving ' + r.campaign.servingStatus +
      ' | daily budget ' + money(r.campaignBudget.amountMicros));
    Logger.log('Location option: ' + r.campaign.geoTargetTypeSetting.positiveGeoTargetType);
    Logger.log('Final URL suffix: ' + (r.campaign.finalUrlSuffix || '(none)'));
  });
}
function reportConversions() {
  var list = rows('SELECT conversion_action.name, conversion_action.status, conversion_action.type, conversion_action.counting_type, ' +
    "conversion_action.primary_for_goal FROM conversion_action WHERE conversion_action.status != 'REMOVED'");
  if (!list.length) Logger.log('No conversion actions found.');
  list.forEach(function (r) { var a = r.conversionAction;
    Logger.log('"' + a.name + '" | ' + a.status + ' | ' + a.type + ' | counting ' + a.countingType +
      (a.countingType === 'ONE_PER_CLICK' ? ' (OK)' : ' <-- set Count to "One"') + ' | primary ' + a.primaryForGoal); });
}
function reportKeywords() {
  rows('SELECT ad_group_criterion.keyword.text, ad_group_criterion.keyword.match_type, metrics.cost_micros, metrics.clicks, ' +
    'metrics.impressions, metrics.conversions FROM keyword_view WHERE campaign.id = ' + CAMPAIGN_ID + DATES +
    ' ORDER BY metrics.cost_micros DESC').forEach(function (r) {
    Logger.log(money(r.metrics.costMicros) + ' | ' + r.metrics.clicks + ' clicks | ' + r.metrics.impressions + ' impr | conv ' +
      r.metrics.conversions + ' | "' + r.adGroupCriterion.keyword.text + '" ' + r.adGroupCriterion.keyword.matchType); });
}
function reportSearchTerms() {
  var total = 0, list = rows('SELECT search_term_view.search_term, segments.keyword.info.text, segments.keyword.info.match_type, ' +
    'metrics.clicks, metrics.cost_micros, metrics.conversions FROM search_term_view WHERE campaign.id = ' + CAMPAIGN_ID + DATES +
    ' ORDER BY metrics.cost_micros DESC');
  list.forEach(function (r) { total += r.metrics.costMicros;
    Logger.log(money(r.metrics.costMicros) + ' | ' + r.metrics.clicks + ' clicks | "' + r.searchTermView.searchTerm + '" <- "' +
      r.segments.keyword.info.text + '" ' + r.segments.keyword.info.matchType); });
  Logger.log(list.length + ' visible search terms, ' + money(total) + '. Spend not listed went on searches Google does not show.');
}
function reportAds() {
  rows('SELECT ad_group_ad.ad.id, ad_group_ad.status, metrics.cost_micros, metrics.clicks, metrics.impressions, metrics.ctr, ' +
    'metrics.conversions FROM ad_group_ad WHERE campaign.id = ' + CAMPAIGN_ID + DATES).forEach(function (r) {
    Logger.log('Ad ' + r.adGroupAd.ad.id + ' | ' + r.adGroupAd.status + ' | ' + money(r.metrics.costMicros) + ' | ' + r.metrics.clicks +
      ' clicks | CTR ' + (100 * r.metrics.ctr).toFixed(2) + '% | conv ' + r.metrics.conversions); });
}
function reportLocations() {
  rows('SELECT campaign_criterion.location.geo_target_constant, campaign_criterion.bid_modifier, campaign_criterion.negative ' +
    'FROM campaign_criterion WHERE campaign.id = ' + CAMPAIGN_ID + " AND campaign_criterion.type = 'LOCATION'").forEach(function (r) {
    Logger.log('Location ' + r.campaignCriterion.location.geoTargetConstant + (r.campaignCriterion.negative ? ' (excluded)' : '') +
      ' | bid modifier ' + (r.campaignCriterion.bidModifier || 1)); });
}
var POSTCODE_IDS = {};
function lookupPostcodes() {
  var names = POSTCODES.map(function (p) { return "'" + p + "'"; }).join(',');
  rows("SELECT geo_target_constant.id, geo_target_constant.name, geo_target_constant.canonical_name, geo_target_constant.target_type " +
    "FROM geo_target_constant WHERE geo_target_constant.country_code = 'GB' AND geo_target_constant.target_type = 'Postal Code' " +
    'AND geo_target_constant.name IN (' + names + ')').forEach(function (r) {
    var g = r.geoTargetConstant; POSTCODE_IDS[g.name] = g.id;
    Logger.log('Postcode ' + g.name + ' -> ID ' + g.id + ' (' + g.canonicalName + ')'); });
  var missing = POSTCODES.filter(function (p) { return !POSTCODE_IDS[p]; });
  if (missing.length) Logger.log('Not found as Google postcode targets: ' + missing.join(', '));
}

function setSuffix(c) {
  var cur = c.urls().getFinalUrlSuffix();
  if (cur === FINAL_URL_SUFFIX) { Logger.log('Suffix already set.'); return; }
  Logger.log('Final URL suffix: "' + (cur || '') + '" -> "' + FINAL_URL_SUFFIX + '"');
  c.urls().setFinalUrlSuffix(FINAL_URL_SUFFIX);
}
function addNegatives(c) {
  var have = {}, it = c.negativeKeywords().get();
  while (it.hasNext()) have[it.next().getText().toLowerCase()] = true;
  NEGATIVES.forEach(function (k) {
    if (have[k.toLowerCase()]) { Logger.log('Negative ' + k + ' exists.'); return; }
    Logger.log('Add campaign negative: ' + k); c.createNegativeKeyword(k); });
}
function addSitelinks(c) {
  var have = {}, it = c.extensions().sitelinks().get();
  while (it.hasNext()) have[it.next().getLinkText().toLowerCase()] = true;
  SITELINKS.forEach(function (s) {
    if (s[0].length > 25) { Logger.log('Too long, skipped: ' + s[0]); return; }
    if (have[s[0].toLowerCase()]) { Logger.log('Sitelink "' + s[0] + '" exists.'); return; }
    var op = AdsApp.extensions().newSitelinkBuilder().withLinkText(s[0]).withFinalUrl(s[1]).build();
    if (!op.isSuccessful()) { Logger.log('Could not create "' + s[0] + '": ' + op.getErrors().join('; ')); return; }
    c.addSitelink(op.getResult()); Logger.log('Added sitelink "' + s[0] + '" -> ' + s[1]); });
}
function addPostcodes(c) {
  if (!Object.keys(POSTCODE_IDS).length) lookupPostcodes();
  var have = {}, it = c.targeting().targetedLocations().get();
  while (it.hasNext()) { var l = it.next(); have[l.getId()] = l; }
  POSTCODES.forEach(function (p) {
    var id = POSTCODE_IDS[p]; if (!id) { Logger.log('Skipped ' + p + ': no Google target ID.'); return; }
    if (have[id]) { have[id].setBidModifier(POSTCODE_BID_MODIFIER); Logger.log(p + ': bid modifier set to ' + POSTCODE_BID_MODIFIER); return; }
    var op = c.addLocation(Number(id), POSTCODE_BID_MODIFIER);
    Logger.log(p + (op.isSuccessful() ? ': added with bid modifier ' + POSTCODE_BID_MODIFIER : ': could not add: ' + op.getErrors().join('; '))); });
}
function createAds(c) {
  var ag = c.adGroups().withCondition("ad_group.status = 'ENABLED'").get();
  if (!ag.hasNext()) { Logger.log('No enabled ad group.'); return; }
  var group = ag.next();
  ['information', 'evidence'].forEach(function (k) {
    var a = ADS[k];
    var b = group.newAd().responsiveSearchAdBuilder().withFinalUrl(FINAL_URL)
      .withHeadlines(a.headlines.map(function (t) { return { text: t }; }))
      .withDescriptions(a.descriptions.map(function (t) { return { text: t }; }));
    var op = b.build();
    if (!op.isSuccessful()) { Logger.log(k + ' ad not created: ' + op.getErrors().join('; ')); return; }
    op.getResult().pause(); Logger.log(k + ' ad created in "' + group.getName() + '" and PAUSED for review.'); });
}
function safe(label, fn) {
  try { Logger.log('--- ' + label); fn(); }
  catch (e) { Logger.log('!! ' + label + ' failed: ' + e + ' (nothing else affected; do it by hand)'); }
}
