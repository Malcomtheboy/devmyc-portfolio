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
    src: "/images/mohamed-portrait.jpg",
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
  { href: "/contact", label: "Contact" },
];

// From the CV profile section
export const about = [
  "I'm an IT and Management graduate from the University of South-Eastern Norway with hands-on experience in databases, SQL, data analysis and full-stack development.",
  "Through my degree and my own projects I have worked with data modelling, REST APIs, Firebase/Firestore, access control and project data analytics, always in teams using Git and GitHub. Alongside work I'm building the mobile app Rihla with a co-founder.",
  "I'm curious about both technology and business, and I work in a structured way. Next, I want to grow in software engineering, data platforms and information security, and keep building products that use AI where it genuinely helps.",
];

// `featured: true` projects appear on the homepage
export const projects = [
  {
    slug: "rihla",
    name: "Rihla",
    year: "2026 – ongoing",
    role: "Co-founder and developer, MYC",
    summary:
      "An Islamic learning app for iOS and Android, with a Next.js admin web app for content.",
    points: [
      "Building the mobile app for the App Store and Google Play with React Native (Expo), plus an admin web app in Next.js with TypeScript and Tailwind.",
      "Responsible for the home screen and the Quran and Hadith section; the app also includes AI chat, progress goals and a profile.",
      "Working with my co-founder in a shared GitHub repository, with a planned role model that keeps admin and owner roles apart from regular users.",
    ],
    stack: ["React Native", "Expo", "Next.js", "TypeScript", "Tailwind CSS"],
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
    points: [
      "An AI model extracts structured facts from a pasted link, text or screenshot.",
      "A deterministic rule engine catches well-known scam patterns.",
      "The app returns a risk score from 0 to 100, red flags and concrete next steps.",
    ],
    stack: ["React Native", "Expo", "TypeScript", "Node.js", "Express", "Gemini API"],
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
    summary:
      "A full-stack communication and project-management platform connecting customers with administrators.",
    points: [
      "Integrated backend services through REST APIs and worked with data, files and project progress analytics.",
      "Built real-time chat and project tracking with Firebase and Firestore, with authentication and role-based access.",
    ],
    stack: ["Firebase", "Firestore", "REST APIs", "Role-based access"],
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
    points: [
      "Used Firebase Realtime Database to store and manage booking and customer data.",
    ],
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
