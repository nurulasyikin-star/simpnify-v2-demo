export type CarouselSlide = {
  step: string;
  title: string;
  description: string;
  image: string;
  alt: string;
};

export type HubCard = {
  slug: string;
  number: string;
  title: string;
  description: string;
  outcome?: string;
  href?: string;
};

export type PipelineStep = {
  step: string;
  label: string;
  description: string;
};

export type LifecycleModuleLink = {
  label: string;
  href: string;
};

export type CompanyStat = {
  value: number;
  suffix?: string;
  label: string;
};

export type LifecycleStage = {
  step: string;
  label: string;
  description: string;
  outcome: string;
  modules: LifecycleModuleLink[];
};

export type ChecklistItem = {
  title: string;
  description: string;
};

export type Workspace = {
  name: string;
  capabilities: string;
  slug: string;
  summary: string;
  outcome: string;
};

export type SolutionScenario = {
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  steps: PipelineStep[];
  whyItMatters?: string;
  image: string;
  alt: string;
};

export type ModulePage = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  outcome: string;
  steps: PipelineStep[];
  image: string;
  alt: string;
  relatedDemos?: { label: string; href: string }[];
};

export type SiteChallenge = {
  number: string;
  title: string;
  description: string;
  image: string;
  alt: string;
};

export type WhySimpnifyPoint = {
  title: string;
  description: string;
};

export type ImageFeature = {
  eyebrow: string;
  title: string;
  description?: string;
  points: string[];
  image: string;
  alt: string;
};
