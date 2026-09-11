import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ModuleSpokePage } from "@/components/platform/module-spoke";
import { MODULE_PAGES, getModuleBySlug } from "@/lib/platform";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return MODULE_PAGES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const module = getModuleBySlug(slug);
  if (!module) return { title: "Platform — Simpnify" };

  return {
    title: `${module.title} — Simpnify Platform`,
    description: module.description,
  };
}

export default async function PlatformModulePage({ params }: PageProps) {
  const { slug } = await params;
  const module = getModuleBySlug(slug);
  if (!module) notFound();

  return <ModuleSpokePage module={module} />;
}
