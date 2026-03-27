"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type NavItem = { id: "about" | "mission"; label: string };

function Brand() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-[clamp(2rem,5vmin,2.25rem)] w-[clamp(7.75rem,38vmin,13.75rem)]">
        <Image
          src="/logo-lockup.png"
          alt="Naydenov Family Office"
          fill
          className="object-contain object-left"
          priority
        />
      </div>
    </div>
  );
}

function Header({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-[var(--space-page-x)] py-[clamp(1rem,2.5vmin,1.5rem)]">
        <a href="#top" className="group inline-flex items-center">
          <Brand />
          <span className="sr-only">Go to top</span>
        </a>

        <nav className="hidden items-center gap-[clamp(1.5rem,4vmin,2.5rem)] md:flex">
          {items.map((it) => (
            <a
              key={it.id}
              href={`#${it.id}`}
              className="nav-pill text-white/75 transition hover:text-white"
            >
              {it.label.toUpperCase()}
            </a>
          ))}
        </nav>

        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          className="inline-flex items-center justify-center rounded-md p-2 text-white/90 ring-1 ring-white/15 transition hover:bg-white/10 md:hidden"
          onClick={() => setOpen(true)}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="opacity-90"
          >
            <path
              d="M4 7h16M4 12h16M4 17h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <div
        className={cx(
          "md:hidden",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
        aria-hidden={!open}
      >
        <div
          className="fixed inset-0 bg-black/55 backdrop-blur-[2px]"
          onClick={() => setOpen(false)}
        />
        <div className="fixed right-3 top-3 w-[min(92vw,340px)] overflow-hidden rounded-xl bg-[#23265f] shadow-2xl ring-1 ring-white/10">
          <div className="flex items-center justify-between px-4 py-4">
            <Brand />
            <button
              type="button"
              aria-label="Close menu"
              className="rounded-md p-2 text-white/90 ring-1 ring-white/15 transition hover:bg-white/10"
              onClick={() => setOpen(false)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
          <div className="px-2 pb-3">
            {items.map((it) => (
              <a
                key={it.id}
                href={`#${it.id}`}
                className="nav-pill block rounded-lg px-4 py-3 text-white/85 hover:bg-white/10"
                onClick={() => setOpen(false)}
              >
                {it.label.toUpperCase()}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section
      id="top"
      className="relative isolate -mb-px flex h-[100svh] min-h-[100svh] flex-col overflow-hidden bg-[#23265f]"
    >
      {/* Full-viewport hero so headline stays above the fold; image covers (no document-tall strip). */}
      <div className="absolute inset-0">
        <Image
          src="/hero-sofia.jpg"
          alt=""
          fill
          priority
          unoptimized
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Figma `#gradients`: linear #292764 — 100% → 40% → 85% opacity (0% → 50% → 100%) */}
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(41,39,100,1)_0%,rgba(41,39,100,0.4)_50%,rgba(41,39,100,0.85)_100%)]"
          aria-hidden
        />
        {/* Blend hero into About: same solid as `bg-[#23265f]` below (removes hard seam) */}
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,transparent_42%,rgba(35,38,95,0.45)_58%,rgba(35,38,95,0.92)_78%,#23265f_100%)]"
          aria-hidden
        />
      </div>
      <div className="relative z-10 mx-auto mt-auto w-full max-w-6xl px-[var(--space-page-x)] pb-[calc(var(--hero-pad-bottom)+env(safe-area-inset-bottom,0px))] pt-[var(--hero-pad-top)]">
        <div className="max-w-2xl">
          <h1 className="hero-title text-balance font-bold tracking-normal text-white">
            We Were, We Are,
            <br />
            We Will Be
          </h1>
          <div className="hero-scroll-hint mt-[clamp(1rem,2vmin,2.5rem)] flex items-center gap-3 text-white/70">
            <span>SCROLL DOWN</span>
            <span className="h-px w-8 bg-white/35" />
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="opacity-80"
            >
              <path
                d="M12 5v12m0 0 6-6m-6 6-6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({
  label,
  tone = "light",
}: {
  label: string;
  tone?: "light" | "dark";
}) {
  return (
    <div className="inline-flex items-center gap-4">
      <span
        className={cx(
          "section-eyebrow-line h-px shrink-0",
          tone === "light" ? "bg-white/80" : "bg-[#292764]",
        )}
      />
      <h2
        className={cx(
          "section-eyebrow uppercase",
          tone === "light" ? "text-white" : "text-[#292764]",
        )}
      >
        {label.toUpperCase()}
      </h2>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="relative z-10 bg-[#23265f]">
      <div className="mx-auto grid max-w-6xl items-center gap-[var(--space-grid-gap)] px-[var(--space-page-x)] py-[var(--space-section-y)] md:grid-cols-2">
        <div className="max-w-prose md:max-w-[32.5rem]">
          <SectionHeading label="About Us" tone="light" />
          <p className="section-prose mt-6 font-normal tracking-normal text-white/80">
            The Naydenov Family Office was created, with the purpose of managing
            the assets of the third generation of the Naydenov family and the
            inheritance of its patriarch the late Georgi Naydenov. Georgi
            Naydenov (1927-1998) was a diplomat and entrepreneur and the founder
            of the economic experiment Texim in the 1960&apos;s, which encompassed
            the creation of the first conglomerate in the country, as well as
            founder of one of the oldest banks in Bulgaria, Texim Bank.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-[360px]">
          <div className="relative mx-auto aspect-[471.07/712.07] w-full">
            <div className="absolute inset-0 border border-[#C8BBA1]" />
            <div className="absolute left-[8px] top-[8px] h-full w-full border border-[#C8BBA1]" />
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src="/georgi-naydenov.png"
                alt="Portrait"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 90vw, 471px"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Mission() {
  return (
    <section id="mission" className="bg-white">
      <div className="mx-auto grid max-w-6xl items-center gap-[var(--space-grid-gap)] px-[var(--space-page-x)] py-[var(--space-section-y)] md:grid-cols-2">
        <div className="order-2 md:order-1">
          <div className="relative mx-auto w-full max-w-[360px]">
            <Image
              src="/crest-white.png"
              alt="Crest"
              width={700}
              height={700}
              className="h-auto w-full select-none"
            />
          </div>
        </div>

        <div className="order-1 md:order-2">
          <SectionHeading label="Mission" tone="dark" />
          <p className="section-prose mt-6 max-w-prose font-normal tracking-normal text-[#1f234f]/80 md:max-w-[32.5rem]">
            Our mission is to ensure the continuation of the legacy of our family
            patriarch Georgi Naydenov for further generations, by actively
            managing key business interests, in accordance with his credo “We
            were, we are, we will be”.
          </p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const year = useMemo(() => new Date().getFullYear(), []);
  return (
    <footer className="bg-[#23265f]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-[var(--space-page-x)] py-[clamp(2.5rem,5vmin,3rem)] md:flex-row">
        <Brand />
        <div className="text-xs text-white/55">
          © {year} Naydenov Family Office. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  const items: NavItem[] = [
    { id: "about", label: "About Us" },
    { id: "mission", label: "Mission" },
  ];

  return (
    <main className="min-h-full">
      <Header items={items} />
      <Hero />
      <About />
      <Mission />
      <Footer />
    </main>
  );
}