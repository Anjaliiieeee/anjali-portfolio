import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { experienceData } from "../data/content";
import { Section } from "./Section";

const EASE = [0.22, 0.75, 0.25, 1];

export default function Experience() {
  const reduce = useReducedMotion();
  const d = reduce ? 0 : 1;

  // The green line fills downward as you scroll through the timeline
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 65%"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  /* ---------- animation variants ---------- */
  const stagger = (gap = 0.1, delay = 0) => ({
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : gap, delayChildren: reduce ? 0 : delay } },
  });
  const fadeUp = {
    hidden: { opacity: 0, y: 20 * d },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
  };
  const fadeLeft = {
    hidden: { opacity: 0, x: -16 * d },
    show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE } },
  };
  const pop = {
    hidden: { opacity: 0, scale: reduce ? 1 : 0 },
    show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 16 } },
  };
  const maskUp = {
    hidden: { y: reduce ? "0%" : "110%" },
    show: { y: "0%", transition: { duration: 0.8, ease: EASE } },
  };
  const drawX = {
    hidden: { scaleX: reduce ? 1 : 0 },
    show: { scaleX: 1, transition: { duration: 0.9, ease: EASE } },
  };

  const view = { once: true, amount: 0.2 };

  return (
    <Section id="experience" background="bg-[#F4EFE5]">
      {/* Heading */}
      <motion.div
        variants={stagger(0.12)}
        initial="hidden"
        whileInView="show"
        viewport={view}
        className="mb-12"
      >
        <div className="overflow-hidden pb-1">
          <motion.h2
            variants={maskUp}
            className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-[#191919]"
          >
            Professional experience
          </motion.h2>
        </div>
        <motion.p
          variants={fadeUp}
          className="mt-3 pb-6 font-sans text-sm sm:text-base text-[#5E584C] max-w-xl"
        >
          Career timeline at {experienceData.company} in {experienceData.location}.
        </motion.p>
        <motion.div variants={drawX} style={{ originX: 0 }} className="h-px w-full bg-[#D8CDBB]" />
      </motion.div>

      {/* Timeline card */}
      <motion.div
        variants={stagger(0.15)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.05 }}
        className="rounded-3xl border border-[#D8CDBB] bg-[#FFFDF8] p-6 sm:p-10 lg:p-12 shadow-sm space-y-10"
      >
        {/* Company header */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D8CDBB] pb-6"
        >
          <div>
            <span className="font-sans text-xs font-bold text-[#183D2B] block mb-1">
              Current employer
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#191919]">
              {experienceData.company}
            </h3>
            <p className="font-sans text-sm text-[#5E584C] mt-0.5">
              {experienceData.location} · Services Software Engineer
            </p>
          </div>

          <span className="inline-flex items-center gap-2 rounded-full bg-[#E5F1DF] text-[#183D2B] px-3.5 py-1.5 text-xs font-semibold font-sans self-start sm:self-auto">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#2E8B57] opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2E8B57]" />
            </span>
            June 2024 – Present (full-time)
          </span>
        </motion.div>

        {/* Timeline milestones with one continuous line that fills on scroll */}
        <div ref={timelineRef} className="relative space-y-10">
          <div aria-hidden className="absolute left-0 top-1 bottom-1 w-0.5 rounded-full bg-[#D8CDBB]" />
          <motion.div
            aria-hidden
            style={{ scaleY: reduce ? 1 : fill, originY: 0 }}
            className="absolute left-0 top-1 bottom-1 w-0.5 rounded-full bg-[#183D2B]"
          />

          {experienceData.timeline.map((item) => {
            const isCurrent = /present/i.test(item.period);
            return (
              <motion.div
                key={item.period}
                variants={stagger(0.08, 0.2)}
                initial="hidden"
                whileInView="show"
                viewport={view}
                className="group relative pl-6 sm:pl-8 space-y-3"
              >
                {/* Dot marker pops in; the current role also pulses */}
                <motion.span
                  variants={pop}
                  className="absolute -left-[7px] top-1 h-3.5 w-3.5"
                >
                  {isCurrent && (
                    <span className="absolute inset-0 rounded-full bg-[#183D2B] opacity-40 motion-safe:animate-ping" />
                  )}
                  <span className="relative block h-full w-full rounded-full border-2 border-[#FFFDF8] bg-[#183D2B] transition-transform duration-300 group-hover:scale-125" />
                </motion.span>

                <motion.div
                  variants={fadeLeft}
                  className="flex flex-wrap items-baseline gap-2"
                >
                  <span className="font-sans text-xs font-bold text-[#183D2B] bg-[#E5F1DF] rounded-full px-2.5 py-0.5">
                    {item.period}
                  </span>
                  <h4 className="font-serif text-lg font-bold text-[#191919] transition-colors group-hover:text-[#183D2B]">
                    {item.role}
                  </h4>
                </motion.div>

                <ul className="space-y-2 font-sans text-sm text-[#4A453B]">
                  {item.points.map((pt, i) => (
                    <motion.li
                      key={i}
                      variants={fadeLeft}
                      className="flex items-start gap-2.5"
                    >
                      <span className="text-[#183D2B] font-bold mt-0.5">•</span>
                      <span className="leading-relaxed text-[#191919]/90">{pt}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </Section>
  );
}