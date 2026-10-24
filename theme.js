/* Light/dark toggle.

   The page may be in one of three states: an explicit choice stamped on
   <html data-theme>, or nothing at all, which means "follow the system".
   The button always offers the opposite of what you are actually seeing, so
   it has to resolve the system case rather than read the attribute alone. */
(function () {
  "use strict";

  var root = document.documentElement;
  var store = null;
  try { store = localStorage } catch (e) { }

  var media = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

  function current() {
    var set = root.getAttribute("data-theme");
    if (set === "light" || set === "dark") return set;
    return media && media.matches ? "dark" : "light";
  }

  var buttons = document.querySelectorAll("[data-theme-toggle]");

  function relabel() {
    var next = current() === "dark" ? "light" : "dark";
    Array.prototype.forEach.call(buttons, function (b) {
      b.setAttribute("aria-label", "Switch to " + next + " mode");
      b.setAttribute("title", "Switch to " + next + " mode");
    });
  }

  Array.prototype.forEach.call(buttons, function (b) {
    b.addEventListener("click", function () {
      var next = current() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { if (store) store.setItem("sn-mode", next); } catch (e) { }
      relabel();
    });
  });

  /* While no explicit choice is stored the page follows the system, so the
     label has to keep up if the system flips while the page is open. */
  if (media) {
    var onSystemChange = function () {
      if (!root.getAttribute("data-theme")) relabel();
    };
    if (media.addEventListener) media.addEventListener("change", onSystemChange);
    else if (media.addListener) media.addListener(onSystemChange);
  }

  relabel();
})();
