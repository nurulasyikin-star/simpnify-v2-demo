import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

import { ContactOffices } from "@/components/contact-offices";
import { PlatformAccentBar } from "@/components/platform-accent-bar";
import { PlatformSectionHeader } from "@/components/platform-section-header";

export const metadata: Metadata = {
  title: "Contact Us — Simpnify",
  description:
    "Get in touch with Simpnify offices in Malaysia, Singapore, UAE, and Vietnam.",
};

export default function ContactPage() {
  return (
    <main id="main-content" className="min-h-screen bg-[var(--platform-surface)] pt-16">
      <section className="relative overflow-hidden border-b border-white/10 px-6 py-16 md:px-16 md:py-20">
        <div className="platform-scan-bg" aria-hidden />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="flex gap-7">
            <PlatformAccentBar />
            <PlatformSectionHeader
              eyebrow="GET IN TOUCH"
              title="Contact Us"
              description="Reach out to any of our regional offices. Our team is ready to help with enquiries about the Simpnify platform, pilots and services."
              titleAs="h1"
            />
          </div>
        </div>
      </section>

      <section className="px-6 py-12 md:px-16 md:py-16">
        <div className="mx-auto max-w-7xl space-y-6">
          <ContactOffices />

          <a
            href="mailto:enquiry@simpnify.com"
            className="group flex items-center justify-between gap-4 platform-glass-card transition hover:border-secondary/40"
          >
            <div>
              <h2 className="text-lg font-semibold text-white">
                General Enquiries
              </h2>
              <p className="mt-1 text-sm text-platform-muted">
                enquiry@simpnify.com
              </p>
            </div>
            <ArrowRight
              aria-hidden
              className="size-5 shrink-0 text-secondary transition group-hover:translate-x-0.5"
            />
          </a>
        </div>
      </section>
    </main>
  );
}
