import type {
  CarouselSlide,
  CompanyStat,
  HubCard,
  ImageFeature,
  LifecycleStage,
  PipelineStep,
  SiteChallenge,
  WhySimpnifyPoint,
  Workspace,
} from "./types";

export const COMPANY_STATS: CompanyStat[] = [
  {
    value: 10,
    suffix: "+",
    label: "Years delivering unified security platforms",
  },
  {
    value: 4,
    label: "Regional offices across ASEAN & Middle East",
  },
  {
    value: 2,
    label: "Domains — physical security & cyber operations",
  },
];

export const CUSTOMER_CHALLENGES = [
  {
    number: "01",
    title: "Fragmented context",
    description:
      "Operators reconstruct the event across screens, calls and logs.",
  },
  {
    number: "02",
    title: "Unclear ownership",
    description:
      "Handoffs make it harder to know who is acting and what is still open.",
  },
  {
    number: "03",
    title: "Inconsistent evidence",
    description:
      "The shift ends; the investigation is still looking for the facts.",
  },
] as const;

export const PLATFORM_INTRO = {
  eyebrow: "INTRO",
  title: "Simpnify",
  description:
    "Simpnify is an unified threats and risks management software platform that integrates physical security, safety and cyber security systems and functions, to enable collaboration and interoperability for enterprise-wide risks and threats handling.",
  image: "/platform/our-platform-site/monitor-gui.png",
  alt: "Simpnify unified monitoring console showing cameras, maps and alerts on a control room GUI",
};

export const PLATFORM_SOLUTION = {
  eyebrow: "THE SOLUTION",
  title: "One platform to integrate, manage and control",
  description:
    "Simpnify is a platform designed to revolutionize the way you integrate, manage and control your security applications and devices. Our platform provides you with an intuitive and user-friendly interface, allowing for the integration of multiple unconnected security applications and devices. We are committed to providing you with the best user experience, ensuring that you can easily manage and control your security needs. Simpnify enables numerous organizational benefits, including increased control, improved situation awareness and management reporting. Ultimately, these solutions allow organizations to reduce costs through improved efficiency and to improve security through increased intelligence.",
  images: [
    {
      src: "/platform/our-platform-site/simpnify-solution.png",
      alt: "Simpnify platform dashboard unifying security systems on desktop",
    },
    {
      src: "/platform/our-platform-site/solution-mobile.png",
      alt: "Simpnify platform experience on mobile for field and on-the-go access",
    },
  ],
};

export const SITE_CHALLENGES: SiteChallenge[] = [
  {
    number: "01",
    title: "One-site operation",
    description:
      "Integrating multiple unconnected security applications and devices takes a sophisticated approach to networking and secure architecture — and that security has to hold up over time.",
    image: "/platform/our-platform-site/one-site.png",
    alt: "Single-site security operation combining multiple connected systems",
  },
  {
    number: "02",
    title: "Multi-site operation",
    description:
      "Multiple sites with different branded systems are hard to unify — especially when systems aren't compatible. Scalability, data unification and security all have to be considered together.",
    image: "/platform/our-platform-site/multi-site.png",
    alt: "Multiple sites with different branded security systems being unified",
  },
  {
    number: "03",
    title: "Security convergence requirement",
    description:
      "CISA's Cybersecurity and Physical Security Convergence guidance protects critical assets, detects and responds to threats quickly, and keeps operations secure — organizations should review and implement it.",
    image: "/platform/our-platform-site/cisa-convergence.png",
    alt: "CISA cybersecurity and physical security convergence diagram",
  },
];

export const UNIFIED_OPERATION_ITEMS = [
  "Multiple sites",
  "Multiple different brands of CCTV VMS software",
  "Multiple different brands of Access Control software",
  "Multiple different brands of video analytics software",
  "Multiple different brands of cyber security software",
  "Multiple different brands of BMS, ICS software",
  "Multiple sites following operating procedures with the same high standard & governance",
  "And more…",
] as const;

export const WHY_SIMPNIFY_POINTS: WhySimpnifyPoint[] = [
  {
    title: "Unified threats & risks management",
    description:
      "Ensures physical and cyber assets are secure under one collaborative platform.",
  },
  {
    title: "Fulfils the latest requirement of CISA",
    description:
      "Meets current CISA cybersecurity and physical security convergence guidance.",
  },
  {
    title: "Streamlines JESIP",
    description:
      "Joint Emergency Services Interoperability Principles, implemented through the Joint Decision Model (JDM).",
  },
];

export const USER_CONFIGURABLE_SOP: ImageFeature = {
  eyebrow: "USER CONFIGURABLE SOP",
  title: "Workflow and alarm rules, in the hands of the end user",
  points: [
    "Complete SOP, Workflow and Alarm Rules customization are in the hand of the end user.",
    "Create powerful and flexible processes and procedures to deal with events.",
    "Policies are set up using workflows which link to all physical and cyber assets.",
    "Enable auto-resolve of low level incidents (e.g. maintenance, etc.).",
    "Combine multiple video analytics + sensors to automate daily tasks.",
  ],
  image: "/platform/our-platform-site/workflow-builder.png",
  alt: "Workflow builder for configuring SOPs and alarm rules",
};

