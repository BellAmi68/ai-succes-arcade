/* Camera: „The Way to Wealth” + cele 13 virtuți — Benjamin Franklin
   Toate traducerile citatelor sunt proprii, făcute din originalul englez.
   Surse (domeniu public), folosite doar în părțile indicate:
   - Surse/way-to-wealth.txt (Project Gutenberg #43855, ediția W. & T. Darton, Londra, 1810):
     doar discursul lui Father Abraham și rama lui Poor Richard, fără reclamele și introducerea editorului;
   - Surse/franklin-autobiography.txt (Project Gutenberg #20203): doar capitolul IX,
     „Plan for Attaining Moral Perfection” (cele 13 virtuți și carnețelul).
   Structura acestui fișier este descrisă în README.md. */
(function () {
  /* Cele 13 virtuți, cu preceptele lui Franklin. Castitatea (nr. 12) e lăsată deoparte
     în jocuri și în tabel; vezi profesor.atentie. */
  var VIRTUTI = [
    { id: "cumpatare", nume: "Cumpătare", en: "Temperance", preceptEn: "Eat not to dullness; drink not to elevation.", ro: "Nu mânca până te toropești; nu bea până te amețești." },
    { id: "tacere", nume: "Tăcere", en: "Silence", preceptEn: "Speak not but what may benefit others or yourself; avoid trifling conversation.", ro: "Nu spune decât ce poate folosi altora sau ție; ferește-te de vorbăria goală." },
    { id: "ordine", nume: "Ordine", en: "Order", preceptEn: "Let all your things have their places; let each part of your business have its time.", ro: "Fiecare lucru al tău să aibă locul lui; fiecare parte a treburilor tale, timpul ei." },
    { id: "hotarare", nume: "Hotărâre", en: "Resolution", preceptEn: "Resolve to perform what you ought; perform without fail what you resolve.", ro: "Hotărăște-te să faci ce trebuie; fă fără greș ce ți-ai hotărât." },
    { id: "chibzuinta", nume: "Chibzuință", en: "Frugality", preceptEn: "Make no expense but to do good to others or yourself; i. e., waste nothing.", ro: "Nu cheltui decât ca să faci bine altora sau ție; adică nu risipi nimic." },
    { id: "harnicie", nume: "Hărnicie", en: "Industry", preceptEn: "Lose no time; be always employ'd in something useful; cut off all unnecessary actions.", ro: "Nu pierde timpul; fii mereu ocupat cu ceva folositor; renunță la orice faptă de prisos." },
    { id: "sinceritate", nume: "Sinceritate", en: "Sincerity", preceptEn: "Use no hurtful deceit; think innocently and justly; and, if you speak, speak accordingly.", ro: "Nu folosi înșelăciuni care fac rău; gândește curat și drept și, când vorbești, vorbește la fel." },
    { id: "dreptate", nume: "Dreptate", en: "Justice", preceptEn: "Wrong none by doing injuries, or omitting the benefits that are your duty.", ro: "Nu nedreptăți pe nimeni, nici făcându-i rău, nici lipsindu-l de binele pe care ești dator să-l faci." },
    { id: "masura", nume: "Măsură", en: "Moderation", preceptEn: "Avoid extreams; forbear resenting injuries so much as you think they deserve.", ro: "Ferește-te de extreme; nu te supăra pe nedreptăți atât cât crezi că ar merita." },
    { id: "curatenie", nume: "Curățenie", en: "Cleanliness", preceptEn: "Tolerate no uncleanliness in body, cloaths, or habitation.", ro: "Nu tolera necurățenia pe trup, pe haine sau în casă." },
    { id: "liniste", nume: "Liniște", en: "Tranquillity", preceptEn: "Be not disturbed at trifles, or at accidents common or unavoidable.", ro: "Nu te tulbura din nimicuri sau din întâmplări obișnuite ori de neocolit." },
    { id: "smerenie", nume: "Smerenie", en: "Humility", preceptEn: "Imitate Jesus and Socrates.", ro: "Urmează-i pe Iisus și pe Socrate." }
  ];
  var IN_JOC = ["cumpatare", "tacere", "ordine", "hotarare", "chibzuinta", "harnicie", "sinceritate", "liniste"];

  window.CAMERA = {
    id: "the-way-to-wealth",
    titlu: "Cum să devii bogat și arta virtuții",
    titluOriginal: "The Way to Wealth",
    autor: "Benjamin Franklin",
    ani: "1706–1790",
    tipText: "discurs din almanahul pe 1758 + capitolul despre virtuți din „Autobiografie” (scris în 1784)",
    culoare: "#7a3b69",
    sursa: [
      { nume: "Project Gutenberg #43855 (The Way to Wealth)", url: "https://www.gutenberg.org/ebooks/43855" },
      { nume: "Project Gutenberg #20203 (Autobiografia)", url: "https://www.gutenberg.org/ebooks/20203" }
    ],

    intro:
      "Oamenii adunați la o licitație se plâng de taxe grele. Un bătrân, Father Abraham, le răspunde numai cu proverbe. " +
      "Peste ani, același Franklin care scrisese proverbele își notează seară de seară greșelile într-un carnețel. " +
      "Camera aceasta te întreabă: ce legătură e între felul în care îți cheltui banii și felul în care îți construiești caracterul?",

    virtuti: VIRTUTI,

    /* ---------- 1. Banca de citate ---------- */
    citate: {
      plangerea: {
        en: "Will not those heavy taxes quite ruin the country! How shall we be ever able to pay them?",
        ro: "Oare taxele astea grele nu vor ruina de tot țara? Cum o să le putem plăti vreodată?",
        loc: "The Way to Wealth · întrebarea din mulțime"
      },
      taxe: {
        en: "We are taxed twice as much by our idleness, three times as much by our pride, and four times as much by our folly; and from these taxes the commissioners cannot ease or deliver us by allowing an abatement.",
        ro: "Lenea ne taxează de două ori mai mult, mândria de trei ori, iar nechibzuința de patru ori; și de taxele acestea nu ne pot scăpa perceptorii, oricâtă reducere ne-ar da.",
        loc: "The Way to Wealth · începutul discursului"
      },
      timpul: {
        en: "But, dost thou love life? then do not squander time, for that is the stuff life is made of",
        ro: "Dar iubești viața? Atunci nu risipi timpul, căci din el e făcută viața",
        loc: "The Way to Wealth · I. Hărnicia"
      },
      speranta: {
        en: "Industry need not wish, and he that lives upon hope will die fasting.",
        ro: "Omul harnic n-are nevoie să tot dorească, iar cine trăiește din speranțe moare flămând.",
        loc: "The Way to Wealth · I. Hărnicia"
      },
      norocul: {
        en: "Diligence is the mother of good luck, and God gives all things to industry.",
        ro: "Hărnicia e mama norocului, iar Dumnezeu dă toate lucrurile celui harnic.",
        loc: "The Way to Wealth · I. Hărnicia"
      },
      spania: {
        en: "If you would be wealthy, think of saving, as well as of getting. The Indies have not made Spain rich, because her out-goes are greater than her incomes.",
        ro: "Dacă vrei să fii bogat, gândește-te să economisești, nu doar să câștigi. Indiile n-au îmbogățit Spania, pentru că ieșirile ei sunt mai mari decât intrările.",
        loc: "The Way to Wealth · III. Chibzuința"
      },
      gauraMica: {
        en: "[…] remember, \"Many a little makes a mickle.\" Beware of little expences; \"A small leak will sink a great ship,\" as Poor Richard says",
        ro: "[…] amintiți-vă: «Puțin cu puțin se face mult.» Feriți-vă de cheltuielile mici; «O gaură mică scufundă o corabie mare», cum spune Poor Richard",
        loc: "The Way to Wealth · III. Chibzuința"
      },
      cumparaInutil: {
        en: "Buy what thou hast no need of, and ere long thou shalt sell thy necessaries.",
        ro: "Cumpără ce nu-ți trebuie și în curând îți vei vinde lucrurile de care ai nevoie.",
        loc: "The Way to Wealth · III. Chibzuința (despre licitație)"
      },
      creditul: {
        en: "We are offered, by the terms of this sale, six months credit; and that, perhaps, has induced some of us to attend it, because we cannot spare the ready money, and hope now to be fine without it.",
        ro: "Condițiile licitației ne oferă credit pe șase luni; poate că asta i-a adus aici pe unii dintre noi: n-avem bani gheață, dar sperăm să ne gătim și fără ei.",
        loc: "The Way to Wealth · III. Despre datorii"
      },
      libertatea: {
        en: "But, ah! think what you do when you run in debt; you give to another power over your liberty",
        ro: "Dar, vai, gândiți-vă ce faceți când vă îndatorați: îi dați altuia putere asupra libertății voastre",
        loc: "The Way to Wealth · III. Despre datorii"
      },
      imprumut: {
        en: "If you would know the value of money, go and try to borrow some; for he that goes a borrowing, goes a sorrowing",
        ro: "Dacă vrei să afli cât valorează banii, du-te și încearcă să împrumuți; căci cine pleacă după împrumut pleacă după necaz",
        loc: "The Way to Wealth · III. Chibzuința"
      },
      minciuna: {
        en: "[…] by degrees, come to lose your veracity, and sink into base, downright lying; for, \"The second vice is lying, the first is running in debt,\" as Poor Richard says",
        ro: "[…] încetul cu încetul, ajungeți să vă pierdeți sinceritatea și să cădeți în minciuna josnică, pe față; căci «al doilea viciu e minciuna, primul e să te îndatorezi», cum spune Poor Richard",
        loc: "The Way to Wealth · III. Despre datorii"
      },
      binecuvantare: {
        en: "[…] do not depend too much upon your own industry, and frugality, and prudence, though excellent things; for they may all be blasted without the blessing of Heaven",
        ro: "[…] nu vă bizuiți prea mult pe propria hărnicie, chibzuință și prudență, oricât de bune ar fi; căci toate pot fi spulberate fără binecuvântarea Cerului",
        loc: "The Way to Wealth · IV. Încheierea"
      },
      sfatPurtare: {
        en: "We may give advice, but we cannot give conduct.",
        ro: "Putem da sfaturi, dar nu putem da și purtarea.",
        loc: "The Way to Wealth · IV. Încheierea"
      },
      peDos: {
        en: "The people heard it, and approved the doctrine, and immediately practised the contrary, just as if it had been a common sermon",
        ro: "Oamenii l-au ascultat, au aprobat învățătura și au făcut pe loc exact pe dos, ca și cum ar fi fost o predică oarecare",
        loc: "The Way to Wealth · după discurs (vorbește Poor Richard)"
      },
      nuEMeu: {
        en: "[…] not a tenth part of the wisdom was my own, which he ascribed to me; but rather the gleanings that I had made of the sense of all ages and nations.",
        ro: "[…] nici a zecea parte din înțelepciunea pe care mi-o atribuia nu era a mea, ci mai degrabă spice culese din mintea tuturor veacurilor și neamurilor.",
        loc: "The Way to Wealth · după discurs (vorbește Poor Richard)"
      },
      hainaVeche: {
        en: "[…] though I had at first determined to buy stuff for a new coat, I went away, resolved to wear my old one a little longer.",
        ro: "[…] deși hotărâsem la început să cumpăr stofă pentru o haină nouă, am plecat hotărât s-o mai port puțin pe cea veche.",
        loc: "The Way to Wealth · ultimele rânduri"
      },
      perfectiune: {
        en: "I wish'd to live without committing any fault at any time",
        ro: "Voiam să trăiesc fără să greșesc vreodată, în nicio clipă",
        loc: "Autobiografia · cap. IX, începutul"
      },
      obiceiuri: {
        en: "[…] the contrary habits must be broken, and good ones acquired and established, before we can have any dependence on a steady, uniform rectitude of conduct.",
        ro: "[…] obiceiurile potrivnice trebuie rupte, iar cele bune dobândite și statornicite, înainte să ne putem bizui pe o purtare dreaptă, statornică și neschimbătoare.",
        loc: "Autobiografia · cap. IX"
      },
      oSaptamana: {
        en: "I determined to give a week's strict attention to each of the virtues successively.",
        ro: "Am hotărât să dau, pe rând, fiecărei virtuți câte o săptămână de atenție strictă.",
        loc: "Autobiografia · cap. IX, metoda"
      },
      carnetul: {
        en: "I made a little book, in which I allotted a page for each of the virtues.",
        ro: "Mi-am făcut un carnețel în care am dat fiecărei virtuți câte o pagină.",
        loc: "Autobiografia · cap. IX, metoda"
      },
      punctNegru: {
        en: "[…] I might mark, by a little black spot, every fault I found upon examination to have been committed respecting that virtue upon that day.",
        ro: "[…] puteam însemna, cu un mic punct negru, fiecare greșeală pe care, cercetându-mă, o găseam făcută în ziua aceea împotriva virtuții respective.",
        loc: "Autobiografia · cap. IX, metoda"
      },
      gradina: {
        en: "[…] like him who, having a garden to weed, does not attempt to eradicate all the bad herbs at once, which would exceed his reach and his strength, but works on one of the beds at a time",
        ro: "[…] ca acela care, având de plivit o grădină, nu încearcă să smulgă toate buruienile deodată, lucru care i-ar depăși puterile, ci lucrează la câte un strat",
        loc: "Autobiografia · cap. IX, metoda"
      },
      plinDeGreseli: {
        en: "I was surpris'd to find myself so much fuller of faults than I had imagined; but I had the satisfaction of seeing them diminish.",
        ro: "Am fost surprins să mă descopăr mult mai plin de greșeli decât îmi închipuisem; dar am avut mulțumirea să le văd împuținându-se.",
        loc: "Autobiografia · cap. IX, rezultatele"
      },
      toporul: {
        en: "\"Yes,\" says the man, \"but I think I like a speckled ax best.\"",
        ro: "«Da», zice omul, «dar parcă-mi place mai mult un topor pătat.»",
        loc: "Autobiografia · cap. IX, povestea toporului"
      },
      ordinea: {
        en: "In truth, I found myself incorrigible with respect to Order",
        ro: "La drept vorbind, m-am dovedit de neîndreptat în privința Ordinii",
        loc: "Autobiografia · cap. IX, rezultatele"
      },
      maiBun: {
        en: "[…] tho' I never arrived at the perfection I had been so ambitious of obtaining, but fell far short of it, yet I was, by the endeavour, a better and a happier man than I otherwise should have been if I had not attempted it",
        ro: "[…] deși n-am ajuns niciodată la perfecțiunea la care râvneam, ci am rămas mult sub ea, efortul m-a făcut totuși un om mai bun și mai fericit decât aș fi fost dacă n-aș fi încercat",
        loc: "Autobiografia · cap. IX, bilanțul"
      },
      averea: {
        en: "To Temperance he ascribes his long-continued health […]; to Industry and Frugality, the early easiness of his circumstances and acquisition of his fortune",
        ro: "Cumpătării îi pune pe seamă sănătatea îndelungată […]; Hărniciei și Chibzuinței, traiul fără griji din tinerețe și dobândirea averii",
        loc: "Autobiografia · cap. IX, bilanțul la 79 de ani"
      },
      probitate: {
        en: "[…] no qualities were so likely to make a poor man's fortune as those of probity and integrity.",
        ro: "[…] nicio calitate nu e mai potrivită să-i facă averea unui om sărac decât cinstea și integritatea.",
        loc: "Autobiografia · cap. IX, cartea plănuită"
      },
      mandria: {
        en: "[…] even if I could conceive that I had compleatly overcome it, I should probably be proud of my humility.",
        ro: "[…] chiar dacă mi-aș închipui că am învins-o de tot, probabil că aș fi mândru de smerenia mea.",
        loc: "Autobiografia · cap. IX, finalul"
      }
    },

    /* ---------- 2. Dosarul de indicii ---------- */
    dosar: [
      {
        id: "autor",
        titlu: "Cine a fost Benjamin Franklin",
        html:
          "<p>S-a născut în 1706 la Boston, unul dintre cei 17 copii ai unui fabricant de lumânări și săpun. A făcut doar doi ani de școală, apoi a ucenicit ca tipograf la fratele lui. La 17 ani a fugit la Philadelphia, aproape fără bani.</p>" +
          "<p>Acolo a ajuns, pe rând, tipograf cu atelier propriu, editor de ziar, autorul unui almanah de succes, inventator (paratrăsnetul e al lui), om de știință, diplomat în Franța și unul dintre semnatarii Declarației de Independență a SUA (1776). A murit în 1790.</p>" +
          "<p>Pe la 65 de ani a început să-și scrie <strong>Autobiografia</strong>, în mai multe etape, fără s-o termine. Capitolul despre virtuți l-a scris în 1784, în Franța, „în al 79-lea an” al vieții, cum spune chiar el.</p>"
      },
      {
        id: "almanah",
        titlu: "Almanahul lui „Poor Richard”",
        html:
          "<p>Un <strong>almanah</strong> era o broșură anuală, vândută ieftin, aproape în fiecare casă: calendarul, fazele Lunii, răsăritul soarelui, prognoze de vreme, mici poezii. În multe case era, alături de Biblie, una dintre puținele cărți.</p>" +
          "<p>Între 1733 și 1758, Franklin a publicat în fiecare an un astfel de almanah sub un nume inventat: <strong>Richard Saunders</strong>, un astrolog sărac și cam fudul, „Poor Richard” (Bietul Richard). Printre date și calendare strecura proverbe scurte despre muncă, bani și bun-simț.</p>" +
          "<p>Pentru almanahul pe 1758, ultimul scris de el, Franklin a adunat proverbele într-un singur discurs, pus în gura unui bătrân. Textul s-a retipărit apoi separat, sub titlul <em>The Way to Wealth</em> („Calea spre bogăție”). Noi citim o ediție londoneză din 1810.</p>" +
          "<p>Atenție la vocea textului: Franklin scrie ca Poor Richard, care povestește ce a spus Father Abraham, care îl citează pe… Poor Richard. Iar Poor Richard recunoaște singur:</p>" +
          "@@citat:nuEMeu@@"
      },
      {
        id: "licitatie",
        titlu: "Scena: o licitație și o plângere despre taxe",
        html:
          "<p>Poor Richard își oprește calul lângă o mulțime adunată la o <strong>licitație</strong> de mărfuri. Vânzarea n-a început încă, așa că oamenii se plâng de vremuri grele. Cineva îl strigă pe un bătrân cu părul alb, curat și simplu îmbrăcat:</p>" +
          "@@citat:plangerea@@" +
          "<p>Bătrânul, <strong>Father Abraham</strong> (cam „Moș Avram”), se ridică și le răspunde. Nu le vorbește despre guvern, ci despre alte taxe, pe care și le pun singuri:</p>" +
          "@@citat:taxe@@" +
          "<p>Indiciu: ține minte aceste trei „taxe”. Tot discursul e construit pe ele.</p>"
      },
      {
        id: "harnicie",
        titlu: "I. Prima taxă: timpul pierdut",
        html:
          "<p>Father Abraham începe cu lenea. Pentru el, timpul e materia primă a vieții:</p>" +
          "@@citat:timpul@@" +
          "<p>Cine așteaptă vremuri mai bune doar visând nu câștigă nimic:</p>" +
          "@@citat:speranta@@" +
          "<p>Iar celor care se plâng că n-au găsit nicio comoară și că nicio rudă bogată nu le-a lăsat moștenire, le răspunde:</p>" +
          "@@citat:norocul@@"
      },
      {
        id: "chibzuinta",
        titlu: "II–III. Ce câștigi și ce păstrezi",
        html:
          "<p>Partea a doua spune pe scurt: ai grijă de treburile tale cu ochii tăi. Apoi vine partea cea mai lungă, despre <strong>chibzuință</strong> (economie):</p>" +
          "@@citat:spania@@" +
          "<p>Father Abraham știe ce gândesc ascultătorii: „un ceai, o băutură, haine ceva mai fine, puțină distracție din când în când, ce mare lucru?”</p>" +
          "@@citat:gauraMica@@" +
          "<p>Și le arată chiar marfa din jur, „găteli și mărunțișuri”:</p>" +
          "@@citat:cumparaInutil@@"
      },
      {
        id: "datorii",
        titlu: "Creditul pe șase luni",
        html:
          "<p>Licitația are o momeală: plătești mai târziu.</p>" +
          "@@citat:creditul@@" +
          "<p>Father Abraham nu vorbește doar despre bani. El descrie ce se întâmplă cu <em>omul</em> care nu-și poate plăti datoria: îi e rușine să-și vadă creditorul, se teme când vorbește cu el, inventează scuze.</p>" +
          "@@citat:libertatea@@" +
          "<p>Indiciu: urmărește lanțul până la capăt. Unde ajunge, pas cu pas, omul îndatorat? (Îți va trebui la lacătul 3.)</p>"
      },
      {
        id: "final",
        titlu: "Sfârșitul discursului (și o surpriză)",
        html:
          "<p>În încheiere, Father Abraham recunoaște că sfaturile nu ajung:</p>" +
          "@@citat:sfatPurtare@@" +
          "<p>Apoi licitația începe. Ce fac oamenii care tocmai l-au aplaudat?</p>" +
          "@@citat:peDos@@" +
          "<p>Singurul care se schimbă e povestitorul, Poor Richard:</p>" +
          "@@citat:hainaVeche@@"
      },
      {
        id: "carnet",
        titlu: "Carnețelul cu 13 virtuți",
        html:
          "<p>În tinerețe, Franklin își propune ceva foarte îndrăzneț:</p>" +
          "@@citat:perfectiune@@" +
          "<p>Descoperă repede că nu merge doar cu voință: când se păzește de o greșeală, îl prinde alta. Concluzia lui:</p>" +
          "@@citat:obiceiuri@@" +
          "<p>Își alcătuiește o listă de <strong>13 virtuți</strong>, fiecare cu o regulă scurtă (un <em>precept</em>): Cumpătare, Tăcere, Ordine, Hotărâre, Chibzuință, Hărnicie, Sinceritate, Dreptate, Măsură, Curățenie, Liniște, Castitate, Smerenie. Apoi inventează o metodă:</p>" +
          "@@citat:carnetul@@" +
          "<p>Fiecare pagină are 7 coloane (zilele săptămânii) și 13 rânduri (virtuțile). Seara se verifică:</p>" +
          "@@citat:punctNegru@@" +
          "<p>Indiciu: câte virtuți „lucrează” el într-o săptămână? Caută comparația cu grădina în fișa următoare.</p>"
      },
      {
        id: "gradina",
        titlu: "Un strat de grădină pe rând",
        html:
          "<p>Franklin nu încearcă toate virtuțile deodată.</p>" +
          "@@citat:oSaptamana@@" +
          "@@citat:gradina@@" +
          "<p>În prima săptămână urmărește doar Cumpătarea; dacă rândul ei rămâne fără puncte negre, adaugă și Tăcerea, și tot așa. 13 săptămâni = un ciclu complet, deci patru cicluri pe an.</p>"
      },
      {
        id: "bilant",
        titlu: "Ce a ieșit din experiment",
        html:
          "@@citat:plinDeGreseli@@" +
          "<p>Cel mai greu i-a fost cu Ordinea. Franklin povestește despre un om care voia un topor lustruit pe toată suprafața, nu doar pe tăiș. Fierarul îl lustruia pe piatra de ascuțit, dacă omul învârtea roata. Omul a obosit repede:</p>" +
          "@@citat:toporul@@" +
          "@@citat:ordinea@@" +
          "<p>Bilanțul lui, la bătrânețe:</p>" +
          "@@citat:maiBun@@" +
          "@@citat:averea@@"
      },
      {
        id: "glosar",
        titlu: "Glosar",
        html:
          "<ul>" +
          "<li><strong>Almanah:</strong> broșură anuală cu calendar, date astronomice, prognoze și texte scurte.</li>" +
          "<li><strong>Licitație:</strong> vânzare publică în care marfa merge la cel care oferă mai mult.</li>" +
          "<li><strong>Credit:</strong> iei marfa acum și plătești mai târziu. <strong>Creditor:</strong> cel căruia îi datorezi bani.</li>" +
          "<li><strong>Închisoarea pentru datornici:</strong> în epoca lui Franklin, cine nu-și plătea datoriile putea fi închis. Discursul pomenește chiar asta.</li>" +
          "<li><strong>Mickle:</strong> cuvânt vechi pentru „mult”. „Many a little makes a mickle” = „puțin cu puțin se face mult”.</li>" +
          "<li><strong>Chibzuință (frugality):</strong> a cheltui cu socoteală, fără risipă. Nu înseamnă zgârcenie.</li>" +
          "<li><strong>Precept:</strong> regulă scurtă de purtare.</li>" +
          "<li><strong>Virtute:</strong> un obicei bun, exersat până devine parte din caracter.</li>" +
          "</ul>"
      },
      {
        id: "critic",
        titlu: "Pentru cititorul critic",
        html:
          "<p>Franklin leagă direct caracterul de bani:</p>" +
          "@@citat:probitate@@" +
          "<p>Sună convingător, dar e bilanțul unui om care a reușit, scris după ce a reușit. Chiar Father Abraham admite, la final, că munca și economia nu garantează nimic:</p>" +
          "@@citat:binecuvantare@@" +
          "<p>Și încă ceva: Franklin însuși a deținut, o parte din viață, oameni înrobiți; abia la bătrânețe a devenit președintele unei societăți care lupta pentru abolirea sclaviei. O listă de virtuți nu spune totul despre cine o scrie. Lacătul 5 te pune la încercare exact aici.</p>"
      }
    ],

    /* ---------- 3. Breakout: lacăte (decor: loturile licitației) ---------- */
    breakout: {
      intro:
        "Licitația încă n-a început. Pe masa licitatorului stau cinci loturi, fiecare încuiat cu un lacăt. " +
        "Un lacăt se deschide doar dacă alegi răspunsul corect <strong>și</strong> citatul care îl dovedește. " +
        "Primele trei loturi sunt despre bani, ultimele două despre virtuți. Fiecare lacăt deschis îți dă o literă; la final, compune cuvântul-cheie.",
      lacate: [
        {
          id: "l1",
          titlu: "Lotul 1 · Moștenirea care n-a venit",
          intrebare: "Un om din mulțime se plânge: „N-am găsit nicio comoară și nicio rudă bogată nu mi-a lăsat moștenire.” Ce i-ar răspunde Father Abraham?",
          optiuni: [
            "Să aștepte cu răbdare vremuri mai bune; norocul vine singur.",
            "Că hărnicia e mama norocului: cine muncește constant își face singur șansele.",
            "Să cumpere ieftin la licitație și să revândă mai scump."
          ],
          corect: 1,
          citateOptiuni: ["norocul", "taxe", "cumparaInutil"],
          citatCorect: "norocul",
          indiciuRaspuns: "Recitește fișa „I. Prima taxă: timpul pierdut”. Ce crede Father Abraham despre cei care trăiesc din speranțe?",
          indiciuCitat: "Răspunsul e bun. Caută acum citatul care pomenește chiar cuvântul „noroc”.",
          explicatie: "Pentru Father Abraham, norocul nu e o moștenire, ci un rezultat: „hărnicia e mama norocului”. Citatul despre taxe arată doar problema, nu soluția.",
          litera: "A"
        },
        {
          id: "l2",
          titlu: "Lotul 2 · Ceaiul de la licitație",
          intrebare: "Cineva spune: „Un ceai, o băutură, o haină ceva mai fină din când în când… ce mare lucru?” Ce îi răspunde Father Abraham?",
          optiuni: [
            "Are dreptate: banii mari se pierd doar la cheltuielile mari.",
            "Să nu cumpere niciodată nimic de plăcere.",
            "Cheltuielile mici, repetate, se adună în sume mari și pot scufunda un buget întreg."
          ],
          corect: 2,
          citateOptiuni: ["spania", "gauraMica", "norocul"],
          citatCorect: "gauraMica",
          indiciuRaspuns: "Atenție la extreme: Father Abraham nu interzice orice plăcere. Ce spune despre cheltuielile mici?",
          indiciuCitat: "Corect! Citatul despre Spania vorbește despre intrări și ieșiri în general. Căutăm unul despre lucrurile mici.",
          explicatie: "„O gaură mică scufundă o corabie mare.” Problema nu e un ceai, ci ceaiul de fiecare zi. Vei calcula chiar tu, la „Aplică azi”, cât face o asemenea gaură pe un an.",
          litera: "V"
        },
        {
          id: "l3",
          titlu: "Lotul 3 · Plătești peste șase luni",
          intrebare: "Licitația oferă credit pe șase luni. De ce spune Father Abraham că datoria e periculoasă nu doar pentru buzunar, ci și pentru caracter?",
          optiuni: [
            "Pentru că cel care nu-și poate plăti datoria începe să se ascundă, să se scuze și, încetul cu încetul, ajunge să mintă.",
            "Pentru că dobânzile din epocă erau foarte mari.",
            "Pentru că cine se împrumută nu mai are voie să cumpere de la licitație."
          ],
          corect: 0,
          citateOptiuni: ["imprumut", "minciuna", "gauraMica"],
          citatCorect: "minciuna",
          indiciuRaspuns: "Recitește fișa „Creditul pe șase luni”. Ce simte și ce face, pas cu pas, omul care nu poate plăti?",
          indiciuCitat: "Răspunsul e corect. Acum găsește citatul care leagă datoria de un viciu.",
          explicatie: "Aici e puntea dintre bani și caracter: „al doilea viciu e minciuna, primul e să te îndatorezi”. Citatul despre împrumut vorbește despre griji, nu despre minciună.",
          litera: "E"
        },
        {
          id: "l4",
          titlu: "Lotul 4 · Carnețelul lui Franklin",
          intrebare: "Oamenii de la licitație au aprobat sfaturile și au făcut imediat pe dos. Cu propriile virtuți, Franklin a încercat altceva. Ce anume?",
          optiuni: [
            "Și-a propus să le respecte pe toate 13 deodată, începând de a doua zi.",
            "A citit lista de virtuți de atâtea ori încât a învățat-o pe de rost.",
            "S-a concentrat pe o singură virtute pe săptămână și și-a notat în fiecare seară greșelile într-un tabel."
          ],
          corect: 2,
          citateOptiuni: ["perfectiune", "oSaptamana", "peDos"],
          citatCorect: "oSaptamana",
          indiciuRaspuns: "Recitește fișele „Carnețelul cu 13 virtuți” și „Un strat de grădină pe rând”.",
          indiciuCitat: "Bun răspuns. Primul citat arată ținta lui, nu metoda. Care descrie metoda?",
          explicatie: "Franklin a înțeles ce nu înțeleseseră oamenii de la licitație: a ști nu înseamnă a face. Un obicei se construiește pe rând, „câte un strat de grădină”, cu verificare zilnică.",
          litera: "R"
        },
        {
          id: "l5",
          titlu: "Lotul 5 · Bilanțul de la 79 de ani",
          intrebare: "La bătrânețe, Franklin își face bilanțul. Ce afirmă despre virtuți și bani și cum ar trebui să citim afirmația?",
          optiuni: [
            "Că după 13 săptămâni a devenit perfect, deci metoda funcționează sigur pentru oricine.",
            "Că averea o datorează Hărniciei și Chibzuinței. E însă explicația lui despre propriul succes, dată după ce a reușit: un singur caz nu dovedește o regulă.",
            "Că banii n-au nicio legătură cu felul în care trăiești."
          ],
          corect: 1,
          citateOptiuni: ["maiBun", "averea", "taxe"],
          citatCorect: "averea",
          indiciuRaspuns: "Franklin recunoaște singur că n-a ajuns la perfecțiune. Iar a treia variantă contrazice tot ce ai citit. Care rămâne?",
          indiciuCitat: "Exact. Căutăm citatul în care apar și virtuțile, și averea.",
          explicatie: "Legătura caracter–bani e chiar teza lui Franklin. Cititorul critic se întreabă însă: ce lasă deoparte? Norocul, epoca, ajutorul altora, poate și munca oamenilor înrobiți pe care i-a deținut. Chiar Father Abraham admite că munca și chibzuința „pot fi spulberate”.",
          litera: "E"
        }
      ],
      cuvant: "AVERE",
      indiciuCuvant: "Ce speră să obțină toți cei adunați la licitație?",
      mesajFinal:
        "Cufărul s-a deschis! Cuvântul-cheie e <strong>AVERE</strong>. Uită-te însă de unde au venit literele: din muncă, din cheltuieli mici ținute în frâu, din datorii evitate și din obiceiuri exersate seară de seară. " +
        "Pentru Franklin, averea nu se cumpără la licitație, ci se construiește din caracter. Iar lacătul 5 îți amintește că și ideea asta trebuie verificată."
    },

    /* ---------- 4. Mini-jocuri ---------- */
    jocuri: [
      {
        id: "proverbe",
        tip: "potrivire",
        titlu: "Joc 1 · Proverbul și lecția",
        instructiuni: "Fiecare proverb al lui Poor Richard ascunde o lecție despre bani. Alege, pentru fiecare, lecția potrivită, apoi apasă „Verifică”.",
        elemente: [
          { stanga: "„Puțin cu puțin se face mult.”", original: "Many a little makes a mickle.", dreapta: "Sumele mici, repetate des, se adună în sume mari.", explicatie: "Exact ce vei calcula la „Aplică azi”." },
          { stanga: "„Cumpără ce nu-ți trebuie și în curând îți vei vinde lucrurile de care ai nevoie.”", original: "Buy what thou hast no need of, and ere long thou shalt sell thy necessaries.", dreapta: "Cumpărăturile inutile te pot lăsa fără cele necesare.", explicatie: "Spus chiar în fața mărfii de la licitație." },
          { stanga: "„La un chilipir mare, oprește-te o clipă.”", original: "At a great pennyworth pause a while", dreapta: "O ofertă foarte avantajoasă merită verificată: chiar îți trebuie?", explicatie: "Father Abraham explică: ieftinătatea poate fi doar aparentă." },
          { stanga: "„Cine pleacă după împrumut pleacă după necaz.”", original: "he that goes a borrowing, goes a sorrowing", dreapta: "Împrumutul aduce după el griji.", explicatie: "Abia când ceri bani afli cât valorează." },
          { stanga: "„Dacă tot scoți din covata cu făină și nu pui niciodată la loc, ajungi repede la fund.”", original: "Always taking out of the meal-tub, and never putting in, soon comes to the bottom", dreapta: "Dacă doar cheltui din economii și nu pui nimic deoparte, ele se termină.", explicatie: "Spus despre cei care moștenesc o avere și cred că nu se termină niciodată." },
          { stanga: "„E mai ușor să construiești două hornuri decât să ții unul cu lemne.”", original: "It is easier to build two chimneys, than to keep one in fuel", dreapta: "Întreținerea unui lucru poate costa mai mult decât cumpărarea lui.", explicatie: "Gândește-te la un telefon, o mașină sau un abonament." },
          { stanga: "„Înainte să-ți asculți pofta, ascultă-ți punga.”", original: "Ere fancy you consult, consult your purse.", dreapta: "Întâi verifici bugetul, abia apoi dorința.", explicatie: "„Fancy” înseamnă aici capriciu, poftă de moment." },
          { stanga: "„Timpul pierdut nu se mai găsește niciodată.”", original: "Lost time is never found again", dreapta: "Timpul e o resursă care, odată risipită, nu se mai întoarce.", explicatie: "Prima „taxă” din discurs e chiar lenea." }
        ]
      },
      {
        id: "virtuti",
        tip: "potrivire",
        titlu: "Joc 2 · Virtutea și regula ei",
        instructiuni: "Franklin a dat fiecărei virtuți o regulă scurtă. Potrivește virtutea cu regula ei, așa cum a scris-o el.",
        elemente: VIRTUTI.filter(function (v) { return IN_JOC.indexOf(v.id) !== -1; }).map(function (v) {
          return { stanga: v.nume, original: v.en, dreapta: "„" + v.ro + "”" };
        })
      }
    ],

    /* ---------- 5. Reflecție + aplică azi ---------- */
    reflectie: {
      intrebari: [
        { id: "r1", text: "Care e „gaura mică” din bugetul tău (sau al familiei tale)? Ai fi ghicit cât face pe un an, înainte de calculator?", hint: "gustări, livrări, abonamente uitate, jocuri cu microplăți" },
        { id: "r2", text: "Oamenii de la licitație au aprobat sfaturile și au făcut exact pe dos. De ce e atât de greu să faci ce știi că e bine?", hint: "obiceiul, grupul, oferta „de nerefuzat”, plata amânată" },
        { id: "r3", text: "Franklin își pune averea pe seama hărniciei și chibzuinței. Ce alți factori pot conta? E caracterul suficient?", hint: "noroc, familie, epocă, sănătate, ajutorul altora" }
      ]
    },
    aplicaAzi: {
      titlu: "Aplică azi: gaura mică și carnețelul",
      durata: "15 minute + un minut în fiecare seară, o săptămână",
      intro: "Un exercițiu pentru cititorii adulți (merge și la clasă), în două părți. Întâi cauți „gaura mică” din bugetul tău, ca Father Abraham. Apoi alegi o singură virtute și o urmărești o săptămână, ca Franklin.",
      calculator: {
        titlu: "Partea 1 · Calculatorul găurii mici",
        intro: "Alege o cheltuială mică pe care o faci des: o cafea la pahar, o gustare, o livrare, un abonament uitat. Scrie cât costă o dată și cât de des o faci.",
        citat: "gauraMica",
        moneda: "lei",
        exempluCe: "de exemplu: cafea la pahar",
        exempluSuma: "de exemplu: 12",
        frecvente: [
          { eticheta: "în fiecare zi", peAn: 365 },
          { eticheta: "în zilele lucrătoare", peAn: 260 },
          { eticheta: "de 3 ori pe săptămână", peAn: 156 },
          { eticheta: "o dată pe săptămână", peAn: 52 },
          { eticheta: "o dată pe lună", peAn: 12 }
        ],
        intrebare: "Nu e nevoie să renunți de tot. Ce ai face cu jumătate din suma asta?",
        etichetaCartonas: "Gaura mea mică, pe un an"
      },
      jurnal: {
        titlu: "Partea 2 · Pagina ta din carnețelul lui Franklin",
        intro: "Alege o singură virtute pentru săptămâna asta. În fiecare seară, apasă (sau, pe hârtie, desenează) câte un punct în căsuța zilei pentru fiecare abatere. Ținta, ca la Franklin: un rând fără puncte. Celelalte rânduri sunt doar pentru observat.",
        citat: "punctNegru",
        antet: "Carnețelul virtuților · după Benjamin Franklin",
        zile: ["L", "Ma", "Mi", "J", "V", "S", "D"],
        instructiuniTabel: "Apasă pe o căsuță ca să adaugi un punct (până la trei; a patra apăsare o golește). Rândul evidențiat e virtutea săptămânii. Pentru varianta pe hârtie, tipărește tabelul gol."
      },
      titluCampuri: "Partea 3 · Cartonașul tău",
      campuri: [
        { id: "taie", eticheta: "1. Cheltuiala mică pe care o reduc (și cu cât)", hint: "de exemplu: cafeaua de la automat, de la 5 la 2 pe săptămână", lung: false },
        { id: "bani", eticheta: "2. Ce fac cu banii păstrați", hint: "un scop concret: un fond de urgență, o carte, un cadou, o datorie plătită mai repede" },
        { id: "virtute", eticheta: "3. Virtutea mea din săptămâna asta", hint: "una singură, ca Franklin", lung: false },
        { id: "regula", eticheta: "4. Regula mea, scrisă scurt, ca un precept", hint: "„Nu deschid aplicația de cumpărături după ora 22.” / „Îmi pun lucrurile la loc înainte de culcare.”" },
        { id: "seara", eticheta: "5. Când îmi fac verificarea de seară", hint: "o oră și un obicei de care o legi: de exemplu, la 21:30, după ce îmi fac ghiozdanul", lung: false }
      ],
      titluCartonas: "Carnețelul meu, după Franklin"
    },

    /* ---------- 6. Fișa profesorului ---------- */
    profesor: {
      rezumat: "O oră de 50 de minute despre legătura dintre bani și caracter: elevii pornesc de la proverbele lui Poor Richard (muncă, economisire, datorii, cheltuieli mici), ajung la metoda lui Franklin de a-și exersa virtuțile și încheie cu o lectură critică a ideii că „virtutea aduce avere”.",
      nivel: "Clasele VII–XII (adaptabil); merge și la cercuri de lectură sau ateliere de educație financiară pentru adulți",
      durata: "50 de minute",
      discipline: "Educație economico-financiară, consiliere și dezvoltare personală, limba și literatura română (argumentare, lectură critică), educație antreprenorială. Verificați corespondența cu programa clasei.",
      materiale: "Proiector sau telefoane (câte unul la 3–4 elevi); fișa de lucru tipărită; opțional, tabelul virtuților tipărit din cameră (câte unul de elev, pentru tema de o săptămână).",
      obiective: [
        "să explice, cu cuvintele lor, cel puțin trei proverbe financiare ale lui Poor Richard;",
        "să calculeze costul anual al unei cheltuieli mici recurente;",
        "să explice legătura pe care o face textul între datorie și caracter;",
        "să descrie metoda lui Franklin de formare a obiceiurilor (o virtute pe săptămână, verificare zilnică);",
        "să evalueze critic afirmația că averea se datorează virtuților, identificând factorii lăsați deoparte."
      ],
      desfasurare: [
        { minute: "0–5", etapa: "Captarea atenției", activitate: "Întrebare pe tablă: „O cafea de 12 lei, cumpărată în fiecare zi lucrătoare. Cât face pe un an?” Elevii estimează în gând, apoi se arată calculul (12 × 260 = 3.120 lei). Se compară estimările." },
        { minute: "5–13", etapa: "Dosarul de indicii", activitate: "În perechi, elevii citesc fișele „Scena”, „Prima taxă”, „Ce câștigi și ce păstrezi” și „Creditul pe șase luni”. Fiecare pereche alege proverbul care i se pare cel mai actual." },
        { minute: "13–28", etapa: "Breakout (loturile 1–4)", activitate: "Echipe de 3–4. Regulă: nu se apasă butonul până când toată echipa poate explica de ce citatul ales dovedește răspunsul. Înainte de lotul 4, echipele citesc fișele despre carnețel." },
        { minute: "28–35", etapa: "Lotul 5 + discuție", activitate: "Frontal: e afirmația lui Franklin despre avere un fapt sau o opinie? Ce lasă deoparte? Vezi întrebările de discuție de mai jos." },
        { minute: "35–43", etapa: "Mini-jocuri", activitate: "Jumătate din echipe joacă „Proverbul și lecția”, cealaltă jumătate „Virtutea și regula ei”; apoi fiecare echipă prezintă o pereche care a pus-o în încurcătură." },
        { minute: "43–50", etapa: "Aplică azi + bilet de ieșire", activitate: "Fiecare elev alege o virtute și își scrie regula (itemul 7 din fișă). Temă opțională: tabelul tipărit, completat o săptămână; se discută ora următoare, fără notă și fără a cere detalii personale." }
      ],
      fisaElev: {
        titlu: "Fișă de lucru · „Cum să devii bogat și arta virtuții” (Benjamin Franklin)",
        instructiuni: "Răspunde pe scurt. Acolo unde ți se cere, sprijină-ți răspunsul pe un citat din dosar.",
        itemi: [
          { text: "Ce trei „taxe” spune Father Abraham că sunt mai grele decât cele ale guvernului? Dă câte un exemplu de azi pentru fiecare.", linii: 4 },
          { text: "Explică proverbul „O gaură mică scufundă o corabie mare”. Apoi calculează: o gustare de 8 lei, cumpărată de 5 ori pe săptămână, cât costă în 52 de săptămâni?", linii: 4 },
          { text: "De ce leagă Father Abraham datoria de minciună? Descrie lanțul pas cu pas.", linii: 3 },
          { text: "Descrie metoda lui Franklin (carnețelul, o virtute pe săptămână, punctele negre). De ce nu a încercat toate virtuțile deodată? Folosește comparația cu grădina.", linii: 4 },
          { text: "Oamenii de la licitație „au aprobat învățătura și au făcut pe loc exact pe dos”. Dă un exemplu asemănător din viața de zi cu zi și explică de ce se întâmplă.", linii: 3 },
          { text: "„Hărniciei și Chibzuinței [Franklin le pune pe seamă] dobândirea averii.” Este un fapt sau o opinie? Numește doi factori pe care această explicație îi lasă deoparte.", linii: 3 },
          { text: "Alege una dintre virtuțile lui Franklin și scrie-ți propria regulă pentru o săptămână, scurtă și concretă, ca un precept.", linii: 2 }
        ]
      },
      barem: [
        "1. Lenea (de două ori), mândria (de trei ori), nechibzuința/prostia (de patru ori). Exemple actuale plauzibile: timp pierdut pe telefon; cumpărături făcute ca să impresionezi; achiziții impulsive sau pe datorie.",
        "2. Cheltuielile mici, repetate, se adună în sume mari și pot „scufunda” un buget. Calcul: 8 × 5 × 52 = 2.080 de lei.",
        "3. Cine nu-și poate plăti datoria se rușinează să-și vadă creditorul, se teme, inventează scuze și, încetul cu încetul, ajunge să mintă: „al doilea viciu e minciuna, primul e să te îndatorezi”. În plus, datoria îi dă altcuiva putere asupra libertății tale.",
        "4. Un carnet cu o pagină pe virtute; 7 coloane (zile) și 13 rânduri (virtuți); seara, un punct negru pentru fiecare greșeală; o săptămână de atenție pentru o singură virtute, apoi următoarea. Ca grădinarul care plivește câte un strat: toate deodată ar depăși puterile oricui.",
        "5. Răspuns deschis. Se punctează exemplul concret și o explicație (obiceiul, presiunea grupului, oferta, plata amânată, diferența dintre a ști și a face).",
        "6. Opinie (interpretarea propriului succes), nu fapt demonstrat. Factori lăsați deoparte: norocul, contextul istoric, sănătatea, relațiile și ajutorul altora, munca oamenilor înrobiți pe care i-a deținut; chiar Father Abraham admite că efortul poate fi „spulberat”.",
        "7. Se punctează: o singură virtute, o regulă scurtă, concretă și verificabilă zilnic (de exemplu: „Îmi pun telefonul în altă cameră când îmi fac temele.”)."
      ],
      discutie: [
        "Cine vorbește, de fapt? Franklin scrie ca Poor Richard, care îl citează pe Father Abraham, care îl citează pe Poor Richard. De ce ar alege un autor atâtea măști? Ce glumă își face Franklin cu propria vanitate?",
        "Poor Richard recunoaște că nici a zecea parte din înțelepciune nu e a lui. Contează că proverbele sunt „culese”? Ce proverbe românești spun același lucru (de exemplu, „Picătură cu picătură se face un lac”)?",
        "Este orice datorie rea? Comparați creditul pentru „găteli” de la licitație cu un împrumut pentru studii sau pentru o locuință. Ce întrebări ar trebui să-ți pui înainte să te împrumuți?",
        "„Averea vine din virtute” e explicația unui om care a reușit. Câți oameni harnici și chibzuiți n-au ajuns bogați? Ce alți factori contează (noroc, epocă, familie, sănătate, discriminare)?",
        "Franklin a deținut oameni înrobiți și abia târziu a devenit aboliționist. Cum citim o listă de virtuți scrisă de cineva care nu le-a respectat pe toate? Anulează asta metoda, sau doar ne obligă să o citim mai atent?",
        "Ce virtute ați adăuga azi pe lista lui Franklin (empatie, curaj, curiozitate)? Ce regulă scurtă i-ați da?"
      ],
      diferentiere: [
        "Sprijin: lucrați doar cu loturile 1, 2 și 4 și cu primul joc; citiți indiciile cu voce tare; calculul de la itemul 2 se poate face cu calculatorul din cameră.",
        "Provocare: elevii caută în textul original (Gutenberg #43855) alte două proverbe financiare și le traduc singuri; sau compară lista lui Franklin cu o listă modernă de „obiceiuri sănătoase”.",
        "Cerc de lectură / atelier pentru adulți: săriți direct la calculator, la tabelul virtuților și la discuția critică."
      ],
      atentie: "(1) Lista lui Franklin are 13 virtuți; a douăsprezecea, Castitatea, privește viața sexuală și a fost lăsată în afara jocurilor și a tabelului. E pomenită doar cu numele în dosar; dacă elevii întreabă, explicați simplu, potrivit vârstei. (2) În discurs apar câteva versuri care pun risipa pe seama femeilor („Women and wine…”, femeile care au lăsat torsul pentru ceai). Nu au fost folosite în cameră; dacă lucrați cu textul integral, discutați-le ca prejudecăți ale epocii. (3) Franklin a deținut oameni înrobiți; tema e semnalată în dosar și în discuție. (4) Datoriile pot fi o temă delicată pentru elevii din familii care au credite. Discutați despre idei, nu despre situații personale, și evitați orice judecată morală asupra familiilor îndatorate. (5) Ediția din 1810 conține și reclame și o introducere ale editorului; camera folosește doar discursul.",
      extensii: [
        "Temă: tabelul virtuților completat o săptămână, urmat de un paragraf: „Ce am observat despre mine”. Nu se notează punctele, ci reflecția.",
        "Proiect: un „almanah al clasei” cu 10 proverbe financiare scrise de elevi, în stilul lui Poor Richard.",
        "Comparație: proverbele lui Poor Richard și sfaturile lui P. T. Barnum din camera „Arta de a face bani”. Ce au în comun? Unde se contrazic?"
      ]
    }
  };
})();
