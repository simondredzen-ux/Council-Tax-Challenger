// Short free-guide form at the top of the home page. It doesn't post anything itself: it copies
// name, postcode and email into the main sign-up form (#signup) and submits that, so the lead is
// stored in Netlify Forms, sent to MailerLite and tracked exactly as before. The "source" field is
// tagged "hero" so sign-ups from this form can be told apart from the main form.
(function () {
  var q = document.getElementById("quickGuide");
  var s = document.getElementById("signup");
  if (!q || !s) return;
  // Label visits from Google Ads, so Netlify and MailerLite can tell them apart from ordinary Google
  // searches (both otherwise show as "www.google.com"). Only the label is kept, not Google's click ID.
  // Links tagged with utm_source (e.g. the campaign's Final URL suffix) keep their own label.
  try {
    var qs = new URLSearchParams(location.search);
    var srcField = s.querySelector("[name=source]");
    if (qs.get("gclid") && !qs.get("utm_source") && srcField && srcField.value.indexOf("google-ads") !== 0) {
      srcField.value = "google-ads";
      try { sessionStorage.setItem("source", "google-ads"); } catch (err) {}
    }
  } catch (err) {}

  var msg = q.querySelector(".qg-msg");
  var btn = q.querySelector("button[type=submit]");
  var label = btn.textContent;

  function show(text) { msg.textContent = text; msg.className = "hint qg-msg error"; }

  // If the main form reports an error (e.g. network), show it up here too.
  var mainMsg = document.getElementById("formMsg");
  if (mainMsg) new MutationObserver(function () {
    if (btn.disabled && mainMsg.classList.contains("error")) {
      show(mainMsg.textContent); btn.disabled = false; btn.textContent = label;
    }
  }).observe(mainMsg, { attributes: true, childList: true, characterData: true, subtree: true });

  q.addEventListener("submit", function (e) {
    e.preventDefault();
    msg.textContent = ""; msg.className = "hint qg-msg";
    var name = q.qg_name.value.trim(), pc = q.qg_postcode.value.trim(), email = q.qg_email.value.trim();
    if (!name) return show("Please enter your first name.");
    if (!pc) return show("Please enter the property postcode.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return show("Please enter a valid email address.");

    s.first_name.value = name;
    s.postcode.value = pc;
    s.email.value = email;
    var src = s.querySelector("[name=source]");
    if (src && src.value.indexOf("hero") === -1) src.value = (src.value + "/hero").slice(0, 100);

    btn.disabled = true; btn.textContent = "Sending…";
    if (s.requestSubmit) s.requestSubmit();
    else s.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
  });
})();
