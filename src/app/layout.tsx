import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { SiteHeaderShell } from "@/components/site-header-shell";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Simpnify — Website Demo",
  description:
    "Simpnify unified platform marketing demo (Version 1 / Version 2 preview).",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-black text-white">
        <SiteHeaderShell />
        {children}
      </body>
    </html>
  );
}
