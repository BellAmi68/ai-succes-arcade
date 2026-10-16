/* Randează catalogul de pe pagina de start din window.CATALOG. */
(function () {
  "use strict";
  var el = LCS.el;

  function card(b) {
    var live = b.stare === "activ" && b.url;
    var spine = el("div", { class: "spine", style: "background:" + b.culoare }, [
      el("span", { class: "pill", text: live ? "Cameră deschisă" : "În curând" })
    ]);
    spine.insertAdjacentHTML("beforeend", LCS.gemSVG("rgba(255,255,255,.18)"));
    var meta = b.autor + (b.an ? " · " + b.an : "");
    var body = el("div", { class: "body" }, [
      el("h3", { text: b.titlu }),
      b.titluOriginal ? el("div", { class: "orig", text: "„" + b.titluOriginal + "”" }) : null,
      el("div", { class: "meta", text: meta }),
      el("p", { class: "teaser", text: b.teaser }),
      el("div", { class: "cta", text: live ? "Intră în cameră →" : "Camera e în construcție" })
    ]);
    if (live) {
      return el("a", { class: "book", href: b.url, "aria-label": b.titlu + ", de " + b.autor + " — intră în cameră" }, [spine, body]);
    }
    return el("div", { class: "book soon", "aria-label": b.titlu + ", de " + b.autor + " — în curând" }, [spine, body]);
  }

  function render() {
    var groups = { international: "catalog-international", romanesc: "catalog-romanesc" };
    (window.CATALOG || []).forEach(function (b) {
      var target = document.getElementById(groups[b.grup] || groups.international);
      if (target) target.appendChild(card(b));
    });
  }

  document.addEventListener("DOMContentLoaded", render);
})();
