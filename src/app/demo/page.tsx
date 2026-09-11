"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Legacy bookmark: /demo previously showed the SOS walkthrough. */
export default function DemoLegacyRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/demo/sos");
  }, [router]);

  return null;
}
