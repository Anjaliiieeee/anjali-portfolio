import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { heroRoles } from "../data/content";

export default function RoleCalendarSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  const totalRoles = heroRoles.length;
  const currentRole = heroRoles[currentIndex];

  // Auto-advance only when motion is allowed and the person is not interacting.
  useEffect(() => {
    if (totalRoles <= 1 || paused || reduceMotion) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalRoles);
    }, 5000);

    return () => clearInterval(timer);
  }, [totalRoles, paused, reduceMotion]);

  if (!currentRole) return null;

  // Flip animation normally; plain fade when reduced motion is on.
  const variants = reduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.2 } },
        exit: { opacity: 0, transition: { duration: 0.15 } },
      }
    : {
        initial: { rotateX: -90, opacity: 0 },
        animate: {
          rotateX: 0,
          opacity: 1,
          transition: { duration: 0.45, ease: [0.22, 0.75, 0.25, 1] },
        },
        exit: {
          rotateX: 90,
          opacity: 0,
          transition: { duration: 0.35, ease: [0.65, 0, 0.35, 1] },
        },
      };

  return (
    <div
      className="relative mx-auto w-full max-w-md"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative pt-3" style={{ perspective: "1600px" }}>
        {/* Fixed calendar rings */}
        <div className="absolute -top-1 left-0 right-0 z-30 flex justify-center gap-7 sm:gap-9 pointer-events-none">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-2.5 h-6 rounded-full bg-gradient-to-b from-[#8C7E68] via-[#E2D8C7] to-[#7A6C56] shadow-sm border border-[#6E604B]" />
              <div className="-mt-1.5 w-3 h-1.5 rounded-full bg-[#191919]/15" />
            </div>
          ))}
        </div>

        {/* Paper stack */}
        <div className="relative">
          <div className="absolute inset-0 translate-y-2 rounded-2xl border border-[#D8CDBB] bg-[#E9DDC9] shadow-md" />
          <div className="absolute inset-0 translate-y-1 rounded-2xl border border-[#D8CDBB] bg-[#FFFDF8] shadow-sm" />

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentRole.id}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              style={{
                transformOrigin: "top center",
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
              }}
              className="relative z-10 rounded-2xl border border-[#D8CDBB] bg-[#FFFDF8] calendar-card-shadow overflow-hidden pt-7 pb-5 px-6 sm:px-8"
            >
              <div className="pointer-events-none absolute inset-0 opacity-40 paper-grain" />

              {/* Header */}
              <div className="relative z-10 flex items-center justify-between border-b border-[#D8CDBB]/40 pb-2.5 font-mono text-[10px] uppercase tracking-wider text-[#5E584C]">
                <span className="font-semibold text-[#191919]">
                  {currentRole.label ?? "Current focus"}
                </span>

                <span className="flex items-center gap-1.5 font-bold text-[#183D2B]">
                  <span className="h-2 w-2 rounded-full bg-[#183D2B] motion-safe:animate-pulse" />
                  Open to work
                </span>
              </div>

              {/* Role content (announced politely when it changes) */}
              <div
                className="relative z-10 min-h-[120px] flex flex-col items-center justify-center py-4 text-center"
                aria-live="polite"
              >
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#191919] tracking-tight">
                  {currentRole.title}
                </h3>

                <p className="mt-2 font-sans text-sm text-[#5E584C] leading-relaxed max-w-xs mx-auto">
                  {currentRole.description}
                </p>
              </div>

              {/* Clickable dots replace the "01 / 04" counter */}
              {totalRoles > 1 && (
                <div
                  className="relative z-10 flex items-center justify-center gap-2 pt-1"
                  role="tablist"
                  aria-label="Choose a role"
                >
                  {heroRoles.map((role, index) => (
                    <button
                      key={role.id}
                      type="button"
                      role="tab"
                      aria-selected={index === currentIndex}
                      aria-label={role.title}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-2 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183D2B] ${
                        index === currentIndex
                          ? "w-6 bg-[#183D2B]"
                          : "w-2 bg-[#D8CDBB] hover:bg-[#8C7E68]"
                      }`}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}