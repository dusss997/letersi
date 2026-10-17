/* =========================================================
   site.js — aplikon cilësimet e ruajtura mbi faqen publike
   ========================================================= */
(function () {
  "use strict";
  document.documentElement.classList.add("js");
  if (!window.MA) return;

  var root = document.documentElement;

  /* ---------- helpers ---------- */
  function hexToRgb(hex) {
    hex = (hex || "").replace("#", "").trim();
    if (hex.length === 3) hex = hex.split("").map(function (c) { return c + c; }).join("");
    if (hex.length !== 6) return null;
    var n = parseInt(hex, 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }
  function rgba(hex, a) {
    var c = hexToRgb(hex);
    return c ? "rgba(" + c.r + "," + c.g + "," + c.b + "," + a + ")" : hex;
  }
  function mix(hexA, hexB, t) {
    var a = hexToRgb(hexA), b = hexToRgb(hexB);
    if (!a || !b) return hexA;
    var f = function (x, y) { return Math.round(x + (y - x) * t); };
    return "rgb(" + f(a.r, b.r) + "," + f(a.g, b.g) + "," + f(a.b, b.b) + ")";
  }
  function shade(hex, t) { return mix(hex, "#000000", t); }
  function tint(hex, t) { return mix(hex, "#ffffff", t); }

  /* ---------- theme ---------- */
  function applyTheme() {
    var v = MA.value;
    var gold = v("theme.gold");
    var blue = v("theme.blue");
    var bg = v("theme.bg");
    var bg2 = v("theme.bg2");
    var ink = v("theme.ink");

    root.style.setProperty("--gold", gold);
    root.style.setProperty("--gold-soft", shade(gold, 0.22));
    root.style.setProperty("--gold-glow", rgba(gold, 0.35));
    root.style.setProperty("--blue", blue);
    root.style.setProperty("--blue-deep", shade(blue, 0.28));
    root.style.setProperty("--bg", bg);
    root.style.setProperty("--bg-2", bg2);
    root.style.setProperty("--ink", ink);
    root.style.setProperty("--ink-soft", mix(ink, bg, 0.36));
    root.style.setProperty("--ink-dim", mix(ink, bg, 0.6));
    root.style.setProperty("--line", rgba(ink, 0.1));

    root.style.setProperty("--serif", '"' + v("theme.fontHeading") + '", Georgia, serif');
    root.style.setProperty("--sans", '"' + v("theme.fontBody") + '", system-ui, sans-serif');

    var size = parseInt(v("theme.baseSize"), 10);
    if (size) root.style.fontSize = size + "px";
  }

  /* ---------- text / images / links ---------- */
  function applyFields() {
    var nodes = document.querySelectorAll("[data-k]");
    Array.prototype.forEach.call(nodes, function (el) {
      var k = el.getAttribute("data-k");
      var f = MA.FIELD_MAP[k];
      if (!f) return;
      var val = MA.value(k);

      if (f.type === "image") {
        if (el.tagName === "IMG") el.setAttribute("src", val || f.def);
        return;
      }

      if (f.type === "html") {
        el.innerHTML = val;
      } else {
        var t = val;
        if (el.hasAttribute("data-quote")) t = "\u201C" + val + "\u201D";
        el.textContent = t;
      }

      if (el.hasAttribute("data-count")) el.setAttribute("data-count", val);
    });
  }

  /* ---------- background photos ---------- */
  function applyBackgrounds() {
    var nodes = document.querySelectorAll("[data-bg]");
    Array.prototype.forEach.call(nodes, function (el) {
      var k = el.getAttribute("data-bg");
      var opKey = el.getAttribute("data-bg-opacity");
      var val = MA.value(k);
      if (val) {
        el.style.backgroundImage = 'url("' + val.replace(/"/g, "") + '")';
        el.classList.add("has-bg");
      } else {
        el.style.backgroundImage = "none";
        el.classList.remove("has-bg");
      }
      var op = opKey ? parseInt(MA.value(opKey), 10) : 100;
      el.style.opacity = String((isNaN(op) ? 100 : op) / 100);
    });
  }

  function run() {
    applyTheme();
    applyFields();
    applyBackgrounds();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }

  /* ri-aplikim nëse paneli ndryshon diçka në një tab tjetër */
  window.addEventListener("storage", function (e) {
    if (e.key === MA.STORAGE_KEY) run();
  });
})();
