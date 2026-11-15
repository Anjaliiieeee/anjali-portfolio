import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { profile } from "../data/content";
import { Section } from "./Section";
import { StarIcon } from "./Icons";

const facts = [
  { label: "Location", value: profile.location },
  { label: "Specialization", value: "Frontend, Python, Java" },
  { label: "Current role", value: "Full-time engineer" },
  { label: "Experience", value: "Since January 2024" },
  { label: "Education", value: "BCA, Modern College, Pune" },
];

const domains = [
  {
    title: "Frontend engineering",
    text: "React, TypeScript, responsive layouts, interactive SVG charts and custom component design.",
  },
  {
    title: "Python services & APIs",
    text: "FastAPI, asynchronous endpoints, SQLAlchemy, OpenAI integration and deterministic evaluation engines.",
  },
  {
    title: "Java & client services",
    text: "Java, Spring Boot microservices, relational databases, WordPress platforms and GA4 telemetry.",
  },
];

const EASE = [0.22, 0.75, 0.25, 1];

/* Card that tilts toward the pointer */
function TiltCard({ reduce, variants, className, children }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 150, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-5, 5]), { stiffness: 150, damping: 18 });

  const onMove = (e) => {
    if (reduce || e.pointerType === "touch") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      variants={variants}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 1100 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  const reduce = useReducedMotion();
  const dist = reduce ? 0 : 1;

  const stagger = (gap = 0.12, delay = 0) => ({
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : gap, delayChildren: reduce ? 0 : delay } },
  });

  const fadeUp = {
    hidden: { opacity: 0, y: 24 * dist },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  };

  const fromLeft = {
    hidden: { opacity: 0, x: -48 * dist },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: EASE, staggerChildren: reduce ? 0 : 0.08, delayChildren: reduce ? 0 : 0.25 },
    },
  };

  const fromRight = {
    hidden: { opacity: 0, x: 48 * dist },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: EASE, staggerChildren: reduce ? 0 : 0.18, delayChildren: reduce ? 0 : 0.35 },
    },
  };

  const photoPop = {
    hidden: { opacity: 0, scale: reduce ? 1 : 0.8, rotate: reduce ? 0 : -6 },
    show: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring", stiffness: 130, damping: 14 } },
  };

  const drawX = {
    hidden: { scaleX: reduce ? 1 : 0 },
    show: { scaleX: 1, transition: { duration: 0.9, ease: EASE } },
  };

  const growY = {
    hidden: { scaleY: reduce ? 1 : 0 },
    show: { scaleY: 1, transition: { duration: 0.7, ease: EASE, delay: 0.5 } },
  };

  const word = {
    hidden: { opacity: 0, y: 10 * dist },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
  };

  const view = { once: true, amount: 0.2 };

  // Soft glow that follows the pointer inside a domain card
  const spotlight = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <Section id="about" background="bg-[#FFFDF8]">
      <div className="relative">
        {/* Slow floating colour blobs behind everything (off for reduced motion) */}
        {!reduce && (
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              animate={{ x: [0, 30, 0], y: [0, -24, 0] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-24 top-40 h-72 w-72 rounded-full bg-[#E5F1DF]/70 blur-3xl"
            />
            <motion.div
              animate={{ x: [0, -36, 0], y: [0, 28, 0] }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-20 bottom-20 h-80 w-80 rounded-full bg-[#E9DDC9]/70 blur-3xl"
            />
          </div>
        )}

        <div className="relative z-10">
          {/* Heading */}
          <motion.div
            variants={stagger(0.15)}
            initial="hidden"
            whileInView="show"
            viewport={view}
            className="mb-12"
          >
            <div className="flex items-end justify-between gap-4 overflow-hidden pb-4">
              <motion.h2
                variants={{
                  hidden: { y: reduce ? "0%" : "110%" },
                  show: { y: "0%", transition: { duration: 0.8, ease: EASE } },
                }}
                className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-[#191919]"
              >
                {profile.aboutHeading}
              </motion.h2>

              <motion.div
                variants={{
                  hidden: { opacity: 0, scale: reduce ? 1 : 0.4 },
                  show: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.5 } },
                }}
                className="shrink-0 mb-2 text-[#183D2B]"
                aria-hidden
              >
                <motion.div
                  animate={reduce ? undefined : { rotate: 360 }}
                  transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                >
                  <StarIcon className="h-7 w-7 sm:h-9 sm:w-9" />
                </motion.div>
              </motion.div>
            </div>
            <motion.div variants={drawX} style={{ originX: 0 }} className="h-px w-full bg-[#D8CDBB]" />
          </motion.div>

          {/* Row 1: equal-height panels */}
          <motion.div
            variants={stagger(0.15)}
            initial="hidden"
            whileInView="show"
            viewport={view}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch"
          >
            {/* Left: profile card (tilts toward the pointer) */}
            <TiltCard
              reduce={reduce}
              variants={fromLeft}
              className="lg:col-span-5 flex flex-col rounded-2xl border border-[#D8CDBB] bg-[#F4EFE5] p-6 sm:p-8 shadow-sm hover:shadow-xl transition-shadow duration-300"
            >
              <motion.div
                variants={fadeUp}
                className="flex items-center gap-4 pb-6 border-b border-[#D8CDBB]"
              >
                {/* Photo with a slowly rotating gradient ring */}
                <motion.div
                  variants={photoPop}
                  whileHover={reduce ? undefined : { rotate: 3, scale: 1.06 }}
                  className="relative shrink-0 h-24 w-24 cursor-pointer"
                >
                  <div className="absolute -inset-[3px] overflow-hidden rounded-[1.15rem]">
                    <motion.div
                      animate={reduce ? undefined : { rotate: 360 }}
                      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-[-60%]"
                      style={{
                        background:
                          "conic-gradient(from 0deg, #183D2B, #E5F1DF, #D8CDBB, #183D2B)",
                      }}
                    />
                  </div>
                  <div className="relative h-full w-full overflow-hidden rounded-2xl border border-[#F4EFE5] bg-[#E9DDC9]">
                    <img
                      src={`${import.meta.env.BASE_URL}profile.jpeg`}
                      alt="Portrait of Anjali Singh"
                      width={192}
                      height={192}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                </motion.div>

                <div className="min-w-0">
                  <h3 className="font-serif text-xl font-bold uppercase text-[#191919]">
                    {profile.name}
                  </h3>
                  <p className="font-sans text-sm font-semibold text-[#183D2B]">
                    Services Software Engineer
                  </p>
                  <p className="font-sans text-xs text-[#5E584C]">{profile.company}</p>
                </div>
              </motion.div>

              <dl className="mt-6 space-y-4 font-sans text-sm">
                {facts.map(({ label, value }) => (
                  <motion.div
                    key={label}
                    variants={fadeUp}
                    className="flex justify-between gap-6"
                  >
                    <dt className="text-[#5E584C]">{label}</dt>
                    <dd className="font-medium text-[#191919] text-right">{value}</dd>
                  </motion.div>
                ))}
              </dl>

              <motion.div variants={fadeUp} className="mt-auto pt-8">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#E5F1DF] px-3 py-1.5 font-sans text-xs font-semibold text-[#183D2B]">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-[#2E8B57] opacity-60 motion-safe:animate-ping" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2E8B57]" />
                  </span>
                  {profile.status}
                </span>
              </motion.div>
            </TiltCard>

            {/* Right: story panel with a floating monogram watermark */}
            <motion.div
              variants={fromRight}
              className="relative lg:col-span-7 flex flex-col justify-center overflow-hidden rounded-2xl border border-[#D8CDBB] bg-[#FFFDF8] p-6 sm:p-8 lg:p-10 shadow-sm"
            >
              <motion.span
                aria-hidden
                animate={reduce ? undefined : { y: [0, -14, 0], rotate: [0, 2, 0] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                className="pointer-events-none absolute -bottom-10 -right-2 select-none font-serif text-[11rem] font-bold leading-none text-[#183D2B]/[0.05]"
              >
                AS
              </motion.span>

              <div className="relative space-y-5 font-sans text-base sm:text-lg leading-relaxed max-w-2xl">
                {profile.aboutParagraphs.map((para, i) =>
                  i === 0 ? (
                    <motion.p
                      key={i}
                      variants={stagger(0.035, 0)}
                      aria-label={para}
                      className="relative pl-5 font-medium text-[#183D2B] text-lg sm:text-xl"
                    >
                      <motion.span
                        variants={growY}
                        style={{ originY: 0 }}
                        className="absolute left-0 top-1 bottom-1 w-1 rounded-full bg-[#183D2B]"
                      />
                      {/* Lead paragraph reveals word by word */}
                      {para.split(" ").map((w, j) => (
                        <motion.span
                          key={j}
                          variants={word}
                          aria-hidden
                          className="inline-block mr-[0.28em]"
                        >
                          {w}
                        </motion.span>
                      ))}
                    </motion.p>
                  ) : (
                    <motion.p key={i} variants={fadeUp} className="text-[#4A453B]">
                      {para}
                    </motion.p>
                  )
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Row 2: domain cards with a pointer-following glow */}
          <motion.div
            variants={stagger(0.14)}
            initial="hidden"
            whileInView="show"
            viewport={view}
            className="mt-6 lg:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-8"
          >
            {domains.map(({ title, text }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                whileHover={reduce ? undefined : { y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onPointerMove={reduce ? undefined : spotlight}
                className="group relative h-full overflow-hidden rounded-xl border border-[#D8CDBB] bg-[#F4EFE5] p-6 pt-7 transition-shadow duration-300 hover:shadow-lg"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(260px_circle_at_var(--mx,50%)_var(--my,50%),rgba(229,241,223,0.95),transparent_70%)]"
                />
                <motion.span
                  variants={drawX}
                  style={{ originX: 0 }}
                  className="absolute inset-x-0 top-0 h-1 bg-[#183D2B]"
                />
                <div className="relative">
                  <h4 className="font-serif text-lg font-bold text-[#191919]">{title}</h4>
                  <p className="mt-2 font-sans text-sm text-[#4A453B] leading-relaxed">{text}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </Section>
  );
}