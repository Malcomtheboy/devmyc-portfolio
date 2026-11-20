/*
  All site copy and facts live here, in one place, in English and Norwegian.

  Every translatable text is written as L("English", "Norsk"). Facts that
  are the same in both languages (names, links, tech stack) are written once.
  Pages call getContent(lang) and get back plain strings for that language.

  Sources: Mohamed's CV, each project's own repository, and Mohamed's own
  notes (Trace, service prices). Anything marked TODO is hidden on the site.
*/

export const LOCALES = ["en", "no"];
export const DEFAULT_LOCALE = "en";

const L = (en, no) => ({ en, no });

// "/projects" -> "/projects" (en) or "/no/projects" (no)
export function localePath(lang, path = "/") {
  if (lang !== "no") return path;
  return path === "/" ? "/no" : `/no${path}`;
}

// Turn the bilingual tree into plain strings for one language
function localize(value, lang) {
  if (Array.isArray(value)) return value.map((v) => localize(v, lang));
  if (value && typeof value === "object") {
    const keys = Object.keys(value);
    if (keys.length === 2 && "en" in value && "no" in value) return value[lang];
    return Object.fromEntries(keys.map((k) => [k, localize(value[k], lang)]));
  }
  return value;
}

const cache = {};
export function getContent(lang) {
  const l = LOCALES.includes(lang) ? lang : DEFAULT_LOCALE;
  cache[l] ??= localize(raw, l);
  return cache[l];
}

