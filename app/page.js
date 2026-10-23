import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Achievements from "@/components/Achievements";
import ArchitectureSection from "@/components/ArchitectureSection";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import About from "@/components/About";
import ResumeView from "@/components/ResumeView";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Achievements />
        <ArchitectureSection />
        <Projects />
        <Experience />
        <Skills />
        <About />
        <ResumeView />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
