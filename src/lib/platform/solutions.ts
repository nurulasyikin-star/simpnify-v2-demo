import type { SolutionScenario } from "./types";

export const SOLUTION_SCENARIOS: SolutionScenario[] = [
  {
    slug: "perimeter-intrusion",
    number: "01",
    title: "Perimeter intrusion",
    subtitle: "02:14 — An intrusion alert at the north fence.",
    steps: [
      { step: "01", label: "Detect", description: "Approved perimeter event" },
      { step: "02", label: "Verify", description: "Camera + location context" },
      { step: "03", label: "Respond", description: "Dispatch the assigned guide" },
      { step: "04", label: "Record", description: "Evidence + controlled closure" },
    ],
    whyItMatters:
      "A decision path the team can follow — with an outcome the supervisor can review.",
    image: "/platform/scenarios/scenario-01-perimeter.webp",
    alt: "Perimeter intrusion decision flow diagram",
  },
  {
    slug: "responder-sos",
    number: "02",
    title: "Responder SOS",
    subtitle: "A field officer is hurt. Help starts with SOS.",
    steps: [
      { step: "01", label: "Request", description: "Officer activates SOS on mobile" },
      { step: "02", label: "Coordinate", description: "Control room acknowledges and dispatches" },
      { step: "03", label: "Respond", description: "Assigned responders share progress" },
      { step: "04", label: "Review", description: "Record the response and required reports" },
    ],
    image: "/platform/scenarios/scenario-02-sos.webp",
    alt: "Responder SOS scenario illustration",
  },
  {
    slug: "restricted-area",
    number: "03",
    title: "Restricted area",
    subtitle: "A restricted door event needs a quick decision.",
    steps: [
      { step: "01", label: "Signal", description: "Qualified door / access event arrives" },
      { step: "02", label: "Context", description: "Policy identifies the relevant Digital Twin" },
      { step: "03", label: "Check", description: "Operator follows the approved verification SOP" },
      { step: "04", label: "Record", description: "Link evidence and outcome to the incident" },
    ],
    whyItMatters:
      "The event arrives with operational context and a repeatable response path.",
    image: "/platform/scenarios/scenario-03-restricted.webp",
    alt: "Restricted area access response flow",
  },
  {
    slug: "field-offline",
    number: "04",
    title: "Field offline",
    subtitle: "The connection drops during a field task.",
    steps: [
      { step: "01", label: "Continue", description: "Use eligible downloaded mission context" },
      { step: "02", label: "Retain", description: "Keep supported drafts and queued changes" },
      { step: "03", label: "Sync", description: "Reconnect and submit in order" },
      { step: "04", label: "Confirm", description: "Resolve conflicts and verify acceptance" },
    ],
    whyItMatters:
      "The user can distinguish retained work from records actually accepted by the server.",
    image: "/platform/scenarios/scenario-04-offline.webp",
    alt: "Field offline continuity workflow",
  },
];

export function getSolutionBySlug(slug: string) {
  return SOLUTION_SCENARIOS.find((s) => s.slug === slug);
}