export const DIGITAL_TWIN_FEATURE: ImageFeature = {
  eyebrow: "DIGITAL TWIN (3D ENGINES INTEGRATION)",
  title: "Real-time, interactive 3D models of every critical asset",
  points: [
    "Real-Time, Interactive 3D Models: dynamic 3D representations of physical assets and environments.",
    "Enhanced Planning and Monitoring: efficient planning and continuous monitoring of critical infrastructure.",
    "Emergency Response: improved management and responsiveness in emergency situations.",
    "Seamless Integration: works within a consolidated platform across IoT, Security, Fire, Disaster, Energy and Building Management.",
    "Advanced Visualization: a sophisticated visualization tool for better situational awareness and decision-making.",
  ],
  image: "/platform/our-platform-site/digital-twin.png",
  alt: "Digital twin 3D model of a facility for real-time monitoring",
};

export const VALUE_PILLARS = [
  {
    title: "See the context",
    description:
      "Bring authorized incidents, devices, maps and video together.",
  },
  {
    title: "Coordinate the action",
    description:
      "Give operators and responders clear tasks and controlled procedures.",
  },
  {
    title: "Keep the proof",
    description:
      "Preserve reports, evidence and the history needed for review.",
  },
] as const;

export const INCIDENT_LIFECYCLE: LifecycleStage[] = [
  {
    step: "01",
    label: "Detect",
    description: "Approved sensor, AI or operator event enters the platform.",
    outcome: "Fewer missed signals — triage starts in one place.",
    modules: [
      { label: "Alarm policies", href: "/platform/automation" },
      { label: "Connector flows", href: "/demo/connectors" },
      { label: "Operations workspace", href: "/platform/operations" },
    ],
  },
  {
    step: "02",
    label: "Understand",
    description: "Policy, maps, video and twin context shape the picture.",
    outcome: "Full site context before anyone moves.",
    modules: [
      { label: "Assets & video", href: "/platform/assets-video" },
      { label: "Floor Plan Studio", href: "/demo/floor-plan" },
      { label: "Aura assistant", href: "/demo/aura" },
    ],
  },
  {
    step: "03",
    label: "Respond",
    description: "Operators and field teams follow controlled procedures.",
    outcome: "Clear handoffs — SOPs without custom development.",
    modules: [
      { label: "SOS response", href: "/demo/sos" },
      { label: "Response policy", href: "/demo/sos-settings" },
      { label: "Guided Response", href: "/demo/guided-response" },
      { label: "Field operations", href: "/platform/field" },
    ],
  },
  {
    step: "04",
    label: "Prove",
    description: "Evidence, reports and closure land in the record.",
    outcome: "Audit-ready closure with a durable trail.",
    modules: [
      { label: "Intelligence & evidence", href: "/platform/intelligence" },
      { label: "Communications", href: "/demo/communications" },
      { label: "Administration", href: "/platform/administration" },
    ],
  },
];

export const OPERATING_STEPS: PipelineStep[] = INCIDENT_LIFECYCLE.map(
  ({ step, label, description }) => ({ step, label, description }),
);

export const OPERATING_SUPPORT = [
  {
    title: "People",
    description: "Control room, field responder, supervisor",
  },
  {
    title: "Context",
    description: "Location, camera, incident and current state",
  },
  {
    title: "Governance",
    description: "Permissions, revisions and durable records",
  },
] as const;

export const WORKSPACES: Workspace[] = [
  {
    name: "Operations",
    capabilities:
      "Dashboard, Incidents, Response Operations, threat posture",
    slug: "operations",
    summary: "Start the shift with what needs attention.",
    outcome: "One queue — every operator knows what needs attention next.",
  },
  {
    name: "Assets & video",
    capabilities:
      "Digital Twins, Camera Wall, Object Wizard, AI Appliances, VMS",
    slug: "assets-video",
    summary: "Give every asset an operational address.",
    outcome: "Full site context before anyone moves.",
  },
  {
    name: "Automation",
    capabilities:
      "Alarm Policies, SOPs, Guided Response, Connector Flows, Scheduler",
    slug: "automation",
    summary: "Turn approved events into controlled procedures.",
    outcome: "Fewer false positives — SOPs without custom development.",
  },
  {
    name: "Intelligence & evidence",
    capabilities:
      "Alarm Analytics, Aura, Cases & Evidence, protected files",
    slug: "intelligence",
    summary: "Ask questions and keep the investigation connected.",
    outcome: "Investigations stay tied to the incident record.",
  },
  {
    name: "Field operations",
    capabilities:
      "Patrols, tasks, briefings, communications, SOS and handover",
    slug: "field",
    summary: "A field workspace built around the shift.",
    outcome: "Control room and field share one operational picture.",
  },
  {
    name: "Administration & assurance",
    capabilities:
      "Identities, access, readiness, audit, branding and deployment",
    slug: "administration",
    summary: "Make readiness and review part of the operation.",
    outcome: "Readiness and audit evidence by default.",
  },
];

