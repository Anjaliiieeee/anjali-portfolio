import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks, profile } from "../data/content";
import { GithubIcon, LinkedinIcon, Download } from "./Icons";
import { downloadResume } from "../lib/downloadResume";

const githubLink = profile.github;
const linkedinLink = profile.linkedin;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0.15, 0.4] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-[#D8CDBB] bg-[#F4EFE5]/95 backdrop-blur-md shadow-xs"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
        {/* Brand Left: AS monogram + Name + Location */}
        <a
          href="#home"
          onClick={closeMenu}
          className="group flex items-center gap-3 text-[#191919] transition-transform"
        >
          <div className="grid h-10 w-10 place-items-center rounded-xl border border-[#D8CDBB] bg-[#FFFDF8] font-mono text-sm font-bold text-[#191919] shadow-xs group-hover:border-[#183D2B] transition-colors">
            {profile.initials}
          </div>
          <div className="flex flex-col">
            <span className="font-sans text-sm font-bold tracking-tight text-[#191919]">
              {profile.name}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#777064]">
              {profile.metaLabel}
            </span>
          </div>
        </a>

        {/* Center Pill Navigation (Matching Reference) */}
        <nav
          className="hidden items-center gap-1.5 lg:flex border border-[#D8CDBB] bg-[#FFFDF8]/85 backdrop-blur-md px-2 py-1.5 rounded-full shadow-xs"
          aria-label="Primary"
        >
          {navLinks.map((link) => {
            const isActive = active === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`relative px-3.5 py-1 rounded-full font-sans text-xs tracking-wider transition-all duration-200 ${
                  isActive
                    ? "font-bold text-[#191919]"
                    : "text-[#777064] hover:text-[#191919]"
                }`}
                aria-current={isActive ? "true" : undefined}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavPill"
                    className="absolute inset-0 rounded-full border border-[#D8CDBB] bg-[#F4EFE5] shadow-xs -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right Actions: GitHub, LinkedIn & Forest Green Resume CTA */}
        <div className="hidden items-center gap-3 sm:flex">
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="grid h-9 w-9 place-items-center rounded-full border border-[#D8CDBB] bg-[#FFFDF8] text-[#191919] hover:bg-[#F4EFE5] hover:border-[#183D2B] transition-all"
          >
            <GithubIcon className="h-4 w-4" />
          </a>

          <a
            href={linkedinLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="grid h-9 w-9 place-items-center rounded-full border border-[#D8CDBB] bg-[#FFFDF8] text-[#191919] hover:bg-[#F4EFE5] hover:border-[#183D2B] transition-all"
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>

          <button
            type="button"
            onClick={downloadResume}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#183D2B] px-4 py-2 font-sans text-xs font-semibold text-[#FFFDF8] hover:bg-[#122e20] shadow-xs pill-btn transition-all"
          >
            <Download className="h-3.5 w-3.5" />
            <span>RESUME</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-xl border border-[#D8CDBB] bg-[#FFFDF8] text-[#191919] lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <div className="flex flex-col gap-1.5 w-5">
            <span
              className={`h-0.5 w-full bg-[#191919] transition-transform duration-200 ${
                open ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`h-0.5 w-full bg-[#191919] transition-opacity duration-200 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-full bg-[#191919] transition-transform duration-200 ${
                open ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="border-b border-[#D8CDBB] bg-[#FFFDF8] px-6 py-6 lg:hidden"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={closeMenu}
                  className={`flex items-center justify-between border-b border-[#D8CDBB]/40 py-2.5 font-serif text-lg font-bold tracking-tight ${
                    active === link.id ? "text-[#183D2B]" : "text-[#191919]"
                  }`}
                >
                  <span>{link.label}</span>
                  <span className="font-mono text-xs text-[#777064]">
                    [0{navLinks.findIndex((l) => l.id === link.id) + 1}]
                  </span>
                </a>
              ))}

              <div className="mt-4 flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[#D8CDBB] bg-[#F4EFE5] py-2.5 font-sans text-xs uppercase text-[#191919]"
                >
                  <GithubIcon className="h-4 w-4" />
                  GitHub
                </a>

                <a
                  href={linkedinLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[#D8CDBB] bg-[#F4EFE5] py-2.5 font-sans text-xs uppercase text-[#191919]"
                >
                  <LinkedinIcon className="h-4 w-4" />
                  LinkedIn
                </a>

                <button
                  type="button"
                  onClick={() => {
                    closeMenu();
                    downloadResume();
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#183D2B] py-3 font-sans text-xs font-semibold uppercase text-[#FFFDF8]"
                >
                  <Download className="h-4 w-4" />
                  Download Resume (PDF)
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-40 grid h-11 w-11 place-items-center rounded-full border border-[#D8CDBB] bg-[#FFFDF8] text-[#183D2B] shadow-md transition-all hover:-translate-y-1 hover:bg-[#183D2B] hover:text-[#FFFDF8]"
    >
      <span className="font-mono text-sm font-bold">▲</span>
    </button>
  );
}
