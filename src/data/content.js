export const profile = {
  name: "Anjali Singh",
  firstName: "Anjali",
  lastName: "Singh",
  initials: "AS",
  title: "Software Developer",
  subtitles: "Frontend Developer | Python Developer | Java Developer",
  location: "Pune, India",
  locationFull: "Pune, Maharashtra, India",
  metaLabel: "SOFTWARE DEVELOPER // PUNE, IN",
  status: "Available for opportunities",
  company: "Cohortech Consultancy Private Limited",
  role: "Services Software Engineer",
  email: "anjalibimalsingh@gmail.com",
  github: "https://github.com/Anjaliiieeee",
  linkedin: "https://www.linkedin.com/in/anjali-singh-6a10b2222/",
  heroIntro:
    "I build thoughtful digital experiences, responsive frontend applications and reliable backend systems using modern web technologies.",
  heroShortIntro:
    "I build thoughtful digital experiences and reliable software solutions.",
  aboutHeading: "A LITTLE ABOUT ME.",
  aboutParagraphs: [
    "I'm a software developer who enjoys building useful digital products and solving practical engineering problems.",
    "My work combines frontend development, backend engineering and API integration. I enjoy creating clean user interfaces while also understanding the systems and logic working behind them.",
    "From interactive React applications to Python-based backend services, I enjoy working across different parts of the development process.",
  ],
  resumeSummary:
    "Software Developer with experience in frontend development, backend engineering and web application development. Skilled in React, JavaScript, Python, FastAPI, Java and Spring Boot. Experienced in building responsive user interfaces, REST APIs, database integrations and client-facing web solutions.",
};

