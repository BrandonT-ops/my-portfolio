import type { ProjectText } from "@/content/types";

/** English text for every project, keyed by slug. Figures come from Brandon's CVs. */
export const projectsEn: Record<string, ProjectText> = {
  maguida: {
    summary: "An AI-integrated product search engine that gives shoppers personalised buying advice.",
    role: "Frontend developer",
    context: "Shoppers in Cameroon had no easy way to search across local products and get advice on what to buy.",
    approach: [
      "Built the frontend in Next.js with a responsive interface for searching and browsing 400+ products.",
      "Integrated AI features that give personalised purchasing advice.",
      "Server-rendered key pages with Next.js so search engines could index them.",
      "Worked with the backend team to cache responses and keep search and AI recommendations fast.",
      "Built a library of reusable components to keep the codebase lean and ready for future updates."
    ],
    outcome: "Serves 200+ monthly users. Customer satisfaction rose by about 10%, data processing time dropped by 20%, and reusable components cut frontend development time by 25%.",
    status: "No longer online: the agency ended its hosting.",
    challenges: [
      {
        title: "Getting backend-driven pages onto Google",
        problem: "Every page was assembled from data the backend sent on request. A search engine visiting the site found very little to index, so individual pages could not be found on Google.",
        solution: "We rendered pages on the server with Next.js, so the content is already in the page when a crawler arrives. There were too many pages to do this for all of them, so we server-rendered the home page, the most popular products and the categories, and left the rest to load in the browser."
      },
      {
        title: "Keeping the interface in step with a slow backend",
        problem: "Search results and AI advice arrived late, so the interface often waited on the backend and the two fell out of step.",
        solution: "We worked on it from both sides: the frontend kept some responses for reuse instead of asking again, and we added caching with the backend team."
      }
    ],
    lessons: [
      "Render every product page for search engines, not only the popular ones. Next.js can build a page the first time it is visited and keep a saved copy, which removes the “too many pages” limit we hit.",
      "Show the AI advice as it is being written, word by word, so shoppers are never left waiting on a blank screen.",
      "I would probably also agree the data format with the backend team before building, so both sides stay in step from day one."
    ]
  },
  "restore-forest-cameroon": {
    summary: "A reforestation platform for managing forest resources and tracking progress across Cameroon.",
    role: "Frontend developer",
    context: "Reforestation teams needed one place to record forest resources and see how replanting was going region by region.",
    approach: [
      "Built the Angular frontend on top of a Spring Boot and PostgreSQL backend.",
      "Created interactive forms for entering and managing forest resource records.",
      "Added data visualisations showing reforestation progress and tree-species distribution across 10 regions.",
      "Optimised API communication between frontend and backend, using reusable Angular components."
    ],
    outcome: "Manages 100,000+ forest resource entries. Data entry became 30% faster, data fetch times fell by 40%, and reusable components cut development time by 25%."
  },
  memento: {
    summary: "A shared photo wall where members post, browse and moderate pictures.",
    role: "Full-stack developer & designer",
    context: "A community needed one place to collect and share its pictures, with sign-in so members own their posts and a way to keep the public wall clean.",
    approach: [
      "Built sign-in with email links and Google through Supabase Auth.",
      "Designed a public wall plus a personal page for each member's own pictures.",
      "Added an admin moderation area, with access enforced in the database by row-level security rules.",
      "Created two looks that follow the device theme: “Magazine” in light mode and “Gallery” in dark mode."
    ]
  },
  tomo: {
    summary: "A ride-hailing platform built for Cameroon, with mobile-money payments.",
    role: "Full-stack developer & architect",
    context: "Getting a safe, fairly priced ride in Cameroon often means negotiating on the street. Riders and drivers needed a local app that works with how people actually pay.",
    approach: [
      "Designed the backend as Django apps for users, drivers, vehicles, rides, ratings, payments and notifications.",
      "Used PostGIS to find nearby drivers, and Django Channels with Redis for live ride updates.",
      "Supported cash, MTN Mobile Money and Orange Money, with a wallet and commission tracking.",
      "Added safety features: QR-code driver verification, an SOS button and two-way ratings.",
      "Built the web and mobile apps with Angular and Ionic/Capacitor, in English and French."
    ]
  },
  sygenes: {
    summary: "ESIGN's digital grade management system for higher education.",
    role: "Frontend lead",
    context: "The school managed grades through scattered spreadsheets; staff and students needed one clear, reliable system.",
    approach: [
      "Led frontend development of a user-centred grade management system.",
      "Built responsive interfaces with HTML, CSS, JavaScript and Tailwind CSS.",
      "Used a component-based architecture that talks to the Symfony backend through service calls.",
      "Added theme customisation, dynamic notifications and two-step delete confirmation.",
      "Wrote system documentation and kept improving the product from user feedback."
    ]
  },
  hemowatch: {
    summary: "A phone and Wear OS watch app that monitors people living with sickle cell disease.",
    role: "Mobile developer",
    context: "Early warning signs of a sickle cell crisis are easy to miss day to day, but a watch is always on the wrist.",
    approach: [
      "Built a mobile app that collects health data in real time from Wear OS devices.",
      "Read heart rate, oxygen saturation, respiratory rate and body temperature from the watch's sensors.",
      "Designed a Flutter interface showing live health metrics.",
      "Added automatic alerts when readings cross set thresholds."
    ]
  },
  "global-english-institute": {
    summary: "A language-school website with an online placement test and sign-ups.",
    role: "Full-stack developer",
    context: "The institute handled placement tests and registrations by hand, so prospective students waited and staff re-typed the same details.",
    approach: [
      "Built the public site with program pages, contact details and legal pages.",
      "Created an online placement test whose results are stored in Supabase.",
      "Sent registration and test confirmation emails from Supabase Edge Functions using Resend.",
      "Gave staff an admin dashboard for tests, registrations, testimonials and site settings."
    ]
  },
  laboussole: {
    summary: "A responsive e-learning platform with multimedia courses and progress tracking.",
    role: "Software developer",
    context: "Learners needed courses they could follow on any device, with their progress saved.",
    approach: [
      "Designed and built core features: multimedia courses, user authentication and progress tracking.",
      "Worked with a multidisciplinary team on feature planning, testing and iterative improvements.",
      "Optimised the UI for cross-platform use, engagement and accessibility."
    ]
  },
  comparer: {
    summary: "A product and service comparison platform with search and filtering.",
    role: "Frontend developer",
    context: "People needed one place to compare products and services side by side instead of juggling tabs and spreadsheets.",
    approach: [
      "Built the responsive, mobile-first frontend with Angular 19 and Tailwind CSS.",
      "Designed interactive components for searching, filtering and comparing.",
      "Integrated with a Django backend to display live product data."
    ]
  },
  autofish: {
    summary: "The backend and API for the AutoFish platform, deployed on a VPS.",
    role: "Backend developer",
    context: "The AutoFish platform needed a reliable backend and API for its apps to build on.",
    approach: [
      "Built the backend in Django, with the core business logic and API endpoints.",
      "Designed and managed the PostgreSQL schema for data integrity and fast queries.",
      "Implemented secure user authentication and data handling.",
      "Deployed to a Hostinger VPS with production settings, and maintained the deployment pipeline."
    ]
  },
  "esign-registration": {
    summary: "The online registration platform for ESIGN's competitive entrance exam.",
    role: "Frontend developer & designer",
    context: "Entrance-exam registration was a paper process with queues and manual data entry.",
    approach: [
      "Designed the interface in Figma and built a responsive frontend for mobile, tablet and desktop.",
      "Implemented automatic receipt generation for each completed registration.",
      "Worked with the backend team on data flow and optimised API integration."
    ],
    outcome: "Supported 400+ exam candidates with 99.9% uptime during peak registration, and cut registration time by 15%."
  },
  "medical-school-file-manager": {
    summary: "A file system for a medical school, with nested folders and role-based access.",
    role: "Full-stack developer",
    context: "Course material was scattered across chats and personal drives, with no way to organise it by academic year or control who could change what.",
    approach: [
      "Organised files in unlimited nested folders, grouped by academic level (years 1–7).",
      "Defined roles for admins, level moderators, folder owners and standard users.",
      "Made storage swappable between the local server and Google Drive through configuration.",
      "Added archiving and restore, school branding settings and a statistics dashboard."
    ]
  },
  eduflex: {
    summary: "A grade management platform for schools.",
    role: "Full-stack developer",
    context: "Teachers were computing and reporting grades by hand.",
    approach: [
      "Built grade entry, automatic calculation and report generation."
    ]
  },
  "fauna-pulse": {
    summary: "A Flutter app that helps farmers monitor soil health and crop conditions.",
    role: "Mobile developer",
    context: "Farmers needed to see soil and crop conditions without walking every field.",
    approach: [
      "Built a Flutter app that displays sensor readings on soil activity and the growing environment.",
      "Stored and retrieved sensor data through a Supabase backend.",
      "Connected to the LLaMA API for AI-powered insights and in-app help.",
      "Designed dashboards that show real-time soil health at a glance."
    ]
  },
  "smart-haven": {
    summary: "A Flutter app that monitors poultry health and coop conditions in real time.",
    role: "Mobile developer",
    context: "Poultry farmers lose birds when temperature, humidity or health problems go unnoticed.",
    approach: [
      "Built a Flutter app for real-time monitoring of poultry health and environmental conditions.",
      "Used Supabase for data storage, live updates and history of sensor readings.",
      "Added a LLaMA-powered assistant for analysis and questions.",
      "Showed health metrics, environmental factors and automatic alerts in one interface."
    ]
  },
  "smart-fire-detection": {
    summary: "Embedded software for real-time fire detection over a wireless sensor network.",
    role: "Embedded software developer",
    context: "Fires spread fast when nobody is close enough to notice smoke or rising heat.",
    approach: [
      "Programmed sensor modules for smoke, temperature and gas, with threshold-based alerts.",
      "Designed the communication protocol between sensors and the central monitoring unit.",
      "Integrated Wi-Fi and Bluetooth modules for remote monitoring and timely alerts.",
      "Tested and debugged for accurate detection and stable connectivity."
    ]
  },
  autogex: {
    summary: "A Java regular-expression tool, built by a 15-person team using Scrum.",
    role: "Scrum lead & developer",
    context: "A school software project run like a real product team, with sprints and user stories.",
    approach: [
      "Managed a team of 15 people through the build using Scrum.",
      "Wrote the specifications and user stories; planned and ran 3 sprints.",
      "Implemented the module that cleans regular expressions by removing redundancies and mistakes."
    ]
  },
  pras: {
    summary: "A smart-home hub that controls household devices from sensor data and a machine-learning model.",
    role: "Software developer",
    context: "Households waste energy and miss safety issues when nobody is watching their devices.",
    approach: [
      "Built the central control software in Python to manage household equipment and sensor data.",
      "Connected the hub to a web server over HTTP and WebSockets for real-time data.",
      "Integrated four environmental sensors for monitoring and automatic control.",
      "Deployed a machine-learning model on the hub to improve automation decisions."
    ]
  },
  "smart-point": {
    summary: "An embedded system with five peripheral devices, built by a team of five.",
    role: "Embedded developer",
    context: "A first-year engineering project covering both the software and the physical build.",
    approach: [
      "Designed, implemented and tested the software for the system's 5 peripheral devices.",
      "Helped fabricate the hardware and wire its electrical connections."
    ]
  },
  "digital-signature": {
    summary: "A redesign of a desktop digital-signature tool built with Tkinter.",
    role: "UI redesign",
    context: "The existing desktop tool worked but was hard to use.",
    approach: [
      "Redesigned the interface and interaction flow within Tkinter's constraints."
    ]
  }
};
