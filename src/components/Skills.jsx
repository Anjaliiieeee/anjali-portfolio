import { useState, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { technicalSkillsCategories } from "../data/content";
import { Section } from "./Section";
import { SearchIcon } from "./Icons";

const EASE = [0.22, 0.75, 0.25, 1];
const FILTERS = ["ALL", "FRONTEND", "PYTHON", "JAVA", "DATABASES", "CLOUD"];

const labelFor = (f, total) =>
  f === "ALL" ? `All (${total})` : f.charAt(0) + f.slice(1).toLowerCase();

export default function Skills() {
  const reduce = useReducedMotion();
  const d = reduce ? 0 : 1;

  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("ALL");

  // Filter skills based on search query / quick filter (logic unchanged)
  const filteredCategories = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) {
      if (activeFilter === "ALL") return technicalSkillsCategories;
      return technicalSkillsCategories.filter((c) =>
        c.category.toLowerCase().includes(activeFilter.toLowerCase())
      );
    }
    return technicalSkillsCategories
      .map((cat) => {
        const matchesCategory = cat.category.toLowerCase().includes(q);
        const matchingSkills = cat.skills.filter((s) => s.toLowerCase().includes(q));
        if (matchesCategory || matchingSkills.length > 0) {
          return { ...cat, highlightSkills: matchingSkills };
        }
        return null;
      })
      .filter(Boolean);
  }, [searchQuery, activeFilter]);

  const totalSkillCount = useMemo(
    () => technicalSkillsCategories.reduce((acc, c) => acc + c.skills.length, 0),
    []
  );

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
    show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 280, damping: 20 } },
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
    hidden: { opacity: 0, y: 24 * d },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: EASE,
        staggerChildren: reduce ? 0 : 0.03,
        delayChildren: reduce ? 0 : 0.15,
      },
    },
  };

  // Glow that follows the pointer inside a card
  const spotlight = (e) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const q = searchQuery.trim();

  return (
    <Section id="skills" background="bg-[#F4EFE5]">
      {/* Heading + search */}
      <motion.div
        variants={stagger(0.12)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6">
          <div>
            <div className="overflow-hidden pb-1">
              <motion.h2
                variants={maskUp}
                className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-[#191919]"
              >
                Technical skills
              </motion.h2>
            </div>
            <motion.p
              variants={fadeUp}
              className="mt-3 font-sans text-sm sm:text-base text-[#5E584C] max-w-xl"
            >
              {technicalSkillsCategories.length} areas, from frontend and Python APIs to Java services, databases, cloud tooling and generative AI.
            </motion.p>
          </div>

          {/* Search */}
          <motion.div variants={fadeUp} className="w-full sm:w-72 relative">
            <div className="relative flex items-center">
              <SearchIcon className="absolute left-3.5 h-4 w-4 text-[#5E584C]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search technologies..."
                aria-label="Search technologies"
                className="w-full rounded-full border border-[#D8CDBB] bg-[#FFFDF8] py-2.5 pl-10 pr-9 font-sans text-sm text-[#191919] outline-none transition-shadow focus:border-[#183D2B] focus:shadow-[0_0_0_4px_rgba(24,61,43,0.12)] shadow-xs"
              />
              <AnimatePresence>
                {searchQuery && (
                  <motion.button
                    type="button"
                    aria-label="Clear search"
                    initial={{ opacity: 0, scale: reduce ? 1 : 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: reduce ? 1 : 0.5 }}
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 grid h-5 w-5 place-items-center rounded-full text-xs text-[#5E584C] hover:bg-[#E5F1DF] hover:text-[#191919] focus-visible:outline-2 focus-visible:outline-[#183D2B]"
                  >
                    ✕
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
        <motion.div variants={drawX} style={{ originX: 0 }} className="h-px w-full bg-[#D8CDBB]" />
      </motion.div>

      {/* Quick filters: green pill slides to the selected one */}
      <motion.div
        variants={stagger(0.06, 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        className="mb-4 flex flex-wrap gap-1.5 sm:gap-2"
        role="group"
        aria-label="Filter skills by area"
      >
        {FILTERS.map((filter) => {
          const active = activeFilter === filter && !searchQuery;
          return (
            <motion.button
              key={filter}
              variants={pop}
              whileTap={reduce ? undefined : { scale: 0.94 }}
              type="button"
              aria-pressed={active}
              onClick={() => {
                setActiveFilter(filter);
                setSearchQuery("");
              }}
              className={`relative rounded-full px-3.5 py-1.5 font-sans text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183D2B] ${
                active
                  ? "text-[#FFFDF8]"
                  : "border border-[#D8CDBB] bg-[#FFFDF8] text-[#5E584C] hover:text-[#191919] hover:border-[#183D2B]/60"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="skillFilterPill"
                  transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 30 }}
                  className="absolute inset-0 rounded-full bg-[#183D2B]"
                />
              )}
              <span className="relative z-10">{labelFor(filter, totalSkillCount)}</span>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Live result count */}
      <p aria-live="polite" className="mb-6 font-sans text-xs text-[#5E584C]">
        Showing {filteredCategories.length} of {technicalSkillsCategories.length} areas
        {q ? ` for “${q}”` : ""}
      </p>

      {/* Cards: reorder smoothly when filtering */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
        <AnimatePresence mode="popLayout">
          {filteredCategories.map((cat) => (
            <motion.div
              key={cat.number}
              layout={!reduce}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              exit={{ opacity: 0, scale: reduce ? 1 : 0.95, transition: { duration: 0.2 } }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ layout: { duration: 0.4, ease: EASE } }}
              whileHover={reduce ? undefined : { y: -4 }}
              onPointerMove={spotlight}
              className="group relative overflow-hidden rounded-2xl border border-[#D8CDBB] bg-[#FFFDF8] p-6 shadow-xs transition-[border-color,box-shadow] duration-300 hover:border-[#183D2B]/50 hover:shadow-lg"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(280px_circle_at_var(--mx,50%)_var(--my,50%),rgba(229,241,223,0.8),transparent_70%)]"
              />

              <div className="relative">
                {/* Category header */}
                <motion.div
                  variants={fadeUp}
                  className="flex items-center justify-between gap-3 border-b border-[#D8CDBB]/50 pb-3"
                >
                  <h3 className="font-sans text-sm font-bold text-[#191919]">{cat.category}</h3>
                  <span className="shrink-0 rounded-full bg-[#E5F1DF] px-2.5 py-0.5 font-sans text-[11px] font-semibold text-[#183D2B]">
                    {cat.skills.length} {cat.skills.length === 1 ? "item" : "items"}
                  </span>
                </motion.div>

                {cat.note && (
                  <motion.p
                    variants={fadeUp}
                    className="mt-3 text-xs text-[#183D2B] italic bg-[#E5F1DF]/50 p-2.5 rounded-lg border border-[#D8CDBB]/50"
                  >
                    “{cat.note}”
                  </motion.p>
                )}

                {/* Skill pills pop in one after another */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {cat.skills.map((skill) => {
                    const isMatch = q && skill.toLowerCase().includes(q.toLowerCase());
                    return (
                      <motion.span
                        key={skill}
                        variants={pop}
                        whileHover={reduce ? undefined : { y: -2, scale: 1.04 }}
                        className={`rounded-lg px-3 py-1 font-sans text-xs transition-colors cursor-default ${
                          isMatch
                            ? "bg-[#183D2B] text-[#FFFDF8] font-bold"
                            : "border border-[#D8CDBB] bg-[#F4EFE5]/70 text-[#191919] hover:border-[#183D2B] hover:bg-[#FFFDF8]"
                        }`}
                      >
                        {skill}
                      </motion.span>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty state */}
      <AnimatePresence>
        {filteredCategories.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 * d }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center py-12 text-[#5E584C] font-sans"
          >
            No skills found matching “{searchQuery}”.
            <div className="mt-3">
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="rounded-full bg-[#183D2B] px-4 py-2 text-xs font-semibold text-[#FFFDF8] hover:bg-[#122e20] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183D2B]"
              >
                Clear search
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}