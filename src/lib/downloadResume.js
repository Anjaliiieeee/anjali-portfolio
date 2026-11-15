import { profile } from "../data/content";

function ascii(text) {
  return String(text || "")
    .replace(/[—–]/g, "-")
    .replace(/[’‘]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[•·]/g, "-");
}

export async function downloadResume() {
  try {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({
      unit: "pt",
      format: "a4",
      compress: true,
    });

    const pageWidth = doc.internal.pageSize.getWidth(); // 595.28
    const pageHeight = doc.internal.pageSize.getHeight(); // 841.89
    const margin = 38;
    const width = pageWidth - margin * 2;
    let y = 38;

    // Helper to write wrapped text and advance y
    const writeLine = (text, fontSize = 9.5, isBold = false, color = [30, 30, 30], lineHeight = 13) => {
      doc.setFont("helvetica", isBold ? "bold" : "normal");
      doc.setFontSize(fontSize);
      doc.setTextColor(color[0], color[1], color[2]);
      const lines = doc.splitTextToSize(ascii(text), width);
      doc.text(lines, margin, y);
      y += lines.length * lineHeight;
    };

    const sectionHeading = (title) => {
      y += 6;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10.5);
      doc.setTextColor(20, 20, 20);
      doc.text(title.toUpperCase(), margin, y);
      y += 4;
      doc.setDrawColor(60, 60, 60);
      doc.setLineWidth(0.75);
      doc.line(margin, y, margin + width, y);
      y += 10;
    };

    // NAME & CONTACT
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(15, 15, 15);
    doc.text(profile.name.toUpperCase(), margin, y);
    y += 16;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(30, 30, 30);
    doc.text("Software Developer | Frontend Developer | Python Developer | Java Developer", margin, y);
    y += 13;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(60, 60, 60);
    const contactLine = `${profile.locationFull}  |  Email: ${profile.email}  |  GitHub: ${profile.github}  |  LinkedIn: ${profile.linkedin}`;
    doc.text(contactLine, margin, y);
    y += 14;

    // PROFESSIONAL SUMMARY
    sectionHeading("Professional Summary");
    writeLine(profile.resumeSummary, 8.8, false, [35, 35, 35], 11.5);

    // TECHNICAL SKILLS
    sectionHeading("Technical Skills");
    const skillsList = [
      ["Frontend: ", "HTML5, CSS3, JavaScript, React.js, Angular, WordPress."],
      ["Backend: ", "Python, FastAPI, Java, Spring Boot, Node.js, REST APIs."],
      ["Databases: ", "PostgreSQL, SQL, SQLAlchemy, MongoDB."],
      ["Tools: ", "Git, GitHub, JIRA, Docker, Postman, Figma."],
      ["Other: ", "Responsive Design, API Integration, Microservices, OpenAI API, SEO, GA4, Google Tag Manager, Cypress."],
    ];

    skillsList.forEach(([label, items]) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.8);
      doc.setTextColor(30, 30, 30);
      doc.text(label, margin, y);
      const labelW = doc.getTextWidth(label);
      doc.setFont("helvetica", "normal");
      doc.text(items, margin + labelW, y);
      y += 11.5;
    });

    // PROFESSIONAL EXPERIENCE
    sectionHeading("Professional Experience");

    // Role 1
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.2);
    doc.setTextColor(20, 20, 20);
    doc.text("Services Software Engineer", margin, y);
    const date1 = "June 2024 - Present";
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.text(date1, margin + width - doc.getTextWidth(date1), y);
    y += 11.5;

    doc.setFont("helvetica", "italic");
    doc.setFontSize(8.5);
    doc.setTextColor(70, 70, 70);
    doc.text("Cohortech Consultancy Private Limited  -  Pune, India", margin, y);
    y += 11.5;

    const role1Bullets = [
      "Develop Java and Spring Boot backend services and business logic.",
      "Build and maintain REST APIs and database integrations.",
      "Develop responsive WordPress websites and client landing pages.",
      "Work on frontend features, API integrations and application testing.",
      "Implement SEO and analytics integrations using GA4 and Google Tag Manager.",
    ];
    role1Bullets.forEach((bullet) => {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(40, 40, 40);
      doc.text("- " + bullet, margin + 8, y);
      y += 11.2;
    });
    y += 3;

    // Role 2
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.2);
    doc.setTextColor(20, 20, 20);
    doc.text("Software Engineering Intern", margin, y);
    const date2 = "January 2024 - June 2024";
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.text(date2, margin + width - doc.getTextWidth(date2), y);
    y += 11.5;

    doc.setFont("helvetica", "italic");
    doc.setFontSize(8.5);
    doc.setTextColor(70, 70, 70);
    doc.text("Cohortech Consultancy Private Limited  -  Pune, India", margin, y);
    y += 11.5;

    const role2Bullets = [
      "Contributed to WordPress website development.",
      "Developed responsive frontend layouts.",
      "Supported client website implementation and testing.",
    ];
    role2Bullets.forEach((bullet) => {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(40, 40, 40);
      doc.text("- " + bullet, margin + 8, y);
      y += 11.2;
    });

    // PROJECTS
    sectionHeading("Projects");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.2);
    doc.setTextColor(20, 20, 20);
    doc.text("ConceptBridge AI - AI-Powered EdTech Platform", margin, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    const ghText = "github.com/Anjaliiieeee/conceptbridge-ai";
    doc.text(ghText, margin + width - doc.getTextWidth(ghText), y);
    y += 12;

    const projectBullets = [
      "Developed a React-based programming education interface.",
      "Built a custom in-browser code editor and interactive learning charts.",
      "Developed backend REST APIs using Python and FastAPI.",
      "Integrated SQLAlchemy, authentication and AI-assisted evaluation features.",
    ];
    projectBullets.forEach((bullet) => {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(40, 40, 40);
      doc.text("- " + bullet, margin + 8, y);
      y += 11.2;
    });

    // EDUCATION
    sectionHeading("Education");

    // BCA
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.2);
    doc.setTextColor(20, 20, 20);
    doc.text("Bachelor of Computer Applications (BCA)", margin, y);
    const dateBca = "2021 - 2024";
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.text(dateBca, margin + width - doc.getTextWidth(dateBca), y);
    y += 11.5;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(60, 60, 60);
    doc.text("Modern College of Arts, Science and Commerce, Pune  |  Aggregate: 67.76%", margin, y);
    y += 13;

    // HSC
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.2);
    doc.setTextColor(20, 20, 20);
    doc.text("Higher Secondary Certificate (HSC)", margin, y);
    const dateHsc = "2019 - 2021";
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.text(dateHsc, margin + width - doc.getTextWidth(dateHsc), y);
    y += 11.5;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(60, 60, 60);
    doc.text("Abeda Inamdar College, Pune  |  Score: 81.33%", margin, y);
    y += 12;

    doc.setProperties({
      title: "Anjali Singh - Resume",
      author: "Anjali Singh",
      subject: "Software Developer | Frontend Developer | Python Developer | Java Developer",
      keywords: "React, Python, FastAPI, Java, Spring Boot, SQL, Software Engineer, Resume",
    });

    // Verify it is strictly 1 page
    const pageCount = doc.getNumberOfPages();
    if (pageCount > 1) {
      console.warn("PDF exceeded 1 page, count was:", pageCount);
    }

    doc.save("Anjali-Singh-Resume.pdf");
    return { ok: true, format: "pdf" };
  } catch (err) {
    console.error("PDF generation failed:", err);
    // Fallback direct download link
    const link = document.createElement("a");
    link.href = "/Anjali-Singh-Resume.pdf";
    link.download = "Anjali-Singh-Resume.pdf";
    document.body.appendChild(link);
    link.click();
    link.remove();
    return { ok: true, format: "pdf" };
  }
}
