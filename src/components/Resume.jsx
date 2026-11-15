import { useState } from "react";
import { profile } from "../data/content";
import { downloadResume } from "../lib/downloadResume";
import { Section } from "./Section";
import { Download } from "./Icons";

export default function Resume() {
  const [downloading, setDownloading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  const handleDownload = async () => {
    setDownloading(true);
    await downloadResume();
    setDownloading(false);
    setStatusMsg("✓ Anjali-Singh-Resume.pdf downloaded successfully.");
    setTimeout(() => setStatusMsg(""), 5000);
  };

  return (
    <Section id="resume" background="bg-[#F4EFE5]">
      {/* Top Eyebrow */}
      <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-[#777064] mb-4">
        <span className="font-bold text-[#183D2B]">07</span>
        <span className="text-[#D8CDBB]">/</span>
        <span>ONE-PAGE ATS RESUME</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#D8CDBB] pb-6 mb-10">
        <div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-[#191919]">
            CURRICULUM VITAE
          </h2>
          <p className="mt-3 font-sans text-sm sm:text-base text-[#777064] max-w-xl">
            Single-page ATS-formatted resume optimized for recruiter review and parsing systems.
          </p>
        </div>

        <button
          type="button"
          onClick={handleDownload}
          disabled={downloading}
          className="inline-flex items-center gap-2 rounded-full bg-[#183D2B] px-6 py-3 font-sans text-xs font-semibold text-[#FFFDF8] hover:bg-[#122e20] shadow-xs pill-btn transition-colors shrink-0"
        >
          <Download className="h-4 w-4" />
          <span>{downloading ? "Preparing PDF..." : "Download Resume (PDF)"}</span>
        </button>
      </div>

      {statusMsg && (
        <div className="mb-6 rounded-xl border border-[#D8CDBB] bg-[#E5F1DF] px-4 py-3 font-sans text-xs font-semibold text-[#183D2B]">
          {statusMsg}
        </div>
      )}

      {/* Clean ATS-Formatted Single-Page Document Preview */}
      <div className="mx-auto max-w-4xl rounded-2xl border border-[#D8CDBB] bg-[#FFFDF8] p-6 sm:p-10 shadow-sm font-sans text-xs leading-relaxed text-[#191919] space-y-6">
        {/* Name and Header */}
        <div className="border-b border-[#D8CDBB] pb-4">
          <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#191919]">
            {profile.name}
          </h3>
          <p className="font-semibold text-xs text-[#183D2B] mt-0.5">
            Software Developer | Frontend Developer | Python Developer | Java Developer
          </p>
          <p className="text-[11px] text-[#777064] mt-1">
            {profile.locationFull} · Email: {profile.email} · GitHub: {profile.github} · LinkedIn: {profile.linkedin}
          </p>
        </div>

        {/* Professional Summary */}
        <div>
          <h4 className="font-bold text-xs uppercase tracking-wider text-[#191919] border-b border-[#D8CDBB]/60 pb-1 mb-2">
            Professional Summary
          </h4>
          <p className="text-[#777064]">
            {profile.resumeSummary}
          </p>
        </div>

        {/* Technical Skills */}
        <div>
          <h4 className="font-bold text-xs uppercase tracking-wider text-[#191919] border-b border-[#D8CDBB]/60 pb-1 mb-2">
            Technical Skills
          </h4>
          <div className="space-y-1 text-[#777064]">
            <p><strong className="text-[#191919]">Frontend:</strong> HTML5, CSS3, JavaScript, React.js, Angular, WordPress.</p>
            <p><strong className="text-[#191919]">Backend:</strong> Python, FastAPI, Java, Spring Boot, Node.js, REST APIs.</p>
            <p><strong className="text-[#191919]">Databases:</strong> PostgreSQL, SQL, SQLAlchemy, MongoDB.</p>
            <p><strong className="text-[#191919]">Tools:</strong> Git, GitHub, JIRA, Docker, Postman, Figma.</p>
            <p><strong className="text-[#191919]">Other:</strong> Responsive Design, API Integration, Microservices, OpenAI API, SEO, GA4, Google Tag Manager, Cypress.</p>
          </div>
        </div>

        {/* Professional Experience */}
        <div>
          <h4 className="font-bold text-xs uppercase tracking-wider text-[#191919] border-b border-[#D8CDBB]/60 pb-1 mb-2">
            Professional Experience
          </h4>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between font-bold text-[#191919]">
                <span>Services Software Engineer — Cohortech Consultancy Private Limited</span>
                <span className="font-normal text-[#777064]">June 2024 – Present</span>
              </div>
              <p className="text-[11px] text-[#777064] italic">Pune, India</p>
              <ul className="mt-1.5 space-y-1 text-[#777064]">
                <li>• Develop Java and Spring Boot backend services and business logic.</li>
                <li>• Build and maintain REST APIs and database integrations.</li>
                <li>• Develop responsive WordPress websites and client landing pages.</li>
                <li>• Work on frontend features, API integrations and application testing.</li>
                <li>• Implement SEO and analytics integrations using GA4 and Google Tag Manager.</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between font-bold text-[#191919]">
                <span>Software Engineering Intern — Cohortech Consultancy Private Limited</span>
                <span className="font-normal text-[#777064]">January 2024 – June 2024</span>
              </div>
              <p className="text-[11px] text-[#777064] italic">Pune, India</p>
              <ul className="mt-1.5 space-y-1 text-[#777064]">
                <li>• Contributed to WordPress website development.</li>
                <li>• Developed responsive frontend layouts.</li>
                <li>• Supported client website implementation and testing.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Featured Project */}
        <div>
          <h4 className="font-bold text-xs uppercase tracking-wider text-[#191919] border-b border-[#D8CDBB]/60 pb-1 mb-2">
            Projects
          </h4>
          <div className="flex justify-between font-bold text-[#191919]">
            <span>ConceptBridge AI — AI-Powered EdTech Platform</span>
            <span className="font-normal text-[#777064]">github.com/Anjaliiieeee/conceptbridge-ai</span>
          </div>
          <ul className="mt-1.5 space-y-1 text-[#777064]">
            <li>• Developed a React-based programming education interface.</li>
            <li>• Built a custom in-browser code editor and interactive learning charts.</li>
            <li>• Developed backend REST APIs using Python and FastAPI.</li>
            <li>• Integrated SQLAlchemy, authentication and AI-assisted evaluation features.</li>
          </ul>
        </div>

        {/* Education */}
        <div>
          <h4 className="font-bold text-xs uppercase tracking-wider text-[#191919] border-b border-[#D8CDBB]/60 pb-1 mb-2">
            Education
          </h4>
          <div className="space-y-2 text-[#777064]">
            <div className="flex justify-between">
              <span><strong className="text-[#191919]">Bachelor of Computer Applications (BCA)</strong> — Modern College of Arts, Science and Commerce, Pune</span>
              <span>2021 – 2024 | 67.76%</span>
            </div>
            <div className="flex justify-between">
              <span><strong className="text-[#191919]">Higher Secondary Certificate (HSC)</strong> — Abeda Inamdar College, Pune</span>
              <span>2019 – 2021 | 81.33%</span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
