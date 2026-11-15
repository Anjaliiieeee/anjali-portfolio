import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { technicalSkillsCategories } from "../data/content";
import { Section } from "./Section";
import { SearchIcon } from "./Icons";

export default function Skills() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("ALL");

  // Filter skills based on search query
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
          return {
            ...cat,
            highlightSkills: matchingSkills,
          };
        }
        return null;
      })
      .filter(Boolean);
  }, [searchQuery, activeFilter]);

  const totalSkillCount = useMemo(() => {
    return technicalSkillsCategories.reduce((acc, c) => acc + c.skills.length, 0);
  }, []);

  return (
    <Section id="skills" background="bg-[#F4EFE5]">
      {/* Top Eyebrow */}
      <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-[#777064] mb-4">
        <span className="font-bold text-[#183D2B]">04</span>
        <span className="text-[#D8CDBB]">/</span>
        <span>TECHNICAL DIRECTORY</span>
      </div>

      {/* Main Section Heading: TECHNICAL SKILLS (Cinzel Font) */}
      <div className="border-b border-[#D8CDBB] pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-[#191919]">
            TECHNICAL SKILLS
          </h2>
          <p className="mt-3 font-sans text-sm sm:text-base text-[#777064] max-w-xl">
            Comprehensive catalog across 14 specialized domains: Frontend, Python &amp; APIs, Java services, databases, cloud tooling, and generative AI.
          </p>
        </div>

        {/* Search Input Box */}
        <div className="w-full sm:w-72 relative">
          <div className="relative flex items-center">
            <SearchIcon className="absolute left-3.5 h-4 w-4 text-[#777064]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search technologies..."
              className="w-full rounded-full border border-[#D8CDBB] bg-[#FFFDF8] py-2.5 pl-10 pr-4 font-sans text-xs text-[#191919] outline-none focus:border-[#183D2B] shadow-xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 text-xs text-[#777064] hover:text-[#191919]"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Domain Quick Filters */}
      <div className="mb-8 flex flex-wrap gap-1.5 sm:gap-2">
        {["ALL", "FRONTEND", "PYTHON", "JAVA", "DATABASES", "CLOUD"].map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => {
              setActiveFilter(filter);
              setSearchQuery("");
            }}
            className={`rounded-full px-3 py-1 font-sans text-[11px] font-medium transition-all ${
              activeFilter === filter && !searchQuery
                ? "bg-[#183D2B] text-[#FFFDF8]"
                : "border border-[#D8CDBB] bg-[#FFFDF8] text-[#777064] hover:text-[#191919]"
            }`}
          >
            {filter === "ALL" ? `All (${totalSkillCount})` : filter}
          </button>
        ))}
      </div>

      {/* Two-Column Desktop Layout / Single-Column Mobile Directory */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
        {filteredCategories.map((cat, idx) => (
          <motion.div
            key={cat.number}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.4, delay: (idx % 2) * 0.08 }}
            className="rounded-2xl border border-[#D8CDBB] bg-[#FFFDF8] p-6 shadow-xs hover:border-[#183D2B]/50 transition-colors"
          >
            {/* Category Header */}
            <div className="flex items-center justify-between border-b border-[#D8CDBB]/50 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs font-bold text-[#183D2B] bg-[#E5F1DF] px-2 py-0.5 rounded-md">
                  CATEGORY {cat.number}
                </span>
                <h3 className="font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-[#191919]">
                  {cat.category}
                </h3>
              </div>
              <span className="font-mono text-[10px] text-[#777064]">
                {cat.skills.length} Items
              </span>
            </div>

            {/* Note if applicable (e.g. Category 12) */}
            {cat.note && (
              <p className="mt-3 text-xs text-[#183D2B] italic bg-[#E5F1DF]/50 p-2.5 rounded-lg border border-[#D8CDBB]/50">
                "{cat.note}"
              </p>
            )}

            {/* Compact Skills Pills */}
            <div className="mt-4 flex flex-wrap gap-2">
              {cat.skills.map((skill) => {
                const isMatch =
                  searchQuery &&
                  skill.toLowerCase().includes(searchQuery.toLowerCase());
                return (
                  <span
                    key={skill}
                    className={`rounded-lg px-3 py-1 font-sans text-xs transition-colors ${
                      isMatch
                        ? "bg-[#183D2B] text-[#FFFDF8] font-bold"
                        : "border border-[#D8CDBB] bg-[#F4EFE5]/70 text-[#191919] hover:border-[#183D2B] hover:bg-[#FFFDF8]"
                    }`}
                  >
                    {skill}
                  </span>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-12 text-[#777064] font-sans">
          No skills found matching "{searchQuery}". Clear your search to view all categories.
        </div>
      )}
    </Section>
  );
}
