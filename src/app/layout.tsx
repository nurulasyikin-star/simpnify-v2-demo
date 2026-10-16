import type { Metadata } from "next";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeaderShell } from "@/components/site-header-shell";

import "./globals.css";

export const metadata: Metadata = {
  title: "Simpnify",
  description:
    "Unified platform for industrial and critical infrastructure — one operational story from the first alert to the final review.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className="dark h-full antialiased"
    >
      <body className="flex min-h-full flex-col bg-[var(--platform-surface)] text-white">
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <SiteHeaderShell />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
