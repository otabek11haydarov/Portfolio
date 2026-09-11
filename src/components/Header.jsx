import React from 'react';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg top-header">
      <div className="container-fluid px-4 px-lg-5">
        <a className="navbar-brand" href="#home">OTABEK <span className="text-gradient">.</span></a>
        
        <button className="navbar-toggler btn-outline-glass border-0 px-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMobile" aria-controls="navbarMobile" aria-expanded="false" aria-label="Toggle navigation">
          <i className="bi bi-list fs-2 text-white"></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarMobile">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 d-lg-none">
            <li className="nav-item">
              <a className="nav-link active" href="#home"><i className="bi bi-house me-2"></i>Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#about"><i className="bi bi-person me-2"></i>About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#services"><i className="bi bi-briefcase me-2"></i>Services</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#portfolio"><i className="bi bi-folder me-2"></i>Portfolio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#skills"><i className="bi bi-code-slash me-2"></i>Skills</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#blog"><i className="bi bi-journal-text me-2"></i>Blog</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contact"><i className="bi bi-envelope me-2"></i>Contact</a>
            </li>
          </ul>
          
          <div className="d-flex ms-auto d-none d-lg-block">
            <a href="#contact" className="btn btn-gradient">Let's Talk</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
