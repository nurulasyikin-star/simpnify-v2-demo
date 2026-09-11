"use client";

import { useEffect } from "react";

export function HideSiteFooter() {
  useEffect(() => {
    const footer = document.querySelector("body > footer");
    if (!footer) return;

    const previousDisplay = footer.style.display;
    footer.style.display = "none";

    return () => {
      footer.style.display = previousDisplay;
    };
  }, []);

  return null;
}
