import { motion } from "framer-motion";
import { profile } from "../data/content";
import RoleCalendarSlider from "./RoleCalendarSlider";
import {
  ArrowRight,
  Download,
  GithubIcon,
  LinkedinIcon,
  MapPinIcon,
  MouseScrollIcon,
  StarIcon,
} from "./Icons";
import { downloadResume } from "../lib/downloadResume";

const githubLink = profile.github;
const linkedinLink = profile.linkedin;

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#F4EFE5] pt-28 pb-12 sm:pt-36 sm:pb-16 paper-grain min-h-[92vh] flex flex-col justify-between"
    >
      {/* Decorative Organic Background Elements (Matching Reference) */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Top-Right Light Green Arch & Forest Organic Backdrop */}
        <div className="absolute -right-20 top-16 w-[480px] h-[580px] rounded-bl-[160px] rounded-tl-[240px] bg-[#E5F1DF]/70 blur-[1px]" />
        <div className="absolute right-4 top-24 w-[360px] h-[500px] rounded-l-[180px] bg-[#183D2B]/10 blur-[2px]" />

        {/* Delicate grid pattern circle */}
        <div
          className="absolute right-16 top-32 w-72 h-72 rounded-full border border-[#D8CDBB]/60 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(to right, #183D2B 1px, transparent 1px), linear-gradient(to bottom, #183D2B 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Bottom-Left Soft Light Green Glow */}
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-[#E5F1DF]/80 blur-2xl" />

        {/* Decorative Four-Point Stars */}
        <div className="absolute left-[38%] top-24 text-[#183D2B]/35">
          <StarIcon className="w-5 h-5" />
        </div>
        <div className="absolute right-[44%] top-44 text-[#183D2B]/25">
          <StarIcon className="w-4 h-4" />
        </div>
        <div className="absolute left-16 bottom-16 text-[#183D2B]/40">
          <StarIcon className="w-6 h-6" />
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12 flex-1 flex flex-col justify-center">
        {/* Main 3-Column / Asymmetric Composition (Matching Reference Image) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">

          {/* =========================================================================
              LEFT COLUMN: Introduction, Large Typography, Buttons, Location
              ========================================================================= */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* HELLO, I'M with Left Line */}
              <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-[#777064] font-semibold mb-3">
                <span className="w-10 h-px bg-[#777064]/50" />
                <span>HELLO, I&apos;M</span>
              </div>

              {/* Main Name (Cinzel Font) */}
              <h1 className="font-serif text-5xl sm:text-6xl xl:text-7xl font-extrabold uppercase tracking-tight text-[#191919] leading-[0.95]">
                ANJALI SINGH
              </h1>

              {/* Professional Title with Forest Green DEVELOPER. */}
              <h2 className="mt-2 font-serif text-3xl sm:text-4xl xl:text-5xl font-bold uppercase tracking-tight text-[#191919]">
                SOFTWARE{" "}
                <span className="text-[#183D2B]">
                  DEVELOPER.
                </span>
              </h2>
            </motion.div>

            {/* Supporting Introduction Text */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="font-sans text-sm sm:text-base text-[#777064] leading-relaxed max-w-md"
            >
              {profile.heroShortIntro}
            </motion.p>

            {/* Action Buttons: Explore My Work & Download Resume */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex flex-wrap items-center gap-3 pt-1"
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-[#183D2B] px-6 py-3 font-sans text-xs font-semibold text-[#FFFDF8] shadow-xs pill-btn hover:bg-[#122e20] transition-colors"
              >
                <span>Explore My Work</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <button
                type="button"
                onClick={downloadResume}
                className="inline-flex items-center gap-2 rounded-full border border-[#D8CDBB] bg-[#F4EFE5] px-5 py-3 font-sans text-xs font-semibold text-[#191919] shadow-xs pill-btn hover:bg-[#FFFDF8] hover:border-[#183D2B] transition-colors"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download Resume (PDF)</span>
              </button>
            </motion.div>

            {/* Location & Status Line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="pt-2 flex flex-wrap items-center gap-3 text-xs text-[#777064] font-sans"
            >
              <div className="flex items-center gap-1.5 font-medium text-[#191919]">
                <MapPinIcon className="h-3.5 w-3.5 text-[#183D2B]" />
                <span>{profile.location}</span>
              </div>
              <span className="text-[#D8CDBB]">|</span>
              <span className="text-[#777064]">{profile.status}</span>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex items-center gap-3 pt-1"
            >
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="grid h-8 w-8 place-items-center rounded-full border border-[#D8CDBB] bg-[#FFFDF8] text-[#191919] hover:bg-[#183D2B] hover:text-[#FFFDF8] hover:border-[#183D2B] transition-colors"
              >
                <GithubIcon className="h-4 w-4" />
              </a>

              <a
                href={linkedinLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="grid h-8 w-8 place-items-center rounded-full border border-[#D8CDBB] bg-[#FFFDF8] text-[#191919] hover:bg-[#183D2B] hover:text-[#FFFDF8] hover:border-[#183D2B] transition-colors"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
            </motion.div>
          </div>

          {/* =========================================================================
              CENTER: Animated Calendar Role Slider (Notebook with 6 Binder Rings)
              ========================================================================= */}
          <div className="lg:col-span-4 flex justify-center py-4 lg:py-0">
            <RoleCalendarSlider />
          </div>

          {/* =========================================================================
              RIGHT COLUMN: Professional Portrait in Organic Layered Composition
              ========================================================================= */}
          <div className="lg:col-span-3 flex justify-center lg:justify-end relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-[340px] sm:max-w-[380px]"
            >
              {/* Floating Cursive Script: "Build Innovate Grow" (Matching Reference) */}
              <div className="absolute -top-6 right-2 z-20 font-script text-2xl sm:text-3xl text-[#191919] -rotate-6 select-none pointer-events-none">
                Build <br />
                <span className="pl-4">Innovate</span> <br />
                <span className="pl-8">Grow</span>
              </div>

              {/* Layered Organic Backdrop Shapes */}
              <div className="relative mx-auto w-full aspect-[4/5] overflow-hidden rounded-t-[140px] rounded-b-[40px] border border-[#D8CDBB]/70 bg-gradient-to-b from-[#E5F1DF] via-[#E9DDC9] to-[#183D2B]/15 shadow-lg">
                {/* Organic Green Inner Arch */}
                <div className="absolute inset-x-4 top-4 bottom-0 rounded-t-[120px] bg-[#183D2B]/20" />
                <div className="absolute right-0 bottom-0 w-44 h-44 rounded-tl-[100px] bg-[#183D2B]" />

                {/* Actual Portrait Image */}

                <motion.img
                  src={`${import.meta.env.BASE_URL}profile.jpeg`}
                  alt="Anjali Singh"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10 w-full h-full object-cover object-top filter contrast-105"
                />

                {/* Subtle vignette border */}
                <div className="absolute inset-0 z-20 pointer-events-none rounded-t-[140px] rounded-b-[40px] border border-[#D8CDBB]/80" />
              </div>
            </motion.div>
          </div>

        </div>

        {/* =========================================================================
            BOTTOM DIVIDER & SCROLL TO EXPLORE (Matching Reference Image)
            ========================================================================= */}
        <div className="mt-12 sm:mt-16 pt-6 border-t border-[#D8CDBB] flex items-center justify-between font-sans text-xs uppercase tracking-wider text-[#777064]">
          {/* Left Metadata / Star Accent */}
          <div className="flex items-center gap-2">
            <span className="text-[#183D2B] font-bold">●</span>
            <span className="hidden sm:inline">PUNE, MH, IN — AVAILABLE FOR ROLES</span>
            <span className="sm:hidden">PUNE, INDIA</span>
          </div>

          {/* Right Scroll Indicator */}
          <a
            href="#about"
            className="group flex items-center gap-2 text-[#777064] hover:text-[#183D2B] transition-colors"
          >
            <span>SCROLL TO EXPLORE</span>
            <MouseScrollIcon className="h-5 w-4 text-[#183D2B] transition-transform group-hover:translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
