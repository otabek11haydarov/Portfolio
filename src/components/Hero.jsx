import React from 'react';

const Hero = ({ activeFilter, setActiveFilter }) => {
  return (
    <section id="home" className="hero-section card-glass rounded-4 position-relative overflow-hidden mb-4">
      <div className="bg-glow-1"></div>
      <div className="bg-glow-2"></div>
      
      <div className="row w-100 align-items-center position-relative z-2 g-4">
        <div className="col-lg-7 order-2 order-lg-1">
          <div className="hero-content text-start">
            <div className="d-flex flex-wrap gap-2 mb-3">
              <span className="hero-label m-0">
                <i className="bi bi-patch-check-fill me-1"></i> Software Engineer & Data Analyst
              </span>
              <span className="badge bg-success bg-opacity-25 text-success border border-success border-opacity-50 px-3 py-2 rounded-pill d-inline-flex align-items-center gap-1">
                <span className="pulse-dot"></span> Available for Hiring & Freelance
              </span>
            </div>

            <h1 className="display-4 fw-extrabold text-white mb-2">
              Otabek <span className="text-gradient">Haydarov</span>
            </h1>
            
            <div className="hero-role text-white opacity-90 fs-3 fw-bold mb-3">
              Transforming Complex Datasets into <span className="text-gradient">Scalable Software</span>
            </div>

            <p className="hero-desc text-secondary-color fs-5 mb-4">
              I bridge full-stack software development and data analytics — crafting high-performance web applications in <strong>React & Node.js</strong> alongside predictive Machine Learning models in <strong>Python & SQL</strong>.
            </p>
            
            {/* Quick Speciality Toggle */}
            <div className="p-3 card-glass rounded-3 mb-4 border-subtle">
              <div className="small text-secondary-color fw-semibold mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>
                <i className="bi bi-sliders me-1"></i> Filter Experience Profile:
              </div>
              <div className="d-flex flex-wrap gap-2">
                <button
                  className={`btn btn-sm rounded-pill px-3 fw-semibold ${activeFilter === 'all' ? 'btn-gradient' : 'btn-outline-glass'}`}
                  onClick={() => setActiveFilter && setActiveFilter('all')}
                >
                  ⚡ All Engineering & Analytics
                </button>
                <button
                  className={`btn btn-sm rounded-pill px-3 fw-semibold ${activeFilter === 'software' ? 'btn-gradient' : 'btn-outline-glass'}`}
                  onClick={() => setActiveFilter && setActiveFilter('software')}
                >
                  💻 Software Engineering
                </button>
                <button
                  className={`btn btn-sm rounded-pill px-3 fw-semibold ${activeFilter === 'analytics' ? 'btn-gradient' : 'btn-outline-glass'}`}
                  onClick={() => setActiveFilter && setActiveFilter('analytics')}
                >
                  📊 Data Analytics & ML
                </button>
              </div>
            </div>

            <div className="d-flex flex-wrap gap-3">
              <a href="#portfolio" className="btn btn-gradient btn-lg px-4 py-3 rounded-pill d-inline-flex align-items-center gap-2">
                <i className="bi bi-folder-check"></i> Explore Featured Work
              </a>
              <a href="#analytics-showcase" className="btn btn-outline-glass btn-lg px-4 py-3 rounded-pill d-inline-flex align-items-center gap-2">
                <i className="bi bi-terminal"></i> Interactive Lab
              </a>
            </div>
          </div>
        </div>
        
        <div className="col-lg-5 order-1 order-lg-2">
          <div className="hero-image-container mx-auto" style={{ maxWidth: '380px' }}>
            <div className="avatar-wrapper shadow-lg">
              <div className="placeholder-glow"></div>
              <div className="avatar-inner p-4 text-center">
                <div className="display-1 text-gradient mb-2">
                  <i className="bi bi-person-badge-fill"></i>
                </div>
                <div className="fw-bold text-white fs-4 mb-1">Otabek Haydarov</div>
                <div className="badge bg-purple-subtle px-3 py-1 mb-2">Dual Tech Specialist</div>
                <div className="d-flex justify-content-center gap-2 mt-2">
                  <span className="badge bg-dark border border-secondary text-secondary">SQL / Python</span>
                  <span className="badge bg-dark border border-secondary text-secondary">React / Node</span>
                </div>
              </div>
            </div>
            
            <div className="floating-stat card-glass border-subtle">
              <div className="stat-num text-gradient">94%</div>
              <div className="stat-text text-secondary mb-0">
                <strong className="text-white">ML Accuracy</strong><br/>
                & 5+ Key Systems
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

