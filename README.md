# Cărți care schimbă vieți

Escape room de lectură în limba română, cu clasici ai dezvoltării personale din domeniul public. Fiecare carte devine o **cameră** interactivă:

1. **Dosarul de indicii**: context, rezumat, citate scurte, glosar
2. **Breakout**: 4–5 lacăte; fiecare se deschide cu răspunsul corect **și** citatul care îl dovedește
3. **Două mini-jocuri**: „ordonare” (pune povestea în ordine), „sapă” (mina de idei), „potrivire” (perechi), „atenție” (exercițiu jucabil cu cronometru), „grădina” (sortezi gânduri în semințe și buruieni) sau „scenarii” (alegi reacția potrivită într-o situație de azi)
4. **Reflecție finală + „Aplică azi”**: exercițiu practic pentru adulți, cu un cartonaș care se poate copia sau tipări
5. **Fișa profesorului**: plan pentru o oră de 50 de minute, fișă de lucru tipăribilă, barem și discuție critică

Publicul vizat: elevi (joacă), profesori (fișă tipăribilă), adulți cititori de blog (aplică azi).

**Principii:** HTML/CSS/JS simplu, fără framework, fără backend, fără build. Nu există conturi, analytics sau cookie-uri. Progresul și notițele stau doar în `localStorage`, în browserul vizitatorului, și pot fi șterse din pagină.

## Structura

