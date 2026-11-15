import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { heroRoles } from "../data/content";
import { ChevronLeft, ChevronRight } from "./Icons";

export default function RoleCalendarSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const timerRef = useRef(null);

  const totalRoles = heroRoles.length;
  const currentRole = heroRoles[currentIndex];

  const goToRole = useCallback(
    (index) => {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    },
    [currentIndex]
  );

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalRoles);
  }, [totalRoles]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalRoles) % totalRoles);
  }, [totalRoles]);

  // Autoplay functionality
  useEffect(() => {
    if (isPaused || reduceMotion) return;

    timerRef.current = setInterval(() => {
      handleNext();
    }, 3800);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, handleNext, reduceMotion]);

  // Pause when window/tab is not visible
  useEffect(() => {
    const onVisibilityChange = () => {
      setIsPaused(document.hidden);
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  const pageVariants = {
    enter: (dir) => ({
      rotateX: reduceMotion ? 0 : dir > 0 ? 55 : -55,
      opacity: 0,
      y: reduceMotion ? 0 : dir > 0 ? 20 : -20,
      transformOrigin: dir > 0 ? "top center" : "bottom center",
    }),
    center: {
      rotateX: 0,
      opacity: 1,
      y: 0,
      transition: {
        rotateX: { type: "spring", stiffness: 240, damping: 24 },
        opacity: { duration: 0.3 },
        y: { type: "spring", stiffness: 240, damping: 24 },
      },
    },
    exit: (dir) => ({
      rotateX: reduceMotion ? 0 : dir > 0 ? -55 : 55,
      opacity: 0,
      y: reduceMotion ? 0 : dir > 0 ? -20 : 20,
      transformOrigin: dir > 0 ? "bottom center" : "top center",
      transition: {
        rotateX: { duration: 0.25 },
        opacity: { duration: 0.2 },
        y: { duration: 0.25 },
      },
    }),
  };

  return (
    <div
      className="relative w-full max-w-md mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Outer Calendar Wrapper with Perspective for 3D flip */}
      <div className="relative pt-3 perspective-1000">
        {/* Binder Rings at the Top (6 Rings) */}
        <div className="absolute -top-1 left-0 right-0 z-30 flex justify-center gap-7 sm:gap-9 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              {/* Metallic Ring Loop */}
              <div className="w-2.5 h-6 rounded-full bg-gradient-to-b from-[#8C7E68] via-[#E2D8C7] to-[#7A6C56] shadow-sm border border-[#6E604B]" />
              {/* Paper Hole Punch Shadow */}
              <div className="-mt-1.5 w-3 h-1.5 rounded-full bg-[#191919]/15" />
            </div>
          ))}
        </div>

        {/* Physical Paper Card with Left/Right Nav Arrows */}
        <div className="relative rounded-2xl border border-[#D8CDBB] bg-[#FFFDF8] calendar-card-shadow overflow-hidden pt-7 pb-6 px-6 sm:px-8">
          {/* Paper Texture Overlay */}
          <div className="pointer-events-none absolute inset-0 opacity-40 paper-grain" />

          {/* Left Arrow Button */}
          <button
            type="button"
            aria-label="Previous role"
            onClick={handlePrev}
            className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 z-20 grid h-8 w-8 place-items-center rounded-full border border-[#D8CDBB] bg-[#F4EFE5] text-[#191919] shadow-xs hover:bg-[#183D2B] hover:text-[#FFFDF8] hover:border-[#183D2B] transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            aria-label="Next role"
            onClick={handleNext}
            className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 z-20 grid h-8 w-8 place-items-center rounded-full border border-[#D8CDBB] bg-[#F4EFE5] text-[#191919] shadow-xs hover:bg-[#183D2B] hover:text-[#FFFDF8] hover:border-[#183D2B] transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          {/* Top Metadata Header: CURRENT ROLE / ACTIVE Status */}
          <div className="relative z-10 flex items-center justify-between border-b border-[#D8CDBB]/40 pb-2.5 font-mono text-[10px] uppercase tracking-wider text-[#777064]">
            <span className="font-semibold text-[#191919]">CURRENT ROLE</span>
            <span className="flex items-center gap-1.5 font-bold text-[#183D2B]">
              <span className="h-2 w-2 rounded-full bg-[#183D2B] animate-pulse" />
              ACTIVE
            </span>
          </div>

          {/* Animated Calendar Page Content */}
          <div className="relative min-h-[120px] flex items-center justify-center py-2 text-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentRole.id}
                custom={direction}
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full px-5 sm:px-6"
              >
                {/* Role Count (01 / 04) */}
                <div className="font-mono text-xs text-[#777064] tracking-widest font-semibold mb-1">
                  {currentRole.number} / {currentRole.total}
                </div>

                {/* Main Role Title (Cinzel Font) */}
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#191919] tracking-tight">
                  {currentRole.title}
                </h3>

                {/* Role Description */}
                <p className="mt-2 font-sans text-xs sm:text-sm text-[#777064] leading-relaxed max-w-xs mx-auto">
                  {currentRole.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Four Role Navigation Pill Indicators (Matching Reference) */}
      <div className="mt-4 flex flex-wrap justify-center gap-1.5 sm:gap-2">
        {heroRoles.map((role, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={role.id}
              type="button"
              onClick={() => goToRole(idx)}
              className={`rounded-full px-3 py-1 font-sans text-[11px] font-medium transition-all duration-200 pill-btn ${
                isActive
                  ? "bg-[#183D2B] text-[#FFFDF8] shadow-xs"
                  : "border border-[#D8CDBB] bg-[#FFFDF8]/80 text-[#777064] hover:bg-[#F4EFE5] hover:text-[#191919]"
              }`}
            >
              {role.badgeLabel}
            </button>
          );
        })}
      </div>
    </div>
  );
}
