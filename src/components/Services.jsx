import React from 'react';
import { services } from '../data/services';

const Services = () => {
  return (
    <section id="services" className="section-padding pt-0">
      <div className="mb-5">
        <div className="text-gradient fw-bold text-uppercase mb-2" style={{letterSpacing: '1px'}}>WHAT I DO</div>
        <h2 className="display-6 fw-bold">Services I Offer</h2>
      </div>
      
      <div className="row g-4">
        {services.map(service => (
          <div className="col-md-6 col-lg-6" key={service.id}>
            <div className="card-glass p-4 h-100 card-glass-hover">
              <div className="service-icon-wrapper">
                <i className={`bi ${service.icon}`}></i>
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="text-secondary-color mb-4 flex-grow-1">{service.description}</p>
              
              <a href="#contact" className="fw-bold d-inline-flex align-items-center gap-2" style={{color: 'var(--color-purple)'}}>
                Learn More <i className="bi bi-arrow-right"></i>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