```
index.html                     Pagina de start (catalogul)
404.html                       Pagina de eroare pentru GitHub Pages
.nojekyll                      Oprește procesarea Jekyll pe GitHub Pages
CNAME                          Domeniul propriu (cartibune.aisucces.ro)
sitemap.xml                    Harta site-ului: pagina de start, camerele active și fișele profesorilor
robots.txt                     Permite indexarea și indică sitemap-ul
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
  the-art-of-money-getting/    Camera pentru P. T. Barnum (aceeași structură)
  the-science-of-getting-rich/ Camera pentru Wallace D. Wattles (aceeași structură)
  the-way-to-wealth/           Camera pentru Benjamin Franklin (aceeași structură)
  the-power-of-concentration/  Camera pentru Theron Q. Dumont / W. W. Atkinson (aceeași structură)
  as-a-man-thinketh/           Camera pentru James Allen (aceeași structură)
  the-psychology-of-salesmanship/  Camera pentru William Walker Atkinson (aceeași structură)
  a-message-to-garcia/         Camera pentru Elbert Hubbard (aceeași structură)
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
   - `jocuri`: tipurile disponibile sunt `"ordonare"` (`elemente` = lista în ordinea corectă; motorul o amestecă), `"sapa"` (`elemente` = `{ text, da, explicatie }`; `recompensa?` = `{ una, multe }`, ce primești la un răspuns corect, implicit `{ una: "Diamant", multe: "Diamante" }`), `"potrivire"` (`elemente` = `{ stanga, dreapta, original?, explicatie? }`; motorul amestecă variantele din dreapta, iar fișa profesorului primește automat cheia) și `"atentie"` (urmărești secundarul unui ceas și apeși când vârful se aprinde, ignorând notificări false; `durate` = secunde, `semnal` = `{ intervalMin, intervalMax, durata }`, `notificari` = texte, `citat?`; recordul se păstrează doar în `localStorage`), `"gradina"` (`etichete` = două texte, de exemplu `["Sămânță", "Buruiană"]`; `elemente` = `{ text, samanta, explicatie, citat? }`; după fiecare alegere apar justificarea și citatul din banca de citate, iar fișa profesorului primește automat cheia) și `"scenarii"` (`elemente` = `{ situatie, reactii, corect, explicatie, citat? }`; pentru fiecare situație alegi una dintre `reactii`, apoi apar reacția potrivită, justificarea și citatul-dovadă; fișa profesorului primește automat cheia; model: `carti/a-message-to-garcia/data.js`).
   - `reflectie`, `aplicaAzi`, `profesor`: texte simple. Fișa profesorului se generează automat din ele.
   - Opțional, în `aplicaAzi`: `calculator` (o cheltuială mică recurentă socotită pe un an; `frecvente` = `{ eticheta, peAn }`) și `jurnal` (tabel săptămânal tipăribil, după carnețelul lui Franklin; are nevoie de lista `virtuti` = `{ id, nume, ro }` la nivelul camerei și de 7 `zile`). Model: `carti/the-way-to-wealth/data.js`.
   - Opțional, în `aplicaAzi`: `provocare` (7 zile, câte un exercițiu cu cronometru; `minute`, `zile` = `{ titlu, sursa?, text }`, `citat?`). Bifele și notițele zilnice stau în `localStorage`, iar fișa profesorului primește automat o pagină tipăribilă. Model: `carti/the-power-of-concentration/data.js`.
   - Opțional, în `aplicaAzi`: `jurnalGanduri` (7 zile cu același gând negativ recurent, reformulat zilnic; `zile` = `{ titlu, text, citat? }`, `exempluGand?`, `notaSiguranta?`, `citat?`). Gândul și reformulările stau doar în `localStorage`, ultima reformulare intră în cartonaș, iar fișa profesorului primește automat o pagină tipăribilă. Model: `carti/as-a-man-thinketh/data.js`.
   - Opțional, în `aplicaAzi`: `bifat` (o listă scurtă de pași de bifat azi; `pasi` = `{ text, hint? }`, `titlu`, `instructiuni?`, `citat?`, `etichetaCartonas?`). Bifele stau doar în `localStorage`, pașii bifați intră în cartonaș, iar fișa profesorului primește lista tipăribilă după fișa elevului. Model: `carti/a-message-to-garcia/data.js`.
   - `sursa` poate fi un obiect `{ nume, url }` sau o listă de astfel de obiecte, când camera folosește mai multe texte.

3. **Actualizează textele fixe** din `index.html` și `fisa.html` ale camerei: `<title>`, `description` și nota din subsol (marcate cu TITLU / AUTOR / DESCRIERE).

4. **Activează cartea în catalog** (`data/catalog.js`): setează `stare: "activ"` și `url: "carti/<id>/"`.

5. **Adaugă camera în `sitemap.xml`** (în rădăcină): două rânduri noi înainte de `</urlset>`, cu URL-uri absolute pe domeniul propriu:
   ```xml
   <url><loc>https://cartibune.aisucces.ro/carti/<id>/</loc></url>
   <url><loc>https://cartibune.aisucces.ro/carti/<id>/fisa.html</loc></url>
   ```
   Sitemap-ul trebuie să conțină exact camerele cu `stare: "activ"` din catalog; cărțile „în curând” și `_sablon/` nu intră.

6. **Verifică datele:**
   ```bash
   node tools/verifica-camera.js carti/<id>/data.js
   ```
   Scriptul verifică citatele referite, indexurile răspunsurilor, literele față de cuvântul-cheie, tipurile de joc și lungimea citatelor. Cu `--sursa Surse/<text>.txt` verifică în plus că fiecare câmp `en` (și fiecare `original` din jocuri) apare exact în textul sursă; spațierea și liniuțele de subliniere prin care Gutenberg marchează italicul nu contează, iar `[…]` desparte fragmentele.

7. **Testează local:** `python3 -m http.server` în rădăcină, apoi deschide `http://localhost:8000`. Încearcă pe un ecran îngust (aproximativ 390px), pornește camera, deschide toate lacătele și tipărește fișa.

### Reguli de conținut

- **Doar domeniul public.** Verifică statutul textului în România (autor decedat de peste 70 de ani).
- **Traduceri proprii.** Pentru autorii de limbă engleză, lucrează din textul original (de exemplu de pe Project Gutenberg) și tradu singur citatele. Nu prelua traduceri românești existente: acestea pot fi protejate de drepturi de autor chiar dacă originalul nu mai este.
- **Citate scurte**, de cel mult o frază sau două (scriptul avertizează peste 45 de cuvinte). Pentru tăieturi folosește `[…]` atât în `ro`, cât și în `en`.
- **Lectură critică.** Fiecare cameră ar trebui să aibă cel puțin un lacăt sau o întrebare care pune autorul sub semnul întrebării (fapt vs. opinie, context istoric, ce lasă deoparte).
- **Teme sensibile.** Dacă textul original conține momente delicate, redă-le discret în cameră și semnalează-le profesorului în `profesor.atentie`.

## Publicare pe GitHub Pages

