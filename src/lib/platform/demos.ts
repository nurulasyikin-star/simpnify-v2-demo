import type { CarouselSlide } from "./types";

export const FLOOR_PLAN_SLIDES: CarouselSlide[] = [
  {
    step: "01",
    title: "3D operating picture",
    description:
      "See rooms, openings, stairs and device placements in one spatial view.",
    image: "/platform/floor-plan/floor-01-3d.webp",
    alt: "Floor Plan Studio 3D view of industrial building",
  },
  {
    step: "02",
    title: "2D plan builder",
    description:
      "Draw walls and rooms; add doors, windows, zones, labels, stairs and lifts.",
    image: "/platform/floor-plan/floor-02-2d.webp",
    alt: "Floor Plan Studio 2D editor with sample rooms",
  },
  {
    step: "03",
    title: "Split workspace",
    description:
      "Edit in 2D and see the same geometry in 3D without changing tools.",
    image: "/platform/floor-plan/floor-03-split.webp",
    alt: "Floor Plan Studio split 2D and 3D view",
  },
  {
    step: "04",
    title: "Hands-on editing",
    description:
      "Select a room, rename it, and use undo and redo with measured dimensions.",
    image: "/platform/floor-plan/floor-04-edit.webp",
    alt: "Floor Plan Studio room selection and properties",
  },
];

export const SOS_SETTINGS_SLIDES: CarouselSlide[] = [
  {
    step: "01",
    title: "Visual planner",
    description:
      "See the response radius before saving — initial area, expansion step and maximum radius.",
    image: "/platform/sos-settings/sos-set-01-planner.webp",
    alt: "SOS settings visual dispatch radius planner",
  },
  {
    step: "02",
    title: "Coverage presets",
    description:
      "Compare Facility, Urban or Regional presets against your site requirements.",
    image: "/platform/sos-settings/sos-set-02-presets.webp",
    alt: "SOS coverage preset comparison",
  },
  {
    step: "03",
    title: "On-site context",
    description:
      "Tune what nearby and arrived mean on site with building lookup and proximity.",
    image: "/platform/sos-settings/sos-set-03-onsite.webp",
    alt: "SOS on-site context settings",
  },
  {
    step: "04",
    title: "Operational controls",
    description:
      "Make acknowledgement, dispatch and responder limits explicit before saving.",
    image: "/platform/sos-settings/sos-set-04-controls.webp",
    alt: "SOS operational timing and capacity controls",
  },
  {
    step: "05",
    title: "Revision history",
    description:
      "Enter a reason, validate and save — active cases retain their original policy snapshot.",
    image: "/platform/sos-settings/sos-set-05-revision.webp",
    alt: "SOS settings revision history",
  },
];

export const GUIDED_RESPONSE_SLIDES: CarouselSlide[] = [
  {
    step: "01",
    title: "Start configuring",
    description:
      "Choose a field-response sample or begin with a blank canvas.",
    image: "/platform/guided-response/guide-01-start.webp",
    alt: "Guide Builder start screen with samples",
  },
  {
    step: "02",
    title: "Branching logic",
    description:
      "Make each answer lead somewhere clear with decision branches and completion paths.",
    image: "/platform/guided-response/guide-02-branch.webp",
    alt: "Guide canvas with branching decision flow",
  },
  {
    step: "03",
    title: "Definition settings",
    description:
      "Name, description and the step that starts the response procedure.",
    image: "/platform/guided-response/guide-03-config.webp",
    alt: "Guide definition settings panel",
  },
  {
    step: "04",
    title: "Evidence requirements",
    description:
      "Specify scene photo, camera selection, file limits and GPS per step.",
    image: "/platform/guided-response/guide-04-evidence.webp",
    alt: "Guide step evidence configuration",
  },
  {
    step: "05",
    title: "Review before publish",
    description:
      "Structural checks and guide preview — resolve broken paths before publishing.",
    image: "/platform/guided-response/guide-05-review.webp",
    alt: "Guide review panel with structural checks",
  },
];

export const CONNECTOR_SLIDES: CarouselSlide[] = [
  {
    step: "01",
    title: "Visual path",
    description:
      "See how an incoming event is received, evaluated, enriched and recorded.",
    image: "/platform/connectors/conn-01-flow.webp",
    alt: "Connector Flow canvas overview",
  },
  {
    step: "02",
    title: "Node settings",
    description:
      "Configure name, timeout, command action and compute script per node.",
    image: "/platform/connectors/conn-02-node.webp",
    alt: "Connector node settings panel",
  },
  {
    step: "03",
    title: "Building blocks",
    description:
      "Build with the configured node library — drivers and system tasks.",
    image: "/platform/connectors/conn-03-blocks.webp",
    alt: "Connector system node catalog",
  },
  {
    step: "04",
    title: "MQTT configuration",
    description:
      "Broker, client identity, topic filters and QoS for cabinet telemetry alerts.",
    image: "/platform/connectors/conn-04-mqtt.webp",
    alt: "MQTT connector instance configuration",
  },
];

