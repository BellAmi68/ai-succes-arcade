/* ŞABLON de cameră. Copiază folderul carti/_sablon în carti/<id-carte>/ și completează.
   Exemplul complet, funcțional: carti/acres-of-diamonds/data.js
   Regulă: pentru autorii de limbă engleză, citatele se traduc de noi din original (nu se preiau traduceri existente). */
window.CAMERA = {
  id: "id-carte",                 // identic cu numele folderului și cu id-ul din data/catalog.js
  titlu: "Titlul în română",
  titluOriginal: "Original Title", // "" pentru autorii români
  autor: "Autor",
  ani: "1800–1900",
  tipText: "eseu, 1900",
  culoare: "#0e6a70",
  sursa: { nume: "Project Gutenberg, eBook #000", url: "https://www.gutenberg.org/ebooks/000" },
  intro: "Două-trei fraze care stârnesc curiozitatea.",

  citate: {
    exemplu: { en: "Original sentence.", ro: "Traducerea noastră.", loc: "Unde apare în text" }
    // pentru texte românești: pune textul original în `ro` și lasă `en: ""`
  },

  dosar: [
    { id: "autor", titlu: "Cine a fost autorul", html: "<p>...</p>@@citat:exemplu@@" }
  ],

  breakout: {
    intro: "Cum se deschid lacătele.",
    lacate: [
      {
        id: "l1",
        titlu: "Lacătul 1 · ...",
        intrebare: "Întrebarea?",
        optiuni: ["A", "B", "C"],
        corect: 0,                          // indexul opțiunii corecte
        citateOptiuni: ["exemplu"],         // 3 chei din `citate` (una corectă + 2 capcane)
        citatCorect: "exemplu",
        indiciuRaspuns: "Indiciu când răspunsul e greșit.",
        indiciuCitat: "Indiciu când răspunsul e bun, dar citatul nu.",
        explicatie: "De ce e corect.",
        litera: "A"
      }
    ],
    cuvant: "A",                            // literele lacătelor formează acest cuvânt
    indiciuCuvant: "Indiciu pentru cuvânt.",
    mesajFinal: "Mesajul din cufăr."
  },

  jocuri: [
    { id: "ordine", tip: "ordonare", titlu: "Joc 1 · ...", instructiuni: "...", elemente: ["primul", "al doilea", "al treilea"] },
    { id: "mina", tip: "sapa", titlu: "Joc 2 · ...", instructiuni: "...", etichete: ["Da", "Nu"],
      elemente: [{ text: "Afirmație", da: true, explicatie: "De ce." }] }
  ],

  reflectie: { intrebari: [{ id: "r1", text: "Întrebare deschisă?", hint: "sugestie" }] },

  aplicaAzi: {
    titlu: "Aplică azi: ...",
    durata: "15 minute",
    intro: "...",
    campuri: [{ id: "c1", eticheta: "1. ...", hint: "..." }],
    titluCartonas: "..."
  },

  profesor: {
    rezumat: "", nivel: "", durata: "50 de minute", discipline: "", materiale: "",
    obiective: [""],
    desfasurare: [{ minute: "0–5", etapa: "", activitate: "" }],
    fisaElev: { titlu: "Fișă de lucru · ...", instructiuni: "", itemi: [{ text: "", linii: 3 }] },
    barem: [""],
    discutie: [""],
    diferentiere: [""],
    atentie: "",   // opțional: teme sensibile din textul original
    extensii: [""]
  }
};
