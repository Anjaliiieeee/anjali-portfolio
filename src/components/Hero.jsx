import { motion, useReducedMotion } from "framer-motion";
import { profile } from "../data/content";
import RoleCalendarSlider from "./RoleCalendarSlider";
import { ArrowRight, Download, MapPinIcon, MouseScrollIcon } from "./Icons";
import { downloadResume } from "../lib/downloadResume";

export default function Hero() {
  const reduceMotion = useReducedMotion();

  // One orchestrated entrance: the left column reveals top to bottom, once.
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduceMotion ? 0 : 0.09 } },
  };
  const item = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  // Optional: add `stack: ["React", "Node.js", ...]` to `profile` in data/content.js.
  const stack = Array.isArray(profile.stack) ? profile.stack : [];

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#F4EFE5] pt-28 pb-10 sm:pt-36 sm:pb-12 paper-grain min-h-[92vh] flex flex-col justify-between"
    >
      {/* Background: one soft green arch behind the portrait, one glow bottom-left */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -right-24 top-16 hidden lg:block w-[560px] h-[620px] rounded-l-[280px] bg-[#E5F1DF]/70" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-[#E5F1DF]/70 blur-2xl" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* LEFT: name, tagline, actions, status */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="lg:col-span-7 space-y-7"
          >
            <motion.div variants={item}>
              <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-[#5E584C] font-semibold mb-4">
                <span className="w-10 h-px bg-[#5E584C]/50" />
                <span>Hello, I&apos;m</span>
              </div>

              <h1 className="font-serif text-5xl sm:text-6xl xl:text-7xl font-extrabold uppercase tracking-tight text-[#191919] leading-[0.95]">
                Anjali
                <br />
                Singh
                <span className="mt-3 block text-[#183D2B]">
                  Software
                  <br />
                  Developer.
                </span>
              </h1>
            </motion.div>

            {/* Edit profile.heroShortIntro in data/content.js to make this specific. */}
            <motion.p
              variants={item}
              className="font-sans text-lg text-[#4A453B] leading-relaxed max-w-md"
            >
              {profile.heroShortIntro}
            </motion.p>

            {stack.length > 0 && (
              <motion.ul
                variants={item}
                className="flex flex-wrap gap-2 max-w-md"
                aria-label="Core technologies"
              >
                {stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-[#D8CDBB] bg-[#FFFDF8] px-3 py-1 font-sans text-xs font-medium text-[#191919]"
                  >
                    {tech}
                  </li>
                ))}
              </motion.ul>
            )}

            <motion.div
              variants={item}
              className="flex flex-wrap items-center gap-x-6 gap-y-3"
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-[#183D2B] px-6 py-3 font-sans text-sm font-semibold text-[#FFFDF8] shadow-xs pill-btn hover:bg-[#122e20] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183D2B]"
              >
                <span>Explore my work</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <button
                type="button"
                onClick={downloadResume}
                className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-[#191919] underline underline-offset-4 decoration-[#D8CDBB] hover:decoration-[#183D2B] hover:text-[#183D2B] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183D2B]"
              >
                <Download className="h-4 w-4" />
                <span>Download resume (PDF)</span>
              </button>
            </motion.div>

            <motion.div
              variants={item}
              className="flex flex-wrap items-center gap-3 font-sans text-sm"
            >
              <div className="flex items-center gap-1.5 font-medium text-[#191919]">
                <MapPinIcon className="h-4 w-4 text-[#183D2B]" />
                <span>{profile.location}</span>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#E5F1DF] px-3 py-1 text-xs font-semibold text-[#183D2B]">
                <span className="h-2 w-2 rounded-full bg-[#2E8B57]" />
                {profile.status}
              </span>
            </motion.div>
          </motion.div>

          {/* RIGHT: portrait is the hero image; the role card overlaps its lower
              corner on purpose (over the shirt, never the face) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end pb-2 lg:pb-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="relative w-full max-w-[320px] sm:max-w-[380px]"
            >
              {/* Handwritten line: outside the photo on large screens */}
              <p className="hidden lg:block absolute -left-24 top-2 z-20 font-script text-2xl leading-tight text-[#191919] -rotate-6 select-none pointer-events-none">
                Build
                <br />
                <span className="pl-3">Innovate</span>
                <br />
                <span className="pl-6">Grow</span>
              </p>

              <div className="relative w-full aspect-[4/5] overflow-hidden rounded-t-[160px] rounded-b-[40px] border border-[#D8CDBB]/60 bg-gradient-to-b from-[#E5F1DF] via-[#E9DDC9] to-[#183D2B]/15 shadow-[0_18px_40px_-18px_rgba(24,61,43,0.35)]">
                <img
                  src={`${import.meta.env.BASE_URL}profile.jpeg`}
                  alt="Portrait of Anjali Singh"
                  width={760}
                  height={950}
                  fetchPriority="high"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Role card: stacked under the photo on mobile, overlapping on desktop */}
              <div className="mt-8 lg:mt-0 lg:absolute lg:-bottom-12 lg:-left-24 z-20 w-full lg:w-[360px]">
                <RoleCalendarSlider />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom strip: scroll cue only */}
        <div className="mt-16 sm:mt-14 pt-5 border-t border-[#D8CDBB] flex items-center justify-end font-sans text-xs uppercase tracking-wider text-[#5E584C]">
          <a
            href="#about"
            className="group flex items-center gap-2 hover:text-[#183D2B] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183D2B]"
          >
            <span>Scroll to explore</span>
            <MouseScrollIcon className="h-5 w-4 text-[#183D2B] transition-transform group-hover:translate-y-0.5 motion-reduce:transition-none" />
          </a>
        </div>
      </div>
    </section>
  );
}