export const CONNECTOR_INTEGRATION_PATHS = [
  {
    title: "Known integration",
    description:
      "Use a matching ONVIF, vendor SDK, VMS or device integration; confirm model and firmware.",
  },
  {
    title: "Documented protocol",
    description:
      "Use cataloged MQTT, HTTP, TCP/UDP, AMQP or WebSocket capabilities and supported payload formats.",
  },
  {
    title: "Protocol bridge",
    description:
      "For interfaces without a native driver, use a qualified gateway or develop and commission an adapter.",
  },
] as const;

export const AURA_SLIDES: CarouselSlide[] = [
  {
    step: "01",
    title: "Ask naturally",
    description:
      "Use everyday questions for approved help and enabled operational sources in the workflow.",
    image: "/platform/aura/aura-01-ask.webp",
    alt: "Aura workspace answering an operator question",
  },
  {
    step: "02",
    title: "Grounded sources",
    description:
      "Review source title, context, excerpt and help link before acting on the answer.",
    image: "/platform/aura/aura-02-sources.webp",
    alt: "Aura answer evidence with source excerpts",
  },
  {
    step: "03",
    title: "Knowledge governance",
    description:
      "Maintain approved operational guidance under the organization's access policy.",
    image: "/platform/aura/aura-03-governance.webp",
    alt: "Aura knowledge workspace with access settings",
  },
  {
    step: "04",
    title: "Industrial use cases",
    description:
      "Shift start, procedure support, incident review, visual verification and accountable decisions.",
    image: "/platform/aura/aura-04-usecases.webp",
    alt: "Aura industrial prompt patterns overview",
  },
];

export const AURA_USE_CASES = [
  "Shift start — permitted active incidents and outstanding context",
  "Procedure support — packaged product help and approved knowledge",
  "Incident review — authorized resolution records and analytics",
  "Visual verification — enabled live or recorded camera context",
  "Accountable decisions — check the record and follow approved procedure",
] as const;

export const COMMS_SLIDES: CarouselSlide[] = [
  {
    step: "01",
    title: "Direct messages",
    description:
      "Coordinate with an eligible colleague — request, observation and next action stay readable.",
    image: "/platform/comms/comms-01-direct.webp",
    alt: "Direct messages between control room and responder",
  },
  {
    step: "02",
    title: "Response team",
    description:
      "Keep authorized participants aligned around a common task with explicit scope.",
    image: "/platform/comms/comms-02-team.webp",
    alt: "Group conversation for response team coordination",
  },
  {
    step: "03",
    title: "Video call",
    description:
      "Clarify the visual observation before recording the operational decision.",
    image: "/platform/comms/comms-03-video.webp",
    alt: "Control room video call with field responder",
  },
  {
    step: "04",
    title: "Group discussion",
    description:
      "Control room, response, supervision and technical support in one conversation.",
    image: "/platform/comms/comms-04-group.webp",
    alt: "Four-person group call UI",
  },
  {
    step: "05",
    title: "Operational options",
    description:
      "Voice, video, group calls and screen sharing — qualified on site within access policy.",
    image: "/platform/comms/comms-05-options.webp",
    alt: "Communications operational options overview",
  },
];

export const COMMS_CONTINUITY_STEPS = [
  { step: "01", label: "Write", description: "Prepare the field update" },
  { step: "02", label: "Retain", description: "Mobile caches supported threads and replies" },
  { step: "03", label: "Reconnect", description: "Submit the ordered reply outbox" },
  { step: "04", label: "Review", description: "Read the shared conversation" },
] as const;

export const MQTT_EXAMPLE = {
  topic: "plant/a/cabinet/c07/telemetry",
  condition: "temperature_c >= 75",
  response: "Verify the cabinet condition under the site procedure",
  steps: [
    { step: "01", label: "Publish", description: "Cabinet sensor → site broker" },
    { step: "02", label: "Subscribe", description: "SUP MQTT receive connector" },
    { step: "03", label: "Match", description: "Device + temperature condition" },
    { step: "04", label: "Dispatch", description: "Incident → SOP → field guide" },
  ],
} as const;
