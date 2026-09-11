import type { Metadata } from "next";
import Link from "next/link";

import { PlatformPageShell } from "@/components/platform/page-shell";
import { PlatformValueCharts } from "@/components/platform/value-charts";
export const metadata: Metadata = {
  title: "Why Simpnify — Value Model",
  description:
    "Illustrative ROI forecast for recovered operator capacity. Transparent assumptions you can replace with pilot measurements.",
};

export default function WhySimpnifyPage() {
  return (
    <PlatformPageShell
      eyebrow="VALUE MODEL"
      title="Put your own numbers into the model"
      description="Use a transparent operating model before agreeing commercial value. Recovered capacity is time available for other work — not automatically cash savings."
    >
      <PlatformValueCharts
        showHeader={false}
        showFormulas
        showLinks={false}
      />
      <section className="border-t border-white/10 px-6 py-16 md:px-16 md:pb-24">
        <div className="mx-auto max-w-7xl flex flex-wrap gap-4">
          <Link href="/pilot" className="platform-btn-primary">
            Define a pilot
          </Link>
          <Link href="/contact" className="platform-btn-secondary">
            Discuss with us
          </Link>
        </div>
      </section>
    </PlatformPageShell>
  );
}
