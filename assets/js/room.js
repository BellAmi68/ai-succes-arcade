/* Cărți care schimbă vieți — motorul unei camere.
   Citește window.CAMERA (din carti/<id>/data.js) și construiește pagina în #camera.
   Nu trimite nimic nicăieri: progresul și notițele stau doar în localStorage. */
(function () {
  "use strict";

  var C, el, store, KEY, state;

  /* ---------- stare ---------- */
  function load() {
    var s = store.get(KEY, {}) || {};
    return {
      dosar: s.dosar || [],
      lacate: s.lacate || {},
      cufar: !!s.cufar,
      jocuri: s.jocuri || {},
      note: s.note || {},
      aplica: s.aplica || {},
      cartonas: !!s.cartonas
    };
  }
  function save() { store.set(KEY, state); updateProgress(); }

  /* ---------- citate ---------- */
  function quote(id) {
    var q = C.citate[id];
    if (!q) return el("p", { class: "muted", text: "[citat lipsă: " + id + "]" });
    return el("blockquote", { class: "quote" }, [
      el("p", { text: "„" + q.ro + "”" }),
      el("footer", { text: "Traducere proprie · " + q.loc }),
      el("details", {}, [el("summary", { text: "Vezi originalul (engleză)" }), el("p", { lang: "en", text: q.en })])
    ]);
  }
  /* Înlocuiește marcajele @@citat:id@@ din HTML-ul dosarului cu blocuri de citat. */
  function richHTML(html) {
    var box = el("div", { class: "clue-body" });
    String(html).split(/(@@citat:[A-Za-z0-9_-]+@@)/).forEach(function (part) {
      var m = part.match(/^@@citat:([A-Za-z0-9_-]+)@@$/);
      if (m) box.appendChild(quote(m[1]));
      else if (part) box.insertAdjacentHTML("beforeend", part);
    });
    return box;
  }

  /* ---------- secțiuni ---------- */
  var STEPS = [
    { id: "dosar", label: "Dosarul" },
    { id: "breakout", label: "Breakout" },
    { id: "jocuri", label: "Mini-jocuri" },
    { id: "reflectie", label: "Reflecție" },
    { id: "profesori", label: "Profesori" }
  ];

  function section(id, n, title, lead, content) {
    return el("section", { class: "room-section", id: id, "aria-labelledby": "h-" + id }, [
      el("div", { class: "wrap" }, [
        el("header", {}, [
          el("div", { class: "step-label", text: "Pasul " + n }),
          el("h2", { id: "h-" + id, text: title }),
          lead ? el("p", { class: "muted narrow", html: lead }) : null
        ]),
        content
      ])
    ]);
  }

  function hero() {
    var chips = el("div", { class: "chips" }, [
      chip("#dosar", "Sunt elev", "Citește indiciile, apoi deschide lacătele"),
      chip("#profesori", "Sunt profesor", "Fișă tipăribilă + plan de 50 de minute"),
      chip("#aplica", "Citesc pentru mine", "Mergi direct la „aplică azi”")
    ]);
    return el("section", { class: "room-hero" }, [
      el("div", { class: "wrap" }, [
        el("p", { class: "step-label", html: "<a href=\"../../\">← Catalog</a>" }),
        el("h1", { text: C.titlu }),
        el("p", { class: "byline" }, [
          el("span", { class: "orig-title", text: "„" + C.titluOriginal + "”" }),
          " · " + C.autor + " (" + C.ani + ") · " + C.tipText
        ]),
        el("p", { class: "lead narrow", text: C.intro }),
        chips
      ])
    ]);
  }
  function chip(href, title, sub) {
    return el("a", { class: "chip", href: href }, [el("strong", { text: title }), el("span", { text: sub })]);
  }

  function stepper() {
    var ol = el("ol");
    STEPS.forEach(function (s, i) {
      ol.appendChild(el("li", {}, [
        el("a", { href: "#" + s.id, "data-step": s.id }, [el("span", { class: "n", text: String(i + 1) }), s.label])
      ]));
    });
    return el("nav", { class: "stepper", "aria-label": "Pașii camerei" }, [
      el("div", { class: "wrap" }, [ol]),
      el("div", { class: "progress-bar", role: "progressbar", "aria-label": "Progres", "aria-valuemin": "0", "aria-valuemax": "100" }, [el("span")])
    ]);
  }

  /* 1. Dosarul de indicii */
  function dosar() {
    var grid = el("div", { class: "dossier" });
    C.dosar.forEach(function (d, i) {
      var seen = state.dosar.indexOf(d.id) !== -1;
      var mark = el("span", { class: "seen", text: seen ? "✓ citit" : "" });
      var det = el("details", { class: "clue" }, [
        el("summary", {}, [
          el("span", { class: "tag", text: "#" + (i + 1) }),
          el("h3", { text: d.titlu }),
          mark
        ]),
        richHTML(d.html)
      ]);
      det.addEventListener("toggle", function () {
        if (det.open && state.dosar.indexOf(d.id) === -1) {
          state.dosar.push(d.id);
          mark.textContent = "✓ citit";
          save();
        }
      });
      grid.appendChild(det);
    });
    var src = el("p", { class: "small muted", html:
      "Textul integral, în engleză: " + [].concat(C.sursa).map(function (x) { return "<a href=\"" + x.url + "\" rel=\"noopener\">" + x.nume + "</a>"; }).join(" și ") + ". Rezumatele și traducerile citatelor sunt originale." });
    return section("dosar", 1, "Dosarul de indicii",
      "Deschide fișele una câte una. Vei avea nevoie de citatele din ele ca să deschizi lacătele.",
      el("div", {}, [grid, src]));
  }

  /* 2. Breakout */
  var LOCK_CLOSED = '<svg class="lock-icon" viewBox="0 0 48 48" aria-hidden="true"><rect x="8" y="21" width="32" height="23" rx="4" fill="#c4861a" stroke="currentColor" stroke-width="2.5"/><path d="M15 21v-6a9 9 0 0 1 18 0v6" fill="none" stroke="currentColor" stroke-width="3.5"/><circle cx="24" cy="31" r="3" fill="currentColor"/><path d="M24 33v5" stroke="currentColor" stroke-width="3"/></svg>';
  var LOCK_OPEN = '<svg class="lock-icon" viewBox="0 0 48 48" aria-hidden="true"><rect x="8" y="21" width="32" height="23" rx="4" fill="#2fb3c2" stroke="currentColor" stroke-width="2.5"/><path d="M15 21v-6a9 9 0 0 1 17.6-2.6" fill="none" stroke="currentColor" stroke-width="3.5"/><path d="m17 32 5 5 9-10" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function lock(L, idx, onOpen) {
    var isOpen = !!state.lacate[L.id];
    var iconBox = el("span", { html: isOpen ? LOCK_OPEN : LOCK_CLOSED });
    var letter = el("span", { class: "letter", "aria-label": "Litera lacătului", text: isOpen ? L.litera : "?" });
    var fb = el("div", { class: "feedback", role: "status" });
    var name = "lock-" + L.id;

    var ans = el("fieldset", {}, [el("legend", { text: L.intrebare })]);
    L.optiuni.forEach(function (o, i) {
      ans.appendChild(el("label", { class: "opt" }, [
        el("input", { type: "radio", name: name + "-a", value: String(i), checked: isOpen && i === L.corect, disabled: isOpen }),
        el("span", { text: o })
      ]));
    });

    var qs = el("fieldset", {}, [el("legend", { text: "Ce citat îți dovedește răspunsul?" })]);
    L.citateOptiuni.forEach(function (qid) {
      qs.appendChild(el("label", { class: "opt quote-opt" }, [
        el("input", { type: "radio", name: name + "-q", value: qid, checked: isOpen && qid === L.citatCorect, disabled: isOpen }),
        el("span", { text: "„" + C.citate[qid].ro + "”" })
      ]));
    });

    var btn = el("button", { class: "btn", type: "submit", text: "Încearcă lacătul", disabled: isOpen });
    var card = el("form", { class: "card lock" + (isOpen ? " open" : ""), id: "lacat-" + L.id, novalidate: true }, [
      el("div", { class: "lock-head" }, [iconBox, el("h3", { text: L.titlu }), letter]),
      ans, qs, el("div", { class: "btn-row" }, [btn]), fb
    ]);

    function show(kind, html) {
      fb.className = "feedback show " + kind;
      fb.innerHTML = html;
    }
    if (isOpen) show("ok", "<strong>Deschis!</strong> " + L.explicatie);

    card.addEventListener("submit", function (e) {
      e.preventDefault();
      if (state.lacate[L.id]) return;
      var a = card.querySelector("input[name='" + name + "-a']:checked");
      var q = card.querySelector("input[name='" + name + "-q']:checked");
      if (!a || !q) { show("bad", "Alege atât un răspuns, cât și un citat."); return; }
      var okA = Number(a.value) === L.corect;
      var okQ = q.value === L.citatCorect;
      if (okA && okQ) {
        state.lacate[L.id] = true;
        save();
        card.classList.add("open");
        iconBox.innerHTML = LOCK_OPEN;
        letter.textContent = L.litera;
        btn.disabled = true;
        card.querySelectorAll("input").forEach(function (i) { i.disabled = true; });
        show("ok", "<strong>Click! Lacătul s-a deschis.</strong> Ai primit litera „" + L.litera + "”. " + L.explicatie);
        LCS.announce("Lacătul " + (idx + 1) + " deschis. Litera " + L.litera);
        onOpen();
      } else {
        card.classList.remove("shake");
        void card.offsetWidth;
        card.classList.add("shake");
        show("bad", okA ? L.indiciuCitat : L.indiciuRaspuns);
      }
    });
    return card;
  }

  function breakout() {
    var B = C.breakout;
    var slots = el("div", { class: "slots", "aria-label": "Literele adunate" });
    var treasure = el("div", { class: "treasure", role: "status" });
    var input = el("input", { type: "text", maxlength: "12", autocomplete: "off", "aria-label": "Cuvântul-cheie", placeholder: "• • • • •" });
    var fb = el("div", { class: "feedback", role: "status" });

    function renderSlots() {
      slots.innerHTML = "";
      // Literele apar amestecat, ca elevul să compună cuvântul.
      var order = LCS.shuffle(B.lacate.map(function (_, i) { return i; }), C.id + "-litere");
      order.forEach(function (i) {
        var L = B.lacate[i];
        var on = !!state.lacate[L.id];
        slots.appendChild(el("span", { class: "slot" + (on ? " on" : ""), text: on ? L.litera : "?" }));
      });
    }
    function allOpen() { return B.lacate.every(function (L) { return state.lacate[L.id]; }); }
    function openChest() {
      treasure.innerHTML = LCS.gemSVG() + "<h3>Comoara</h3><p>" + B.mesajFinal + "</p>";
      treasure.classList.add("show");
      input.value = B.cuvant;
      input.disabled = true;
      submit.disabled = true;
    }

    var submit = el("button", { class: "btn", type: "submit", text: "Deschide cufărul" });
    var form = el("form", { novalidate: true }, [input, submit]);
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!allOpen()) {
        fb.className = "feedback show bad";
        fb.textContent = "Mai ai lacăte închise. Ai nevoie de toate literele.";
        return;
      }
      if (LCS.norm(input.value) === LCS.norm(B.cuvant)) {
        fb.className = "feedback";
        state.cufar = true;
        save();
        openChest();
        LCS.announce("Cufărul s-a deschis.");
      } else {
        fb.className = "feedback show bad";
        fb.textContent = "Nu încă. Indiciu: " + B.indiciuCuvant;
      }
    });

    var list = el("div", { class: "locks" });
    B.lacate.forEach(function (L, i) { list.appendChild(lock(L, i, renderSlots)); });
    renderSlots();

    var chest = el("div", { class: "card chest", id: "cufar" }, [
      el("h3", { text: "Cufărul" }),
      el("p", { class: "muted", text: "Aranjează literele în cuvântul-cheie. " + B.indiciuCuvant }),
      slots, form, fb, treasure
    ]);
    if (state.cufar) openChest();

    return section("breakout", 2, "Breakout: cinci lacăte", B.intro, el("div", {}, [list, chest]));
  }

  /* 3. Mini-jocuri */
  function gameOrder(G) {
    var items = LCS.shuffle(G.elemente.map(function (t, i) { return i; }), C.id + G.id);
    var ul = el("ol", { class: "order-list" });
    var fb = el("div", { class: "feedback", role: "status" });

    function draw() {
      ul.innerHTML = "";
      items.forEach(function (orig, pos) {
        var up = el("button", { type: "button", "aria-label": "Mută mai sus", text: "↑", disabled: pos === 0 });
        var down = el("button", { type: "button", "aria-label": "Mută mai jos", text: "↓", disabled: pos === items.length - 1 });
        up.addEventListener("click", function () { move(pos, -1); });
        down.addEventListener("click", function () { move(pos, 1); });
        ul.appendChild(el("li", { "data-orig": orig }, [el("span", { class: "txt", text: G.elemente[orig] }), el("span", { class: "mv" }, [up, down])]));
      });
    }
    function move(pos, d) {
      var t = items[pos]; items[pos] = items[pos + d]; items[pos + d] = t;
      draw();
      var btns = ul.children[pos + d].querySelectorAll("button");
      (btns[d < 0 ? 0 : 1] || btns[0]).focus();
      fb.className = "feedback";
    }
    function check() {
      var right = 0;
      Array.prototype.forEach.call(ul.children, function (li, pos) {
        var ok = items[pos] === pos;
        if (ok) right++;
        li.className = ok ? "right" : "wrong";
      });
      if (right === items.length) {
        fb.className = "feedback show ok";
        fb.textContent = "Perfect! Toate cele " + items.length + " momente sunt la locul lor.";
        state.jocuri[G.id] = { gata: true };
        save();
      } else {
        fb.className = "feedback show bad";
        fb.textContent = right + " din " + items.length + " sunt la locul potrivit. Cele roșii trebuie mutate.";
      }
    }
    function solve() { items = G.elemente.map(function (_, i) { return i; }); draw(); check(); }

    if (state.jocuri[G.id] && state.jocuri[G.id].gata) items = G.elemente.map(function (_, i) { return i; });
    draw();
    if (state.jocuri[G.id] && state.jocuri[G.id].gata) check();

    return el("div", { class: "card", id: "joc-" + G.id }, [
      el("h3", { text: G.titlu }),
      el("p", { class: "muted", text: G.instructiuni }),
      ul,
      el("div", { class: "btn-row" }, [
        el("button", { class: "btn", type: "button", text: "Verifică", onclick: check }),
        el("button", { class: "btn ghost small", type: "button", text: "Arată soluția", onclick: solve })
      ]),
      fb
    ]);
  }

  function gameDig(G) {
    var saved = (state.jocuri[G.id] && state.jocuri[G.id].raspunsuri) || {};
    var grid = el("div", { class: "mine" });
    var score = el("p", { class: "score", role: "status" });

    function updateScore() {
      var keys = Object.keys(saved);
      var gems = keys.filter(function (k) { return saved[k]; }).length;
      score.textContent = "Diamante: " + gems + " · Parcele săpate: " + keys.length + " din " + G.elemente.length;
      if (keys.length === G.elemente.length) {
        score.textContent += gems === G.elemente.length ? " — mină golită fără nicio greșeală!" : " — gata! Citește explicațiile pentru pietrele găsite.";
      }
    }
    function persist() {
      state.jocuri[G.id] = { raspunsuri: saved, gata: Object.keys(saved).length === G.elemente.length };
      save();
      updateScore();
    }

    G.elemente.forEach(function (item, i) {
      var tile = el("div", { class: "tile" });
      function reveal(result) {
        tile.className = "tile dug " + (result ? "gem" : "rock");
        tile.innerHTML = "";
        tile.appendChild(el("span", { class: "badge", text: result ? "◆ Diamant" : "● Piatră" }));
        tile.appendChild(el("span", { class: "q", text: item.text }));
        tile.appendChild(el("span", { class: "why", text: (item.da ? "Da. " : "Nu. ") + item.explicatie }));
      }
      function ask() {
        tile.className = "tile dug";
        tile.innerHTML = "";
        var yes = el("button", { type: "button", text: G.etichete[0] });
        var no = el("button", { type: "button", text: G.etichete[1] });
        function answer(v) {
          var ok = v === item.da;
          saved[i] = ok;
          reveal(ok);
          persist();
          LCS.announce(ok ? "Diamant!" : "Piatră. " + item.explicatie);
        }
        yes.addEventListener("click", function () { answer(true); });
        no.addEventListener("click", function () { answer(false); });
        tile.appendChild(el("span", { class: "q", text: item.text }));
        tile.appendChild(el("span", { class: "choices" }, [yes, no]));
        yes.focus();
      }
      if (i in saved) {
        reveal(saved[i]);
      } else {
        var dig = el("button", { type: "button", class: "tile", "aria-label": "Sapă parcela " + (i + 1) }, [el("span", { class: "shovel", text: "Sapă #" + (i + 1) })]);
        dig.addEventListener("click", function () { grid.replaceChild(tile, dig); ask(); });
        grid.appendChild(dig);
        return;
      }
      grid.appendChild(tile);
    });
    updateScore();

    var reset = el("button", { class: "btn ghost small", type: "button", text: "Reia jocul" });
    reset.addEventListener("click", function () {
      delete state.jocuri[G.id];
      save();
      var fresh = gameDig(G);
      wrap.parentNode.replaceChild(fresh, wrap);
    });
    var wrap = el("div", { class: "card", id: "joc-" + G.id }, [
      el("h3", { text: G.titlu }),
      el("p", { class: "muted", text: G.instructiuni }),
      grid, score, el("div", { class: "btn-row" }, [reset])
    ]);
    return wrap;
  }

  /* Potrivire: fiecărui element din stânga îi alegi perechea din dreapta (listă derulantă). */
  function gameMatch(G) {
    var saved = (state.jocuri[G.id] && state.jocuri[G.id].alegeri) || {};
    var order = LCS.shuffle(G.elemente.map(function (_, i) { return i; }), C.id + G.id);
    var list = el("ol", { class: "match-list" });
    var fb = el("div", { class: "feedback", role: "status" });
    var selects = [];

    G.elemente.forEach(function (item, i) {
      var id = "joc-" + G.id + "-" + i;
      var sel = el("select", { id: id }, [el("option", { value: "", text: "— alege —" })]);
      order.forEach(function (j) {
        sel.appendChild(el("option", { value: String(j), text: G.elemente[j].dreapta }));
      });
      if (i in saved) sel.value = String(saved[i]);
      var why = el("p", { class: "why small" });
      sel.addEventListener("change", function () {
        if (sel.value === "") delete saved[i]; else saved[i] = Number(sel.value);
        li.className = "";
        why.textContent = "";
        fb.className = "feedback";
        state.jocuri[G.id] = { alegeri: saved, gata: false };
        save();
      });
      var li = el("li", {}, [
        el("label", { for: id, class: "left" }, [
          el("span", { class: "txt", text: item.stanga }),
          item.original ? el("span", { class: "orig", lang: "en", text: item.original }) : null
        ]),
        sel, why
      ]);
      selects.push({ sel: sel, li: li, why: why, item: item, i: i });
      list.appendChild(li);
    });

    function check(silent) {
      var right = 0;
      selects.forEach(function (s) {
        var ok = s.sel.value !== "" && Number(s.sel.value) === s.i;
        if (ok) right++;
        s.li.className = ok ? "right" : "wrong";
        s.why.textContent = ok && s.item.explicatie ? s.item.explicatie : "";
      });
      var all = right === selects.length;
      fb.className = "feedback show " + (all ? "ok" : "bad");
      fb.textContent = all
        ? "Perfect! Toate cele " + selects.length + " perechi sunt corecte."
        : right + " din " + selects.length + " perechi sunt corecte. Schimbă perechile marcate cu roșu.";
      state.jocuri[G.id] = { alegeri: saved, gata: all };
      save();
      if (!silent) LCS.announce(fb.textContent);
    }
    function solve() {
      selects.forEach(function (s) { s.sel.value = String(s.i); saved[s.i] = s.i; });
      check();
    }
    if (state.jocuri[G.id] && state.jocuri[G.id].gata) check(true);

    return el("div", { class: "card", id: "joc-" + G.id }, [
      el("h3", { text: G.titlu }),
      el("p", { class: "muted", text: G.instructiuni }),
      list,
      el("div", { class: "btn-row" }, [
        el("button", { class: "btn", type: "button", text: "Verifică", onclick: function () { check(); } }),
        el("button", { class: "btn ghost small", type: "button", text: "Arată soluția", onclick: solve })
      ]),
      fb
    ]);
  }

  /* Atenție: urmărești secundarul unui ceas; când vârful se aprinde, apeși butonul.
     Notificările false trebuie ignorate. Scorul (ultimul și recordul) stă doar în localStorage. */
  var SVGNS = "http://www.w3.org/2000/svg";
  function svgEl(tag, attrs) {
    var n = document.createElementNS(SVGNS, tag);
    Object.keys(attrs || {}).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    return n;
  }
  function gameAttention(G) {
    var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var S = G.semnal || {};
    var gapMin = (S.intervalMin || 4) * 1000, gapMax = (S.intervalMax || 9) * 1000, win = S.durata || 1100;
    function saved() { return state.jocuri[G.id] || {}; }

    /* cadranul */
    var svg = svgEl("svg", { viewBox: "0 0 200 200", class: "dial", "aria-hidden": "true" });
    svg.appendChild(svgEl("circle", { cx: 100, cy: 100, r: 92, class: "dial-face" }));
    for (var t = 0; t < 60; t++) {
      var big = t % 5 === 0, a = t * 6 * Math.PI / 180;
      svg.appendChild(svgEl("line", {
        x1: 100 + Math.sin(a) * (big ? 74 : 80), y1: 100 - Math.cos(a) * (big ? 74 : 80),
        x2: 100 + Math.sin(a) * 86, y2: 100 - Math.cos(a) * 86, class: big ? "tick big" : "tick"
      }));
    }
    var hand = svgEl("g", { class: "hand" });
    hand.appendChild(svgEl("line", { x1: 100, y1: 116, x2: 100, y2: 26, class: "hand-line" }));
    var tip = svgEl("circle", { cx: 100, cy: 26, r: 7, class: "hand-tip" });
    hand.appendChild(tip);
    svg.appendChild(hand);
    svg.appendChild(svgEl("circle", { cx: 100, cy: 100, r: 5, class: "hand-hub" }));

    var dur = el("select", { id: "joc-" + G.id + "-durata" }, G.durate.map(function (d) {
      return el("option", { value: String(d), text: d < 60 ? d + " de secunde" : (d / 60) + (d === 60 ? " minut" : " minute") });
    }));
    var clock = el("p", { class: "att-time", "aria-live": "off", text: "" });
    var press = el("button", { class: "btn att-press", type: "button", text: "Am văzut!", disabled: true });
    var start = el("button", { class: "btn", type: "button", text: "Pornește" });
    var stop = el("button", { class: "btn ghost small", type: "button", text: "Oprește", disabled: true });
    var stage = el("div", { class: "att-stage" }, [svg, el("div", { class: "att-toasts", "aria-hidden": "true" })]);
    var toasts = stage.lastChild;
    var out = el("div", { class: "feedback", role: "status" });
    var best = el("p", { class: "small muted" });

    var run = null;
    function rnd(a, b) { return a + Math.random() * (b - a); }
    function fmt(ms) { var s = Math.max(0, Math.ceil(ms / 1000)); return Math.floor(s / 60) + ":" + ("0" + (s % 60)).slice(-2); }
    function showBest() {
      var d = saved();
      best.textContent = d.record !== undefined
        ? "Recordul tău pe acest dispozitiv: " + d.record + " puncte" + (d.ultim ? " · ultima rundă: " + d.ultim.puncte + " puncte" : "") + "."
        : "Încă nicio rundă jucată pe acest dispozitiv.";
    }

    function frame() {
      if (!run) return;
      var now = Date.now(), elapsed = now - run.t0;
      var sec = reduced ? Math.floor(elapsed / 1000) : elapsed / 1000;
      hand.setAttribute("transform", "rotate(" + ((sec * 6) % 360) + " 100 100)");
      clock.textContent = "Timp rămas: " + fmt(run.len - elapsed);
      if (run.lit && now > run.lit + win) { run.lit = 0; run.ratate++; tip.classList.remove("on"); }
      if (!run.lit && now >= run.nextSig && run.len - elapsed > win) {
        run.lit = now; run.semnale++; tip.classList.add("on");
        run.nextSig = now + win + rnd(gapMin, gapMax);
      }
      if (now >= run.nextToast && run.len - elapsed > 2500) { toast(); run.nextToast = now + rnd(5000, 11000); }
      if (elapsed >= run.len) { finish(true); return; }
      run.raf = window.requestAnimationFrame(frame);
    }
    function toast() {
      var msg = G.notificari[Math.floor(Math.random() * G.notificari.length)];
      var open = el("button", { type: "button", tabindex: "-1", text: "Deschide" });
      var box = el("div", { class: "att-toast" }, [el("span", { class: "att-toast-app", text: "● Notificare" }), el("span", { text: msg }), open]);
      var r = run;
      open.addEventListener("click", function () {
        if (run !== r) return;
        run.distras++;
        box.classList.add("caught");
        out.className = "feedback show bad";
        out.textContent = "Te-a prins o notificare! Întoarce-te la secundar.";
        setTimeout(function () { if (box.parentNode) box.parentNode.removeChild(box); }, 400);
        press.focus();
      });
      toasts.appendChild(box);
      setTimeout(function () {
        if (box.parentNode && !box.classList.contains("caught")) { box.parentNode.removeChild(box); if (run === r) run.ignorate++; }
      }, 3200);
    }
    function hit() {
      if (!run) return;
      if (run.lit) {
        run.prinse++; run.lit = 0; tip.classList.remove("on");
        out.className = "feedback show ok"; out.textContent = "Prins! (" + run.prinse + ")";
      } else {
        run.gol++;
        out.className = "feedback show bad"; out.textContent = "Vârful nu era aprins. Privește secundarul, nu butonul.";
      }
    }
    function begin() {
      if (run) return;
      toasts.innerHTML = "";
      var now = Date.now();
      run = { t0: now, len: Number(dur.value) * 1000, nextSig: now + rnd(gapMin, gapMax), nextToast: now + rnd(3000, 7000),
        lit: 0, semnale: 0, prinse: 0, ratate: 0, gol: 0, distras: 0, ignorate: 0 };
      start.disabled = true; dur.disabled = true; stop.disabled = false; press.disabled = false;
      out.className = "feedback"; out.textContent = "";
      wrap.classList.add("running");
      press.focus();
      LCS.announce("Exercițiul a început. Urmărește secundarul.");
      run.raf = window.requestAnimationFrame(frame);
    }
    function finish(complete) {
      var r = run;
      if (!r) return;
      window.cancelAnimationFrame(r.raf);
      if (r.lit) r.ratate++;
      run = null;
      tip.classList.remove("on");
      toasts.innerHTML = "";
      start.disabled = false; dur.disabled = false; stop.disabled = true; press.disabled = true;
      wrap.classList.remove("running");
      start.textContent = "Joacă din nou";
      if (!complete) {
        out.className = "feedback show bad";
        out.textContent = "Rundă oprită înainte de final; scorul nu s-a salvat.";
        return;
      }
      var pts = Math.max(0, r.prinse * 10 - r.gol * 5 - r.distras * 5);
      var d = saved();
      var rec = d.record === undefined || pts > d.record;
      state.jocuri[G.id] = { gata: true, record: rec ? pts : d.record, ultim: { puncte: pts, prinse: r.prinse, semnale: r.semnale, gol: r.gol, distras: r.distras, ignorate: r.ignorate, secunde: r.len / 1000 } };
      save();
      out.className = "feedback show ok";
      out.innerHTML = "";
      out.appendChild(el("strong", { text: (rec ? "Record nou: " : "Gata: ") + pts + " puncte. " }));
      out.appendChild(document.createTextNode(
        "Ai prins " + r.prinse + " din " + r.semnale + " semnale · apăsări pe gol: " + r.gol +
        " · notificări deschise: " + r.distras + " · notificări ignorate: " + r.ignorate + ". " + (G.notaFinal || "")));
      showBest();
      LCS.announce("Exercițiu încheiat. " + pts + " puncte.");
    }

    press.addEventListener("click", hit);
    start.addEventListener("click", begin);
    stop.addEventListener("click", function () { finish(false); });
    document.addEventListener("keydown", function (e) {
      if (!run || (e.key !== " " && e.code !== "Space")) return;
      if (document.activeElement === press) return; // butonul primește deja spațiul ca „click”
      e.preventDefault();
      hit();
    });
    document.addEventListener("visibilitychange", function () { if (document.hidden && run) finish(false); });

    hand.setAttribute("transform", "rotate(0 100 100)");
    clock.textContent = "Timp: " + fmt(Number(G.durate[0]) * 1000);
    dur.addEventListener("change", function () { clock.textContent = "Timp: " + fmt(Number(dur.value) * 1000); });
    showBest();

    var wrap = el("div", { class: "card att", id: "joc-" + G.id }, [
      el("h3", { text: G.titlu }),
      el("p", { class: "muted", text: G.instructiuni }),
      G.citat ? quote(G.citat) : null,
      el("div", { class: "att-controls" }, [
        el("div", { class: "field" }, [el("label", { for: "joc-" + G.id + "-durata", text: "Durata" }), dur]),
        el("div", { class: "btn-row" }, [start, stop])
      ]),
      stage, clock, el("div", { class: "btn-row att-press-row" }, [press]),
      out, best,
      el("p", { class: "small muted", text: "Punctaj: +10 pentru fiecare semnal prins, −5 pentru o apăsare pe gol, −5 pentru o notificare deschisă. Dacă schimbi fila, runda se oprește." })
    ]);
    return wrap;
  }

  function jocuri() {
    var box = el("div", { class: "games" });
    C.jocuri.forEach(function (G) {
      if (G.tip === "ordonare") box.appendChild(gameOrder(G));
      else if (G.tip === "sapa") box.appendChild(gameDig(G));
      else if (G.tip === "potrivire") box.appendChild(gameMatch(G));
      else if (G.tip === "atentie") box.appendChild(gameAttention(G));
    });
    return section("jocuri", 3, "Mini-jocuri", C.jocuriIntro || "Două jocuri scurte pentru fixarea poveștii și a ideilor.", box);
  }

  /* 4. Reflecție + aplică azi */
  function field(id, label, hint, long, value, onInput) {
    var input = long
      ? el("textarea", { id: id })
      : el("input", { type: "text", id: id });
    input.value = value || "";
    input.addEventListener("input", function () { onInput(input.value); });
    return el("div", { class: "field" }, [
      el("label", { for: id }, [label, hint ? el("span", { class: "hint", text: hint }) : null]),
      input
    ]);
  }

  function num(v) { return (Math.round(v * 100) / 100).toLocaleString("ro-RO", { maximumFractionDigits: 2 }); }

  /* Opțional (aplicaAzi.calculator): o cheltuială mică recurentă, socotită pe un an.
     Valorile se păstrează în state.aplica._calc. */
  function calcResult(K) {
    var d = state.aplica._calc || {};
    var suma = parseFloat(String(d.suma || "").replace(",", "."));
    var f = K.frecvente[Number(d.frecventa) || 0];
    if (!(suma > 0) || !f) return null;
    var an = suma * f.peAn;
    return { ce: (d.ce || "").trim(), suma: suma, f: f, an: an, luna: an / 12, ani5: an * 5 };
  }
  function calcSummary(K) {
    var r = calcResult(K);
    if (!r) return "";
    return (r.ce ? r.ce + ": " : "") + num(r.suma) + " " + K.moneda + ", " + r.f.eticheta + " = " + num(r.an) + " " + K.moneda + " pe an";
  }
  function calculator(K, resets) {
    function get() { return state.aplica._calc || (state.aplica._calc = {}); }
    var ce = el("input", { type: "text", id: "calc-ce", placeholder: K.exempluCe || "" });
    var suma = el("input", { type: "text", id: "calc-suma", inputmode: "decimal", autocomplete: "off", placeholder: K.exempluSuma || "" });
    var frec = el("select", { id: "calc-frecventa" }, K.frecvente.map(function (f, i) {
      return el("option", { value: String(i), text: f.eticheta + " (" + f.peAn + " pe an)" });
    }));
    var out = el("div", { class: "calc-out", role: "status", "aria-live": "polite" });

    function fill() {
      var d = state.aplica._calc || {};
      ce.value = d.ce || "";
      suma.value = d.suma || "";
      frec.value = String(d.frecventa || 0);
      draw();
    }
    function draw() {
      out.innerHTML = "";
      var r = calcResult(K);
      if (!r) {
        out.appendChild(el("p", { class: "muted", text: "Scrie o sumă ca să vezi cât face pe un an." }));
        return;
      }
      out.appendChild(el("p", { class: "calc-line", text: (r.ce || "Cheltuiala ta") + ": " + num(r.suma) + " " + K.moneda + " × " + r.f.peAn + " ori pe an =" }));
      out.appendChild(el("p", { class: "calc-big", text: num(r.an) + " " + K.moneda + " pe an" }));
      out.appendChild(el("p", { class: "small muted", text: "Cam " + num(r.luna) + " " + K.moneda + " pe lună · în 5 ani: " + num(r.ani5) + " " + K.moneda + " (fără dobânzi și fără scumpiri)." }));
      if (K.intrebare) out.appendChild(el("p", { class: "small", text: K.intrebare }));
    }
    ce.addEventListener("input", function () { get().ce = ce.value; save(); draw(); });
    suma.addEventListener("input", function () { get().suma = suma.value; save(); draw(); });
    frec.addEventListener("change", function () { get().frecventa = Number(frec.value); save(); draw(); });
    resets.push(fill);
    fill();

    return el("div", { class: "tool", id: "calculator" }, [
      el("h3", { text: K.titlu }),
      K.intro ? el("p", { text: K.intro }) : null,
      K.citat ? quote(K.citat) : null,
      el("div", { class: "calc-grid" }, [
        el("div", { class: "field" }, [el("label", { for: "calc-ce", text: "Ce cheltuială?" }), ce]),
        el("div", { class: "field" }, [el("label", { for: "calc-suma", text: "Cât costă o dată (" + K.moneda + ")" }), suma]),
        el("div", { class: "field" }, [el("label", { for: "calc-frecventa", text: "Cât de des" }), frec])
      ]),
      out
    ]);
  }

  /* Opțional (aplicaAzi.jurnal): pagina săptămânală din carnețelul lui Franklin.
     O virtute în atenție, câte un punct pentru fiecare abatere. Se tipărește separat. */
  function jurnal(J, resets) {
    var V = C.virtuti;
    function get() { return state.aplica._jurnal || (state.aplica._jurnal = { virtute: V[0].id, puncte: {} }); }
    var sel = el("select", { id: "jurnal-virtute" }, V.map(function (v) { return el("option", { value: v.id, text: v.nume }); }));
    var week = el("input", { type: "text", id: "jurnal-saptamana", placeholder: "de exemplu: 3–9 noiembrie" });
    var page = el("div", { class: "tracker", id: "jurnal" });

    function draw() {
      var d = state.aplica._jurnal || { virtute: V[0].id, puncte: {} };
      var focus = V.filter(function (v) { return v.id === d.virtute; })[0] || V[0];
      sel.value = focus.id;
      if (document.activeElement !== week) week.value = d.saptamana || "";
      var rows = [focus].concat(V.filter(function (v) { return v !== focus; }));
      page.innerHTML = "";
      page.appendChild(el("p", { class: "tracker-kicker", text: J.antet || "Carnețelul virtuților" }));
      page.appendChild(el("h4", { text: focus.nume.toUpperCase() }));
      page.appendChild(el("p", { class: "tracker-precept", text: "„" + focus.ro + "”" }));
      page.appendChild(el("p", { class: "small tracker-week", text: "Săptămâna: " + (d.saptamana || "______________________") }));
      var head = el("tr", {}, [el("th", { scope: "col", text: "Virtutea" })].concat(J.zile.map(function (z) { return el("th", { scope: "col", text: z }); })));
      var body = el("tbody");
      rows.forEach(function (v) {
        var tr = el("tr", { class: v === focus ? "focus" : null }, [el("th", { scope: "row", text: v.nume })]);
        J.zile.forEach(function (z, k) {
          var key = v.id + ":" + k;
          var n = (d.puncte && d.puncte[key]) || 0;
          var b = el("button", { type: "button", class: "dot", "aria-label": v.nume + ", " + z + ": " + n + (n === 1 ? " greșeală" : " greșeli"), text: n ? new Array(n + 1).join("•") : "" });
          b.addEventListener("click", function () {
            var g = get();
            g.puncte = g.puncte || {};
            g.puncte[key] = ((g.puncte[key] || 0) + 1) % 4;
            save();
            draw();
            var again = page.querySelector("[data-k='" + key + "']");
            if (again) again.focus();
          });
          b.setAttribute("data-k", key);
          tr.appendChild(el("td", {}, [b]));
        });
        body.appendChild(tr);
      });
      page.appendChild(el("div", { class: "table-scroll" }, [el("table", {}, [el("thead", {}, [head]), body])]));
      if (J.instructiuniTabel) page.appendChild(el("p", { class: "small muted no-print", text: J.instructiuniTabel }));
    }
    sel.addEventListener("change", function () { get().virtute = sel.value; save(); draw(); });
    week.addEventListener("input", function () { get().saptamana = week.value; save(); draw(); });
    resets.push(draw);
    draw();

    var clear = el("button", { class: "btn ghost small", type: "button", text: "Golește punctele" });
    clear.addEventListener("click", function () {
      if (!window.confirm("Ștergi toate punctele din tabel?")) return;
      get().puncte = {};
      save();
      draw();
    });

    return el("div", { class: "tool", id: "carnet" }, [
      el("h3", { text: J.titlu }),
      J.intro ? el("p", { text: J.intro }) : null,
      J.citat ? quote(J.citat) : null,
      el("div", { class: "calc-grid" }, [
        el("div", { class: "field" }, [el("label", { for: "jurnal-virtute", text: "Virtutea săptămânii" }), sel]),
        el("div", { class: "field" }, [el("label", { for: "jurnal-saptamana", text: "Săptămâna (opțional)" }), week])
      ]),
      page,
      el("div", { class: "btn-row no-print" }, [
        el("button", { class: "btn secondary", type: "button", text: "Tipărește tabelul", onclick: function () {
          document.body.classList.add("print-jurnal");
          window.print();
          setTimeout(function () { document.body.classList.remove("print-jurnal"); }, 500);
        } }),
        clear
      ])
    ]);
  }

  /* Opțional (aplicaAzi.provocare): 7 zile, câte un exercițiu cu cronometru, o listă de bifat și o notiță pe zi.
     Totul în state.aplica._provocare = { bifate: { "0": true }, note: { "0": "…" } }. */
  function provocareDone(P) {
    var b = (state.aplica._provocare && state.aplica._provocare.bifate) || {};
    return P.zile.map(function (_, i) { return i; }).filter(function (i) { return b[i]; });
  }
  function provocare(P, resets) {
    function get() {
      var p = state.aplica._provocare || (state.aplica._provocare = {});
      p.bifate = p.bifate || {}; p.note = p.note || {};
      return p;
    }
    var total = (P.minute || 5) * 60 * 1000;
    var timer = { zi: 0, ramas: total, pornit: 0, id: null };
    var face = el("p", { class: "timer-face", role: "timer", "aria-live": "off" });
    var label = el("p", { class: "timer-day" });
    var go = el("button", { class: "btn", type: "button", text: "Pornește" });
    var reset = el("button", { class: "btn ghost small", type: "button", text: "De la capăt" });
    var msg = el("p", { class: "small", role: "status" });
    var list = el("ol", { class: "challenge" });
    var count = el("p", { class: "score" });

    function fmt(ms) { var s = Math.max(0, Math.ceil(ms / 1000)); return Math.floor(s / 60) + ":" + ("0" + (s % 60)).slice(-2); }
    function left() { return timer.pornit ? timer.ramas - (Date.now() - timer.pornit) : timer.ramas; }
    function paint() {
      face.textContent = fmt(left());
      label.textContent = "Ziua " + (timer.zi + 1) + " · " + P.zile[timer.zi].titlu;
      go.textContent = timer.pornit ? "Pauză" : (timer.ramas < total ? "Continuă" : "Pornește");
    }
    function tick() {
      if (left() <= 0) {
        clearInterval(timer.id); timer.id = null; timer.pornit = 0; timer.ramas = total;
        get().bifate[timer.zi] = true;
        save();
        drawList();
        paint();
        face.textContent = "0:00";
        msg.textContent = "Gata! Ziua " + (timer.zi + 1) + " e bifată. Notează în două cuvinte ce ai observat.";
        LCS.announce("Timpul s-a terminat. Ziua " + (timer.zi + 1) + " e bifată.");
        beep();
        var n = list.querySelector("#prov-nota-" + timer.zi);
        if (n) n.focus();
        return;
      }
      paint();
    }
    function beep() {
      try {
        var Ctx = window.AudioContext || window.webkitAudioContext;
        if (!Ctx) return;
        var ctx = new Ctx(), o = ctx.createOscillator(), g = ctx.createGain();
        o.frequency.value = 660; g.gain.value = 0.08;
        o.connect(g); g.connect(ctx.destination);
        o.start(); o.stop(ctx.currentTime + 0.4);
        o.onended = function () { ctx.close(); };
      } catch (e) { /* fără sunet */ }
    }
    function pause() {
      if (!timer.pornit) return;
      timer.ramas = left(); timer.pornit = 0;
      clearInterval(timer.id); timer.id = null;
    }
    function pick(i) {
      pause();
      timer.zi = i; timer.ramas = total;
      msg.textContent = "";
      paint();
      drawList();
      face.scrollIntoView({ block: "nearest" });
      go.focus();
    }
    go.addEventListener("click", function () {
      if (timer.pornit) { pause(); paint(); return; }
      timer.pornit = Date.now();
      msg.textContent = "";
      timer.id = setInterval(tick, 250);
      paint();
    });
    reset.addEventListener("click", function () { pause(); timer.ramas = total; msg.textContent = ""; paint(); });

    function drawList() {
      var p = state.aplica._provocare || {};
      var b = p.bifate || {}, notes = p.note || {};
      list.innerHTML = "";
      P.zile.forEach(function (z, i) {
        var box = el("input", { type: "checkbox", id: "prov-zi-" + i, checked: !!b[i] });
        box.addEventListener("change", function () {
          if (box.checked) get().bifate[i] = true; else delete get().bifate[i];
          save();
          drawList();
          var again = document.getElementById("prov-zi-" + i);
          if (again) again.focus();
        });
        var note = el("input", { type: "text", id: "prov-nota-" + i, placeholder: "Ce am observat (opțional)" });
        note.value = notes[i] || "";
        note.addEventListener("input", function () { get().note[i] = note.value; save(); });
        list.appendChild(el("li", { class: (b[i] ? "done" : "") + (timer.zi === i ? " current" : "") }, [
          el("div", { class: "challenge-head" }, [
            box,
            el("label", { for: "prov-zi-" + i }, [el("strong", { text: "Ziua " + (i + 1) + " · " + z.titlu }), z.sursa ? el("span", { class: "small muted", text: z.sursa }) : null])
          ]),
          el("p", { text: z.text }),
          el("div", { class: "challenge-foot" }, [
            el("button", { class: "btn secondary small", type: "button", text: timer.zi === i ? "Ziua din cronometru" : "Pune în cronometru", disabled: timer.zi === i, onclick: function () { pick(i); } }),
            el("label", { class: "sr-only", for: "prov-nota-" + i, text: "Notița pentru ziua " + (i + 1) }),
            note
          ])
        ]));
      });
      var n = provocareDone(P).length;
      count.textContent = "Zile bifate: " + n + " din " + P.zile.length + (n === P.zile.length ? " — provocare încheiată!" : "");
    }
    resets.push(function () { pause(); timer.zi = 0; timer.ramas = total; msg.textContent = ""; paint(); drawList(); });
    paint();
    drawList();

    return el("div", { class: "tool", id: "provocare" }, [
      el("h3", { text: P.titlu }),
      P.citat ? quote(P.citat) : null,
      P.instructiuni ? el("p", { class: "small muted", text: P.instructiuni }) : null,
      el("div", { class: "timer" }, [label, face, el("div", { class: "btn-row" }, [go, reset]), msg]),
      count,
      list
    ]);
  }

  function reflectie() {
    var R = C.reflectie, A = C.aplicaAzi;
    var resets = [];
    var privacy = el("p", { class: "privacy", text:
      "Ce scrii aici rămâne doar pe acest dispozitiv, în browserul tău. Nu se trimite nicăieri. Poți șterge totul cu butonul de mai jos." });

    var prompts = el("div", { class: "prompts" });
    R.intrebari.forEach(function (q) {
      prompts.appendChild(field("note-" + q.id, q.text, q.hint, true, state.note[q.id], function (v) { state.note[q.id] = v; save(); }));
    });

    var steps = el("div", { class: "steps" });
    A.campuri.forEach(function (f) {
      steps.appendChild(field("apl-" + f.id, f.eticheta, f.hint, f.lung !== false, state.aplica[f.id], function (v) { state.aplica[f.id] = v; save(); }));
    });

    var cardOut = el("div", { class: "commit-card", id: "cartonas", "aria-live": "polite" });
    function buildCard() {
      cardOut.innerHTML = "";
      var dl = el("dl");
      var any = false;
      cardEntries().forEach(function (e) {
        any = true;
        dl.appendChild(el("dt", { text: e[0] }));
        dl.appendChild(el("dd", { text: e[1] }));
      });
      if (!any) {
        cardOut.appendChild(el("p", { text: "Completează măcar un câmp, apoi generează cartonașul." }));
      } else {
        var d = new Date();
        cardOut.appendChild(el("h3", { text: A.titluCartonas }));
        cardOut.appendChild(el("p", { class: "small muted", text: d.toLocaleDateString("ro-RO", { day: "numeric", month: "long", year: "numeric" }) + " · după „" + C.titlu + "”, " + C.autor }));
        cardOut.appendChild(dl);
        state.cartonas = true;
        save();
      }
      cardOut.classList.add("show");
    }
    /* Perechi [etichetă, valoare] pentru cartonaș: câmpurile completate + rezultatele uneltelor. */
    function cardEntries() {
      var out = [];
      if (A.calculator) {
        var c = calcSummary(A.calculator);
        if (c) out.push([A.calculator.etichetaCartonas || "Calculul meu", c]);
      }
      if (A.provocare) {
        var zile = provocareDone(A.provocare);
        if (zile.length) out.push([A.provocare.etichetaCartonas || "Provocarea de 7 zile", zile.length + " din " + A.provocare.zile.length + " zile bifate: " +
          zile.map(function (i) { return A.provocare.zile[i].titlu; }).join(", ")]);
      }
      A.campuri.forEach(function (f) {
        var v = (state.aplica[f.id] || "").trim();
        if (v) out.push([f.eticheta.replace(/^\d+\.\s*/, ""), v]);
      });
      return out;
    }
    function cardText() {
      var lines = [A.titluCartonas + " — după „" + C.titlu + "”, " + C.autor, ""];
      cardEntries().forEach(function (e) { lines.push(e[0] + ":", e[1], ""); });
      return lines.join("\n");
    }
    var copyBtn = el("button", { class: "btn secondary", type: "button", text: "Copiază textul" });
    copyBtn.addEventListener("click", function () {
      var t = cardText();
      function done() { copyBtn.textContent = "Copiat ✓"; setTimeout(function () { copyBtn.textContent = "Copiază textul"; }, 1800); }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(t).then(done, function () { window.prompt("Copiază textul:", t); });
      } else {
        window.prompt("Copiază textul:", t);
      }
    });
    var wipe = el("button", { class: "btn ghost", type: "button", text: "Șterge tot ce am scris" });
    wipe.addEventListener("click", function () {
      if (!window.confirm("Ștergi notițele și cartonașul de pe acest dispozitiv?")) return;
      state.note = {}; state.aplica = {}; state.cartonas = false;
      save();
      document.querySelectorAll("#reflectie textarea, #reflectie input[type=text]").forEach(function (i) { i.value = ""; });
      resets.forEach(function (fn) { fn(); });
      cardOut.classList.remove("show");
      cardOut.innerHTML = "";
    });
    if (state.cartonas) buildCard();

    var apply = el("div", { class: "card apply", id: "aplica" }, [
      el("h3", { text: A.titlu + " · " + A.durata }),
      el("p", { text: A.intro }),
      A.calculator ? calculator(A.calculator, resets) : null,
      A.jurnal && C.virtuti ? jurnal(A.jurnal, resets) : null,
      A.provocare ? provocare(A.provocare, resets) : null,
      A.titluCampuri ? el("h4", { class: "tool-title", text: A.titluCampuri }) : null,
      steps,
      el("div", { class: "btn-row no-print" }, [
        el("button", { class: "btn", type: "button", text: "Generează cartonașul", onclick: buildCard }),
        copyBtn,
        el("button", { class: "btn secondary", type: "button", text: "Tipărește cartonașul", onclick: function () {
          buildCard();
          document.body.classList.add("print-card");
          window.print();
          setTimeout(function () { document.body.classList.remove("print-card"); }, 500);
        } }),
        wipe
      ]),
      cardOut
    ]);

    return section("reflectie", 4, "Reflecție finală",
      "Trei întrebări fără răspuns corect. Apoi, exercițiul practic.",
      el("div", {}, [privacy, el("div", { class: "card" }, [prompts]), apply]));
  }

  /* 5. Profesori */
  function profesori() {
    var P = C.profesor;
    var box = el("div", { class: "teacher-box" }, [
      el("div", { class: "card" }, [
        el("h3", { text: "Pe scurt" }),
        el("p", { text: P.rezumat }),
        el("p", { class: "small" }, [el("strong", { text: "Nivel: " }), P.nivel]),
        el("p", { class: "small" }, [el("strong", { text: "Durată: " }), P.durata]),
        el("div", { class: "btn-row" }, [
          el("a", { class: "btn", href: "fisa.html", text: "Deschide fișa profesorului" }),
          el("a", { class: "btn secondary", href: "fisa.html#fisa-elev", text: "Doar fișa elevului" })
        ])
      ]),
      el("div", { class: "card" }, [
        el("h3", { text: "Obiective" }),
        el("ul", {}, P.obiective.map(function (o) { return el("li", { text: o }); }))
      ])
    ]);
    return section("profesori", 5, "Pentru profesori",
      "Fișa conține planul orei, fișa de lucru pentru elevi, baremul și întrebări pentru discuția critică. Se tipărește direct din browser.", box);
  }

  /* ---------- progres ---------- */
  function done(stepId) {
    if (stepId === "dosar") return state.dosar.length >= C.dosar.length;
    if (stepId === "breakout") return state.cufar;
    if (stepId === "jocuri") return C.jocuri.every(function (g) { return state.jocuri[g.id] && state.jocuri[g.id].gata; });
    if (stepId === "reflectie") return state.cartonas;
    return false;
  }
  function updateProgress() {
    var tracked = ["dosar", "breakout", "jocuri", "reflectie"];
    var n = 0;
    tracked.forEach(function (s) {
      var d = done(s);
      if (d) n++;
      var a = document.querySelector("[data-step='" + s + "']");
      if (a) a.classList.toggle("done", d);
    });
    var pct = Math.round((n / tracked.length) * 100);
    var bar = document.querySelector(".progress-bar");
    if (bar) {
      bar.firstChild.style.width = pct + "%";
      bar.setAttribute("aria-valuenow", String(pct));
    }
  }

  function resetAll() {
    if (!window.confirm("Resetezi tot progresul din această cameră (inclusiv notițele)?")) return;
    store.remove(KEY);
    window.location.reload();
  }

  /* ---------- pornire ---------- */
  function init() {
    C = window.CAMERA; el = LCS.el; store = LCS.store;
    if (!C) return;
    KEY = "camera:" + C.id;
    state = load();
    document.title = C.titlu + " · Cărți care schimbă vieți";
    var root = document.getElementById("camera");
    root.innerHTML = "";
    [hero(), stepper(), dosar(), breakout(), jocuri(), reflectie(), profesori()].forEach(function (n) { root.appendChild(n); });
    var resetBtn = document.getElementById("reset-camera");
    if (resetBtn) resetBtn.addEventListener("click", resetAll);
    updateProgress();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
