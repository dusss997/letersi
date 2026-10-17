/* =========================================================
   gallery.js — filtrat dhe lightbox-i i galerisë
   ========================================================= */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var grid = document.getElementById("grid");
  var filters = document.getElementById("filters");
  var items = Array.prototype.slice.call(grid.querySelectorAll(".gitem"));

  /* ---------- filters ---------- */
  filters.addEventListener("click", function (e) {
    var btn = e.target.closest(".gfilter");
    if (!btn) return;
    filters.querySelectorAll(".gfilter").forEach(function (b) { b.classList.remove("is-active"); });
    btn.classList.add("is-active");

    var f = btn.dataset.filter;
    items.forEach(function (it) {
      var show =
        f === "all" ||
        it.dataset.cat === f ||
        it.dataset.author === f;
      it.classList.toggle("is-hidden", !show);
    });
  });

  /* ---------- lightbox ---------- */
  var lb = document.getElementById("lightbox");
  var lbImg = document.getElementById("lightboxImg");
  var lbCap = document.getElementById("lightboxCap");
  var current = 0;

  function visibleItems() {
    return items.filter(function (it) { return !it.classList.contains("is-hidden"); });
  }

  function show(item) {
    var img = item.querySelector("img");
    var name = item.querySelector(".gitem__name");
    var tag = item.querySelector(".gitem__tag");
    lbImg.src = img.getAttribute("src");
    lbImg.alt = img.getAttribute("alt") || "";
    lbCap.textContent = (name ? name.textContent : "") + (tag ? " · " + tag.textContent : "");
  }

  function open(item) {
    var vis = visibleItems();
    current = vis.indexOf(item);
    if (current < 0) current = 0;
    show(vis[current]);
    lb.classList.add("is-open");
    lb.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
  }

  function close() {
    lb.classList.remove("is-open");
    lb.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
  }

  function step(dir) {
    var vis = visibleItems();
    if (!vis.length) return;
    current = (current + dir + vis.length) % vis.length;
    show(vis[current]);
  }

  items.forEach(function (it) {
    it.querySelector(".gitem__btn").addEventListener("click", function () { open(it); });
  });

  lb.querySelectorAll("[data-lb-close]").forEach(function (el) {
    el.addEventListener("click", close);
  });
  lb.querySelector("[data-lb-prev]").addEventListener("click", function () { step(-1); });
  lb.querySelector("[data-lb-next]").addEventListener("click", function () { step(1); });

  document.addEventListener("keydown", function (e) {
    if (!lb.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") step(-1);
    else if (e.key === "ArrowRight") step(1);
  });

  /* swipe */
  var startX = null;
  lb.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", function (e) {
    if (startX === null) return;
    var dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
    startX = null;
  }, { passive: true });

  /* ---------- mobile nav + year ---------- */
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.querySelector(".nav__links");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var open = navToggle.classList.toggle("is-open");
      navLinks.classList.toggle("is-open", open);
      navToggle.setAttribute("aria-expanded", String(open));
    });
  }
  var navEl = document.getElementById("nav");
  var onScroll = function () { navEl.classList.toggle("is-scrolled", window.scrollY > 40); };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();

  /* reveal */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      });
    }, { threshold: 0.1 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }
})();
