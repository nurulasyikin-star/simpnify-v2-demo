import type { Metadata } from "next";
import Link from "next/link";

import { mobileModules } from "@/components/mobile-module-variants";

export const metadata: Metadata = {
  title: "Mobile modules design review — Simpnify",
  description: "Today, Location, Guidance and Briefings with SOTI-inspired options.",
  robots: { index: false, follow: false },
};

export default function MobileModulesPhotosPage() {
  return (
    <main
      id="main-content"
      className="flex-1 bg-[var(--platform-surface)] px-4 pb-20 pt-24 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <header className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
            Design review
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-white">
            Mobile modules
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-platform-muted">
            For each module, A is the web mobile page and B is your native
            frame. C and D add one idea each from{" "}
            <a href="https://soti.net/" className="text-secondary hover:underline">
              soti.net
            </a>{" "}
            that fits an officer in the field. Pick by id, such as{" "}
            <code className="rounded bg-white/5 px-1.5 py-0.5">location-zone</code>.
          </p>
          <nav aria-label="Module jump links" className="mt-6 flex flex-wrap gap-2">
            {mobileModules.map((m) => (
              <a
                key={m.id}
                href={`#${m.id}`}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-platform-muted transition hover:border-secondary/40 hover:text-secondary"
              >
                {m.title}
              </a>
            ))}
          </nav>
        </header>

        <div className="flex flex-col gap-16">
          {mobileModules.map((m) => (
            <section key={m.id} id={m.id} className="scroll-mt-24">
              <h2 className="text-2xl font-semibold text-white">{m.title}</h2>
              <p className="mt-1 text-sm text-platform-muted">{m.intro}</p>
              <div className="mt-6 grid gap-6 lg:grid-cols-2">
                {m.variants.map((v) => (
                  <article
                    key={v.id}
                    id={v.id}
                    className="scroll-mt-24 overflow-hidden rounded-2xl border border-white/10 bg-[#0a1218]"
                  >
                    <div className="flex justify-center bg-[#050b10] px-4 py-8">
                      {v.render()}
                    </div>
                    <div className="px-5 py-5">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-base font-semibold text-white">{v.title}</h3>
                        <span className="rounded-full border border-secondary/30 bg-secondary/10 px-2.5 py-0.5 text-[11px] text-secondary">
                          {v.id}
                        </span>
                      </div>
                      <p className="mt-1 text-sm leading-6 text-platform-muted">{v.tagline}</p>
                      <p className="mt-3 text-sm leading-6 text-[#c5d0d6]">
                        <span className="font-semibold text-white">From SOTI. </span>
                        {v.soti}
                      </p>
                      <ul className="mt-3 space-y-1 text-sm text-platform-muted">
                        {v.pros.map((p) => (
                          <li key={p}>+ {p}</li>
                        ))}
                        {v.cons.map((c) => (
                          <li key={c}>− {c}</li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-platform-subtle">
          Open at{" "}
          <code className="rounded bg-white/5 px-1.5 py-0.5 text-platform-muted">
            /photos/mobile-modules
          </code>
          . Nothing here replaces the live app until you pick.{" "}
          <Link href="/photos/mobile-auth" className="text-secondary hover:underline">
            Session screens
          </Link>
          {" · "}
          <Link href="/photos" className="text-secondary hover:underline">
            Other reviews
          </Link>
        </p>
      </div>
    </main>
  );
}
