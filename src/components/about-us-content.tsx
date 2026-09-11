import { PlatformImage } from "@/components/platform-image";
import { Building2, Globe2, Shield, Users } from "lucide-react";

import { AboutPledgeSpotlight } from "@/components/about-pledge-spotlight";
import { PlatformStatBar } from "@/components/platform/stat-bar";
import { COMPANY_STATS } from "@/lib/platform";

const PILLARS = [
  {
    icon: Shield,
    title: "Unified operations",
    description:
      "One platform connecting incidents, devices, maps, video and field response for governments and enterprises.",
  },
  {
    icon: Building2,
    title: "Industrial-grade delivery",
    description:
      "Scalable architecture with system integration, commissioning support and controlled procedure governance.",
  },
  {
    icon: Users,
    title: "Decision-ready information",
    description:
      "Empower operators and leaders with the right context, evidence and audit trail at the moment of action.",
  },
  {
    icon: Globe2,
    title: "Regional presence",
    description:
      "Teams in Malaysia, Singapore, UAE and Vietnam supporting deployment, adoption and long-term operations.",
  },
] as const;

export function AboutUsContent() {
  return (
    <div className="space-y-16 md:space-y-20">
      <div className="platform-product-frame mx-auto max-w-4xl">
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-[#0d1418]">
          <PlatformImage
            src="/platform/architecture.webp"
            alt="Simpnify unified platform architecture"
            fill
            className="object-contain p-2"
            sizes="(max-width: 1024px) 100vw, 896px"
            priority
          />
        </div>
        <p className="mt-3 text-center text-xs text-platform-subtle">
          Conceptual architecture · configured integrations per site
        </p>
      </div>

      <PlatformStatBar
        stats={COMPANY_STATS}
        className="rounded-2xl border border-white/10 bg-[#0c1a22]/60 px-6 py-10 md:px-10"
      />

      <div>
        <h2 className="text-sm font-semibold tracking-wide text-secondary">
          WHAT WE STAND FOR
        </h2>
        <ul className="mt-8 grid gap-5 md:grid-cols-2">
          {PILLARS.map(({ icon: Icon, title, description }) => (
            <li key={title} className="platform-hub-card">
              <span
                className="flex size-10 items-center justify-center rounded-full bg-secondary/15 text-secondary"
                aria-hidden
              >
                <Icon className="size-5" strokeWidth={1.75} />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-secondary">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-platform-muted">
                {description}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <AboutPledgeSpotlight />
    </div>
  );
}
