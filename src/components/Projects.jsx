import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { featuredProject, secondaryProjects } from "../data/content";
import { Section } from "./Section";
import { ArrowUpRight, CodeIcon, GithubIcon } from "./Icons";

const EASE = [0.22, 0.75, 0.25, 1];

/* Shared animation variants. Children inherit "hidden" / "show" from the nearest
   <Reveal>, so most elements only need `variants={v.fadeUp}`. */
function useKit() {
  const reduce = useReducedMotion();
  const d = reduce ? 0 : 1;
  return {
    reduce,
    stagger: (gap = 0.1, delay = 0) => ({
      hidden: {},
      show: { transition: { staggerChildren: reduce ? 0 : gap, delayChildren: reduce ? 0 : delay } },
    }),
    fadeUp: {
      hidden: { opacity: 0, y: 24 * d },
      show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
    },
    fadeLeft: {
      hidden: { opacity: 0, x: -16 * d },
      show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: EASE } },
    },
    pop: {
      hidden: { opacity: 0, scale: reduce ? 1 : 0.8 },
      show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 260, damping: 18 } },
    },
    drawX: {
      hidden: { scaleX: reduce ? 1 : 0 },
      show: { scaleX: 1, transition: { duration: 0.9, ease: EASE } },
    },
    maskUp: {
      hidden: { y: reduce ? "0%" : "110%" },
      show: { y: "0%", transition: { duration: 0.8, ease: EASE } },
    },
  };
}

