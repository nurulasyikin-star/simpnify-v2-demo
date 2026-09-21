/** Client-facing copy distilled from Help Center + Gotham-style platform narrative. */

/** Production content-video hero (variant C — lifecycle span, Gotham centered). */
export const PLATFORM_CONTENT_VIDEO_HERO = {
  eyebrow: "SIMPNIFY / UNIFIED PLATFORM",
  headlineLine1: "Unified operations from",
  headlineLine2: "first signal to proof",
  subhead:
    "Unify sensors, AI analytics, and cyber into one operational picture — from triage to accountable closure.",
  audience: "Industrial & critical infrastructure",
} as const;

export const DECISION_OS_BANNER = {
  eyebrow: "PLATFORM POSITIONING",
  title: "One operating layer for security and incident decisions",
  description:
    "Fuse disconnected physical, safety, and cyber systems into role-based workspaces, governed automation, and an audit-ready record — from first signal to accountable closure.",
  parallels: [
    {
      theme: "Unified context",
      clientLine: "Integrate multi-brand VMS, access, analytics, and cyber into one operational picture.",
    },
    {
      theme: "Governed action",
      clientLine: "Alarm policies, SOPs, and guided response turn events into controlled procedures.",
    },
    {
      theme: "Durable proof",
      clientLine: "Approvals, communications, and evidence stay on the incident thread for review.",
    },
  ],
} as const;

export const HELP_MARKETING_LIFECYCLE = [
  {
    marketing: "Detect",
    help: "Accept",
    note: "Approved events enter the platform for triage.",
  },
  {
    marketing: "Understand",
    help: "Act (assess)",
    note: "Maps, video, twin, and policy shape the picture.",
  },
  {
    marketing: "Respond",
    help: "Act (execute)",
    note: "Operators and field teams follow controlled SOPs.",
  },
  {
    marketing: "Prove",
    help: "Record · Close",
    note: "Reports, evidence, and closure land in the record.",
  },
] as const;

export const TRUST_SURFACE_ITEMS = [
  {
    title: "Integration model",
    description:
      "Connectors and flows bring industrial telemetry and security systems into governed workflows — not another silo.",
  },
  {
    title: "Security & permissions",
    description:
      "Server-side authorization, layered page access, and role-aware workspaces — operators only see what they are permitted to act on.",
  },
  {
    title: "Deployment flexibility",
    description:
      "Browser consoles with on-premise and offline operation patterns suited to critical sites and controlled networks.",
  },
] as const;

export const STORY_EXTRACTION_NOTES = [
  "Help Center: six workspaces + Automation Studio + Intelligence + Assurance",
  "Marketing lifecycle maps to Help Accept → Act → Record → Close",
  "Palantir Gotham pattern: fuse data → situational picture → decide → act → learn",
] as const;
