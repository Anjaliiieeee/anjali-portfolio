import { motion } from "framer-motion";
import { experienceData, profile } from "../data/content";
import { Section } from "./Section";

export default function Experience() {
  return (
    <Section id="experience" background="bg-[#F4EFE5]">
      {/* Top Eyebrow */}
      <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-[#777064] mb-4">
        <span className="font-bold text-[#183D2B]">05</span>
        <span className="text-[#D8CDBB]">/</span>
        <span>CAREER TIMELINE</span>
      </div>

      {/* Main Section Heading */}
      <div className="border-b border-[#D8CDBB] pb-6 mb-12">
        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-[#191919]">
          PROFESSIONAL EXPERIENCE
        </h2>
        <p className="mt-3 font-sans text-sm sm:text-base text-[#777064] max-w-xl">
          Factual career timeline at {experienceData.company} in {experienceData.location}.
        </p>
      </div>

      {/* Timeline Container */}
      <div className="rounded-3xl border border-[#D8CDBB] bg-[#FFFDF8] p-6 sm:p-10 lg:p-12 shadow-sm space-y-10">
        {/* Company Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D8CDBB] pb-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-[#183D2B] font-bold block mb-1">
              CURRENT EMPLOYER
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#191919]">
              {experienceData.company}
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#777064] mt-0.5">
              {experienceData.location} · Services Software Engineer
            </p>
          </div>

          <span className="rounded-full bg-[#E5F1DF] text-[#183D2B] px-3.5 py-1 text-xs font-semibold font-mono self-start sm:self-auto">
            June 2024 – Present (Full-Time)
          </span>
        </div>

        {/* Timeline Milestones */}
        <div className="space-y-8">
          {experienceData.timeline.map((item, idx) => (
            <motion.div
              key={item.period}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative pl-6 sm:pl-8 border-l-2 border-[#183D2B] space-y-3"
            >
              {/* Dot Marker */}
              <span className="absolute -left-[7px] top-1 h-3 w-3 rounded-full border-2 border-[#FFFDF8] bg-[#183D2B]" />

              <div className="flex flex-wrap items-baseline gap-2">
                <span className="font-mono text-xs font-bold text-[#183D2B]">
                  {item.period}
                </span>
                <span className="text-[#D8CDBB]">/</span>
                <h4 className="font-serif text-lg font-bold text-[#191919]">
                  {item.role}
                </h4>
              </div>

              <ul className="space-y-2 font-sans text-xs sm:text-sm text-[#777064]">
                {item.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-[#183D2B] font-bold mt-0.5">•</span>
                    <span className="leading-relaxed text-[#191919]/90">{pt}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
