import React, { useState, useEffect } from 'react';

const Sidebar = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // Collect all section elements based on nav links
    const sections = ['home', 'analytics-showcase', 'services', 'portfolio', 'skills', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -50% 0px',
      threshold: [0, 0.5]
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach(secTitle => {
      const el = document.getElementById(secTitle);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <aside className="sidebar-desktop">
      <div className="card-glass p-4 d-flex flex-column position-relative" style={{ minHeight: '100%' }}>
        
        {/* Animated background subtle glow */}
        <div className="sidebar-glow" style={{ borderRadius: 'inherit' }}></div>
        
        <div className="text-center mb-4 position-relative z-2">
          <div className="profile-img-placeholder mb-3">
            <i className="bi bi-person-workspace text-gradient"></i>
          </div>
          <h3 className="h4 fw-bold mb-1 text-white">Otabek Haydarov</h3>
          <p className="text-gradient fw-semibold small mb-2">Software Engineer & Data Analyst</p>
          <span className="badge bg-success bg-opacity-25 text-success border border-success border-opacity-50 px-3 py-1 rounded-pill small">
            <i className="bi bi-circle-fill pulse-dot me-2" style={{ fontSize: '0.4rem' }}></i> Available for Roles
          </span>
        </div>
        
        <nav className="sidebar-nav flex-grow-1 position-relative z-2">
          <a href="#home" className={`nav-item ${activeSection === 'home' ? 'active' : ''}`}>
            <i className="bi bi-house-door nav-icon"></i> <span className="nav-text">Overview</span>
          </a>
          <a href="#analytics-showcase" className={`nav-item ${activeSection === 'analytics-showcase' ? 'active' : ''}`}>
            <i className="bi bi-cpu nav-icon text-warning"></i> <span className="nav-text">Interactive Lab</span>
          </a>
          <a href="#services" className={`nav-item ${activeSection === 'services' ? 'active' : ''}`}>
            <i className="bi bi-briefcase nav-icon"></i> <span className="nav-text">Solutions</span>
          </a>
          <a href="#portfolio" className={`nav-item ${activeSection === 'portfolio' ? 'active' : ''}`}>
            <i className="bi bi-folder2-open nav-icon"></i> <span className="nav-text">Projects</span>
          </a>
          <a href="#skills" className={`nav-item ${activeSection === 'skills' ? 'active' : ''}`}>
            <i className="bi bi-code-slash nav-icon"></i> <span className="nav-text">Tech Stack</span>
          </a>
          <a href="#contact" className={`nav-item ${activeSection === 'contact' ? 'active' : ''}`}>
            <i className="bi bi-envelope nav-icon"></i> <span className="nav-text">Contact Me</span>
          </a>
        </nav>
        
        <div className="freelance-card mt-3 mb-4 text-center position-relative z-2">
          <h6 className="fw-bold mb-1 text-white">Building a Project?</h6>
          <p className="small mb-3 text-white opacity-75">Ready to build full-stack web apps or analyze complex datasets.</p>
          <a href="#contact" className="btn btn-gradient btn-sm w-100 rounded-pill hire-btn-anim">Hire & Collaborate &rarr;</a>
        </div>
        
        <div className="text-center position-relative z-2">
          <a href="#contact" className="btn btn-outline-glass btn-sm w-100 mb-3 cv-btn-anim">
            <i className="bi bi-file-earmark-person me-2"></i> Request Resume / CV
          </a>
          
          <div className="social-links-sidebar d-flex justify-content-center gap-3">
            <a href="https://github.com/otabek11haydarov" target="_blank" rel="noreferrer" className="social-icon">
              <i className="bi bi-github"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-icon">
              <i className="bi bi-linkedin"></i>
            </a>
            <a href="mailto:otabek11.haydarov@gmail.com" className="social-icon">
              <i className="bi bi-envelope"></i>
            </a>
          </div>
        </div>
        
      </div>
    </aside>
  );
};

export default Sidebar;


