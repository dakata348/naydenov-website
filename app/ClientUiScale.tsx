"use client";

import { useEffect } from "react";

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export default function ClientUiScale({
  baseFontPx = 16,
  targetDevicePixelRatio = 1.5,
  minFontPx = 14,
  maxFontPx = 22,
}: {
  baseFontPx?: number;
  targetDevicePixelRatio?: number;
  minFontPx?: number;
  maxFontPx?: number;
}) {
  useEffect(() => {
    const root = document.documentElement;

    const apply = () => {
      const dpr = window.devicePixelRatio || 1;
      const scaled = baseFontPx * (targetDevicePixelRatio / dpr);
      root.style.fontSize = `${clamp(scaled, minFontPx, maxFontPx)}px`;
    };

    apply();
    window.addEventListener("resize", apply, { passive: true } as AddEventListenerOptions);
    return () => window.removeEventListener("resize", apply as any);
  }, [baseFontPx, maxFontPx, minFontPx, targetDevicePixelRatio]);

  return null;
}

