import { motion } from "framer-motion";
import { educationData } from "../data/content";
import { Section } from "./Section";

export default function Education() {
  return (
    <Section id="education" background="bg-[#FFFDF8]">
      {/* Top Eyebrow */}
      <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-[#777064] mb-4">
        <span className="font-bold text-[#183D2B]">06</span>
        <span className="text-[#D8CDBB]">/</span>
        <span>ACADEMIC BACKGROUND</span>
      </div>

      {/* Main Section Heading */}
      <div className="border-b border-[#D8CDBB] pb-6 mb-12">
        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-[#191919]">
          EDUCATION
        </h2>
        <p className="mt-3 font-sans text-sm sm:text-base text-[#777064] max-w-xl">
          Formal computer applications degrees and academic qualifications in Pune, India.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {educationData.map((edu, idx) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: idx * 0.1 }}
            className="rounded-2xl border border-[#D8CDBB] bg-[#F4EFE5] p-6 sm:p-8 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between border-b border-[#D8CDBB] pb-3 text-xs font-mono text-[#777064]">
                <span>DEGREE {idx + 1}</span>
                <span className="font-bold text-[#183D2B]">{edu.period}</span>
              </div>

              <h3 className="mt-4 font-serif text-xl font-bold text-[#191919]">
                {edu.degree}
              </h3>

              <p className="mt-1 font-sans text-xs text-[#777064]">
                {edu.institution} · {edu.location}
              </p>

              <div className="mt-4 inline-block rounded-md bg-[#FFFDF8] border border-[#D8CDBB] px-3 py-1 font-mono text-xs font-semibold text-[#183D2B]">
                Aggregate: {edu.score}
              </div>

              <p className="mt-4 font-sans text-xs sm:text-sm text-[#191919]/80 leading-relaxed">
                {edu.details}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
