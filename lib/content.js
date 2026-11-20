/*
  All site copy and facts live here, in one place.
  Source of truth: Mohamed's CV (Mohamed_Hussein_CV_Data_Engineer_EN.pdf)
  and the Listly README. Anything marked TODO needs Mohamed's input.
  Pages import from this file instead of hard-coding text.
*/

export const site = {
  name: "Mohamed Hussein",
  role: "IT & Management graduate",
  headline: "Software, data & security",
  location: "Oslo, Norway",
  url: "https://devmyc.no",
  email: "mohus17@outlook.com",
  photo: {
    src: "/images/mohamed-portrait-v3.jpg",
    width: 472,
    height: 630,
    alt: "Portrait of Mohamed Hussein",
  },
  links: {
    github: "https://github.com/Malcomtheboy",
    linkedin: "https://www.linkedin.com/in/mohamed-hussein-70b5682a1",
  },
};

export const nav = [
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

/*
  Services for clients. Prices set by Mohamed (Nov 2026), shown as
  "from" prices: the final price is agreed after a short chat.
*/
export const services = [
  {
    slug: "website",
    name: "Website",
    price: "NOK 3,000",
    summary: "A fast, modern website for you or your business, built to look good on every screen.",
    includes: [
      "Design and build of a responsive site",
      "Contact details, links and your own content",
      "Basic SEO so people can find you",
      "Help getting it live on your domain",
    ],
    fit: "Portfolios, small businesses, landing pages",
  },
  {
    slug: "architecture",
    name: "System architecture",
    price: "NOK 8,000",
    summary: "A clear plan before you build: how the system fits together, where the data lives and how it stays secure.",
    includes: [
      "Overview of components and how they talk to each other",
      "Data model and choice of technology",
      "Access control and security considerations",
      "A written document your team can build from",
    ],
    fit: "Startups and teams planning an app or platform",
  },
  {
    slug: "app",
    name: "Full app",
    price: "NOK 15,000",
    summary: "A working web or mobile app, from login and database to the screens your users see.",
    includes: [
      "User accounts and login",
      "Database and backend",
      "Admin view to manage content or users",
      "Launch and handover, with the source code",
    ],
    fit: "MVPs, booking systems, internal tools",
    highlight: true,
  },
];

export const process = [
  { title: "Short chat", text: "We talk about what you need, free and without obligation." },
  { title: "Fixed quote", text: "You get a clear scope and price before any work starts." },
  { title: "Build", text: "I build it and show you progress along the way." },
  { title: "Launch", text: "We put it live and you get everything you need to own it." },
];

// From the CV profile section
export const about = [
  "I'm an IT and Management graduate from the University of South-Eastern Norway with hands-on experience in databases, SQL, data analysis and full-stack development.",
  "Through my degree and my own projects I have worked with data modelling, REST APIs, Firebase/Firestore, access control and project data analytics, always in teams using Git and GitHub. Alongside work I'm building the mobile app Rihla with a co-founder.",
  "I'm curious about both technology and business, and I work in a structured way. Next, I want to grow in software engineering, data platforms and information security, and keep building products that use AI where it genuinely helps.",
];

// `featured: true` projects appear on the homepage
/*
  Project fields (all optional except slug, name, summary):
  overview  longer description of the product
  problem / solution
  features  what the product does
  points    what *I* did (my part)
  security  security and privacy decisions in the project
  team, links, images, stack
  Facts come from the CV and from each project's own repository.
*/
export const projects = [
  {
    // Source: CV + Rihla repo (apps/mobile, apps/api, apps/admin, backend)
    slug: "rihla",
    name: "Rihla",
    year: "2026 – ongoing",
    role: "Co-founder and developer, MYC",
    team: "Two co-founders",
    summary:
      "An Islamic learning app for iOS and Android, with a Next.js admin web app for content.",
    overview:
      "Rihla is a mobile learning app being built for the App Store and Google Play. It brings the Quran, Hadith collections, Arabic practice and everyday tools into one app, with an AI assistant for questions and progress goals to keep learning going.",
    features: [
      "Quran reader with bookmarks, and Hadith browsable by collection and section.",
      "Arabic course: letters, harakat, words and sentences, each with practice exercises.",
      "AI chat that answers questions at the learner's level and returns checked source references.",
      "Progress goals, prayer times, Qibla direction, onboarding and a user profile.",
      "A separate Next.js admin portal for managing content and users.",
    ],
    points: [
      "I own the home screen and the Quran and Hadith section of the mobile app.",
      "Work alongside my co-founder in a shared monorepo: mobile app, API, admin portal and shared packages for design tokens, types and UI components.",
    ],
    security: [
      "The AI endpoint verifies a Firebase ID token on every request before calling the model, and the Gemini API key never leaves the server.",
      "Per-user and global rate limits on AI requests; release builds refuse to send AI requests over plain HTTP.",
      "Admin access is granted only by a server-side record that clients cannot create, enforced in Firestore security rules.",
    ],
    stack: ["React Native", "Expo", "TypeScript", "Next.js", "Tailwind CSS", "Node.js", "Express", "Firebase", "Gemini API"],
    status: "In development",
    featured: true,
  },
  {
    slug: "listly",
    name: "Listly",
    year: "2026",
    role: "Solo project",
    summary:
      "A mobile app that checks rental and used-car listings for scam signals before you pay anything.",
    problem:
      "Rental and used-car scams on marketplaces follow familiar patterns, but they are easy to miss when you are in a hurry to secure a flat or a car.",
    solution:
      "Paste a link, the listing text or a screenshot from Finn, Hybel, Facebook or anywhere else, and Listly returns a risk score with the reasons behind it.",
    features: [
      "Two categories, housing and cars, each with its own rules, facts and advice.",
      "Three ways to check: paste a link, paste text or upload a screenshot, or share straight from another app.",
      "Risk score from 0 to 100, with every red flag labelled as coming from a rule or from the AI.",
      "Next steps tailored to the result, such as using a deposit account for rentals or checking the vehicle registers for cars.",
      "History with filters and statistics, stored locally on the phone, plus a Learn tab with common scam tricks.",
    ],
    points: [
      "Designed and built the whole app and API on my own.",
      "An AI model extracts structured JSON facts from the listing; a deterministic rule engine then checks them against known scam patterns, so the score never depends on the AI alone.",
      "Added time-outs so a stalled AI call fails cleanly instead of leaving the user waiting, and covered the scoring logic with automated tests.",
    ],
    security: [
      "The AI API key stays on the server; the app only talks to my own API.",
      "Check history is kept on the device, not in a cloud database.",
    ],
    links: [{ label: "Source on GitHub", href: "https://github.com/Malcomtheboy/Listly" }],
    stack: ["React Native", "Expo", "TypeScript", "Node.js", "Express", "Gemini API", "Node test runner"],
    // Screenshots from the Listly repo (UI is in Norwegian)
    images: [
      { src: "/images/projects/listly/sjekk.jpg", alt: "Listly check screen with a choice between housing and car" },
      { src: "/images/projects/listly/resultat-bil.jpg", alt: "Result for a scam car listing: 0 out of 100, high risk" },
      { src: "/images/projects/listly/historikk.jpg", alt: "History screen with statistics and a filter per category" },
    ],
    status: "Prototype",
    featured: true,
  },
  {
    slug: "noragentic",
    name: "Noragentic",
    year: "2026", // TODO: confirm
    role: "Bachelor project",
    team: "Team of five",
    summary:
      "A full-stack communication and project-management platform connecting customers with administrators.",
    overview:
      "Noragentic is two connected web portals: one for customers and one for employees. Customers follow their projects, share files and talk to the team; employees manage customers, projects and tasks and see how work is progressing.",
    features: [
      "Real-time chat between customers and the team.",
      "File sharing with uploads to cloud storage.",
      "Project and task tracking with live updates.",
      "Analytics dashboards with charts of project progress.",
      "Separate logins and views for customers and employees.",
    ],
    points: [
      "My part was the customer portal and the analytics views for employees.",
      "Integrated backend services through REST APIs and worked with data, files and project progress analytics.",
      "Built real-time features on Firestore listeners, so chat and project status update without reloading.",
    ],
    security: [
      "Authentication with Firebase Auth and role-based access, so customers only see their own projects and employees get the tools they need.",
    ],
    links: [
      { label: "Customer portal on GitHub", href: "https://github.com/Malcomtheboy/NoragenticKundeportalKunder" },
      { label: "Employee portal on GitHub", href: "https://github.com/Malcomtheboy/NoragenticKundeportalAnsatte" },
    ],
    stack: ["JavaScript", "HTML", "CSS", "Firebase Auth", "Firestore", "Firebase Storage", "Chart.js", "REST APIs"],
    status: "Bachelor project",
    featured: true,
  },
  {
    // Source: Mohamed's own TRACE concept note. Planned product, not built yet.
    slug: "trace",
    name: "Trace",
    year: "Next",
    role: "Product concept",
    summary:
      "A planned AI assistant that turns scattered information into things you actually get done.",
    problem:
      "Important information arrives everywhere: a date in a message, a receipt screenshot, an email about a job application, a PDF you will need later. It gets lost across apps and old conversations.",
    solution:
      "Trace is one place to capture all of it. Instead of just storing it, the AI works out what each item means and helps you act on it. Save a photo of an invoice, and Trace recognises it as an invoice, pulls out the due date, offers to set a reminder and finds it again when you ask.",
    points: [
      "Capture anything: text, images, PDFs and links.",
      "AI understanding of what each item is about.",
      "Smart memory that sorts and remembers what you've saved.",
      "An action engine that turns information into tasks and reminders.",
      "Ask questions in plain language, like “When do I have to pay this bill?” or “Which jobs did I apply for last month?”",
    ],
    principle: "From information storage to information execution.",
    stack: [],
    status: "Concept · planned after Listly",
    featured: true,
  },
  {
    slug: "go123movies",
    name: "Go123Movies",
    year: "TODO",
    role: "Web application",
    summary:
      "A Java web application for movie content backed by a MySQL database.",
    points: [
      "MySQL integration via JDBC for storing and retrieving data.",
      "Wrote SQL queries and backend logic, structured into Model, View and Controller components for maintainability.",
    ],
    stack: ["Java", "MySQL", "JDBC", "MVC"],
    status: "Completed", // TODO: confirm
    featured: false,
  },
  {
    slug: "barbershop",
    name: "Malcom's Barbershop",
    year: "TODO",
    role: "Booking website",
    summary:
      "A responsive booking website where customers can submit and manage appointments.",
    features: [
      "Pages for services, the barbers and the shop itself.",
      "Online booking with customer registration and a booking confirmation page.",
    ],
    points: [
      "Built the site with plain HTML, CSS and JavaScript, responsive on phone and desktop.",
      "Used Firebase Realtime Database to store and manage booking and customer data.",
    ],
    links: [{ label: "Source on GitHub", href: "https://github.com/Malcomtheboy/Barbershop" }],
    stack: ["HTML", "CSS", "JavaScript", "Firebase Realtime Database"],
    status: "Completed", // TODO: confirm
    featured: false,
  },
];

// From the CV "Technical skills" section, grouped
export const skills = [
  {
    group: "Data & databases",
    items: ["SQL", "MySQL", "JDBC", "Database design", "Data modelling", "Data analysis & visualisation"],
  },
  {
    group: "Languages",
    items: ["JavaScript", "TypeScript", "Java", "Python (basic)", "HTML5", "CSS"],
  },
  {
    group: "Frameworks & platforms",
    items: ["React Native (Expo)", "Next.js", "Firebase", "Firestore", "Microsoft Azure (academic)"],
  },
  {
    group: "Security & practice",
    items: ["REST APIs & authentication", "Role-based access control", "Information security", "Git & GitHub", "Documentation"],
  },
];

export const education = [
  {
    title: "Bachelor's Degree in IT and Management",
    org: "University of South-Eastern Norway (USN)",
    period: "2023 – 2026",
    note: "Databases, data analysis and visualisation, software development, systems development and project work.",
  },
];

// The updated CV lists only the first two. `earlier: true` roles stay out of
// the homepage and can be shown on /experience if Mohamed wants them.
export const experience = [
  {
    title: "Warehouse Assistant",
    org: "BAMA",
    period: "Jul 2025 – present",
    note: "Handling goods by established routines in a fast-paced environment, with a focus on accuracy, reliability and teamwork.",
  },
  {
    title: "Childcare Worker",
    org: "PVS, Oslo",
    period: "Mar 2023 – present",
    note: "Supporting daily activities and communicating clearly with children, colleagues and supervisors.",
  },
  { title: "Healthcare Worker", org: "Oksenøya Nursing Home", period: "Jul 2024", earlier: true },
  { title: "Crew Member", org: "McDonald's", period: "Jun – Sep 2021", earlier: true },
];

export const strengths = [
  "Analytical and solution-oriented",
  "Takes initiative and learns quickly",
  "Structured, independent and responsible",
  "Enjoys teamwork and clear communication",
];

export const languages = ["Norwegian (fluent)", "English (fluent)"];
