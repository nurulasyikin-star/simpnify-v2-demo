"use client";

import { useEffect } from "react";

export function HideSiteHeader() {
  useEffect(() => {
    const header = document.querySelector("body header.fixed");
    if (!header) return;

    const previousDisplay = (header as HTMLElement).style.display;
    (header as HTMLElement).style.display = "none";

    return () => {
      (header as HTMLElement).style.display = previousDisplay;
    };
  }, []);

  return null;
}
