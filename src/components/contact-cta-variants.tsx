"use client";

import Link from "next/link";
import { createElement, useState, type ComponentType } from "react";

import { EMAIL, OFFICES, toTelHref } from "@/components/contact-offices";

import type { ContactCtaVariantId } from "@/components/contact-cta-variants-meta";

function Eyebrow() {
  return (
    <p className="text-[11px] font-medium tracking-[0.22em] text-white/50">
      {"{ SEE IT ON YOUR SITE }"}
    </p>
  );
}

function Headline({ size = "lg" }: { size?: "lg" | "md" }) {
  return (
    <h2
      className={
        size === "lg"
          ? "mt-6 max-w-4xl text-[clamp(3rem,7vw,6rem)] font-medium leading-[0.92] tracking-[-0.03em]"
          : "mt-6 max-w-4xl text-[clamp(2.6rem,5vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.03em]"
      }
    >
      Are you ready?
    </h2>
  );
}

function Lede() {
  return (
    <p className="mt-6 max-w-xl text-base leading-7 text-white/70">
      From the first alarm on the console to the record the shift leaves
      behind.
    </p>
  );
}

function Buttons() {
  return (
    <div className="mt-10 flex flex-wrap gap-3">
      <Link
        href="/contact"
        className="rounded-sm border border-white px-6 py-3 text-sm font-semibold tracking-wide text-white hover:bg-white hover:text-black"
      >
        Get started
      </Link>
      <Link
        href="/demos"
        className="rounded-sm border border-white/30 px-6 py-3 text-sm font-semibold tracking-wide text-white/80 hover:border-white hover:text-white"
      >
        View demos
      </Link>
    </div>
  );
}

function EmailLink({ className = "" }: { className?: string }) {
  return (
    <a
      href={`mailto:${EMAIL}`}
      className={`text-secondary underline decoration-secondary/40 underline-offset-4 hover:decoration-secondary ${className}`}
    >
      {EMAIL}
    </a>
  );
}

function Phone({ phone }: { phone: string }) {
  return (
    <a href={toTelHref(phone)} className="text-white hover:text-secondary">
      {phone}
    </a>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <section className="border-t border-white/10 bg-black px-6 py-14 text-white md:px-16 md:py-20">
      {children}
    </section>
  );
}

export function ContactCtaVariantCurrent() {
  return (
    <Shell>
      <Eyebrow />
      <Headline />
      <Lede />
      <Buttons />
    </Shell>
  );
}