export const socials = [
  { label: "Email", href: "mailto:anjalibimalsingh@gmail.com" },
  { label: "GitHub", href: "https://github.com/Anjaliiieeee" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/anjali-singh-6a10b2222/" },
];

export const navLinks = [
  { id: "home", label: "HOME" },
  { id: "about", label: "ABOUT" },
  { id: "projects", label: "PROJECTS" },
  { id: "skills", label: "SKILLS" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "contact", label: "CONTACT" },
];

export const heroRoles = [
  {
    id: "software-engineer",
    number: "01",
    total: "04",
    title: "Software Engineer",
    badgeLabel: "01 Software Engineer",
    description: "Building reliable software solutions and practical applications.",
    tagline: "Scalable architecture & clean business logic.",
  },
  {
    id: "frontend-developer",
    number: "02",
    total: "04",
    title: "Frontend Developer",
    badgeLabel: "02 Frontend Developer",
    description: "Creating responsive interfaces and engaging digital experiences.",
    tagline: "React 19, modern CSS, dynamic interactions.",
  },
  {
    id: "python-developer",
    number: "03",
    total: "04",
    title: "Python Developer",
    badgeLabel: "03 Python Developer",
    description: "Developing backend services, APIs and Python-based applications.",
    tagline: "FastAPI, asynchronous endpoints, OpenAI integration.",
  },
  {
    id: "java-developer",
    number: "04",
    total: "04",
    title: "Java Developer",
    badgeLabel: "04 Java Developer",
    description: "Building backend applications using Java and Spring Boot.",
    tagline: "Enterprise microservices & database transactions.",
  },
];

export const technicalSkillsCategories = [
  {
    number: "01",
    category: "FRONTEND DEVELOPMENT",
    skills: ["HTML5", "CSS3", "JavaScript (ES6+)", "React.js", "Angular", "WordPress"],
  },
  {
    number: "02",
    category: "LAYOUT & STYLING",
    skills: ["Responsive Web Design", "Flexbox", "CSS Grid", "Cross-Browser Compatibility"],
  },
  {
    number: "03",
    category: "API INTEGRATION",
    skills: ["REST API Integration", "JSON"],
  },
  {
    number: "04",
    category: "FRONTEND DEVELOPMENT PRACTICES",
    skills: [
      "Reusable UI Components",
      "Component-Based Development",
      "UI/UX Principles",
      "Performance Optimization",
      "Debugging",
    ],
  },
  {
    number: "05",
    category: "TOOLS & WORKFLOW",
    skills: ["Git", "GitHub", "JIRA", "Agile"],
  },
  {
    number: "06",
    category: "PYTHON & APIs",
    skills: ["Python", "FastAPI", "REST APIs", "JSON", "AsyncIO", "OOP"],
  },
  {
    number: "07",
    category: "GENERATIVE AI",
    skills: ["OpenAI API", "Machine Learning"],
  },
  {
    number: "08",
    category: "BACKEND ARCHITECTURE",
    skills: ["Microservices", "Celery", "RabbitMQ"],
  },
  {
    number: "09",
    category: "DATABASES",
    skills: ["PostgreSQL", "SQLAlchemy", "MongoDB", "SQL"],
  },
  {
    number: "10",
    category: "CLOUD & TOOLS",
    skills: ["AWS EC2", "AWS S3", "AWS Lambda", "Google Cloud", "Docker", "Git", "GitHub"],
  },
  {
    number: "11",
    category: "JAVA DEVELOPMENT",
    skills: [
      "Java",
      "Core Java",
      "OOP",
      "Spring Boot",
      "Microservices",
      "REST APIs",
      "API Management",
      "SQL",
      "MongoDB",
      "Database Management",
      "Application Testing & Debugging",
      "Git",
      "GitHub",
      "Jira",
    ],
  },
  {
    number: "12",
    category: "FULL-STACK / MOBILE PROJECT EXPERIENCE",
    skills: ["React Native", "JavaScript", "Node.js"],
    note: "Built the frontend of an e-commerce and booking marketplace application and contributed to backend integration.",
  },
  {
    number: "13",
    category: "WEB & ANALYTICS",
    skills: ["WordPress", "SEO", "Google Analytics (GA4)", "Google Tag Manager", "Figma"],
  },
  {
    number: "14",
    category: "PROFESSIONAL SKILLS",
    skills: ["Problem Solving", "Analytical Thinking", "Communication", "Documentation"],
  },
];

export const featuredProject = {
  id: "conceptbridge-ai",
  number: "01",
  name: "ConceptBridge AI",
  badge: "Featured AI Platform",
  category: "AI-Powered Programming Education Platform",
  github: "https://github.com/Anjaliiieeee/conceptbridge-ai",
  headline: "Intelligent programming education platform closing conceptual gaps.",
  description:
    "ConceptBridge AI is an intelligent programming education platform designed to help learners move beyond memorizing syntax and understand how programming concepts work in real-world software engineering scenarios. The platform generates practical coding challenges, evaluates submitted solutions, identifies conceptual misunderstandings and provides personalized follow-up exercises.",
  stack: [
    "React 19",
    "Vite",
    "JavaScript",
    "Python",
    "FastAPI",
    "SQLAlchemy",
    "PyJWT",
    "OpenAI",
    "SQLite",
    "PostgreSQL",
    "PyTest",
  ],
  frontendContributions: [
    "Developed the React 19 frontend application.",
    "Built a custom in-browser code editor.",
    "Implemented dynamic line numbering and keyboard indentation.",
    "Created interactive learning progress charts using SVG.",
    "Implemented Axios API integration.",
    "Developed JWT-based frontend authentication flows.",
    "Built reusable UI components.",
    "Implemented loading, error and evaluation feedback states.",
    "Created responsive layouts.",
  ],
  backendContributions: [
    "Developed REST APIs using FastAPI.",
    "Implemented clean layered backend architecture.",
    "Integrated SQLAlchemy for database operations.",
    "Implemented JWT authentication and password hashing.",
    "Integrated OpenAI for intelligent evaluation.",
    "Developed a deterministic fallback evaluation engine.",
    "Implemented conceptual gap detection.",
    "Developed learning mastery calculations using Exponential Moving Average.",
    "Created automated backend tests using PyTest.",
  ],
};

export const secondaryProjects = [
  {
    id: "proofofwork-ai",
    number: "02",
    name: "ProofOfWork AI",
    badge: "Verification Engine",
    category: "AI-Powered Technical Assessment",
    headline: "Evidence-based technical verification platform parsing GitHub repositories.",
    description:
      "Analyzes candidate GitHub repositories, AST patterns, commit histories, and documentation to create an objective, verifiable technical competency profile.",
    stack: [
      "Python",
      "FastAPI",
      "GitHub GraphQL API",
      "React",
      "PostgreSQL",
      "OpenAI LLM",
    ],
    highlights: [
      "Python AST parser evaluating code modularity and test discipline.",
      "GraphQL pipeline analyzing commit authenticity and PR contributions.",
      "Interactive SVG skill radar visualizing substantiated engineering capability.",
    ],
    github: "https://github.com/Anjaliiieeee",
  },
  {
    id: "cohortech-services",
    number: "03",
    name: "Enterprise Client Web Platforms",
    badge: "Production Client Engagements",
    category: "Commercial Client Services",
    headline: "Bespoke web platforms, Spring Boot backend microservices, and client portals.",
    description:
      "Delivered client-specific web applications, dynamic WordPress systems, and Java Spring Boot services for commercial accounts at Cohortech Consultancy.",
    stack: [
      "Java",
      "Spring Boot",
      "WordPress",
      "REST APIs",
      "MySQL",
      "GA4 / GTM",
      "Docker",
    ],
    highlights: [
      "Developed Spring Boot services and transactional database persistence routines.",
      "Built custom WordPress themes and high-performance client landing pages.",
      "Integrated GA4 telemetry and Google Tag Manager conversion funnels.",
    ],
    github: "https://github.com/Anjaliiieeee",
  },
];

export const experienceData = {
  company: "Cohortech Consultancy Private Limited",
  role: "Services Software Engineer",
  location: "Pune, India",
  timeline: [
    {
      period: "June 2024 – Present",
      role: "Full-Time Services Software Engineer",
      points: [
        "Develop Java and Spring Boot backend services and business logic.",
        "Build and maintain REST APIs and database integrations.",
        "Develop responsive WordPress websites and client landing pages.",
        "Work on frontend features, API integrations and application testing.",
        "Implement SEO and analytics integrations using GA4 and Google Tag Manager.",
      ],
    },
    {
      period: "January 2024 – June 2024",
      role: "Software Engineering Intern",
      points: [
        "Contributed to WordPress website development.",
        "Developed responsive frontend layouts.",
        "Supported client website implementation and testing.",
      ],
    },
  ],
};

export const educationData = [
  {
    id: "bca",
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "Modern College of Arts, Science and Commerce, Pune",
    location: "Pune, India",
    period: "2021 – 2024",
    score: "67.76% Aggregate",
    details: "Foundational computer science, data structures, OOP, web programming, and relational database systems.",
  },
  {
    id: "hsc",
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Abeda Inamdar College, Pune",
    location: "Pune, India",
    period: "2019 – 2021",
    score: "81.33%",
    details: "Focus in science, mathematics, and computer applications.",
  },
];
