/* =========================================================
   Migjeni & Dritëro Agolli — ndërveprimi
   ========================================================= */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  const nav = document.getElementById("nav");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.querySelector(".nav__links");

  /* --- Sticky nav background --- */
  const onScroll = () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 40);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* --- Mobile menu --- */
  navToggle.addEventListener("click", () => {
    const open = navToggle.classList.toggle("is-open");
    navLinks.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
  });
  navLinks.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      navToggle.classList.remove("is-open");
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    })
  );

  /* --- Reveal on scroll --- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* --- Animated counters --- */
  const counters = document.querySelectorAll(".stats__num");
  const runCounter = (el) => {
    const raw = String(el.dataset.count || el.textContent || "").trim();
    const target = parseInt(raw, 10);
    if (!isFinite(target)) {
      el.textContent = raw;
      return;
    }
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ("IntersectionObserver" in window) {
    const co = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runCounter(entry.target);
            co.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((c) => co.observe(c));
  } else {
    counters.forEach((c) => (c.textContent = c.dataset.count));
  }

  /* --- Book detail modal --- */
  const DETAILS = {
    "Vargjet e lira": {
      author: "Migjeni",
      meta: "Përmbledhje poetike",
      year: "1936",
      body:
        "Përmbledhja e vetme që Migjeni botoi gjatë jetës. Me vargun e lirë, ai i dha poezisë shqipe një fytyrë krejt të re: pa rimë të detyruar, pa retorikë, por me ritmin e frymëmarrjes njerëzore. Këtu flasin lypësat, fëmijët e uritur dhe nënat e lodhura — zëra që letërsia i kishte heshtur. Libri u ndalua menjëherë nga censura, ndërsa sot njihet si një themel i modernizmit shqiptar.",
    },
    "Novelet e vogla": {
      author: "Migjeni",
      meta: "Prozë e shkurtër",
      year: "Shkrime prozë",
      body:
        "Tregime të shkurtra e të prerë si thika, ku Migjeni kap copëza jete nga qyteti dhe fshati: një fëmijë që lyp, një grua e braktisur, një ëndërr e vjedhur nga varfëria. Stili është i thatë e i drejtpërdrejtë, me dhembje të mbajtur nën lëkurë dhe me një dhembshuri të madhe për njeriun e thjeshtë.",
    },
    "Luli i vocërr": {
      author: "Migjeni",
      meta: "Tregim",
      year: "Tregim i famshëm",
      body:
        "Ndër tregimet më të njohura e më prekëse të Migjenit. Luli, një djalë i vogël e i varfër, shet gazeta në rrugët e Shkodrës për të ndihmuar nënën e sëmurë. Mes urisë, ëndrrës dhe hidhërimit, rrëfimi kap me dhembshuri fatin e fëmijëve që rriten në varfëri — dhe e kthen në një zë proteste kundër padrejtësisë.",
    },
    "Komisari Memo": {
      author: "Dritëro Agolli",
      meta: "Roman",
      year: "1970",
      body:
        "Romani i parë i Agollit dhe një nga portretet më të thella të letërsisë shqipe (i përkthyer në anglisht si “The bronze bust”). Komisari Memo është një idealist i përkushtuar, por edhe një njeri me dobësi, dyshime e dhembje. Mes përkushtimit dhe ironisë, libri ndërton një karakter kompleks dhe ngre pyetje të mëdha mbi besimin, pushtetin dhe kohën.",
    },
    "Shkëlqimi dhe rënia e shokut Zylo": {
      author: "Dritëro Agolli",
      meta: "Roman satirik",
      year: "1973",
      body:
        "Romani satirik më i famshëm i Agollit. Përmes karrierës së shokut Zylo, një nëpunës ambicioz e pa skrupuj, autori zbërthen me humor të hidhur hipokrizinë, servilizmin dhe arrogancën e pushtetit. Është ndër veprat më të mprehta e më të lexuara të letërsisë shqipe të shekullit XX.",
    },
    "Njeriu me top": {
      author: "Dritëro Agolli",
      meta: "Roman",
      year: "1975",
      body:
        "Romani i dytë i Agollit (i përkthyer në anglisht si “The man with the cannon”). E trajton temën partizane nga një këndvështrim më i hollë, me ironi dhe humanizëm, duke i dhënë zë edhe njeriut të thjeshtë përballë historisë. Konsiderohet një hap i rëndësishëm drejt një proze më të nuancuar në letërsinë shqipe.",
    },
  };

  const modal = document.getElementById("modal");
  const modalBody = document.getElementById("modalBody");
  let lastFocused = null;

  const openModal = (code, displayTitle) => {
    const d = DETAILS[code];
    if (!d) return;
    const title = displayTitle || code;
    modalBody.innerHTML =
      '<span class="modal__year">' + d.year + "</span>" +
      "<h3>" + title + "</h3>" +
      '<span class="modal__meta">' + d.author + " &#183; " + d.meta + "</span>" +
      "<p>" + d.body + "</p>";
    lastFocused = document.activeElement;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
    modal.querySelector(".modal__close").focus();
  };

  const closeModal = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
    if (lastFocused) lastFocused.focus();
  };

  document.querySelectorAll(".cover").forEach((card) => {
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    const label = () => {
      const h = card.querySelector("h4");
      return h ? h.textContent : card.dataset.code;
    };
    card.addEventListener("click", () => openModal(card.dataset.code, label()));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(card.dataset.code, label());
      }
    });
  });

  modal.querySelectorAll("[data-close]").forEach((el) =>
    el.addEventListener("click", closeModal)
  );
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
  });

  /* --- Footer year --- */
  document.getElementById("year").textContent = new Date().getFullYear();
})();
