/* Wires the Buy and Download buttons from site-config.js.

   Buy  -> Kelviq's static checkout URL. No API key and no backend: the product
           UUID is all the hosted checkout page needs, and the server key must
           never appear in anything the browser can read.
   Down -> the hosted zip.

   Until site-config.js is filled in, buttons are marked unconfigured and do
   nothing, and a setup banner appears when the site is opened locally. That is
   deliberate: a dead link that looks alive is worse than a button that says it
   is not ready. */
(function () {
  "use strict";

  var cfg = window.SPACENAMER || {};
  var BASE = cfg.kelviqEnv === "production"
    ? "https://www.kelviq.com/buy/"
    : "https://www.kelviq.com/sandbox/buy/";

  var isLocal = location.hostname === "localhost" ||
                location.hostname === "127.0.0.1" ||
                location.protocol === "file:";

  /* Kelviq's static checkout URL. URLSearchParams handles the encoding the
     docs insist on — success_url in particular has to arrive encoded. */
  function checkoutURL() {
    if (!cfg.kelviqProductId) return null;

    var url = new URL(BASE + cfg.kelviqProductId + "/");
    var q = url.searchParams;

    if (cfg.planIdentifier) {
      q.set("enabled", cfg.planIdentifier);      /* only this plan is offered */
      q.set("plan_identifier", cfg.planIdentifier);
    }
    if (cfg.chargePeriod) q.set("charge_period", cfg.chargePeriod);

    /* Default the success page to this site, so the same config works on
       localhost, a staging host and the real domain without editing. */
    var success = cfg.successUrl ||
      (location.origin !== "null" ? location.origin + "/thanks.html" : "");
    if (success) q.set("success_url", success);

    return url.toString();
  }

  function markUnconfigured(el, what) {
    el.setAttribute("data-unconfigured", what);
    el.setAttribute("aria-disabled", "true");
    el.addEventListener("click", function (e) {
      e.preventDefault();
    });
  }

  var missing = [];

  /* Buy buttons */
  var href = checkoutURL();
  var buyButtons = document.querySelectorAll("[data-buy]");
  Array.prototype.forEach.call(buyButtons, function (el) {
    if (href) {
      el.href = href;
    } else {
      markUnconfigured(el, "kelviqProductId");
    }
  });
  if (!href && buyButtons.length) missing.push("kelviqProductId");

  /* Download buttons. With no URL yet the button says so and the page shows
     why — a visitor should never click a button that silently does nothing. */
  var dlButtons = document.querySelectorAll("[data-download]");
  Array.prototype.forEach.call(dlButtons, function (el) {
    if (cfg.downloadUrl) {
      el.href = cfg.downloadUrl;
    } else {
      markUnconfigured(el, "downloadUrl");
      if (el.hasAttribute("data-download-label")) {
        el.textContent = el.getAttribute("data-download-label");
      }
    }
  });
  Array.prototype.forEach.call(document.querySelectorAll("[data-download-pending]"), function (el) {
    el.hidden = !!cfg.downloadUrl;
  });
  if (!cfg.downloadUrl && dlButtons.length) missing.push("downloadUrl");

  /* Fill in any text the config owns: version, size, checksum, support email. */
  Array.prototype.forEach.call(document.querySelectorAll("[data-cfg]"), function (el) {
    var value = cfg[el.getAttribute("data-cfg")];
    if (value) {
      el.textContent = value;
      el.removeAttribute("data-empty");
    } else {
      el.setAttribute("data-empty", "true");
    }
  });

  /* mailto: and portal links */
  Array.prototype.forEach.call(document.querySelectorAll("[data-mailto]"), function (el) {
    if (cfg.supportEmail) {
      el.href = "mailto:" + cfg.supportEmail;
      if (!el.textContent.trim()) el.textContent = cfg.supportEmail;
    } else {
      markUnconfigured(el, "supportEmail");
    }
  });
  Array.prototype.forEach.call(document.querySelectorAll("[data-portal]"), function (el) {
    if (cfg.portalUrl) {
      el.href = cfg.portalUrl;
    } else {
      markUnconfigured(el, "portalUrl");
    }
  });

  /* Local-only setup banner, so an unfinished config is impossible to miss
     while you work and invisible to visitors if it ever ships half-done. */
  if (isLocal && missing.length) {
    var bar = document.createElement("div");
    bar.className = "setup-bar";
    bar.innerHTML = "<b>Setup needed.</b> Fill in <code>" +
      missing.join("</code> and <code>") +
      "</code> in <code>site-config.js</code> to make these buttons live." +
      (cfg.kelviqEnv !== "production"
        ? " Checkout is pointing at Kelviq <b>sandbox</b>."
        : "");
    document.body.appendChild(bar);
  } else if (isLocal && cfg.kelviqEnv !== "production") {
    var note = document.createElement("div");
    note.className = "setup-bar";
    note.innerHTML = "Checkout is pointing at Kelviq <b>sandbox</b> &mdash; " +
      "set <code>kelviqEnv: \"production\"</code> when you go live.";
    document.body.appendChild(note);
  }
})();