const raw = {
  site: {
    name: "Mohamed Hussein",
    location: L("Oslo, Norway", "Oslo, Norge"),
    url: "https://devmyc.no",
    email: "mohus17@outlook.com",
    photo: {
      src: "/images/mohamed-portrait-v3.jpg",
      width: 472,
      height: 630,
      alt: L("Portrait of Mohamed Hussein", "Portrett av Mohamed Hussein"),
    },
    links: {
      github: "https://github.com/Malcomtheboy",
      linkedin: "https://www.linkedin.com/in/mohamed-hussein-70b5682a1",
    },
  },

  nav: [
    { href: "/projects", label: L("Projects", "Prosjekter") },
    { href: "/about", label: L("About", "Om meg") },
    { href: "/experience", label: L("Experience", "Erfaring") },
    { href: "/services", label: L("Services", "Tjenester") },
    { href: "/contact", label: L("Contact", "Kontakt") },
  ],

  // Short interface texts used across pages
  ui: {
    skip: L("Skip to content", "Hopp til innhold"),
    home: L("home", "forside"),
    menu: L("Menu", "Meny"),
    themeToggle: L("Switch between light and dark theme", "Bytt mellom lyst og mørkt tema"),
    themeTitle: L("Switch theme", "Bytt tema"),
    langSwitch: L("Norsk", "English"),
    langSwitchLabel: L("Bytt til norsk", "Switch to English"),
    footer: L("Built with Next.js.", "Laget med Next.js."),
    allProjects: L("All projects", "Alle prosjekter"),
    nextProject: L("Next project", "Neste prosjekt"),
    from: L("From", "Fra"),
    goodFor: L("Good for", "Passer for"),
    mostComplete: L("Most complete", "Mest komplett"),
    labels: {
      role: L("Role", "Rolle"),
      team: L("Team", "Team"),
      year: L("Year", "År"),
      status: L("Status", "Status"),
      overview: L("Overview", "Oversikt"),
      problem: L("Problem", "Problem"),
      solution: L("Solution", "Løsning"),
      idea: L("The idea", "Idéen"),
      features: L("What it does", "Hva den gjør"),
      myPart: L("My part", "Min del"),
      planned: L("Planned features", "Planlagte funksjoner"),
      security: L("Security", "Sikkerhet"),
      principle: L("Principle", "Prinsipp"),
      stack: L("Stack", "Teknologi"),
      screens: L("Screens", "Skjermbilder"),
      links: L("Links", "Lenker"),
    },
    form: {
      name: L("Name", "Navn"),
      email: L("Email", "E-post"),
      message: L("Message", "Melding"),
      placeholder: L("What do you need, and roughly when?", "Hva trenger du, og omtrent når?"),
      send: L("Send message", "Send melding"),
      sending: L("Sending…", "Sender…"),
      privacy: L(
        "Your message goes straight to my inbox. Nothing is stored on this site.",
        "Meldingen går rett til innboksen min. Ingenting lagres på denne siden."
      ),
      sentTitle: L("Thanks, your message is on its way.", "Takk, meldingen er sendt."),
      sentText: L("I'll reply to the email address you gave.", "Jeg svarer til e-postadressen du oppga."),
      unavailable: L(
        "The form couldn't send right now. Please email me directly at",
        "Skjemaet fikk ikke sendt akkurat nå. Send meg gjerne en e-post på"
      ),
      genericError: L("Something went wrong. Please try again.", "Noe gikk galt. Prøv igjen."),
      invalid: L(
        "Please add your name, a valid email and a short message.",
        "Fyll inn navn, en gyldig e-post og en kort melding."
      ),
      tooMany: L("Too many messages. Please try again later.", "For mange meldinger. Prøv igjen senere."),
    },
    dialog: {
      eyebrow: L("Get in touch", "Ta kontakt"),
      intro: L(
        "Tell me a little about what you need, and I'll get back to you.",
        "Fortell litt om hva du trenger, så tar jeg kontakt."
      ),
      own: L("Or use your own email:", "Eller bruk din egen e-post:"),
      emailApp: L("Email app", "E-postapp"),
      copy: L("Copy", "Kopier"),
      copied: L("Copied", "Kopiert"),
      close: L("Close", "Lukk"),
      greeting: L("Hi Mohamed,", "Hei Mohamed,"),
    },
  },

  home: {
    metaTitle: L("Mohamed Hussein — IT & Management Graduate", "Mohamed Hussein — Utdannet innen IT og ledelse"),
    metaDescription: L(
      "Portfolio of Mohamed Hussein, an IT and Management graduate in Oslo working across software, data and security.",
      "Portefølje for Mohamed Hussein, utdannet innen IT og ledelse i Oslo, med fokus på programvare, data og sikkerhet."
    ),
    heroBefore: L("I build software around data, and I care about keeping it", "Jeg bygger programvare rundt data, og jeg bryr meg om å holde den"),
    heroAccent: L("secure", "sikker"),
    heroLead: L(
      "Mohamed Hussein — IT and Management graduate from the University of South-Eastern Norway. I work across databases, full-stack development and access control, and I'm building mobile products that put AI to practical use.",
      "Mohamed Hussein — utdannet innen IT og ledelse fra Universitetet i Sørøst-Norge. Jeg jobber med databaser, fullstack-utvikling og tilgangsstyring, og bygger mobilprodukter som bruker AI til noe nyttig."
    ),
    viewProjects: L("View projects", "Se prosjekter"),
    getInTouch: L("Get in touch", "Ta kontakt"),
    facts: [
      { label: L("Education", "Utdanning"), value: L("Bachelor in IT & Management, USN", "Bachelor i IT og ledelse, USN") },
      { label: L("Graduated", "Uteksaminert"), value: "2026" },
      { label: L("Focus", "Fokus"), value: L("Software, data, security & AI products", "Programvare, data, sikkerhet og AI-produkter") },
    ],
    sections: {
      projects: { label: L("Projects", "Prosjekter"), title: L("Selected work, from shipped prototypes to what I'm building next.", "Utvalgte prosjekter, fra ferdige prototyper til det jeg bygger nå.") },
      skills: { label: L("Skills", "Ferdigheter"), title: L("Tools I use to build and ship.", "Verktøyene jeg bygger med.") },
      about: { label: L("About", "Om meg"), title: L("Curious about technology and business.", "Nysgjerrig på både teknologi og forretning.") },
      experience: { label: L("Experience", "Erfaring"), title: L("Education and work.", "Utdanning og jobb.") },
      services: { label: L("Services", "Tjenester"), title: L("I also build for clients.", "Jeg tar også oppdrag.") },
      contact: { label: L("Contact", "Kontakt"), title: L("Open to graduate roles and internships.", "Åpen for nyutdannet-stillinger og internships.") },
    },
    moreAbout: L("More about me", "Mer om meg"),
    fullExperience: L("Full experience", "All erfaring"),
    seeServices: L("See services and what's included", "Se tjenester og hva som er inkludert"),
    education: L("Education", "Utdanning"),
    work: L("Work", "Jobb"),
    hello: L("Hello from devmyc.no", "Hei fra devmyc.no"),
  },

  pages: {
    projects: {
      metaTitle: L("Projects", "Prosjekter"),
      metaDescription: L(
        "Apps, platforms and prototypes built by Mohamed Hussein: Rihla, Listly, Noragentic, Trace and more.",
        "Apper, plattformer og prototyper laget av Mohamed Hussein: Rihla, Listly, Noragentic, Trace og flere."
      ),
      label: L("Projects", "Prosjekter"),
      title: L("Things I've built, and what I'm building next.", "Det jeg har laget, og det jeg bygger nå."),
      intro: L(
        "From a co-founded mobile app and a bachelor project to my own AI prototypes. Each page covers the problem, what I did and the stack.",
        "Fra en mobilapp jeg har startet med en partner og et bachelorprosjekt til egne AI-prototyper. Hver side forklarer problemet, hva jeg gjorde og teknologien."
      ),
    },
    about: {
      metaTitle: L("About", "Om meg"),
      metaDescription: L(
        "About Mohamed Hussein: IT and Management graduate from USN, working across software, data and security.",
        "Om Mohamed Hussein: utdannet innen IT og ledelse fra USN, med fokus på programvare, data og sikkerhet."
      ),
      label: L("About", "Om meg"),
      title: L("Curious about technology and business.", "Nysgjerrig på både teknologi og forretning."),
      howIWork: L("How I work", "Slik jobber jeg"),
      languages: L("Languages", "Språk"),
      seeProjects: L("See my projects", "Se prosjektene mine"),
      getInTouch: L("Get in touch", "Ta kontakt"),
    },
    experience: {
      metaTitle: L("Experience", "Erfaring"),
      metaDescription: L(
        "Education, work experience and technical experience of Mohamed Hussein.",
        "Utdanning, arbeidserfaring og teknisk erfaring for Mohamed Hussein."
      ),
      label: L("Experience", "Erfaring"),
      title: L("Education, work and what I've built along the way.", "Utdanning, jobb og det jeg har bygget underveis."),
      education: L("Education", "Utdanning"),
      work: L("Work", "Jobb"),
      technical: L("Technical", "Teknisk"),
      projects: L("Projects", "Prosjekter"),
    },
    services: {
      metaTitle: L("Services", "Tjenester"),
      metaDescription: L(
        "Websites from NOK 3,000, system architecture from NOK 8,000 and full apps from NOK 15,000. Built by Mohamed Hussein in Oslo.",
        "Nettsider fra 3 000 kr, systemarkitektur fra 8 000 kr og komplette apper fra 15 000 kr. Laget av Mohamed Hussein i Oslo."
      ),
      label: L("Services", "Tjenester"),
      title: L("Need a website, a plan or a whole app?", "Trenger du en nettside, en plan eller en hel app?"),
      intro: L(
        "I build the same kind of things I show on this site, for people and small businesses. Prices are starting points; you get a fixed quote before anything begins.",
        "Jeg lager det samme som jeg viser på denne siden, for privatpersoner og små bedrifter. Prisene er startpriser, og du får et fast tilbud før noe settes i gang."
      ),
      askAbout: L("Ask about", "Spør om"),
      enquiry: L("enquiry", "forespørsel"),
      examplesLabel: L("Examples", "Eksempler"),
      examplesTitle: L("Example websites", "Eksempler på nettsider"),
      examplesIntro: L(
        "Three sample sites for made-up local businesses, built the way I'd build yours. Open them to click around. The sample sites are in Norwegian.",
        "Tre eksempelsider for oppdiktede lokale bedrifter, laget slik jeg ville laget din. Åpne dem og klikk deg rundt."
      ),
      openExample: L("Open example", "Åpne eksempel"),
      appsLabel: L("Apps", "Apper"),
      appsTitle: L("Apps I've built", "Apper jeg har laget"),
      appsIntro: L(
        "A quick look at some of the apps from my projects. Click through for the full story.",
        "Et kjapt blikk på noen av appene fra prosjektene mine. Klikk deg inn for hele historien."
      ),
      processLabel: L("How it works", "Slik foregår det"),
      ctaTitle: L("Not sure which one fits? Tell me what you have in mind.", "Usikker på hva som passer? Fortell meg hva du ser for deg."),
      ctaButton: L("Get in touch", "Ta kontakt"),
      ctaSecondary: L("See my work first", "Se arbeidet mitt først"),
      projectEnquiry: L("Project enquiry", "Prosjektforespørsel"),
    },
    contact: {
      metaTitle: L("Contact", "Kontakt"),
      metaDescription: L(
        "Get in touch with Mohamed Hussein by email, LinkedIn or GitHub.",
        "Ta kontakt med Mohamed Hussein på e-post, LinkedIn eller GitHub."
      ),
      label: L("Contact", "Kontakt"),
      title: L("Open to graduate roles and internships.", "Åpen for nyutdannet-stillinger og internships."),
      intro: L(
        "Based in Oslo and open to opportunities in Norway and abroad, including London. Email is the quickest way to reach me.",
        "Jeg bor i Oslo og er åpen for muligheter i Norge og i utlandet, også London. E-post er raskeste måte å nå meg på."
      ),
      formTitle: L("Send a message", "Send en melding"),
      email: L("Email", "E-post"),
    },
    notFound: {
      metaTitle: L("Page not found", "Fant ikke siden"),
      label: L("Not found", "Ikke funnet"),
      title: L("This page doesn't exist.", "Denne siden finnes ikke."),
      text: L(
        "The link may be old or mistyped. Try the homepage or the project list instead.",
        "Lenken kan være gammel eller feilskrevet. Prøv forsiden eller prosjektlisten i stedet."
      ),
      home: L("Back home", "Til forsiden"),
      projects: L("See projects", "Se prosjekter"),
    },
  },

  /*
    Services for clients. Prices set by Mohamed (Nov 2026), shown as
    "from" prices: the final price is agreed after a short chat.
  */
  services: [
    {
      slug: "website",
      name: L("Website", "Nettside"),
      price: L("NOK 3,000", "3 000 kr"),
      summary: L(
        "A fast, modern website for you or your business, built to look good on every screen.",
        "En rask og moderne nettside for deg eller bedriften din, som ser bra ut på alle skjermer."
      ),
      includes: [
        L("Design and build of a responsive site", "Design og utvikling av en responsiv side"),
        L("Contact details, links and your own content", "Kontaktinfo, lenker og ditt eget innhold"),
        L("Basic SEO so people can find you", "Grunnleggende SEO så folk finner deg"),
        L("Help getting it live on your domain", "Hjelp med å få den ut på domenet ditt"),
      ],
      fit: L("Portfolios, small businesses, landing pages", "Porteføljer, små bedrifter, landingssider"),
    },
    {
      slug: "architecture",
      name: L("System architecture", "Systemarkitektur"),
      price: L("NOK 8,000", "8 000 kr"),
      summary: L(
        "A clear plan before you build: how the system fits together, where the data lives and how it stays secure.",
        "En tydelig plan før du bygger: hvordan systemet henger sammen, hvor dataene ligger og hvordan alt holdes sikkert."
      ),
      includes: [
        L("Overview of components and how they talk to each other", "Oversikt over komponentene og hvordan de snakker sammen"),
        L("Data model and choice of technology", "Datamodell og teknologivalg"),
        L("Access control and security considerations", "Tilgangsstyring og sikkerhetsvurderinger"),
        L("A written document your team can build from", "Et skriftlig dokument teamet ditt kan bygge etter"),
      ],
      fit: L("Startups and teams planning an app or platform", "Oppstartsbedrifter og team som planlegger en app eller plattform"),
    },
    {
      slug: "app",
      name: L("Full app", "Komplett app"),
      price: L("NOK 15,000", "15 000 kr"),
      summary: L(
        "A working web or mobile app, from login and database to the screens your users see.",
        "En ferdig web- eller mobilapp, fra innlogging og database til skjermene brukerne ser."
      ),
      includes: [
        L("User accounts and login", "Brukerkontoer og innlogging"),
        L("Database and backend", "Database og backend"),
        L("Admin view to manage content or users", "Adminvisning for innhold eller brukere"),
        L("Launch and handover, with the source code", "Lansering og overlevering, med kildekoden"),
      ],
      fit: L("MVPs, booking systems, internal tools", "MVP-er, bookingsystemer, interne verktøy"),
      highlight: true,
    },
  ],

  process: [
    { title: L("Short chat", "Kort prat"), text: L("We talk about what you need, free and without obligation.", "Vi snakker om hva du trenger, gratis og uforpliktende.") },
    { title: L("Fixed quote", "Fast pris"), text: L("You get a clear scope and price before any work starts.", "Du får en tydelig avtale og pris før arbeidet starter.") },
    { title: L("Build", "Bygging"), text: L("I build it and show you progress along the way.", "Jeg bygger og viser deg fremdriften underveis.") },
    { title: L("Launch", "Lansering"), text: L("We put it live and you get everything you need to own it.", "Vi publiserer, og du får alt du trenger for å eie den.") },
  ],

  // Sample sites for FICTIONAL businesses, served from /public/examples
  examples: [
    { slug: "bakeri", name: "Solsikke Bakeri", kind: L("Bakery", "Bakeri"), href: "/examples/bakeri/index.html", image: "/images/examples/bakeri.jpg" },
    { slug: "rorlegger", name: "Nordvind Rørlegger", kind: L("Plumber", "Rørlegger"), href: "/examples/rorlegger/index.html", image: "/images/examples/rorlegger.jpg" },
    { slug: "bilverksted", name: "Fjellsted Bilverksted", kind: L("Car workshop", "Bilverksted"), href: "/examples/bilverksted/index.html", image: "/images/examples/bilverksted.jpg" },
  ],

  // From the CV profile section
  about: [
    L(
      "I'm an IT and Management graduate from the University of South-Eastern Norway with hands-on experience in databases, SQL, data analysis and full-stack development.",
      "Jeg er utdannet innen IT og ledelse fra Universitetet i Sørøst-Norge, med praktisk erfaring innen databaser, SQL, dataanalyse og fullstack-utvikling."
    ),
    L(
      "Through my degree and my own projects I have worked with data modelling, REST APIs, Firebase/Firestore, access control and project data analytics, always in teams using Git and GitHub. Alongside work I'm building the mobile app Rihla with a co-founder.",
      "Gjennom studiet og egne prosjekter har jeg jobbet med datamodellering, REST-API-er, Firebase/Firestore, tilgangsstyring og analyse av prosjektdata, alltid i team med Git og GitHub. Ved siden av jobb bygger jeg mobilappen Rihla sammen med en medgründer."
    ),
    L(
      "I'm curious about both technology and business, and I work in a structured way. Next, I want to grow in software engineering, data platforms and information security, and keep building products that use AI where it genuinely helps.",
      "Jeg er nysgjerrig på både teknologi og forretning, og jobber strukturert. Videre vil jeg utvikle meg innen programvareutvikling, dataplattformer og informasjonssikkerhet, og fortsette å bygge produkter som bruker AI der det faktisk hjelper."
    ),
  ],

  /*
    Project fields (all optional except slug, name, summary):
    overview, problem/solution, features (what it does), points (my part),
    security, team, links, images ({src, alt, width, height}), stack.
    Facts come from the CV and from each project's own repository.
  */
  projects: [
    {
      // Source: CV + Rihla repo (apps/mobile, apps/api, apps/admin, backend)
      slug: "rihla",
      name: "Rihla",
      year: L("2026 – ongoing", "2026 – pågår"),
      role: L("Co-founder and developer, MYC", "Medgründer og utvikler, MYC"),
      team: L("Two co-founders", "To medgründere"),
      summary: L(
        "An Islamic learning app for iOS and Android, with a Next.js admin web app for content.",
        "En islamsk læringsapp for iOS og Android, med en adminportal i Next.js for innhold."
      ),
      overview: L(
        "Rihla is a mobile learning app being built for the App Store and Google Play. It brings the Quran, Hadith collections, Arabic practice and everyday tools into one app, with an AI assistant for questions and progress goals to keep learning going.",
        "Rihla er en læringsapp som bygges for App Store og Google Play. Den samler Koranen, hadith-samlinger, arabiskøving og nyttige verktøy i én app, med en AI-assistent for spørsmål og mål som holder læringen i gang."
      ),
      features: [
        L("Quran reader with bookmarks, and Hadith browsable by collection and section.", "Koranleser med bokmerker, og hadith sortert etter samling og kapittel."),
        L("Arabic course: letters, harakat, words and sentences, each with practice exercises.", "Arabiskkurs: bokstaver, harakat, ord og setninger, alle med øvelser."),
        L("AI chat that answers questions at the learner's level and returns checked source references.", "AI-chat som svarer på brukerens nivå og gir kontrollerte kildehenvisninger."),
        L("Progress goals, prayer times, Qibla direction, onboarding and a user profile.", "Mål for fremgang, bønnetider, Qibla-retning, introduksjon og brukerprofil."),
        L("A separate Next.js admin portal for managing content and users.", "En egen adminportal i Next.js for innhold og brukere."),
      ],
      points: [
        L("I own the home screen and the Quran and Hadith section of the mobile app.", "Jeg har ansvaret for forsiden og Koran- og hadith-delen av mobilappen."),
        L(
          "Work alongside my co-founder in a shared monorepo: mobile app, API, admin portal and shared packages for design tokens, types and UI components.",
          "Jobber sammen med medgründeren min i et felles monorepo: mobilapp, API, adminportal og delte pakker for designtokens, typer og UI-komponenter."
        ),
      ],
      security: [
        L(
          "The AI endpoint verifies a Firebase ID token on every request before calling the model, and the Gemini API key never leaves the server.",
          "AI-endepunktet sjekker en Firebase ID-token på hver forespørsel før modellen kalles, og Gemini-nøkkelen forlater aldri serveren."
        ),
        L(
          "Per-user and global rate limits on AI requests; release builds refuse to send AI requests over plain HTTP.",
          "Grenser for antall AI-forespørsler per bruker og totalt, og ferdige app-versjoner nekter å sende AI-forespørsler over vanlig HTTP."
        ),
        L(
          "Admin access is granted only by a server-side record that clients cannot create, enforced in Firestore security rules.",
          "Admin-tilgang gis bare gjennom en post på serversiden som brukere ikke kan opprette selv, håndhevet i Firestore-reglene."
        ),
      ],
      stack: ["React Native", "Expo", "TypeScript", "Next.js", "Tailwind CSS", "Node.js", "Express", "Firebase", "Gemini API"],
      status: L("In development", "Under utvikling"),
      featured: true,
    },
    {
      slug: "listly",
      name: "Listly",
      year: "2026",
      role: L("Solo project", "Eget prosjekt"),
      summary: L(
        "A mobile app that checks rental and used-car listings for scam signals before you pay anything.",
        "En mobilapp som sjekker leie- og bruktbilannonser for svindeltegn før du betaler noe."
      ),
      problem: L(
        "Rental and used-car scams on marketplaces follow familiar patterns, but they are easy to miss when you are in a hurry to secure a flat or a car.",
        "Svindel med leiebolig og bruktbil på markedsplasser følger kjente mønstre, men de er lette å overse når du har dårlig tid til å sikre deg en leilighet eller bil."
      ),
      solution: L(
        "Paste a link, the listing text or a screenshot from Finn, Hybel, Facebook or anywhere else, and Listly returns a risk score with the reasons behind it.",
        "Lim inn en lenke, annonseteksten eller et skjermbilde fra Finn, Hybel, Facebook eller hvor som helst, så gir Listly en risikoscore med begrunnelse."
      ),
      features: [
        L("Two categories, housing and cars, each with its own rules, facts and advice.", "To kategorier, bolig og bil, hver med egne regler, fakta og råd."),
        L(
          "Three ways to check: paste a link, paste text or upload a screenshot, or share straight from another app.",
          "Tre måter å sjekke på: lim inn lenke, lim inn tekst eller last opp skjermbilde, eller del rett fra en annen app."
        ),
        L("Risk score from 0 to 100, with every red flag labelled as coming from a rule or from the AI.", "Risikoscore fra 0 til 100, der hvert faresignal er merket som Regel eller AI."),
        L(
          "Next steps tailored to the result, such as using a deposit account for rentals or checking the vehicle registers for cars.",
          "Neste steg tilpasset resultatet, som depositumskonto for leie eller sjekk i kjøretøyregistrene for bil."
        ),
        L(
          "History with filters and statistics, stored locally on the phone, plus a Learn tab with common scam tricks.",
          "Historikk med filter og statistikk lagret lokalt på telefonen, og en Lær-fane med vanlige svindeltriks."
        ),
      ],
      points: [
        L("Designed and built the whole app and API on my own.", "Designet og bygget hele appen og API-et selv."),
        L(
          "An AI model extracts structured JSON facts from the listing; a deterministic rule engine then checks them against known scam patterns, so the score never depends on the AI alone.",
          "En AI-modell henter ut strukturerte fakta som JSON fra annonsen, og en regelmotor sjekker dem mot kjente svindelmønstre, så scoren aldri avhenger av AI alene."
        ),
        L(
          "Added time-outs so a stalled AI call fails cleanly instead of leaving the user waiting, and covered the scoring logic with automated tests.",
          "La til tidsavbrudd så et AI-kall som henger feiler ryddig i stedet for at brukeren venter, og dekket scorelogikken med automatiske tester."
        ),
      ],
      security: [
        L("The AI API key stays on the server; the app only talks to my own API.", "AI-nøkkelen ligger på serveren, og appen snakker bare med mitt eget API."),
        L("Check history is kept on the device, not in a cloud database.", "Historikken lagres på telefonen, ikke i en skydatabase."),
      ],
      links: [{ label: L("Source on GitHub", "Kildekode på GitHub"), href: "https://github.com/Malcomtheboy/Listly" }],
      stack: ["React Native", "Expo", "TypeScript", "Node.js", "Express", "Gemini API", "Node test runner"],
      // Screenshots from the Listly repo (UI is in Norwegian)
      images: [
        { src: "/images/projects/listly/sjekk.jpg", width: 335, height: 723, alt: L("Listly check screen with a choice between housing and car", "Listly sin sjekk-skjerm med valg mellom bolig og bil") },
        { src: "/images/projects/listly/resultat-bil.jpg", width: 335, height: 723, alt: L("Result for a scam car listing: 0 out of 100, high risk", "Resultat for en svindelannonse for bil: 0 av 100, høy risiko") },
        { src: "/images/projects/listly/historikk.jpg", width: 335, height: 723, alt: L("History screen with statistics and a filter per category", "Historikk med statistikk og filter per kategori") },
      ],
      status: L("Prototype", "Prototype"),
      featured: true,
    },
    {
      slug: "noragentic",
      name: "Noragentic",
      year: "2026", // TODO: confirm
      role: L("Bachelor project", "Bachelorprosjekt"),
      team: L("Team of five", "Team på fem"),
      summary: L(
        "A full-stack communication and project-management platform connecting customers with administrators.",
        "En fullstack-plattform for kommunikasjon og prosjektstyring mellom kunder og administratorer."
      ),
      overview: L(
        "Noragentic is two connected web portals: one for customers and one for employees. Customers follow their projects, share files and talk to the team; employees manage customers, projects and tasks and see how work is progressing.",
        "Noragentic består av to sammenkoblede nettportaler: én for kunder og én for ansatte. Kundene følger prosjektene sine, deler filer og snakker med teamet, mens de ansatte styrer kunder, prosjekter og oppgaver og ser fremdriften."
      ),
      features: [
        L("Real-time chat between customers and the team.", "Sanntidschat mellom kunder og teamet."),
        L("File sharing with uploads to cloud storage.", "Fildeling med opplasting til skylagring."),
        L("Project and task tracking with live updates.", "Prosjekt- og oppgavestyring med direkte oppdateringer."),
        L("Analytics dashboards with charts of project progress.", "Analysedashbord med grafer over prosjektfremdrift."),
        L("Separate logins and views for customers and employees.", "Egne innlogginger og visninger for kunder og ansatte."),
      ],
      points: [
        L("My part was the customer portal and the analytics views for employees.", "Min del var kundeportalen og analysevisningene for de ansatte."),
        L(
          "Integrated backend services through REST APIs and worked with data, files and project progress analytics.",
          "Koblet på backend-tjenester via REST-API-er og jobbet med data, filer og analyse av prosjektfremdrift."
        ),
        L(
          "Built real-time features on Firestore listeners, so chat and project status update without reloading.",
          "Bygget sanntidsfunksjoner med Firestore-lyttere, så chat og prosjektstatus oppdateres uten å laste siden på nytt."
        ),
      ],
      security: [
        L(
          "Authentication with Firebase Auth and role-based access, so customers only see their own projects and employees get the tools they need.",
          "Innlogging med Firebase Auth og rollebasert tilgang, så kunder bare ser egne prosjekter og ansatte får verktøyene de trenger."
        ),
      ],
      links: [
        { label: L("Customer portal on GitHub", "Kundeportalen på GitHub"), href: "https://github.com/Malcomtheboy/NoragenticKundeportalKunder" },
        { label: L("Employee portal on GitHub", "Ansattportalen på GitHub"), href: "https://github.com/Malcomtheboy/NoragenticKundeportalAnsatte" },
      ],
      images: [
        { src: "/images/projects/noragentic/customer-login.jpg", width: 1280, height: 800, alt: L("Noragentic customer portal login screen", "Innloggingssiden til Noragentic sin kundeportal") },
      ],
      stack: ["JavaScript", "HTML", "CSS", "Firebase Auth", "Firestore", "Firebase Storage", "Chart.js", "REST APIs"],
      status: L("Bachelor project", "Bachelorprosjekt"),
      featured: true,
    },
    {
      // Source: Mohamed's own TRACE concept note. Planned product, not built yet.
      slug: "trace",
      name: "Trace",
      year: L("Next", "Neste"),
      role: L("Product concept", "Produktkonsept"),
      summary: L(
        "A planned AI assistant that turns scattered information into things you actually get done.",
        "En planlagt AI-assistent som gjør spredt informasjon om til ting du faktisk får gjort."
      ),
      problem: L(
        "Important information arrives everywhere: a date in a message, a receipt screenshot, an email about a job application, a PDF you will need later. It gets lost across apps and old conversations.",
        "Viktig informasjon kommer overalt fra: en dato i en melding, et skjermbilde av en kvittering, en e-post om en jobbsøknad, en PDF du trenger senere. Den forsvinner mellom apper og gamle samtaler."
      ),
      solution: L(
        "Trace is one place to capture all of it. Instead of just storing it, the AI works out what each item means and helps you act on it. Save a photo of an invoice, and Trace recognises it as an invoice, pulls out the due date, offers to set a reminder and finds it again when you ask.",
        "Trace er ett sted for alt dette. I stedet for bare å lagre det, forstår AI-en hva hver ting betyr og hjelper deg å gjøre noe med den. Lagre et bilde av en faktura, så skjønner Trace at det er en faktura, henter ut forfallsdatoen, foreslår en påminnelse og finner den igjen når du spør."
      ),
      points: [
        L("Capture anything: text, images, PDFs and links.", "Lagre hva som helst: tekst, bilder, PDF-er og lenker."),
        L("AI understanding of what each item is about.", "AI som forstår hva hver ting handler om."),
        L("Smart memory that sorts and remembers what you've saved.", "Smart minne som sorterer og husker det du har lagret."),
        L("An action engine that turns information into tasks and reminders.", "En handlingsmotor som gjør informasjon om til oppgaver og påminnelser."),
        L(
          "Ask questions in plain language, like “When do I have to pay this bill?” or “Which jobs did I apply for last month?”",
          "Still spørsmål med vanlige ord, som «Når må jeg betale denne regningen?» eller «Hvilke jobber søkte jeg på forrige måned?»"
        ),
      ],
      principle: L("From information storage to information execution.", "Fra å lagre informasjon til å handle på den."),
      stack: [],
      status: L("Concept · planned after Listly", "Konsept · planlagt etter Listly"),
      concept: true,
      featured: true,
    },
    {
      slug: "go123movies",
      name: "Go123Movies",
      year: "TODO",
      role: L("Web application", "Nettapplikasjon"),
      summary: L(
        "A Java web application for movie content backed by a MySQL database.",
        "En nettapplikasjon i Java for filminnhold, med MySQL-database."
      ),
      points: [
        L("MySQL integration via JDBC for storing and retrieving data.", "MySQL-integrasjon via JDBC for å lagre og hente data."),
        L(
          "Wrote SQL queries and backend logic, structured into Model, View and Controller components for maintainability.",
          "Skrev SQL-spørringer og backend-logikk, strukturert i Model, View og Controller for enklere vedlikehold."
        ),
      ],
      stack: ["Java", "MySQL", "JDBC", "MVC"],
      status: L("Completed", "Fullført"), // TODO: confirm
      featured: false,
    },
    {
      slug: "barbershop",
      name: "Malcom's Barbershop",
      year: "TODO",
      role: L("Booking website", "Bookingnettside"),
      summary: L(
        "A responsive booking website where customers can submit and manage appointments.",
        "En responsiv bookingside der kunder kan bestille og administrere timer."
      ),
      features: [
        L("Pages for services, the barbers and the shop itself.", "Sider for tjenester, frisørene og selve salongen."),
        L("Online booking with customer registration and a booking confirmation page.", "Booking på nett med kunderegistrering og bekreftelsesside."),
      ],
      points: [
        L("Built the site with plain HTML, CSS and JavaScript, responsive on phone and desktop.", "Laget siden med ren HTML, CSS og JavaScript, tilpasset både mobil og PC."),
        L("Used Firebase Realtime Database to store and manage booking and customer data.", "Brukte Firebase Realtime Database til å lagre bookinger og kundedata."),
      ],
      links: [{ label: L("Source on GitHub", "Kildekode på GitHub"), href: "https://github.com/Malcomtheboy/Barbershop" }],
      images: [
        { src: "/images/projects/barbershop/home.jpg", width: 1280, height: 800, alt: L("Malcom's Barbershop front page", "Forsiden til Malcom's Barbershop") },
      ],
      stack: ["HTML", "CSS", "JavaScript", "Firebase Realtime Database"],
      status: L("Completed", "Fullført"), // TODO: confirm
      featured: false,
    },
  ],

  // From the CV "Technical skills" section, grouped
  skills: [
    {
      group: L("Data & databases", "Data og databaser"),
      items: ["SQL", "MySQL", "JDBC", L("Database design", "Databasedesign"), L("Data modelling", "Datamodellering"), L("Data analysis & visualisation", "Dataanalyse og visualisering")],
    },
    {
      group: L("Languages", "Programmeringsspråk"),
      items: ["JavaScript", "TypeScript", "Java", L("Python (basic)", "Python (grunnleggende)"), "HTML5", "CSS"],
    },
    {
      group: L("Frameworks & platforms", "Rammeverk og plattformer"),
      items: ["React Native (Expo)", "Next.js", "Firebase", "Firestore", L("Microsoft Azure (academic)", "Microsoft Azure (fra studiet)")],
    },
    {
      group: L("Security & practice", "Sikkerhet og praksis"),
      items: [
        L("REST APIs & authentication", "REST-API-er og autentisering"),
        L("Role-based access control", "Rollebasert tilgangsstyring"),
        L("Information security", "Informasjonssikkerhet"),
        "Git & GitHub",
        L("Documentation", "Dokumentasjon"),
      ],
    },
  ],

  education: [
    {
      title: L("Bachelor's Degree in IT and Management", "Bachelor i IT og ledelse"),
      org: L("University of South-Eastern Norway (USN)", "Universitetet i Sørøst-Norge (USN)"),
      period: "2023 – 2026",
      note: L(
        "Databases, data analysis and visualisation, software development, systems development and project work.",
        "Databaser, dataanalyse og visualisering, programvareutvikling, systemutvikling og prosjektarbeid."
      ),
    },
  ],

  // The updated CV lists only the first two. `earlier: true` roles stay off the homepage.
  experience: [
    {
      title: L("Warehouse Assistant", "Lagermedarbeider"),
      org: "BAMA",
      period: L("Jul 2025 – present", "jul. 2025 – nå"),
      note: L(
        "Handling goods by established routines in a fast-paced environment, with a focus on accuracy, reliability and teamwork.",
        "Håndterer varer etter faste rutiner i et høyt tempo, med vekt på nøyaktighet, pålitelighet og samarbeid."
      ),
    },
    {
      title: L("Childcare Worker", "Barnehagevikar"),
      org: "PVS, Oslo",
      period: L("Mar 2023 – present", "mar. 2023 – nå"),
      note: L(
        "Supporting daily activities and communicating clearly with children, colleagues and supervisors.",
        "Bidrar i hverdagen og kommuniserer tydelig med barn, kolleger og ledere."
      ),
    },
    { title: L("Healthcare Worker", "Helsearbeider"), org: L("Oksenøya Nursing Home", "Oksenøya sykehjem"), period: L("Jul 2024", "jul. 2024"), earlier: true },
    { title: L("Crew Member", "Medarbeider"), org: "McDonald's", period: L("Jun – Sep 2021", "jun. – sep. 2021"), earlier: true },
  ],

  strengths: [
    L("Analytical and solution-oriented", "Analytisk og løsningsorientert"),
    L("Takes initiative and learns quickly", "Tar initiativ og lærer raskt"),
    L("Structured, independent and responsible", "Strukturert, selvstendig og ansvarsfull"),
    L("Enjoys teamwork and clear communication", "Trives med samarbeid og tydelig kommunikasjon"),
  ],

  languages: [L("Norwegian (fluent)", "Norsk (flytende)"), L("English (fluent)", "Engelsk (flytende)")],
};
