#!/usr/bin/env node
/* Verifică un fișier data.js de cameră înainte de publicare.
   Utilizare:  node tools/verifica-camera.js carti/acres-of-diamonds/data.js
               node tools/verifica-camera.js carti/<id>/data.js --sursa Surse/<text>.txt
   Cu --sursa (se poate repeta), fiecare câmp `en` din citate și fiecare `original` din jocuri
   trebuie să apară exact în textul sursă (spațierea și rupturile de rând nu contează; […] separă fragmentele).
   Fără dependențe; rulează cu orice Node.js recent. */
"use strict";
const fs = require("fs");
const vm = require("vm");

const args = process.argv.slice(2);
const sources = [];
for (let i = args.length - 1; i >= 0; i--) {
  if (args[i] === "--sursa") { sources.unshift(args[i + 1]); args.splice(i, 2); }
}
const file = args[0];
if (!file || sources.some((s) => !s)) { console.error("Dă calea către data.js (și, opțional, --sursa <fișier>)"); process.exit(2); }

const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(file, "utf8"), sandbox, { filename: file });
const C = sandbox.window.CAMERA;
const errors = [];
const err = (m) => errors.push(m);
const norm = (s) => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-zA-Z0-9]/g, "").toUpperCase();

if (!C) { console.error("window.CAMERA lipsește"); process.exit(1); }
["id", "titlu", "autor", "intro"].forEach((k) => { if (!C[k]) err(`câmp lipsă: ${k}`); });
const quotes = C.citate || {};

(C.dosar || []).forEach((d) => {
  (d.html.match(/@@citat:([A-Za-z0-9_-]+)@@/g) || []).forEach((m) => {
    const id = m.slice(8, -2);
    if (!quotes[id]) err(`dosar „${d.id}”: citat inexistent ${id}`);
  });
});

const B = C.breakout || {};
const letters = [];
(B.lacate || []).forEach((L) => {
  if (!(L.corect >= 0 && L.corect < L.optiuni.length)) err(`${L.id}: index „corect” invalid`);
  if (L.citateOptiuni.indexOf(L.citatCorect) === -1) err(`${L.id}: citatCorect nu e printre citateOptiuni`);
  L.citateOptiuni.forEach((q) => { if (!quotes[q]) err(`${L.id}: citat inexistent ${q}`); });
  letters.push(norm(L.litera));
});
if (letters.sort().join("") !== norm(B.cuvant).split("").sort().join("")) {
  err(`literele lacătelor (${letters.join("")}) nu formează cuvântul „${B.cuvant}”`);
}

(C.jocuri || []).forEach((g) => {
  if (["ordonare", "sapa", "potrivire", "atentie"].indexOf(g.tip) === -1) err(`joc „${g.id}”: tip necunoscut ${g.tip}`);
  if (g.tip === "atentie") {
    if (g.citat && !quotes[g.citat]) err(`joc „${g.id}”: citat inexistent ${g.citat}`);
    if (!(g.durate || []).length || !g.durate.every((d) => d > 0)) err(`joc „${g.id}”: „durate” are nevoie de cel puțin o durată în secunde`);
    if (!(g.notificari || []).length) err(`joc „${g.id}”: lipsesc „notificari”`);
  }
  if (g.tip === "potrivire") {
    const right = (g.elemente || []).map((e) => e.dreapta);
    (g.elemente || []).forEach((e, i) => { if (!e.stanga || !e.dreapta) err(`joc „${g.id}”: elementul ${i + 1} are nevoie de „stanga” și „dreapta”`); });
    if (new Set(right).size !== right.length) err(`joc „${g.id}”: două elemente au aceeași „dreapta”`);
  }
});

const A = C.aplicaAzi || {};
[A.calculator, A.jurnal, A.provocare].forEach((t) => {
  if (t && t.citat && !quotes[t.citat]) err(`aplicaAzi: citat inexistent ${t.citat}`);
});
if (A.calculator && !(A.calculator.frecvente || []).every((f) => f.eticheta && f.peAn > 0)) err("aplicaAzi.calculator: fiecare frecvență are nevoie de „eticheta” și „peAn” > 0");
if (A.provocare) {
  if ((A.provocare.zile || []).length !== 7) err("aplicaAzi.provocare: „zile” trebuie să aibă 7 elemente");
  if (!(A.provocare.minute > 0)) err("aplicaAzi.provocare: „minute” trebuie să fie > 0");
  (A.provocare.zile || []).forEach((z, i) => { if (!z.titlu || !z.text) err(`aplicaAzi.provocare: ziua ${i + 1} are nevoie de „titlu” și „text”`); });
}
if (A.jurnal) {
  if (!(C.virtuti || []).length) err("aplicaAzi.jurnal are nevoie de lista „virtuti”");
  if ((A.jurnal.zile || []).length !== 7) err("aplicaAzi.jurnal: „zile” trebuie să aibă 7 elemente");
  const ids = (C.virtuti || []).map((v) => v.id);
  if (new Set(ids).size !== ids.length) err("virtuti: id-uri duplicate");
}

Object.keys(quotes).forEach((k) => {
  const words = quotes[k].ro.split(/\s+/).length;
  if (words > 45) err(`citatul „${k}” are ${words} de cuvinte — păstrează citatele scurte`);
});

if (sources.length) {
  const flat = (t) => t.replace(/\s+/g, " ");
  const text = flat(sources.map((s) => fs.readFileSync(s, "utf8")).join("\n"));
  const check = (where, en) => {
    String(en).split("[…]").map((f) => flat(f).trim()).filter(Boolean).forEach((f) => {
      if (text.indexOf(f) === -1) err(`${where}: fragmentul nu apare în sursă: „${f}”`);
    });
  };
  Object.keys(quotes).forEach((k) => { if (quotes[k].en) check(`citatul „${k}”`, quotes[k].en); });
  (C.jocuri || []).forEach((g) => (g.elemente || []).forEach((e, i) => { if (e.original) check(`joc „${g.id}”, elementul ${i + 1}`, e.original); }));
}

if (errors.length) {
  console.error("Probleme găsite:\n- " + errors.join("\n- "));
  process.exit(1);
}
console.log(`OK: ${C.id} — ${Object.keys(quotes).length} citate, ${(C.dosar || []).length} indicii, ${(B.lacate || []).length} lacăte, ${(C.jocuri || []).length} jocuri.` +
  (sources.length ? ` Citatele se regăsesc exact în ${sources.join(", ")}.` : ""));
