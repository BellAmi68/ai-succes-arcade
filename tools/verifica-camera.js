#!/usr/bin/env node
/* Verifică un fișier data.js de cameră înainte de publicare.
   Utilizare:  node tools/verifica-camera.js carti/acres-of-diamonds/data.js
   Fără dependențe; rulează cu orice Node.js recent. */
"use strict";
const fs = require("fs");
const vm = require("vm");

const file = process.argv[2];
if (!file) { console.error("Dă calea către data.js"); process.exit(2); }

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
  if (["ordonare", "sapa"].indexOf(g.tip) === -1) err(`joc „${g.id}”: tip necunoscut ${g.tip}`);
});

Object.keys(quotes).forEach((k) => {
  const words = quotes[k].ro.split(/\s+/).length;
  if (words > 45) err(`citatul „${k}” are ${words} de cuvinte — păstrează citatele scurte`);
});

if (errors.length) {
  console.error("Probleme găsite:\n- " + errors.join("\n- "));
  process.exit(1);
}
console.log(`OK: ${C.id} — ${Object.keys(quotes).length} citate, ${(C.dosar || []).length} indicii, ${(B.lacate || []).length} lacăte, ${(C.jocuri || []).length} jocuri.`);
