import type { ModulePage } from "./types";

export const MODULE_PAGES: ModulePage[] = [
  {
    slug: "operations",
    eyebrow: "OPERATIONS WORKSPACE",
    title: "Start the shift with what needs attention",
    description:
      "Dashboard brings the current queue and the catch-up briefing together.",
    outcome: "One queue — every operator knows what needs attention next.",
    steps: [
      { step: "01", label: "Queue", description: "See New, My in progress and Parked incidents" },
      { step: "02", label: "Prioritize", description: "Spot the oldest unhandled item and material changes" },
      { step: "03", label: "Act", description: "Open Incidents to take the next authorized action" },
    ],
    image: "/platform/modules/module-operations.webp",
    alt: "Operations dashboard with incident queue",
    relatedDemos: [{ label: "SOS walkthrough", href: "/demo/sos" }],
  },
  {
    slug: "assets-video",
    eyebrow: "ASSETS & VIDEO",
    title: "Give every asset an operational address",
    description:
      "Digital Twins connect the site hierarchy to the tools used to operate it.",
    outcome: "Full site context before anyone moves.",
    steps: [
      { step: "01", label: "Organize", description: "Places, buildings, floors and devices" },
      { step: "02", label: "Inspect", description: "Authorized actions, incidents and physical placement" },
      { step: "03", label: "Manage", description: "Device adoption, AI Appliances and VMS from focused pages" },
    ],
    image: "/platform/modules/module-assets.webp",
    alt: "Digital Twins asset hierarchy view",
    relatedDemos: [{ label: "Floor Plan Studio", href: "/demo/floor-plan" }],
  },
  {
    slug: "automation",
    eyebrow: "AUTOMATION",
    title: "Turn approved events into controlled procedures",
    description:
      "Alarm Policies, SOPs, Guided Response and Connector Flows work as published revisions.",
    outcome: "Fewer false positives — SOPs without custom development.",
    steps: [
      { step: "01", label: "Receive", description: "Select an approved source and evaluate conditions" },
      { step: "02", label: "Prioritize", description: "Classification, scope and response binding" },
      { step: "03", label: "Trigger", description: "Incident, SOP and configured automation" },
    ],
    image: "/platform/modules/module-automation.webp",
    alt: "SOP workflow canvas",
    relatedDemos: [
      { label: "Guided Response", href: "/demo/guided-response" },
      { label: "Connectors", href: "/demo/connectors" },
    ],
  },
  {
    slug: "intelligence",
    eyebrow: "INTELLIGENCE & EVIDENCE",
    title: "Ask questions and keep the investigation connected",
    description:
      "Aura, analytics, cases and protected files under the organization's access policy.",
    outcome: "Investigations stay tied to the incident record.",
    steps: [
      { step: "01", label: "Explore", description: "Ask naturally about permitted operational sources" },
      { step: "02", label: "Verify", description: "Inspect answer evidence in the authorized workspace" },
      { step: "03", label: "Review", description: "Organize cases, link incidents and retrieve protected files" },
    ],
    image: "/platform/modules/module-intelligence.webp",
    alt: "Aura operational assistant workspace",
    relatedDemos: [
      { label: "Aura assistant", href: "/demo/aura" },
      { label: "Communications", href: "/demo/communications" },
    ],
  },
  {
    slug: "field",
    eyebrow: "FIELD OPERATIONS",
    title: "A field workspace built around the shift",
    description:
      "Today, briefings, patrols, communications and SOS within one mobile experience.",
    outcome: "Control room and field share one operational picture.",
    steps: [
      { step: "01", label: "Start informed", description: "Today workspace, briefings and post orders" },
      { step: "02", label: "Work with context", description: "Guidance, asset tasks and protected field reports" },
      { step: "03", label: "Stay connected", description: "Messages, calls, SOS and authorized location" },
    ],
    image: "/platform/modules/module-field.webp",
    alt: "Mobile field Today workspace",
    relatedDemos: [
      { label: "SOS response", href: "/demo/sos" },
      { label: "Communications", href: "/demo/communications" },
    ],
  },
  {
    slug: "administration",
    eyebrow: "ADMINISTRATION & ASSURANCE",
    title: "Make readiness and review part of the operation",
    description:
      "Organization, access, deployment readiness and audit review in one assurance workspace.",
    outcome: "Readiness and audit evidence by default.",
    steps: [
      { step: "01", label: "Organize", description: "Groups, roles and reporting structure" },
      { step: "02", label: "Control access", description: "Page operations and Digital Twin scope separately" },
      { step: "03", label: "Assure", description: "Readiness review, security evidence and audit export" },
    ],
    image: "/platform/modules/module-admin.webp",
    alt: "Organization hierarchy and assurance workspace",
  },
];

export function getModuleBySlug(slug: string) {
  return MODULE_PAGES.find((m) => m.slug === slug);
}
