import { useState } from "react";
import { profile } from "../data/content";
import { downloadResume } from "../lib/downloadResume";
import { Section } from "./Section";
import { Download } from "./Icons";

// One title only, same as the hero. Change here if you prefer "Software Engineer".
const RESUME_TITLE = "Software Developer";

const sectionHeading =
  "font-bold text-xs uppercase tracking-wider text-[#191919] border-b border-[#D8CDBB]/60 pb-1 mb-2";

// Title/company on the left, date on the right; stacks on small screens.
const rowClass =
  "flex flex-col sm:flex-row sm:justify-between sm:gap-4 font-bold text-[#191919]";
const dateClass = "font-normal text-[#5E584C] shrink-0";

export default function Resume() {
  const [downloading, setDownloading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  const handleDownload = async () => {
    setDownloading(true);
    setStatusMsg("");
    try {
      await downloadResume();
      setStatusMsg("Anjali-Singh-Resume.pdf downloaded.");
    } catch {
      setStatusMsg("Download failed. Please try again.");
    } finally {
      setDownloading(false);
      setTimeout(() => setStatusMsg(""), 5000);
    }
  };

  return (
    <Section id="resume" background="bg-[#F4EFE5]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#D8CDBB] pb-6 mb-10">
        <div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-[#191919]">
            Resume
          </h2>
          <p className="mt-3 font-sans text-sm sm:text-base text-[#5E584C] max-w-xl">
            One-page, ATS-friendly resume. Download the PDF or read it below.
          </p>
        </div>

        <button
          type="button"
          onClick={handleDownload}
          disabled={downloading}
          className="inline-flex items-center gap-2 rounded-full bg-[#183D2B] px-6 py-3 font-sans text-sm font-semibold text-[#FFFDF8] hover:bg-[#122e20] shadow-xs pill-btn transition-colors shrink-0 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183D2B]"
        >
          <Download className="h-4 w-4" />
          <span>{downloading ? "Preparing PDF..." : "Download resume (PDF)"}</span>
        </button>
      </div>

      <div role="status" aria-live="polite">
        {statusMsg && (
          <div className="mb-6 rounded-xl border border-[#D8CDBB] bg-[#E5F1DF] px-4 py-3 font-sans text-xs font-semibold text-[#183D2B]">
            {statusMsg}
          </div>
        )}
      </div>

      {/* Single-page ATS resume preview */}
      <div className="mx-auto max-w-4xl rounded-2xl border border-[#D8CDBB] bg-[#FFFDF8] p-6 sm:p-10 shadow-sm font-sans text-xs leading-relaxed text-[#191919] space-y-6">
        {/* Name, one title, contact */}
        <div className="border-b border-[#D8CDBB] pb-4">
          <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#191919]">
            {profile.name}
          </h3>
          <p className="font-semibold text-sm text-[#183D2B] mt-0.5">
            {RESUME_TITLE}
          </p>
          <p className="text-[11px] text-[#5E584C] mt-1 break-words">
            {profile.locationFull} · {profile.email} · {profile.github} · {profile.linkedin}
          </p>
        </div>

        {/* Professional Summary */}
        <div>
          <h4 className={sectionHeading}>Professional Summary</h4>
          <p className="text-[#4A453B]">{profile.resumeSummary}</p>
        </div>

        {/* Technical Skills */}
        <div>
          <h4 className={sectionHeading}>Technical Skills</h4>
          <div className="space-y-1 text-[#4A453B]">
            <p><strong className="text-[#191919]">Frontend:</strong> HTML5, CSS3, JavaScript, React.js, Angular, WordPress.</p>
            <p><strong className="text-[#191919]">Backend:</strong> Python, FastAPI, Java, Spring Boot, Node.js, REST APIs.</p>
            <p><strong className="text-[#191919]">Databases:</strong> PostgreSQL, SQL, SQLAlchemy, MongoDB.</p>
            <p><strong className="text-[#191919]">Tools:</strong> Git, GitHub, JIRA, Docker, Postman, Figma.</p>
            <p><strong className="text-[#191919]">Other:</strong> Responsive Design, API Integration, Microservices, OpenAI API, SEO, GA4, Google Tag Manager, Cypress.</p>
          </div>
        </div>

        {/* Professional Experience */}
        <div>
          <h4 className={sectionHeading}>Professional Experience</h4>
          <div className="space-y-4">
            <div>
              <div className={rowClass}>
                <span>Services Software Engineer — Cohortech Consultancy Private Limited</span>
                <span className={dateClass}>June 2024 – Present</span>
              </div>
              <p className="text-[11px] text-[#5E584C] italic">Pune, India</p>
              <ul className="mt-1.5 space-y-1 text-[#4A453B]">
                <li>• Develop Java and Spring Boot backend services and business logic.</li>
                <li>• Build and maintain REST APIs and database integrations.</li>
                <li>• Develop responsive WordPress websites and client landing pages.</li>
                <li>• Work on frontend features, API integrations and application testing.</li>
                <li>• Implement SEO and analytics integrations using GA4 and Google Tag Manager.</li>
              </ul>
            </div>

            <div>
              <div className={rowClass}>
                <span>Software Engineering Intern — Cohortech Consultancy Private Limited</span>
                <span className={dateClass}>January 2024 – June 2024</span>
              </div>
              <p className="text-[11px] text-[#5E584C] italic">Pune, India</p>
              <ul className="mt-1.5 space-y-1 text-[#4A453B]">
                <li>• Contributed to WordPress website development.</li>
                <li>• Developed responsive frontend layouts.</li>
                <li>• Supported client website implementation and testing.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Projects */}
        <div>
          <h4 className={sectionHeading}>Projects</h4>
          <div className={rowClass}>
            <span>ConceptBridge AI — AI-Powered EdTech Platform</span>
            <span className={`${dateClass} break-all`}>github.com/Anjaliiieeee/conceptbridge-ai</span>
          </div>
          <ul className="mt-1.5 space-y-1 text-[#4A453B]">
            <li>• Developed a React-based programming education interface.</li>
            <li>• Built a custom in-browser code editor and interactive learning charts.</li>
            <li>• Developed backend REST APIs using Python and FastAPI.</li>
            <li>• Integrated SQLAlchemy, authentication and AI-assisted evaluation features.</li>
          </ul>
        </div>

        {/* Education */}
        <div>
          <h4 className={sectionHeading}>Education</h4>
          <div className="space-y-2 text-[#4A453B]">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:gap-4">
              <span><strong className="text-[#191919]">Bachelor of Computer Applications (BCA)</strong> — Modern College of Arts, Science and Commerce, Pune</span>
              <span className="shrink-0">2021 – 2024 | 67.76%</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:gap-4">
              <span><strong className="text-[#191919]">Higher Secondary Certificate (HSC)</strong> — Abeda Inamdar College, Pune</span>
              <span className="shrink-0">2019 – 2021 | 81.33%</span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}