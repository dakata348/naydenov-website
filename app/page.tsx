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
      <div className="relative h-9 w-[220px]">
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
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <a href="#top" className="group inline-flex items-center">
          <Brand />
          <span className="sr-only">Go to top</span>
        </a>

        <nav className="hidden items-center gap-10 md:flex">
          {items.map((it) => (
            <a
              key={it.id}
              href={`#${it.id}`}
              className="text-[11px] tracking-[0.34em] text-white/75 transition hover:text-white"
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
                className="block rounded-lg px-4 py-3 text-[12px] tracking-[0.28em] text-white/85 hover:bg-white/10"
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
    <section id="top" className="relative isolate -mb-px bg-[#23265f]">
      <div className="relative w-full">
        <Image
          src="/hero-sofia.jpg"
          alt=""
          width={1024}
          height={682}
          priority
          unoptimized
          className="block h-auto w-full max-w-full"
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
        <div className="absolute inset-x-0 bottom-0 z-10 mx-auto max-w-6xl px-5 pb-16 pt-28 md:pb-24 md:pt-36">
          <div className="max-w-2xl">
            <h1 className="text-balance text-4xl font-bold tracking-normal text-white sm:text-5xl md:text-6xl 2xl:w-[834px] 2xl:text-[96px] 2xl:leading-[100px]">
              We Were, We Are,
              <br />
              We Will Be
            </h1>
            <div className="mt-10 flex items-center gap-3 text-xs tracking-[0.32em] text-white/70">
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
      </div>
    </section>
  );
}

function SectionHeading({
  label,
  tone = "light",
  desktopSize,
}: {
  label: string;
  tone?: "light" | "dark";
  desktopSize?: "about" | "mission";
}) {
  return (
    <div
      className={cx(
        "inline-flex h-[18px] items-center gap-4",
        desktopSize === "about" ? "2xl:w-[231px]" : "",
        desktopSize === "mission" ? "2xl:w-[208px]" : "",
      )}
    >
      <span
        className={cx(
          "h-px w-[72px]",
          tone === "light" ? "bg-white/80" : "bg-[#292764]",
        )}
      />
      <h2
        className={cx(
          "text-[11px] leading-[18px] tracking-[0.34em] 2xl:text-[18px] 2xl:tracking-[6px]",
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
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:gap-14 md:py-24">
        <div className="max-w-prose 2xl:max-w-[520px]">
          <SectionHeading label="About Us" tone="light" desktopSize="about" />
          <p className="mt-6 text-sm font-normal leading-7 tracking-normal text-white/80 md:text-[15px] 2xl:min-h-[396px] 2xl:text-[24px] 2xl:leading-[150%]">
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
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:gap-14 md:py-24">
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
          <SectionHeading label="Mission" tone="dark" desktopSize="mission" />
          <p className="mt-6 max-w-prose text-sm font-normal leading-7 tracking-normal text-[#1f234f]/80 md:text-[15px] 2xl:max-w-[520px] 2xl:min-h-[216px] 2xl:text-[24px] 2xl:leading-[150%]">
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
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 py-12 md:flex-row">
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