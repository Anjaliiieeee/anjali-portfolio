import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { featuredProject, secondaryProjects } from "../data/content";
import { Section } from "./Section";
import {
  ArrowUpRight,
  CodeIcon,
  GithubIcon,
  CheckIcon,
} from "./Icons";

export default function Projects() {
  const [activeTab, setActiveTab] = useState("editor"); // 'editor' | 'diagnostic' | 'mastery'
  const [showArchSpec, setShowArchSpec] = useState(false);

  return (
    <Section id="projects" background="bg-[#FFFDF8]">
      {/* Top Eyebrow */}
      <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-[#777064] mb-4">
        <span className="font-bold text-[#183D2B]">03</span>
        <span className="text-[#D8CDBB]">/</span>
        <span>PORTFOLIO SHOWCASE</span>
      </div>

      {/* Main Section Heading */}
      <div className="border-b border-[#D8CDBB] pb-6 mb-12">
        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-[#191919]">
          FEATURED PROJECTS
        </h2>
        <p className="mt-3 font-sans text-sm sm:text-base text-[#777064] max-w-xl">
          Highlighting practical software architectures combining frontend engineering with Python backend services.
        </p>
      </div>

      {/* =========================================================================
          FEATURED PROJECT 01: CONCEPTBRIDGE AI (Oversized Showcase)
          ========================================================================= */}
      <div className="rounded-3xl border border-[#D8CDBB] bg-[#F4EFE5] p-6 sm:p-10 lg:p-12 shadow-sm">
        {/* Top Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#D8CDBB] pb-6">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-[#183D2B] px-3.5 py-1 font-mono text-xs font-bold text-[#FFFDF8]">
              PROJECT {featuredProject.number}
            </span>
            <span className="font-mono text-xs uppercase tracking-wider text-[#777064]">
              {featuredProject.category}
            </span>
          </div>

          <a
            href={featuredProject.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#D8CDBB] bg-[#FFFDF8] px-4 py-2 font-sans text-xs font-semibold text-[#191919] hover:bg-[#183D2B] hover:text-[#FFFDF8] hover:border-[#183D2B] transition-colors shadow-xs"
          >
            <GithubIcon className="h-4 w-4" />
            <span>GitHub Repository</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Oversized CONCEPTBRIDGE AI Typography */}
        <div className="mt-8">
          <h3 className="font-serif text-3xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-[#191919] leading-[0.95]">
            CONCEPTBRIDGE{" "}
            <span className="text-[#183D2B]">
              AI
            </span>
          </h3>
          <p className="mt-2 font-sans text-sm sm:text-base font-semibold text-[#183D2B]">
            {featuredProject.headline}
          </p>
        </div>

        {/* Project Overview & Tech Stack */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-t border-[#D8CDBB] pt-6">
          <div className="lg:col-span-8">
            <p className="font-sans text-sm sm:text-base leading-relaxed text-[#191919]">
              {featuredProject.description}
            </p>
          </div>

          <div className="lg:col-span-4 space-y-2">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#777064] block font-bold">
              TECHNOLOGY STACK
            </span>
            <div className="flex flex-wrap gap-1.5">
              {featuredProject.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-[#D8CDBB] bg-[#FFFDF8] px-2.5 py-1 font-mono text-[11px] text-[#191919]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Large Project Preview & Interactive Simulator Shell */}
        <div className="mt-10 rounded-2xl border border-[#D8CDBB] bg-[#FFFDF8] shadow-sm overflow-hidden">
          {/* Shell Top Bar with Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#D8CDBB] bg-[#F4EFE5] px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#183D2B]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#D8CDBB]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#E5F1DF]" />
              <span className="ml-2 font-mono text-xs font-semibold text-[#191919]">
                conceptbridge.simulator
              </span>
            </div>

            {/* Simulator Tabs */}
            <div className="flex items-center gap-1.5">
              {[
                { id: "editor", label: "In-Browser Editor" },
                { id: "diagnostic", label: "Concept Gap Diagnostics" },
                { id: "mastery", label: "EMA Mastery Radar" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-full px-3 py-1 font-sans text-xs transition-colors ${
                    activeTab === tab.id
                      ? "bg-[#183D2B] text-[#FFFDF8] font-semibold"
                      : "text-[#777064] hover:text-[#191919]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Tab Viewport */}
          <div className="p-5 sm:p-7 bg-[#242820] text-[#FFFDF8] font-mono">
            {activeTab === "editor" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#FFFDF8]/15 pb-2 text-xs text-[#FFFDF8]/70">
                  <div className="flex items-center gap-2">
                    <CodeIcon className="h-4 w-4 text-[#E5F1DF]" />
                    <span className="text-[#FFFDF8] font-bold">
                      challenge_thread_pool.py
                    </span>
                    <span className="text-[10px] bg-[#183D2B] text-[#FFFDF8] px-1.5 py-0.5 rounded">
                      Python 3.12
                    </span>
                  </div>
                  <span>Syntax Check: PASS | Line Count: 28</span>
                </div>

                {/* Simulated in-browser code editor */}
                <div className="text-xs sm:text-sm font-mono leading-relaxed space-y-1">
                  <div className="flex gap-4 text-[#FFFDF8]/40">
                    <span className="w-6 select-none text-right">01</span>
                    <span className="text-[#FFFDF8]">
                      <span className="text-[#E5F1DF] font-bold">import</span> asyncio
                    </span>
                  </div>
                  <div className="flex gap-4 text-[#FFFDF8]/40">
                    <span className="w-6 select-none text-right">02</span>
                    <span className="text-[#FFFDF8]">
                      <span className="text-[#E5F1DF] font-bold">from</span> typing{" "}
                      <span className="text-[#E5F1DF] font-bold">import</span> List, Callable
                    </span>
                  </div>
                  <div className="flex gap-4 text-[#FFFDF8]/40">
                    <span className="w-6 select-none text-right">03</span>
                    <span className="text-[#FFFDF8]">
                      <span className="text-[#E5F1DF] font-bold">class</span> TaskQueue:
                    </span>
                  </div>
                  <div className="flex gap-4 text-[#FFFDF8]/40">
                    <span className="w-6 select-none text-right">04</span>
                    <span className="text-[#FFFDF8]">
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <span className="text-[#E5F1DF] font-bold">def</span> __init__(self, concurrency: int = 5):
                    </span>
                  </div>
                  <div className="flex gap-4 text-[#FFFDF8]/40">
                    <span className="w-6 select-none text-right">05</span>
                    <span className="text-[#FFFDF8]">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.semaphore = asyncio.Semaphore(concurrency)
                    </span>
                  </div>
                  <div className="flex gap-4 text-[#FFFDF8]/40 bg-[#183D2B]/50 py-0.5 -mx-2 px-2 border-l-2 border-[#E5F1DF]">
                    <span className="w-6 select-none text-right text-[#E5F1DF]">06</span>
                    <span className="text-[#FFFDF8]">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self._queue: List[dict] = []{" "}
                      <span className="text-[#E5F1DF] italic"># [Evaluator Flag: Concurrency Lock Required]</span>
                    </span>
                  </div>
                </div>

                <div className="mt-4 border-t border-[#FFFDF8]/15 pt-3 flex items-center justify-between text-xs text-[#FFFDF8]/70">
                  <span>Custom in-browser editor with dynamic line numbering &amp; indentation</span>
                  <span className="text-[#E5F1DF]">FastAPI Evaluation Ready</span>
                </div>
              </div>
            )}

            {activeTab === "diagnostic" && (
              <div className="space-y-4">
                <div className="rounded-xl border border-[#183D2B] bg-[#183D2B]/40 p-4">
                  <div className="flex items-center justify-between text-xs uppercase text-[#E5F1DF] font-bold mb-1">
                    <span>Intelligent Conceptual Gap Detection</span>
                    <span>Confidence: 96%</span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-[#FFFDF8]">
                    Misunderstanding: Mutex Synchronization vs. Semaphore Throttling
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-[#FFFDF8]/80 font-sans">
                    The student understood rate throttling using Semaphore, but failed to protect mutating shared state with an asyncio.Lock. OpenAI diagnostic model + static AST rules successfully flagged this conceptual edge case.
                  </p>
                </div>

                <div className="rounded-lg border border-[#FFFDF8]/20 bg-[#FFFDF8]/5 p-3 text-xs">
                  <span className="text-[#E5F1DF] font-bold block mb-1">
                    [PERSONALIZED FOLLOW-UP EXERCISE GENERATED]
                  </span>
                  <p className="font-sans text-[#FFFDF8]/80">
                    Exercise #07B: Implement an asynchronous worker pool with a thread-safe mutex protecting buffer operations during rapid batch insertions.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "mastery" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs border-b border-[#FFFDF8]/15 pb-2">
                  <span className="font-bold text-[#FFFDF8]">
                    Exponential Moving Average (EMA) Mastery Curve
                  </span>
                  <span className="text-[#E5F1DF]">α = 0.35 Smoothing Factor</span>
                </div>

                {/* SVG Visual Mastery Chart */}
                <div className="relative h-28 w-full border border-[#FFFDF8]/15 bg-[#FFFDF8]/5 p-2 rounded-lg">
                  <svg className="w-full h-full" viewBox="0 0 500 100" preserveAspectRatio="none">
                    <line x1="0" y1="25" x2="500" y2="25" stroke="#FFFDF8" strokeOpacity="0.1" strokeDasharray="3 3" />
                    <line x1="0" y1="50" x2="500" y2="50" stroke="#FFFDF8" strokeOpacity="0.1" strokeDasharray="3 3" />
                    <line x1="0" y1="75" x2="500" y2="75" stroke="#FFFDF8" strokeOpacity="0.1" strokeDasharray="3 3" />

                    <path
                      d="M 10 85 Q 90 70, 160 55 T 280 40 T 400 22 T 490 15"
                      fill="none"
                      stroke="#E5F1DF"
                      strokeWidth="2.5"
                    />

                    <circle cx="10" cy="85" r="3.5" fill="#FFFDF8" />
                    <circle cx="160" cy="55" r="3.5" fill="#FFFDF8" />
                    <circle cx="280" cy="40" r="3.5" fill="#FFFDF8" />
                    <circle cx="400" cy="22" r="3.5" fill="#FFFDF8" />
                    <circle cx="490" cy="15" r="4.5" fill="#183D2B" stroke="#E5F1DF" strokeWidth="1.5" />
                  </svg>
                  <div className="absolute bottom-2 right-4 text-[10px] text-[#FFFDF8]/60 font-sans">
                    Calculated Mastery: 88.5% (Asynchronous Programming)
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                  <div className="border border-[#FFFDF8]/15 p-2 rounded">
                    <span className="block text-[10px] text-[#FFFDF8]/50 uppercase">Framework</span>
                    <span className="font-bold text-[#FFFDF8]">React 19 + Vite</span>
                  </div>
                  <div className="border border-[#FFFDF8]/15 p-2 rounded">
                    <span className="block text-[10px] text-[#FFFDF8]/50 uppercase">Backend</span>
                    <span className="font-bold text-[#FFFDF8]">FastAPI (Python)</span>
                  </div>
                  <div className="border border-[#FFFDF8]/15 p-2 rounded">
                    <span className="block text-[10px] text-[#FFFDF8]/50 uppercase">ORM</span>
                    <span className="font-bold text-[#FFFDF8]">SQLAlchemy</span>
                  </div>
                  <div className="border border-[#FFFDF8]/15 p-2 rounded">
                    <span className="block text-[10px] text-[#FFFDF8]/50 uppercase">Test Suite</span>
                    <span className="font-bold text-[#FFFDF8]">PyTest Automated</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* =========================================================================
            TWO SEPARATE TECHNICAL CONTRIBUTION SECTIONS (Exact Required Lists)
            ========================================================================= */}
        <div className="mt-12">
          <div className="border-b border-[#D8CDBB] pb-4 mb-8">
            <span className="font-mono text-xs uppercase tracking-widest text-[#183D2B] font-bold block">
              DETAILED TECHNICAL RESPONSIBILITIES
            </span>
            <h4 className="font-serif text-2xl sm:text-3xl font-bold uppercase text-[#191919]">
              Frontend &amp; Python Backend Contributions
            </h4>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* 1. FRONTEND DEVELOPER CONTRIBUTION */}
            <div className="rounded-2xl border border-[#D8CDBB] bg-[#FFFDF8] p-6 sm:p-8 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-[#D8CDBB]/60 pb-3">
                  <div className="flex items-center gap-2">
                    <CodeIcon className="h-5 w-5 text-[#183D2B]" />
                    <h5 className="font-serif text-lg font-bold uppercase text-[#191919]">
                      FRONTEND DEVELOPER CONTRIBUTION
                    </h5>
                  </div>
                  <span className="rounded-full bg-[#E5F1DF] text-[#183D2B] font-mono text-[10px] font-bold px-2.5 py-0.5">
                    REACT 19
                  </span>
                </div>

                <ul className="mt-5 space-y-2.5 font-sans text-xs sm:text-sm text-[#191919]">
                  {featuredProject.frontendContributions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-[#183D2B] text-[#FFFDF8] text-[9px] font-bold">
                        ✓
                      </span>
                      <span className="text-[#191919]/90 leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 border-t border-[#D8CDBB]/50 pt-3 flex items-center justify-between text-xs text-[#777064] font-mono">
                <span>Vite · Axios · SVG Engine</span>
                <span className="font-bold text-[#183D2B]">React 19 Architecture</span>
              </div>
            </div>

            {/* 2. PYTHON BACKEND DEVELOPER CONTRIBUTION */}
            <div className="rounded-2xl border border-[#D8CDBB] bg-[#FFFDF8] p-6 sm:p-8 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-[#D8CDBB]/60 pb-3">
                  <div className="flex items-center gap-2">
                    <CodeIcon className="h-5 w-5 text-[#183D2B]" />
                    <h5 className="font-serif text-lg font-bold uppercase text-[#191919]">
                      PYTHON BACKEND DEVELOPER CONTRIBUTION
                    </h5>
                  </div>
                  <span className="rounded-full bg-[#E5F1DF] text-[#183D2B] font-mono text-[10px] font-bold px-2.5 py-0.5">
                    FASTAPI
                  </span>
                </div>

                <ul className="mt-5 space-y-2.5 font-sans text-xs sm:text-sm text-[#191919]">
                  {featuredProject.backendContributions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-[#183D2B] text-[#FFFDF8] text-[9px] font-bold">
                        ✓
                      </span>
                      <span className="text-[#191919]/90 leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 border-t border-[#D8CDBB]/50 pt-3 flex items-center justify-between text-xs text-[#777064] font-mono">
                <span>FastAPI · SQLAlchemy · PyTest</span>
                <span className="font-bold text-[#183D2B]">Python 3.12 Core</span>
              </div>
            </div>
          </div>
        </div>

        {/* Explore Project Action Footer */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[#D8CDBB] pt-6">
          <div className="flex items-center gap-2 font-sans text-xs text-[#777064]">
            <span className="h-2 w-2 rounded-full bg-[#183D2B]" />
            <span>Open Source Repository · Code and documentation publicly available</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowArchSpec(!showArchSpec)}
              className="rounded-full border border-[#D8CDBB] bg-[#FFFDF8] px-4 py-2 font-sans text-xs font-semibold text-[#191919] hover:bg-[#F4EFE5] transition-colors"
            >
              <span>{showArchSpec ? "Hide Architecture Spec" : "Explore Architecture Spec"}</span>
              <span className="ml-1 text-[#183D2B]">{showArchSpec ? "▲" : "▼"}</span>
            </button>

            <a
              href={featuredProject.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#183D2B] px-5 py-2 font-sans text-xs font-semibold text-[#FFFDF8] hover:bg-[#122e20] shadow-xs pill-btn transition-colors"
            >
              <GithubIcon className="h-4 w-4" />
              <span>Explore on GitHub</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Expandable Spec Drawer */}
        <AnimatePresence>
          {showArchSpec && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 rounded-2xl border border-[#D8CDBB] bg-[#FFFDF8] p-6 overflow-hidden"
            >
              <div className="font-mono text-xs font-bold text-[#183D2B] uppercase mb-3">
                SYSTEM TOPOLOGY SPECIFICATION
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans text-[#777064]">
                <div className="p-3.5 rounded-xl border border-[#D8CDBB] bg-[#F4EFE5]">
                  <span className="font-bold text-[#191919] block mb-1">01. INGESTION &amp; TOKENIZATION</span>
                  <p>In-browser code editor tokenizes code client-side, passes payloads over Axios with JWT headers to FastAPI.</p>
                </div>
                <div className="p-3.5 rounded-xl border border-[#D8CDBB] bg-[#F4EFE5]">
                  <span className="font-bold text-[#191919] block mb-1">02. DUAL-PASS EVALUATION</span>
                  <p>OpenAI evaluation evaluates conceptual correctness. Deterministic fallback engine runs if rate-limits occur.</p>
                </div>
                <div className="p-3.5 rounded-xl border border-[#D8CDBB] bg-[#F4EFE5]">
                  <span className="font-bold text-[#191919] block mb-1">03. EMA MASTERY PERSISTENCE</span>
                  <p>Calculates Exponential Moving Average mastery per concept and persists state via SQLAlchemy into PostgreSQL/SQLite.</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* =========================================================================
          PRESERVED GENUINE SECONDARY PROJECTS (ProofOfWork AI & Client Platforms)
          ========================================================================= */}
      <div className="mt-14 space-y-8">
        <h3 className="font-serif text-xl sm:text-2xl font-bold uppercase text-[#191919] border-b border-[#D8CDBB] pb-3">
          Additional Selected Projects
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {secondaryProjects.map((proj) => (
            <div
              key={proj.id}
              className="rounded-2xl border border-[#D8CDBB] bg-[#F4EFE5] p-6 sm:p-8 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-[#D8CDBB] pb-3 font-mono text-xs text-[#777064]">
                  <span className="font-bold text-[#183D2B]">PROJECT {proj.number}</span>
                  <span>{proj.badge}</span>
                </div>

                <h4 className="mt-4 font-serif text-xl sm:text-2xl font-bold text-[#191919]">
                  {proj.name}
                </h4>

                <p className="mt-1 font-sans text-xs font-semibold text-[#183D2B]">
                  {proj.headline}
                </p>

                <p className="mt-3 font-sans text-xs sm:text-sm text-[#777064] leading-relaxed">
                  {proj.description}
                </p>

                <ul className="mt-4 space-y-1.5 font-sans text-xs text-[#191919]">
                  {proj.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#183D2B] font-bold">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
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
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#183D2B] hover:underline"
                >
                  <span>Code</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
