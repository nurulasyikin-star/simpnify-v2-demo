import type { ChecklistItem, PipelineStep } from "./types";

export const PILOT_SEQUENCE: PipelineStep[] = [
  {
    step: "01",
    label: "Discover",
    description: "Choose area, events and success measures",
  },
  {
    step: "02",
    label: "Configure",
    description: "Qualify devices, roles and workflows",
  },
  {
    step: "03",
    label: "Exercise",
    description: "Run observed Web and Mobile scenarios",
  },
  {
    step: "04",
    label: "Decide",
    description: "Review evidence and agree the next phase",
  },
];

export const PILOT_ROLES = [
  {
    title: "Security lead",
    description: "Own the procedure and incident outcomes",
  },
  {
    title: "IT / engineering",
    description: "Own interfaces, network and deployment",
  },
  {
    title: "Operations sponsor",
    description: "Own adoption and measurable value",
  },
] as const;

export const PILOT_ACCEPTANCE: ChecklistItem[] = [
  {
    title: "Event integrity",
    description:
      "Correct policy; duplicate and timeout behavior demonstrated",
  },
  {
    title: "Operational handling",
    description:
      "Ownership, SOP gates, handover and closure demonstrated",
  },
  {
    title: "Field completion",
    description:
      "Assignment, eligible evidence and synchronization demonstrated",
  },
  {
    title: "Access boundaries",
    description:
      "Allowed and denied role / object scenarios demonstrated",
  },
  {
    title: "Resilience",
    description:
      "Reconnect, dependency recovery and restore tests appropriate to scope",
  },
  {
    title: "User value",
    description:
      "Baseline versus pilot coordination effort and report completeness",
  },
];
