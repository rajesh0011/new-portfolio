import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectsGallery from "@/components/ProjectsGallery";
import Achievements from "@/components/Achievements";
import ArchitectureSection from "@/components/ArchitectureSection";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import About from "@/components/About";
import ResumeView from "@/components/ResumeView";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { getPublicProjects } from "@/lib/projects-service";

// Re-generate the page at most once a minute; CMS edits also trigger revalidatePath("/").
export const revalidate = 60;

export default async function HomePage() {
  const projects = await getPublicProjects();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProjectsGallery projects={projects} />
        <Achievements />
        <ArchitectureSection />
        <Projects projects={projects} />
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
