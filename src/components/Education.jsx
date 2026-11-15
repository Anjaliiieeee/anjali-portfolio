import { motion, useReducedMotion } from "framer-motion";
import { educationData } from "../data/content";
import { Section } from "./Section";

const EASE = [0.22, 0.75, 0.25, 1];

export default function Education() {
  const reduce = useReducedMotion();
  const d = reduce ? 0 : 1;

  /* ---------- animation variants ---------- */
  const stagger = (gap = 0.1, delay = 0) => ({
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : gap, delayChildren: reduce ? 0 : delay } },
  });
  const fadeUp = {
    hidden: { opacity: 0, y: 20 * d },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
  };
  const pop = {
    hidden: { opacity: 0, scale: reduce ? 1 : 0.8 },
    show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 280, damping: 18 } },
  };
  const maskUp = {
    hidden: { y: reduce ? "0%" : "110%" },
    show: { y: "0%", transition: { duration: 0.8, ease: EASE } },
  };
  const drawX = {
    hidden: { scaleX: reduce ? 1 : 0 },
    show: { scaleX: 1, transition: { duration: 0.9, ease: EASE } },
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 28 * d },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: EASE,
        staggerChildren: reduce ? 0 : 0.09,
        delayChildren: reduce ? 0 : 0.15,
      },
    },
  };

  const view = { once: true, amount: 0.2 };

  // Glow that follows the pointer inside a card
  const spotlight = (e) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  // Turns "67.76%" into 67.76 so the score can be drawn as a bar.
  // Returns null if the score is not a percentage (then no bar is shown).
  const percentOf = (score) => {
    const m = String(score ?? "").match(/(\d+(?:\.\d+)?)\s*%/);
    const n = m ? parseFloat(m[1]) : NaN;
    return Number.isFinite(n) && n <= 100 ? n : null;
  };

  return (
    <Section id="education" background="bg-[#FFFDF8]">
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
            Education
          </motion.h2>
        </div>
        <motion.p
          variants={fadeUp}
          className="mt-3 pb-6 font-sans text-sm sm:text-base text-[#5E584C] max-w-xl"
        >
          Computer applications degree and academic qualifications in Pune, India.
        </motion.p>
        <motion.div variants={drawX} style={{ originX: 0 }} className="h-px w-full bg-[#D8CDBB]" />
      </motion.div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {educationData.map((edu) => {
          const pct = percentOf(edu.score);
          return (
            <motion.div
              key={edu.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={view}
              whileHover={reduce ? undefined : { y: -6 }}
              onPointerMove={spotlight}
              className="group relative overflow-hidden rounded-2xl border border-[#D8CDBB] bg-[#F4EFE5] p-6 sm:p-8 shadow-xs transition-shadow duration-300 hover:shadow-lg"
            >
              {/* Green top bar draws across */}
              <motion.span
                aria-hidden
                variants={drawX}
                style={{ originX: 0 }}
                className="absolute inset-x-0 top-0 h-1 bg-[#183D2B]"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(300px_circle_at_var(--mx,50%)_var(--my,50%),rgba(229,241,223,0.9),transparent_70%)]"
              />

              <div className="relative">
                <motion.div
                  variants={fadeUp}
                  className="flex items-center justify-between gap-3 border-b border-[#D8CDBB] pb-3"
                >
                  <span className="font-sans text-xs font-semibold text-[#5E584C]">Degree</span>
                  <span className="rounded-full bg-[#E5F1DF] px-3 py-0.5 font-sans text-xs font-bold text-[#183D2B]">
                    {edu.period}
                  </span>
                </motion.div>

                <motion.h3 variants={fadeUp} className="mt-4 font-serif text-xl font-bold text-[#191919]">
                  {edu.degree}
                </motion.h3>

                <motion.p variants={fadeUp} className="mt-1 font-sans text-sm text-[#5E584C]">
                  {edu.institution} · {edu.location}
                </motion.p>

                {/* Score badge, plus a bar that fills to the percentage */}
                <motion.div variants={pop} className="mt-4">
                  <div className="inline-block rounded-md bg-[#FFFDF8] border border-[#D8CDBB] px-3 py-1 font-sans text-xs font-semibold text-[#183D2B]">
                    Aggregate: {edu.score}
                  </div>
                  {pct !== null && (
                    <div
                      className="mt-3 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-[#D8CDBB]/60"
                      role="img"
                      aria-label={`Aggregate ${pct} percent`}
                    >
                      <motion.div
                        initial={{ width: reduce ? `${pct}%` : "0%" }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true, amount: 0.8 }}
                        transition={{ duration: 1.3, delay: 0.5, ease: EASE }}
                        className="h-full rounded-full bg-[#183D2B]"
                      />
                    </div>
                  )}
                </motion.div>

                <motion.p
                  variants={fadeUp}
                  className="mt-4 font-sans text-sm text-[#4A453B] leading-relaxed"
                >
                  {edu.details}
                </motion.p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}