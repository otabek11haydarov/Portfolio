import { useEffect, useState } from 'react';
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
import AdminDashboard from '@/components/admin/AdminDashboard';
import { PortfolioProvider } from '@/context/PortfolioContext';
import { useInteractiveButtons } from '@/hooks/useInteractiveButtons';
import { useInteractiveCards } from '@/hooks/useInteractiveCards';

function PortfolioApp() {
  useInteractiveButtons();
  useInteractiveCards();

  const [isAdminOpen, setIsAdminOpen] = useState(() => {
    return window.location.hash === '#admin' || window.location.pathname === '/admin';
  });

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setIsAdminOpen(true);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleCloseAdmin = () => {
    setIsAdminOpen(false);
    if (window.location.hash === '#admin') {
      history.pushState('', document.title, window.location.pathname + window.location.search);
    }
  };

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
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {isAdminOpen && <AdminDashboard onClose={handleCloseAdmin} />}
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
