/* =========================================================
   config.js — skema, vlerat default dhe ruajtja e cilësimeve
   Përdoret nga faqja (site.js) dhe paneli (admin.js).
   ========================================================= */
window.MA = (function () {
  "use strict";

  var STORAGE_KEY = "ma_site_config_v1";

  /* Fontet e disponueshme (duhet të ngarkohen edhe në index.html) */
  var FONTS = [
    "Cormorant Garamond",
    "Playfair Display",
    "EB Garamond",
    "Libre Baskerville",
    "Lora",
    "Merriweather",
    "Source Serif 4",
    "Inter",
    "Poppins",
    "Montserrat",
    "Jost",
    "Georgia",
  ];

  /* ---------------------------------------------------------
     SKEMA — çdo fushë ka: k (çelës), label, type, def
     type: text | html | textarea | image | color | select | range
     --------------------------------------------------------- */
  var SCHEMA = [
    {
      group: "Tema & Ngjyrat",
      icon: "&#127912;",
      fields: [
        { k: "theme.gold", label: "Ngjyra e artë (theksi 1)", type: "color", def: "#d9b45c" },
        { k: "theme.blue", label: "Ngjyra blu (theksi 2)", type: "color", def: "#7fb0d8" },
        { k: "theme.bg", label: "Sfondi kryesor", type: "color", def: "#0a0a0c" },
        { k: "theme.bg2", label: "Sfondi i dytë", type: "color", def: "#101013" },
        { k: "theme.ink", label: "Ngjyra e tekstit", type: "color", def: "#ece7dd" },
        { k: "theme.fontHeading", label: "Fonti i titujve", type: "select", def: "Cormorant Garamond", options: FONTS },
        { k: "theme.fontBody", label: "Fonti i tekstit", type: "select", def: "Inter", options: FONTS },
        { k: "theme.baseSize", label: "Madhësia bazë e tekstit (px)", type: "range", def: "16", min: 13, max: 22, step: 1 },
      ],
    },
    {
      group: "Sfondet (foto)",
      icon: "&#128444;",
      fields: [
        { k: "theme.bgImage", label: "Foto sfondi e tërë faqes", type: "image", def: "" },
        { k: "theme.bgOpacity", label: "Dukshmëria e sfondit", type: "range", def: "22", min: 0, max: 100, step: 1 },
        { k: "theme.heroImage", label: "Foto sfondi e hero-it", type: "image", def: "" },
        { k: "theme.heroOpacity", label: "Dukshmëria e hero-it", type: "range", def: "35", min: 0, max: 100, step: 1 },
      ],
    },
    {
      group: "Fotot e autorëve",
      icon: "&#128100;",
      fields: [
        { k: "img.migjeni", label: "Portreti i Migjenit", type: "image", def: "img/migjeni-portret.svg" },
        { k: "img.agolli", label: "Portreti i Dritëro Agollit", type: "image", def: "img/agolli-portret.svg" },
      ],
    },
    {
      group: "Kopertinat e librave",
      icon: "&#128213;",
      fields: [
        { k: "img.cover.vargjet", label: "Vargjet e lira (Migjeni)", type: "image", def: "img/vargjet-e-lira.svg" },
        { k: "img.cover.novelet", label: "Novelet e vogla (Migjeni)", type: "image", def: "img/novelet-e-vogla.svg" },
        { k: "img.cover.luli", label: "Luli i vocërr (Migjeni)", type: "image", def: "img/luli-i-vocerr.svg" },
        { k: "img.cover.memo", label: "Komisari Memo (Agolli)", type: "image", def: "img/komisari-memo.svg" },
        { k: "img.cover.zylo", label: "Shkëlqimi dhe rënia e shokut Zylo (Agolli)", type: "image", def: "img/shkelqimi-shokut-zylo.svg" },
        { k: "img.cover.top", label: "Njeriu me top (Agolli)", type: "image", def: "img/njeriu-me-top.svg" },
      ],
    },
    {
      group: "Seksioni Hero",
      icon: "&#10024;",
      fields: [
        { k: "hero.eyebrow", label: "Nën-titulli i sipërm", type: "text", def: "1936 — 1970 · Dy breza, një zë" },
        { k: "hero.name1", label: "Emri 1", type: "text", def: "Migjeni" },
        { k: "hero.name2", label: "Emri 2", type: "text", def: "Dritëro Agolli" },
        { k: "hero.lead", label: "Paragrafi kryesor", type: "textarea", def: "Nga vargu i lirë që thyen heshtjen e viteve ’30, deri te poezia e Nënë Shqipërisë dhe proza e Komisarit Memo — dy shkrimtarë që formësuan ndërgjegjen e një kombi." },
        { k: "hero.cta1", label: "Butoni 1", type: "text", def: "Zbulo Migjenin" },
        { k: "hero.cta2", label: "Butoni 2", type: "text", def: "Zbulo Agollin" },
      ],
    },
    {
      group: "Statistikat",
      icon: "&#128202;",
      fields: [
        { k: "stat.1.num", label: "Numri 1", type: "text", def: "2" },
        { k: "stat.1.label", label: "Etiketa 1", type: "text", def: "Shkrimtarë" },
        { k: "stat.2.num", label: "Numri 2", type: "text", def: "106" },
        { k: "stat.2.label", label: "Etiketa 2", type: "text", def: "Vjet trashëgimi" },
        { k: "stat.3.num", label: "Numri 3", type: "text", def: "6" },
        { k: "stat.3.label", label: "Etiketa 3", type: "text", def: "Vepra të zgjedhura" },
        { k: "stat.4.num", label: "Numri 4", type: "text", def: "2" },
        { k: "stat.4.label", label: "Etiketa 4", type: "text", def: "Gjini letrare" },
      ],
    },
    {
      group: "Migjeni",
      icon: "&#128220;",
      fields: [
        { k: "m.eyebrow", label: "Nën-titulli", type: "text", def: "Kapitulli I" },
        { k: "m.title", label: "Titulli", type: "text", def: "Migjeni" },
        { k: "m.subtitle", label: "Nën-titulli i vogël", type: "text", def: "Poeti i mjerimit dhe i shpresës" },
        { k: "m.p1", label: "Paragrafi 1", type: "html", rows: 4, def: "<strong>Migjeni</strong> — pseudonimi i <strong>Millosh Gjergj Nikollës</strong> — lindi në Shkodër më 13 tetor 1911 dhe vdiq vetëm 26 vjeç nga tuberkulozi. Në kaq pak vite krijoi një ndryshim të thellë në letërsinë shqipe: solli <em>vargun e lirë</em>, gjuhën e thjeshtë të njerëzve të rrugës dhe një shikim të pashmangshëm ndaj varfërisë, padrejtësisë dhe hidhërimit të njeriut të thjeshtë." },
        { k: "m.p2", label: "Paragrafi 2", type: "html", rows: 4, def: "Shkroi poezi, novela të shkurtra (noveleta) dhe ese, duke u frymëzuar nga jeta e qytetit të tij dhe nga shpirti i revoltës. Vepra e tij e vetme e botuar gjatë jetës, <em>Vargjet e lira</em> (1936), u ndalua menjëherë nga censura e kohës — shenjë e qartë e guximit të tij." },
        { k: "m.quote", label: "Citati", type: "textarea", def: "Jam djali i kohës së turpit dhe i vetëdijes së plagëve të saj." },
        { k: "m.fact.1.k", label: "Fakti 1 · Etiketa", type: "text", def: "Pseudonimi" },
        { k: "m.fact.1.v", label: "Fakti 1 · Vlera", type: "text", def: "Migjeni" },
        { k: "m.fact.2.k", label: "Fakti 2 · Etiketa", type: "text", def: "Zhanri" },
        { k: "m.fact.2.v", label: "Fakti 2 · Vlera", type: "text", def: "Poezi, prozë e shkurtër" },
        { k: "m.fact.3.k", label: "Fakti 3 · Etiketa", type: "text", def: "Vepra kryesore" },
        { k: "m.fact.3.v", label: "Fakti 3 · Vlera", type: "text", def: "Vargjet e lira (1936)" },
        { k: "m.fact.4.k", label: "Fakti 4 · Etiketa", type: "text", def: "Rëndësia" },
        { k: "m.fact.4.v", label: "Fakti 4 · Vlera", type: "text", def: "Themeluesi i vargut të lirë shqip" },
        { k: "m.worksTitle", label: "Titulli i veprave", type: "text", def: "Veprat e Migjenit" },
        { k: "m.worksSub", label: "Nën-titulli i veprave", type: "text", def: "Tri kopertina që përfaqësojnë shpirtin e tij krijues." },
        { k: "m.cover.1.year", label: "Vepra 1 · Viti", type: "text", def: "1936" },
        { k: "m.cover.1.title", label: "Vepra 1 · Titulli", type: "text", def: "Vargjet e lira" },
        { k: "m.cover.1.desc", label: "Vepra 1 · Përshkrimi", type: "textarea", def: "Përmbledhja e vetme e botuar në jetën e autorit. Solli në letërsinë shqipe vargun e lirë dhe zërin e njeriut të thjeshtë që vuan e shpreson." },
        { k: "m.cover.2.year", label: "Vepra 2 · Viti", type: "text", def: "Prozë" },
        { k: "m.cover.2.title", label: "Vepra 2 · Titulli", type: "text", def: "Novelet e vogla" },
        { k: "m.cover.2.desc", label: "Vepra 2 · Përshkrimi", type: "textarea", def: "Tregoj të shkurtër e të prerë për jetën e qyteteve shqiptare: fëmijë, lypësa, nëna të lodhura dhe ëndrra të thyera." },
        { k: "m.cover.3.year", label: "Vepra 3 · Viti", type: "text", def: "Tregim" },
        { k: "m.cover.3.title", label: "Vepra 3 · Titulli", type: "text", def: "Luli i vocërr" },
        { k: "m.cover.3.desc", label: "Vepra 3 · Përshkrimi", type: "textarea", def: "Tregimi më prekës i Migjenit: fati i një djali të vogël e të varfër në rrugët e Shkodrës, mes urisë, ëndrrës dhe hidhërimit." },
      ],
    },
    {
      group: "Dritëro Agolli",
      icon: "&#128221;",
      fields: [
        { k: "a.eyebrow", label: "Nën-titulli", type: "text", def: "Kapitulli II" },
        { k: "a.title", label: "Titulli", type: "text", def: "Dritëro Agolli" },
        { k: "a.subtitle", label: "Nën-titulli i vogël", type: "text", def: "Poeti i tokës, i njerëzve dhe i kohës" },
        { k: "a.p1", label: "Paragrafi 1", type: "html", rows: 4, def: "<strong>Dritëro Agolli</strong> lindi më 13 tetor 1931 në fshatin Menkulas të Devollit. Për më shumë se gjysmë shekulli ishte një nga zërat më të njohur të letërsisë shqipe — poet, prozator, dramaturg dhe publicist." },
        { k: "a.p2", label: "Paragrafi 2", type: "html", rows: 4, def: "Poezia e tij, e ngrohtë e njerëzore, ktheu në këngë tokën, punën, nënën dhe dashurinë. Në prozë krijoi figura të paharrueshme si <em>Komisari Memo</em> dhe <em>Njeriu me top</em>, duke ecur mes realizmit dhe ironisë së hollë për shoqërinë dhe pushtetin." },
        { k: "a.quote", label: "Citati", type: "textarea", def: "Nënë Shqipëri, më jep dritë, më jep forcë, se kam nevojë t’ të këndoj." },
        { k: "a.fact.1.k", label: "Fakti 1 · Etiketa", type: "text", def: "Lindja" },
        { k: "a.fact.1.v", label: "Fakti 1 · Vlera", type: "text", def: "Menkulas, Devoll, 1931" },
        { k: "a.fact.2.k", label: "Fakti 2 · Etiketa", type: "text", def: "Zhanri" },
        { k: "a.fact.2.v", label: "Fakti 2 · Vlera", type: "text", def: "Poezi, roman, dramë" },
        { k: "a.fact.3.k", label: "Fakti 3 · Etiketa", type: "text", def: "Vepra kryesore" },
        { k: "a.fact.3.v", label: "Fakti 3 · Vlera", type: "text", def: "Nënë Shqipëri · Komisari Memo" },
        { k: "a.fact.4.k", label: "Fakti 4 · Etiketa", type: "text", def: "Rëndësia" },
        { k: "a.fact.4.v", label: "Fakti 4 · Vlera", type: "text", def: "Zë i madh i letërsisë së shek. XX" },
        { k: "a.worksTitle", label: "Titulli i veprave", type: "text", def: "Veprat e Dritëro Agollit" },
        { k: "a.worksSub", label: "Nën-titulli i veprave", type: "text", def: "Tri kopertina ikonike nga krijimtaria e tij." },
        { k: "a.cover.1.year", label: "Vepra 1 · Viti", type: "text", def: "1970" },
        { k: "a.cover.1.title", label: "Vepra 1 · Titulli", type: "text", def: "Komisari Memo" },
        { k: "a.cover.1.desc", label: "Vepra 1 · Përshkrimi", type: "textarea", def: "Romani i parë dhe më i njohur i Agollit (përkthyer si “The bronze bust”): portret i thellë e njerëzor i komisarit Memo, mes përkushtimit, ironisë dhe zhgënjimit." },
        { k: "a.cover.2.year", label: "Vepra 2 · Viti", type: "text", def: "1973" },
        { k: "a.cover.2.title", label: "Vepra 2 · Titulli", type: "text", def: "Shkëlqimi dhe rënia e shokut Zylo" },
        { k: "a.cover.2.desc", label: "Vepra 2 · Përshkrimi", type: "textarea", def: "Romani satirik më i famshëm i Agollit: karriera e një nëpunësi ambicioz, që me humor të hidhur zbërthen hipokrizinë dhe arrogancën e pushtetit." },
        { k: "a.cover.3.year", label: "Vepra 3 · Viti", type: "text", def: "1975" },
        { k: "a.cover.3.title", label: "Vepra 3 · Titulli", type: "text", def: "Njeriu me top" },
        { k: "a.cover.3.desc", label: "Vepra 3 · Përshkrimi", type: "textarea", def: "Romani i dytë i Agollit (përkthyer si “The man with the cannon”): tema partizane trajtohet nga një këndvështrim më i hollë, me ironi dhe humanizëm." },
      ],
    },
    {
      group: "Krahasim",
      icon: "&#9878;",
      fields: [
        { k: "cmp.eyebrow", label: "Nën-titulli", type: "text", def: "Dy krahë të së njëjtës zog" },
        { k: "cmp.title", label: "Titulli", type: "text", def: "Migjeni dhe Agolli përballë" },
        { k: "cmp.m.title", label: "Kolona Migjeni · Titulli", type: "text", def: "Migjeni" },
        { k: "cmp.m.r1.k", label: "Migjeni R1 · Etiketa", type: "text", def: "Periudha" },
        { k: "cmp.m.r1.v", label: "Migjeni R1 · Vlera", type: "text", def: "1911 — 1938" },
        { k: "cmp.m.r2.k", label: "Migjeni R2 · Etiketa", type: "text", def: "Zëri" },
        { k: "cmp.m.r2.v", label: "Migjeni R2 · Vlera", type: "text", def: "Revoltë, dhimbje, përditshmëri" },
        { k: "cmp.m.r3.k", label: "Migjeni R3 · Etiketa", type: "text", def: "Forma" },
        { k: "cmp.m.r3.v", label: "Migjeni R3 · Vlera", type: "text", def: "Varg i lirë, novela të shkurtra" },
        { k: "cmp.m.r4.k", label: "Migjeni R4 · Etiketa", type: "text", def: "Tema" },
        { k: "cmp.m.r4.v", label: "Migjeni R4 · Vlera", type: "text", def: "Varfëria, mjerimi, shpresa" },
        { k: "cmp.m.r5.k", label: "Migjeni R5 · Etiketa", type: "text", def: "Fjala kyçe" },
        { k: "cmp.m.r5.v", label: "Migjeni R5 · Vlera", type: "text", def: "Hidhërim" },
        { k: "cmp.a.title", label: "Kolona Agolli · Titulli", type: "text", def: "Dritëro Agolli" },
        { k: "cmp.a.r1.k", label: "Agolli R1 · Etiketa", type: "text", def: "Periudha" },
        { k: "cmp.a.r1.v", label: "Agolli R1 · Vlera", type: "text", def: "1931 — 2017" },
        { k: "cmp.a.r2.k", label: "Agolli R2 · Etiketa", type: "text", def: "Zëri" },
        { k: "cmp.a.r2.v", label: "Agolli R2 · Vlera", type: "text", def: "Ngrohtësi, humor, humanizëm" },
        { k: "cmp.a.r3.k", label: "Agolli R3 · Etiketa", type: "text", def: "Forma" },
        { k: "cmp.a.r3.v", label: "Agolli R3 · Vlera", type: "text", def: "Poezi, roman, dramë" },
        { k: "cmp.a.r4.k", label: "Agolli R4 · Etiketa", type: "text", def: "Tema" },
        { k: "cmp.a.r4.v", label: "Agolli R4 · Vlera", type: "text", def: "Toka, njeriu, koha, dashuria" },
        { k: "cmp.a.r5.k", label: "Agolli R5 · Etiketa", type: "text", def: "Fjala kyçe" },
        { k: "cmp.a.r5.v", label: "Agolli R5 · Vlera", type: "text", def: "Jetë" },
      ],
    },
    {
      group: "Citate",
      icon: "&#8220;",
      fields: [
        { k: "q.eyebrow", label: "Nën-titulli", type: "text", def: "Fjalë që mbeten" },
        { k: "q.title", label: "Titulli", type: "text", def: "Citate të paharrueshme" },
        { k: "q.1.text", label: "Citati 1 · Teksti", type: "textarea", def: "Kur të më shikosh në sy, mos kërko mëshirë — kërko të vërtetën." },
        { k: "q.1.cite", label: "Citati 1 · Autori", type: "text", def: "Migjeni" },
        { k: "q.2.text", label: "Citati 2 · Teksti", type: "textarea", def: "Nënë Shqipëri, ti m’i dhe dritën dhe e bëre jetën këngë." },
        { k: "q.2.cite", label: "Citati 2 · Autori", type: "text", def: "Dritëro Agolli" },
        { k: "q.3.text", label: "Citati 3 · Teksti", type: "textarea", def: "E bukura e jetës qëndron në gjërat e vogla të përditshme." },
        { k: "q.3.cite", label: "Citati 3 · Autori", type: "text", def: "Migjeni" },
        { k: "q.4.text", label: "Citati 4 · Teksti", type: "textarea", def: "Atdheu nuk është vetëm tokë — është njeriu që e do atë." },
        { k: "q.4.cite", label: "Citati 4 · Autori", type: "text", def: "Dritëro Agolli" },
      ],
    },
    {
      group: "Mbyllja & Fundi",
      icon: "&#127775;",
      fields: [
        { k: "close.title", label: "Titulli i mbylljes", type: "text", def: "Dy jetë, një letërsi" },
        { k: "close.text", label: "Teksti i mbylljes", type: "textarea", def: "Migjeni hapi derën drejt lirisë së fjalës; Agolli e mbajti atë hapur për gjysmë shekulli. Së bashku, ata përbëjnë shtyllat e letërsisë moderne shqipe — një testament që lexohet ende sot." },
        { k: "footer.title", label: "Titulli i fundit", type: "text", def: "Migjeni & Dritëro Agolli" },
        { k: "footer.note", label: "Shënimi i fundit", type: "text", def: "Një faqe homazhe për dy gjigantët e letërsisë shqipe." },
      ],
    },
  ];

  /* Fusha të rrjedhshme nga skema */
  var FIELDS = [];
  SCHEMA.forEach(function (g) {
    g.fields.forEach(function (f) {
      FIELDS.push(f);
    });
  });

  var FIELD_MAP = {};
  FIELDS.forEach(function (f) {
    FIELD_MAP[f.k] = f;
  });

  function defaults() {
    var out = {};
    FIELDS.forEach(function (f) {
      out[f.k] = f.def;
    });
    if (window.MA_SEED && typeof window.MA_SEED === "object") {
      Object.keys(window.MA_SEED).forEach(function (k) {
        if (out.hasOwnProperty(k)) out[k] = window.MA_SEED[k];
      });
    }
    return out;
  }

  function getSaved() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function save(patch) {
    var merged = Object.assign(defaults(), getSaved(), patch || {});
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      return true;
    } catch (e) {
      return false;
    }
  }

  function saveRaw(obj) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(obj || {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function reset() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (e) {
      return false;
    }
  }

  /* Vlera efektive për një çelës (default ose e ruajtur) */
  function value(k) {
    var f = FIELD_MAP[k];
    var d = f ? f.def : "";
    var saved = getSaved();
    return saved[k] !== undefined ? saved[k] : d;
  }

  /* Konfigurimi i plotë efektiv */
  function effective() {
    return Object.assign(defaults(), getSaved());
  }

  function changedCount() {
    var saved = getSaved();
    var d = defaults();
    var n = 0;
    Object.keys(saved).forEach(function (k) {
      if (d[k] !== saved[k]) n++;
    });
    return n;
  }

  return {
    STORAGE_KEY: STORAGE_KEY,
    FONTS: FONTS,
    SCHEMA: SCHEMA,
    FIELDS: FIELDS,
    FIELD_MAP: FIELD_MAP,
    defaults: defaults,
    getSaved: getSaved,
    save: save,
    saveRaw: saveRaw,
    reset: reset,
    value: value,
    effective: effective,
    changedCount: changedCount,
  };
})();
