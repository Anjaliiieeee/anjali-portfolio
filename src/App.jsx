import About from "./components/About";
import Background from "./components/Background";
import Contact from "./components/Contact";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar, { BackToTop } from "./components/Navbar";
import Projects from "./components/Projects";
import Resume from "./components/Resume";
import Skills from "./components/Skills";

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#F4EFE5] text-[#191919] selection:bg-[#183D2B] selection:text-[#FFFDF8]">
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-[#183D2B] focus:px-4 focus:py-2 focus:text-[#FFFDF8] focus:font-sans focus:text-xs"
      >
        Skip to main content
      </a>
      <Background />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Education />
        <Resume />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
