"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "About", href: "#" },
  { label: "Simpnify Platform", href: "/our-platform" },
  { label: "Demo", href: "#" },
  { label: "News", href: "#" },
  { label: "Contacts", href: "#" },
] as const;

function NavPill({
  label,
  href,
  active,
}: {
  label: string;
  href: string;
  active?: boolean;
}) {
  const className = cn(
    "rounded-full px-5 py-2.5 text-sm font-medium text-[#1e1e22] transition-colors",
    "bg-gradient-to-b from-[#f5f6f8] to-[#dbdee3]",
    active && "from-[#c7d0fa] to-[#9eaddf]",
  );

  if (href === "#") {
    return (
      <button type="button" className={className}>
        {label}
      </button>
    );
  }

  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const version = searchParams.get("v") === "1" ? "1" : "2";

  const setVersion = (next: "1" | "2") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("v", next);
    const query = params.toString();
    router.push(`${pathname}${query ? `?${query}` : ""}`);
  };

  return (
    <header className="border-b border-white/10 bg-black">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-7 md:px-16">
        <Link href="/our-platform" className="text-2xl font-normal text-[#b8c7f2]">
          Simpnify
        </Link>

        <nav className="flex flex-wrap items-center justify-end gap-2">
          {NAV_ITEMS.map((item) => (
            <NavPill
              key={item.label}
              label={item.label}
              href={item.href}
              active={pathname === item.href}
            />
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#f5f6f8] to-[#dbdee3] px-5 py-2.5 text-sm font-medium text-[#1e1e22] outline-none"
            >
              Version
              <ChevronDown className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-40">
              <DropdownMenuItem onClick={() => setVersion("1")}>
                Version 1 {version === "1" ? "✓" : ""}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setVersion("2")}>
                Version 2 {version === "2" ? "✓" : ""}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  );
}
