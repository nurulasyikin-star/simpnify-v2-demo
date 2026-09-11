import type { Metadata } from "next";
import Link from "next/link";

import { PlatformAccentBar } from "@/components/platform-accent-bar";
import { PlatformSectionHeader } from "@/components/platform-section-header";

export const metadata: Metadata = {
  title: "Terms of Service — Simpnify",
  description: "Simpnify terms of service and website usage conditions.",
};

export default function TermsPage() {
  return (
    <main
      id="main-content"
      className="min-h-screen bg-[var(--platform-surface)] pt-16"
    >
      <section className="border-b border-white/10 px-6 py-16 md:px-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex gap-7">
            <PlatformAccentBar />
            <PlatformSectionHeader
              eyebrow="LEGAL"
              title="Terms of Service"
              description="Conditions for using the Simpnify website and related materials."
              titleAs="h1"
            />
          </div>
        </div>
      </section>

      <section className="px-6 py-12 md:px-16 md:py-16">
        <div className="mx-auto max-w-3xl">
          <p className="text-base leading-7 text-platform-muted">
            This page is being updated. For terms-related enquiries, please
            contact{" "}
            <Link
              href="mailto:enquiry@simpnify.com"
              className="text-secondary underline-offset-4 transition hover:underline"
            >
              enquiry@simpnify.com
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
