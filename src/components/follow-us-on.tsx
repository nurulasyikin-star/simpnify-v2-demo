type SocialLink = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

const iconClassName = "size-4 fill-secondary";

const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/simpnify",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className={iconClassName}>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export function FollowUsOn() {
  return (
    <div className="flex flex-wrap items-center gap-4 md:gap-5">
      <p className="text-sm font-semibold tracking-wide text-platform-muted">
        FOLLOW US ON
      </p>
      <div className="flex items-center gap-3">
        {SOCIAL_LINKS.map(({ label, href, icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Follow Simpnify on ${label}`}
            className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-secondary transition hover:border-secondary/40 hover:bg-secondary/10"
          >
            {icon}
          </a>
        ))}
      </div>
    </div>
  );
}
