import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { profile } from "../data/content";
import { Section } from "./Section";
import { Download, GithubIcon, LinkedinIcon, ArrowRight } from "./Icons";
import { downloadResume } from "../lib/downloadResume";

const githubLink = profile.github;
const linkedinLink = profile.linkedin;

const EASE = [0.22, 0.75, 0.25, 1];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass =
  "w-full rounded-xl border bg-[#F4EFE5] px-3.5 py-2.5 text-sm text-[#191919] outline-none transition-[border-color,box-shadow,background-color] duration-200 focus:bg-[#FFFDF8] focus:border-[#183D2B] focus:shadow-[0_0_0_4px_rgba(24,61,43,0.12)]";

export default function Contact() {
  const reduce = useReducedMotion();
  const d = reduce ? 0 : 1;

  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [copied, setCopied] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Please enter your name.";
    if (!EMAIL_RE.test(formData.email.trim())) errs.email = "Please enter a valid email address.";
    if (!formData.message.trim()) errs.message = "Please write a message.";
    return errs;
  };

  const setField = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    if (errors[field]) setErrors({ ...errors, [field]: undefined }); // clear as soon as they fix it
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const mailtoSubject = encodeURIComponent(
      formData.subject.trim() || `Portfolio Inquiry from ${formData.name.trim()}`
    );
    const mailtoBody = encodeURIComponent(
      `From: ${formData.name.trim()} (${formData.email.trim()})\n\n${formData.message.trim()}`
    );

    window.location.href = `mailto:${profile.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
    setSubmitted(true);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked: the email is still a normal link */
    }
  };

  /* ---------- animation variants ---------- */
  const stagger = (gap = 0.1, delay = 0) => ({
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : gap, delayChildren: reduce ? 0 : delay } },
  });
  const fadeUp = {
    hidden: { opacity: 0, y: 22 * d },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
  };
  const fromRight = {
    hidden: { opacity: 0, x: 48 * d },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: EASE, staggerChildren: reduce ? 0 : 0.09, delayChildren: reduce ? 0 : 0.3 },
    },
  };
  const pop = {
    hidden: { opacity: 0, scale: reduce ? 1 : 0.85 },
    show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 280, damping: 18 } },
  };
  const maskUp = {
    hidden: { y: reduce ? "0%" : "110%" },
    show: { y: "0%", transition: { duration: 0.8, ease: EASE } },
  };

  const hoverLift = reduce ? undefined : { y: -3 };
  const tap = reduce ? undefined : { scale: 0.97 };
  const shake = (hasError) =>
    reduce || !hasError ? { x: 0 } : { x: [0, -6, 6, -4, 4, 0], transition: { duration: 0.4 } };

  const errorId = (f) => `contact-${f}-error`;

  const fieldError = (field) => (
    <AnimatePresence initial={false}>
      {errors[field] && (
        <motion.p
          id={errorId(field)}
          role="alert"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="overflow-hidden mt-1 text-xs font-medium text-[#B93815]"
        >
          {errors[field]}
        </motion.p>
      )}
    </AnimatePresence>
  );

  const fieldProps = (field) => ({
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? errorId(field) : undefined,
    className: `${inputClass} ${errors[field] ? "border-[#B93815]" : "border-[#D8CDBB]"}`,
  });

  return (
    <Section id="contact" background="bg-[#FFFDF8]">
      <motion.div
        variants={stagger(0.15)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="relative overflow-hidden rounded-3xl border border-[#D8CDBB] bg-[#F4EFE5] p-6 sm:p-12 lg:p-16 shadow-sm"
      >
        {/* Slow floating colour blobs (off for reduced motion) */}
        {!reduce && (
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <motion.div
              animate={{ x: [0, 30, 0], y: [0, -24, 0] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#E5F1DF]/80 blur-3xl"
            />
            <motion.div
              animate={{ x: [0, -30, 0], y: [0, 26, 0] }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-[#E9DDC9]/80 blur-3xl"
            />
          </div>
        )}

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* ---------------- Left: heading, details, links ---------------- */}
          <motion.div variants={stagger(0.12)} className="lg:col-span-7 space-y-6">
            <div>
              <motion.span
                variants={pop}
                className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#E5F1DF] px-3.5 py-1.5 font-sans text-xs font-semibold text-[#183D2B]"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#2E8B57] opacity-60 motion-safe:animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2E8B57]" />
                </span>
                Open to collaboration &amp; roles
              </motion.span>

              {/* Required heading: each line slides up from a mask */}
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-[#191919] leading-[1.05]">
                <span className="block overflow-hidden pb-1">
                  <motion.span variants={maskUp} className="block">
                    Let&apos;s build
                  </motion.span>
                </span>
                <span className="block overflow-hidden pb-1">
                  <motion.span variants={maskUp} className="block">
                    <span className="text-[#183D2B]">something</span> meaningful.
                  </motion.span>
                </span>
              </h2>
            </div>

            <motion.p
              variants={fadeUp}
              className="font-sans text-base text-[#4A453B] leading-relaxed max-w-xl"
            >
              I am open for software engineering opportunities, frontend development in React 19, and Python backend services. Feel free to send a note or connect directly:
            </motion.p>

            {/* Contact details */}
            <motion.div
              variants={fadeUp}
              className="rounded-2xl border border-[#D8CDBB] bg-[#FFFDF8] p-5 space-y-3 font-sans text-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D8CDBB]/50 pb-3">
                <span className="text-[#5E584C]">Email</span>
                <div className="flex items-center gap-3">
                  <a
                    href={`mailto:${profile.email}`}
                    className="font-semibold text-[#183D2B] underline-offset-4 hover:underline break-all"
                  >
                    {profile.email}
                  </a>
                  <motion.button
                    type="button"
                    onClick={copyEmail}
                    whileTap={tap}
                    aria-label="Copy email address"
                    className="shrink-0 rounded-full border border-[#D8CDBB] bg-[#F4EFE5] px-3 py-1 text-xs font-semibold text-[#191919] hover:border-[#183D2B] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183D2B]"
                  >
                    <span aria-live="polite">{copied ? "Copied ✓" : "Copy"}</span>
                  </motion.button>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-[#5E584C]">Location</span>
                <span className="font-semibold text-[#191919]">{profile.locationFull}</span>
              </div>
            </motion.div>

            {/* Quick links */}
            <motion.div variants={stagger(0.08)} className="flex flex-wrap items-center gap-3 pt-2">
              <motion.a
                variants={pop}
                whileHover={hoverLift}
                whileTap={tap}
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#D8CDBB] bg-[#FFFDF8] px-4 py-2.5 font-sans text-sm font-semibold text-[#191919] hover:bg-[#183D2B] hover:text-[#FFFDF8] hover:border-[#183D2B] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183D2B]"
              >
                <GithubIcon className="h-4 w-4" />
                <span>GitHub</span>
              </motion.a>

              <motion.a
                variants={pop}
                whileHover={hoverLift}
                whileTap={tap}
                href={linkedinLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#D8CDBB] bg-[#FFFDF8] px-4 py-2.5 font-sans text-sm font-semibold text-[#191919] hover:bg-[#183D2B] hover:text-[#FFFDF8] hover:border-[#183D2B] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183D2B]"
              >
                <LinkedinIcon className="h-4 w-4" />
                <span>LinkedIn</span>
              </motion.a>

              <motion.button
                variants={pop}
                whileHover={hoverLift}
                whileTap={tap}
                type="button"
                onClick={downloadResume}
                className="inline-flex items-center gap-2 rounded-full bg-[#183D2B] px-5 py-2.5 font-sans text-sm font-semibold text-[#FFFDF8] hover:bg-[#122e20] pill-btn transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183D2B]"
              >
                <Download className="h-4 w-4" />
                <span>Download resume (PDF)</span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* ---------------- Right: message form ---------------- */}
          <motion.div variants={fromRight} className="lg:col-span-5">
            <div className="rounded-2xl border border-[#D8CDBB] bg-[#FFFDF8] p-6 sm:p-8 shadow-sm">
              <motion.h3
                variants={fadeUp}
                className="font-serif text-lg font-bold text-[#191919] border-b border-[#D8CDBB] pb-3 mb-5"
              >
                Send a message
              </motion.h3>

              <AnimatePresence mode="wait" initial={false}>
                {submitted ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: reduce ? 1 : 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 220, damping: 20 }}
                    role="status"
                    className="space-y-3 font-sans text-sm text-[#183D2B] bg-[#E5F1DF] p-5 rounded-xl border border-[#D8CDBB]"
                  >
                    <p className="font-bold flex items-center gap-3">
                      {/* Check mark draws itself */}
                      <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0" fill="none" aria-hidden>
                        <motion.circle
                          cx="12" cy="12" r="10"
                          stroke="#183D2B" strokeWidth="2"
                          initial={{ pathLength: reduce ? 1 : 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.6 }}
                        />
                        <motion.path
                          d="M7 12.5l3.2 3.2L17 9"
                          stroke="#183D2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                          initial={{ pathLength: reduce ? 1 : 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.5, delay: 0.5 }}
                        />
                      </svg>
                      Opening your email app with your message.
                    </p>
                    <p className="text-[#4A453B]">
                      If it did not open, email me directly at{" "}
                      <a href={`mailto:${profile.email}`} className="text-[#183D2B] underline">
                        {profile.email}
                      </a>
                      .
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="rounded-full border border-[#183D2B]/30 bg-[#FFFDF8] px-4 py-1.5 text-xs font-semibold text-[#183D2B] hover:border-[#183D2B] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183D2B]"
                    >
                      Write another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    noValidate
                    exit={{ opacity: 0 }}
                    variants={stagger(0.08)}
                    className="space-y-4 font-sans text-sm"
                  >
                    <motion.div variants={fadeUp}>
                      <label htmlFor="contact-name" className="block font-medium text-[#5E584C] mb-1">
                        Your name *
                      </label>
                      <motion.div animate={shake(!!errors.name)}>
                        <input
                          id="contact-name"
                          type="text"
                          autoComplete="name"
                          value={formData.name}
                          onChange={setField("name")}
                          placeholder="e.g. Maya Sharma"
                          {...fieldProps("name")}
                        />
                      </motion.div>
                      {fieldError("name")}
                    </motion.div>

                    <motion.div variants={fadeUp}>
                      <label htmlFor="contact-email" className="block font-medium text-[#5E584C] mb-1">
                        Your email *
                      </label>
                      <motion.div animate={shake(!!errors.email)}>
                        <input
                          id="contact-email"
                          type="email"
                          autoComplete="email"
                          value={formData.email}
                          onChange={setField("email")}
                          placeholder="e.g. maya@company.com"
                          {...fieldProps("email")}
                        />
                      </motion.div>
                      {fieldError("email")}
                    </motion.div>

                    <motion.div variants={fadeUp}>
                      <label htmlFor="contact-subject" className="block font-medium text-[#5E584C] mb-1">
                        Subject
                      </label>
                      <input
                        id="contact-subject"
                        type="text"
                        value={formData.subject}
                        onChange={setField("subject")}
                        placeholder="Frontend / Python opportunity"
                        className={`${inputClass} border-[#D8CDBB]`}
                      />
                    </motion.div>

                    <motion.div variants={fadeUp}>
                      <label htmlFor="contact-message" className="block font-medium text-[#5E584C] mb-1">
                        Message *
                      </label>
                      <motion.div animate={shake(!!errors.message)}>
                        <textarea
                          id="contact-message"
                          rows={4}
                          value={formData.message}
                          onChange={setField("message")}
                          placeholder="What are you building, and how can I help?"
                          {...fieldProps("message")}
                          className={`${fieldProps("message").className} resize-none`}
                        />
                      </motion.div>
                      {fieldError("message")}
                    </motion.div>

                    <motion.button
                      variants={fadeUp}
                      whileHover={hoverLift}
                      whileTap={tap}
                      type="submit"
                      className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#183D2B] py-3 font-sans text-sm font-semibold text-[#FFFDF8] hover:bg-[#122e20] pill-btn transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183D2B]"
                    >
                      <span>Send message</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Section>
  );
}