/* =========================================================
   admin.js — logjika e panelit të administratorit
   ========================================================= */
(function () {
  "use strict";
  if (!window.MA) return;

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };

  var state = MA.effective();
  var dirty = false;
  var unsaved = false;

  /* ---------- helpers ---------- */
  function toast(msg, kind) {
    var el = $("#toast");
    el.textContent = msg;
    el.className = "a-toast is-show" + (kind ? " is-" + kind : "");
    clearTimeout(el._t);
    el._t = setTimeout(function () { el.className = "a-toast"; }, 3200);
  }

  function showPublishHelp(highlight) {
    var box = document.getElementById("publishBox");
    if (!box) return;
    box.scrollIntoView({ behavior: "smooth", block: "nearest" });
    if (highlight) {
      box.classList.add("is-flash");
      setTimeout(function () { box.classList.remove("is-flash"); }, 1800);
    }
  }

  function updateStatus() {    var d = MA.defaults();
    var n = 0;
    Object.keys(state).forEach(function (k) {
      if (state[k] !== d[k]) n++;
    });
    $("#status").innerHTML = "Ndryshime: <b>" + n + "</b>";
    dirty = n > 0;
  }

  function collectChanged() {
    var d = MA.defaults();
    var out = {};
    Object.keys(state).forEach(function (k) {
      if (state[k] !== d[k]) out[k] = state[k];
    });
    return out;
  }

  /* ---------- image handling ---------- */
  function imgLabel(f, v) {
    if (v === f.def) return "Foto origjinale (e integruar në faqe)";
    if (/^data:/.test(v)) return "Foto e ngarkuar nga ju";
    return v || "(asnjë)";
  }

  function processImage(file, cb) {
    var reader = new FileReader();
    reader.onload = function (e) {
      var dataUrl = e.target.result;
      if (/^data:image\/(svg\+xml|gif)/i.test(dataUrl)) return cb(dataUrl);
      var img = new Image();
      img.onload = function () {
        var max = 1280, w = img.width, h = img.height;
        if (w > max || h > max) {
          var s = Math.min(max / w, max / h);
          w = Math.round(w * s); h = Math.round(h * s);
        }
        var c = document.createElement("canvas");
        c.width = w; c.height = h;
        c.getContext("2d").drawImage(img, 0, 0, w, h);
        var out;
        try { out = c.toDataURL("image/jpeg", 0.82); } catch (_) { out = dataUrl; }
        cb(out);
      };
      img.onerror = function () { cb(dataUrl); };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  }

  /* ---------- field renderers ---------- */
  function makeField(f) {
    var wrap = document.createElement("div");
    wrap.className = "a-field";
    wrap.dataset.key = f.k;
    if (f.type === "textarea" || f.type === "html" || f.type === "image") {
      wrap.classList.add("a-field--wide");
    }

    var label = document.createElement("label");
    label.textContent = f.label;
    if (f.type === "image") {
      var hint = document.createElement("span");
      hint.className = "hint";
      hint.textContent = " (foto — jpg, png ose svg)";
      label.appendChild(hint);
    }
    if (f.type === "html") {
      var h2 = document.createElement("span");
      h2.className = "hint";
      h2.textContent = " (lejohet HTML: <strong>, <em> ...)";
      label.appendChild(h2);
    }
    wrap.appendChild(label);

    if (f.type === "text") {
      var inp = document.createElement("input");
      inp.type = "text";
      inp.value = state[f.k] != null ? state[f.k] : "";
      inp.addEventListener("input", function () { state[f.k] = inp.value; onEdit(wrap, f); });
      wrap.appendChild(inp);
    } else if (f.type === "textarea" || f.type === "html") {
      var ta = document.createElement("textarea");
      ta.rows = f.rows || 3;
      ta.value = state[f.k] != null ? state[f.k] : "";
      ta.addEventListener("input", function () { state[f.k] = ta.value; onEdit(wrap, f); });
      wrap.appendChild(ta);
    } else if (f.type === "color") {
      var row = document.createElement("div");
      row.className = "a-color";
      var col = document.createElement("input");
      col.type = "color";
      col.value = /^#/.test(state[f.k]) ? state[f.k] : "#000000";
      var hex = document.createElement("input");
      hex.type = "text";
      hex.value = state[f.k] != null ? state[f.k] : "";
      col.addEventListener("input", function () {
        hex.value = col.value; state[f.k] = col.value; onEdit(wrap, f);
      });
      hex.addEventListener("input", function () {
        if (/^#[0-9a-f]{6}$/i.test(hex.value)) col.value = hex.value;
        state[f.k] = hex.value; onEdit(wrap, f);
      });
      row.appendChild(col); row.appendChild(hex);
      wrap.appendChild(row);
    } else if (f.type === "select") {
      var sel = document.createElement("select");
      (f.options || []).forEach(function (opt) {
        var o = document.createElement("option");
        o.value = opt; o.textContent = opt;
        sel.appendChild(o);
      });
      sel.value = state[f.k];
      sel.style.fontFamily = '"' + state[f.k] + '", sans-serif';
      sel.addEventListener("change", function () {
        state[f.k] = sel.value; sel.style.fontFamily = '"' + sel.value + '", sans-serif';
        onEdit(wrap, f);
      });
      wrap.appendChild(sel);
    } else if (f.type === "range") {
      var rrow = document.createElement("div");
      rrow.className = "a-range";
      var rng = document.createElement("input");
      rng.type = "range";
      rng.min = f.min; rng.max = f.max; rng.step = f.step || 1;
      rng.value = state[f.k];
      var out = document.createElement("output");
      out.textContent = state[f.k];
      rng.addEventListener("input", function () {
        out.textContent = rng.value; state[f.k] = rng.value; onEdit(wrap, f);
      });
      rrow.appendChild(rng); rrow.appendChild(out);
      wrap.appendChild(rrow);
    } else if (f.type === "image") {
      wrap.appendChild(makeImageField(f));
    }

    return wrap;
  }

  function makeImageField(f) {
    var box = document.createElement("div");
    box.className = "a-image";

    var thumb = document.createElement("div");
    thumb.className = "a-image__thumb";
    var img = document.createElement("img");
    img.alt = "";
    img.src = state[f.k] || f.def;
    thumb.appendChild(img);

    var body = document.createElement("div");
    body.className = "a-image__body";

    var row = document.createElement("div");
    row.className = "a-image__row";

    var file = document.createElement("label");
    file.className = "btn-a btn-a--sm a-file";
    file.textContent = "Zgjidh foto";
    var fi = document.createElement("input");
    fi.type = "file";
    fi.accept = "image/*";
    file.appendChild(fi);
    fi.addEventListener("change", function () {
      var sel = fi.files && fi.files[0];
      if (!sel) return;
      processImage(sel, function (dataUrl) {
        state[f.k] = dataUrl;
        img.src = dataUrl;
        path.textContent = imgLabel(f, dataUrl);
        box.closest(".a-field").classList.add("is-dirty");
        onEdit(box.closest(".a-field"), f, true);
      });
      fi.value = "";
    });

    var reset = document.createElement("button");
    reset.type = "button";
    reset.className = "btn-a btn-a--sm";
    reset.textContent = "Kthe default";
    reset.addEventListener("click", function () {
      state[f.k] = f.def;
      img.src = f.def;
      path.textContent = imgLabel(f, f.def);
      box.closest(".a-field").classList.remove("is-dirty");
      onEdit(box.closest(".a-field"), f, true);
    });

    var openBtn = document.createElement("button");
    openBtn.type = "button";
    openBtn.className = "btn-a btn-a--sm";
    openBtn.textContent = "Shiko";
    openBtn.addEventListener("click", function () {
      var w = window.open("", "_blank");
      if (w) w.document.write('<img src="' + (state[f.k] || f.def) + '" style="max-width:100%;background:#111">');
    });

    row.appendChild(file); row.appendChild(reset); row.appendChild(openBtn);

    var path = document.createElement("div");
    path.className = "a-image__path";
    path.textContent = imgLabel(f, state[f.k]);

    body.appendChild(row);
    body.appendChild(path);
    box.appendChild(thumb);
    box.appendChild(body);
    return box;
  }

  var previewTimer = null;
  function onEdit(wrap, f, skipDirtyToggle) {
    if (!skipDirtyToggle) wrap.classList.add("is-dirty");
    unsaved = true;
    updateStatus();
    clearTimeout(previewTimer);
    previewTimer = setTimeout(reloadPreview, 550);
  }

  /* ---------- build UI ---------- */
  function buildNav() {
    var nav = $("#nav");
    MA.SCHEMA.forEach(function (g, i) {
      var li = document.createElement("li");
      var b = document.createElement("button");
      b.dataset.target = "grp-" + i;
      b.innerHTML = '<span class="ic">' + (g.icon || "&#8226;") + "</span>" + g.group;
      b.addEventListener("click", function () {
        var el = document.getElementById("grp-" + i);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        setActive(b);
      });
      li.appendChild(b);
      nav.appendChild(li);
    });
  }

  function setActive(btn) {
    $("#nav").querySelectorAll("button").forEach(function (x) { x.classList.remove("is-active"); });
    btn.classList.add("is-active");
  }

  function buildSections() {
    var main = $("#main");
    MA.SCHEMA.forEach(function (g, i) {
      var sec = document.createElement("section");
      sec.className = "a-group";
      sec.id = "grp-" + i;

      var h = document.createElement("h2");
      h.className = "a-group__title";
      h.innerHTML = '<span class="ic">' + (g.icon || "&#8226;") + "</span>" + g.group;
      sec.appendChild(h);

      var fields = document.createElement("div");
      fields.className = "a-fields";
      g.fields.forEach(function (f) {
        fields.appendChild(makeField(f));
      });
      sec.appendChild(fields);
      main.appendChild(sec);
    });
  }

  function markDirtyFromState() {
    document.querySelectorAll(".a-field").forEach(function (wrap) {
      var k = wrap.dataset.key;
      wrap.classList.toggle("is-dirty", state[k] !== MA.defaults()[k]);
    });
  }

  function refreshInputs() {
    /* rindërto faqen e fushave me vlerat e reja */
    $("#main").innerHTML = "";
    buildSections();
    markDirtyFromState();
    updateStatus();
  }

  /* ---------- actions ---------- */
  function reloadPreview() {
    var fr = $("#preview");
    try {
      fr.src = "index.html?r=" + Date.now();
    } catch (e) { /* ignore */ }
  }

  function doSave() {
    var changed = collectChanged();
    var ok = MA.saveRaw(changed);
    if (!ok) {
      toast("Nuk u ruajt — hapësira e shfletuesit u mbush. Provo foto më të vogla.", "err");
      return;
    }
    toast("U ruajt në shfletues.", "ok");
    unsaved = false;
    updateStatus();
    reloadPreview();
  }

  function bakedState() {
    return Object.assign(MA.defaults(), state);
  }

  function doExportSeed() {
    var eff = bakedState();
    var txt =
      "/* seed.js — gjeneruar nga paneli më " + new Date().toLocaleString("sq") + "\n" +
      "   Ky skedar përmban TË GJITHA ndryshimet, përfshirë fotot e ngarkuara.\n" +
      "   Zëvendëso js/seed.js me këtë dhe ngarko përsëri faqen (Netlify/GitHub). */\n" +
      "window.MA_SEED = " + JSON.stringify(eff, null, 2) + ";\n";
    download("seed.js", txt, "text/javascript");
    showPublishHelp(true);
    toast("U shkarkua seed.js — zëvendëso js/seed.js dhe ripubliko.", "ok");
  }

  function doBackup() {
    var eff = bakedState();
    download("ma-config-backup.json", JSON.stringify(eff, null, 2), "application/json");
    toast("U shkarkua kopja .json (fotot përfshihen).", "ok");
  }

  function download(name, text, mime) {
    var blob = new Blob([text], { type: mime || "text/plain" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url; a.download = name;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 500);
  }

  function doImport(file) {
    var reader = new FileReader();
    reader.onload = function (e) {
      try {
        var obj = JSON.parse(e.target.result);
        if (!obj || typeof obj !== "object") throw new Error("bad");
        var applied = 0;
        Object.keys(obj).forEach(function (k) {
          if (MA.FIELD_MAP[k]) { state[k] = obj[k]; applied++; }
        });
        refreshInputs();
        reloadPreview();
        unsaved = true;
        toast("U importuan " + applied + " vlera. Kliko Ruaj për t'i ruajtur.", "ok");
      } catch (err) {
        toast("Skedar i pavlefshëm .json", "err");
      }
    };
    reader.readAsText(file);
  }

  function doReset() {
    if (!confirm("Të fshihen të gjitha ndryshimet dhe të kthehen vlerat origjinale?")) return;
    MA.reset();
    state = MA.effective();
    refreshInputs();
    reloadPreview();
    toast("U kthyen vlerat origjinale.", "ok");
  }

  /* ---------- wire up ---------- */
  buildNav();
  buildSections();
  updateStatus();
  markDirtyFromState();

  $("#btnSave").addEventListener("click", doSave);
  $("#btnExport").addEventListener("click", doExportSeed);
  $("#btnBackup").addEventListener("click", doBackup);
  $("#btnReset").addEventListener("click", doReset);
  $("#btnReloadPreview").addEventListener("click", reloadPreview);
  $("#btnOpen").addEventListener("click", function () { window.open("index.html", "_blank"); });

  $("#btnImport").addEventListener("click", function () { $("#importFile").click(); });
  $("#importFile").addEventListener("change", function () {
    if (this.files && this.files[0]) doImport(this.files[0]);
    this.value = "";
  });

  $("#btnPreview").addEventListener("click", function () {
    var on = $("#layout").classList.toggle("with-preview");
    this.classList.toggle("is-active", on);
    if (on) reloadPreview();
  });

  /* search */
  $("#search").addEventListener("input", function () {
    var q = this.value.trim().toLowerCase();
    document.querySelectorAll(".a-group").forEach(function (sec) {
      var any = false;
      sec.querySelectorAll(".a-field").forEach(function (fw) {
        var f = MA.FIELD_MAP[fw.dataset.key];
        var hit = !q || (f.label.toLowerCase().indexOf(q) > -1) || fw.dataset.key.toLowerCase().indexOf(q) > -1;
        fw.style.display = hit ? "" : "none";
        if (hit) any = true;
      });
      sec.style.display = any ? "" : "none";
    });
  });

  /* keyboard shortcut: Ctrl+S */
  document.addEventListener("keydown", function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
      e.preventDefault();
      doSave();
    }
  });

  window.addEventListener("beforeunload", function (e) {
    if (unsaved) {
      e.preventDefault();
      e.returnValue = "";
    }
  });
})();
