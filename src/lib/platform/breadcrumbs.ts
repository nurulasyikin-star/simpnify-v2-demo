import { HUB_EXPERIENCE_CARDS, WORKSPACES } from "./content";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function moduleBreadcrumbLabel(slug: string): string {
  return WORKSPACES.find((workspace) => workspace.slug === slug)?.name ?? slug;
}

export function solutionsTrail(current?: string): BreadcrumbItem[] {
  if (!current) {
    return [];
  }

  return [
    { label: "Solutions", href: "/solutions" },
    { label: current },
  ];
}

export function demosTrail(current?: string): BreadcrumbItem[] {
  if (!current) {
    return [];
  }

  return [
    { label: "Features", href: "/demos" },
    { label: current },
  ];
}

export function modulesTrail(current?: string): BreadcrumbItem[] {
  if (!current) {
    return [];
  }

  return [
    { label: "Modules", href: "/platform" },
    { label: current },
  ];
}

export function demoBreadcrumbs(slug: string): BreadcrumbItem[] {
  const card = HUB_EXPERIENCE_CARDS.find((item) => item.slug === slug);

  return demosTrail(card?.title ?? "Demo");
}