/* Wrapper that plays its children's animations once when scrolled into view */
function Reveal({ gap = 0.1, delay = 0, amount = 0.15, className, children }) {
  const { stagger } = useKit();
  return (
    <motion.div
      variants={stagger(gap, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* Card that lifts on hover and shows a soft glow that follows the pointer */
function GlowCard({ variants, className = "", children }) {
  const { reduce } = useKit();
  const onMove = (e) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <motion.div
      variants={variants}
      whileHover={reduce ? undefined : { y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onPointerMove={onMove}
      className={`group relative overflow-hidden transition-shadow duration-300 hover:shadow-lg ${className}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(280px_circle_at_var(--mx,50%)_var(--my,50%),rgba(229,241,223,0.9),transparent_70%)]"
      />
      <div className="relative flex h-full flex-col justify-between">{children}</div>
    </motion.div>
  );
}

/* Lines of the fake in-browser editor */
const kw = (t) => <span className="text-[#E5F1DF] font-bold">{t}</span>;
const codeLines = [
  { n: "01", node: <>{kw("import")} asyncio</> },
  { n: "02", node: <>{kw("from")} typing {kw("import")} List, Callable</> },
  { n: "03", node: <>{kw("class")} TaskQueue:</> },
  { n: "04", node: <>&nbsp;&nbsp;&nbsp;&nbsp;{kw("def")} __init__(self, concurrency: int = 5):</> },
  { n: "05", node: <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.semaphore = asyncio.Semaphore(concurrency)</> },
  {
    n: "06",
    hl: true,
    node: (
      <>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self._queue: List[dict] = []{" "}
        <span className="text-[#E5F1DF] italic"># [Evaluator Flag: Concurrency Lock Required]</span>
      </>
    ),
  },
];

const tabs = [
  { id: "editor", label: "In-browser editor" },
  { id: "diagnostic", label: "Concept gap diagnostics" },
  { id: "mastery", label: "EMA mastery radar" },
];

const masteryPoints = [
  [10, 85],
  [160, 55],
  [280, 40],
  [400, 22],
];

export default function Projects() {
  const v = useKit();
  const { reduce } = v;
  const [activeTab, setActiveTab] = useState("editor");
  const [showArchSpec, setShowArchSpec] = useState(false);

  // Tab content: whole panel fades, then its children stagger in
  const panel = {
    initial: { opacity: 0, y: reduce ? 0 : 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: reduce ? 0 : -10, transition: { duration: 0.15 } },
  };

  const contributionCards = [
    {
      key: "frontend",
      title: "Frontend developer contribution",
      badge: "REACT 19",
      items: featuredProject.frontendContributions,
      footLeft: "Vite · Axios · SVG engine",
      footRight: "React 19 architecture",
    },
    {
      key: "backend",
      title: "Python backend developer contribution",
      badge: "FASTAPI",
      items: featuredProject.backendContributions,
      footLeft: "FastAPI · SQLAlchemy · PyTest",
      footRight: "Python 3.12 core",
    },
  ];

  const archSteps = [
    {
      t: "01. Ingestion & tokenization",
      p: "In-browser code editor tokenizes code client-side, passes payloads over Axios with JWT headers to FastAPI.",
    },
    {
      t: "02. Dual-pass evaluation",
      p: "OpenAI evaluation evaluates conceptual correctness. Deterministic fallback engine runs if rate-limits occur.",
    },
    {
      t: "03. EMA mastery persistence",
      p: "Calculates Exponential Moving Average mastery per concept and persists state via SQLAlchemy into PostgreSQL/SQLite.",
    },
  ];

  return (
    <Section id="projects" background="bg-[#FFFDF8]">
      {/* Heading: mask reveal, rule draws across */}
      <Reveal gap={0.15} className="mb-12">
        <div className="overflow-hidden pb-2">
          <motion.h2
            variants={v.maskUp}
            className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-[#191919]"
          >
            Featured projects
          </motion.h2>
        </div>
        <motion.p
          variants={v.fadeUp}
          className="mt-3 pb-6 font-sans text-sm sm:text-base text-[#5E584C] max-w-xl"
        >
          Practical software combining frontend engineering with Python backend services.
        </motion.p>
        <motion.div variants={v.drawX} style={{ originX: 0 }} className="h-px w-full bg-[#D8CDBB]" />
      </Reveal>

      {/* =========================== FEATURED PROJECT =========================== */}
      <div className="rounded-3xl border border-[#D8CDBB] bg-[#F4EFE5] p-6 sm:p-10 lg:p-12 shadow-sm">
        {/* Meta bar + title + overview */}
        <Reveal gap={0.12}>
          <motion.div
            variants={v.fadeUp}
            className="flex flex-wrap items-center justify-between gap-4 border-b border-[#D8CDBB] pb-6"
          >
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-[#183D2B] px-3.5 py-1 font-mono text-xs font-bold text-[#FFFDF8]">
                Project {featuredProject.number}
              </span>
              <span className="font-sans text-xs font-medium text-[#5E584C]">
                {featuredProject.category}
              </span>
            </div>

            <a
              href={featuredProject.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-[#D8CDBB] bg-[#FFFDF8] px-4 py-2 font-sans text-xs font-semibold text-[#191919] hover:bg-[#183D2B] hover:text-[#FFFDF8] hover:border-[#183D2B] transition-colors shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183D2B]"
            >
              <GithubIcon className="h-4 w-4" />
              <span>GitHub repository</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>

          <div className="mt-8">
            <div className="overflow-hidden pb-1">
              <motion.h3
                variants={v.maskUp}
                className="font-serif text-3xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-[#191919] leading-[0.95]"
              >
                ConceptBridge <span className="text-[#183D2B]">AI</span>
              </motion.h3>
            </div>
            <motion.p
              variants={v.fadeUp}
              className="mt-2 font-sans text-sm sm:text-base font-semibold text-[#183D2B]"
            >
              {featuredProject.headline}
            </motion.p>
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-t border-[#D8CDBB] pt-6">
            <motion.p
              variants={v.fadeUp}
              className="lg:col-span-8 font-sans text-sm sm:text-base leading-relaxed text-[#191919]"
            >
              {featuredProject.description}
            </motion.p>

            <motion.div variants={v.fadeUp} className="lg:col-span-4 space-y-2">
              <span className="font-sans text-xs font-bold text-[#5E584C] block">Technology stack</span>
              <motion.div
                variants={v.stagger(0.04)}
                className="flex flex-wrap gap-1.5"
              >
                {featuredProject.stack.map((tech) => (
                  <motion.span
                    key={tech}
                    variants={v.pop}
                    whileHover={reduce ? undefined : { y: -2, scale: 1.05 }}
                    className="rounded-md border border-[#D8CDBB] bg-[#FFFDF8] px-2.5 py-1 font-mono text-[11px] text-[#191919] cursor-default"
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </Reveal>

        {/* ---------------- Interactive simulator ---------------- */}
        <Reveal amount={0.1} className="mt-10">
          <motion.div
            variants={v.fadeUp}
            className="rounded-2xl border border-[#D8CDBB] bg-[#FFFDF8] shadow-sm overflow-hidden"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#D8CDBB] bg-[#F4EFE5] px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#183D2B]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#D8CDBB]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#E5F1DF]" />
                <span className="ml-2 font-mono text-xs font-semibold text-[#191919]">
                  conceptbridge.simulator
                </span>
              </div>

              {/* Tabs: the green pill slides between tabs */}
              <div role="tablist" aria-label="Project demo" className="flex flex-wrap items-center gap-1.5">
                {tabs.map((tab) => {
                  const active = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative rounded-full px-3 py-1 font-sans text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183D2B] ${
                        active ? "text-[#FFFDF8] font-semibold" : "text-[#5E584C] hover:text-[#191919]"
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="projectTabPill"
                          transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 30 }}
                          className="absolute inset-0 rounded-full bg-[#183D2B]"
                        />
                      )}
                      <span className="relative z-10">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="min-h-[300px] p-5 sm:p-7 bg-[#242820] text-[#FFFDF8] font-mono">
              <AnimatePresence mode="wait" initial={false}>
                {activeTab === "editor" && (
                  <motion.div
                    key="editor"
                    {...panel}
                    role="tabpanel"
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-[#FFFDF8]/15 pb-2 text-xs text-[#FFFDF8]/70">
                      <div className="flex items-center gap-2">
                        <CodeIcon className="h-4 w-4 text-[#E5F1DF]" />
                        <span className="text-[#FFFDF8] font-bold">challenge_thread_pool.py</span>
                        <span className="text-[10px] bg-[#183D2B] text-[#FFFDF8] px-1.5 py-0.5 rounded">
                          Python 3.12
                        </span>
                      </div>
                      <span>Syntax check: PASS | Lines: 28</span>
                    </div>

                    {/* Code appears line by line, then a cursor blinks */}
                    <motion.div
                      initial="hidden"
                      animate="show"
                      variants={v.stagger(0.12, 0.15)}
                      className="text-xs sm:text-sm font-mono leading-relaxed space-y-1"
                    >
                      {codeLines.map((line) => (
                        <motion.div
                          key={line.n}
                          variants={v.fadeLeft}
                          className={`flex gap-4 text-[#FFFDF8]/40 ${
                            line.hl
                              ? "bg-[#183D2B]/50 py-0.5 -mx-2 px-2 border-l-2 border-[#E5F1DF]"
                              : ""
                          }`}
                        >
                          <span className={`w-6 select-none text-right ${line.hl ? "text-[#E5F1DF]" : ""}`}>
                            {line.n}
                          </span>
                          <span className="text-[#FFFDF8]">{line.node}</span>
                        </motion.div>
                      ))}
                      <motion.div variants={v.fadeLeft} className="flex gap-4 text-[#FFFDF8]/40">
                        <span className="w-6 select-none text-right">07</span>
                        <motion.span
                          aria-hidden
                          animate={reduce ? undefined : { opacity: [1, 0, 1] }}
                          transition={{ duration: 1.1, repeat: Infinity }}
                          className="inline-block h-4 w-2 bg-[#E5F1DF]"
                        />
                      </motion.div>
                    </motion.div>

                    <div className="mt-4 border-t border-[#FFFDF8]/15 pt-3 flex items-center justify-between text-xs text-[#FFFDF8]/70">
                      <span>Custom in-browser editor with dynamic line numbering &amp; indentation</span>
                      <span className="text-[#E5F1DF]">FastAPI evaluation ready</span>
                    </div>
                  </motion.div>
                )}

                {activeTab === "diagnostic" && (
                  <motion.div key="diagnostic" {...panel} role="tabpanel" className="space-y-4">
                    <motion.div
                      initial="hidden"
                      animate="show"
                      variants={v.stagger(0.15, 0.1)}
                      className="space-y-4"
                    >
                      <motion.div
                        variants={v.fadeUp}
                        className="rounded-xl border border-[#183D2B] bg-[#183D2B]/40 p-4"
                      >
                        <div className="flex items-center justify-between text-xs uppercase text-[#E5F1DF] font-bold mb-2">
                          <span>Intelligent conceptual gap detection</span>
                          <span>Confidence: 96%</span>
                        </div>
                        {/* Confidence bar fills up */}
                        <div className="mb-3 h-1.5 w-full overflow-hidden rounded-full bg-[#FFFDF8]/10">
                          <motion.div
                            initial={{ width: reduce ? "96%" : "0%" }}
                            animate={{ width: "96%" }}
                            transition={{ duration: 1.2, delay: 0.4, ease: EASE }}
                            className="h-full rounded-full bg-[#E5F1DF]"
                          />
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-[#FFFDF8]">
                          Misunderstanding: Mutex synchronization vs. Semaphore throttling
                        </h4>
                        <p className="mt-2 text-xs leading-relaxed text-[#FFFDF8]/80 font-sans">
                          The student understood rate throttling using Semaphore, but failed to protect mutating shared state with an asyncio.Lock. OpenAI diagnostic model + static AST rules successfully flagged this conceptual edge case.
                        </p>
                      </motion.div>

                      <motion.div
                        variants={v.fadeUp}
                        className="rounded-lg border border-[#FFFDF8]/20 bg-[#FFFDF8]/5 p-3 text-xs"
                      >
                        <span className="text-[#E5F1DF] font-bold block mb-1">
                          [Personalized follow-up exercise generated]
                        </span>
                        <p className="font-sans text-[#FFFDF8]/80">
                          Exercise #07B: Implement an asynchronous worker pool with a thread-safe mutex protecting buffer operations during rapid batch insertions.
                        </p>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                )}

                {activeTab === "mastery" && (
                  <motion.div key="mastery" {...panel} role="tabpanel" className="space-y-4">
                    <div className="flex items-center justify-between text-xs border-b border-[#FFFDF8]/15 pb-2">
                      <span className="font-bold text-[#FFFDF8]">
                        Exponential Moving Average (EMA) mastery curve
                      </span>
                      <span className="text-[#E5F1DF]">α = 0.35 smoothing factor</span>
                    </div>

                    {/* The curve draws itself, then the points pop in */}
                    <div className="relative h-28 w-full border border-[#FFFDF8]/15 bg-[#FFFDF8]/5 p-2 rounded-lg">
                      <svg className="w-full h-full" viewBox="0 0 500 100" preserveAspectRatio="none">
                        {[25, 50, 75].map((y) => (
                          <line key={y} x1="0" y1={y} x2="500" y2={y} stroke="#FFFDF8" strokeOpacity="0.1" strokeDasharray="3 3" />
                        ))}

                        <motion.path
                          d="M 10 85 Q 90 70, 160 55 T 280 40 T 400 22 T 490 15"
                          fill="none"
                          stroke="#E5F1DF"
                          strokeWidth="2.5"
                          initial={{ pathLength: reduce ? 1 : 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1.6, ease: "easeInOut", delay: 0.2 }}
                        />

                        {masteryPoints.map(([cx, cy], i) => (
                          <motion.circle
                            key={cx}
                            cx={cx}
                            cy={cy}
                            r="3.5"
                            fill="#FFFDF8"
                            style={{ transformBox: "fill-box", transformOrigin: "center" }}
                            initial={{ scale: reduce ? 1 : 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.4 + i * 0.35, type: "spring", stiffness: 300 }}
                          />
                        ))}
                        <motion.circle
                          cx="490"
                          cy="15"
                          r="4.5"
                          fill="#183D2B"
                          stroke="#E5F1DF"
                          strokeWidth="1.5"
                          style={{ transformBox: "fill-box", transformOrigin: "center" }}
                          initial={{ scale: reduce ? 1 : 0 }}
                          animate={reduce ? { scale: 1 } : { scale: [0, 1.3, 1] }}
                          transition={{ delay: 1.7, duration: 0.5 }}
                        />
                      </svg>
                      <div className="absolute bottom-2 right-4 text-[10px] text-[#FFFDF8]/60 font-sans">
                        Calculated mastery: 88.5% (Asynchronous Programming)
                      </div>
                    </div>

                    <motion.div
                      initial="hidden"
                      animate="show"
                      variants={v.stagger(0.08, 0.6)}
                      className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs"
                    >
                      {[
                        ["Framework", "React 19 + Vite"],
                        ["Backend", "FastAPI (Python)"],
                        ["ORM", "SQLAlchemy"],
                        ["Test suite", "PyTest automated"],
                      ].map(([label, value]) => (
                        <motion.div
                          key={label}
                          variants={v.fadeUp}
                          className="border border-[#FFFDF8]/15 p-2 rounded"
                        >
                          <span className="block text-[10px] text-[#FFFDF8]/60">{label}</span>
                          <span className="font-bold text-[#FFFDF8]">{value}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </Reveal>

        {/* ---------------- Contributions ---------------- */}
        <div className="mt-12">
          <Reveal gap={0.1} className="mb-8">
            <motion.div variants={v.fadeUp} className="pb-4">
              <span className="font-sans text-xs font-bold text-[#183D2B] block">
                Detailed technical responsibilities
              </span>
              <h4 className="font-serif text-2xl sm:text-3xl font-bold uppercase text-[#191919]">
                Frontend &amp; Python backend contributions
              </h4>
            </motion.div>
            <motion.div variants={v.drawX} style={{ originX: 0 }} className="h-px w-full bg-[#D8CDBB]" />
          </Reveal>

          <Reveal gap={0.18} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {contributionCards.map((card) => (
              <GlowCard
                key={card.key}
                variants={v.fadeUp}
                className="rounded-2xl border border-[#D8CDBB] bg-[#FFFDF8] p-6 sm:p-8 shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 border-b border-[#D8CDBB]/60 pb-3">
                    <div className="flex items-center gap-2">
                      <CodeIcon className="h-5 w-5 text-[#183D2B]" />
                      <h5 className="font-serif text-lg font-bold uppercase text-[#191919]">
                        {card.title}
                      </h5>
                    </div>
                    <span className="shrink-0 rounded-full bg-[#E5F1DF] text-[#183D2B] font-mono text-[10px] font-bold px-2.5 py-0.5">
                      {card.badge}
                    </span>
                  </div>

                  <motion.ul
                    variants={v.stagger(0.07, 0.2)}
                    className="mt-5 space-y-2.5 font-sans text-xs sm:text-sm text-[#191919]"
                  >
                    {card.items.map((item, idx) => (
                      <motion.li key={idx} variants={v.fadeLeft} className="flex items-start gap-2.5">
                        <motion.span
                          variants={v.pop}
                          className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-[#183D2B] text-[#FFFDF8] text-[9px] font-bold"
                        >
                          ✓
                        </motion.span>
                        <span className="text-[#191919]/90 leading-relaxed">{item}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>

                <div className="mt-6 border-t border-[#D8CDBB]/50 pt-3 flex items-center justify-between gap-3 text-xs text-[#5E584C] font-mono">
                  <span>{card.footLeft}</span>
                  <span className="font-bold text-[#183D2B]">{card.footRight}</span>
                </div>
              </GlowCard>
            ))}
          </Reveal>
        </div>

        {/* ---------------- Footer actions + architecture drawer ---------------- */}
        <Reveal className="mt-10">
          <motion.div
            variants={v.fadeUp}
            className="flex flex-wrap items-center justify-between gap-4 border-t border-[#D8CDBB] pt-6"
          >
            <div className="flex items-center gap-2 font-sans text-xs text-[#5E584C]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#183D2B] opacity-50 motion-safe:animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#183D2B]" />
              </span>
              <span>Open-source repository · code and documentation publicly available</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-expanded={showArchSpec}
                onClick={() => setShowArchSpec(!showArchSpec)}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#D8CDBB] bg-[#FFFDF8] px-4 py-2 font-sans text-xs font-semibold text-[#191919] hover:bg-[#F4EFE5] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183D2B]"
              >
                <span>{showArchSpec ? "Hide architecture spec" : "Explore architecture spec"}</span>
                <motion.span
                  animate={{ rotate: showArchSpec ? 180 : 0 }}
                  transition={{ duration: reduce ? 0 : 0.3 }}
                  className="text-[#183D2B]"
                >
                  ▼
                </motion.span>
              </button>

              <a
                href={featuredProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-[#183D2B] px-5 py-2 font-sans text-xs font-semibold text-[#FFFDF8] hover:bg-[#122e20] shadow-xs pill-btn transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183D2B]"
              >
                <GithubIcon className="h-4 w-4" />
                <span>Explore on GitHub</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </motion.div>
        </Reveal>

        <AnimatePresence initial={false}>
          {showArchSpec && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
              className="mt-6 rounded-2xl border border-[#D8CDBB] bg-[#FFFDF8] overflow-hidden"
            >
              <div className="p-6">
                <div className="font-sans text-xs font-bold text-[#183D2B] mb-3">
                  System topology specification
                </div>
                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={v.stagger(0.12, 0.15)}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans text-[#4A453B]"
                >
                  {archSteps.map((s) => (
                    <motion.div
                      key={s.t}
                      variants={v.fadeUp}
                      className="p-3.5 rounded-xl border border-[#D8CDBB] bg-[#F4EFE5]"
                    >
                      <span className="font-bold text-[#191919] block mb-1">{s.t}</span>
                      <p>{s.p}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* =========================== SECONDARY PROJECTS =========================== */}
      <div className="mt-14 space-y-8">
        <Reveal>
          <div className="overflow-hidden pb-3">
            <motion.h3
              variants={v.maskUp}
              className="font-serif text-xl sm:text-2xl font-bold uppercase text-[#191919]"
            >
              Additional selected projects
            </motion.h3>
          </div>
          <motion.div variants={v.drawX} style={{ originX: 0 }} className="h-px w-full bg-[#D8CDBB]" />
        </Reveal>

        <Reveal gap={0.18} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {secondaryProjects.map((proj) => (
            <GlowCard
              key={proj.id}
              variants={v.fadeUp}
              className="rounded-2xl border border-[#D8CDBB] bg-[#F4EFE5] p-6 sm:p-8 shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between border-b border-[#D8CDBB] pb-3 font-sans text-xs text-[#5E584C]">
                  <span className="font-bold text-[#183D2B]">Project {proj.number}</span>
                  <span>{proj.badge}</span>
                </div>

                <h4 className="mt-4 font-serif text-xl sm:text-2xl font-bold text-[#191919]">
                  {proj.name}
                </h4>
                <p className="mt-1 font-sans text-xs font-semibold text-[#183D2B]">{proj.headline}</p>
                <p className="mt-3 font-sans text-xs sm:text-sm text-[#4A453B] leading-relaxed">
                  {proj.description}
                </p>

                <motion.ul
                  variants={v.stagger(0.07, 0.2)}
                  className="mt-4 space-y-1.5 font-sans text-xs text-[#191919]"
                >
                  {proj.highlights.map((h, i) => (
                    <motion.li key={i} variants={v.fadeLeft} className="flex items-start gap-2">
                      <span className="text-[#183D2B] font-bold">•</span>
                      <span>{h}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>

              <div className="mt-6 pt-4 border-t border-[#D8CDBB] flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {proj.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded bg-[#FFFDF8] border border-[#D8CDBB] px-2 py-0.5 font-mono text-[10px] text-[#191919]"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <a
                  href={proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex items-center gap-1.5 text-xs font-semibold text-[#183D2B] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183D2B]"
                >
                  <span>Code</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </a>
              </div>
            </GlowCard>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}