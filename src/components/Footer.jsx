import React from 'react';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="social-links">
        <a href="#"><i className="bi bi-github"></i></a>
        <a href="#"><i className="bi bi-linkedin"></i></a>
        <a href="#"><i className="bi bi-twitter"></i></a>
        <a href="#"><i className="bi bi-envelope"></i></a>
      </div>
      <p className="text-secondary-color small mb-0">
        &copy; {new Date().getFullYear()} Otabek Haydarov. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
