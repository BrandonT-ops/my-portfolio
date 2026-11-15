/**
 * System blueprint for each project, keyed by project slug.
 *
 * Each blueprint is a list of layers read left to right (who uses it → what
 * they touch → what does the work → where the data lives). Every box in one
 * layer connects to every box in the next. Keep labels short (≤ 18 characters).
 * A project without an entry here falls back to its tech stack.
 */
export const systems: Record<string, string[][]> = {
  maguida: [["Shopper"], ["Next.js UI"], ["Search API", "AI advice"], ["400+ products"]],
  "restore-forest-cameroon": [["Field forms", "Dashboards"], ["Angular app"], ["Spring Boot API"], ["PostgreSQL"]],
  memento: [["Members", "Admins"], ["Vite app"], ["Supabase Auth", "Row-level security"], ["PostgreSQL"]],
  tomo: [["Rider app", "Driver app"], ["Django API", "Live channels"], ["PostGIS", "Redis", "Mobile money"]],
  sygenes: [["Staff", "Students"], ["Tailwind UI"], ["Service calls"], ["Symfony backend"]],
  hemowatch: [["Wear OS sensors"], ["Watch app"], ["Flutter app"], ["Live metrics", "Alerts"]],
  "global-english-institute": [["Students", "Staff"], ["Angular 18"], ["Supabase", "Edge Functions"], ["Resend email"]],
  laboussole: [["Learners"], ["Web app"], ["Sign-in", "Courses", "Progress"]],
  comparer: [["Visitors"], ["Angular 19 UI"], ["Django API"], ["Product data"]],
  autofish: [["Client apps"], ["REST API"], ["Django"], ["PostgreSQL"]],
  "esign-registration": [["Candidates"], ["Responsive UI"], ["Symfony"], ["Records", "Receipts"]],
  "medical-school-file-manager": [["Students", "Moderators", "Admins"], ["Laravel app"], ["MySQL", "Local disk", "Google Drive"]],
  eduflex: [["Teachers"], ["Grade entry"], ["Calculation"], ["Reports"]],
  "fauna-pulse": [["Soil sensors"], ["Supabase"], ["Flutter app"], ["Dashboards", "LLaMA insights"]],
  "smart-haven": [["Coop sensors"], ["Supabase"], ["Flutter app"], ["Alerts", "LLaMA assistant"]],
  "smart-fire-detection": [["Smoke", "Heat", "Gas"], ["Sensor nodes"], ["Wi-Fi / Bluetooth"], ["Monitoring unit", "Alerts"]],
  autogex: [["User stories"], ["3 sprints"], ["15-person team"], ["Java modules"]],
  pras: [["4 sensors", "Home devices"], ["Python hub", "ML model"], ["HTTP · WebSockets"], ["Web server"]],
  "smart-point": [["5 peripherals"], ["Embedded software"], ["Hardware build"]],
  "digital-signature": [["User"], ["Tkinter UI"], ["Signature tool"]],
};

/** A project's blueprint, with box labels translated when a translation table is given. */
export const getSystem = (slug: string, stack: string[], labels: Record<string, string> = {}): string[][] =>
  (systems[slug] ?? stack.slice(0, 4).map((s) => [s])).map((layer) => layer.map((l) => labels[l] ?? l));
