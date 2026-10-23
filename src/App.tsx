import Navbar from '@/components/Navbar';
import ScrollProgress from '@/components/ScrollProgress';
import Hero from '@/components/Hero';
import TechMarquee from '@/components/TechMarquee';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { PortfolioProvider } from '@/context/PortfolioContext';
import { useInteractiveButtons } from '@/hooks/useInteractiveButtons';
import { useInteractiveCards } from '@/hooks/useInteractiveCards';

function PortfolioApp() {
  useInteractiveButtons();
  useInteractiveCards();

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-slate-200">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <TechMarquee />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <PortfolioProvider>
      <PortfolioApp />
    </PortfolioProvider>
  );
}

export default App;
