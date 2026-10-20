import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LandingGothamScroll } from "@/components/landing-gotham-scroll";
import {
  getPlatformMotionVariant,
  platformMotionVariants,
} from "@/components/platform-motion-variants-meta";

type PageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return platformMotionVariants.map(({ id }) => ({ id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const variant = getPlatformMotionVariant(id);
  return {
    title: `${variant?.title ?? "Preview"} — Our Platform motion review`,
    robots: { index: false, follow: false },
  };
}

export default async function PlatformMotionPreviewPage({ params }: PageProps) {
  const { id } = await params;
  const variant = getPlatformMotionVariant(id);
  if (!variant) notFound();

  return (
    <main id="main-content" className="flex-1">
      <LandingGothamScroll mode={variant.mode} />
    </main>
  );
}
