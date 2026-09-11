import { PlatformImage } from "@/components/platform-image";

type Partner = {
  name: string;
  category: string;
  region: string;
  description: string;
  href?: string;
  logo?: {
    src: string;
    width: number;
    height: number;
  };
};

const PARTNERS: Partner[] = [
  {
    name: "Avigilon",
    category: "Video Security & Analytics",
    region: "Global",
    description:
      "End-to-end video security, AI analytics, access control, and smart sensors for faster detection and complete situational awareness.",
    href: "https://www.avigilon.com/",
    logo: { src: "/partners/avigilon.png", width: 790, height: 111 },
  },
  {
    name: "Network Optix",
    category: "Enterprise Video Platform",
    region: "Global",
    description:
      "Nx EVOS powers intelligent video solutions with open APIs, scalable edge-to-cloud architecture, and Nx Witness VMS.",
    href: "https://www.networkoptix.com/",
    logo: { src: "/partners/network-optix.png", width: 768, height: 160 },
  },
];

function PartnerLogoMark({ partner }: { partner: Partner }) {
  if (partner.logo) {
    return (
      <div className="flex h-20 w-full max-w-[240px] items-center justify-center">
        <PlatformImage
          src={partner.logo.src}
          alt=""
          width={partner.logo.width}
          height={partner.logo.height}
          className="h-14 w-auto max-w-full object-contain"
        />
      </div>
    );
  }

  return null;
}

function PartnerCard({ partner }: { partner: Partner }) {
  const inner = (
    <div className="group [perspective:1200px] h-full min-h-72">
      <div className="relative h-full w-full transition-transform duration-700 ease-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-visible:[transform:rotateY(180deg)]">
        {/* Front face — logo (default) */}
        <div className="platform-hub-card absolute inset-0 flex flex-col items-center justify-center gap-4 text-center [backface-visibility:hidden]">
          <PartnerLogoMark partner={partner} />
          <h3 className="text-lg font-semibold text-secondary">{partner.name}</h3>
          <p className="text-sm text-platform-muted">{partner.category}</p>
        </div>

        {/* Back face — info (on hover) */}
        <div
          className="platform-hub-card absolute inset-0 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] transition-shadow duration-300 delay-700 [backface-visibility:hidden] group-hover:shadow-[0_0_0_1px_rgba(93,212,232,0.4),0_8px_32px_-8px_rgba(93,212,232,0.35)] group-focus-visible:shadow-[0_0_0_1px_rgba(93,212,232,0.4),0_8px_32px_-8px_rgba(93,212,232,0.35)]"
          style={{ transform: "rotateY(180deg)" }}
        >
          {partner.href && (
            <span className="absolute right-4 top-4 flex items-center gap-1 text-xs font-medium text-cyan-300/80">
              Visit site
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17 17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </span>
          )}
          <p className="text-sm font-semibold text-secondary">{partner.category}</p>
          <h3 className="mt-3 text-lg font-semibold text-secondary">
            {partner.name}
          </h3>
          <p className="mt-1 text-sm text-platform-muted">{partner.region}</p>
          <p className="mt-5 flex-1 border-t border-white/10 pt-5 text-sm leading-relaxed text-platform-muted">
            {partner.description}
          </p>
        </div>
      </div>
    </div>
  );

  if (partner.href) {
    return (
      <a
        href={partner.href}
        target="_blank"
        rel="noopener noreferrer"
        className="block cursor-pointer outline-none transition-transform duration-300 delay-700 ease-out hover:-translate-y-1 hover:scale-[1.02] focus-visible:-translate-y-1 focus-visible:scale-[1.02]"
      >
        {inner}
      </a>
    );
  }

  return <div>{inner}</div>;
}

export function PartnersList() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
      {PARTNERS.map((partner) => (
        <PartnerCard key={partner.name} partner={partner} />
      ))}
    </div>
  );
}