1. În repository: **Settings → Pages → Build and deployment → Source: Deploy from a branch**.
2. Alege ramura (de exemplu `main`) și folderul `/ (root)`, apoi salvează.
3. Site-ul este publicat pe domeniul propriu **https://cartibune.aisucces.ro/**, configurat prin fișierul `CNAME` din rădăcină. La furnizorul DNS al `aisucces.ro`, subdomeniul `cartibune` trebuie să aibă o înregistrare `CNAME` către `<utilizator>.github.io`; apoi bifează **Enforce HTTPS** în Settings → Pages.
4. Linkurile interne sunt relative, deci site-ul funcționează și fără domeniu propriu (`https://<utilizator>.github.io/<repository>/`) sau deschis local. URL-urile absolute sunt doar cel canonic din `index.html`, cele din `sitemap.xml` și linkul către sitemap din `robots.txt`.
5. **Indexare:** `robots.txt` permite accesul tuturor roboților (cu excepția șablonului `carti/_sablon/`) și indică `https://cartibune.aisucces.ro/sitemap.xml`. După publicare, sitemap-ul poate fi trimis și manual în Google Search Console.

## Citatele din Conwell: verificate

Toate câmpurile `en` din `carti/acres-of-diamonds/data.js` au fost confruntate cuvânt cu cuvânt cu textul din `Surse/pg368.txt` (Project Gutenberg #368). Omisiunile sunt marcate cu `[…]`. Tot din sursă au fost verificate cifra de 833 de dolari (fermierul din Pennsylvania) și numărul de conferințe („almost five thousand times”).

## Citatele din Barnum: verificate

Toate câmpurile `en` din `carti/the-art-of-money-getting/data.js` se regăsesc exact în `Surse/art-of-money-getting.txt` (Project Gutenberg #8581), cu ortografia sursei („to-day”, „indorse”, „he don't advertise”). Omisiunile sunt marcate cu `[…]`. Tot din sursă au fost verificate cifrele din dosar (canapeaua de 30.000 de dolari, biletul lui Genin de 225 de dolari, girurile de 5.000 și 10.000 de dolari, averea de 60.000 de dolari a showmanului din Holborn).

## Citatele din Wattles: verificate

Toate câmpurile `en` din `carti/the-science-of-getting-rich/data.js` se regăsesc exact în `Surse/science-of-getting-rich.txt` (Project Gutenberg #59844), cu ortografia și majusculele sursei („Certain Way”, „ALL”, „EFFICIENCY”). Omisiunile sunt marcate cu `[…]`. Tot din sursă au fost verificate detaliile din dosar (prețul de 1 dolar și editura Elizabeth Towne de pe pagina de titlu, blănurile de 500 de dolari și pușca de 50 de dolari din exemplul eschimosului, cele 17 capitole).

## Citatele din Franklin: verificate

Camera `carti/the-way-to-wealth/` folosește doar două porțiuni din surse: din `Surse/way-to-wealth.txt` (Project Gutenberg #43855, ediția W. & T. Darton, Londra, 1810) doar discursul lui Father Abraham și rama lui Poor Richard (de la „COURTEOUS READER” la semnătura „RICHARD SAUNDERS”), fără reclamele și introducerea editorului; din `Surse/franklin-autobiography.txt` (Project Gutenberg #20203) doar capitolul IX, „Plan for Attaining Moral Perfection” (cele 13 virtuți și carnețelul). Toate câmpurile `en` (citate, precepte, proverbe din jocuri) au fost căutate automat în aceste porțiuni și se regăsesc exact, cu ortografia sursei („expences”, „employ'd”, „extreams”, „cloaths”); singurele diferențe sunt spațierea și liniuțele de subliniere din Gutenberg, care marchează doar italicul. Omisiunile sunt marcate cu `[…]`. Traducerile sunt proprii. Castitatea (virtutea a 12-a) e pomenită doar cu numele și lipsește din jocuri și din tabel (vezi `profesor.atentie`).

## Citatele din Dumont: verificate

Toate câmpurile `en` din `carti/the-power-of-concentration/data.js` și toate frazele `original` din jocul de potrivire se regăsesc exact în `Surse/power-of-concentration.txt` (Project Gutenberg #1570), verificat automat cu `node tools/verifica-camera.js carti/the-power-of-concentration/data.js --sursa Surse/power-of-concentration.txt`. Omisiunile sunt marcate cu `[…]`. Traducerile sunt proprii. Camera folosește doar nucleul practic (lecțiile I, II, VI, IX, XIV, XV, XIX, XX); lecțiile despre influențarea altor oameni prin forța gândului nu au lacăte și apar doar ca exemplu critic. Maximele despre obicei din lecția a IX-a sunt preluate în carte, fără atribuire, din William James (*The Principles of Psychology*, 1890), lucru semnalat în dosar și în fișa profesorului.

## Citatele din Allen: verificate

Toate câmpurile `en` din `carti/as-a-man-thinketh/data.js` și toate frazele `original` din jocul de potrivire se regăsesc exact în `Surse/as-a-man-thinketh.txt` (Project Gutenberg #4507), verificat automat cu `node tools/verifica-camera.js carti/as-a-man-thinketh/data.js --sursa Surse/as-a-man-thinketh.txt`, cu majusculele sursei („MAN'S”, „UNTIL”, „CALMNESS”). Liniuțele de subliniere din Gutenberg (italicul) sunt omise; omisiunile sunt marcate cu `[…]`. Traducerile sunt proprii, făcute din original, fără a folosi traducerile românești existente. Afirmațiile absolute ale cărții despre sărăcie, suferință și boală apar doar ca material pentru lectura critică (lacătele 2 și 3, fișa „Pentru cititorul critic”), lucru semnalat și în `profesor.atentie`.

## Citatele din Atkinson: verificate

Toate câmpurile `en` din `carti/the-psychology-of-salesmanship/data.js` se regăsesc exact în `Surse/psychology-of-salesmanship.txt` (Project Gutenberg #41510), verificat automat cu `node tools/verifica-camera.js carti/the-psychology-of-salesmanship/data.js --sursa Surse/psychology-of-salesmanship.txt`, cu ortografia și punctuația sursei (ghilimele drepte, liniuța dublă „--”). Liniuțele de subliniere din Gutenberg (italicul) sunt omise; omisiunile sunt marcate cu `[…]`. Traducerile sunt proprii. Camera folosește doar nucleul practic: capitolul I (vânzarea ca proces psihologic), capitolele II–III (mintea vânzătorului), capitolul VII (cele zece etape ale cumpărătorului, pe care le urmează lacătele și jocurile) și capitolul VIII (abordarea), plus câteva fraze din capitolele IV–VI, IX și X. Tipologia frenologică din capitolele IV–V și limbajul rasist sau condescendent al epocii apar doar în fișa „Pentru cititorul critic” și în `profesor.atentie`. Atkinson e același autor ca Theron Q. Dumont; cele două camere au linkuri una către cealaltă.

## Citatele din Hubbard: verificate

Toate câmpurile `en` din `carti/a-message-to-garcia/data.js` se regăsesc exact în `Surse/a-message-to-garcia.txt` (Project Gutenberg #17195, ediția Roycroft din 1914), verificat automat cu `node tools/verifica-camera.js carti/a-message-to-garcia/data.js --sursa Surse/a-message-to-garcia.txt`, cu ortografia și punctuația sursei (ghilimele drepte, liniuța dublă „--”). Omisiunile sunt marcate cu `[…]`. Traducerile sunt proprii. Pe lângă eseul din 1899, camera folosește cuvântul-înainte din 1914 („Apologia” și „Horse Sense”), maxima de după eseu și o frază din crezul „Life in Abundance”, toate din aceeași carte; locul fiecărui citat e precizat în `loc`. Eseul e scurt, dar susține 5 lacăte: cele 15 citate din lacăte (câte unul corect și două capcane) sunt toate diferite, iar fiecare situație din jocul „Cine duce mesajul?” are un citat-dovadă propriu. Cifra de 40 de milioane de exemplare și povestea răspândirii în Rusia și Japonia sunt ale lui Hubbard și sunt prezentate ca atare. Misiunea lui Rowan e dramatizată în eseu; diferențele față de faptele istorice sunt rezumate prudent în fișa „Ce s-a întâmplat de fapt”, iar limbajul dur al eseului e semnalat în `profesor.atentie`.

## Licență

Textele originale ale autorilor sunt în domeniul public. Codul, traducerile citatelor, rezumatele, jocurile și fișele aparțin acestui proiect. Alege o licență (de exemplu MIT pentru cod și CC BY 4.0 pentru conținut) și adaug-o într-un fișier `LICENSE`.
