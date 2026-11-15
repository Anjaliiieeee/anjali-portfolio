import { navLinks, profile } from "../data/content";
import { GithubIcon, LinkedinIcon, ArrowUpRight, Download } from "./Icons";
import { downloadResume } from "../lib/downloadResume";

const githubLink = profile.github;
const linkedinLink = profile.linkedin;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#D8CDBB] bg-[#F4EFE5] text-[#191919]">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand Colophon */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl border border-[#D8CDBB] bg-[#FFFDF8] font-mono text-sm font-bold text-[#183D2B] shadow-xs">
                {profile.initials}
              </div>
              <div>
                <span className="font-serif text-lg font-bold uppercase tracking-tight text-[#191919]">
                  {profile.name}
                </span>
                <span className="font-sans text-xs block text-[#183D2B] font-semibold">
                  Software Developer
                </span>
              </div>
            </div>

            <p className="font-sans text-xs text-[#777064] leading-relaxed max-w-sm">
              {profile.heroShortIntro}
            </p>

            <div className="font-sans text-xs text-[#777064]">
              {profile.locationFull}
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-4 space-y-2 font-sans text-xs">
            <span className="text-[11px] uppercase font-bold text-[#183D2B] tracking-wider block mb-3">
              NAVIGATION
            </span>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className="text-[#777064] hover:text-[#183D2B] transition-colors py-0.5"
                >
                  {link.label}
                </a>
              ))}
              <button
                type="button"
                onClick={downloadResume}
                className="text-left text-[#183D2B] font-semibold hover:underline py-0.5"
              >
                Resume (PDF)
              </button>
            </div>
          </div>

          {/* Connect & Channels */}
          <div className="md:col-span-3 space-y-3 font-sans text-xs">
            <span className="text-[11px] uppercase font-bold text-[#183D2B] tracking-wider block mb-3">
              CONNECT
            </span>
            <div className="flex flex-col gap-2">
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between rounded-xl border border-[#D8CDBB] bg-[#FFFDF8] px-3.5 py-2 text-[#191919] hover:bg-[#E5F1DF] hover:border-[#183D2B] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <GithubIcon className="h-4 w-4" />
                  <span>GitHub</span>
                </div>
                <ArrowUpRight className="h-3.5 w-3.5 text-[#183D2B]" />
              </a>

              <a
                href={linkedinLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between rounded-xl border border-[#D8CDBB] bg-[#FFFDF8] px-3.5 py-2 text-[#191919] hover:bg-[#E5F1DF] hover:border-[#183D2B] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <LinkedinIcon className="h-4 w-4" />
                  <span>LinkedIn</span>
                </div>
                <ArrowUpRight className="h-3.5 w-3.5 text-[#183D2B]" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Colophon Bar */}
        <div className="mt-12 border-t border-[#D8CDBB] pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-sans text-xs text-[#777064]">
          <div>
            © {currentYear} {profile.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#183D2B]" />
            <span>Pune, Maharashtra, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
