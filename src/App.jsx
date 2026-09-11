import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import TrustedTechnologies from './components/TrustedTechnologies';
import AnalyticsShowcase from './components/AnalyticsShowcase';
import Services from './components/Services';
import Projects from './components/Projects';
import Statistics from './components/Statistics';
import Skills from './components/Skills';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [activeFilter, setActiveFilter] = useState('all');

  return (
    <div className="app-container">
      <Header />
      <div className="main-wrapper">
        <Sidebar />
        <main className="content-area">
          <Hero activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
          <TrustedTechnologies />
          <AnalyticsShowcase />
          <Services />
          <Projects activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
          <Statistics />
          <Skills />
          <Testimonials />
          <Contact />
          <Footer />
        </main>
      </div>
    </div>
  );
}

export default App;

