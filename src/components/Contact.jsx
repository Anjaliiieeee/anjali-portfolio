import { useState } from "react";
import { profile } from "../data/content";
import { Section } from "./Section";
import {
  Download,
  GithubIcon,
  LinkedinIcon,
  ArrowRight,
  CheckIcon,
} from "./Icons";
import { downloadResume } from "../lib/downloadResume";

const githubLink = profile.github;
const linkedinLink = profile.linkedin;

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Please enter your name.";
    if (!formData.email.trim() || !formData.email.includes("@")) {
      errs.email = "Please enter a valid email address.";
    }
    if (!formData.message.trim()) errs.message = "Please write a message.";
    return errs;
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

  return (
    <Section id="contact" background="bg-[#FFFDF8]">
      {/* Top Eyebrow */}
      <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-[#777064] mb-4">
        <span className="font-bold text-[#183D2B]">08</span>
        <span className="text-[#D8CDBB]">/</span>
        <span>GET IN TOUCH</span>
      </div>

      <div className="rounded-3xl border border-[#D8CDBB] bg-[#F4EFE5] p-6 sm:p-12 lg:p-16 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Heading, Channels, Resume */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="rounded-full bg-[#E5F1DF] text-[#183D2B] px-3.5 py-1 text-xs font-mono font-bold inline-block mb-4">
                COLLABORATION &amp; ROLES
              </span>

              {/* Exact Required Heading: LET'S BUILD SOMETHING MEANINGFUL. */}
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-[#191919] leading-[1.05]">
                LET&apos;S BUILD <br />
                <span className="text-[#183D2B]">
                  SOMETHING
                </span>{" "}
                MEANINGFUL.
              </h2>
            </div>

            <p className="font-sans text-sm sm:text-base text-[#777064] leading-relaxed max-w-xl">
              I am open for software engineering opportunities, frontend development in React 19, and Python backend services. Feel free to send a note or connect directly:
            </p>

            {/* Contact Details Card */}
            <div className="rounded-2xl border border-[#D8CDBB] bg-[#FFFDF8] p-5 space-y-3 font-sans text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-[#D8CDBB]/50 pb-2.5">
                <span className="text-[#777064]">Direct Email:</span>
                <a
                  href={`mailto:${profile.email}`}
                  className="font-semibold text-[#183D2B] hover:underline"
                >
                  {profile.email}
                </a>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-[#777064]">Location:</span>
                <span className="font-semibold text-[#191919]">{profile.locationFull}</span>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#D8CDBB] bg-[#FFFDF8] px-4 py-2.5 font-sans text-xs font-semibold text-[#191919] hover:bg-[#183D2B] hover:text-[#FFFDF8] hover:border-[#183D2B] transition-colors"
              >
                <GithubIcon className="h-4 w-4" />
                <span>GitHub</span>
              </a>

              <a
                href={linkedinLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#D8CDBB] bg-[#FFFDF8] px-4 py-2.5 font-sans text-xs font-semibold text-[#191919] hover:bg-[#183D2B] hover:text-[#FFFDF8] hover:border-[#183D2B] transition-colors"
              >
                <LinkedinIcon className="h-4 w-4" />
                <span>LinkedIn</span>
              </a>

              <button
                type="button"
                onClick={downloadResume}
                className="inline-flex items-center gap-2 rounded-full bg-[#183D2B] px-5 py-2.5 font-sans text-xs font-semibold text-[#FFFDF8] hover:bg-[#122e20] pill-btn transition-colors"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download Resume (PDF)</span>
              </button>
            </div>
          </div>

          {/* Right Column: Clean Contact Message Form */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-[#D8CDBB] bg-[#FFFDF8] p-6 sm:p-8 shadow-xs">
              <h3 className="font-serif text-lg font-bold text-[#191919] border-b border-[#D8CDBB] pb-3 mb-5">
                Send a Message
              </h3>

              {submitted ? (
                <div className="space-y-3 font-sans text-xs text-[#183D2B] bg-[#E5F1DF] p-5 rounded-xl border border-[#D8CDBB]">
                  <p className="font-bold flex items-center gap-2">
                    <CheckIcon className="h-4 w-4" />
                    Opening your default email client with your message!
                  </p>
                  <p className="text-[#777064]">
                    If your client did not launch, feel free to email directly to{" "}
                    <a href={`mailto:${profile.email}`} className="text-[#183D2B] underline">
                      {profile.email}
                    </a>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4 font-sans text-xs">
                  <div>
                    <label htmlFor="contact-name" className="block font-medium text-[#777064] mb-1">
                      Your Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Maya Sharma"
                      className="w-full rounded-xl border border-[#D8CDBB] bg-[#F4EFE5] px-3.5 py-2.5 text-xs text-[#191919] outline-none focus:border-[#183D2B] focus:bg-[#FFFDF8]"
                    />
                    {errors.name && (
                      <p className="mt-1 text-[11px] text-[#DF572F]">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block font-medium text-[#777064] mb-1">
                      Your Email *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. maya@company.com"
                      className="w-full rounded-xl border border-[#D8CDBB] bg-[#F4EFE5] px-3.5 py-2.5 text-xs text-[#191919] outline-none focus:border-[#183D2B] focus:bg-[#FFFDF8]"
                    />
                    {errors.email && (
                      <p className="mt-1 text-[11px] text-[#DF572F]">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block font-medium text-[#777064] mb-1">
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Frontend / Python Opportunity"
                      className="w-full rounded-xl border border-[#D8CDBB] bg-[#F4EFE5] px-3.5 py-2.5 text-xs text-[#191919] outline-none focus:border-[#183D2B] focus:bg-[#FFFDF8]"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block font-medium text-[#777064] mb-1">
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="What are you building, and how can I help?"
                      className="w-full rounded-xl border border-[#D8CDBB] bg-[#F4EFE5] px-3.5 py-2.5 text-xs text-[#191919] outline-none focus:border-[#183D2B] focus:bg-[#FFFDF8] resize-none"
                    />
                    {errors.message && (
                      <p className="mt-1 text-[11px] text-[#DF572F]">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-full bg-[#183D2B] py-3 font-sans text-xs font-semibold text-[#FFFDF8] hover:bg-[#122e20] pill-btn transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
