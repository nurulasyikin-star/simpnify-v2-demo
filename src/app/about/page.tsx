import type { Metadata } from "next";

import { AboutUsContent } from "@/components/about-us-content";
import { PlatformAccentBar } from "@/components/platform-accent-bar";

export const metadata: Metadata = {
  title: "About Us — Simpnify",
  description:
    "More than 10 years delivering unified physical and cyber security platforms for governments and enterprises across ASEAN and the Middle East.",
};

export default function AboutPage() {
  return (
    <main id="main-content" className="min-h-screen bg-[var(--platform-surface)] pt-16">
      <section className="relative overflow-hidden border-b border-white/10 px-6 py-16 md:px-16 md:py-20">
        <div className="platform-scan-bg" aria-hidden />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="flex gap-7">
            <PlatformAccentBar />
            <div>
              <p className="text-sm font-semibold tracking-wide text-secondary">
                ABOUT SIMPNIFY
              </p>
              <h1 className="mt-2 text-4xl font-semibold text-white md:text-5xl">
                Simple unified platform for critical operations
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-platform-muted">
                Simpnify Pte Ltd has more than 10 years of experience
                delivering automation, IT, physical security and cyber security
                solutions to government and corporate clients. We build a
                scalable, easy-to-upgrade platform backed by application
                software and disciplined system integration.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 md:px-16 md:py-16">
        <div className="mx-auto max-w-7xl">
          <AboutUsContent />
        </div>
      </section>
    </main>
  );
}
