# Lecturi care schimbă

Arcadă educativă în limba română cu clasici ai dezvoltării personale din domeniul public. Fiecare carte devine o **cameră** interactivă:

1. **Dosarul de indicii**: context, rezumat, citate scurte, glosar
2. **Breakout**: 4–5 lacăte; fiecare se deschide cu răspunsul corect **și** citatul care îl dovedește
3. **Două mini-jocuri**: „ordonare” (pune povestea în ordine) și „sapă” (mina de idei)
4. **Reflecție finală + „Aplică azi”**: exercițiu practic pentru adulți, cu un cartonaș care se poate copia sau tipări
5. **Fișa profesorului**: plan pentru o oră de 50 de minute, fișă de lucru tipăribilă, barem și discuție critică

Publicul vizat: elevi (joacă), profesori (fișă tipăribilă), adulți cititori de blog (aplică azi).

**Principii:** HTML/CSS/JS simplu, fără framework, fără backend, fără build. Nu există conturi, analytics sau cookie-uri. Progresul și notițele stau doar în `localStorage`, în browserul vizitatorului, și pot fi șterse din pagină.

## Structura

```
index.html                     Pagina de start (catalogul)
404.html                       Pagina de eroare pentru GitHub Pages
.nojekyll                      Oprește procesarea Jekyll pe GitHub Pages
assets/
  css/style.css                Tot stilul (teme luminoasă/întunecată, tipărire)
  js/util.js                   Utilitare: LCS.el, LCS.store (localStorage), shuffle, temă
  js/catalog.js                Randează catalogul din data/catalog.js
  js/room.js                   Motorul camerei: citește window.CAMERA și construiește pagina
  js/fisa.js                   Generează fișa profesorului din window.CAMERA.profesor
  img/favicon.svg
  img/hero-1717.webp, hero-1000.webp  Imaginea din bannerul paginii de start (WebP optimizat)
  hero.png                     Originalul imaginii; rezervă pentru browsere fără WebP
data/
  catalog.js                   Lista cărților (active și „în curând”)
carti/
  acres-of-diamonds/           Camera completă pentru Russell Conwell
    index.html                 Pagina camerei (doar un schelet; conținutul vine din data.js)
    fisa.html                  Fișa profesorului (tipăribilă)
    data.js                    TOT conținutul camerei
  _sablon/                     Șablon gol pentru o carte nouă
tools/
  verifica-camera.js           Verificare automată a unui data.js (Node.js)
```

Ideea de bază: **o cameră = un fișier de date**. `index.html` și `fisa.html` din fiecare cameră sunt identice ca structură. Tot ce ține de carte (citate, indicii, lacăte, jocuri, fișă) se află în `data.js`. Motorul (`room.js`, `fisa.js`) e comun.

Scripturile sunt clasice (nu module ES), așa că site-ul merge și deschis direct din fișier (`file://`), nu doar pe un server.

## Cum adaugi o carte nouă

1. **Copiază șablonul**
   ```bash
   cp -r carti/_sablon carti/as-a-man-thinketh
   ```
   Numele folderului = `id`-ul cărții (litere mici, cratime, fără diacritice).

2. **Completează `data.js`.** Folosește `carti/acres-of-diamonds/data.js` ca model complet. Pe scurt:
   - `citate`: banca de citate. Fiecare are `ro` (traducerea noastră), `en` (originalul) și `loc` (unde apare în text). Pentru autorii români, pune textul original în `ro` și lasă `en: ""`.
   - `dosar`: fișele de indicii. În `html` poți insera un citat cu `@@citat:cheie@@`.
   - `breakout.lacate`: pentru fiecare lacăt pui întrebarea, 3 opțiuni, indexul celei corecte, 3 citate (unul corect, două capcane), două indicii (răspuns greșit / citat greșit), explicația și litera primită. Literele tuturor lacătelor trebuie să formeze `breakout.cuvant`.
   - `jocuri`: tipurile disponibile sunt `"ordonare"` (`elemente` = lista în ordinea corectă; motorul o amestecă) și `"sapa"` (`elemente` = `{ text, da, explicatie }`).
   - `reflectie`, `aplicaAzi`, `profesor`: texte simple. Fișa profesorului se generează automat din ele.

3. **Actualizează textele fixe** din `index.html` și `fisa.html` ale camerei: `<title>`, `description` și nota din subsol (marcate cu TITLU / AUTOR / DESCRIERE).

4. **Activează cartea în catalog** (`data/catalog.js`): setează `stare: "activ"` și `url: "carti/<id>/"`.

5. **Verifică datele:**
   ```bash
   node tools/verifica-camera.js carti/<id>/data.js
   ```
   Scriptul verifică citatele referite, indexurile răspunsurilor, literele față de cuvântul-cheie, tipurile de joc și lungimea citatelor.

6. **Testează local:** `python3 -m http.server` în rădăcină, apoi deschide `http://localhost:8000`. Încearcă pe un ecran îngust (aproximativ 390px), pornește camera, deschide toate lacătele și tipărește fișa.

### Reguli de conținut

- **Doar domeniul public.** Verifică statutul textului în România (autor decedat de peste 70 de ani).
- **Traduceri proprii.** Pentru autorii de limbă engleză, lucrează din textul original (de exemplu de pe Project Gutenberg) și tradu singur citatele. Nu prelua traduceri românești existente: acestea pot fi protejate de drepturi de autor chiar dacă originalul nu mai este.
- **Citate scurte**, de cel mult o frază sau două (scriptul avertizează peste 45 de cuvinte). Pentru tăieturi folosește `[…]` atât în `ro`, cât și în `en`.
- **Lectură critică.** Fiecare cameră ar trebui să aibă cel puțin un lacăt sau o întrebare care pune autorul sub semnul întrebării (fapt vs. opinie, context istoric, ce lasă deoparte).
- **Teme sensibile.** Dacă textul original conține momente delicate, redă-le discret în cameră și semnalează-le profesorului în `profesor.atentie`.

## Publicare pe GitHub Pages

1. În repository: **Settings → Pages → Build and deployment → Source: Deploy from a branch**.
2. Alege ramura (de exemplu `main`) și folderul `/ (root)`, apoi salvează.
3. Site-ul apare la `https://<utilizator>.github.io/<repository>/`. Toate linkurile sunt relative, deci funcționează și dintr-un subfolder.

## Citatele din Conwell: verificate

Toate câmpurile `en` din `carti/acres-of-diamonds/data.js` au fost confruntate cuvânt cu cuvânt cu textul din `Surse/pg368.txt` (Project Gutenberg #368). Omisiunile sunt marcate cu `[…]`. Tot din sursă au fost verificate cifra de 833 de dolari (fermierul din Pennsylvania) și numărul de conferințe („almost five thousand times”).

## Licență

Textele originale ale autorilor sunt în domeniul public. Codul, traducerile citatelor, rezumatele, jocurile și fișele aparțin acestui proiect. Alege o licență (de exemplu MIT pentru cod și CC BY 4.0 pentru conținut) și adaug-o într-un fișier `LICENSE`.
