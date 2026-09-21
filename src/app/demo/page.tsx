"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Legacy bookmark: /demo → public Features hub. */
export default function DemoLegacyRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/demos");
  }, [router]);

  return null;
}
