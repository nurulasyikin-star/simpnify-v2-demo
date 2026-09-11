import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SolutionSpokePage } from "@/components/platform/solution-spoke";
import {
  SOLUTION_SCENARIOS,
  getSolutionBySlug,
} from "@/lib/platform";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return SOLUTION_SCENARIOS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const scenario = getSolutionBySlug(slug);
  if (!scenario) return { title: "Solution — Simpnify" };

  return {
    title: `${scenario.title} — Simpnify Solutions`,
    description: scenario.subtitle,
  };
}

export default async function SolutionPage({ params }: PageProps) {
  const { slug } = await params;
  const scenario = getSolutionBySlug(slug);
  if (!scenario) notFound();

  return <SolutionSpokePage scenario={scenario} />;
}
