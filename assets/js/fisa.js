/* Lecturi care schimbă — fișa profesorului, generată din window.CAMERA.profesor.
   Pagina 1: ghidul profesorului. Pagina 2: fișa elevului. Pagina 3: barem + citate. */
(function () {
  "use strict";

  function init() {
    var C = window.CAMERA, el = LCS.el;
    if (!C || !C.profesor) return;
    var P = C.profesor;
    document.title = "Fișa profesorului · " + C.titlu;

    var root = document.getElementById("fisa");
    root.innerHTML = "";
    var w = el("div", { class: "wrap narrow" });
    root.appendChild(w);

    function h2(text, id, pageBreak) {
      return el("h2", { id: id, class: pageBreak ? "page-break" : null, text: text });
    }
    function list(items, ordered) {
      return el(ordered ? "ol" : "ul", {}, items.map(function (t) { return el("li", { text: t }); }));
    }

    /* bara de unelte */
    w.appendChild(el("div", { class: "sheet-toolbar no-print" }, [
      el("button", { class: "btn", type: "button", text: "Tipărește tot", onclick: function () { window.print(); } }),
      el("a", { class: "btn secondary", href: "#fisa-elev", text: "Sari la fișa elevului" }),
      el("a", { class: "btn ghost", href: "./", text: "Deschide camera" })
    ]));

    /* ---------- ghidul profesorului ---------- */
    w.appendChild(el("p", { class: "step-label", text: "Fișa profesorului" }));
    w.appendChild(el("h1", { text: C.titlu }));
    w.appendChild(el("p", { class: "byline muted", text: "„" + C.titluOriginal + "” · " + C.autor + " (" + C.ani + ") · " + C.tipText }));
    w.appendChild(el("p", { text: P.rezumat }));
    w.appendChild(el("div", { class: "meta-grid" }, [
      el("div", {}, [el("strong", { text: "Nivel: " }), P.nivel]),
      el("div", {}, [el("strong", { text: "Durată: " }), P.durata]),
      el("div", {}, [el("strong", { text: "Discipline: " }), P.discipline]),
      el("div", {}, [el("strong", { text: "Materiale: " }), P.materiale])
    ]));

    w.appendChild(h2("Obiective", "obiective"));
    w.appendChild(el("p", { text: "La finalul orei, elevii vor fi capabili:" }));
    w.appendChild(list(P.obiective));

    w.appendChild(h2("Desfășurarea orei", "desfasurare"));
    var table = el("table", {}, [
      el("thead", {}, [el("tr", {}, [el("th", { text: "Minute" }), el("th", { text: "Etapa" }), el("th", { text: "Activitate" })])]),
      el("tbody", {}, P.desfasurare.map(function (r) {
        return el("tr", {}, [el("td", { text: r.minute }), el("td", { text: r.etapa }), el("td", { text: r.activitate })]);
      }))
    ]);
    w.appendChild(table);
    w.appendChild(el("p", { class: "small muted", text: "Fără tehnologie? Tipăriți indiciile și citatele, scrieți întrebările lacătelor pe tablă, iar literele le dați pe bilețele echipei care justifică corect." }));

    w.appendChild(h2("Întrebări pentru discuția critică", "discutie"));
    w.appendChild(list(P.discutie));

    w.appendChild(h2("Diferențiere", "diferentiere"));
    w.appendChild(list(P.diferentiere));

    if (P.atentie) {
      w.appendChild(el("p", { class: "privacy" }, [el("strong", { text: "Notă pentru profesor: " }), P.atentie]));
    }

    w.appendChild(h2("Extinderi", "extensii"));
    w.appendChild(list(P.extensii));

    w.appendChild(h2("Lacătele pe scurt (pentru moderare)", "lacate"));
    w.appendChild(el("table", {}, [
      el("thead", {}, [el("tr", {}, [el("th", { text: "Lacăt" }), el("th", { text: "Răspuns" }), el("th", { text: "Citat-dovadă" }), el("th", { text: "Literă" })])]),
      el("tbody", {}, C.breakout.lacate.map(function (L) {
        return el("tr", {}, [
          el("td", { text: L.titlu }),
          el("td", { text: L.optiuni[L.corect] }),
          el("td", { text: "„" + C.citate[L.citatCorect].ro + "”" }),
          el("td", { text: L.litera })
        ]);
      }))
    ]));
    w.appendChild(el("p", { class: "small" }, [el("strong", { text: "Cuvântul-cheie: " }), C.breakout.cuvant]));

    /* ---------- fișa elevului ---------- */
    var F = P.fisaElev;
    w.appendChild(h2(F.titlu, "fisa-elev", true));
    w.appendChild(el("div", { class: "name-line" }, [el("span", { text: "Nume:" }), el("span", { text: "Clasa:" }), el("span", { text: "Data:" })]));
    w.appendChild(el("p", { html: "<em>" + F.instructiuni + "</em>" }));
    F.itemi.forEach(function (it, i) {
      var lines = [];
      for (var k = 0; k < (it.linii || 3); k++) lines.push(el("div", { class: "lines" }));
      w.appendChild(el("div", { class: "item" }, [el("p", {}, [el("strong", { text: (i + 1) + ". " }), it.text])].concat(lines)));
    });

    /* ---------- barem + citate ---------- */
    w.appendChild(h2("Barem orientativ", "barem", true));
    w.appendChild(list(P.barem));

    w.appendChild(h2("Citatele camerei (traducere proprie + original)", "citate"));
    Object.keys(C.citate).forEach(function (k) {
      var q = C.citate[k];
      w.appendChild(el("blockquote", { class: "quote" }, [
        el("p", { text: "„" + q.ro + "”" }),
        el("p", { lang: "en", class: "small" }, [el("em", { text: q.en })]),
        el("footer", { text: q.loc })
      ]));
    });
    w.appendChild(el("p", { class: "small muted", html:
      "Text integral: <a href=\"" + C.sursa.url + "\">" + C.sursa.nume + "</a>. Fișa poate fi copiată și folosită liber la clasă." }));
  }

  document.addEventListener("DOMContentLoaded", init);
})();