export function ContactCtaVariantSplitLedger() {
  return (
    <Shell>
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
        <div>
          <Eyebrow />
          <Headline size="md" />
          <Lede />
          <Buttons />
          <p className="mt-8 text-sm text-white/50">
            Or write to us — <EmailLink />
          </p>
        </div>

        <div className="grid self-end border-l border-t border-white/10 sm:grid-cols-2">
          {OFFICES.map((office) => (
            <div
              key={office.country}
              className="border-b border-r border-white/10 p-5"
            >
              <p className="text-[11px] font-medium tracking-[0.22em] text-white/50">
                {office.country.toUpperCase()}
              </p>
              <p className="mt-3 text-sm leading-6 text-white/70">
                {office.address}
              </p>
              <div className="mt-3 space-y-1 text-sm">
                {office.phones.map((phone) => (
                  <p key={phone}>
                    <Phone phone={phone} />
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Shell>
  );
}

export function ContactCtaVariantOfficeRow() {
  return (
    <Shell>
      <Eyebrow />
      <Headline />
      <Lede />
      <Buttons />

      <div className="mt-16 grid border-t border-white/10 sm:grid-cols-2 lg:grid-cols-4">
        {OFFICES.map((office, i) => (
          <div
            key={office.country}
            className={`py-8 sm:px-6 ${i === 0 ? "lg:pl-0" : ""} ${
              i > 0 ? "border-white/10 lg:border-l" : ""
            } border-b border-white/10 lg:border-b-0`}
          >
            <p className="text-[11px] font-medium tracking-[0.22em] text-secondary">
              {office.country.toUpperCase()}
            </p>
            <p className="mt-4 text-sm leading-6 text-white/70">
              {office.address}
            </p>
            <div className="mt-4 space-y-1 text-sm text-white/50">
              {office.phones.map((phone) => (
                <p key={phone}>
                  Tel. <Phone phone={phone} />
                </p>
              ))}
              {office.fax ? <p>Fax {office.fax}</p> : null}
            </div>
          </div>
        ))}
      </div>

      <a
        href={`mailto:${EMAIL}`}
        className="group flex items-center justify-between border-t border-white/10 pt-6 text-sm"
      >
        <span>
          <span className="font-semibold text-white">General enquiries</span>
          <span className="ml-3 text-secondary">{EMAIL}</span>
        </span>
        <span className="text-secondary transition group-hover:translate-x-1">
          →
        </span>
      </a>
    </Shell>
  );
}

export function ContactCtaVariantCountryTabs() {
  const [active, setActive] = useState(0);
  const office = OFFICES[active];

  return (
    <Shell>
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Eyebrow />
          <Headline size="md" />
          <Lede />
          <Buttons />
        </div>

        <div className="self-end border border-white/10">
          <div
            role="tablist"
            aria-label="Offices"
            className="grid grid-cols-4 border-b border-white/10"
          >
            {OFFICES.map((o, i) => (
              <button
                key={o.country}
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={`border-r border-white/10 px-3 py-3 text-[11px] font-medium tracking-[0.18em] transition last:border-r-0 ${
                  i === active
                    ? "bg-white text-black"
                    : "text-white/50 hover:text-white"
                }`}
              >
                {o.country.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="p-6 md:p-8">
            <div className="space-y-1 text-2xl font-medium tracking-tight md:text-3xl">
              {office.phones.map((phone) => (
                <p key={phone}>
                  <Phone phone={phone} />
                </p>
              ))}
            </div>
            <p className="mt-5 max-w-md text-sm leading-6 text-white/70">
              {office.address}
            </p>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/10 pt-5 text-sm text-white/50">
              <EmailLink />
              {office.fax ? <span>Fax {office.fax}</span> : null}
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

export function ContactCtaVariantDirectTable() {
  return (
    <Shell>
      <Eyebrow />
      <Headline />
      <Lede />

      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
        <a
          href={`mailto:${EMAIL}`}
          className="rounded-sm border border-white px-6 py-3 text-sm font-semibold tracking-wide text-white hover:bg-white hover:text-black"
        >
          {EMAIL}
        </a>
        <Link
          href="/demos"
          className="text-sm font-semibold tracking-wide text-white/70 hover:text-white"
        >
          View demos →
        </Link>
      </div>

      <table className="mt-14 w-full border-t border-white/10 text-left text-sm">
        <tbody>
          {OFFICES.map((office) => (
            <tr
              key={office.country}
              className="flex flex-col gap-1 border-b border-white/10 py-5 md:table-row md:py-0"
            >
              <th
                scope="row"
                className="text-[11px] font-medium tracking-[0.22em] text-white/50 md:w-40 md:py-5 md:align-top"
              >
                {office.country.toUpperCase()}
              </th>
              <td className="leading-6 text-white/70 md:py-5 md:pr-8 md:align-top">
                {office.address}
              </td>
              <td className="whitespace-nowrap md:py-5 md:text-right md:align-top">
                {office.phones.map((phone) => (
                  <p key={phone}>
                    <Phone phone={phone} />
                  </p>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Shell>
  );
}

const map: Record<ContactCtaVariantId, ComponentType> = {
  current: ContactCtaVariantCurrent,
  "split-ledger": ContactCtaVariantSplitLedger,
  "office-row": ContactCtaVariantOfficeRow,
  "country-tabs": ContactCtaVariantCountryTabs,
  "direct-table": ContactCtaVariantDirectTable,
};

export function ContactCtaVariant({ id }: { id: ContactCtaVariantId }) {
  return createElement(map[id]);
}
