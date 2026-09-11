export const REFERENCE_OPERATIONAL = [
  "Command: Dashboard; active Incidents; manual reports; history; threat posture",
  "Visual context: Digital Twins; maps; Floor Plan Studio; Camera Wall; supported live / archive / PTZ",
  "People: Response Operations; GPS; SOS; messages; calls; screen sharing; body cameras",
  "Field: Today; guidance; patrols; briefings; assets; equipment; lone-worker safety; handover",
  "Evidence & insight: Cases; protected files; structured reports; Alarm Analytics; Aura; Help",
] as const;

export const REFERENCE_ENGINEERING = [
  "Automation: Alarm Policies; SOPs; Guided Response / Guide Builder; Connector Flows; Scheduler",
  "Devices & runtime: Object Wizard; AI Appliances; VMS Systems; Runtime Health; protocol adapters",
  "Identity & policy: Organization; users; Page Access; directory identities; settings; code catalogs",
  "Deployment: Branding; license activation; map content; file storage; setup; configuration recovery",
  "Assurance: Readiness; sample exercises; security evidence; VAPT readiness; audit review",
] as const;

export type ScreenshotGalleryItem = {
  src: string;
  title: string;
  alt: string;
  href?: string;
  caption?: string;
};

export const SCREENSHOT_GALLERY: ScreenshotGalleryItem[] = [
  {
    src: "/platform/gallery/gallery-dashboard.webp",
    title: "Operations dashboard",
    alt: "Dashboard with synthetic industrial records",
    href: "/platform/operations",
  },
  {
    src: "/platform/gallery/gallery-sop.webp",
    title: "SOP workflow canvas",
    alt: "SOP canvas sample procedure",
    href: "/platform/automation",
  },
  {
    src: "/platform/gallery/gallery-org.webp",
    title: "Organization",
    alt: "Organization hierarchy sample",
    href: "/platform/administration",
  },
];

export const ARCHITECTURE_LAYERS = [
  { label: "Operations Web", description: "Control room & administration" },
  { label: "Mobile PWA", description: "Assigned field work" },
  { label: "Help / Aura", description: "Guidance & enabled sources" },
  {
    label: "SUP Application",
    description: "Business modules · permissions · APIs · realtime coordination",
  },
  { label: "PostgreSQL", description: "Durable operational records" },
  { label: "Redis", description: "Cache, sessions & coordination" },
  { label: "Protected storage", description: "Evidence, maps & shared assets" },
] as const;
