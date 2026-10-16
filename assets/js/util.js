/* Lecturi care schimbă — utilitare comune (fără dependențe).
   Expune obiectul global window.LCS. */
(function () {
  "use strict";

  var LCS = (window.LCS = window.LCS || {});

  /* Salvare locală: totul rămâne în browserul vizitatorului.
     Orice eroare (mod privat, stocare blocată) e ignorată — site-ul merge și fără. */
  var PREFIX = "lcs:";
  LCS.store = {
    get: function (key, fallback) {
      try {
        var raw = window.localStorage.getItem(PREFIX + key);
        return raw === null ? fallback : JSON.parse(raw);
      } catch (e) {
        return fallback;
      }
    },
    set: function (key, value) {
      try {
        window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
      } catch (e) { /* ignorat */ }
    },
    remove: function (key) {
      try {
        window.localStorage.removeItem(PREFIX + key);
      } catch (e) { /* ignorat */ }
    }
  };

  /* Creează un element DOM.
     el("p", { class: "x", text: "salut", onclick: fn }, [copii...]) */
  LCS.el = function (tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        var v = attrs[k];
        if (v === undefined || v === null || v === false) return;
        if (k === "class") node.className = v;
        else if (k === "text") node.textContent = v;
        else if (k === "html") node.innerHTML = v; // doar pentru conținut scris de autori, niciodată pentru text introdus de utilizator
        else if (k.slice(0, 2) === "on" && typeof v === "function") node.addEventListener(k.slice(2), v);
        else if (v === true) node.setAttribute(k, "");
        else node.setAttribute(k, v);
      });
    }
    (children || []).forEach(function (c) {
      if (c === null || c === undefined || c === false) return;
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return node;
  };

  /* Amestecare deterministă (aceeași ordine la fiecare vizită), garantat diferită de ordinea inițială. */
  LCS.shuffle = function (arr, seed) {
    var a = arr.slice();
    var s = 0;
    String(seed || "lcs").split("").forEach(function (ch) { s = (s * 31 + ch.charCodeAt(0)) >>> 0; });
    function rnd() { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(rnd() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    if (a.length > 1 && a.every(function (x, i) { return x === arr[i]; })) a.push(a.shift());
    return a;
  };

  /* Normalizează un cuvânt pentru comparație: fără diacritice, fără spații, majuscule. */
  LCS.norm = function (s) {
    return String(s || "")
      .normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/[^a-zA-Z0-9]/g, "")
      .toUpperCase();
  };

  /* Anunț pentru cititoarele de ecran. */
  LCS.announce = function (msg) {
    var live = document.getElementById("lcs-live");
    if (!live) {
      live = LCS.el("div", { id: "lcs-live", class: "sr-only", "aria-live": "polite" });
      document.body.appendChild(live);
    }
    live.textContent = "";
    window.setTimeout(function () { live.textContent = msg; }, 30);
  };

  /* Comutator temă luminoasă/întunecată (preferința rămâne local). */
  LCS.initTheme = function () {
    var saved = LCS.store.get("tema", null);
    if (saved) document.documentElement.setAttribute("data-theme", saved);
    var btn = document.querySelector("[data-theme-toggle]");
    if (!btn) return;
    function current() {
      var t = document.documentElement.getAttribute("data-theme");
      if (t) return t;
      return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    function label() { btn.textContent = current() === "dark" ? "Mod luminos" : "Mod întunecat"; }
    label();
    btn.addEventListener("click", function () {
      var next = current() === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      LCS.store.set("tema", next);
      label();
    });
  };

  /* Sigla: un diamant stilizat (SVG inline, refolosit în pagini). */
  LCS.gemSVG = function (fill) {
    return '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M14 8h36l12 16-30 34L2 24z" fill="' + (fill || "#2fb3c2") +
      '" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/><path d="M2 24h60M14 8l10 16 8 34 8-34 10-16M24 24 32 8l8 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/></svg>';
  };

  document.addEventListener("DOMContentLoaded", LCS.initTheme);
})();
