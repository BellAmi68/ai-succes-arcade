/* Camera: „Acres of Diamonds” — Russell H. Conwell
   Toate traducerile citatelor sunt proprii, făcute din originalul englez.
   Sursa de referință: Project Gutenberg, eBook #368 (domeniu public).
   Structura acestui fișier este descrisă în README.md („Schema unei camere”). */
window.CAMERA = {
  id: "acres-of-diamonds",
  titlu: "Întinderi de diamante",
  titluOriginal: "Acres of Diamonds",
  autor: "Russell H. Conwell",
  ani: "1843–1925",
  tipText: "conferință (discurs public), text tipărit în 1890",
  culoare: "#0e6a70",
  sursa: {
    nume: "Project Gutenberg, eBook #368",
    url: "https://www.gutenberg.org/ebooks/368"
  },

  intro:
    "Un fermier bogat aude într-o seară despre diamante și, peste noapte, nu mai e mulțumit cu nimic. " +
    "Își vinde pământul și pleacă să caute comoara prin lume. Camera aceasta te întreabă: unde era, de fapt, comoara — " +
    "și ce spune povestea despre locul în care trăiești tu acum?",

  /* ---------- 1. Banca de citate (folosită de dosar, lacăte și fișă) ---------- */
  citate: {
    multumit: {
      en: "He was contented because he was wealthy, and wealthy because he was contented.",
      ro: "Era mulțumit pentru că era bogat și bogat pentru că era mulțumit.",
      loc: "Povestea lui Ali Hafed, începutul"
    },
    saracPesteNoapte: {
      en: "He had not lost anything, but he was poor because he was discontented, and discontented because he feared he was poor.",
      ro: "Nu pierduse nimic, dar era sărac pentru că era nemulțumit și nemulțumit pentru că se temea că e sărac.",
      loc: "Povestea lui Ali Hafed, după vizita preotului"
    },
    plecarea: {
      en: "So he sold his farm, collected his money, left his family in charge of a neighbor, and away he went in search of diamonds.",
      ro: "Așa că și-a vândut ferma, și-a strâns banii, și-a lăsat familia în grija unui vecin și a plecat în căutarea diamantelor.",
      loc: "Povestea lui Ali Hafed, plecarea"
    },
    piatraDinGradina: {
      en: "That is nothing but a stone we found right out here in our own garden.",
      ro: "Nu e decât o piatră pe care am găsit-o chiar aici, în grădina noastră.",
      loc: "Povestea lui Ali Hafed, succesorul"
    },
    acasa: {
      en: "Had Ali Hafed remained at home and dug in his own cellar, or underneath his own wheat-fields, or in his own garden, […] he would have had “acres of diamonds.”",
      ro: "Dacă Ali Hafed ar fi rămas acasă și ar fi săpat în propria pivniță, sub propriile lanuri de grâu sau în propria grădină, […] ar fi avut «întinderi de diamante».",
      loc: "Morala poveștii-ramă"
    },
    datoria: {
      en: "I say that you ought to get rich, and it is your duty to get rich.",
      ro: "Eu vă spun că ar trebui să vă îmbogățiți și că e datoria voastră să vă îmbogățiți.",
      loc: "Partea despre bani"
    },
    puterea: {
      en: "Money is power, and you ought to be reasonably ambitious to have it. You ought because you can do more good with it than you could without it.",
      ro: "Banii sunt putere și ar trebui să aveți ambiția rezonabilă de a-i avea. Ar trebui, pentru că puteți face mai mult bine cu ei decât fără ei.",
      loc: "Partea despre bani"
    },
    cinstiti: {
      en: "[…] ninety-eight out of one hundred of the rich men of America are honest. That is why they are rich.",
      ro: "[…] nouăzeci și opt din o sută de oameni bogați ai Americii sunt cinstiți. De asta sunt bogați.",
      loc: "Partea despre bani"
    },
    maretia: {
      en: "Greatness consists not in the holding of some future office, but really consists in doing great deeds with little means and the accomplishment of vast purposes from the private ranks of life.",
      ro: "Măreția nu stă în vreo funcție pe care o vei ocupa cândva, ci, cu adevărat, în a face fapte mari cu mijloace mici și în a împlini scopuri uriașe din rândurile oamenilor obișnuiți.",
      loc: "Finalul conferinței"
    },
    deUndeEsti: {
      en: "[…] you must begin where you are and what you are […]",
      ro: "[…] trebuie să începi de unde ești și cu ce ești […]",
      loc: "Finalul conferinței"
    }
  },

  /* ---------- 2. Dosarul de indicii ---------- */
  dosar: [
    {
      id: "autor",
      titlu: "Cine a fost Russell Conwell",
      html:
        "<p>Avocat, jurnalist, apoi pastor baptist în Philadelphia (SUA). În 1884 a început să predea seara unor tineri muncitori care nu-și permiteau școala; din acele cursuri s-a născut <strong>Temple University</strong>.</p>" +
        "<p>A ținut conferința „Acres of Diamonds” de aproape 5.000 de ori (după propria lui socoteală din ediția tipărită), timp de câteva decenii. Spunea că a folosit banii câștigați din ea ca să-i ajute pe studenți să-și plătească studiile.</p>"
    },
    {
      id: "gen",
      titlu: "Ce fel de text citim",
      html:
        "<p>Nu e un roman și nici un eseu, ci un <strong>discurs rostit</strong>. De aici vin anecdotele, glumele, întrebările adresate direct publicului și repetițiile.</p>" +
        "<p>Conwell îl adapta pentru fiecare oraș: vorbea despre „orașul vostru”, „străzile voastre”. Varianta tipărită cunoscută azi e cea rostită la Philadelphia.</p>" +
        "<ul><li>Indiciu: când citești, întreabă-te <em>cui</em> îi vorbește și <em>ce vrea să-l convingă</em> să facă.</li></ul>"
    },
    {
      id: "rama",
      titlu: "Povestea-ramă: cine o spune?",
      html:
        "<p>Conwell povestește că, cu mulți ani în urmă, pe când cobora pe Tigru și Eufrat, un bătrân ghid arab, angajat la Bagdad, îi spunea povești pe drum. Una dintre ele a devenit începutul conferinței.</p>" +
        "<p>Este deci o poveste <strong>în</strong> poveste: Conwell o repetă publicului, iar noi o citim azi.</p>"
    },
    {
      id: "ali",
      titlu: "Ali Hafed, fermierul mulțumit",
      html:
        "<p>Lângă râul Indus trăia un persan pe nume Ali Hafed. Avea o fermă mare, livezi, lanuri și grădini, bani dați cu dobândă și o familie.</p>" +
        "@@citat:multumit@@"
    },
    {
      id: "preot",
      titlu: "Vizita preotului",
      html:
        "<p>Într-o zi îl vizitează un preot bătrân, un înțelept, care îi povestește cum s-a format lumea și cum s-au născut diamantele. Îi spune că, având diamante, și-ar putea așeza copiii pe tronuri.</p>" +
        "<p>În seara aceea, Ali Hafed se culcă alt om:</p>" +
        "@@citat:saracPesteNoapte@@"
    },
    {
      id: "drum",
      titlu: "Drumul",
      html:
        "@@citat:plecarea@@" +
        "<p>Caută ani la rând, din Orient până în Palestina și apoi prin Europa. Cheltuiește tot. Moare departe de casă, sărac și fără speranță, la Barcelona.</p>"
    },
    {
      id: "gradina",
      titlu: "Grădina pe care a lăsat-o în urmă",
      html:
        "<p>Noul proprietar al fermei își duce cămila la adăpat în pârâul din grădină. În nisipul alb vede o sclipire: o piatră neagră cu „un ochi de lumină” în toate culorile curcubeului. O pune pe poliță, ca podoabă.</p>" +
        "<p>Când același preot trece pe acolo, recunoaște imediat un diamant. Gazda răspunde:</p>" +
        "@@citat:piatraDinGradina@@" +
        "<p>Așa ar fi fost descoperită, spune povestea, mina de diamante de la <strong>Golconda</strong>.</p>"
    },
    {
      id: "tipar",
      titlu: "Alte povești, același tipar",
      html:
        "<p>Conwell adaugă povești americane construite la fel:</p>" +
        "<ul>" +
        "<li><strong>California:</strong> un fermier își vinde ferma ca să caute aur în altă parte; pe pământul vândut se găsește aur.</li>" +
        "<li><strong>Pennsylvania:</strong> un fermier își vinde ferma (pentru 833 de dolari, spune Conwell) ca să lucreze în petrol, în Canada. Noul proprietar găsește petrol chiar în pârâul de lângă grajd.</li>" +
        "<li><strong>Massachusetts:</strong> un tânăr care studiase mineralogia pleacă departe, după un salariu mai mare, și vinde casa părintească. Noul proprietar găsește argint chiar în acea proprietate.</li>" +
        "</ul>" +
        "<p>Indiciu: compară-le. Ce au în comun? (Îți va trebui la lacăte.)</p>"
    },
    {
      id: "glosar",
      titlu: "Glosar",
      html:
        "<ul>" +
        "<li><strong>Acre (acru):</strong> unitate engleză de suprafață, cam 0,4 hectare. „Acres of diamonds” înseamnă, literal, „acri de diamante”; am tradus prin <em>întinderi de diamante</em>, ca să se înțeleagă imaginea: câmpuri întregi pline de comori.</li>" +
        "<li><strong>Golconda:</strong> regiune din India, celebră în trecut pentru diamantele ei; în engleză a ajuns sinonim cu „sursă de bogăție”.</li>" +
        "<li><strong>Indus:</strong> mare râu din Asia de Sud.</li>" +
        "<li><strong>Parabolă:</strong> poveste scurtă care ilustrează o învățătură.</li>" +
        "<li><strong>Metaforă:</strong> aici, „diamantele” = oportunități, talente, resurse.</li>" +
        "</ul>"
    },
    {
      id: "critic",
      titlu: "Pentru cititorul critic",
      html:
        "<p>În a doua parte, Conwell spune că oamenii au <em>datoria</em> să se îmbogățească și sugerează că sărăcia e adesea vina celui sărac. Era sfârșitul secolului XIX în SUA, epoca marilor averi industriale.</p>" +
        "@@citat:datoria@@" +
        "<p>Poți păstra o idee bună din povestea lui Ali Hafed fără să fii de acord cu tot ce spune autorul. Lacătul 5 te pune la încercare exact aici.</p>"
    }
  ],

  /* ---------- 3. Breakout: lacăte ---------- */
  breakout: {
    intro:
      "Cinci lacăte păzesc cufărul. Fiecare se deschide doar dacă alegi răspunsul corect <strong>și</strong> citatul care îl dovedește. " +
      "Lacătele deschise îți dau câte o literă. La final, aranjează literele în cuvântul-cheie.",
    lacate: [
      {
        id: "l1",
        titlu: "Lacătul 1 · Sărac peste noapte",
        intrebare: "Ce l-a făcut pe Ali Hafed „sărac” într-o singură seară?",
        optiuni: [
          "I-a ars ferma și și-a pierdut recolta.",
          "Nimic nu s-a schimbat în avere — s-a schimbat felul în care se uita la ce avea.",
          "Preotul i-a cerut bani pe care nu-i avea."
        ],
        corect: 1,
        citateOptiuni: ["plecarea", "saracPesteNoapte", "multumit"],
        citatCorect: "saracPesteNoapte",
        indiciuRaspuns: "Recitește indiciul „Vizita preotului”. Ce a pierdut, concret?",
        indiciuCitat: "Răspunsul e bun. Acum caută citatul care spune explicit că nu pierduse nimic.",
        explicatie: "Conwell construiește un paradox: averea nu se schimbă, dar nemulțumirea îl face să se simtă sărac. Citatul de la început („mulțumit pentru că era bogat…”) descrie starea dinainte, nu schimbarea.",
        litera: "C"
      },
      {
        id: "l2",
        titlu: "Lacătul 2 · Piatra de pe poliță",
        intrebare: "Unde se aflau, de fapt, diamantele pe care le căuta Ali Hafed?",
        optiuni: [
          "În munții Lunii, unde și-a început căutarea.",
          "Pe pământul pe care tocmai îl vânduse.",
          "La Barcelona, unde și-a încheiat călătoria."
        ],
        corect: 1,
        citateOptiuni: ["acasa", "plecarea", "puterea"],
        citatCorect: "acasa",
        indiciuRaspuns: "Citește indiciul „Grădina pe care a lăsat-o în urmă”.",
        indiciuCitat: "Corect! Dar care citat leagă explicit diamantele de pivnița, lanurile și grădina lui?",
        explicatie: "Ironia poveștii: tot ce căuta era sub picioarele lui. Citatul despre plecare arată doar decizia, nu locul comorii.",
        litera: "Ă"
      },
      {
        id: "l3",
        titlu: "Lacătul 3 · Tiparul",
        intrebare: "Poveștile din California, Pennsylvania și Massachusetts au aceeași structură ca a lui Ali Hafed. Ce le cere Conwell ascultătorilor?",
        optiuni: [
          "Să nu se mute niciodată din orașul natal.",
          "Să cumpere pământ ieftin de la vecini.",
          "Să înceapă cu ce au și acolo unde sunt, cercetând atent ce le e la îndemână."
        ],
        corect: 2,
        citateOptiuni: ["cinstiti", "deUndeEsti", "piatraDinGradina"],
        citatCorect: "deUndeEsti",
        indiciuRaspuns: "Atenție la extreme: Conwell nu interzice plecarea. Ce le cere oamenilor să facă mai întâi?",
        indiciuCitat: "Bun răspuns. Căutăm citatul care sună ca un îndemn adresat publicului.",
        explicatie: "„Nu pleca niciodată” e o lectură prea grăbită. Mesajul e: începe de unde ești, cu ce ești, și învață să recunoști valoarea din jurul tău.",
        litera: "A"
      },
      {
        id: "l4",
        titlu: "Lacătul 4 · Ce înseamnă să fii mare",
        intrebare: "Cum definește Conwell măreția la finalul conferinței?",
        optiuni: [
          "A face fapte mari cu mijloace mici, chiar dacă nu ai nicio funcție importantă.",
          "A ajunge într-o funcție înaltă și a fi cunoscut de toți.",
          "A strânge cea mai mare avere din oraș."
        ],
        corect: 0,
        citateOptiuni: ["datoria", "maretia", "puterea"],
        citatCorect: "maretia",
        indiciuRaspuns: "Gândește-te la cuvintele „mijloace mici” și „oameni obișnuiți”.",
        indiciuCitat: "Corect. Doar un citat folosește chiar cuvântul „măreție”.",
        explicatie: "Surprinzător, după tot discursul despre bani, Conwell nu leagă măreția de avere, ci de fapte făcute din poziția de om obișnuit.",
        litera: "S"
      },
      {
        id: "l5",
        titlu: "Lacătul 5 · Detectorul de opinii",
        intrebare: "Care dintre afirmațiile lui Conwell este o opinie prezentată ca fapt, fără dovezi, și merită pusă sub semnul întrebării?",
        optiuni: [
          "Că Ali Hafed și-a vândut ferma înainte să plece.",
          "Că aproape toți oamenii bogați sunt cinstiți și că tocmai de aceea sunt bogați.",
          "Că Golconda a fost o regiune celebră pentru diamante."
        ],
        corect: 1,
        citateOptiuni: ["plecarea", "multumit", "cinstiti"],
        citatCorect: "cinstiti",
        indiciuRaspuns: "Primul e un eveniment din poveste, al treilea poate fi verificat într-o enciclopedie. Care rămâne?",
        indiciuCitat: "Exact. Acum găsește citatul care conține afirmația — cu tot cu cifra ei.",
        explicatie: "„98 din 100” sună precis, dar Conwell nu dă nicio sursă. E o generalizare care servește argumentului lui. Cititorul critic întreabă: cine a numărat? Ce dovezi există?",
        litera: "A"
      }
    ],
    cuvant: "ACASĂ",
    indiciuCuvant: "Unde a fost comoara tot timpul?",
    mesajFinal:
      "Cufărul s-a deschis! Cuvântul-cheie e și morala lui Conwell: comoara era <strong>acasă</strong>. " +
      "Dar „acasă” nu înseamnă doar locul unde stai — înseamnă și ce știi deja, oamenii pe care îi cunoști și problemele pe care le vezi zilnic."
  },

  /* ---------- 4. Mini-jocuri ---------- */
  jocuri: [
    {
      id: "ordine",
      tip: "ordonare",
      titlu: "Joc 1 · Drumul lui Ali Hafed",
      instructiuni: "Așază momentele poveștii în ordinea corectă. Folosește săgețile, apoi apasă „Verifică”.",
      elemente: [
        "Ali Hafed trăiește mulțumit pe ferma lui de lângă Indus.",
        "Un preot bătrân îi vorbește despre diamante.",
        "Se culcă „sărac”, deși nu pierduse nimic.",
        "Își vinde ferma și pleacă în căutarea diamantelor.",
        "Rătăcește prin lume și moare departe de casă, la Barcelona.",
        "Noul proprietar găsește o piatră care sclipește în pârâul din grădină.",
        "Preotul recunoaște diamantul: se descoperă mina de la Golconda."
      ]
    },
    {
      id: "mina",
      tip: "sapa",
      titlu: "Joc 2 · Mina de idei",
      instructiuni: "Sapă în fiecare parcelă. Decide: ar susține Conwell ideea găsită? Răspuns corect = diamant.",
      etichete: ["Da, e ideea lui", "Nu, nu e ideea lui"],
      elemente: [
        { text: "Oportunitățile pot fi chiar în locul pe care îl cunoști cel mai bine.", da: true, explicatie: "Este chiar morala poveștii lui Ali Hafed." },
        { text: "Ca să reușești, trebuie să pleci cât mai departe.", da: false, explicatie: "Toate poveștile lui arată opusul: comoara rămâne în urma celui care pleacă." },
        { text: "Măreția înseamnă fapte mari făcute cu mijloace mici.", da: true, explicatie: "Aproape cuvânt cu cuvânt definiția lui de la final." },
        { text: "Doar cei care ajung în funcții înalte pot fi mari.", da: false, explicatie: "Conwell spune explicit că măreția nu stă într-o funcție." },
        { text: "Află mai întâi de ce au nevoie oamenii din jurul tău.", da: true, explicatie: "În conferință, negustorii de succes sunt cei care învață întâi ce le trebuie oamenilor." },
        { text: "Banii sunt răul în sine.", da: false, explicatie: "Conwell critică iubirea de bani, nu banii. Pentru el, banii sunt putere de a face bine." },
        { text: "Poți avea o comoară sub picioare și s-o ignori pentru că nu o recunoști.", da: true, explicatie: "Piatra din pârâu stă pe poliță ca podoabă până trece cineva care știe ce e." },
        { text: "Nemulțumirea te face automat mai bogat.", da: false, explicatie: "Pe Ali Hafed nemulțumirea l-a costat tot." },
        { text: "Banii pot fi folosiți ca să faci mai mult bine.", da: true, explicatie: "„Puteți face mai mult bine cu ei decât fără ei.”" }
      ]
    }
  ],

  /* ---------- 5. Reflecție + aplică azi ---------- */
  reflectie: {
    intrebari: [
      { id: "r1", text: "Ce „piatră pe poliță” ai putea avea tu? Ceva ce folosești ca podoabă, dar care ar putea valora mult mai mult.", hint: "o abilitate, un hobby, o relație, un loc" },
      { id: "r2", text: "Când e bine să pleci, totuși? Dă un exemplu în care a pleca e alegerea înțeleaptă.", hint: "gândește-te la diferența dintre a fugi și a căuta informat" },
      { id: "r3", text: "Cu ce idee a lui Conwell nu ești de acord? De ce?", hint: "lacătul 5 te poate ajuta" }
    ]
  },
  aplicaAzi: {
    titlu: "Aplică azi: inventarul curții tale",
    durata: "15 minute",
    intro: "Un exercițiu pentru cititorii adulți (merge și la clasă). Ali Hafed a vândut ferma fără să-și cerceteze pământul. Tu fă invers: înainte să cauți departe, sapă 15 minute în ce ai deja.",
    campuri: [
      { id: "resurse", eticheta: "1. Trei resurse pe care le ai deja", hint: "o abilitate, o relație, un loc, o experiență, un obiect", lung: true },
      { id: "nevoie", eticheta: "2. O nevoie reală pe care o observi în jurul tău", hint: "o problemă pe care o aud des colegii, vecinii, clienții, familia" },
      { id: "intalnire", eticheta: "3. Unde se întâlnesc? O resursă care ar putea răspunde acelei nevoi", hint: "o singură idee, nu un plan de afaceri" },
      { id: "pas", eticheta: "4. Primul pas de 20 de minute, azi", hint: "un mesaj trimis, o întrebare pusă, o schiță făcută" },
      { id: "ferma", eticheta: "5. (opțional) Ce „fermă” ești tentat să vinzi prea repede?", hint: "un proiect, o relație, un loc pe care îl subestimezi" }
    ],
    titluCartonas: "Diamantul meu de azi"
  },

  /* ---------- 6. Fișa profesorului ---------- */
  profesor: {
    rezumat: "O oră de 50 de minute care pornește de la o parabolă celebră și ajunge la lectură critică: elevii justifică fiecare răspuns cu un citat și învață să despartă o idee valoroasă de o generalizare nefondată.",
    nivel: "Clasele VII–XII (adaptabil); merge și la cercuri de lectură pentru adulți",
    durata: "50 de minute",
    discipline: "Limba și literatura română (lectură, argumentare), consiliere și dezvoltare personală, educație antreprenorială. Verificați corespondența cu programa clasei.",
    materiale: "Proiector sau telefoane (câte unul la 3–4 elevi); fișa de lucru tipărită; opțional, citatele tipărite separat.",
    obiective: [
      "să identifice structura unei parabole și morala ei;",
      "să justifice un răspuns cu un citat scurt, potrivit;",
      "să compare mai multe povești cu același tipar;",
      "să distingă un fapt de o opinie prezentată ca fapt;",
      "să formuleze o aplicație personală a ideii centrale."
    ],
    desfasurare: [
      { minute: "0–5", etapa: "Captarea atenției", activitate: "Întrebare pe tablă: „Dacă ai afla că la 100 de metri de școală e îngropată o comoară, cum ai căuta-o?” 3–4 răspunsuri rapide." },
      { minute: "5–15", etapa: "Dosarul de indicii", activitate: "În perechi, elevii citesc indiciile „Ali Hafed”, „Vizita preotului”, „Drumul”, „Grădina”. Fiecare pereche notează o întrebare." },
      { minute: "15–30", etapa: "Breakout (lacătele 1–4)", activitate: "Echipe de 3–4. Regulă: nu se apasă butonul până când toată echipa poate explica de ce citatul ales dovedește răspunsul." },
      { minute: "30–38", etapa: "Lacătul 5 + discuție", activitate: "Frontal: fapt sau opinie? Ce dovezi ne-ar trebui ca să verificăm „98 din 100”? Vezi întrebările de discuție de mai jos." },
      { minute: "38–45", etapa: "Mini-jocul „Mina de idei”", activitate: "Proiectat, pe echipe: fiecare echipă alege o parcelă și își argumentează decizia înainte de a apăsa." },
      { minute: "45–50", etapa: "Bilet de ieșire", activitate: "Itemul 7 din fișă sau, pe scurt: „Un «diamant» din școala/cartierul nostru este… pentru că…”" }
    ],
    fisaElev: {
      titlu: "Fișă de lucru · „Întinderi de diamante” (Russell H. Conwell)",
      instructiuni: "Răspunde pe scurt. Acolo unde ți se cere, sprijină-ți răspunsul pe un citat din dosar.",
      itemi: [
        { text: "Explică, cu cuvintele tale, paradoxul: „Nu pierduse nimic, dar era sărac pentru că era nemulțumit și nemulțumit pentru că se temea că e sărac.”", linii: 3 },
        { text: "Numește, în ordine, trei momente ale drumului lui Ali Hafed.", linii: 3 },
        { text: "Ce pot simboliza „diamantele” din poveste? Propune două interpretări diferite.", linii: 3 },
        { text: "Care este tiparul comun al poveștilor despre Ali Hafed și despre fermierul din Pennsylvania? Formulează-l într-o propoziție.", linii: 2 },
        { text: "Conwell spune că măreția înseamnă „a face fapte mari cu mijloace mici”. Ești de acord? Argumentează cu un exemplu din viața reală (o persoană pe care o cunoști sau despre care ai citit).", linii: 4 },
        { text: "„Nouăzeci și opt din o sută de oameni bogați ai Americii sunt cinstiți.” Este un fapt sau o opinie? Ce dovezi ți-ar trebui ca s-o verifici?", linii: 3 },
        { text: "Scrie o parabolă de 4–5 rânduri cu aceeași structură, petrecută în localitatea ta azi.", linii: 6 }
      ]
    },
    barem: [
      "1. Ali Hafed nu pierde nicio avere; se schimbă doar dorința și frica lui. Nemulțumirea și frica de sărăcie se alimentează reciproc. (Se acceptă orice formulare care arată că „sărăcia” e interioară.)",
      "2. De exemplu: vizita preotului → vânzarea fermei → rătăcirea prin lume / moartea departe → descoperirea diamantului în grădină.",
      "3. Oportunități, talente, cunoștințe, relații, resurse locale; sau: mulțumirea însăși. Orice interpretare justificată din text.",
      "4. Cineva pleacă departe după bogăție și abandonează exact locul unde se afla aceasta, descoperită apoi de altcineva.",
      "5. Răspuns deschis. Se punctează: poziție clară + exemplu concret + legătura cu citatul.",
      "6. Opinie prezentată ca fapt: cifra nu are sursă, iar „de asta sunt bogați” e o legătură cauzală nedemonstrată. Ar fi nevoie de date, de o definiție a „cinstei”, de o metodă de numărare.",
      "7. Se punctează: personaj care pleacă/renunță, resursă ignorată aproape, descoperire, morală. Originalitatea contează mai mult decât lungimea."
    ],
    discutie: [
      "Povestea spune „nu pleca niciodată”? Când e plecarea alegerea bună (studii, emigrare, siguranță)? Diferența dintre a fugi de ceva și a căuta informat.",
      "Conwell afirmă că e o datorie să te îmbogățești. Ce ar spune un om care muncește mult și rămâne sărac? Ce factori lasă autorul deoparte (context economic, sănătate, noroc, discriminare)?",
      "„Supraviețuitorii”: auzim doar poveștile celor care au găsit comoara acasă. Câți au săpat și n-au găsit nimic?",
      "Ce idee din text rezistă după toate aceste critici? (De obicei: atenția la resursele apropiate și la nevoile oamenilor din jur.)"
    ],
    diferentiere: [
      "Sprijin: lucrați doar cu lacătele 1, 2 și 4 și cu primul joc; citiți indiciile cu voce tare.",
      "Provocare: elevii caută în textul original (Gutenberg #368) un al doilea citat pentru lacătul 3 și îl traduc singuri.",
      "Cerc de lectură pentru adulți: săriți direct la discuția critică și la exercițiul „Aplică azi”."
    ],
    atentie: "În textul original, Ali Hafed moare prin sinucidere. În cameră, momentul este redat discret („moare departe de casă, sărac și fără speranță”), iar citatul este prescurtat. Dacă folosiți textul integral, pregătiți-vă pentru acest moment.",
    extensii: [
      "Temă: eseu argumentativ de 200 de cuvinte, „Comoara e acasă?”.",
      "Proiect: o hartă a „diamantelor” din cartier (oameni, locuri, meserii, nevoi nerezolvate).",
      "Comparație: povestea alchimistului care călătorește după o comoară aflată la punctul de plecare apare în multe culturi. Ce versiuni cunosc elevii?"
    ]
  }
};
