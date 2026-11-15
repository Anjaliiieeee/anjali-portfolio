import { motion } from "framer-motion";
import { profile } from "../data/content";
import { Section } from "./Section";
import { StarIcon, CodeIcon } from "./Icons";

export default function About() {
  return (
    <Section id="about" background="bg-[#FFFDF8]">
      {/* Top Eyebrow */}
      <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-[#777064] mb-4">
        <span className="font-bold text-[#183D2B]">02</span>
        <span className="text-[#D8CDBB]">/</span>
        <span>BACKGROUND &amp; PRACTICE</span>
      </div>

      {/* Main Section Heading: A LITTLE ABOUT ME. (Cinzel Font) */}
      <div className="border-b border-[#D8CDBB] pb-6 mb-12">
        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-[#191919]">
          {profile.aboutHeading}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Dossier Card & Photo Frame */}
        <div className="lg:col-span-4 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-[#D8CDBB] bg-[#F4EFE5] p-6 shadow-sm"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#D8CDBB] pb-3 text-xs font-mono text-[#777064]">
              <span>PROFILE OVERVIEW</span>
              <span className="font-bold text-[#183D2B]">● ACTIVE</span>
            </div>

            {/* Profile snapshot */}
            <div className="mt-5 flex items-center gap-4">
              <div className="relative shrink-0 w-20 h-20 rounded-2xl overflow-hidden border border-[#D8CDBB] bg-[#E9DDC9]">
                <img
                  src="/profile.jpeg"
                  alt="Anjali Singh"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div>
                <h3 className="font-serif text-lg font-bold uppercase text-[#191919]">
                  {profile.name}
                </h3>
                <p className="font-sans text-xs font-semibold text-[#183D2B]">
                  Services Software Engineer
                </p>
                <p className="font-mono text-[11px] text-[#777064]">
                  {profile.company}
                </p>
              </div>
            </div>

            {/* Key Metadata */}
            <div className="mt-6 space-y-3 font-sans text-xs border-t border-[#D8CDBB] pt-4">
              <div className="flex justify-between">
                <span className="text-[#777064]">Location:</span>
                <span className="font-medium text-[#191919]">{profile.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#777064]">Specialization:</span>
                <span className="font-medium text-[#183D2B]">Frontend + Python + Java</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#777064]">Current Role:</span>
                <span className="font-medium text-[#191919]">Full-Time Engineer</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Exact Three Paragraphs & Specialization Pillars */}
        <div className="lg:col-span-8 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="space-y-5 font-sans text-base sm:text-lg text-[#191919] leading-relaxed"
          >
            {profile.aboutParagraphs.map((para, i) => (
              <p
                key={i}
                className={i === 0 ? "font-medium text-[#183D2B] text-lg sm:text-xl" : "text-[#777064]"}
              >
                {para}
              </p>
            ))}
          </motion.div>

          {/* Specialization Cards (Frontend, Python, Java) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="rounded-xl border border-[#D8CDBB] bg-[#F4EFE5] p-5 shadow-xs">
              <span className="font-mono text-[10px] text-[#183D2B] font-bold block mb-1">
                DOMAIN 01
              </span>
              <h4 className="font-serif text-base font-bold text-[#191919]">
                Frontend Engineering
              </h4>
              <p className="mt-2 text-xs text-[#777064] leading-relaxed">
                React 19, TypeScript, responsive layouts, interactive SVG charts, and custom component design.
              </p>
            </div>

            <div className="rounded-xl border border-[#D8CDBB] bg-[#F4EFE5] p-5 shadow-xs">
              <span className="font-mono text-[10px] text-[#183D2B] font-bold block mb-1">
                DOMAIN 02
              </span>
              <h4 className="font-serif text-base font-bold text-[#191919]">
                Python Services &amp; APIs
              </h4>
              <p className="mt-2 text-xs text-[#777064] leading-relaxed">
                FastAPI, asynchronous endpoints, SQLAlchemy, OpenAI integration, and deterministic evaluation engines.
              </p>
            </div>

            <div className="rounded-xl border border-[#D8CDBB] bg-[#F4EFE5] p-5 shadow-xs">
              <span className="font-mono text-[10px] text-[#183D2B] font-bold block mb-1">
                DOMAIN 03
              </span>
              <h4 className="font-serif text-base font-bold text-[#191919]">
                Java &amp; Client Services
              </h4>
              <p className="mt-2 text-xs text-[#777064] leading-relaxed">
                Java, Spring Boot microservices, relational databases, WordPress platforms, and GA4 telemetry.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
