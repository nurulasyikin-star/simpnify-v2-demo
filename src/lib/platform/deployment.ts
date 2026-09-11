import type { ChecklistItem } from "./types";

export const DEPLOYMENT_MODELS: ChecklistItem[] = [
  {
    title: "On-premises",
    description:
      "Run inside your data centre or control-room environment with interfaces you own — suited to air-gapped or sovereign sites.",
  },
  {
    title: "Private cloud",
    description:
      "Deploy in a customer-managed cloud tenancy with the same operational workspaces, governed access and audit trail.",
  },
  {
    title: "Hybrid & edge",
    description:
      "Keep critical response local at the edge while synchronizing evidence and configuration to a central operations view.",
  },
];

export const DEPLOYMENT_ASSURANCE: ChecklistItem[] = [
  {
    title: "Role-based access",
    description:
      "Separate page operations, Digital Twin scope and field permissions — operators only see what their role allows.",
  },
  {
    title: "Revision-controlled procedures",
    description:
      "Alarm policies, SOPs and guided response publish through review — not ad-hoc edits on the operations floor.",
  },
  {
    title: "Durable records",
    description:
      "Incidents, communications and evidence stay linked for post-event review and assurance export.",
  },
  {
    title: "Physical + cyber in one platform",
    description:
      "Unified workflows across sensors, video, access and cyber signals — one operational story, not separate overlays.",
  },
];

export const DEPLOYMENT_FAQ: { question: string; answer: string }[] = [
  {
    question: "Can Simpnify deploy entirely on-premises?",
    answer:
      "Yes. Many industrial and government buyers require interfaces, storage and operations inside their own environment. Scope the target architecture during discovery — we align interfaces, identity and evidence retention to your site standards.",
  },
  {
    question: "Do you support hybrid or edge deployments?",
    answer:
      "Yes. Field continuity, offline-tolerant workflows and edge processing can be scoped where connectivity is intermittent. The platform is designed so local response can continue while evidence syncs when links recover.",
  },
  {
    question: "How is access controlled across control room and field?",
    answer:
      "Permissions are role-based across workspaces — operations, assets, automation, intelligence, field and administration. Digital Twin scope and page operations can be controlled separately so teams see only authorized context.",
  },
  {
    question: "What audit and assurance evidence is available?",
    answer:
      "Incidents, procedure revisions, communications and closure records are designed to stay connected. Administration & assurance workspaces support readiness review and export for your internal or external audit process.",
  },
  {
    question: "Can we complete a security or procurement questionnaire?",
    answer:
      "Contact our team with your questionnaire or RFP security annex. We respond with deployment architecture, data flows and control descriptions appropriate to your procurement stage.",
  },
];