export const SOS_CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    step: "01",
    title: "Request help",
    description:
      "A field officer opens SOS, describes the situation and chooses the nearby building.",
    image: "/platform/carousel/sos-01-request.webp",
    alt: "SOS request form with location and situation description",
  },
  {
    step: "02",
    title: "Control room review",
    description:
      "The operator reviews the requestor, building, message and acknowledgement target.",
    image: "/platform/carousel/sos-02-control-room.webp",
    alt: "Control room SOS acknowledgement workspace",
  },
  {
    step: "03",
    title: "Dispatch responders",
    description:
      "Review the nearby roster, select responders and send the offer with clear intent.",
    image: "/platform/carousel/sos-03-dispatch.webp",
    alt: "SOS dispatch roster and responder selection",
  },
  {
    step: "04",
    title: "Responder decision",
    description:
      "The responder inspects location context and accepts or declines the emergency offer.",
    image: "/platform/carousel/sos-04-responder.webp",
    alt: "Mobile responder SOS acceptance screen",
  },
  {
    step: "05",
    title: "Team visibility",
    description:
      "The console map displays the requestor and accepted responder in shared context.",
    image: "/platform/carousel/sos-05-team-map.webp",
    alt: "Console map showing SOS team locations",
  },
  {
    step: "06",
    title: "Field report & closure",
    description:
      "Record actions, observations and requestor condition — then review the shared timeline.",
    image: "/platform/carousel/sos-06-report.webp",
    alt: "SOS field report and response timeline",
  },
];

export const PILOT_STEPS = [
  {
    step: "01",
    title: "Choose one area",
    description: "A meaningful industrial pilot",
  },
  {
    step: "02",
    title: "Choose three events",
    description: "A focused, qualified integration scope",
  },
  {
    step: "03",
    title: "Agree the proof",
    description: "Observed response and measured effort",
  },
] as const;

export const HUB_EXPERIENCE_CARDS: HubCard[] = [
  {
    slug: "floor-plan",
    number: "01",
    title: "Floor Plan Studio",
    description:
      "Build 2D plans, see 3D geometry, and place devices in one spatial view.",
    outcome: "Every device placed with spatial context operators can trust.",
    href: "/demo/floor-plan",
  },
  {
    slug: "sos",
    number: "02",
    title: "SOS response",
    description:
      "From field request through dispatch, arrival and recorded closure.",
    outcome: "Field request to accountable closure — one thread.",
    href: "/demo/sos",
  },
  {
    slug: "sos-settings",
    number: "03",
    title: "Response policy",
    description:
      "Visual planner, coverage presets, timing limits and revision history.",
    outcome: "Coverage rules operators can defend in review.",
    href: "/demo/sos-settings",
  },
  {
    slug: "guided-response",
    number: "04",
    title: "Guided Response",
    description:
      "Branching field guides with evidence requirements and publish review.",
    outcome: "Branching SOPs with evidence — not paper checklists.",
    href: "/demo/guided-response",
  },
  {
    slug: "connectors",
    number: "05",
    title: "Connector workflows",
    description:
      "MQTT, device mapping and integration paths for industrial telemetry.",
    outcome: "Telemetry into governed workflows — not another silo.",
    href: "/demo/connectors",
  },
  {
    slug: "aura",
    number: "06",
    title: "Aura assistant",
    description:
      "Ask operational questions, inspect grounded sources and governed knowledge.",
    outcome: "Answers grounded in sources your organization approves.",
    href: "/demo/aura",
  },
  {
    slug: "communications",
    number: "07",
    title: "Communications",
    description:
      "Direct and group messages, video calls and field continuity when connectivity changes.",
    outcome: "Context preserved when connectivity changes.",
    href: "/demo/communications",
  },
];

export const HUB_SOLUTION_CARDS: HubCard[] = [
  {
    slug: "perimeter-intrusion",
    number: "01",
    title: "Perimeter intrusion",
    description: "Fence alarm during a night shift — verify, respond, record.",
    href: "/solutions/perimeter-intrusion",
  },
  {
    slug: "responder-sos",
    number: "02",
    title: "Responder SOS",
    description: "Field worker requests urgent help with full team visibility.",
    href: "/solutions/responder-sos",
  },
  {
    slug: "restricted-area",
    number: "03",
    title: "Restricted area",
    description: "Door event near a sensitive asset needs a quick decision.",
    href: "/solutions/restricted-area",
  },
  {
    slug: "field-offline",
    number: "04",
    title: "Field offline",
    description:
      "Temporary network interruption — retain work, sync and confirm.",
    href: "/solutions/field-offline",
  },
];

export const HUB_PLATFORM_LINKS: HubCard[] = WORKSPACES.map(
  ({ slug, name, capabilities, outcome }, index) => ({
    slug,
    number: String(index + 1).padStart(2, "0"),
    title: name,
    description: capabilities,
    outcome,
    href: `/platform/${slug}`,
  }),
);
