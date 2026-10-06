import type { Metadata } from "next";
import Link from "next/link";

import { publicAsset } from "@/lib/site-path";

export const metadata: Metadata = {
  title: "Mobile session report — Simpnify",
  robots: { index: false, follow: false },
};

export default function ReportsPage() {
  const pdf = publicAsset("/reports/mobile-auth-report-v2.pdf");
  const manifest = publicAsset("/reports/mobile-auth-report-v2.json");

  return (
    <main
      id="main-content"
      className="flex-1 bg-[var(--platform-surface)] px-4 pb-20 pt-24 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-xl">
        <h1 className="text-2xl font-semibold text-white">Mobile session report (v2)</h1>
        <p className="mt-2 text-sm leading-6 text-platform-muted">
          Finalized screens A, F, G, B, C from the mobile-auth review.
        </p>
        <ul className="mt-6 space-y-3 text-sm">
          <li>
            <Link
              href={pdf}
              className="font-semibold text-secondary underline-offset-2 hover:underline"
            >
              Open PDF report
            </Link>
            <span className="mt-1 block text-xs text-platform-subtle">{pdf}</span>
          </li>
          <li>
            <Link
              href={manifest}
              className="font-semibold text-secondary underline-offset-2 hover:underline"
            >
              Manifest (JSON)
            </Link>
            <span className="mt-1 block text-xs text-platform-subtle">{manifest}</span>
          </li>
          <li>
            <Link
              href="/photos/mobile-auth/"
              className="font-semibold text-secondary underline-offset-2 hover:underline"
            >
              Back to design review
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
